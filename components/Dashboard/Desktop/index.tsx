import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  chakra,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spinner,
} from "@chakra-ui/react";
import DashboardTable from "@components/Dashboard/Table";
import { formatPrice } from "@utils/helpers";
import DashboardLineChart from "@components/Dashboard/Desktop/LineChart";
import PerfomanceCard from "@components/Dashboard/PerfomanceCard";
import TopSellingProducts from "@components/Dashboard/TopSellingProducts";
import { changeDashboardBatchType, dashboardData, getDashboardData } from "store/slices/dashboard";
import { useAppDispatch, useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import {
  BankIcon,
  CashIcon,
  ArrowUp,
  CalenderIcon,
  LampOnIcon,
  MoneyReceiveIcon,
  POSIcon,
  ExpensesIcon,
  DropDownIcon,
} from "../../../public/assets";
import "react-datepicker/dist/react-datepicker.css";


const DesktopView = () => {
  const { singleShop } = useAppSelector(shopsData);
  const { dashboard, dashboardBatchType } = useAppSelector(dashboardData);
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState<Date>(null);
  const [endDate, setEndDate] = useState<Date>(null);

  const applyDate = () => {
    // getTopSellingData(startDate, endDate);
  };

  const dateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    const from = dayjs(start).format("YYYY-MM-DD");
    const to = dayjs(end).format("YYYY-MM-DD");
    console.log(from, to)
    setStartDate(start);
    setEndDate(end);

    if (!start && !end) {
      dispatch<any>(getDashboardData({ id: singleShop.selectedShop.shop_id, directDate: "today" }));
    }

    if (end) {
      dispatch<any>(getDashboardData({ id: singleShop.selectedShop.shop_id, startDate: from, endDate: to }));
    }
  };

  const handleChangeBatch = (batch: string) => {
    dispatch<any>(changeDashboardBatchType(batch))
    dispatch<any>(getDashboardData({ id: singleShop.selectedShop.shop_id, directDate: batch }));
  }


  if (!dashboard.loaded) {
    return (
      <chakra.div display="flex" justifyContent="center" alignItems="center">
        <Spinner size="md" color="#2153CC" />
      </chakra.div>
    );
  }

  return (
    <>
      <chakra.p
        color="#1E2134"
        fontSize="22.19px"
        m="15px 0px"
        fontWeight="600"
      >
        Overview
      </chakra.p>

      <chakra.div display="flex" justifyContent="space-between" gap={{ xl: "40px", '2xl': "100px" }}>

        <chakra.div
          w="full"
          // h="503px"
          bg="#ffffff"
          borderRadius="4px"
          p="30px"
        >
          <chakra.div display="flex" justifyContent="space-between">
            <chakra.p
              color="#333333"
              fontWeight="700"
              fontSize="24px"
              lineHeight="31.68px"
            >
              Revenue
            </chakra.p>

            <chakra.div display="flex" alignItems="center">
              <Menu>
                {({ isOpen }) => (
                  <chakra.div display="flex">
                    <>
                      <MenuButton
                        w="120px"
                        h="30px"
                        mr="8px"
                        borderRadius="4.23px"
                        border={
                          isOpen ? "1px solid #2153CC" : "1px solid #E5E5E5"
                        }
                        px="5px"
                      >
                        <chakra.div
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <chakra.p
                            fontSize="12px"
                            color="#0000004D"
                            fontWeight="600"
                            textTransform="capitalize"
                          >
                            {dashboardBatchType.split("_").join(" ") || ""}
                          </chakra.p>
                          <DropDownIcon width={10} height={6} color="#242533" />
                        </chakra.div>
                      </MenuButton>
                      <MenuList w="120px">
                        <MenuItem
                          onClick={() => handleChangeBatch("today")}
                          w="full"
                          h="28.23px"
                          display="flex"
                          alignItems="center"
                          color="#000"
                          _hover={{ bg: "#2153CC", color: "white" }}
                        >
                          <chakra.p fontWeight="600">Today</chakra.p>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleChangeBatch("yesterday")}
                          w="full"
                          h="28.23px"
                          display="flex"
                          alignItems="center"
                          color="#000"
                          _hover={{ bg: "#2153CC", color: "white" }}
                        >
                          <chakra.p fontWeight="600">Yesterday</chakra.p>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleChangeBatch("this_week")}
                          w="full"
                          h="28.23px"
                          display="flex"
                          alignItems="center"
                          color="#000"
                          _hover={{ bg: "#2153CC", color: "white" }}
                        >
                          <chakra.p fontWeight="600">This Week</chakra.p>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleChangeBatch("this_month")}
                          w="full"
                          h="28.23px"
                          display="flex"
                          alignItems="center"
                          color="#000"
                          _hover={{ bg: "#2153CC", color: "white" }}
                        >
                          <chakra.p fontWeight="600">This Month</chakra.p>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleChangeBatch("this_year")}
                          w="full"
                          h="28.23px"
                          display="flex"
                          alignItems="center"
                          color="#000"
                          _hover={{ bg: "#2153CC", color: "white" }}
                        >
                          <chakra.p fontWeight="600">This year</chakra.p>
                        </MenuItem>
                        <MenuItem
                          onClick={() => dispatch<any>(changeDashboardBatchType("custom"))}
                          w="full"
                          h="28.23px"
                          display="flex"
                          alignItems="center"
                          color="#000"
                          _hover={{ bg: "#2153CC", color: "white" }}
                        >
                          <chakra.p fontWeight="600">Custom</chakra.p>
                        </MenuItem>
                      </MenuList>
                    </>
                    {dashboardBatchType === "custom" && <DatePicker
                      selected={startDate}
                      onChange={dateChange}
                      startDate={startDate}
                      endDate={endDate}
                      closeOnScroll
                      maxDate={new Date()}
                      className="date-border"
                      placeholderText="Select date range"
                      selectsRange
                      isClearable
                    />}
                  </chakra.div>
                )}
              </Menu>
            </chakra.div>
          </chakra.div>

          <chakra.div display="flex" mb="70px" mt="40px">
            <chakra.div>
              <chakra.p color="#9C9C9C" fontSize="12px" fontWeight="400">
                Total Income
              </chakra.p>
              <chakra.p color="Dark" fontSize="24px" fontWeight="700">
                {/* &#8358;{dashboard.income} */}
                &#8358;
                {formatPrice(dashboard.data?.income)}
              </chakra.p>
              <chakra.div display="flex" m="10px 0" alignItems="center">
                <ArrowUp />
                <chakra.p
                  fontSize="12px"
                  fontWeight="400"
                  color="#4AAF05"
                  letterSpacing="0.4px"
                  ml="5px"
                >
                  7.00%
                </chakra.p>
              </chakra.div>
            </chakra.div>
            <chakra.div ml="30px">
              <chakra.p
                color="#9C9C9C"
                fontWeight="400"
                letterSpacing="0.4px"
                fontSize="12px"
                textTransform="uppercase"
              >
                Cash Flow
              </chakra.p>
              {/* //# ROW 1 */}
              <chakra.div display="flex" mt="24px">
                <chakra.div
                  w="147.88px"
                  h="46.5px"
                  borderRadius="2.87px"
                  p="7.2px 15px"
                  bg="#ffffff"
                  boxShadow="0px 0px 0px 0.661299px #E0E0E0"
                  mr="11.9933px"
                >
                  <chakra.div display="flex" alignItems="center">
                    <BankIcon width="9" height="9" />
                    <chakra.p
                      color="#1B1B1B"
                      opacity="54%"
                      fontSize="9.23px"
                      fontWeight="600"
                      m="0px 5.53537px"
                    >
                      Bank Transfer
                    </chakra.p>
                  </chakra.div>
                  <chakra.p color="#1E2134" fontSize="12px" fontWeight="600">
                    &#8358;
                    {formatPrice(
                      dashboard.data?.bank_transfer_payment
                    )}
                  </chakra.p>
                </chakra.div>

                <chakra.div
                  w="147.88px"
                  h="46.5px"
                  borderRadius="2.87px"
                  p="7.2px 15px"
                  bg="#ffffff"
                  boxShadow="0px 0px 0px 0.661299px #E0E0E0"
                  m="0px 11.9933px"
                >
                  <chakra.div display="flex" alignItems="center">
                    <CashIcon width="8" height="7" />
                    <chakra.p
                      color="#1B1B1B"
                      opacity="54%"
                      fontSize="9.23px"
                      fontWeight="600"
                      m="0px 5.53537px"
                    >
                      Cash Payment
                    </chakra.p>
                  </chakra.div>
                  <chakra.p color="#1E2134" fontSize="12px" fontWeight="600">
                    &#8358;
                    {formatPrice(dashboard.data?.cash_payment)}
                  </chakra.p>
                </chakra.div>

                <chakra.div
                  w="147.88px"
                  h="46.5px"
                  borderRadius="2.87px"
                  p="7.2px 15px"
                  bg="#ffffff"
                  boxShadow="0px 0px 0px 0.661299px #E0E0E0"
                  m="0px 11.9933px"
                >
                  <chakra.div display="flex" alignItems="center">
                    <MoneyReceiveIcon />
                    <chakra.p
                      color="#1B1B1B"
                      opacity="54%"
                      fontSize="9.23px"
                      fontWeight="600"
                      m="0px 5.53537px"
                    >
                      Recovered
                    </chakra.p>
                  </chakra.div>
                  <chakra.p color="#1E2134" fontSize="12px" fontWeight="600">
                    &#8358;
                    {formatPrice(dashboard.data?.recovered_debt)}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              {/* //# ROW 2 */}
              <chakra.div display="flex" mt="24px">
                <chakra.div
                  w="147.88px"
                  h="46.5px"
                  borderRadius="2.87px"
                  p="7.2px 15px"
                  bg="#ffffff"
                  boxShadow="0px 0px 0px 0.661299px #E0E0E0"
                  mr="11.9933px"
                >
                  <chakra.div display="flex" alignItems="center">
                    <POSIcon width="8" height="8" />
                    <chakra.p
                      color="#1B1B1B"
                      opacity="54%"
                      fontSize="9.23px"
                      fontWeight="600"
                      m="0px 5.53537px"
                    >
                      POS
                    </chakra.p>
                  </chakra.div>
                  <chakra.p color="#1E2134" fontSize="12px" fontWeight="600">
                    &#8358;
                    {formatPrice(dashboard.data?.pos_payment)}
                  </chakra.p>
                </chakra.div>

                <chakra.div
                  w="147.88px"
                  h="46.5px"
                  borderRadius="2.87px"
                  p="7.2px 15px"
                  bg="#ffffff"
                  boxShadow="0px 0px 0px 0.661299px #E0E0E0"
                  m="0px 11.9933px"
                >
                  <chakra.div display="flex" alignItems="center">
                    <LampOnIcon />
                    <chakra.p
                      color="#1B1B1B"
                      opacity="54%"
                      fontSize="9.23px"
                      fontWeight="600"
                      m="0px 5.53537px"
                    >
                      Online
                    </chakra.p>
                  </chakra.div>
                  <chakra.p color="#1E2134" fontSize="12px" fontWeight="600">
                    &#8358; 0
                  </chakra.p>
                </chakra.div>

                <chakra.div
                  w="147.88px"
                  h="46.5px"
                  borderRadius="2.87px"
                  p="7.2px 15px"
                  bg="#ffffff"
                  boxShadow="0px 0px 0px 0.661299px #E0E0E0"
                  m="0px 11.9933px"
                >
                  <chakra.div display="flex" alignItems="center">
                    <ExpensesIcon />
                    <chakra.p
                      color="#1B1B1B"
                      opacity="54%"
                      fontSize="9.23px"
                      fontWeight="600"
                      m="0px 5.53537px"
                    >
                      Expenses
                    </chakra.p>
                  </chakra.div>
                  <chakra.p color="#1E2134" fontSize="12px" fontWeight="600">
                    &#8358;
                    {formatPrice(dashboard.data?.total_expenses)}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
            </chakra.div>
          </chakra.div>

          {/* //# Line Chart */}
          <DashboardLineChart />
        </chakra.div>

        <chakra.div
          w="306.09px"
          h="496.64px"
          p="10px"
          borderRadius="4px"
          bg="#ffffff"
          pos="sticky"
          top="100px"
        >
          <chakra.p color="#2153CC" fontSize="16.22px" fontWeight="500">
            Top selling products
          </chakra.p>
          <chakra.div overflow="auto" h="450px">
            <chakra.div>
              <TopSellingProducts />
            </chakra.div>
          </chakra.div>
        </chakra.div>
      </chakra.div>

      <chakra.div>
        <chakra.p
          color="#1E2134"
          fontSize="16.65px"
          fontWeight="600"
          mt="30px"
          mb="20px"
        >
          Shop Performance Indicators
        </chakra.p>
        <PerfomanceCard />
      </chakra.div>

      <DashboardTable />
    </>
  );
};

export default DesktopView;
