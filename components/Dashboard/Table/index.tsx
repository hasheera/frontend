
import {
  chakra,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Box,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ArrowUpDownIcon, PagiNext, PagiPrev } from "public/assets";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthAxios from "@utils/api/authAxios";
import { shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import { cartsData, setTransactionsSales } from "store/slices/carts";

const DashboardTable = () => {
  const { transactionSales } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch()
  const router = useRouter()

  const tableHeadData: string[] = [
    "Order",
    "Date",
    "Customer",
    "Channel",
    "Payment Status",
  ];

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

  const nextPage = (url) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.id}`)
      .then((res) => {
        dispatch<any>(setTransactionsSales(res.data))
        // setTransactionsSales({
        //   ...transactionSales,
        //   data: [...transactionSales.data, ...res.data.data.data],
        //   next_page_url: res.data.data.next_page_url,
        //   prev_page_url: res.data.data.prev_page_url,
        //   loaded: true,
        // });
      })
      .catch((e) => e);
  };

  const prevPage = (url) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.id}`)
      .then((res) => {
        dispatch<any>(setTransactionsSales(res.data))
      })
      .catch((e) => e);
  };

  return (
    <chakra.div m="30px 0px">
      <chakra.div display={{ base: "none", xl: "block" }}>
        <TableContainer bg="#FFFFFF">
          <chakra.div
            display="flex"
            alignItems="cneter"
            justifyContent="space-between"
            m="10px 24px"
          >
            <chakra.div display="flex" alignItems="center">
              <chakra.p
                color="#1E2134"
                fontWeight="600"
                fontSize="15.98px"
              >
                Latest Orders
              </chakra.p>
              <ArrowUpDownIcon />
            </chakra.div>

            <Link href={`/transactions/${router.query.singleShop}`} passHref>
              <chakra.a textDecor="underline">View all</chakra.a>
            </Link>
          </chakra.div>
          <Table>
            {/* <Table> */}
            <Thead>
              <Tr>
                {tableHeadData.map((data: string) => (
                  <Th
                    key={data}
                    color="#1E2134"
                    fontWeight="600"
                    boxShadow="inset 0px -0.868333px 0px #E0E0E0"
                  >
                    {data}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {transactionSales.loaded && transactionSales.data?.data.length > 0 ? (
                <>
                  {transactionSales.data?.data.slice(0, 7).map((data) => (
                    <Tr key={data.id}>
                      {/* // # Order Number */}
                      <Td
                        h="63.92px"
                        boxShadow="inset 0px -0.868333px 0px #E0E0E0"
                      >
                        <chakra.p
                          color="#1E2134"
                          fontSize="12.16px"
                          fontWeight="400"
                          lineHeight="19.09px"
                          letterSpacing="0.13025px"
                        >
                          {data.order_number}
                        </chakra.p>
                      </Td>
                      {/* // # Date */}
                      <Td
                        h="63.92px"
                        boxShadow="inset 0px -0.868333px 0px #E0E0E0"
                      >
                        <chakra.p
                          color="#1E2134"
                          fontSize="12.16px"
                          fontWeight="400"
                          lineHeight="19.09px"
                          letterSpacing="0.13025px"
                        >
                          {dayjs(data.created_at).format('MMM DD, YYYY; hh:mma')}
                        </chakra.p>
                      </Td>
                      {/* // # Customer */}
                      <Td
                        h="63.92px"
                        boxShadow="inset 0px -0.868333px 0px #E0E0E0"
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <chakra.p
                            color="#1E2134"
                            fontSize="12.16px"
                            fontWeight="400"
                            lineHeight="19.09px"
                            letterSpacing="0.13025px"
                          >
                            {data.customer_name}
                          </chakra.p>
                        </Flex>
                      </Td>

                      {/* // # Channel */}
                      <Td
                        h="63.92px"
                        boxShadow="inset 0px -0.868333px 0px #E0E0E0"
                      >
                        <chakra.div
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          w="84.1px"
                          h="29.56px"
                          borderRadius="4.78px"
                          border="1px solid #E0E0E0"
                        >
                          <chakra.p
                            color="#1E2134"
                            fontSize="11.54px"
                            fontWeight="400"
                            lineHeight="19.09px"
                            letterSpacing="0.14 px"
                          >
                            {data.channel}
                          </chakra.p>
                        </chakra.div>
                      </Td>
                      {/* // # Payment Status */}
                      <Td
                        h="63.92px"
                        boxShadow="inset 0px -0.868333px 0px #E0E0E0"
                      >
                        <chakra.button
                          w="90px"
                          h="29.56px"
                          borderRadius="4.78px"
                          textTransform="capitalize"
                          // p="5px 49px"
                          bg={orderStatusColor(data.status)}
                          fontSize="13.38px"
                          fontWeight="500"
                          lineHeight="20.07px"
                          color="#FFFFFF"
                          _hover={{
                            background: `${orderStatusColor(data.status)}`,
                          }}
                        >
                          {data.status.split(" ")[0]}
                        </chakra.button>
                      </Td>
                    </Tr>
                  ))}
                </>
              ) : (
                <div>Empty</div>
              )}
            </Tbody>
            {/* </Table> */}
          </Table>
        </TableContainer>
      </chakra.div>
    </chakra.div>
  );
};

export default DashboardTable;
