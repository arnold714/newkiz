export interface PostNewsSummaryRequest {
  summary: string;
}

export interface GetNewsAiSummaryRequest {
  success: boolean;
  data: {
    id: string;
    newsId: string;
    userId: string;
    summary: string;
    updatedAt: string;
  };
  error: string | null;
};


