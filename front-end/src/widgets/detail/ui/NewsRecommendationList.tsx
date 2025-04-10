import { GetRelatedNews } from "../api/DetailApi";
import SwipeCarousel from "@/shared/ui/SwipeCarousel";
import { Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
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
        {relatedNews.map((item, idx) => (
           <Link to={`/detail/${item.id}`} key={item.id}>
           <div className="flex flex-col  bg-[#FFFFFF] border-1 border-[#EBEBEB] h-[160px] w-[180px] p-2 rounded-lg cursor-pointer">
             <div className="text-[#BFD46F] font-bold text-[25px] ">{idx+1}</div>
             <div className="font-semibold text-[16px] clamp-3 mx-1 mt-2">{item.title}</div>
             <div className="flex justify-end items-center mt-1">
              <p className="mr-1 font-semibold">더보기</p>
              <LuChevronRight size={15}/>
             </div>

           </div>
         </Link>
        ))}
      </SwipeCarousel>
    </div>
  </div>
  );
};
