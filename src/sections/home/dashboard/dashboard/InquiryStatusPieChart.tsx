import React from 'react';
import Chart from 'react-apexcharts';

interface InquiryStatusPieChartProps {
  data: {
    categoryName?: string;
    count?: number;
  }[];
}

const InquiryStatusPieChart: React.FC<InquiryStatusPieChartProps> = ({ data }) => {
  const chartOptions = {
    labels: data.map(item => item.categoryName),
  };

  const chartSeries = data.map(item => item.count);

  return (
    <Chart
      options={chartOptions as any}
      series={chartSeries as any}
      type="pie"
      width="100%"
      height="435"
    />
  );
};

export default InquiryStatusPieChart;
