export interface ChatMessage {
    type: "user" | "assistant";
    text: string;
  }
  
  export interface ChatHistoryRequest {
    newsId: string;
  }
  
  export interface ChatHistoryResponse {
    success: boolean;
    data: {
      messages: ChatMessage[];
    };
    error?: string | null;
  }
  
  export interface ChatRequest {
    newsId: string;
    question: string;
  }
  
  export interface ChatResponse {
    success: boolean;
    data: {
      answer: string;
      // 만약 API에서 전체 chat history를 다시 주지 않는다면 아래는 생략
      messages?: ChatMessage[];
    };
    error?: string | null;
  }