import { SchoolRanking } from "@/entities/game";
import { getSchoolRank } from "@/pages/game/api/GameApi";
import { SchoolRank } from "@/pages/game/model/types";
import { useEffect, useState } from "react";
import { LuChevronLeft } from "react-icons/lu";

interface SchoolRankingModalProps {
  closeModal: () => void;
}

export const SchoolRankingModal = ({ closeModal }: SchoolRankingModalProps) => {
  const [schoolRanking, setSchoolRanking] = useState<SchoolRank[]>([]);

  useEffect(() => {
    const fetchSchoolRanking = async () => {
      try {
        const schoolResponse = await getSchoolRank();
        console.log("학교 랭킹 response:", schoolResponse);
        if (schoolResponse.success && schoolResponse.data.rankings) {
          setSchoolRanking(schoolResponse.data.rankings);
        }
      } catch (error) {
        console.error("학교 랭킹 불러오기 실패:", error);
      }
    };

    fetchSchoolRanking();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center py-5">
      <div className="flex flex-row w-full justify-start items-center gap-3">
        <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
        <p className="font-bold text-2xl">학교 랭킹</p>
      </div>
      <SchoolRanking schoolRanks={schoolRanking} />
    </div>
  )
}