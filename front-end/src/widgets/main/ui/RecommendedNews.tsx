import { useState } from "react";
import Button from "@/shared/ui/Button";
import { GetRecommendNews, GetRecommendCategory } from "../api/MainApi";
import "@shared/styles/CustomScroll.css"
import { interest, Category } from "@/features/main";
import { Link } from "react-router-dom";
import "../styles/ReommendedNews.css"

interface RecommendedNewsProps {
    userProfile: {
       interests: string[];
    }
};

export const RecommendedNews: React.FC<RecommendedNewsProps> = ({ userProfile }) => {
    const interests = userProfile.interests;
    const categories = ["전체", ...interests];
    
    const {data: recommendedNews, isLoading: isNewsLoading, isError: isNewsError, error: newsError, } = GetRecommendNews();
    // 선택한 카테고리 버튼 값
    const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
    const {data: recommendedCategory, isLoading: isCatLoading, isError: isCatError, error: catError, } = GetRecommendCategory(selectedCategory);
    
    // 선택된 카테고리에 따라 보여줄 데이터
    const newsToDisplay = selectedCategory === "전체" ? recommendedNews : recommendedCategory;
    const isLoadingDisplay = selectedCategory === "전체" ? isNewsLoading : isCatLoading;
    const isErrorDisplay = selectedCategory === "전체" ? isNewsError : isCatError;
    const errorDisplay = selectedCategory === "전체" ? newsError : catError;
    
    if (isLoadingDisplay) return <div>Loading</div>;
    if (isErrorDisplay) {
      console.error("Error fetching today's news:", errorDisplay);
      return <div>Error: {errorDisplay?.message || 'An unknown error occurred'}</div>;
    }

    return (
        <div>
            {/* 카테고리 버튼 리스트 */}
            <div className="flex justify-between items-center px-10">
                <div className="flex-shrink-0 w-1"></div>
                {/* 카테고리 버튼 리스트 */}
                <div className="flex gap-3 overflow-x-auto whitespace-nowrap">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            label={category === "전체" ? "전체" : interest[category]}
                            selected={selectedCategory === category}
                            onClick={() => setSelectedCategory(category)}
                            className="text-xl rounded-xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
                        />
                    ))}
                </div>
                <div className="flex-shrink-0 w-1"></div>
            </div>

            {/* 해당 카테고리의 뉴스 카드 */}
            <div className="mt-5 space-y-4 pb-20">
                {newsToDisplay && newsToDisplay.length > 0 ? (
                newsToDisplay.map((news) => (
                    <Link to={`detail/${news.id}`}>
                    <div
                    key={news.id}
                    className="flex mb-4 items-start p-4 bg-white rounded-[10px] mx-10 shadow-[0px_3px_6px_rgba(32,32,32,0.23)] transform transition-transform duration-200 hover:scale-105 focus:scale-105"
                    >
                    <img
                        src={news.img}
                        alt={news.title}
                        className="w-[150px] h-[150px] object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="ml-4 flex flex-col justify-start">
                        <h3 className="text-2xl font-bold text-[#202020] clamp-2 mb-2">
                        {news.title}
                        </h3>
                        <p className="text-xl text-gray-600 clamp-2">
                        {news.article}
                        </p>
                    </div>
                    </div>
                    </Link>
                ))
                ) : (
                <div className="text-center text-gray-500 text-lg">
                    해당 카테고리에 추천 뉴스가 없습니다.
                </div>
                )}
            </div>
        </div>
    );
};
