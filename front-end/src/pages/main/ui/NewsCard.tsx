
interface NewsCardProps {
    image: string;
    title: string;
    onClick: () => void;
    index: number;
    totalCards: number;
}

const NewsCard = ({ image, title, onClick, index, totalCards }: NewsCardProps) => {
    const angleBetweenCards = 360 / totalCards;
    // const radius = (200 / 2) / Math.tan(Math.PI / totalCards); // 반지름 계산
    const radius=300; // 반지름 설정
    return (
        <div
            className=" absolute flex justify-center items-center w-[170px] h-[170px] transition-transform shadow-lg rounded-md transform-gpu cursor-pointer "
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

                transform: `rotateY(${index * angleBetweenCards}deg) translateZ(${radius}px)`,
            }}
            onClick={onClick}
            >
            <span className="bg-white text-black px-4 py-2 rounded-md">{title}</span>
        </div>
      );
};

export default NewsCard;