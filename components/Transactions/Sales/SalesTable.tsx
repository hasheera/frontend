import { useRouter } from "next/router";
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
  Flex
} from "@chakra-ui/react";
import { formatPrice } from "@utils/helpers";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks";
import { cartsData, getTransactionSales, setTransactionsSales } from "store/slices/carts";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import { useEffect } from "react";
import { MoreIcon, PagiNext, PagiPrev } from "../../../public/assets";


const SalesTable = () => {
  const { transactionSales } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const tableHeadData: string[] = [
    "Order No",
    "Date",
    "Customer",
    "Amount",
    "Qty",
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

  const goToInvoice = (orderNumber) => {
    router.push(`/invoice/${router.query.singleShop}/${orderNumber}`);
  };

  const goToPage = (url: string) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        setTransactionsSales({
          ...transactionSales,
          data: [...transactionSales.data, ...res.data.data.data],
          loaded: true,
        });
      })
      .catch((e) => e);
  };

  const prevPage = (url) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        setTransactionsSales({
          ...transactionSales,
          data: [...transactionSales.data, ...res.data.data.data],
          loaded: true,
        });
      })
      .catch((e) => e);
  };

  useEffect(() => {
    if (!router.query.page) {
      router.replace({
        ...router,
        query: {
          ...router.query,
          page: 1
        }
      })
    }

    if (router.query.page && Number(router.query.page) !== transactionSales.data?.current_page) {
      dispatch<any>(getTransactionSales({ id: singleShop.selectedShop.id, page: router.query.page as string }));
    }
  }, [router])

  return (
    <>
      <chakra.div display={{ base: "none", xl: "block" }}>
        <TableContainer
          bg="#FFFFFF"
        //  w="1042px"
        >
          <Table>
            {/* <Table> */}
            <Thead>
              <Tr>
                {tableHeadData.map((data: string) => (
                  <Th
                    key={data}
                    // p="13.89px"
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
              {transactionSales.loaded &&
                transactionSales.data?.data.map((data) => (
                  <Tr
                    key={data.id}
                    onClick={() => goToInvoice(data.order_number)}
                  >
                    {/* // # Order Number */}
                    <Td
                      h="62.52px"
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
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
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
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <Flex gap="8px" alignItems="center">
                        <Avatar
                          size="sm"
                          src=""
                          // name={`${data.user.surname} ${data.user.first_name}`}
                          name={data.customer_name}
                        />
                        <chakra.p
                          color="#1E2134"
                          fontSize="12.16px"
                          fontWeight="400"
                          lineHeight="19.09px"
                          letterSpacing="0.13025px"
                        >
                          {/* {`${data.user.surname} ${data.user.first_name}`} */}
                          {data.customer_name}
                        </chakra.p>
                      </Flex>
                    </Td>

                    {/* // # price */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p
                        color="#1E2134"
                        fontSize="13.38px"
                        fontWeight="600"
                        lineHeight="19.09px"
                        letterSpacing="0.13025px"
                      >
                        &#8358;{formatPrice(data.amount_to_pay)}
                      </chakra.p>
                    </Td>
                    {/* // # Qty */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p
                        color="#1E2134"
                        fontSize="13.38px"
                        fontWeight="400"
                        lineHeight="19.09px"
                        letterSpacing="0.13025px"
                      >
                        {data.cart.quantity}
                      </chakra.p>
                    </Td>
                    {/* // # Channel */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p
                        color="#1E2134"
                        fontSize="13.38px"
                        fontWeight="400"
                        lineHeight="19.09px"
                        letterSpacing="0.13025px"
                      >
                        {data.channel}
                      </chakra.p>
                    </Td>
                    {/* // # Payment Status */}
                    <Td>
                      <chakra.button
                        w="90px"
                        h="29.56px"
                        borderRadius="4.78px"
                        bg={orderStatusColor(data.status)}
                        fontSize="13.38px"
                        fontWeight="500"
                        lineHeight="20.07px"
                        color="#FFFFFF"
                        textTransform="capitalize"
                      >
                        {data.status.split(" ")[0]}
                      </chakra.button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            {/* </Table> */}
          </Table>

          {transactionSales.data && <chakra.div
            h="41.68px"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg="white"
          >
            <chakra.div display="flex" alignItems="center">
              <chakra.p fontSize="12px" fontWeight="500" color="#506176" ml="10px">
                Showing:
              </chakra.p>
              <chakra.p
                color="#1E2134"
                fontWeight="400"
                fontSize="10.42px"
                letterSpacing="0.2605px"
                px="10px"
              >
                {`${transactionSales.data?.from} - ${transactionSales.data?.to} of ${transactionSales.data?.total}`}
              </chakra.p>
            </chakra.div>

            <chakra.div display="flex" alignItems="center" justifyContent="space-between">
              <chakra.button
                disabled={!transactionSales.data?.first_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: 1 } })}
              >
                First page
              </chakra.button>
              <chakra.button
                disabled={!transactionSales.data?.prev_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: transactionSales.data.current_page - 1 } })}
              >
                <PagiPrev />
              </chakra.button>
              <chakra.p
                color="#1E2134"
                fontWeight="600"
                fontSize="12px"
                letterSpacing="0.2605px"
                px="10px"
              >
                {transactionSales.data?.current_page}
              </chakra.p>
              <chakra.button
                disabled={!transactionSales.data?.next_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: transactionSales.data.current_page + 1 } })}
              >
                <PagiNext />
              </chakra.button>
              <chakra.button
                disabled={!transactionSales.data?.last_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: transactionSales.data.last_page } })}
              >
                Last page
              </chakra.button>
            </chakra.div>
          </chakra.div>}
        </TableContainer>
      </chakra.div>

      {/* Mobile */}
      <chakra.div
        display={{ base: "flex", xl: "none" }}
        flexWrap="wrap"
        gap="20px"
        w="100%"
        justifyContent="center"
        alignItems="center"
        pb="100px"
      >
        {transactionSales.loaded &&
          transactionSales.data?.data.map((data) => (
            <chakra.div
              key={data.id}
              w="100%"
              maxW="340px"
              borderRadius="6px"
              bg="#FFFFFF"
              p="16px"
            >
              <chakra.div display="flex" justifyContent="space-between">
                <chakra.p
                  fontWeight="700"
                  fontSize="15.35px"
                  lineHeight="23.02px"
                  color="#333333"
                  opacity="87%"
                  mt="-4px"
                >
                  &#8358;{formatPrice(data.amount_to_pay)}
                </chakra.p>
                <chakra.div cursor="pointer" ml="20px">
                  <MoreIcon />
                </chakra.div>
              </chakra.div>

              <chakra.div
                display="flex"
                justifyContent="space-between"
                mt="24px"
              >
                <chakra.div display="flex" alignItems="center">
                  <Avatar
                    size="sm"
                    // name={`${data.user.surname} ${data.user.first_name}`}
                    name={data.customer_name}
                  />
                  <chakra.div ml="16px">
                    <chakra.p
                      fontSize="14px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="21.98px"
                      margin="3px 0"
                    >
                      {data.customer_name}
                    </chakra.p>
                    <chakra.p
                      fontSize="12px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="16.2px"
                      opacity="50%"
                      margin="3px 0"
                    >
                      {`#${data.order_number} | ${new Date(
                        data.created_at
                      ).toDateString()}`}
                    </chakra.p>
                  </chakra.div>
                </chakra.div>
              </chakra.div>

              <chakra.div display="flex" justifyContent="space-between" mt="20px">
                <chakra.div
                  px="8px"
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
                    {`Qty: ${data.cart.quantity}`}
                  </chakra.p>
                </chakra.div>

                <chakra.div
                  px="8px"
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
                    {data.channel}
                  </chakra.p>
                </chakra.div>

                <chakra.div
                  px="8px"
                  h="27.56px"
                  bg={orderStatusColor(data.status)}
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
                    textTransform="capitalize"
                  >
                    {data.status}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
            </chakra.div>
          ))}
      </chakra.div>
    </>
  );
};

export default SalesTable;
