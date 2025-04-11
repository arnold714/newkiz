import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Category, categories } from '@/features/category';
import { LuX } from 'react-icons/lu';
import { SubCategoryGrid } from '@/widgets/category';

export const CategoryPage: React.FC = () => {
  // 기본 선택 카테고리
  const [selectedCategoryId, setSelectedCategoryId] = useState('it_science');
  const location = useLocation();
  const navigate = useNavigate();
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

  const isBaseRoute = location.pathname === '/category';

  // 현재 선택된 카테고리 정보
  const selectedCategory: Category | undefined = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  const colorSequence = [
    'bg-[#F86060]',
    'bg-[#FBB76F]',
    'bg-[#F8D460]',
    'bg-[#A5E75A]',
    'bg-[#8DBDFF]',
    'bg-[#AE9DF5]',
    'bg-[#FFC2DE]',
  ];

  /** 왼쪽 카테고리 클릭 시 */
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  /** 전체보기 클릭 시 */
  const handleViewAll = () => {
    navigate(`/category/details/${selectedCategoryId}`);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    // 카테고리는 이미 selectedCategoryId에 있음
    navigate(`/category/details/${selectedCategoryId}/${subCategoryId}`);
  };

  /** 서브 카테고리 컬러 가져오기 */
  const getSubCategoryColor = (index: number) => {
    // 예: 0 -> 빨강, 1 -> 주황, 2 -> 노랑, 3 -> 초록, ...
    return colorSequence[index % colorSequence.length];
  };

  /** 서브 카테고리 아이콘 URL */
  const getIconUrl = (iconName?: string) => {
    if (!iconName) return '';
    return `${imgUrl}categories/${iconName}.svg`;
  };

  const handleBackClick = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className="w-full h-screen flex flex-col pb-10 overflow-auto">
      {isBaseRoute && (
        <>
          {/* 상단 헤더 */}
          <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-2xl font-bold">카테고리</h2>
            {/* X 버튼 - 뒤로 가기 */}
            <LuX
              onClick={handleBackClick}
              size={24}
            />
          </div>

          <div className="flex flex-1 bg-gray-100 overflow-hidden pb-20">
            {/* 왼쪽 카테고리 목록 */}
            <div className="w-1/3 overflow-y-auto border-r border-gray-200 ">
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
                {/* 전체보기 버튼 */}
                <div className="text-lg text-gray-500 cursor-pointer" onClick={handleViewAll}>
                  전체보기 &gt;
                </div>
              </div>

              {/* 서브 카테고리 그리드 */}
              <SubCategoryGrid
                subCategories={selectedCategory?.subCategories || []}
                onSubClick={(subId) => handleSubCategoryClick(subId)}
                getColorClass={getSubCategoryColor}
                getIconUrl={getIconUrl}
                containerClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              />
            </div>
          </div>
        </>
      )}
      {/* Outlet - 하위 라우트(디테일 페이지) 표시용 */}
      <Outlet />
    </div>
  );
};