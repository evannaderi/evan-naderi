// evan-naderi/app/api/agent/route.ts
import { ChatOpenAI } from "@langchain/openai";
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Document } from "@langchain/core/documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createRetrieverTool } from "langchain/tools/retriever";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { pull } from "langchain/hub";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import dotenv from 'dotenv';
dotenv.config();

console.log('HIII');
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const chatModel = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    console.log('HIII');
    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

    // const messages = [
    //   new HumanMessage("Is Evan a software dev?"),
    //   new AIMessage("Yes!"),
    // ];

    const data = await request.json();
    console.log('data:', data);
    const inputMessages = data.messages;
    const input = data.input;

    let messages = [];
    for (let msg of inputMessages) {
      if (msg.type === 'user') {
        messages.push(new HumanMessage(msg.content));
      } else {
        messages.push(new AIMessage(msg.content));
      }
    };

    console.log(messages);
        

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "Respond in spanish."],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(chatModel);

    const outputParser = new StringOutputParser();

    const llmChain = prompt.pipe(chatModel).pipe(outputParser);

    const path = process.env.NODE_ENV === 'development' ? "public/Evan_Naderi_resume.pdf" : "/Evan_Naderi_resume.pdf";

    const loader = new PDFLoader(path, {
      splitPages: false, // Optional, to load the entire PDF as a single document
    });

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings();

    const vectorstore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    const newPrompt =
      ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:

    <context>
    {context}
    </context>

    Question: {input}`);

    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt: newPrompt,
    });

    const retriever = vectorstore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    // const response = await retrievalChain.invoke({
    //   input: "what is LangSmith?",
    // });


    const historyAwarePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: chatModel,
      retriever,
      rephrasePrompt: historyAwarePrompt,
    });

    const chatHistory = [
      new HumanMessage("Can LangSmith help test my LLM applications?"),
      new AIMessage("Yes!"),
    ];

    // const response = await historyAwareRetrieverChain.invoke({
    //   chat_history: chatHistory,
    //   input: "Tell me how!",
    // });

    const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "Answer the user's questions based on the below context. Keep your response to 1-2 sentences:\n\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const historyAwareCombineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt: historyAwareRetrievalPrompt,
    });

    const conversationalRetrievalChain = await createRetrievalChain({
      retriever: historyAwareRetrieverChain,
      combineDocsChain: historyAwareCombineDocsChain,
    });

    const response = await conversationalRetrievalChain.invoke({
      chat_history: messages,
      input: input,
    });

    const retrieverTool = await createRetrieverTool(retriever, {
      name: "langsmith_search",
      description:
        "Search for information about Evan. For any questions about Evan, you must use this tool!",
    });

    const searchTool = new TavilySearchResults();

    const tools = [retrieverTool, searchTool];

    const agentPrompt = await pull<ChatPromptTemplate>(
      "hwchase17/openai-functions-agent"
    );

    const agentModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-1106",
      temperature: 0,
    });

    const agent = await createOpenAIFunctionsAgent({
      llm: agentModel,
      tools,
      prompt: agentPrompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      verbose: true,
    });

    // const agentResult = await agentExecutor.invoke({
    //   input: "what is the weather in SF?",
    // });
    
    // console.log(agentResult.output);

    console.log(splitDocs.length);
    console.log(splitDocs[0].pageContent.length);

    console.log(docs.length);
    console.log(docs[0].pageContent.length);

    console.log('Type of request:', typeof request);
    console.log('request:', request.body);

    // const response = await llmChain.invoke({
    //   input: message,
    // });
    console.log('response:', response);

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch(e: any) {
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
};
