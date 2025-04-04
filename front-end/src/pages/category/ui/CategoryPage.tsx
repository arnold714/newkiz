import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../model/categories';
import { Category, SubCategory } from '../model/types';

export const CategoryPage: React.FC = () => {
  // 기본 선택 카테고리
  const [selectedCategoryId, setSelectedCategoryId] = useState('it_science');
  const location = useLocation();
  const navigate = useNavigate();

  const isBaseRoute = location.pathname === '/category';

  // 현재 선택된 카테고리 정보
  const selectedCategory: Category | undefined = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  // 빨주노초파남보 순서로 Tailwind 색상 클래스를 미리 정의
  const colorSequence = [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-indigo-400',
    'bg-purple-400',
  ];

  /** 왼쪽 카테고리 클릭 시 */
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  /** 전체보기 클릭 시 */
  const handleViewAll = () => {
    navigate(`/category/details/${selectedCategoryId}`);
  };

  /** 서브 카테고리 컬러 가져오기 */
  const getSubCategoryColor = (index: number) => {
    // 예: 0 -> 빨강, 1 -> 주황, 2 -> 노랑, 3 -> 초록, ...
    return colorSequence[index % colorSequence.length];
  };

  /** 서브 카테고리 아이콘 URL */
  const getIconUrl = (iconName?: string) => {
    if (!iconName) return '';
    return `https://newkiz.s3.ap-northeast-2.amazonaws.com/categories/${iconName}.svg`;
  };

  return (
    <div className="w-full h-screen flex flex-col pb-20 overflow-auto">
      {isBaseRoute && (
        <>
          {/* 상단 헤더 */}
          <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-2xl font-bold">카테고리</h2>
          </div>

          <div className="flex flex-1 bg-gray-100 overflow-hidden pb-20">
            {/* 왼쪽 카테고리 목록 */}
            <div className="w-1/3 overflow-y-auto border-r border-gray-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`py-4 px-4 hover:bg-gray-200 cursor-pointer 
                    border-b border-gray-200 ${
                      selectedCategoryId === category.id ? 'bg-white font-bold' : ''
                    }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <span
                    className={`text-lg font-semibold ${
                      selectedCategoryId === category.id ? 'text-green-500' : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            {/* 오른쪽 서브 카테고리 목록 */}
            <div className="w-2/3 bg-white p-4 overflow-y-auto">
              {/* 헤더 영역 */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">
                  {selectedCategory?.name || '카테고리 선택'}
                </h3>
                <div
                  className="text-lg text-gray-500 cursor-pointer"
                  onClick={handleViewAll}
                >
                  전체보기 &gt;
                </div>
              </div>

              {/* 서브 카테고리 그리드 */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedCategory?.subCategories.map(
                  (subCategory: SubCategory, index: number) => {
                    const colorClass = getSubCategoryColor(index);
                    return (
                      <div
                        key={subCategory.id}
                        className="cursor-pointer"
                        onClick={handleViewAll}
                      >
                        <div
                          className={`rounded-lg overflow-hidden shadow-lg ${colorClass} aspect-square flex flex-col`}
                        >
                          <div className="flex-grow flex items-center justify-center">
                            {subCategory.iconName && (
                              <img
                                src={getIconUrl(subCategory.iconName)}
                                alt={subCategory.name}
                                className="w-2/3 h-2/3 object-contain"
                              />
                            )}
                          </div>
                          <div className="pb-4 text-center text-white font-bold">
                            {subCategory.name}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Outlet - 하위 라우트(디테일 페이지) 표시용 */}
      <Outlet />
    </div>
  );
};