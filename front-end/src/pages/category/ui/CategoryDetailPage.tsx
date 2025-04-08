import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsByCategory } from '@/pages/category';
import { NewsItem } from '@/features/category';
import { categories } from '@/features/category';
import "@shared/styles/CustomScroll.css"

const ITEMS_PER_PAGE = 5;

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  // 화면에 표시할 뉴스 목록
  const [displayedList, setDisplayedList] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 카테고리 클릭 핸들러
  const handleCategoryTabClick = (id: string) => {
    navigate(`/category/details/${id}`);
  };

  const handleNewsClick = (newsId: string) => {
    navigate(`/detail/${newsId}`);
  }

  // categoryId가 변경될 때마다 뉴스 데이터를 API로부터 가져옴
  useEffect(() => {
    if (!categoryId) return;
    fetchNewsByCategory(categoryId)
      .then((data) => {
        const result = data ?? [];
        setNewsList(result);
        setPage(1);
        setDisplayedList(result.slice(0, ITEMS_PER_PAGE));
      })
      .catch(() => {
        setNewsList([]);
        setDisplayedList([]);
      });
  }, [categoryId]);

  // page 바뀔 때마다 displayedList 업데이트
  useEffect(() => {
    setDisplayedList(newsList.slice(0, page * ITEMS_PER_PAGE));
  }, [page, newsList]);

  // IntersectionObserver
  useEffect(() => {
    if (displayedList.length >= newsList.length) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [displayedList, newsList]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().slice(0, 10);
  };

  // 현재 선택된 카테고리 객체 (UI 표시에 사용)
  const currentCategory = categories.find((cat) => cat.id === categoryId);

  return (
    <div className="flex flex-col min-h-screen overflow-auto scroll">
      <div className="flex-shrink-0">
        {/* 상단 여백 */}
        <div className="h-6"></div>

        <div className="z-10 bg-[#F2F6E2]">
          <div className="flex overflow-x-auto py-3 -px-5 shadow-sm">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryTabClick(cat.id)}
                className={`px-4 py-1 mx-1 cursor-pointer whitespace-nowrap ${
                  cat.id === categoryId ? 'font-bold text-lg text-black'
                    : 'font-bold text-lg text-gray-400'
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
        {/* 뉴스 항목 */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-3">
          <div className="mb-4">
            <h1 className="ml-1 text-ms font-bold text-white">
              {currentCategory?.name}
            </h1>
          </div>

          {(!displayedList || displayedList.length === 0) ? (
          <p className="text-gray-500">해당 카테고리에 대한 뉴스가 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {displayedList.map((news) => (
              <div
                key={news.id}
                onClick={() => handleNewsClick(news.id)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <div className="flex p-4">
                  <div className="w-24 h-24 rounded overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={news.img}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1 line-clamp-1">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                      {news.article}
                    </p>
                    <p className="text-xs text-gray-400">
                      발행일: {formatDate(news.published)} | 조회수: {news.views}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
                {/* 스크롤 트리거용 div */}
                <div ref={observerRef} className="h-10" />
              </div>
            )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;