import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useEffect, useMemo, useState } from "react"
import { GameResult } from "@/entities/character/model/types"
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community"
import { useNavigate } from "react-router-dom"

// 필요한 모듈 등록
ModuleRegistry.registerModules([ClientSideRowModelModule])

interface GameResultComponentProps {
  results: GameResult[]
}

export const GameResultComponent = ({ results }: GameResultComponentProps) => {
  const [rawData, setRawData] = useState<GameResult[]>([])

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    setRawData(results)
  }, [results])

  // 컬럼 정의에 keyof GameResult 타입을 사용
  const columnDefs = useMemo<ColDef<GameResult>[]>(
    () => [
      {
        headerName: "순위",
        field: "rank",
        sortable: true,
        width: 60,
      },
      {
        headerName: "닉네임",
        field: "nickname",
        sortable: true,
        flex: 1,
      },
      {
        headerName: "점수",
        field: "score",
        sortable: true,
        width: 60,
      },
      {
        headerName: "총점",
        field: "totalScore",
        sortable: true,
        width: 60,
      },
      {
        headerName: "순위 변동",
        field: "rankChange",
        sortable: true,
        width: 90,
        cellRenderer: (params: any) => {
          if (params.value > 0) return `↑ ${params.value}`
          if (params.value < 0) return `↓ ${Math.abs(params.value)}`
          return "-"
        },
      },
    ],
    []
  )

  // 기본 컬럼 설정
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  )

  // 테스트용 더미 데이터 (실제 사용 시 제거)
  const dummyData = useMemo<GameResult[]>(
    () => [
      { rank: 1, nickname: "플레이어1", score: 100, totalScore: 500, rankChange: 2 },
      { rank: 2, nickname: "플레이어2", score: 90, totalScore: 450, rankChange: -1 },
      { rank: 3, nickname: "플레이어3", score: 85, totalScore: 420, rankChange: 0 },
      { rank: 4, nickname: "플레이어4", score: 80, totalScore: 400, rankChange: 3 },
      { rank: 5, nickname: "플레이어5", score: 75, totalScore: 380, rankChange: -2 },
    ],
    []
  )

  // 실제 데이터가 없을 경우 더미 데이터 사용
  const displayData = rawData.length > 0 ? rawData : dummyData

  return (
    <div className="flex flex-col items-center h-full w-full bg-white bg-opacity-50 rounded-xl p-6 relative px-4">
      <p className="text-[#7CBA36] text-3xl font-bold mb-4">최종 기록</p>
      <div className="ag-theme-alpine w-full h-2/3">
        <AgGridReact<GameResult> rowData={displayData} columnDefs={columnDefs} defaultColDef={defaultColDef} animateRows={true} domLayout="autoHeight" />
      </div>
      <button className="absolute bottom-2 bg-[#7CBA36] rounded-md px-10 py-2 text-lg font-bold text-white" onClick={handleGoBack}>
        나가기
      </button>
    </div>
  )
}
