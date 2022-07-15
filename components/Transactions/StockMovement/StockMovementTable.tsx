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
import { MoreIcon, PagiNext, PagiPrev } from "public/assets";
import ConfirmStockMovement from "@components/Modals/ConfirmStockMovement";
import OutGoingProduct from "@components/Modals/OutGoingProduct";
import { useAppDispatch, useAppSelector } from "hooks";
import { getStockMovement, setStockMovement, shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import { formatPrice } from "@utils/helpers";


const StockMovementTable = () => {
  const { singleShop, stockMovements } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [productDetails, setProductDetails] = useState<any>({});
  const confirmProductModal = useDisclosure();
  const outGoingProduct = useDisclosure();

  const tableHeadData: string[] = [
    "ID",
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
      dispatch<any>(getStockMovement(singleShop.selectedShop.shop_id));
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
              disabled={stockMovements.data?.prev_page_url === null}
              cursor="pointer"
              _disabled={{ cursor: "not-allowed" }}
              px="20px"
              onClick={() => prevPage(stockMovements.data?.prev_page_url)}
            >
              <PagiPrev />
            </chakra.button>
            <chakra.button
              disabled={stockMovements.data?.next_page_url === null}
              cursor="pointer"
              _disabled={{ cursor: "not-allowed" }}
              px="20px"
              onClick={() => nextPage(stockMovements.data?.next_page_url)}
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
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pb="100px"
      >
        {stockMovements.loaded &&
          stockMovements.data?.data.map((data: any) => (
            <chakra.div
              key={data.id}
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
              <chakra.div display="flex" pl="50px">
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
