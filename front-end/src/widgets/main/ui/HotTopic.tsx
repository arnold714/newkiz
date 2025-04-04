import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "../styles/HotTopic.css"
import { useMediaQuery } from "react-responsive";
import { GetTodayNews } from "../api/MainApi";

export const HotTopic = () => {

    const {data: todayNews, isLoading, isError, error } = GetTodayNews();
    const isTablet = useMediaQuery({ query: "(min-width: 1279px) and (max-width: 1279px)" });
    const slidesPerView = isTablet ? 1 : 1.5;

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) {
        console.error("Error fetching today's news:", error); // 에러 로그 출력
        return  <div>Error: {error.message}</div>;
      }


    return (
        <div>
            <div>
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
                    className="mySwiper"
                    >
                    {todayNews.map((news) => (
                        <SwiperSlide key={news.id}>
                            <div className="news-slide">
                                <img src={news.img} alt={news.title}/>
                                <h3 className="news-title">{news.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>    
            </div>
        </div>
    );
};
