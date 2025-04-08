import { useState } from "react";
import Button from "@/shared/ui/Button";
import {  NewsCategory } from "@/features/main/model/types";

interface RecommendedNewsProps {
    userProfile: {
       interests: string[]
    }
};

export const RecommendedNews: React.FC<RecommendedNewsProps> = ({ userProfile }) => {


    const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('전체');
    
    //카테고리 별 뉴스 필터링
    const filteredNews = selectedCategory === "전체"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

    return (
        <div>
            {/* 카테고리 버튼 리스트 */}
            <div className="flex justify-center gap-3">
                {userProfile.interests.map((category) => [
                    <Button
                        key={category.label}
                        label={category.label}
                        selected={selectedCategory === category.label}
                        onClick={() => setSelectedCategory(category.label as NewsCategory)}
                        className="text-xl  rounded-xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
                    />
                ])}
            </div>

            {/* 해당 카테고리의 뉴스 카드 */}
            <div className="mt-5 space-y-4 pb-20">
                {filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                        <div className="flex items-start p-4 bg-white rounded-[10px] mx-10 shadow-[0px_3px_6px_rgba(32,32,32,0.23)] transform transition-transform duration-200 hover:scale-105 focus:scale-105">
                            <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="w-35 h-35 rounded-lg"
                            />
                            <div className="ml-4 flex flex-col justify-start">
                            <h3 className="text-2xl font-bold text-[#202020] ">{news.title}</h3>
                            <p className="text-xl text-gray-600 ">{news.content}</p>
                            </div>
                        </div>
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
