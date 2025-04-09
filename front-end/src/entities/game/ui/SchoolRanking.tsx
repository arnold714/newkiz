import React from "react";
import { SchoolRank } from "@/pages/game/model/types";

interface SchoolRankingComponentProps {
  schoolRanks: SchoolRank[];
}

const SchoolRanking: React.FC<SchoolRankingComponentProps> = ({ schoolRanks }) => {
  const medalUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

  return (
    <div className="ranking-container">
      <h3>학교 랭킹</h3>
      <div className="top-rankers">
        {schoolRanks.slice(0, 3).map((ranker, index) => (
          <div key={ranker.schoolId} className={`top-ranker rank-${index + 1}`}>
            <div className="medal">
              <img src={`${medalUrl}/medal-${index + 1}.png`} alt={`${index + 1}등 메달`} />
            </div>
            <div className="ranker-name">{ranker.schoolName}</div>
            <div className="ranker-score">{ranker.totalScore}점</div>
          </div>
        ))}
      </div>
      
      <div className="ranking-table">
        <table>
          <thead>
            <tr>
              <th>랭킹</th>
              <th>학교명</th>
              <th>총점</th>
            </tr>
          </thead>
          <tbody>
            {schoolRanks.map((row) => (
              <tr key={row.schoolId}>
                <td>{row.rank}</td>
                <td>{row.schoolName}</td>
                <td>{row.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolRanking;
