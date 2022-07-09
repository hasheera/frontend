import React, { useEffect, useState } from "react";
import {
  chakra,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Select,
  Avatar,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import DoughnutChart from "@components/Dashboard/Mobile/DoughnutChart";
import { ArrowDropDown, DropDownIcon, MoreIcon } from "public/assets";
import PerfomanceCard from "@components/Dashboard/PerfomanceCard";
import TopSellingProducts from "@components/Dashboard/TopSellingProducts";
import { formatPrice } from "@utils/helpers";
import { useAppDispatch, useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import { changeDashboardBatchType, dashboardData } from "store/slices/dashboard";
import { cartsData } from "store/slices/carts";
import LineChart from "./LineChart";

type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

const MobileView = () => {
  const { transactionSales } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const { dashboard, dashboardBatchType } = useAppSelector(dashboardData);
  const dispatch = useAppDispatch()
  const [directDate, setDirectDate] = useState<string>("");
  const tabHeaders: string[] = ["Reports", "Top Products", "Orders"];

  const directDateHandle = (e: SelectEvent) => {
    setDirectDate(e.target.value);
  };

  const orderStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return "#16C35B";
      case "pending":
        return "#FB8200";
      case "Incomplete":
        return "#1484FF";
      default:
        return "gray.500";
    }
  };

  return (
    <Tabs>
      <TabList
        display="flex"
        justifyContent="center"
        position="fixed"
        left="0"
        right="0"
        top="50px"
        bg="#F7F8FA"
        zIndex="100"
      >
        {tabHeaders.map((header) => (
          <Tab
            key={header}
            color="#000000"
            fontSize="14px"
            fontWeight="400"
            _selected={{
              color: "#2153CC",
              borderBottom: "1px solid #2153CC",
            }}
            _focus={{ outline: "none" }}
          >
            {header}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <chakra.div
            display="flex"
            alignItems="center"
            flexDirection="column"
            mt="30px"
            mb="100px"
          >
            <chakra.div
              w="374px"
              // h="302px"
              borderRadius="0px 0px 7px 7px"
              m="28px 0px"
              bg="#ffffff"
              p="10px"
            >
              <chakra.p
                fontWeight="500"
                fontSize="14px"
                color="#333333"
                letterSpacing="0.4 px"
              >
                Income Statement
              </chakra.p>
              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="51px"
                p="11px"
                borderRadius="5px"
                m="10px 0px"
              >
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
                          <DropDownIcon
                            width={10}
                            height={6}
                            color="#242533"
                          />
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
                          onClick={() =>
                            changeDashboardBatchType("yesterday")
                          }
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
                          onClick={() =>
                            changeDashboardBatchType("this_week")
                          }
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
                          onClick={() =>
                            changeDashboardBatchType("this_month")
                          }
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
                          onClick={() =>
                            changeDashboardBatchType("this_year")
                          }
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

                <chakra.p color="#333333" fontWeight="700" fontSize="22px">
                  &#8358;
                  {formatPrice(dashboard.data?.income)}
                </chakra.p>
              </chakra.div>
              <chakra.div w="100%">
                <DoughnutChart />
              </chakra.div>
            </chakra.div>
            <chakra.div
              w="389px"
              h="350px"
              borderRadius="6px"
              p="13px"
              bg="#ffffff"
              m="28px 0"
            >
              <chakra.p
                fontWeight="500, Medium"
                fontSize="16px"
                color="#2153CC"
                letterSpacing="-0.0041em"
              >
                Cash Flow
              </chakra.p>

              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="49px"
                bg="#ffffff"
                borderBottom="0.5px solid #D4D8E2"
              >
                <chakra.p
                  fontSize="14px"
                  color="#333333"
                  fontWeight="400"
                  letterSpacing="0.0008em"
                >
                  Bank Transfer
                </chakra.p>
                <chakra.div display="flex" alignItems="center">
                  <chakra.p
                    fontSize="12.07px"
                    fontWeight="400"
                    color="#333333"
                  >
                    &#8358;
                  </chakra.p>
                  <chakra.p
                    fontSize="16px"
                    fontWeight="600"
                    color="#333333"
                    letterSpacing="0.0024em"
                  >
                    {formatPrice(
                      dashboard.data?.bank_transfer_payment
                    )}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="49px"
                bg="#ffffff"
                borderBottom="0.5px solid #D4D8E2"
              >
                <chakra.p
                  fontSize="14px"
                  color="#333333"
                  fontWeight="400"
                  letterSpacing="0.0008em"
                >
                  POS
                </chakra.p>
                <chakra.div display="flex" alignItems="center">
                  <chakra.p
                    fontSize="12.07px"
                    fontWeight="400"
                    color="#333333"
                  >
                    &#8358;
                  </chakra.p>
                  <chakra.p
                    fontSize="16px"
                    fontWeight="600"
                    color="#333333"
                    letterSpacing="0.0024em"
                  >
                    {formatPrice(dashboard.data?.pos_payment)}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="49px"
                bg="#ffffff"
                borderBottom="0.5px solid #D4D8E2"
              >
                <chakra.p
                  fontSize="14px"
                  color="#333333"
                  fontWeight="400"
                  letterSpacing="0.0008em"
                >
                  Cash Payment
                </chakra.p>
                <chakra.div display="flex" alignItems="center">
                  <chakra.p
                    fontSize="12.07px"
                    fontWeight="400"
                    color="#333333"
                  >
                    &#8358;
                  </chakra.p>
                  <chakra.p
                    fontSize="16px"
                    fontWeight="600"
                    color="#333333"
                    letterSpacing="0.0024em"
                  >
                    {formatPrice(dashboard.data?.cash_payment)}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="49px"
                bg="#ffffff"
                borderBottom="0.5px solid #D4D8E2"
              >
                <chakra.p
                  fontSize="14px"
                  color="#333333"
                  fontWeight="400"
                  letterSpacing="0.0008em"
                >
                  Online
                </chakra.p>
                <chakra.div display="flex" alignItems="center">
                  <chakra.p
                    fontSize="12.07px"
                    fontWeight="400"
                    color="#333333"
                  >
                    &#8358;
                  </chakra.p>
                  <chakra.p
                    fontSize="16px"
                    fontWeight="600"
                    color="#333333"
                    letterSpacing="0.0024em"
                  >
                    0
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="49px"
                bg="#ffffff"
                borderBottom="0.5px solid #D4D8E2"
              >
                <chakra.p
                  fontSize="14px"
                  color="#333333"
                  fontWeight="400"
                  letterSpacing="0.0008em"
                >
                  Expense
                </chakra.p>
                <chakra.div display="flex" alignItems="center">
                  <chakra.p
                    fontSize="12.07px"
                    fontWeight="400"
                    color="#333333"
                  >
                    &#8358;
                  </chakra.p>
                  <chakra.p
                    fontSize="16px"
                    fontWeight="600"
                    color="#333333"
                    letterSpacing="0.0024em"
                  >
                    {formatPrice(
                      dashboard.data?.total_expenses
                    )}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              <chakra.div
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="49px"
                bg="#ffffff"
                borderBottom="0.5px solid #D4D8E2"
              >
                <chakra.p
                  fontSize="14px"
                  color="#333333"
                  fontWeight="400"
                  letterSpacing="0.0008em"
                >
                  Recovered Debt
                </chakra.p>
                <chakra.div display="flex" alignItems="center">
                  <chakra.p
                    fontSize="12.07px"
                    fontWeight="400"
                    color="#333333"
                  >
                    &#8358;
                  </chakra.p>
                  <chakra.p
                    fontSize="16px"
                    fontWeight="600"
                    color="#333333"
                    letterSpacing="0.0024em"
                  >
                    {formatPrice(
                      dashboard.data?.recovered_debt
                    )}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
            </chakra.div>
            <chakra.div
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              w="380px"
              h="49px"
              bg="#ffffff"
              borderRadius="7px"
              m="12px 0px"
            >
              <chakra.div>
                <chakra.p
                  color="#333333"
                  fontSize="16px"
                  fontWeight="500"
                  letterSpacing="0.0075em"
                >
                  Shop Performance
                </chakra.p>
              </chakra.div>
              <Select
                w="120px"
                placeholder="View more"
                color="#757575"
                fontSize="12px"
                fontWeight="300"
                letterSpacing="0.0075em"
                border="none"
                icon={<ArrowDropDown />}
              >
                <option value="name">name</option>
              </Select>
            </chakra.div>
            <chakra.div>
              <PerfomanceCard />
            </chakra.div>
            <chakra.div
              w="371px"
              h="263px"
              // p="22px"
              m="28px 0px"
              bg="#ffffff"
            >
              <LineChart />
            </chakra.div>
          </chakra.div>
        </TabPanel>
        <TabPanel>
          <chakra.div
            display="flex"
            alignItems="center"
            flexDirection="column"
            mt="30px"
            mb="20px"
          >
            <chakra.div
              w="380px"
              borderRadius="12.13px"
              p="0px 21px"
              bg="#ffffff"
            >
              <TopSellingProducts />
            </chakra.div>
          </chakra.div>
        </TabPanel>
        <TabPanel>
          <chakra.div
            display="flex"
            alignItems="center"
            flexDirection="column"
            mt="30px"
            mb="20px"
          >
            <chakra.div
              display={{ base: "flex", xl: "none" }}
              w="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {transactionSales.loaded &&
                transactionSales.data.data?.map((data) => (
                  <chakra.div
                    key={data?.id}
                    w="393px"
                    h="118.65px"
                    borderRadius="6px"
                    bg="#FFFFFF"
                    margin="7px 0px"
                  >
                    <chakra.div
                      display="flex"
                      p="10px"
                      pl="15px"
                      pt="15"
                      justifyContent="space-between"
                    >
                      <chakra.div display="flex" alignItems="center">
                        <Avatar size="sm" name={data?.customer_name} />
                        <chakra.div ml="7px">
                          <chakra.p
                            fontSize="14px"
                            fontWeight="500"
                            color="#333333"
                            lineHeight="21.98px"
                            margin="3px 0"
                          >
                            {data?.customer_name}
                          </chakra.p>
                          <chakra.p
                            fontSize="12px"
                            fontWeight="500"
                            color="#333333"
                            lineHeight="16.2px"
                            opacity="50%"
                            margin="3px 0"
                          >
                            {`#${data?.order_number} | ${new Date(
                              data?.created_at
                            ).toDateString()}`}
                          </chakra.p>
                        </chakra.div>
                      </chakra.div>
                      <chakra.div display="flex">
                        <chakra.p
                          fontWeight="700"
                          fontSize="15.35px"
                          lineHeight="23.02px"
                          color="#333333"
                          opacity="87%"
                          mt="-4px"
                        >
                          &#8358;{formatPrice(data?.amount_to_pay)}
                        </chakra.p>
                        <chakra.div cursor="pointer" ml="20px">
                          <MoreIcon />
                        </chakra.div>
                      </chakra.div>
                    </chakra.div>
                    <chakra.div
                      display="flex"
                      justifyContent="space-around"
                      pl="40px"
                    >
                      <chakra.div
                        w="92px"
                        h="27.56px"
                        bg="#F7F8FA"
                        borderRadius="12px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <chakra.p
                          color="#757575"
                          fontWeight="500"
                          lineHeight="18px"
                          fontSize="12px"
                        >
                          {`Quantity:${data?.cart.quantity}`}
                        </chakra.p>
                      </chakra.div>
                      <chakra.div
                        w="84.1px"
                        h="27.56px"
                        bg="#F7F8FA"
                        borderRadius="12px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <chakra.p
                          color="#757575"
                          fontWeight="500"
                          lineHeight="18px"
                          fontSize="12px"
                        >
                          {data?.channel}
                        </chakra.p>
                      </chakra.div>
                      <chakra.div
                        w="84.1px"
                        h="27.56px"
                        bg={orderStatusColor(data?.status)}
                        borderRadius="12px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <chakra.p
                          color="#ffffff"
                          fontWeight="500"
                          fontSize="12px"
                          lineHeight="18px"
                        >
                          {data?.status}
                        </chakra.p>
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                ))}
            </chakra.div>
          </chakra.div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MobileView;
