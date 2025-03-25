import { useState } from "react"
import { RankType } from "../model/type"

export const WaitingPage = () => {
  const [selected, setSelected] = useState<RankType>("personal")

  const medalUrl = import.meta.env.VITE_AWS_S3_BASE_URL

  const onClick = (type: RankType) => {
    setSelected(type)
  }

  return (
    <div className="h-full w-full flex flex-col items-center bg-white opacity-80 rounded-xl">
      <div className="text-black flex font-bold">
        게임 시작까지 남은 시간 : <br />
        <h1>00:11</h1>
      </div>
      <div className="flex flex-col items-center flex-1 w-full font-bold text-[#212121]">
        <div className="flex flex-col h-[90%] w-full pt-5 items-center">
          <div className="flex flex-row justify-evenly w-2/3 ">
            <p className={`text-xl mb-2 cursor-pointer ${selected === "personal" ? "text-[#7CBA36] border-b-3 border-[#7CBA36]" : ""}`} onClick={() => onClick("personal")}>
              개인 랭킹{" "}
            </p>
            <p className={`text-xl mb-2 cursor-pointer ${selected === "school" ? "text-[#7CBA36] border-b-3 border-[#7CBA36]" : ""}`} onClick={() => onClick("school")}>
              학교 랭킹{" "}
            </p>
          </div>
          <div className="flex flex-col h-full w-2/3 text-black items-center mt-5 overflow-auto">
            {selected === "personal" ? (
              <div className="flex flex-col w-full justify-center">
                <div className="flex flex-row flex-1 h-full w-full justify-evenly items-end">
                  <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>커믈승아</p>
                    <img src={`${medalUrl}dinos/olaf.png`} alt="olaf" className="w-14 h-14" />
                    <div className="w-14 h-20 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                      <img src={`${medalUrl}assets/silver.png`} alt="silver medal" className="absolute" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>뚜부인주</p>
                    <img src={`${medalUrl}dinos/sena.png`} alt="sena" className="w-14 h-14" />
                    <div className="w-14 h-24 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                      <img src={`${medalUrl}assets/gold.png`} alt="gold medal" className="absolute" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>zㅣ존재형</p>
                    <img src={`${medalUrl}dinos/tard.png`} alt="tard" className="w-14 h-14" />
                    <div className="w-14 h-16 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                      <img src={`${medalUrl}assets/bronze.png`} alt="bronze medal" className="absolute" />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <table className="w-full text-sm text-left text-black border border-[#7CBA36]">
                    <thead className="text-xs bg-[#E8F5D8] border-b border-[#7CBA36]">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-center">
                          랭킹
                        </th>
                        <th scope="col" className="px-3 py-2 text-center">
                          닉네임
                        </th>
                        <th scope="col" className="px-3 py-2 text-center">
                          총점
                        </th>
                        <th scope="col" className="px-3 py-2 text-center">
                          학교
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { rank: 4, name: "김코딩", score: 87, school: "연동초" },
                        { rank: 5, name: "박자바", score: 82, school: "화정남초" },
                        { rank: 6, name: "이리액트", score: 78, school: "야동초" },
                        { rank: 7, name: "최타입", score: 73, school: "연동초" },
                        { rank: 8, name: "정파이썬", score: 68, school: "화정남초" },
                        { rank: 9, name: "강노드", score: 62, school: "야동초" },
                        { rank: 10, name: "황스크립트", score: 55, school: "연동초" },
                      ].map((row, index) => (
                        <tr key={row.rank} className={`bg-white border-b hover:bg-gray-50 ${index === 6 ? "border-b border-[#7CBA36]" : ""}`}>
                          <td className="px-3 py-1 text-center">{row.rank}</td>
                          <td className="px-3 py-1 text-center">{row.name}</td>
                          <td className="px-3 py-1 text-center">{row.score}</td>
                          <td className="px-3 py-1 text-center">{row.school}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-center">
                <div className="flex flex-row flex-1 h-full w-full justify-evenly items-end">
                  <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>화정남초</p>
                    <img src={`${medalUrl}dinos/olaf.png`} alt="olaf" className="w-14 h-14" />
                    <div className="w-14 h-20 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                      <img src={`${medalUrl}assets/silver.png`} alt="silver medal" className="absolute" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>연동초</p>
                    <img src={`${medalUrl}dinos/sena.png`} alt="sena" className="w-14 h-14" />
                    <div className="w-14 h-24 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                      <img src={`${medalUrl}assets/gold.png`} alt="gold medal" className="absolute" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>야동초</p>
                    <img src={`${medalUrl}dinos/tard.png`} alt="tard" className="w-14 h-14" />
                    <div className="w-14 h-16 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                      <img src={`${medalUrl}assets/bronze.png`} alt="bronze medal" className="absolute" />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <table className="w-full text-sm text-left text-black border border-[#7CBA36]">
                    <thead className="text-xs bg-[#E8F5D8] border-b border-[#7CBA36]">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-center">
                          랭킹
                        </th>
                        <th scope="col" className="px-3 py-2 text-center">
                          닉네임
                        </th>
                        <th scope="col" className="px-3 py-2 text-center">
                          총점
                        </th>
                        <th scope="col" className="px-3 py-2 text-center">
                          학교
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { rank: 4, name: "김코딩", score: 87, school: "연동초" },
                        { rank: 5, name: "박자바", score: 82, school: "화정남초" },
                        { rank: 6, name: "이리액트", score: 78, school: "야동초" },
                        { rank: 7, name: "최타입", score: 73, school: "연동초" },
                        { rank: 8, name: "정파이썬", score: 68, school: "화정남초" },
                        { rank: 9, name: "강노드", score: 62, school: "야동초" },
                        { rank: 10, name: "황스크립트", score: 55, school: "연동초" },
                      ].map((row, index) => (
                        <tr key={row.rank} className={`bg-white border-b hover:bg-gray-50 ${index === 6 ? "border-b border-[#7CBA36]" : ""}`}>
                          <td className="px-3 py-1 text-center">{row.rank}</td>
                          <td className="px-3 py-1 text-center">{row.name}</td>
                          <td className="px-3 py-1 text-center">{row.score}</td>
                          <td className="px-3 py-1 text-center">{row.school}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
