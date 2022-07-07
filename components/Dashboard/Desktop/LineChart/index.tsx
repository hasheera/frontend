import { useAppSelector } from "hooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { dashboardData } from "store/slices/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DashboardLineChart = () => {
  const { dashboard } = useAppSelector(dashboardData)
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dashboard.loaded) {
      const keys = Object.keys(dashboard.data?.revenue_chart);

      // sorted date
      keys.sort((a: any, b: any) => +new Date(a).getTime() - +new Date(b));

      const days = keys.map((day) => new Date(day).toLocaleString("en-us", { weekday: "short" }));
      const values = keys.map((key) => dashboard.data?.revenue_chart[key]);

      setLabels(days);
      setData(values);
    }
  }, [dashboard]);

  const series = [
    {
      name: "Revenue",
      data,
    },
  ];

  const options: any = {
    labels,
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "",
      labels: {
        style: {
          colors: [
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
          ],
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      type: "",
      labels: {
        style: {
          colors: [
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
          ],
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default DashboardLineChart;
