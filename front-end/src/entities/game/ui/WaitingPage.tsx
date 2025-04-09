import { useEffect, useState } from "react"
import { RankType } from "../model/type"
import PersonalRanking from './PersonalRanking'
import SchoolRanking from "./SchoolRanking"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import '@shared/styles/CustomScroll.css';
import { NewWaitingInfo } from "@/features/game/model/types";
import { PersonalRank, SchoolRank } from "@/pages/game/model/types";
import { getPersonalRank, getSchoolRank } from "@/pages/game/api/GameApi";

interface WaitingPageProps {
  waitingInfo: NewWaitingInfo;
}

export const WaitingPage = ({ waitingInfo }: WaitingPageProps) => {
  const [time, setTime] = useState<number | null>(null);
  const [selected, setSelected] = useState<RankType>("personal")
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false)
  const [schoolRanking, setSchoolRanking] = useState<SchoolRank[]>([]);
  const [personalRanking, setPersonalRanking] = useState<PersonalRank[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const [schoolResponse, personalResponse] = await Promise.all([
          getSchoolRank(),
          getPersonalRank()
        ]);
        if (schoolResponse.success && schoolResponse.data.rank) {
          setSchoolRanking(schoolResponse.data.rank);
        }
        if (personalResponse.success && personalResponse.data.rank) {
          setPersonalRanking(personalResponse.data.rank);
        }
      } catch (error) {
        console.error("랭킹 정보 불러오기 실패:", error);
      }
    };
  
    fetchRankings();
  }, []);

  useEffect(()=>{
    setTime(waitingInfo.timeLeft)
  }, [waitingInfo.timeLeft])

  useEffect(() => {
    if (!time) return;

    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime && prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const onClick = (type: RankType) => {
    setSelected(type)
  }

  const handleToggle = (): void => {
    setIsToggleOpen((prev) => !prev);
  }

  return (
    <div className={`max-h-120 w-full flex flex-col items-center bg-white opacity-90 rounded-xl`}>
      <div className="text-black flex font-bold text-xl mt-5 mb-3 w-full relative px-5">
        <div className="flex flex-row w-full justify-center relative">
          <div className="flex flex-col items-center w-full">
            <p>게임 시작까지 남은 시간 : </p>
            <p>{time}</p>
          </div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer transition-transform duration-300 ease-in-out" onClick={handleToggle}>
            {
              isToggleOpen ? <MdOutlineKeyboardArrowUp className="transition-opacity duration-300" /> : <MdOutlineKeyboardArrowDown className="transition-opacity duration-300" />
            }
          </div>
        </div>
      </div>
      {
        isToggleOpen &&
        <div className="flex flex-col items-center flex-1 w-full font-bold text-[#212121] overflow-auto scroll">
          <div className="flex flex-col h-[90%] w-full pt-5 items-center">
            <div className="flex flex-row justify-evenly w-2/3 ">
              <p className={`text-xl mb-2 cursor-pointer ${selected === "personal" ? "text-[#7CBA36] border-b-3 border-[#7CBA36]" : ""}`} onClick={() => onClick("personal")}>
                개인 랭킹{" "}
              </p>
              <p className={`text-xl mb-2 cursor-pointer ${selected === "school" ? "text-[#7CBA36] border-b-3 border-[#7CBA36]" : ""}`} onClick={() => onClick("school")}>
                학교 랭킹{" "}
              </p>
            </div>
            <div className="flex flex-col flex-1 w-2/3 text-black items-center mt-5">
              {selected === "personal" ? (
                <PersonalRanking personalRanks={personalRanking} />
              ) : (
                <SchoolRanking schoolRanks={schoolRanking} />
              )}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
