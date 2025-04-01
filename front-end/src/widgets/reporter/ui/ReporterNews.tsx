import { useState } from 'react';
import { FaRegBookmark, FaBookmark, FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { ReporterArticle } from '@/features/reporter/model/types';

export const ReporterNews = () => {
    const [isReporterNewsScrapped, setIsReporterNewsScrapped] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const reporterNewsList: ReporterArticle[] = [
        {
            "id": "67e8ed6a964fa9feac8859db",
            "repoter": "zizon재형",
            "title": "KAIST, 망막 신경 재생을 통한 시력 회복하는 치료법 개발",
            "description": "연구팀, 퇴행성 망막질환 환자들에게 새 희망 기대...",
            "likes": 0
        },
        {
            "id": "67e8ed69964fa9feac8859da",
            "repoter": "zizon재형",
            "title": "장미향 '시트로넬롤', 지나치게 노출되면 뇌에 독성",
            "description": "화학연, 사용기준 보완 필요해...",
            "likes": 0
        },
        {
            "id": "67e8ed69964fa9feac8859d9",
            "repoter": "zizon재형",
            "title": "KISA “AI 시대 맞춰 22년 만에 새로운 국가 도메인 도입… 누구나 등록 가능”",
            "description": "신규 국가 도메인 4종 도입...",
            "likes": 0
        },
        {
            "id": "67e8ed69964fa9feac8859d8",
            "repoter": "zizon재형",
            "title": "고순도 발광 나노입자…맨눈에 보는 3D 영상 만든다",
            "description": "장호성 KIST 책임연구원 연구진...",
            "likes": 0
        },
    ];

    return (
        <div className="pt-2 pb-20 ">
            {reporterNewsList.map((news) => (
                <div key={news.id}>
                    <div className="flex items-center gap-2">
                        <img 
                            src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" 
                            alt="character_nico"
                            className='w-15 h-15 m-1 p-2 border-2 bg-white border-[#EFEFEF] rounded-[50px]'
                        />
                        <p className="text-xl font-semibold text-[#202020]">{news.repoter}</p>
                    </div>
                    <div className="bg-gray-200 w-auto h-80 flex items-center justify-center">
                        뉴스와 관련된 사진
                    </div>
                    <div className="flex justify-between m-2">
                        <div className="flex items-center gap-3">
                            {isLiked ? (
                                <FaHeart 
                                    size={25}
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="cursor-pointer text-[#FF5C5C]"
                                />
                            ) : (
                                <FaRegHeart 
                                    size={25}
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="cursor-pointer text-black"
                                />
                            )}
                            <div>
                                <FaRegComment 
                                    size={25}
                                />
                            </div>
                        </div>
                        <div>
                            {isReporterNewsScrapped ? (
                                <FaBookmark 
                                    size={25}
                                    onClick={() => setIsReporterNewsScrapped(!isReporterNewsScrapped)}
                                    className="cursor-pointer text-black"
                                />
                            ) : (
                                <FaRegBookmark 
                                    size={25}
                                    onClick={() => setIsReporterNewsScrapped(!isReporterNewsScrapped)}
                                    className="cursor-pointer text-black"
                                />
                            )}
                        </div>
                    </div>
                    <div className="mx-2">
                        게시글의 좋아요 수: {news.likes}
                    </div>
                    <div className="mx-2 mb-5">
                        {news.description}
                    </div>
                </div>
            ))}
        </div>
    );
};
