import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('hello!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'world' });
});

router.post('/api/chat', async (req: Request, res: Response) => {
   chatController.sendMessage(req, res);
});

export default router;
