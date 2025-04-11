import React from "react";
import { PersonalRank } from "@/pages/game/model/types";

interface PersonalRankingComponentProps {
    personalRanks: PersonalRank[];
}

const PersonalRanking: React.FC<PersonalRankingComponentProps> = ({ personalRanks }) => {
    const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

    return (
        <div className="flex flex-col w-full h-full justify-center mb-5">
            {personalRanks && personalRanks.length > 0 ? (
                <>
                    <div className="flex flex-row flex-1 h-full w-full justify-evenly items-end">
                        {personalRanks && personalRanks.length > 0 && (
                            <>
                                <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                                    <p>{personalRanks[1]?.nickname}</p>
                                    <img src={`${imgUrl}dinos/${personalRanks[1]?.characterId}.png`} alt={`2nd ranker`} className="w-14 h-14" />
                                    <div className="w-14 h-22 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                                        <img src={`${imgUrl}assets/silver.png`} alt="silver medal" className="absolute" />
                                        <p className="absolute bottom-1 font-semibold text-white">{personalRanks[1]?.totalScore}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                                    <p>{personalRanks[0]?.nickname}</p>
                                    <img src={`${imgUrl}dinos/${personalRanks[0]?.characterId}.png`} alt={`1st ranker`} className="w-14 h-14" />
                                    <div className="w-14 h-26 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                                        <img src={`${imgUrl}assets/gold.png`} alt="gold medal" className="absolute" />
                                        <p className="absolute bottom-1 font-semibold text-white">{personalRanks[0]?.totalScore}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                                    <p>{personalRanks[2]?.nickname}</p>
                                    <img src={`${imgUrl}dinos/${personalRanks[2]?.characterId}.png`} alt={`3rd ranker`} className="w-14 h-14" />
                                    <div className="w-14 h-18 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                                        <img src={`${imgUrl}assets/bronze.png`} alt="bronze medal" className="absolute" />
                                        <p className="absolute bottom-1 font-semibold text-white">{personalRanks[2]?.totalScore}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-5 overflow-auto">
                        {personalRanks.slice(3).length > 0 &&
                            <table className="w-full text-sm text-left text-black">
                                <thead className="text-xs bg-[#E8F5D8] border-b">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 text-center">랭킹</th>
                                        <th scope="col" className="px-3 py-2 text-center">닉네임</th>
                                        <th scope="col" className="px-3 py-2 text-center">총점</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personalRanks.slice(3).map((row, index) => (
                                        <tr key={row.rank} className={`bg-white border-b hover:bg-gray-50 ${index === personalRanks.length - 4 ? "border-b border-[#7CBA36]" : ""}`}>
                                            <td className="px-3 py-1 text-center">{row.rank}</td>
                                            <td className="px-3 py-1 text-center">{row.nickname}</td>
                                            <td className="px-3 py-1 text-center">{row.totalScore}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </>
            ) : (
                <div>데이터를 조회할 수 없습니다.</div>
            )}
        </div>
    );
};

export default React.memo(PersonalRanking);
