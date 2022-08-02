import {
  chakra,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import AuthAxios from "@utils/api/authAxios";
import { formatPrice } from "@utils/helpers";
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { cartsData, getTransactionsExpenses, setTransactionsExpenses } from "store/slices/carts";
import { shopsData } from "store/slices/shops";
import { MoreIcon, PagiNext, PagiPrev } from "../../../public/assets";


const SalesTable = () => {
  const { transactionExpenses } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const tableHeadData: string[] = [
    "Expense ID",
    "Date",
    "Staff",
    "Purpose",
    "Amount Spent",
    "Payment Status",
  ];
  const router = useRouter();

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

  const nextPage = (url: string) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        dispatch<any>(setTransactionsExpenses({
          ...transactionExpenses,
          data: { ...transactionExpenses.data, ...res.data.data.data },
          loaded: true,
        }));
      })
      .catch((e) => e);
  };

  const prevPage = (url) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        dispatch<any>(setTransactionsExpenses({
          ...transactionExpenses,
          data: { ...transactionExpenses.data, ...res.data.data.data },
          loaded: true,
        }));
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

    if (router.query.page && Number(router.query.page) !== transactionExpenses.data?.current_page) {
      dispatch<any>(getTransactionsExpenses({ id: singleShop.selectedShop.id, page: router.query.page as string }));
    }
  }, [router]);

  return (
    <>
      <chakra.div display={{ base: "none", xl: "block" }}>
        <TableContainer bg="#FFFFFF">
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
              {transactionExpenses.loaded &&
                transactionExpenses.data.data.map((data: any, i: number) => (
                  <Tr key={data.id}>
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
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
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
                        {new Date(data.created_at).toDateString()}
                      </chakra.p>
                    </Td>
                    {/* // # Staff */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <Flex
                        w="fit-content"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Avatar
                          size="sm"
                          src={data.user?.image}
                          name={`${data.user?.surname} ${data.user?.first_name}`}
                        />
                        <chakra.p
                          ml="10px"
                          color="#1E2134"
                          fontSize="12.16px"
                          fontWeight="400"
                          lineHeight="19.09px"
                          letterSpacing="0.13025px"
                        >
                          {`${data.user?.surname} ${data.user?.first_name}`}
                        </chakra.p>
                      </Flex>
                    </Td>
                    {/* // # Purpose */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p
                        color="#1E2134"
                        fontSize="12.16px"
                        fontWeight="400"
                        lineHeight="19.09px"
                        letterSpacing="0.13025px"
                      >
                        {data.spent_on}
                      </chakra.p>
                    </Td>
                    {/* // # Amount Spent */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p
                        color="#1E2134"
                        fontSize="13.38px"
                        fontWeight="600"
                        lineHeight="19.09px"
                        letterSpacing="0.13025px"
                      >
                        &#8358; {formatPrice(data.amount_paid)}
                      </chakra.p>
                    </Td>
                    {/* // # Payment Status */}
                    <Td>
                      <chakra.button
                        minW="84.1px"
                        w="fit-content"
                        borderRadius="4.78px"
                        bg={orderStatusColor(data.status)}
                        fontSize="13.38px"
                        fontWeight="500"
                        lineHeight="20.07px"
                        color="#FFFFFF"
                        p="6px"
                        textTransform="capitalize"
                      >
                        {data.status}
                      </chakra.button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            {/* </Table> */}
          </Table>

          {transactionExpenses.data && <chakra.div
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
                {`${transactionExpenses.data?.from} - ${transactionExpenses.data?.to} of ${transactionExpenses.data?.total}`}
              </chakra.p>
            </chakra.div>

            <chakra.div display="flex" alignItems="center" justifyContent="space-between">
              <chakra.button
                disabled={!transactionExpenses.data?.first_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: 1 } })}
              >
                First page
              </chakra.button>
              <chakra.button
                disabled={!transactionExpenses.data?.prev_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: transactionExpenses.data.current_page - 1 } })}
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
                {transactionExpenses.data?.current_page}
              </chakra.p>
              <chakra.button
                disabled={!transactionExpenses.data?.next_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: transactionExpenses.data.current_page + 1 } })}
              >
                <PagiNext />
              </chakra.button>
              <chakra.button
                disabled={!transactionExpenses.data?.last_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: transactionExpenses.data.last_page } })}
              >
                Last page
              </chakra.button>
            </chakra.div>
          </chakra.div>}
          {(transactionExpenses.data?.prev_page_url || transactionExpenses.data?.next_page_url) && <chakra.div
            h="41.68px"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            <chakra.p fontSize="12px" fontWeight="500" color="#506176">
              Rows per page:
            </chakra.p>
            <chakra.p
              color="#1E2134"
              fontWeight="400"
              fontSize="10.42px"
              letterSpacing="0.2605px"
              px="10px"
            >
              15
            </chakra.p>
            <chakra.p color="" fontWeight="500" fontSize="12px" px="20px">
              {/* 1-5 of 13 */}
            </chakra.p>
            <chakra.button
              disabled={
                transactionExpenses.data?.prev_page_url === null
              }
              cursor="pointer"
              _disabled={{ cursor: "not-allowed" }}
              px="20px"
              onClick={() => prevPage(transactionExpenses.data?.prev_page_url)}
            >
              <PagiPrev />
            </chakra.button>
            <chakra.button
              disabled={
                transactionExpenses.data?.next_page_url === null
              }
              cursor="pointer"
              _disabled={{ cursor: "not-allowed" }}
              px="20px"
              onClick={() => nextPage(transactionExpenses.data?.next_page_url)}
            >
              <PagiNext />
            </chakra.button>
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
        {transactionExpenses.loaded &&
          transactionExpenses.data.data.map((data) => (
              <chakra.div
                key={data.id}
                w="100%"
                maxW="340px"
                borderRadius="6px"
                bg="#FFFFFF"
                m="7px 0px"
                p="16px"
              >
                <chakra.div
                  display="flex"
                  justifyContent="space-between"
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
                      &#8358; {formatPrice(data.amount)}
                    </chakra.p>
                    <chakra.div cursor="pointer" ml="20px">
                      <MoreIcon />
                    </chakra.div>
                  </chakra.div>
                </chakra.div>

                <chakra.div display="flex" alignItems="center" py="16px">
                  <Avatar
                    size="sm"
                    name={`${data.user.surname} ${data.user.first_name}`}
                  />

                  <chakra.div ml="7px">
                    <chakra.p
                      fontSize="14px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="21.98px"
                      margin="3px 0"
                    >
                      {`${data.user.surname} ${data.user.first_name}`}
                    </chakra.p>
                    <chakra.p
                      fontSize="12px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="16.2px"
                      opacity="50%"
                      margin="3px 0"
                    >
                      {data.id < 10 ? `0${data.id}` : data.id} |{" "}
                      {new Date(data.created_at).toDateString()}
                    </chakra.p>
                  </chakra.div>
                </chakra.div>

                <chakra.div display="flex">
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
                      {data.spent_on}
                    </chakra.p>
                  </chakra.div>

                  <chakra.div
                    // w="84.1px"
                    p="5px 30px"
                    h="27.56px"
                    bg={orderStatusColor(data.status)}
                    borderRadius="12px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    ml="8px"
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
