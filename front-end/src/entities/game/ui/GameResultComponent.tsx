import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useEffect, useMemo, useState } from 'react';
import { GameResult } from '@/entities/character/model/types';

export const GameResultComponent = ({ results }: { results: GameResult[] }) => {
    const [rawData, setRawData] = useState<GameResult[]>([]);

    useEffect(() => {
        setRawData(results);
    }, [results]);

    // 컬럼 정의에 keyof GameResult 타입을 사용
    const columnDefs = useMemo(() => [
        {
            headerName: '순위',
            field: 'rank' as keyof GameResult,
            sortable: true,
            width: 80
        },
        {
            headerName: '닉네임',
            field: 'nickname' as keyof GameResult,
            sortable: true,
            flex: 1
        },
        {
            headerName: '점수',
            field: 'score' as keyof GameResult,
            sortable: true,
            width: 100
        },
        {
            headerName: '총점',
            field: 'totalScore' as keyof GameResult,
            sortable: true,
            width: 100
        },
        {
            headerName: '순위 변동',
            field: 'rankChange' as keyof GameResult,
            sortable: true,
            width: 120,
            cellRenderer: (params: any) => {
                if (params.value > 0) return `↑ ${params.value}`;
                if (params.value < 0) return `↓ ${Math.abs(params.value)}`;
                return '-';
            }
        }
    ], []);

    // 기본 컬럼 설정
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true
    }), []);

    return (
        <div className="flex flex-col items-center h-full w-full bg-white bg-opacity-50 rounded-xl p-6 relative px-4">
            <p className="text-black text-2xl font-bold">게임 결과</p>
            <div className="ag-theme-alpine w-full h-[400px]">
                <AgGridReact
                    rowData={rawData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
        </div>
    );
};
