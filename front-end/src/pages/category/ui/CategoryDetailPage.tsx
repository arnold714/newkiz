import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsByCategory, fetchNewsBySubCategory } from '@/pages/category';
import { NewsItem, categories } from '@/features/category';
import "@shared/styles/CustomScroll.css"
import { SubCategoryGrid } from '@/widgets/category';

const ITEMS_PER_PAGE = 5;

const colorSequence = [
  "bg-[#F86060]",
  "bg-[#FBB76F]",
  "bg-[#F8D460]",
  "bg-[#A5E75A]",
  "bg-[#8DBDFF]",
  "bg-[#AE9DF5]",
  "bg-[#FFC2DE]",
];

function getIconUrl(iconName?: string): string {
  if (!iconName) return "";
  const baseUrl = import.meta.env.VITE_AWS_S3_BASE_URL;
  return `${baseUrl}categories/${iconName}.svg`;
}

export default function CategoryDetailPage() {
  const { categoryId, subCategoryId } = useParams<{
    categoryId: string;
    subCategoryId: string;
  }>();

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

  const handleSubCategoryClick = (subId: string) => {
    if (!categoryId) return;
    navigate(`/category/details/${categoryId}/${subId}`);
  };

  const handleNewsClick = (newsId: string) => {
    navigate(`/detail/${newsId}`);
  }

  useEffect(() => {
    if (!categoryId) return;

    // 무한 스크롤 초기화
    setPage(1);
    setDisplayedList([]);
    setNewsList([]);

    const fetchData = async () => {
      let result: NewsItem[] = [];
      // subCategoryId가 있으면 서브카테고리 API, 없으면 카테고리 API
      if (subCategoryId) {
        result = await fetchNewsBySubCategory(subCategoryId);
      } else {
        result = await fetchNewsByCategory(categoryId);
      }
      setNewsList(result);
      // 첫 페이지 데이터
      setDisplayedList(result.slice(0, ITEMS_PER_PAGE));
    };

    fetchData();
  }, [categoryId, subCategoryId]);

  // 6) page 바뀔 때마다 displayedList 추가
  useEffect(() => {
    setDisplayedList(newsList.slice(0, page * ITEMS_PER_PAGE));
  }, [page, newsList]);

  // 7) 무한 스크롤 IntersectionObserver
  useEffect(() => {
    if (displayedList.length >= newsList.length) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [displayedList, newsList]);

  // 날짜 포맷
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().slice(0, 10);
  };

  // 현재 카테고리 정보
  const currentCategory = categories.find((cat) => cat.id === categoryId);

  // 서브 카테고리를 색칠해주는 helper
  const getSubCatColor = (index: number) => {
    return colorSequence[index % colorSequence.length];
  };

  return (
    <div className="flex flex-col min-h-screen overflow-auto scroll">
      <div className="h-4"></div>
      {/* 상단 카테고리 탭 바 */}
      <div className="z-10 bg-[#F2F6E2]">
        <div className="flex overflow-x-auto py-2 -px-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryTabClick(cat.id)}
              className={`px-4 py-1 mx-1 cursor-pointer whitespace-nowrap ${
                cat.id === categoryId ? "font-bold text-lg text-black" : "font-bold text-lg text-gray-400"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* 서브 카테고리 표시 영역 (그리드 or 가로 스크롤 중 택1) */}
      {currentCategory && (
        <div className="bg-[#F2F6E2] p-4">
          <SubCategoryGrid
            subCategories={currentCategory.subCategories}
            onSubClick={(subId) => handleSubCategoryClick(subId)}
            getColorClass={getSubCatColor}
            getIconUrl={getIconUrl}
            selectedSubId={subCategoryId}
            containerClassName="flex space-x-3 overflow-x-auto"
            cardClassName="w-23 h-23 relative"
            renderOverlay={(subId) => 
              subId !== subCategoryId && (
                <div className="absolute inset-0 bg-white/50 bg-opacity-40 rounded-lg"></div>
              )
            }
          />
        </div>
      )}

      {/* 뉴스 목록 */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-3">
          <div className="mb-4">
            <h1 className="ml-1 text-ms font-bold text-white">
              {currentCategory?.name}
              {subCategoryId && (
                <>
                  {" / "}
                  {
                    // 서브카테고리 이름 출력
                    currentCategory?.subCategories.find((sc) => sc.id === subCategoryId)?.name
                  }
                </>
              )}
            </h1>
          </div>

          {displayedList.length === 0 ? (
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
                      <h3 className="text-lg font-medium mb-1 line-clamp-1">{news.title}</h3>
                      <p className="text-sm text-gray-600 mb-1 line-clamp-2">{news.article}</p>
                      <p className="text-xs text-gray-400">
                        발행일: {formatDate(news.published)} | 조회수: {news.views}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* 무한 스크롤 트리거 */}
              <div ref={observerRef} className="h-10" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}