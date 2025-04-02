import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('news');
  const navigate = useNavigate();

  const categories = [
    { id: 'news', name: '뉴키즈 뉴스' },
    { id: 'it', name: 'IT/과학' },
    { id: 'social', name: '사회' },
    { id: 'history', name: '역사' },
    { id: 'economy', name: '경제' },
    { id: 'politics', name: '정치' },
    { id: 'culture', name: '문화' },
    { id: 'sports', name: '스포츠' },
  ];

  const popularCategories: Category[] = [
    { id: 'soccer', name: '축구', iconName: 'soccer', color: 'bg-red-500' },
    { id: 'baseball', name: '야구', iconName: 'baseball', color: 'bg-orange-400' },
    { id: 'basketball', name: '농구', iconName: 'basketball', color: 'bg-yellow-400' },
    { id: 'volleyball', name: '배구', iconName: 'volleyball', color: 'bg-green-400' },
    { id: 'e-sports', name: 'e스포츠', iconName: 'e-sports', color: 'bg-blue-400' },
  ];

  const getIconUrl = (iconName: string) => {
    return `https://newkiz.s3.ap-northeast-2.amazonaws.com/categories/${iconName}.png`;
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate('/category/details');
  };

  return (
    <div className="w-full h-screen flex flex-col pb-20 overflow-auto scroll">
      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-2xl font-bold">카테고리</h2>
      </div>

      <div className="flex flex-1 bg-gray-100 overflow-hidden pb-20">
        <div className="w-1/3 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`py-4 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-200 
                          ${selectedCategory === category.id ? 'bg-white font-bold' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={`text-lg font-semibold ${selectedCategory === category.id ? 'text-green-500' : 'text-gray-700'
                }`}>{category.name}</span>
            </div>
          ))}
        </div>

        <div className="w-2/3 bg-white p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">
              {categories.find(cat => cat.id === selectedCategory)?.name || '뉴키즈 뉴스'}
            </h3>
            <div
              className="text-lg text-gray-500 cursor-pointer"
              onClick={()=>{handleCategoryClick(selectedCategory)}}
            >
              전체보기 &gt;
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {popularCategories.map((category) => (
              <div
                key={category.id}
                className="cursor-pointer"
                onClick={() => handleCategoryClick(`sports/${category.id}`)}
              >
                <div className={`rounded-lg overflow-hidden shadow-sm ${category.color} aspect-square flex flex-col`}>
                  <div className="flex-grow flex items-center justify-center">
                    <img
                      src={getIconUrl(category.iconName)}
                      alt={category.name}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                  <div className="pb-4 text-center text-md text-white font-medium">
                    {category.name}
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
