import { useState, useEffect } from "react";
import { LuChevronLeft, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { fetchSummaries } from "@/pages/mypage";
import { SummaryItem } from "@/features/mypage";

  interface OpenSummaries {
    [key: string]: boolean;
  }

export const SummaryPage = () => {
    const navigate = useNavigate();
    const [openSummaries, setOpenSummaries] = useState<OpenSummaries>({});

    // 서버에서 받아온 요약 목록
    const [summaries, setSummaries] = useState<SummaryItem[]>([]);

    useEffect(() => {
        (async () => {
          const data = await fetchSummaries();
          setSummaries(data);
        })();
      }, []);

    // 토글 함수
    const toggleSummary = (id: string) => {
        setOpenSummaries(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleGoToArticle = (link: string) => {
        window.open(link, "_blank");
      };

    return (
        <div className="w-full h-full flex flex-col items-center mt-5">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">AI 요약</p>
            </div>
            <div className="flex flex-col w-[90%] items-center my-5">
            {summaries.map((item) => {
                const summaryId = item.newsSummary.id;       // 식별자
                const title = item.newsDocument.title;       // 기사 제목
                const userSummary = item.newsSummary.summary; // 사용자 요약
                const aiSummary = item.newsDocument.article; // AI 요약 (서버 필드명 확인)
                const link = item.newsDocument.link;         // 기사 링크

                return (
                    <div
                    key={summaryId}
                    className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3"
                    >
                    {/* 제목 + 토글 아이콘 */}
                    <div
                        className="flex flex-row items-center justify-between cursor-pointer"
                        onClick={() => toggleSummary(summaryId)}
                    >
                        <p className="font-semibold text-[16px]">{title}</p>
                        {openSummaries[summaryId] ? (
                        <LuChevronUp className="text-gray-500" />
                        ) : (
                        <LuChevronDown className="text-gray-500" />
                        )}
                    </div>

                    {/* 토글 열림 상태라면 요약 내용 표시 */}
                    {openSummaries[summaryId] && (
                        <div className="mt-2 transition-all duration-300 ease-in-out">
                        <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1 font-semibold">나의 요약</p>
                            <p className="text-sm text-[#9E9E9E]">{userSummary}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1 font-semibold">AI 요약</p>
                            <p className="text-sm text-[#9E9E9E]">{aiSummary}</p>
                        </div>
                        <div className="flex flex-row w-full justify-end mt-2">
                            <button
                            className="py-2 px-5 bg-[#7CBA36] text-white rounded-lg text-sm"
                            onClick={() => handleGoToArticle(link)}
                            >
                            기사 보러 가기
                            </button>
                        </div>
                        </div>
                    )}
                    </div>
                );
                })}

                {/* 만약 요약이 하나도 없을 때 표시 */}
                {summaries.length === 0 && (
                <div className="w-full flex justify-center mt-5">
                    <p className="text-sm text-[#9E9E9E]">요약된 기사가 없습니다.</p>
                </div>
                )}
            </div>
        </div>
    );
};
