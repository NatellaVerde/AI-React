const conversations = new Map<string, string>();

export const conversationDepository = {
   getLastConversation(conversationId: string) {
      return conversations.get(conversationId);
   },

   setLastConversation(conversationId: string, responseId: string) {
      return conversations.set(conversationId, responseId);
   },
};
