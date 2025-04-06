import { customAxios } from "@/shared";
import { ChatHistoryResponse, ChatRequest, ChatResponse } from "@/features/chatbot";

/**
 * 챗봇 기록을 초기화/조회합니다.
 * 뉴스 id를 보내면 해당 뉴스에 대한 기존 기록(없다면 초기화된 상태)을 반환합니다.
 */
export async function initializeChatHistory(newsId: string): Promise<ChatHistoryResponse> {
  const response = await customAxios.post<ChatHistoryResponse>("/api/chatbot/history", { newsId });
  return response.data;
}

/**
 * 사용자의 질문을 보내고 챗봇의 응답을 받습니다.
 */
export async function sendChatMessage(payload: ChatRequest): Promise<ChatResponse> {
  const response = await customAxios.post<ChatResponse>("/api/chatbot", payload);
  return response.data;
}