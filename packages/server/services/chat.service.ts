import fs from 'fs';
import path from 'path';
import { conversationDepository } from '../repositories/conversation.repository';
import OpenAI from 'openai';
import template from '../prompts/chatbot.txt';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WW.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      console.log('hello', prompt);
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 200,
         previous_response_id:
            conversationDepository.getLastConversation(conversationId),
      });

      conversationDepository.setLastConversation(conversationId, response.id);

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
