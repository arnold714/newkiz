export interface PostNewsSummaryRequest {
  summary: string;
}

export interface GetNewsAiSummaryRequest {
  id: string;
  newsId: string;
  userId: string;
  summary: string;
  aiSummary: string;
  updatedAt: string;
}