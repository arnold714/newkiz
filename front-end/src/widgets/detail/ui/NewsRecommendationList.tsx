import SwipeCarousel from "@/shared/ui/SwipeCarousel";
import "../styles/NewsRecommendationList.css"
export interface NewsRecommendationList {
  id: number;
  title: string;
  description: string;
};

const NewsRecommendationData:NewsRecommendationList[] = [
  {
    id: 1,
    title: '우유 한박스 들고가는 고양이가 화제...',
    description: '한 고양이가 우유상자를...'
  },
  {
    id: 2,
    title: '알고보니 놀라운 비밀',
    description: '사진 속 진실은...'
  },
  {
    id: 3,
    title: '이것이 진짜 소식',
    description: '알아두면 좋은 정보'
  },
];

export const NewsRecommendationList = () => {
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
        {NewsRecommendationData.map((item) => (
          <div
            key={item.id}
            className="bg-white border-2 border-[#EBEBEB] w-[200px] h-[170px] p-2 rounded-lg cursor-pointer"
          >
            <div className="font-semibold">{item.title}</div>
            <p>더보기...</p>
          </div>
        ))}
      </SwipeCarousel>
    </div>
  </div>
  );
};
