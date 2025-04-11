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
import { AxiosError } from 'axios';  
import { showError } from "@/shared"; 
import { useNavigate } from "react-router-dom";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const UserStatistic = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        try {
          const data = await fetchUserGraph();
          if (data) {
            setGraphData(data);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              navigate("/login"); // 로그인 페이지로 리다이렉트
              alert("로그인이 필요합니다");
            } else if (error.response?.status === 403) {
              showError("프로필을 등록해주세요");
              navigate("/userinfo"); // 프로필 등록 페이지로 리다이렉트
            }
          }
        }
      })();
    }, [navigate]);

      const chartData = {
        labels: ["경제", "스포츠", "세계", "생활/문화", "사회", "정치", "IT/과학"], // X축 라벨
        datasets: [
            {
              label: "관심도",
              data: graphData
                ? [
                    Math.max(graphData.economy, 20),
                    Math.max(graphData.sports, 20),
                    Math.max(graphData.world, 20),
                    Math.max(graphData.culture, 20),
                    Math.max(graphData.society, 20),
                    Math.max(graphData.politics, 20),
                    Math.max(graphData.it_SCIENCE, 20),
                  ]
                : [30, 30, 30, 30, 30, 30, 30],
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