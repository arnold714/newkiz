export interface ChatMessage {
    type: "user" | "assistant";
    text: string;
  }
  
  export interface ChatHistoryResponse {
    sessionId: string;
    chatHistory: Array<{
      user: string;
      assistant: string;
    }>;
  }
  
  export interface ChatRequest {
    newsId: string;
    question: string;
  }
  
  export interface ChatResponse {
    sessionId: string;
    chatHistory: Array<{
      user: string;
      assistant: string;
    }>;
  }