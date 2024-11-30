
// material-ui
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';

// third-party
import ReactApexChart from 'react-apexcharts';

// types


// ==============================|| SALES COLUMN CHART ||============================== //

interface TableProps {
  categories?: string[] | undefined; // Categories for the x-axis
  noOfCustomers?: number[] | undefined; // Data for Customers
}

const SalesChart = ({ categories, noOfCustomers }: TableProps) => {

  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const columnChartOptions: any = {
    chart: {
      type: 'bar',
      height: 430,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories || [], // Schedule categories
    },
    yaxis: {
      title: {
        text: 'Number of Books'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter(val: number) {
          return ` ${val}`;
        }
      }
    },
    legend: {
      show: false
    },
    colors: [primaryMain], // Bar color
    responsive: [
      {
        breakpoint: 200,
        options: {
          yaxis: {
            show: false
          }
        }
      }
    ]
  };

  const series: any = [
    {
      name: "Number of Books",
      data: noOfCustomers, // Values for each schedule
    }
  ]

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="h6" color="secondary">
              Number of Books by Category
            </Typography>
            <Typography variant="h4"></Typography>
          </Stack>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked name="income" />}
                label="No. of Books"
              />
            </FormGroup>
          </FormControl>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={columnChartOptions} series={series} type="bar" height={435} />
        </Box>
      </Box>
    </MainCard>
  );
};

export default SalesChart;
