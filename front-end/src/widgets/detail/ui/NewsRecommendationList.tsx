import { GetRelatedNews } from "../api/DetailApi";
import SwipeCarousel from "@/shared/ui/SwipeCarousel";
import { Link } from "react-router-dom";
import "../styles/NewsRecommendationList.css"

interface NewsDetailContentProps {
  id?: string;
}

export const NewsRecommendationList:React.FC<NewsDetailContentProps> = ({id}) => {
  if (!id) {
    return <div>뉴스 아이디가 없습니다.</div>;
  }
  const {data: relatedNews, isLoading, isError, error } = GetRelatedNews(id);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>{error.message}</div>

  return (
    <div>
    <div className="mt-3">
      <SwipeCarousel
        slidesToShow={3.5}
        infinite={true}
        className="news-carousel"
        swipeToSlide={true}
        arrows={false}
        dots={false}
      >
        {relatedNews.map((item) => (
           <Link to={`/detail/${item.id}`} key={item.id}>
           <div className="bg-white border-2 border-[#EBEBEB] h-[200px] p-2 rounded-lg cursor-pointer">
             <div className="font-semibold clamp-3">{item.title}</div>
             <p>더보기...</p>
           </div>
         </Link>
        ))}
      </SwipeCarousel>
    </div>
  </div>
  );
};
