import { useEffect, useState } from "react";
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { fetchUserGraph } from "@/widgets/mypage";
import { GraphData } from "@/features/mypage";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const UserStatistic = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);

    useEffect(() => {
        (async () => {
          const data = await fetchUserGraph();
          if (data) {
            setGraphData(data);
          }
        })();
      }, []);

      const chartData = {
        labels: ["경제", "스포츠", "세계", "생활/문화", "사회", "정치", "IT/과학"], // X축 라벨
        datasets: [
            {
              label: "관심도",
              data: graphData
                ? [
                    graphData.economy,
                    graphData.sports,
                    graphData.world,
                    graphData.culture,
                    graphData.society,
                    graphData.politics,
                    graphData.it_science,
                  ]
                : [0, 0, 0, 0, 0, 0, 0],
              backgroundColor: "rgba(126, 211, 33, 0.2)", // 내부 영역 색상
              borderColor: "#7ED321", // 외곽선 색상
              borderWidth: 2,
            },
          ],
        };

    const options = {
        scales: {
            r: {
                suggestedMin: 0, // 최소값
                suggestedMax: 100, // 최대값
                ticks: {
                    stepSize: 20, // 눈금 간격
                    display: false, 
                },
            },
        },
        plugins: {
            legend: {
                display: false, // 범례 숨김
            },
        },
    };

    if (!graphData) {
        return <div>로딩중...</div>;
      }

    return (
        <div className="w-full flex flex-col items-center">
            <p className="font-bold text-xl">어떤 카테고리에 관심이 많을까요?</p>
            <div className="w-[90%] aspect-square shadow-lg rounded-xl flex justify-center items-center">
                <Radar data={chartData} options={options} />
            </div>
        </div>
    )
}