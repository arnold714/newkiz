import Carousel from "./Carousel";

const HotTopicNews = () => {

  return (
    <div>
      <div className="text-2xl font-bold text-center m-3">
        주목해야 할 오늘의 뉴스🔥
      </div>
      <div className="flex justify-center">
        <div className="relative  w-full max-w-[600px] h-[70px] flex justify-center items-center perspective-[1000px] mt-[20px]">
          <Carousel />
        </div>
      </div>
    </div>
  );
};
export default HotTopicNews;