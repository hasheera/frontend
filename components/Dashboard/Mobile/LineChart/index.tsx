import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "hooks";
import { dashboardData } from "store/slices/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineChart = () => {
  const { dashboard } = useAppSelector(dashboardData);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dashboard.loaded) {
      const keys = Object.keys(dashboard.data?.revenue_chart);

      // sorted date
      keys.sort((a: any, b: any) => +new Date(a).getTime() - +new Date(b));
      const days = keys.map((day) => new Date(day).toLocaleString("en-us", { weekday: "short" }));

      const values = keys.map((key) => dashboard.data?.revenue_chart[key]);

      setData(values);
      setLabels(days);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard.data]);

  const series = [
    {
      name: "Sales",
      data,
    },
  ];

  const options: any = {
    labels,
    chart: {
      height: "100%",
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      colors: "#0D2543",
    },

    tooltip: {
      show: false,
      x: {
        format: "MMM",
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FBCACC", "#0D2543"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
  };

  return <ReactApexChart series={series} options={options} type="line" />;
};

export default LineChart;
