import { useState } from 'react';
import Layout from '@/shared/ui/Layout';
import { useParams, useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
}

interface SportCategory {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

// 샘플 뉴스 데이터
interface NewsItem {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  imageUrl: string;
  description: string;
}

export default function CategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  
  // 기본값은 '전체'로 설정
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || 'all');
  const [selectedSportCategory, setSelectedSportCategory] = useState<string>('');

  // 카테고리 데이터
  const categories: Category[] = [
    { id: 'all', name: '전체' },
    { id: 'economy', name: '경제' },
    { id: 'social', name: '사회' },
    { id: 'politics', name: '정치' },
    { id: 'culture', name: '과학' },
    { id: 'sports', name: '스포츠' },
    { id: 'it', name: 'IT/과학' },
  ];

  // 스포츠 하위 카테고리
  const sportCategories: SportCategory[] = [
    { id: 'soccer', name: '축구', iconName: 'soccer', color: 'bg-red-500' },
    { id: 'baseball', name: '야구', iconName: 'baseball', color: 'bg-orange-400' },
    { id: 'basketball', name: '농구', iconName: 'basketball', color: 'bg-yellow-400' },
    { id: 'volleyball', name: '배구', iconName: 'volleyball', color: 'bg-green-400' },
    { id: 'e-sports', name: 'e스포츠', iconName: 'e-sports', color: 'bg-blue-400' },
  ];

  // 이미지 URL 생성 함수
  const getIconUrl = (iconName: string) => {
    return `https://newkiz.s3.ap-northeast-2.amazonaws.com/categories/${iconName}.png`;
  };

  // 샘플 뉴스 데이터
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: '손흥민 시즌 12호 도움...',
      category: 'sports',
      subCategory: 'soccer',
      imageUrl: '/newsImage3.png',
      description: 'AI를 통해 한줄 요약 내용'
    },
    {
      id: '2',
      title: '김도영, 시범경기부터 맹활약...',
      category: 'sports',
      subCategory: 'baseball',
      imageUrl: '/newsImage2.png',
      description: 'AI를 통해 한줄 요약 내용'
    },
    {
      id: '3',
      title: '손흥민, 토트넘에 모두의 기대...',
      category: 'sports',
      subCategory: 'soccer',
      imageUrl: '/newsImage3.png',
      description: 'AI를 통해 한줄 요약 내용'
    },
    {
      id: '4',
      title: '경제 회복세 전망...',
      category: 'economy',
      imageUrl: '/newsImage.png',
      description: 'AI를 통해 한줄 요약 내용'
    }
  ];

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // 스포츠 카테고리가 아닌 경우 선택된 스포츠 카테고리 초기화
    if (categoryId !== 'sports') {
      setSelectedSportCategory('');
    }
  };

  // 스포츠 하위 카테고리 클릭 핸들러
  const handleSportCategoryClick = (sportCategoryId: string) => {
    setSelectedSportCategory(sportCategoryId);
  };

  // 뉴스 아이템 클릭 핸들러
  const handleNewsClick = (newsId: string) => {
    navigate(`/news/${newsId}`);
  };

  // 필터링된 뉴스 아이템
  const filteredNews = newsItems.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'sports' && selectedSportCategory) {
      return item.category === 'sports' && item.subCategory === selectedSportCategory;
    }
    return item.category === selectedCategory;
  });

  return (
    <Layout>
      {/* 전체 컨테이너를 flex로 구성하여 고정 영역과 스크롤 영역 분리 */}
      <div className="flex flex-col h-full">
        {/* 고정 영역 - 상단 여백, 카테고리 탭, 서브 카테고리 */}
        <div className="flex-shrink-0">
          {/* 상단 여백 */}
          <div className="h-6"></div>
          
          {/* 카테고리 탭 바 */}
          <div className="z-10 bg-[#F2F6E2]">
            <div className="flex overflow-x-auto py-3 px-4 shadow-sm">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`px-4 py-1 mx-1 cursor-pointer whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'font-bold text-lg text-black'
                      : 'font-bold text-lg text-gray-400'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </div>
              ))}
            </div>
            
            {/* 스포츠 카테고리가 선택된 경우 서브 카테고리 표시 */}
            {selectedCategory === 'sports' && (
              <div className="bg-[#F2F6E2] px-4 pt-2 pb-4">
                <div className="grid grid-cols-8 gap-2 mb-2">
                  {sportCategories.map((sport) => (
                    <div
                      key={sport.id}
                      className="cursor-pointer"
                      onClick={() => handleSportCategoryClick(sport.id)}
                    >
                      <div className={`${sport.color} rounded-lg overflow-hidden shadow-sm aspect-square flex flex-col ${
                        selectedSportCategory === sport.id ? 'ring-2 ring-white' : ''
                      }`}>
                        <div className="flex-grow flex items-center justify-center">
                          <img
                            src={getIconUrl(sport.iconName)}
                            alt={sport.name}
                            className="w-1/2 h-1/2 object-contain"
                          />
                        </div>
                        <div className="pb-2 text-center text-sm text-white font-medium">
                          {sport.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 선택된 스포츠 서브 카테고리 표시 */}
                {selectedSportCategory && (
                  <div className="flex items-center mt-3">
                    <h2 className="text-lg font-medium">
                      스포츠/{sportCategories.find(s => s.id === selectedSportCategory)?.name}
                    </h2>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            {/* 타이틀 영역 */}
            <div className="mb-4">
              <h1 className="ml-5 text-2xl font-bold text-white">
                {selectedCategory === 'all' 
                  ? '뉴키즈 뉴스' 
                  : categories.find(c => c.id === selectedCategory)?.name}
              </h1>
            </div>

            {/* 뉴스 목록 */}
            <div className="space-y-4">
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                    onClick={() => handleNewsClick(news.id)}
                  >
                    <div className="flex p-4">
                      <div className="w-24 h-24 rounded overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={news.imageUrl} 
                          alt={news.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-1 line-clamp-2">{news.title}</h3>
                        <p className="text-sm text-gray-600">{news.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
                  <p>해당 카테고리에 뉴스가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}