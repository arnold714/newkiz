import ReactApexChart from 'react-apexcharts';

const ProgressGraph:React.FC = () => {
  const options:ApexCharts.ApexOptions = {
    chart: {
      height: 200,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin : 15,
          size: "70%"
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#202020',
            fontSize: '14px',
          },
          value: {
            color: '#202020',
            fontSize: '32px',
            show: true
          },
        },
      },
    },
  } 
  return (
    <div className="bg-white w-30 h-30 shadow-m rounded-[15px]  opacity-90 mr-10">
      
    </div>
  );
};

export default ProgressGraph;