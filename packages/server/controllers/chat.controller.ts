import { chatService } from '../services/chat.service';
import type { Request, Response } from 'express';
import { z } from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long, max is 1000 characters'),
   conversationId: z.string().uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      try {
         const parseResult = chatSchema.safeParse(req.body);

         if (!parseResult.success) {
            res.status(400).json(parseResult.error.format());
         }

         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({
            message: response.message,
         });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response' });
      }
   },
};
