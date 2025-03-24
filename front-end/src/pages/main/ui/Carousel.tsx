import { useState } from "react";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [newsList, setNewsList] = useState([
    { id: 1, title: "뉴스 1", image: "/newsImage.png" },
    { id: 2, title: "뉴스 2", image: "/newsImage2.png" },
    { id: 3, title: "뉴스 3", image: "/newsImage3.png" },
    { id: 4, title: "뉴스 4", image: "/newsImage.png" },
    { id: 5, title: "뉴스 5", image: "/newsImage2.png" },
    { id: 6, title: "뉴스 6", image: "/newsImage3.png" },
    { id: 7, title: "뉴스 7", image: "/newsImage.png" },
    { id: 8, title: "뉴스 8", image: "/newsImage2.png" },
    { id: 9, title: "뉴스 9", image: "/newsImage3.png" },
    { id: 10, title: "뉴스 10", image: "/newsImage.png" },
  ]);

  const [selectedNews, setSelectedNews] = useState({ id: 0, title: "" });
  //현재 중앙에 있는 카드를 알기 위한 
  const [stackIndex, setStackIndex] = useState<number>(0);
  

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
  
  const onSpinNews = (newsId: number) => {
  const matchingNews = newsList.find((news) => news.id === newsId);
  const relativeIndex = calculateRelativeIndex(
    stackIndex % newsList.length,
    matchingNews.id - 1
  );
    setStackIndex((prevStackIndex) => prevStackIndex + relativeIndex); // 중심축 고정

  return matchingNews;
};


  const updateNewsList = (matchingNews) => {
    const updatedNewsList = newsList.map((news) =>
      news.id === matchingNews.id ? { ...news, isSelected: true } : { ...news, isSelected: false }
    );
    setNewsList(updatedNewsList);
  };



  const calculateRelativeIndex = (currentIndex: number, targetIndex: number): number => {
    const totalCards = newsList.length;
    const distance = (targetIndex - currentIndex + totalCards) % totalCards; // 양수 거리 계산
    return distance > totalCards / 2 ? distance - totalCards : distance; // 가장 가까운 방향으로 회전
  };
  

  return (
    <div
      className="flex justify-center items-center w-full"
      style={{
        transformOrigin: "center center",
        transform: `rotateX(-5deg) translateY(-20px) rotateY(${stackIndex * 36}deg)`,
        transformStyle: "preserve-3d", // 3D 회전 스타일을 유지
      }}
    >
      <div
        className="flex transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${stackIndex * (360 / newsList.length)}deg)`,
          transition: "transform .5s ease-in-out",
          transformOrigin: "center center",
        }}
      >
        {newsList.map((news, index) => (
          <NewsCard
            key={news.id}
            image={news.image}
            title={news.title}
            onClick={() => onClickCard(news.id)}
            index={index}
            totalCards={newsList.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
