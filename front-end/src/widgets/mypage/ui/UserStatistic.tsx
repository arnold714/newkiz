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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const UserStatistic = () => {

    const data = {
        labels: ["경제", "스포츠/연예", "세계", "문화", "사회", "정치"], // X축 라벨
        datasets: [
            {
                label: "관심도",
                data: [80, 80, 40, 90, 50, 60], // 관심도 데이터
                backgroundColor: "rgba(126, 211, 33, 0.2)", // 내부 색상 (투명도 포함)
                borderColor: "#7ED321", // 선 색상
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

    return (
        <div className="w-full flex flex-col items-center">
            <p className="font-bold text-xl">어떤 카테고리에 관심이 많을까요?</p>
            <div className="w-[90%] aspect-square shadow-lg rounded-xl flex justify-center items-center">
                <Radar data={data} options={options} />
            </div>
        </div>
    )
}