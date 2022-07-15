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
import { useAppSelector } from "hooks";
import { cartsData, setTransactionsSales } from "store/slices/carts";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import { MoreIcon, PagiNext, PagiPrev } from "../../../public/assets";


const ActivityTable = () => {
  const { transactionSales } = useAppSelector(cartsData);
  const { singleShop, shopActivity } = useAppSelector(shopsData);
  const router = useRouter();

  const tableHeadData: string[] = [
    "No",
    "Date",
    "Name",
    "Type",
    "Action",
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

  const nextPage = (url: string) => {
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
              {shopActivity.loaded &&
                shopActivity.data?.data.map((data) => (
                  <Tr
                    key={data.id}
                  >
                    {/* // # Number */}
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
                        {data.id}
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
                    {/* // # name */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <Flex justifyContent="space-between" alignItems="center">
                        <chakra.p
                          color="#1E2134"
                          fontSize="12.16px"
                          fontWeight="400"
                          lineHeight="19.09px"
                          letterSpacing="0.13025px"
                        >
                          {data.reason}
                        </chakra.p>
                      </Flex>
                    </Td>

                    {/* // # type */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p
                        color="#1E2134"
                        fontSize="13.38px"
                        fontWeight="400"
                        lineHeight="19.09px"
                        letterSpacing="0.13025px"
                      >
                        {data.activityable_type.split("\\")[data.activityable_type.split("\\").length - 1]}
                      </chakra.p>
                    </Td>
                    {/* // # View */}
                    <Td>
                      <chakra.button
                        // onClick={() => goToInvoice(data.order_number)}
                        w="90px"
                        h="29.56px"
                        borderRadius="4.78px"
                        bg="#2153CC"
                        fontSize="13.38px"
                        fontWeight="500"
                        lineHeight="20.07px"
                        color="#FFFFFF"
                        textTransform="capitalize"
                      >
                        View
                      </chakra.button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            {/* </Table> */}
          </Table>

          <chakra.div
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
              disabled={shopActivity.data?.prev_page_url === null}
              cursor="pointer"
              _disabled={{ cursor: "not-allowed" }}
              px="20px"
              onClick={() => prevPage(shopActivity.data?.prev_page_url)}
            >
              <PagiPrev />
            </chakra.button>
            <chakra.button
              disabled={shopActivity.data?.next_page_url === null}
              cursor="pointer"
              _disabled={{ cursor: "not-allowed" }}
              px="20px"
              onClick={() => nextPage(shopActivity.data?.next_page_url)}
            >
              <PagiNext />
            </chakra.button>
          </chakra.div>
        </TableContainer>
      </chakra.div>

      {/* Mobile */}
      <chakra.div
        display={{ base: "flex", xl: "none" }}
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap="20px"
        pb="100px"
      >
        {shopActivity.loaded &&
          shopActivity.data?.data.map((data) => (
            <chakra.div
              key={data.id}
              w="100%"
              maxW="393px"
              h="118.65px"
              borderRadius="6px"
              bg="#FFFFFF"
              margin="7px 0px"
              pl="15px"
            >
              <chakra.div
                display="flex"
                py="15"
                justifyContent="space-between"
              >
                <chakra.div display="flex" alignItems="center">
                  <chakra.div>
                    <chakra.p
                      fontSize="12px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="16.2px"
                      opacity="50%"
                      margin="3px 0"
                    >
                      {`#${data.id} | ${new Date(
                        data.created_at
                      ).toDateString()}`}
                    </chakra.p>
                  </chakra.div>
                </chakra.div>
              </chakra.div>

              <chakra.div display="flex">
                <chakra.p
                  fontWeight="700"
                  fontSize="15.35px"
                  lineHeight="23.02px"
                  color="#333333"
                  opacity="87%"
                >
                  {data.activityable_type.split("\\")[data.activityable_type.split("\\").length - 1]}
                </chakra.p>
                {/* <chakra.div cursor="pointer" ml="20px">
                  <MoreIcon />
                </chakra.div> */}
              </chakra.div>

              <chakra.div display="flex">
                <chakra.div
                  // w="92px"
                  h="27.56px"
                  // bg="#F7F8FA"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                >
                  <chakra.p
                    color="#757575"
                    fontWeight="500"
                    lineHeight="18px"
                    fontSize="12px"
                  >
                    {data.reason}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
            </chakra.div>
          ))}
      </chakra.div>
    </>
  );
};

export default ActivityTable;