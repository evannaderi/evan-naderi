// evan-naderi/app/api/agent/route.ts
import { ChatOpenAI } from "@langchain/openai";
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
dotenv.config();

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const chatModel = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    console.log('Processing request...');
    
    const data = await request.json();
    const input = data.input;

    console.log('Received input:', input);

    // Directly use the input to generate a response
    const response = await chatModel.invoke(input);

    console.log('Generated response:', response.content);

    return new Response(JSON.stringify({ response: response.content }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
  }
};
