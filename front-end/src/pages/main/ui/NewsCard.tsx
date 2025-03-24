import React from "react";

interface NewsCardProps {
    image: string;
    title: string;
    onClick: () => void;
    transformZ: string; 
}

const NewsCard = ({image, title, onClick,transformZ }: NewsCardProps) => {
    return (
        <div className="w-[200px] h-[200px] bg-cover bg-center rounded flex justify-center items-center cursor-pointer mx-1"
        style={{
            backgroundImage: `url(${image})`,
            transform: `translateZ(${transformZ})`, // translateZ 적용
          }}
        onClick={onClick}
        >
            <span className="text-sm font-normal">{title}</span>

        </div>
    );
};

export default NewsCard;