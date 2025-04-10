import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { GetTodayReadNewsCount } from "../api/MainApi"

export const ProgressGraph: React.FC = () => {

  const { data: todayReadNewsCount, isLoading, isError, error } = GetTodayReadNewsCount();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<string>("")
  const [startEnterTime, setStartEnterTime] = useState<string>("")

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) {
    console.error("Error fetching today read news:", error); // 에러 로그 출력
    return <div>Error: {error.message}</div>;
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "55%",
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -7,
            show: true,
            color: "#202020",
            fontSize: windowWidth < 640 ? "12px" : "18px",
            fontFamily: "Pretendard",
            fontWeight: "bold",
          },
          value: {
            color: "#202020",
            offsetY: windowWidth < 640 ? 2 : 15,
            fontSize: windowWidth < 640 ? "18px" : "30px",
            show: true,
            fontFamily: "Pretendard",
            fontWeight: "bold",
          },
        },
        track: {
          background: "#E0E0E0", // 트랙 색상 설정
        },
      },
    },
    fill: {
      colors: ["#7CBA36"], // 진행 바 색상 변경
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["오늘 읽은 뉴스"],
  }


  const percentage = (todayReadNewsCount.data / 5) * 100; // 퍼센트 계산
  const series = [percentage]

  // 시간 계산해서 버튼 보여주기
  const checkTimeValidity = () => {
    const now = dayjs(); // 현재 시간

    // 현재 시각 기준 입장 가능 시간 구간 정의
    const ENABLE_START_1 = dayjs().set("minute", 25).set("second", 0);
    const ENABLE_END_1 = dayjs().set("minute", 29).set("second", 59);
    const ENABLE_START_2 = dayjs().set("minute", 55).set("second", 0);
    const ENABLE_END_2 = dayjs().set("minute", 59).set("second", 59);

    // 입장 가능 여부 판단
    const isInTimeRange =
      (now.isAfter(ENABLE_START_1) && now.isBefore(ENABLE_END_1)) ||
      (now.isAfter(ENABLE_START_2) && now.isBefore(ENABLE_END_2));

    setIsEnabled(isInTimeRange);

    // 게임 시작까지 남은 시간 계산 (둘 중 가까운 쪽 기준)
    const nextEnableEnd = now.isBefore(ENABLE_END_1)
      ? ENABLE_END_1
      : ENABLE_END_2;

    const gameDiffInSeconds = nextEnableEnd.diff(now, "second");
    const gameHours = Math.floor(gameDiffInSeconds / 3600);
    const gameMinutes = Math.floor((gameDiffInSeconds % 3600) / 60);
    const gameSeconds = gameDiffInSeconds % 60;

    let formattedGameTime;
    if (gameDiffInSeconds >= 3600) {
      formattedGameTime = `${gameHours.toString().padStart(2, "0")}:${gameMinutes
        .toString()
        .padStart(2, "0")}:${gameSeconds.toString().padStart(2, "0")}`;
    } else {
      formattedGameTime = `${gameMinutes.toString().padStart(2, "0")}:${gameSeconds
        .toString()
        .padStart(2, "0")}`;
    }

    setRemainingTime(formattedGameTime);

    // 입장 가능 시간까지 남은 시간 계산
    if (!isInTimeRange) {
      let nextEnableStart;

      if (now.isBefore(ENABLE_START_1)) {
        nextEnableStart = ENABLE_START_1;
      } else if (now.isBefore(ENABLE_START_2)) {
        nextEnableStart = ENABLE_START_2;
      } else {
        // 둘 다 지났으면 다음 시의 25분으로 세팅
        nextEnableStart = now.add(1, "hour").set("minute", 25).set("second", 0);
      }

      const enterDiffInSeconds = nextEnableStart.diff(now, "second");
      const enterHours = Math.floor(enterDiffInSeconds / 3600);
      const enterMinutes = Math.floor((enterDiffInSeconds % 3600) / 60);
      const enterSeconds = enterDiffInSeconds % 60;

      let formattedEnterTime;
      if (enterDiffInSeconds >= 3600) {
        formattedEnterTime = `${enterHours.toString().padStart(2, "0")}:${enterMinutes
          .toString()
          .padStart(2, "0")}:${enterSeconds.toString().padStart(2, "0")}`;
      } else {
        formattedEnterTime = `${enterMinutes.toString().padStart(2, "0")}:${enterSeconds
          .toString()
          .padStart(2, "0")}`;
      }

      setStartEnterTime(formattedEnterTime);
    } else {
      setStartEnterTime("");
    }
  };


  useEffect(() => {
    // 초기 상태 확인
    checkTimeValidity()

    // 1초마다 시간 확인
    const intervalId = setInterval(checkTimeValidity, 1000)

    return () => clearInterval(intervalId)
  }, [])


  return (
    <div className="bg-white/90 shadow-m rounded-[15px] shadow-[4px_4px_3px_rgba(0,0,0,0.13)] w-40 h-40 m-3 sm:w-60 sm:h-60 flex justify-center items-center">
      {series[0] >= 100 ? ( // 오늘 할당량을 다 채웠다면 버튼 활성화
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-md">{isEnabled ? remainingTime : startEnterTime}</p>
          <p className="font-bold text-md">
            {isEnabled ? "후에 게임이 시작해요" : "후에 입장이 가능해요"}
          </p>
          {isEnabled ? (
            <Link
              to="/game"
              state={{ from: "/" }}
              className="rounded-lg px-3 py-2 bg-[#7CBA36] text-white font-semibold"
            >
              게임 입장하기
            </Link>
          ) : (
            <button
              disabled
              className="rounded-lg px-3 py-2 bg-[#d4d4d4] text-white font-semibold"
            >
              게임 입장하기
            </button>
          )}
        </div>
      ) : (
        <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
      )}
    </div>
  )
}
