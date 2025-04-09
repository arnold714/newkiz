import BaseCarousel, { BaseCarouselProps } from 'shared/ui/BaseCarousel';

export default function SwipeCarousel({
    children,
    slidesToShow = 5, // 디테일 페이지에서는 슬라이드 5개 보여주기
    infinite = true,
    swipeToSlide = true,
    arrows= false,
    className = 'detail-carousel',
    afterChange,
    }: BaseCarouselProps) {
    return (
        <BaseCarousel slidesToShow={slidesToShow} infinite={infinite} className={className} afterChange={afterChange} swipeToSlide={swipeToSlide} arrows={arrows}>
        {children}
        </BaseCarousel>
    );
}