import { customAxios } from "@/shared";
import { ChatHistoryResponse, ChatRequest, ChatResponse } from "@/features/chatbot";

export async function initializeChatHistory(newsId: string): Promise<ChatHistoryResponse> {
  const response = await customAxios.post<ChatHistoryResponse>("/api/chatbot/history", { newsId });
  return response.data;
}

export async function sendChatMessage(payload: ChatRequest): Promise<ChatResponse> {
  const response = await customAxios.post<ChatResponse>("/api/chatbot", payload);
  return response.data;
}