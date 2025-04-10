import { useEffect, useState, useRef } from 'react';
import { LuX } from 'react-icons/lu'; 
import { FaTrashAlt, FaEdit, FaUserCircle } from 'react-icons/fa';
import { ReporterArticle, Reply } from '@/features/reporter';
import { fetchKidsNewsById, addComment, updateComment, deleteComment } from '@widgets/reporter'; 
import { useUserProfile } from '@/shared';
import "@shared/styles/CustomScroll.css"

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ReporterArticle | null;
}

const ArticleDetailModal = ({ isOpen, onClose, article }: ArticleDetailModalProps) => {
  const [detailedArticle, setDetailedArticle] = useState<ReporterArticle | null>(null);
  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const userProfile = useUserProfile();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const refreshArticleDetails = async () => {
    if (!article) return;
    
    setLoading(true);
    const result = await fetchKidsNewsById(article.id);
    if (result.success) {
      setDetailedArticle(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (article && isOpen) {
      refreshArticleDetails();
    }
  }, [article, isOpen]);

  // 댓글 추가 기능
  const handleAddComment = async () => {
    if (!commentText.trim() || !detailedArticle || !userProfile) return;
    
    setSubmitting(true);
    const result = await addComment(
      detailedArticle.id,
      commentText.trim(), 
      userProfile.nickname
    );
    
    if (result.success) {
      setCommentText('');
      await refreshArticleDetails();  // 댓글 목록 새로고침
    } else {
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
    setSubmitting(false);
  };

  // 댓글 수정 버튼 클릭
  const handleEditClick = (reply: Reply) => {
    setEditingReplyId(reply.id);
    setEditingText(reply.content);
  };

  // 댓글 수정 제출
  const handleUpdateComment = async (replyId: string) => {
    if (!editingText.trim() || !detailedArticle || !userProfile) return;
    
    setSubmitting(true);
    const result = await updateComment(
      detailedArticle.id, 
      replyId, 
      editingText.trim(),
      userProfile.nickname
    );
    
    if (result.success) {
      setEditingReplyId(null);
      await refreshArticleDetails();  // 댓글 목록 새로고침
    } else {
      alert('댓글 수정에 실패했습니다. 다시 시도해주세요.');
    }
    setSubmitting(false);
  };

  // 댓글 삭제
  const handleDeleteComment = async (replyId: string) => {
    if (!detailedArticle) return;
    
    const confirmDelete = window.confirm('정말 댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;
    
    setSubmitting(true);
    const result = await deleteComment(detailedArticle.id, replyId);
    
    if (result.success) {
      await refreshArticleDetails();  // 댓글 목록 새로고침
    } else {
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
    setSubmitting(false);
  };

  if (!isOpen || !detailedArticle) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500/75 flex justify-center items-start z-50 pt-16">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl h-auto max-h-[80vh] overflow-y-auto scroll">
        <LuX size={30} className="cursor-pointer ml-auto flex mb-3" onClick={onClose} />
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold">{detailedArticle.title}</div>
        </div>
        <div className="text-md text-gray-500 mb-2">
          <span>{formatDate(detailedArticle.createdAt)} | </span>
          <span>{detailedArticle.author}</span>
        </div>
        <div className="bg-gray-200 w-full h-full mb-4">
          <img src={detailedArticle.imgUrl} alt="article_image" className="w-full h-full object-cover" />
        </div>
        <div className="text-base mb-2">{detailedArticle.content}</div>

        {/* 댓글 섹션 */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">댓글 {detailedArticle.replies?.length || 0}개</h3>
          
          {/* 댓글 목록 */}
          <div className="space-y-4">
            {detailedArticle.replies && detailedArticle.replies.length > 0 ? (
              detailedArticle.replies.map((reply) => (
                <div key={reply.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <FaUserCircle size={36} className="text-gray-400" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <p className="font-medium text-sm">{reply.author}</p>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                    
                    {editingReplyId === reply.id ? (
                      // 수정 모드
                      <div className="mt-1">
                        <textarea 
                          className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" 
                          rows={2}
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <button 
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300 transition-colors"
                            onClick={() => setEditingReplyId(null)}
                            disabled={submitting}
                          >
                            취소
                          </button>
                          <button 
                            className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition-colors"
                            onClick={() => handleUpdateComment(reply.id)}
                            disabled={submitting || !editingText.trim()}
                          >
                            수정 완료
                          </button>
                        </div>
                      </div>
                    ) : (
                      // 일반 모드
                      <p className="text-sm mt-1">{reply.content}</p>
                    )}
                    
                    {/* 유저가 댓글 작성자인 경우 수정/삭제 버튼 표시 */}
                    {String(userProfile?.userId) === String(reply.userId) && editingReplyId !== reply.id && (
                      <div className="flex space-x-2 mt-1">
                        <button 
                          className="text-xs text-gray-500 flex items-center hover:text-blue-500 transition-colors"
                          onClick={() => handleEditClick(reply)}
                        >
                          <FaEdit size={12} className="mr-1" />
                          수정
                        </button>
                        <button 
                          className="text-xs text-gray-500 flex items-center hover:text-red-500 transition-colors"
                          onClick={() => handleDeleteComment(reply.id)}
                        >
                          <FaTrashAlt size={12} className="mr-1" />
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
            )}
          </div>
          
          {/* 댓글 입력 폼 */}
          <div className="mt-6 flex">
            <div className="flex-shrink-0 mr-3">
              <FaUserCircle size={36} className="text-gray-400" />
            </div>
            <div className="flex-grow">
              <textarea 
                ref={commentInputRef}
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" 
                rows={2}
                placeholder="댓글 추가..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button 
                  className={`px-4 py-1 rounded-full text-sm transition-colors ${
                    commentText.trim() && !submitting 
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleAddComment}
                  disabled={!commentText.trim() || submitting}
                >
                  {submitting ? '댓글 작성 중...' : '댓글 달기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;