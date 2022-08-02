import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  chakra,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PagiNext, PagiPrev } from "public/assets";
import ConfirmStockMovement from "@components/Modals/ConfirmStockMovement";
import OutGoingProduct from "@components/Modals/OutGoingProduct";
import { useAppDispatch, useAppSelector } from "hooks";
import { getStockMovement, setStockMovement, shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import { formatNum } from "@utils/helpers";
import { useRouter } from "next/router";


const StockMovementTable = () => {
  const { singleShop, stockMovements } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [productDetails, setProductDetails] = useState<any>({});
  const confirmProductModal = useDisclosure();
  const outGoingProduct = useDisclosure();
  const router = useRouter();

  const tableHeadData: string[] = [
    // "ID",
    "Date",
    "Sender",
    "Reciver",
    "QTY",
    "Status",
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

  useEffect(() => {
    if (singleShop.loaded) {
      // dispatch<any>(getStockMovement(singleShop.selectedShop.shop_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  const nextPage = (url: string) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        dispatch<any>(setStockMovement({
          ...stockMovements,
          data: { ...stockMovements.data, ...res.data.data.data },
          loaded: true,
        }));
      })
      .catch((e) => e);
  };

  const prevPage = (url) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        dispatch<any>(setStockMovement({
          ...stockMovements,
          data: { ...stockMovements.data, ...res.data.data.data },
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

    if (router.query.page && Number(router.query.page) !== stockMovements.data?.current_page) {
      dispatch<any>(getStockMovement({ id: singleShop.selectedShop.id, page: router.query.page as string }));
    }
  }, [router]);

  return (
    <chakra.div>
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
              {stockMovements.loaded &&
                stockMovements.data?.data.map((data: any, i: number) => (
                  <Tr
                    key={data.id}
                    onClick={
                      singleShop.selectedShop.shop_id ===
                        data.receiver_shop.id
                        ? () => {
                          confirmProductModal.onOpen();
                          setProductDetails(data);
                        }
                        : () => {
                          outGoingProduct.onOpen();
                          setProductDetails(data);
                        }
                    }
                  >
                    {/* // # Order Number */}
                    {/* <Td
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
                    </Td> */}
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
                    {/* Staff */}
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p>{data.sender_shop.name}</chakra.p>
                    </Td>
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p>{data.receiver_shop.name}</chakra.p>
                    </Td>
                    <Td h="64px" boxShadow="inset 0px -0.868333px 0px #E0E0E0">
                      <chakra.p>{data.quantity}</chakra.p>
                    </Td>

                    <Td>
                      <Button
                        // w="84.1px"
                        h="29.56px"
                        borderRadius="4.78px"
                        bg={orderStatusColor(data.status)}
                        fontSize="13.38px"
                        fontWeight="500"
                        lineHeight="20.07px"
                        color="#FFFFFF"
                        textTransform="capitalize"
                      >
                        {data.status}
                      </Button>
                    </Td>

                    {/* // # Action */}
                    <Td>
                      <Button
                        onClick={
                          singleShop.selectedShop.shop_id ===
                            data.receiver_shop.id
                            ? () => {
                              confirmProductModal.onOpen();
                              setProductDetails(data);
                            }
                            : () => {
                              outGoingProduct.onOpen();
                              setProductDetails(data);
                            }
                        }
                        w="93px"
                        h="27.56px"
                        borderRadius="4.78px"
                        bg="#ffffff"
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="20.07px"
                        color={`${singleShop.selectedShop.shop_id ===
                          data.receiver_shop.id
                          ? "green"
                          : "red"
                          }`}
                        border={`0.5px solid ${singleShop.selectedShop.shop_id ===
                          data.receiver_shop.id
                          ? "green"
                          : "red"
                          }`}
                      >
                        {singleShop.selectedShop.shop_id ===
                          data.receiver_shop.id
                          ? "Incoming"
                          : "Outgoing"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            {/* </Table> */}
          </Table>

          {stockMovements.data && <chakra.div
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
                {`${stockMovements.data?.from} - ${stockMovements.data?.to} of ${stockMovements.data?.total}`}
              </chakra.p>
            </chakra.div>

            <chakra.div display="flex" alignItems="center" justifyContent="space-between">
              <chakra.button
                disabled={!stockMovements.data?.first_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: 1 } })}
              >
                First page
              </chakra.button>
              <chakra.button
                disabled={!stockMovements.data?.prev_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: stockMovements.data.current_page - 1 } })}
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
                {stockMovements.data?.current_page}
              </chakra.p>
              <chakra.button
                disabled={!stockMovements.data?.next_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: stockMovements.data.current_page + 1 } })}
              >
                <PagiNext />
              </chakra.button>
              <chakra.button
                disabled={!stockMovements.data?.last_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: stockMovements.data.last_page } })}
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
        {stockMovements.loaded &&
          stockMovements.data?.data.map((data: any) => (
            <chakra.div
              key={data.id}
              w="340px"
              h="118.65px"
              borderRadius="6px"
              bg="#FFFFFF"
              margin="7px 0px"
              onClick={
                singleShop.selectedShop.shop_id ===
                  data.receiver_shop.id
                  ? () => {
                    confirmProductModal.onOpen();
                    setProductDetails(data);
                  }
                  : () => {
                    outGoingProduct.onOpen();
                    setProductDetails(data);
                  }
              }
            >
              <chakra.div
                display="flex"
                p="10px"
                pl="15px"
                pt="15px"
                justifyContent="space-between"
              >
                <chakra.div display="flex" alignItems="center">
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
                      {/* {data.id < 10 ? `0${data.id}` : data.id} |{" "} */}
                      {new Date(data.created_at).toDateString()}
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
                    {formatNum(data.quantity)}
                  </chakra.p>
                  {/* <chakra.div cursor="pointer" ml="20px">
                    <MoreIcon />
                  </chakra.div> */}
                </chakra.div>
              </chakra.div>
              <chakra.div display="flex" px="15px">
                <chakra.div
                  w="92px"
                  h="27.56px"
                  bg="#FFF"
                  borderRadius="12px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border={`0.5px solid ${singleShop.selectedShop.shop_id ===
                    data.receiver_shop.id
                    ? "green"
                    : "red"
                  }`}
                  >
                  <chakra.p
                  color={`${singleShop.selectedShop.shop_id ===
                    data.receiver_shop.id
                    ? "green"
                    : "red"
                    }`}
                    fontWeight="500"
                    lineHeight="18px"
                    fontSize="12px"
                  >
                    {singleShop.selectedShop.shop_id ===
                          data.receiver_shop.id
                          ? "Incoming"
                          : "Outgoing"}
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
      <ConfirmStockMovement
        isOpen={confirmProductModal.isOpen}
        onClose={confirmProductModal.onClose}
        productDetails={productDetails}
      />
      <OutGoingProduct isOpen={outGoingProduct.isOpen} onClose={outGoingProduct.onClose} productDetails={productDetails} />
    </chakra.div>
  );
};

export default StockMovementTable;
