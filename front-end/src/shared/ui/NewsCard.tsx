
type NewsCardProps = {
    title: string;
    content: string;
    imageUrl: string;
    category?: string;
    
};

const NewsCard = ({ title, content, imageUrl}: NewsCardProps) => {
    return (
        <div className="flex items-start p-4 bg-white rounded-[10px] mx-10 shadow-[0px_3px_6px_rgba(32,32,32,0.23)]">
          <img
            src={imageUrl}
            alt={title}
            className="w-35 h-35 rounded-lg"
          />
          <div className="ml-4 flex flex-col justify-start">
            <h3 className="text-2xl font-bold text-[#202020] ">{title}</h3>
            <p className="text-xl text-gray-600 ">{content}</p>
          </div>
        </div>
      );
};
export default NewsCard;