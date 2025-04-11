import { customAxios } from "@/shared";
import { Reply } from "@/features/reporter";

export const addComment = async (kidsnewsId: string, content: string, author: string): Promise<{ success: boolean, data: Reply | null, error: string | null }> => {
  try {
    const response = await customAxios.post(`/api/kidsnews/${kidsnewsId}/reply`, {
      content,
      author
    });
    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, data: null, error: "Failed to add comment" };
  }
};

// 댓글 수정 API 요청
export const updateComment = async (kidsnewsId: string, replyId: string, newContent: string, author: string) => {
  try {
    const response = await customAxios.patch(`/api/kidsnews/${kidsnewsId}/reply/${replyId}`, {
      content: newContent,
      author: author
    });
    return response.data; // { success: true, data: updatedComment }
  } catch (error) {
    console.error("댓글 수정 오류:", error);
    return { success: false, data: null, error: '댓글 수정에 실패했습니다.' };
  }
};

// 댓글 삭제 API 요청
export const deleteComment = async (kidsnewsId: string, replyId: string): Promise<{ success: boolean, data: null, error: string | null }> => {
  try {
    const response = await customAxios.delete(`/api/kidsnews/${kidsnewsId}/reply/${replyId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, data: null, error: "Failed to delete comment" };
  }
};