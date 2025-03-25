import { useState } from 'react';
import { rankType } from '../model/type';

export const WaitingPage = () => {
    const [selected, setSelected] = useState<rankType>("personal");

    const onClick = (type: rankType) => {
        setSelected(type);
    };


    return(
        <div className="h-full w-full flex flex-col items-center bg-white opacity-80 rounded-xl">
            <div className="text-black flex font-bold">
                게임 시작까지 남은 시간 : <br />
                <h1>00:11</h1>
            </div>
            <div className="flex flex-col items-center flex-1 w-full font-bold text-[#212121]">
                <div className="flex flex-col h-1/2 w-full pt-5 items-center">
                    <div className="flex flex-row justify-between w-2/3 ">
                        <p className={`text-xl mb-2 ${selected === "personal" ? "text-[#7CBA36] border-b-3 border-[#7CBA36]" : ""}`} onClick={()=>onClick("personal")}>개인 랭킹 </p>
                        <p className={`text-xl mb-2 ${selected === "school" ? "text-[#7CBA36] border-b-3 border-[#7CBA36]" : ""}`} onClick={()=>onClick("school")}>학교 랭킹 </p>
                    </div>
                    <div className="flex h-1/2 w-full text-black">
                        {
                            selected === "personal"?
                            <div className="flex flex-col flex-1 h-full w-full justify-center items-center">
                                <p>뚜부인주</p>
                                <p>커믈승아</p>
                                <p>zㅣ존재형</p>
                            </div>
                            :
                            <div className="flex flex-col flex-1 h-full w-full justify-center items-center">
                                <p>화정남초</p>
                                <p>연동초</p>
                                <p>야동초</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-full items-center justify-center text-black">
                    <p className="text-xl mb-2">zㅣ승아zon 님의 기록 </p>
                    <p>우승 횟수 : 0회</p>
                    <p>최고 점수 : 2점</p>
                    <p>학교 : 화정남초</p>
                </div>
            </div>
        </div>
    )
}