import { PersonalRanking } from "@/entities/game";
import { getPersonalRank } from "@/pages/game/api/GameApi";
import { PersonalRank } from "@/pages/game/model/types";
import { useEffect, useState } from "react";
import { LuChevronLeft } from "react-icons/lu";

interface PersonalRankingModalProps {
    closeModal: () => void;
}

export const PersonalRankingModal = ({ closeModal }: PersonalRankingModalProps) => {
      const [personalRanking, setPersonalRanking] = useState<PersonalRank[]>([]);
      
      useEffect(() => {
        const fetchPersonalRanking = async () => {
          try {
            const personalResponse = await getPersonalRank();
            console.log("학교 랭킹 response:", personalResponse);
            if (personalResponse.success && personalResponse.data.rank) {
              setPersonalRanking(personalResponse.data.rank);
            }
          } catch (error) {
            console.error("학교 랭킹 불러오기 실패:", error);
          }
        };
      
        fetchPersonalRanking();
      }, []);

    return (
        <div className="w-full h-full flex flex-col items-center py-5">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
                <p className="font-bold text-2xl">개인 랭킹</p>
            </div>
            <PersonalRanking personalRanks={personalRanking} />
        </div>
    )
}