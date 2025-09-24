import axios from 'axios';
import { useRef, useState } from 'react';
import TypeIndicator from './TypeIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState('');
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Message[]>([]);

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [
            ...prev,
            {
               content: prompt,
               role: 'user',
            },
         ]);
         setIsBotTyping(true);

         setError('');

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            {
               content: data.message,
               role: 'bot',
            },
         ]);
      } catch (error) {
         console.error(error);
         setError('Something went wrong, please, try again!');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 over">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypeIndicator />}
            {error && <p className="text-red-500">{error}</p>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
