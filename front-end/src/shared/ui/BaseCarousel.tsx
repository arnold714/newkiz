// 메인 파일 상단 또는 SwipeCarousel 컴포넌트 내부에 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export type BaseCarouselProps = {
    children: React.ReactNode;
    slidesToShow?: number;
    infinite?: boolean;
    className?: string;
    swipeToSlide?:boolean;
    arrows?:boolean;
    dots?:boolean;
    afterChange?: (index: number) => void;
};

export default function BaseCarousel({
    children,
    slidesToShow = 3,
    infinite = true,
    className ='',
    swipeToSlide= true,
    arrows=false,
    dots=false,
    afterChange,
    
}:BaseCarouselProps) {
    const settings = {
        infinite,
        slidesToShow,
        swipeToSlide,
        className,
        arrows,
        dots,
        afterChange,
    };
    return (
        <div className="w-auto overflow-hidden">
            <Slider {...settings}>{children}</Slider>
        </div>
    )
}

