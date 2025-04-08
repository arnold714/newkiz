import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useEffect, useMemo, useState } from "react"
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community"
import { useNavigate } from "react-router-dom"
import "@entities/game/styles/GameResultComponent.css"
import { ScoreRank, ScoreRow } from "@/features/game/model/types"

// 필요한 모듈 등록
ModuleRegistry.registerModules([ClientSideRowModelModule])

interface GameResultComponentProps {
  scoreRank: ScoreRank
}

export const GameResultComponent = ({ scoreRank }: GameResultComponentProps) => {
  const [rawData, setRawData] = useState<ScoreRow[]>()

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const converted = Object.entries(scoreRank).map(([rank, score]) => ({
      rank: Number(rank),
      ...score,
    }))
    setRawData(converted)
  }, [scoreRank])

  // 컬럼 정의에 keyof GameResult 타입을 사용
  const columnDefs = useMemo<ColDef<ScoreRow>[]>(
    () => [
      {
        headerName: "순위",
        field: "rank",
        sortable: true,
        width: 80,
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
        width: 80,
      },
      {
        headerName: "총점",
        field: "totalScore",
        sortable: true,
        width: 80,
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

  return (
    <div className="flex flex-col items-center h-full w-full bg-white bg-opacity-50 rounded-xl p-6 relative px-4">
      <p className="text-[#7CBA36] text-3xl font-bold mb-4">최종 기록</p>
      <div className="ag-theme-alpine w-full h-2/3 custom-ag-grid">
        <AgGridReact<ScoreRow> rowData={rawData} columnDefs={columnDefs} defaultColDef={defaultColDef} animateRows={true} domLayout="autoHeight" />
      </div>
      <button className="absolute bottom-2 bg-[#7CBA36] rounded-md px-10 py-2 text-lg font-bold text-white" onClick={handleGoBack}>
        나가기
      </button>
    </div>
  )
}
