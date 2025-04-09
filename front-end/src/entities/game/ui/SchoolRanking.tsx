import React from "react";
import { SchoolRank } from "@/pages/game/model/types";

interface SchoolRankingComponentProps {
  schoolRanks: SchoolRank[];
}

const SchoolRanking: React.FC<SchoolRankingComponentProps> = ({ schoolRanks }) => {
  const medalUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

  return (
    <div className="flex flex-col w-full h-full justify-center mb-5">
      <div className="flex flex-row flex-1 h-full w-full justify-evenly items-end">
        {schoolRanks && schoolRanks.length > 0 && (
          <>
            <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
              <p>{schoolRanks[1]?.schoolName}</p>
              <div className="w-14 h-20 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                <img src={`${medalUrl}assets/silver.png`} alt="silver medal" className="absolute" />
              </div>
            </div>
            <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
              <p>{schoolRanks[0]?.schoolName}</p>
              <div className="w-14 h-24 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                <img src={`${medalUrl}assets/gold.png`} alt="gold medal" className="absolute" />
              </div>
            </div>
            <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
              <p>{schoolRanks[2]?.schoolName}</p>
              <div className="w-14 h-16 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                <img src={`${medalUrl}assets/bronze.png`} alt="bronze medal" className="absolute" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-5 overflow-auto">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs bg-[#E8F5D8] border-b">
            <tr>
              <th scope="col" className="px-3 py-2 text-center">
                랭킹
              </th>
              <th scope="col" className="px-3 py-2 text-center">
                학교
              </th>
              <th scope="col" className="px-3 py-2 text-center">
                총점
              </th>
            </tr>
          </thead>
          <tbody>
            {schoolRanks && schoolRanks.length > 3 ? (
              schoolRanks.slice(3).map((row, index) => (
                <tr key={row.rank} className={`bg-white border-b hover:bg-gray-50 ${index === schoolRanks.length - 4 ? "border-b border-[#7CBA36]" : ""}`}>
                  <td className="px-3 py-1 text-center">{row.rank}</td>
                  <td className="px-3 py-1 text-center">{row.schoolName}</td>
                  <td className="px-3 py-1 text-center">{row.totalScore}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-3 py-1 text-center">데이터가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(SchoolRanking);
