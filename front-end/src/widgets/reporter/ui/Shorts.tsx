import SwipeCarousel from "@/shared/ui/SwipeCarousel";
import "../styles/Shorts.css"
interface ShortsItem {
    id: number;
    title: string;
    description: string;
};

const shortsData:ShortsItem[] = [
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
]

export const Shorts = () => {

    return (
        <div>
            <div className="mt-3">
                <SwipeCarousel
                    slidesToShow ={3.5}
                    infinite={true}
                    className="shorts-carousel"
                    swipeToSlide={true}
                    arrows={false}
                    dots={false}
                >
                {shortsData.map((item) => (
                    <div key={item.id} className="bg-white w-[10px] h-[120px] p-2 rounded-lg shadow-[4px_4px_3px_rgba(0,0,0,0.13)]">
                        <div className="">
                            {item.title}
                        </div>
                    </div>
                ))}    
                </SwipeCarousel>
            </div>
            
        </div>
    );
};
