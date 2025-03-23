import ReactApexChart from 'react-apexcharts';

const ProgressGraph: React.FC = () => {
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
            fontSize: '10px',
          },
          value: {
            color: '#202020',
            fontSize: '18px',
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
    <div className="bg-white w-35 h-35 shadow-m rounded-[15px] opacity-90 mr-10">
      <ReactApexChart options={options} series={series} type="radialBar" height="100%" />
    </div>
  );
};

export default ProgressGraph;
