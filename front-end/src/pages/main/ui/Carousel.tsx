import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";  // 기존의 NewsCard 컴포넌트
import { useState } from "react";

const Carousel = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [newsList, setNewsList] = useState([
    { id: 1, title: "뉴스 1", image: "public/newsImage.png" },
    { id: 2, title: "뉴스 2", image: "public/newsImage2.png" },
    { id: 3, title: "뉴스 3", image: "public/newsImage3.png" },
    { id: 4, title: "뉴스 4", image: "public/newsImage.png" },
    { id: 5, title: "뉴스 5", image: "public/newsImage2.png" },
    { id: 6, title: "뉴스 6", image: "public/newsImage3.png" },
    { id: 7, title: "뉴스 7", image: "public/newsImage.png" },
    { id: 8, title: "뉴스 8", image: "public/newsImage2.png" },
    { id: 9, title: "뉴스 9", image: "public/newsImage3.png" },
    { id: 10, title: "뉴스 7", image: "public/newsImage.png" },

  ]);

  const [selectedNews, setSelectedNews] = useState({ id: 0, title: "" });
  const [stackIndex, setStackIndex] = useState<number>(0);

  const onSpinNews = (newsId: number) => {
    const matchingNews = newsList.find((news) => news.id === newsId);
    const relativeIndex = calculateRelativeIndex(selectedNews.id - 1, matchingNews.id - 1);
    setStackIndex((prevStackIndex) => prevStackIndex + relativeIndex);

    return matchingNews;
  };

  const updateNewsList = (matchingNews) => {
    const updatedNewsList = newsList.map((news) =>
      news.id === matchingNews.id ? { ...news, isSelected: true } : { ...news, isSelected: false }
    );
    setNewsList(updatedNewsList);
  };

  const onClickCard = (newsId: number) => {
    const matchingNews = onSpinNews(newsId);

    updateNewsList(matchingNews);

    // 로그인 여부 체크 주석 처리
    // if (userId) {
    //   navigate();
    // } else {
    //   alert("로그인 해주세요");
    // }

    // 로그인 없이 바로 뉴스 선택 처리
    setSelectedNews({ id: matchingNews.id, title: matchingNews.title });
  };

  const calculateRelativeIndex = (currentIndex: number, matchingIndex: number): number => {
    const distance = Math.abs(currentIndex - matchingIndex);
    if (distance > Math.floor(newsList.length / 2)) {
        return matchingIndex > currentIndex + Math.floor(newsList.length / 2)
          ? newsList.length - distance
          : distance - newsList.length;
    }
    return currentIndex - matchingIndex;
  };

  return (
      <div 
        className="flex justify-center items-center w-full"
        style={{
            transform: `rotateX(-5deg) translateY(-20px) rotateY(${stackIndex * 22.5}deg)`,
            transformStyle: "preserve-3d", // 3D 회전 스타일을 유지
          }}
        >
        <div
        className="flex transition-transform duration-500"
        style={{
          transform: `rotateX(-5deg) translateY(-20px) rotateY(${stackIndex * 22.5}deg)`,
        }}
      >
        {newsList.map((news, index) => (
          <NewsCard
            key={news.id}
            image={news.image}
            title={news.title}
            onClick={() => onClickCard(news.id)}
            transformZ={`${(index + 1) * 50}px`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
