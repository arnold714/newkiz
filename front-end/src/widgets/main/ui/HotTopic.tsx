import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "../styles/HotTopic.css"
import { useMediaQuery } from "react-responsive";
import { GetTodayNews } from "../api/MainApi";
import { Link } from "react-router-dom";

const NewsSlide:React.FC<{id:string, image: string, title: string, article: string }> = ({id, image, title, article}) => (
    <>
        <div className="w-full h-full relative" data-id={id}>
            <img 
                loading="lazy"
                src={image} 
                alt={title}
                className="w-[400px] h-[270px] object-cover object-top rounded-lg"
                />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-[90%] p-4 rounded-lg bg-white/85  duration-300 mb-4">
                <div className="title mb-2 text-xl font-bold leading-tight truncate">{title}</div>
                <div className="content text-base leading-snug truncate">{article}</div>
            </div>
        </div>
    </>
)

export const HotTopic = () => {

    const {data: todayNews, isLoading, isError, error } = GetTodayNews();
    const isTablet = useMediaQuery({ query: "(min-width: 1279px) and (max-width: 1279px)" });
    const slidesPerView = isTablet ? 1 : 1.5;

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) {
        console.error(error); // 에러 로그 출력
        return  <div>Error: {error.message}</div>;
      }


    return (
        <div className="mt-5">
            <Swiper
                loop={true}
                effect={"slide"} 
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={slidesPerView}
                spaceBetween={-50} // 음수 값을 주어 슬라이드가 겹치도록 설정
                speed={500}
                pagination={isTablet ? false :{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                initialSlide={0} //일단 첫 번째 슬라이드 활성화
                className="mySwiper"
                >
                {todayNews.map((news) => (
                    <SwiperSlide key={news.id}>
                        <Link to={`detail/${news.id}`}>
                            <NewsSlide
                                id={news.id}
                                image={news.img} 
                                title={news.title}
                                article={news.article} 
                            />
                        </Link>
                  </SwiperSlide>
                ))}
            </Swiper>    
        </div>
    );
};
