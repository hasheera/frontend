import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
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
import ModernDatepicker from "react-modern-datepicker";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import DashboardTable from "@components/Dashboard/Table";
import { formatPrice } from "@utils/helpers";
import DashboardLineChart from "@components/Dashboard/Desktop/LineChart";
import PerfomanceCard from "@components/Dashboard/PerfomanceCard";
import TopSellingProducts from "@components/Dashboard/TopSellingProducts";
import Cookies from "js-cookie";
import { changeDashboardBatchType, dashboardData, getDashboardData } from "store/slices/dashboard";
import { useAppDispatch, useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
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

type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

const DesktopView = () => {
  const { singleShop } = useAppSelector(shopsData);
  const { dashboard, dashboardBatchType } = useAppSelector(dashboardData);
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dateToShow, setDateToShow] = useState<string>("start");
  const [directDate, setDirectDate] = useState<string>("");

  // useEffect(() => {
  //   const dash = {
  //     id: singleShop.selectedShop.id,
  //     directDate,
  //     startDate,
  //     endDate
  //   };
  //   dispatch<any>(getDashboardData(dash));
  //   // if (singleShop.loaded) {
  //   // }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [singleShop, dashboardBatchType, startDate, endDate]);

  const applyDate = () => {
    // getTopSellingData(startDate, endDate);
  };

  const directDateHandle = (e: SelectEvent) => {
    setDirectDate(e.target.value);
  };

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

      <chakra.div display="flex" justifyContent="space-around">
        <chakra.div
          w="712px"
          // h="503px"
          bg="#ffffff"
          borderRadius="4px"
          p="30px"
        >
          <chakra.div display="flex" m="0px 30px" justifyContent="space-between">
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
                      <chakra.span
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
                          {dashboardBatchType
                            ? dashboardBatchType.split("_").join(" ")
                            : ""}
                        </chakra.p>
                        <DropDownIcon width={10} height={6} color="#242533" />
                      </chakra.span>
                    </MenuButton>
                    <MenuList w="120px">
                      <MenuItem
                        onClick={() => changeDashboardBatchType("today")}
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
                        onClick={() => changeDashboardBatchType("yesterday")}
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
                        onClick={() => changeDashboardBatchType("this_week")}
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
                        onClick={() => changeDashboardBatchType("this_month")}
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
                        onClick={() => changeDashboardBatchType("this_year")}
                        w="full"
                        h="28.23px"
                        display="flex"
                        alignItems="center"
                        color="#000"
                        _hover={{ bg: "#2153CC", color: "white" }}
                      >
                        <chakra.p fontWeight="600">This year</chakra.p>
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
              {/* <chakra.div>
                <Button
                  onClick={() => setDateToShow("start")}
                  w="154px"
                  h="40px"
                  color={dateToShow === "start" ? "#FFFFFF" : "#19181A"}
                  bg={dateToShow === "start" ? "#2153CC" : "#F8F7FA"}
                  borderRadius="4px"
                  margin="0px 8px"
                  fontSize="14px"
                  fontWeight="600"
                  _hover={{
                    background: `${
                      dateToShow === "start" ? "#2153CC" : "#F8F7FA"
                    }`,
                  }}
                  _focus={{ border: "none" }}
                >
                  Start Date
                </Button>
                <Button
                  onClick={() => setDateToShow("end")}
                  w="154px"
                  h="40px"
                  color={dateToShow === "end" ? "#FFFFFF" : "#19181A"}
                  bg={dateToShow === "end" ? "#2153CC" : "#F8F7FA"}
                  borderRadius="4px"
                  margin="0px 8px"
                  fontSize="14px"
                  fontWeight="600"
                  _hover={{
                    background: `${
                      dateToShow === "end" ? "#2153CC" : "#F8F7FA"
                    }`,
                  }}
                  _focus={{ border: "none" }}
                >
                  End Date
                </Button>
              </chakra.div> */}
              <chakra.div>
                <Menu>
                  <MenuButton
                    w="160px"
                    h="32px"
                    borderRadius="4px"
                    border="1px solid #E5E5E5"
                  >
                    <chakra.div
                      // w="160px"
                      // h="32px"
                      // borderRadius="4px"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-around"
                    >
                      <chakra.p
                        color="#333333"
                        fontWeight="400"
                        fontSize="14px"
                        letterSpacing="0.25 px"
                      >
                        Oct - Nov 2019
                      </chakra.p>
                      <CalenderIcon />
                    </chakra.div>
                  </MenuButton>
                  <MenuList
                    w="344px"
                    h="504px"
                    borderRadius="12px"
                    bg="#FFFFFF"
                    position="relative"
                  >
                    <chakra.div ml="20px">
                      {dateToShow === "start" ? (
                        <ModernDatepicker
                          className="color"
                          date={startDate}
                          format="DD-MM-YYYY"
                          // showBorder
                          onChange={(date) => setStartDate(date)}
                          placeholder="Start Date"
                          primaryColor="#2153CC"
                          secondaryColor="#ffffff"
                          primaryTextColor="#19181A"
                          secondaryTextColor="#FFFFFF"
                        />
                      ) : (
                        <ModernDatepicker
                          className="color"
                          date={endDate}
                          format="DD-MM-YYYY"
                          showBorder
                          onChange={(date) => setEndDate(date)}
                          width="100px"
                          height="40px"
                          placeholder="End Date"
                          primaryColor="#2153CC"
                          secondaryColor="#ffffff"
                          primaryTextColor="#19181A"
                          secondaryTextColor="#FFFFFF"
                        />
                      )}
                    </chakra.div>
                    <chakra.div
                      w="100%"
                      position="absolute"
                      bottom="10%"
                      display="flex"
                      justifyContent="center"
                    >
                      <Button
                        onClick={applyDate}
                        w="316px"
                        h="40px"
                        color="#FFFFFF"
                        bg="#2153CC"
                        borderRadius="8px"
                        margin="0px 8px"
                        fontSize="18px"
                        fontWeight="700"
                        _hover={{
                          background: "#2153CC",
                        }}
                        _focus={{ border: "none" }}
                      >
                        Apply
                      </Button>
                    </chakra.div>
                  </MenuList>
                </Menu>
              </chakra.div>
            </chakra.div>
          </chakra.div>
          <chakra.div>
            {/* //# Line Chart */}
            <DashboardLineChart />
          </chakra.div>

          <chakra.div display="flex" mt="20px">
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
                  7,00%
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
        </chakra.div>
        <chakra.div
          w="306.09px"
          h="496.64px"
          p="10px"
          borderRadius="4px"
          bg="#ffffff"
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
