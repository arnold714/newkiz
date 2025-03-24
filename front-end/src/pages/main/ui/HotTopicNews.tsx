
import Carousel from "./Carousel";

const HotTopicNews = () => {

  return (
    <div>
      <div className="text-2xl font-bold text-center m-3">
        주목해야 할 오늘의 뉴스🔥
      </div>
      <div className="flex justify-center">
      <div className="relative w-full h-[300px] overflow-hidden flex justify-center items-center perspective-[1000px]">
          <Carousel />
        </div>
      </div>
    </div>
  );
};
export default HotTopicNews;