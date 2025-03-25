import Button from "@/shared/ui/Button";
import NewsCard from "@/shared/ui/NewsCard";
import { useState } from "react";

const RecommendedNews = () => {

    //하드 코딩한 뉴스 데이터
    const newsData = [
        {
             title: '손흥민 시즌 12호 도움최고인데어디까지...',
             content: 'ai를 통해 한줄 요약',
             imageUrl: "/newsImage3.png",
             category: '스포츠'
        },
        {
            title: '김도영 시범경기부터..',
            content: 'ai를 통해 한줄 요약',
            imageUrl: "/newsImage2.png",
            category: '스포츠'
        },
        {
            title: '손흥민, 토트넘에 모..',
            content: 'ai를 통해 한줄 요약',
            imageUrl: "/newsImage3.png",
            category: '스포츠'
        },
        {
            title: '손흥민, 토트넘에 모..',
            content: 'ai를 통해 한줄 요약',
            imageUrl: "/newsImage3.png",
            category: '스포츠'
        }
    

    ]

    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    
    //카테고리 
    const categories = [
        {label: '전체'},
        {label: '스포츠'},
        {label: '경제'},
        {label: '정치'},
    ];

    //카테고리 별 뉴스 필터링
    const filteredNews = selectedCategory === "전체"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

    return (
        <div>
            <div className="text-2xl font-bold text-center m-3">
                zi재형zon 님을 위한 추천 뉴스
            </div>

            {/* 카테고리 버튼 리스트 */}
            <div className="flex justify-center gap-2">
                {categories.map((category) => [
                    <Button
                    key={category.label}
                    label={category.label}
                    selected={selectedCategory === category.label}
                    onClick={() => setSelectedCategory(category.label)}
                    className="text-xl  rounded-xl"
                  />
                ])}
            </div>

            {/* 해당 카테고리의 뉴스 카드 */}
            <div className="mt-5 space-y-4">
                {filteredNews.length > 0 ? (
                    filteredNews.map((news, index) => (
                        <NewsCard
                        key={index}
                        title={news.title}
                        content={news.content}
                        imageUrl={news.imageUrl}
                        category={news.category}
                        />
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
export default RecommendedNews;