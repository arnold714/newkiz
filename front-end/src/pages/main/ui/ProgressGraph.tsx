import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

const ProgressGraph: React.FC = () => {
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
            offsetY: -10,
            show: true,
            color: '#202020',
           fontSize: windowWidth < 640 ? '10px' : '18px',
          },
          value: {
            color: '#202020',
            fontSize: windowWidth < 640 ? '18px' : '30px',
            show: true,
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
    <div className="bg-white shadow-m rounded-[15px] opacity-90 mr-10
                    w-35 h-35
                    sm:w-60 sm:h-60
                    ">
      <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
    </div>
  );
};

export default ProgressGraph;
