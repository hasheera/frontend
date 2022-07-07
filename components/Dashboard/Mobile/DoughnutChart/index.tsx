import React, { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { dashboardData } from "store/slices/dashboard";
import { useAppSelector } from "hooks";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


const DoughnutChart = () => {
  const { dashboard } = useAppSelector(dashboardData);
  const [series, setSeries] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (dashboard.loaded ) {
      setSeries([
        dashboard.data.total_expenses,
        dashboard.data.pos_payment,
        dashboard.data.recovered_debt,
        0,
        dashboard.data.bank_transfer_payment,
        dashboard.data.cash_payment,
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard.data]);

  // const series = [
  //   dashboard.data.total_expenses,
  //   dashboard.data.pos_payment,
  //   dashboard.data.recovered_debt,
  //   41,
  //   dashboard.data.bank_transfer_payment,
  //   dashboard.data.cash_payment,
  // ];
  // const series = [30, 2, 29, 41, 8, 24];

  const options: any = {
    labels: [
      "Expenses",
      "POS",
      "Recovered debt",
      "Online",
      "Bank Transfer",
      "Cash",
    ],
    dataLabels: {
      enabled: false,
    },
    colors: ["#EA4D33", "#9E42CC", "#EBA10F", "#2153CC", "#D4D8E2", "#0CA85D"],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "374px",
            height: "374px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "right",
      fontWeight: 500,
      fontSize: "11px",
      horizontalAlign: "center",
      labels: {
        colors: "#030319",
      },
      markers: {
        width: 5,
        height: 5,
      },
    },
  };

  return <ReactApexChart options={options} series={series} type="donut" />;
};

export default DoughnutChart;
