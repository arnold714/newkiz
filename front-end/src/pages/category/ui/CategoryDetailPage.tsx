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

export default function CategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>();  // URL에서 categoryId를 가져옵니다.
  const navigate = useNavigate();

  const categories: Category[] = [
    { id: 'it_science', name: 'IT/과학' },
    { id: 'society', name: '사회' },
    { id: 'world', name: '세계' },
    { id: 'economy', name: '경제' },
    { id: 'politics', name: '정치' },
    { id: 'culture', name: '생활/문화' },
    { id: 'sports', name: '스포츠' },
    { id: 'entertainment', name: '연예' },
  ];

  const sportCategories: SportCategory[] = [
    { id: 'soccer', name: '축구', iconName: 'soccer', color: 'bg-red-500' },
    { id: 'baseball', name: '야구', iconName: 'baseball', color: 'bg-orange-400' },
    { id: 'basketball', name: '농구', iconName: 'basketball', color: 'bg-yellow-400' },
    { id: 'volleyball', name: '배구', iconName: 'volleyball', color: 'bg-green-400' },
    { id: 'e-sports', name: 'e스포츠', iconName: 'e-sports', color: 'bg-blue-400' },
  ];

  // 뉴스 데이터 샘플
  const newsItems = [
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
    navigate(`/category/details/${categoryId}`);
  };

  const handleSportCategoryClick = (sportCategoryId: string) => {
    navigate(`/category/details/${sportCategoryId}`);
  };

  const filteredNews = newsItems.filter(item => item.category === categoryId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        {/* 상단 여백 */}
        <div className="h-6"></div>

        <div className="z-10 bg-[#F2F6E2]">
          <div className="flex overflow-x-auto py-3 px-4 shadow-sm">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`px-4 py-1 mx-1 cursor-pointer whitespace-nowrap ${categoryId === category.id
                    ? 'font-bold text-lg text-black'
                    : 'font-bold text-lg text-gray-400'
                  }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>

          {/* 스포츠 카테고리 서브 카테고리 */}
          {categoryId === 'sports' && (
            <div className="bg-[#F2F6E2] px-4 pt-2 pb-2">
              <div className="grid grid-cols-8 gap-2 mb-2">
                {sportCategories.map((sport) => (
                  <div
                    key={sport.id}
                    className="cursor-pointer"
                    onClick={() => handleSportCategoryClick(sport.id)}
                  >
                    <div className={`${sport.color} rounded-lg overflow-hidden shadow-lg aspect-square flex flex-col`}>
                      <div className="flex-grow flex items-center justify-center">
                        <img
                          src={`https://newkiz.s3.ap-northeast-2.amazonaws.com/categories/${sport.iconName}.svg`}
                          alt={sport.name}
                          className="w-2/3 h-2/3 object-contain"
                        />
                      </div>
                      <div className="text-center pb-2 text-md text-white font-bold">
                        {sport.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 뉴스 항목 */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <h1 className="ml-5 text-2xl font-bold text-white">
              {categories.find(c => c.id === categoryId)?.name}
            </h1>
          </div>

          <div className="space-y-4">
            {filteredNews.map(news => (
              <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer">
                <div className="flex p-4">
                  <div className="w-24 h-24 rounded overflow-hidden mr-4 flex-shrink-0">
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">{news.title}</h3>
                    <p className="text-sm text-gray-600">{news.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}