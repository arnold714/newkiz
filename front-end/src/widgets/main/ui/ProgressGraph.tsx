import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

export const ProgressGraph: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<string>("")

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const series = [50] // 진행률 (퍼센트)

  const checkTimeValidity = () => {
    const now = dayjs()
    const currentHour = now.hour()
    const currentMinute = now.minute()
    const currentSecond = now.second()

    // 17시 50분 00초부터 17시 59분 50초까지만 활성화
    if (currentHour === 17 && currentMinute >= 50 && (currentMinute < 59 || (currentMinute === 59 && currentSecond <= 50))) {
      setIsEnabled(true)

      // 남은 시간 계산
      const endTime = dayjs().set("hour", 17).set("minute", 59).set("second", 50)
      const diffInSeconds = endTime.diff(now, "second")

      const minutes = Math.floor(diffInSeconds / 60)
      const seconds = diffInSeconds % 60

      // mm:ss 형식으로 포맷팅
      setRemainingTime(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
    } else {
      setIsEnabled(false)
      setRemainingTime("")
    }
  }

  useEffect(() => {
    // 초기 상태 확인
    checkTimeValidity()

    // 1초마다 시간 확인
    const intervalId = setInterval(checkTimeValidity, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-white/90 shadow-m rounded-[15px] shadow-[4px_4px_3px_rgba(0,0,0,0.13)] w-40 h-40 m-3 sm:w-60 sm:h-60 flex justify-center items-center">
      {isEnabled ? (
        <div className="flex flex-col items-center justify-center">
          <p>{remainingTime}</p>
          <button disabled={!isEnabled} className={`time-limited-button ${isEnabled ? "active" : "disabled"}`}>
            버튼
          </button>
        </div>
      ) : (
        <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
      )}
    </div>
  )
}
