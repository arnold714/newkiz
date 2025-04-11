import { useEffect, useState } from "react";
import { LuChevronLeft, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { fetchScrappedNews } from "@/pages/mypage";
import { NewsItem } from "@/features/mypage";
import { Link } from "react-router-dom";

export const ScrappedNewsPage = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [scrappedNews, setScrappedNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        (async () => {
          const news = await fetchScrappedNews();
          setScrappedNews(news);
        })();
      }, []);

    const filteredNews = scrappedNews.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col mt-5">
            <div className="flex flex-row justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">스크랩한 기사</p>
            </div>
            <div className="flex flex-col items-center w-full overflow-auto">
                <div className="relative w-full h-10 flex flex-row items-center justify-center my-5">
                    <input
                        type="text"
                        placeholder="검색하세요"
                        maxLength={30}
                        className="border-1 border-[#919191] px-4 pr-10 w-full h-full rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="text-3xl font-bold absolute right-3">
                        <LuSearch />
                    </button>
                </div>
                <div className="flex flex-col w-full items-center my-3 mt-5">
                    {filteredNews.map((news) => (
                        <Link
                        key={news.id}
                        to={`/detail/${news.id}`}
                        className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3"
                        >
                        <p className="font-semibold text-[16px]">{news.title}</p>
                        <p className="text-sm text-[#9E9E9E] mt-1">{news.published}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}