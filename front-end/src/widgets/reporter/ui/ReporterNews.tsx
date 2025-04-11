import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { LuEllipsisVertical } from "react-icons/lu";
import { ReporterArticle } from '@/features/reporter';
import { fetchAllKidsNews, ArticleDetailModal, postLike, deleteArticle } from '@/widgets/reporter';
import "@shared/styles/CustomScroll.css"
import { AxiosError } from 'axios';
import { showError, useUserProfile } from '@/shared';
import { useNavigate } from 'react-router-dom';

export const ReporterNews = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<ReporterArticle | null>(null);
  const [newsList, setNewsList] = useState<ReporterArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<string | null>(null); 
  const userProfile = useUserProfile();
  const navigate = useNavigate();

    const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

  const userImageUrl = userProfile && userProfile.characterId
    ? `${imgUrl}dinos/${userProfile.characterId}.png`
    : `${imgUrl}}dinos/nico.png`;
    
  // 기사 목록을 API로부터 가져오는 함수
  const fetchNewsList = async () => {
    setLoading(true);
    try {
      const result = await fetchAllKidsNews();
      if (result.success) {
        setNewsList(result.data); 
      } else {
        setError(result.error);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          navigate("/login"); 
          alert("로그인이 필요합니다");
        } else if (error.response?.status === 403) {
          showError("프로필을 등록해주세요");
          navigate("/userinfo");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsList();
  }, []);

  const openModal = (article: ReporterArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  // 좋아요 버튼 클릭 시 처리 함수
  const handleLikeClick = async (article: ReporterArticle) => {
    const response = await postLike(article.id);  // article.id가 kidsnewsId
    if (response.success) {
      // 성공적으로 좋아요를 토글하면, isLiked와 likes 수를 갱신
      setIsLiked((prev) => !prev);
      setNewsList((prevList) => 
        prevList.map((news) => 
          news.id === article.id ? { ...news, likes: news.likes + (isLiked ? -1 : 1) } : news
        )
      );
    }
  };

  // 옵션 버튼 클릭 시
  const handleOptionsClick = (articleId: string) => {
    // 열려 있던 옵션과 동일한 아이디면 닫기, 아니면 열기
    setShowOptions((prev) => (prev === articleId ? null : articleId));
  };

  const handleEdit = (article: ReporterArticle) => {
    // 작성자와 로그인한 유저가 다르면 수정 불가
    if (userProfile?.nickname !== article.author) {
      showError("수정 권한이 없습니다.");
      return;
    }

    // 수정 페이지로 이동
    navigate(`/reporter/create?edit=1&id=${article.id}`, { state: article });
  };

  const handleDelete = (article: ReporterArticle) => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    deleteArticle(article.id).then((res) => {
      if (res.success) {
        showError("게시글이 삭제되었습니다.");
        setNewsList((prev) => prev.filter((item) => item.id !== article.id));
      } else {
        showError("삭제에 실패했습니다.");
      }
    });
  };

  const getCommentCount = (article: ReporterArticle) => {
    return article.replies ? article.replies.length : 0;
  };

  return (
    <div className="pt-2 pb-20">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        newsList.map((news) => (
          <div key={news.id}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img 
                  src={userImageUrl}
                  alt="character_image"
                  className='w-15 h-15 m-1 p-2 border-2 bg-white border-[#EFEFEF] rounded-[50px]'
                />
                <p className="text-xl font-semibold text-[#202020]">{news.author}</p>
              </div>
              <div className="relative">
                <LuEllipsisVertical 
                  size={24} 
                  className="cursor-pointer"
                  onClick={() => handleOptionsClick(news.id)} 
                />
                {showOptions === news.id && (
                  <div className="absolute right-0 bg-white border border-gray-300 rounded shadow p-1 w-24">
                    <button 
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                      onClick={() => handleEdit(news)}
                    >
                      수정하기
                    </button>
                    <button 
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                      onClick={() => handleDelete(news)}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-200 w-auto h-80 flex items-center justify-center cursor-pointer mt-2" onClick={() => openModal(news)}>
              <img src={news.imgUrl} alt="related_news_image" className="w-full h-full object-cover"/>
            </div>

            <div className="flex justify-between m-2">
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  {isLiked ? (
                    <FaHeart 
                      size={25}
                      onClick={() => handleLikeClick(news)}
                      className="cursor-pointer text-[#FF5C5C]"
                    />
                  ) : (
                    <FaRegHeart 
                      size={25}
                      onClick={() => handleLikeClick(news)}
                      className="cursor-pointer text-black"
                    />
                  )}
                  <span className="text-sm font-medium mt-1">{news.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaRegComment size={25} className="cursor-pointer" onClick={() => openModal(news)} />
                  <span className="text-sm font-medium mt-1">{getCommentCount(news)}</span>
                </div>
              </div>
            </div>

            <div className="mx-2 mb-5 cursor-pointer" onClick={() => openModal(news)}>
              {news.content.slice(0, 100)}...
            </div>
          </div>
        ))
      )}

      <ArticleDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        article={selectedArticle}
      />
    </div>
  );
};