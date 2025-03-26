import React from "react";


const PersonalRanking = () => {

    const medalUrl = import.meta.env.VITE_AWS_S3_BASE_URL

    return (
        <div className="flex flex-col w-full h-full justify-center mb-5">
            <div className="flex flex-row flex-1 h-full w-full justify-evenly items-end">
                <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>야동초</p>
                    <div className="w-14 h-20 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                        <img src={`${medalUrl}assets/silver.png`} alt="silver medal" className="absolute" />
                    </div>
                </div>
                <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>화정남초</p>
                    <div className="w-14 h-24 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                        <img src={`${medalUrl}assets/gold.png`} alt="gold medal" className="absolute" />
                    </div>
                </div>
                <div className="flex flex-col items-center w-14 overflow-visible whitespace-nowrap">
                    <p>목원초</p>
                    <div className="w-14 h-16 bg-[#7CBA36] rounded-lg shadow-xl relative flex justify-center">
                        <img src={`${medalUrl}assets/bronze.png`} alt="bronze medal" className="absolute" />
                    </div>
                </div>
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
                        {[
                            { rank: 4, score: 87, school: "연동초" },
                            { rank: 5, score: 82, school: "화정남초" },
                            { rank: 6, score: 78, school: "야동초" },
                            { rank: 7, score: 73, school: "연동초" },
                            { rank: 8, score: 68, school: "화정남초" },
                            { rank: 9, score: 62, school: "야동초" },
                            { rank: 10, score: 55, school: "연동초" },
                        ].map((row, index) => (
                            <tr key={row.rank} className={`bg-white border-b hover:bg-gray-50 ${index === 6 ? "border-b border-[#7CBA36]" : ""}`}>
                                <td className="px-3 py-1 text-center">{row.rank}</td>
                                <td className="px-3 py-1 text-center">{row.school}</td>
                                <td className="px-3 py-1 text-center">{row.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default React.memo(PersonalRanking);