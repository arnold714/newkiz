import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

export const ProgressGraph: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 300,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '55%',
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -7,
            show: true,
            color: '#202020',
           fontSize: windowWidth < 640 ? '12px' : '18px',
           fontFamily: 'Pretendard',
           fontWeight: 'bold'
          },
          value: {
            color: '#202020',
            offsetY: windowWidth < 640 ? 2 : 15,
            fontSize: windowWidth < 640 ? '18px' : '30px',
            show: true,
            fontFamily: 'Pretendard',
            fontWeight: 'bold'
          },
        },
        track: {
          background: '#E0E0E0', // 트랙 색상 설정
        },
      },
    },
    fill: {
      colors: ['#7CBA36'], // 진행 바 색상 변경
    },
    stroke: {
      lineCap: 'round', 
    },
    labels: ['오늘 읽은 뉴스'], 
  };

  const series = [50]; // 진행률 (퍼센트)

  return (
    <div className="bg-white/90 shadow-m rounded-[15px] shadow-[4px_4px_3px_rgba(0,0,0,0.13)] w-40 h-40 m-3 sm:w-60 sm:h-60">
      <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
    </div>
  );
};

