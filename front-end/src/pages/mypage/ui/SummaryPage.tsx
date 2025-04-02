import { useState } from "react";
import { LuChevronLeft, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface Summary {
    id: number;
    title: string;
    summary: string;
    aiSummary: string;
  }
  
  interface OpenSummaries {
    [key: number]: boolean;
  }

export const SummaryPage = () => {
    const navigate = useNavigate();
    const [openSummaries, setOpenSummaries] = useState<OpenSummaries>({});

    const summaries: Summary[] = [
        {
            id: 1,
            title: "기사 제목1",
            summary: "유저 요약 내용",
            aiSummary: "ai 요약 내용",
        },
        {
            id: 2,
            title: "기사 제목2",
            summary: "유저 요약 내용",
            aiSummary: "ai 요약 내용",
        },
        {
            id: 3,
            title: "기사 제목3",
            summary: "유저 요약 내용",
            aiSummary: "ai 요약 내용",
        },
        {
            id: 4,
            title: "기사 제목4",
            summary: "유저 요약 내용",
            aiSummary: "ai 요약 내용",
        },
    ];

    // 토글 함수
    const toggleSummary = (id: number) => {
        setOpenSummaries(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="w-full h-full flex flex-col items-center mt-5">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">AI 요약</p>
            </div>
            <div className="flex flex-col w-[90%] items-center my-5">
                {summaries.map((summary) => (
                    <div key={summary.id} className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3">
                        <div 
                            className="flex flex-row items-center justify-between cursor-pointer" 
                            onClick={() => toggleSummary(summary.id)}
                        >
                            <p className="font-semibold text-[16px]">{summary.title}</p>
                            {openSummaries[summary.id] ? 
                                <LuChevronUp className="text-gray-500" /> : 
                                <LuChevronDown className="text-gray-500" />
                            }
                        </div>
                        
                        {/* 토글이 열렸을 때만 내용 표시 */}
                        {openSummaries[summary.id] && (
                            <div className="mt-2 transition-all duration-300 ease-in-out">
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500 mb-1 font-semibold">나의 요약</p>
                                    <p className="text-sm text-[#9E9E9E]">{summary.summary}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500 mb-1 font-semibold">AI 요약</p>
                                    <p className="text-sm text-[#9E9E9E]">{summary.aiSummary}</p>
                                </div>
                                <div className="flex flex-row w-full justify-end mt-2">
                                    <button className="py-2 px-5 bg-[#7CBA36] text-white rounded-lg text-sm">
                                        기사 보러 가기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
