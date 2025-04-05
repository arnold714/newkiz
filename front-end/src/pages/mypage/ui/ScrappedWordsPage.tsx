import { useEffect, useState } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { fetchScrappedWords } from "@/pages/mypage";
import { VocaItem } from "@/features/mypage/model/types";


export const ScrappedWordsPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [scrappedWords, setScrappedWords] = useState<VocaItem[]>([]);
    
    // 마운트 시 스크랩한 단어 목록 불러오기
  useEffect(() => {
    (async () => {
      const words = await fetchScrappedWords();
      setScrappedWords(words);
    })();
  }, []);

  // 검색 기능 (단순 클라이언트 필터링)
  const filteredWords = scrappedWords.filter((item) =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
        <div className="w-full h-full flex flex-col mt-5">
            {/* 헤더 */}
            <div className="flex flex-row justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">스크랩한 단어</p>
            </div>

            {/* 검색창 */}
            <div className="relative w-full h-10 flex flex-row items-center justify-center my-5">
                <input
                type="text"
                placeholder="검색하세요"
                maxLength={30}
                className="border-1 border-[#919191] px-4 pr-10 w-full h-full rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
        </div>

            {/* 스크랩한 단어 목록 */}
            <div className="flex flex-col w-full items-center my-3 mt-5"></div>
            {filteredWords.map((wordItem) => (
                        <div key={wordItem.wordId} className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3">
                            <p className="font-semibold text-[16px]">{wordItem.word}</p>
                        </div>
                    ))}
            </div>
    )
}