// evan-naderi/app/api/agent/route.ts
import { ChatOpenAI } from "@langchain/openai";
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


import dotenv from 'dotenv';
dotenv.config();

console.log('HIII');
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const chatModel = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    console.log('HIII');
    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "Respond in spanish."],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(chatModel);

    const outputParser = new StringOutputParser();

    const llmChain = prompt.pipe(chatModel).pipe(outputParser);

    console.log('Type of request:', typeof request);
    console.log('request:', request.body);
    const data = await request.json();
    console.log('data:', data);
    const { message } = data;
    console.log('message:', message);

    const response = await llmChain.invoke({
      input: message,
    });
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
