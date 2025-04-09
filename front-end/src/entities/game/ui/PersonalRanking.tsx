import React from "react";
import { PersonalRank } from "@/pages/game/model/types";

interface PersonalRankingComponentProps {
  personalRanks: PersonalRank[];
}

const PersonalRanking: React.FC<PersonalRankingComponentProps> = ({ personalRanks }) => {
  const medalUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

  return (
    <div className="ranking-container">
      <h3>개인 랭킹</h3>
      <div className="top-rankers">
        {personalRanks.slice(0, 3).map((ranker, index) => (
          <div key={ranker.userId} className={`top-ranker rank-${index + 1}`}>
            <div className="medal">
              <img src={`${medalUrl}/medal-${index + 1}.png`} alt={`${index + 1}등 메달`} />
            </div>
            <div className="ranker-name">{ranker.nickname}</div>
            <div className="ranker-score">{ranker.totalScore}점</div>
          </div>
        ))}
      </div>
      
      <div className="ranking-table">
        <table>
          <thead>
            <tr>
              <th>랭킹</th>
              <th>닉네임</th>
              <th>총점</th>
            </tr>
          </thead>
          <tbody>
            {personalRanks.map((row) => (
              <tr key={row.userId}>
                <td>{row.rank}</td>
                <td>{row.nickname}</td>
                <td>{row.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalRanking;
