import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  chakra,
  Select, Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useReactToPrint } from "react-to-print";
import domtoimage from "dom-to-image";
import { useRouter } from "next/router";
import { formatNum, formatPrice } from "@utils/helpers";
import PaymentModal from "@components/Modals/Payment";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import { useAppDispatch, useAppSelector } from "hooks";
import { userData } from "store/slices/user";
import { listShopSettings, shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";

const Invoice: NextPage = () => {
  const { user } = useAppSelector(userData);
  const { singleShop, shopSettings } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [receiptNote, setReceiptNote] = useState({ status: false, value: null })
  const [invWidth, setInvWidth] = useState("80mm")
  const [request, setRequest] = useState(false)
  const [invoiceData, setInvoiceData] = useState<{
    data: any;
    loaded: boolean;
  }>({ data: null, loaded: false });
  const [pay, setPay] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();
  const toast = useToast();


  const getSingleOrder = (id) => {
    AuthAxios.get(`oga/order/show/${router.query.orderNumber}?shop_id=${id}`)
      .then((res) => {
        setInvoiceData({ data: res.data.data, loaded: true });
        setPay(res.data.data.amount_to_pay)
      })
      .catch((e) => e);
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    const invoiceId: any = document.getElementById("invoice");
    domtoimage.toBlob(invoiceId).then((blob: any) => {
      // saveAs(blob , "invloce.pdf")
    });
  };

  const completePayment = async () => {
    try {
      const res = await AuthAxios.put(`/oga/order/update/amount/${invoiceData.data.order_number}?amount_to_pay=${pay}&shop_id=${singleShop.selectedShop.shop_id}`)
      if (res.status === 200) {
        getSingleOrder(invoiceData.data.shop.id)
        setRequest(false)
        toast({
          description: "Payment successful",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
      }
      return res;
    } catch (err) {
      setRequest(false)
      toast({
        description: "Payment unsuccessful",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      return err;
    }
  };

  const makePayment = async () => {
    const paymentType = paymentMethod.split(" ").join("-").toLowerCase()
    try {
      setRequest(true);
      const res = await AuthAxios.post(
        `/oga/order/init-order-payment?order_number=${invoiceData.data.order_number
        }&payment_type=${paymentType}&amount=${["cash", "pos", "bank-transfer"].includes(paymentType) ? pay : "0"
        }`
      );

      if (res.status === 200) {
        if (res.data.code === 422) return completePayment()
        setRequest(false);
        getSingleOrder(invoiceData.data.shop.id)
        toast({
          description: "Payment successful",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
      }
      return res;
    } catch (e) {
      const { code, message } = e.response.data
      if(code === 422 && message.includes("already initiated")) {
        return completePayment()
      }
      setRequest(false);
      toast({
        description: "Payment unsuccessful",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      return e;
    }
  };

  const refundPaid = async () => {
    try {
      setRequest(true);
      const res = await AuthAxios.post(`/oga/order/refund?shop_id=${invoiceData.data.shop.id}&order_id=${invoiceData.data.id}`)
      if(res.status === 200) {
        setRequest(false);
        getSingleOrder(invoiceData.data.shop.id)
        toast({
          description: "Refund successful",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
      }
      return res;
    } catch (error) {
      setRequest(false);
      toast({
        description: "Refund unsuccessful",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      return error
    }
  }

  useEffect(() => {
    if (router.query.orderNumber && singleShop.selectedShop) {
      getSingleOrder(singleShop.selectedShop.shop_id);
    }

    if (!shopSettings && singleShop.selectedShop) {
      dispatch<any>(listShopSettings(singleShop.selectedShop.shop_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.orderNumber, singleShop]);

  useEffect(() => {
    if (shopSettings) {
      const a = shopSettings?.find((n: { key: string; }) => n.key === "receipt_note")
      setReceiptNote({ status: true, value: a.value ? a.value : "" })
    }
  }, [shopSettings]);

  return (
    <VendorDashBoardLayout>
      <chakra.div
        bg={!invoiceData.loaded ? "transparent" : "#fff"}
        mt={{ base: "20px", lg: "40px" }}
        maxW="fit-content"
        px="20px"
        mx="auto"
        overflowX="scroll"
        css={{
          "::-webkit-scrollbar": {
            height: "8px",
          }
        }}
      >
        <chakra.div
          pb="40px"
          display={{ xl: "flex" }}
          flexDir={{ xl: invWidth === "297mm" ? "column" : "row" }}
          columnGap={{ xl: "24px" }}
        >
          {invoiceData.loaded ? (
            <>
              <chakra.div
                borderRadius="5px"
                bg="#fff"
                w={invWidth}
                mx="auto"
              >
                <chakra.div
                  p="10px 0"
                  display="flex"
                  alignItems="center"
                  justifyContent={invWidth === "297mm" ? "flex-start" : "space-between"}
                >
                  <chakra.button
                    p={`10px ${invWidth === "58mm" ? "8px" : "10px"}`}
                    borderRadius="5px"
                    h="40px"
                    border="1px solid #2153CC"
                    onClick={handlePrint}
                    fontSize={invWidth === "58mm" ? "0.75rem" : "0.875rem"}
                  >
                    <chakra.p color="#2153CC">Print this out!</chakra.p>
                  </chakra.button>

                  <Select ml={invWidth === "297mm" ? "24px" : ""} fontSize={invWidth === "58mm" ? "0.75rem" : "0.875rem"} w="100px" value={invWidth} onChange={e => setInvWidth(e.target.value)}>
                    <option value="58mm">58mm</option>
                    <option value="80mm">80mm</option>
                    <option value="297mm">A4</option>
                  </Select>
                </chakra.div>

                {["58mm", "80mm"].includes(invWidth) ?
                  <chakra.div
                    ref={componentRef}
                    p="12px"
                    bg="#fff"
                    w={invWidth}
                    border="1px solid #49B6FF"
                  >
                    <chakra.div display="flex" flexDir="column" alignItems="center">
                      <Avatar name={invoiceData.data.customer_name || user?.user.username} src={invoiceData.data.shop.logo} />
                    </chakra.div>

                    <chakra.p lineHeight="12px" fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500" mt="4px" textAlign="center">{invoiceData.data.shop.name}</chakra.p>
                    <chakra.p lineHeight="12px" fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500" mt="2px" textAlign="center">{`${invoiceData.data.shop.address?.street_name},` || ""} {`${invoiceData.data.shop.address?.land_mark},` || ""} {`${invoiceData.data.shop?.city.name || ""},`} {`${invoiceData.data.shop?.state.name || ""}`}</chakra.p>
                    <chakra.p lineHeight="12px" fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500" mt="2px" textAlign="center">{invoiceData.data.shop.whats_app_number}</chakra.p>

                    <chakra.div display="flex" justifyContent="space-between" mt="24px">
                      <chakra.p lineHeight="12px" fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Invoice:</chakra.p>
                      <chakra.p lineHeight="12px" fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500"> #{invoiceData.data.order_number}</chakra.p>
                    </chakra.div>

                    <chakra.div display="flex" justifyContent="space-between" mt="2px">
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Date:</chakra.p>
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">{new Date(invoiceData.data.updated_at).toLocaleDateString()}</chakra.p>
                    </chakra.div>

                    <chakra.div display="flex" justifyContent="space-between" mt="2px">
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Customer:</chakra.p>
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">{invoiceData.data.customer_name || user?.user.username}</chakra.p>
                    </chakra.div>

                    {/* <TableContainer mt="24px" w="100%"> */}
                    {/* <chakra.div>
                  <chakra.div>
                    <Tr>
                      <Th p="0" lineHeight="12px" fontSize="0.75rem" w="fit-content">Product</Th>
                      <Th p="0" lineHeight="12px" fontSize="0.75rem">Price</Th>
                      <Th p="0" lineHeight="12px" fontSize="0.75rem">QTY</Th>
                      <Th p="0" lineHeight="12px" fontSize="0.75rem">Total</Th>
                    </Tr>
                  </chakra.div>
                  <chakra.div>
                    {invoiceData.data?.cart.cart_items.map((data, i) => (
                      <chakra.div key={i}>
                        <chakra.div w="fit-content">{`${data.shop_product?.product.name}`}<br />{`${data.shop_product?.product_unit.name}`}</chakra.div>
                        <chakra.div>&#8358; {formatPrice(data.shop_product.sell_price)}</chakra.div>
                        <chakra.div>{formatPrice(data.quantity)}</chakra.div>
                        <chakra.div>&#8358; {formatPrice(data.price)}</chakra.div>
                      </chakra.div>
                    ))}
                    <chakra.div>
                      <chakra.div fontWeight="600" ml="auto">Total: &#8358; {formatPrice(invoiceData.data.amount)}</chakra.div>
                    </chakra.div>
                  </chakra.div>
                </chakra.div> */}
                    {/* </TableContainer> */}
                    <chakra.div mt="24px">
                      <chakra.div
                        display="grid"
                        gridTemplateColumns={`40% 1fr ${invWidth === "58mm" ? "14px" : "20px"} 1fr`}
                        gap="4px"
                        borderBottom="1px solid #EDF2F7"
                      >
                        <chakra.h6
                          fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                        >
                          PRODUCT
                        </chakra.h6>
                        <chakra.h6
                          fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                          justifySelf="end"
                        >
                          PRICE
                        </chakra.h6>
                        <chakra.h6
                          fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                          justifySelf="end"
                        >
                          QTY
                        </chakra.h6>
                        <chakra.h6
                          fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                          justifySelf="end"
                        >
                          TOTAL
                        </chakra.h6>
                      </chakra.div>
                      {invoiceData.data?.cart.cart_items.map(data => (
                        <chakra.div
                          key={data.id}
                          display="grid"
                          gridTemplateColumns="40% 1fr 14px 1fr"
                          gap="4px"
                          borderBottom="1px solid #EDF2F7"
                          py="8px"
                        >
                          <chakra.p
                            fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                          >
                            {`${data.shop_product?.product.name}` || ""}<br />{`${data.shop_product?.product_unit.name}` || ""}
                          </chakra.p>
                          <chakra.p
                            fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                            justifySelf="end"
                          >
                            &#8358;{formatPrice(data.shop_product?.sell_price)}
                          </chakra.p>
                          <chakra.p
                            fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                            justifySelf="end"
                          >
                            {formatNum(data.quantity)}
                          </chakra.p>
                          <chakra.p
                            fontSize={invWidth === "58mm" ? "0.5rem" : "0.625rem"}
                            justifySelf="end"
                          >
                            &#8358;{formatPrice(data.price)}
                          </chakra.p>
                        </chakra.div>
                      ))}
                    </chakra.div>
                    <chakra.div display="flex" justifyContent="space-between" mt="4px">
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Sub Total:</chakra.p>
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">&#8358;{formatPrice(invoiceData.data.amount)}</chakra.p>
                    </chakra.div>
                    <chakra.div display="flex" justifyContent="space-between" mt="4px">
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Total:</chakra.p>
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">&#8358;{formatPrice(invoiceData.data.amount_to_pay)}</chakra.p>
                    </chakra.div>
                    <chakra.div display="flex" justifyContent="space-between" mt="4px">
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Amount paid:</chakra.p>
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">&#8358;{formatPrice(invoiceData.data.amount_paid)}</chakra.p>
                    </chakra.div>
                    <chakra.div display="flex" justifyContent="space-between" mt="4px">
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">Amount remaining:</chakra.p>
                      <chakra.p fontSize={invWidth === "58mm" ? "0.5rem" : "0.75rem"} fontWeight="500">&#8358;{formatPrice(invoiceData.data.remaining_amount).slice(1)}</chakra.p>
                    </chakra.div>
                    {receiptNote.status &&
                      <>
                        <chakra.p fontSize="0.75rem" fontWeight="500" mt="20px">Notes:</chakra.p>
                        <chakra.p fontSize="0.75rem">
                          {receiptNote.value}
                        </chakra.p>
                      </>
                    }
                  </chakra.div>
                  :
                  <chakra.div
                    ref={componentRef}
                    mx="auto"
                    p="20px"
                    bg="#fff"
                    w="297mm"
                    border="1px solid #49B6FF"
                  >
                    <chakra.div display="flex" justifyContent="space-between">
                      <Avatar name="Ozumah Mi" src={invoiceData.data.shop.logo} />
                      <chakra.p
                        fontWeight="500"
                        fontSize="30px"
                        textTransform="uppercase"
                      >
                        {invoiceData.data.status}
                      </chakra.p>
                    </chakra.div>

                    <chakra.div display="flex" justifyContent="space-between">
                      <chakra.p>{invoiceData.data.shop.name}</chakra.p>

                      <chakra.p>Invoice: #{router.query.orderNumber}</chakra.p>
                    </chakra.div>
                    <chakra.div display="flex" justifyContent="space-between" mt="20px">
                      <chakra.p>{`${invoiceData.data.shop.adress?.street_name || ""}`} {`${invoiceData.data.shop?.city.name || ""}`} {`${invoiceData.data.shop.adress?.street_name || ""}`}</chakra.p>
                      <chakra.div>
                        <chakra.p>email</chakra.p>
                        <chakra.p>{invoiceData.data.shop.whats_app_number}</chakra.p>
                      </chakra.div>
                    </chakra.div>
                    <chakra.div my="30px">
                      <chakra.p>Date: {new Date(invoiceData.data.updated_at).toDateString()}</chakra.p>
                    </chakra.div>
                    <chakra.div my="30px">
                      <chakra.p fontWeight="500">Billed to:</chakra.p>
                      <chakra.p>{`${invoiceData.data.user.surname} ${invoiceData.data.user.first_name}`}</chakra.p>
                      <chakra.p>{invoiceData.data.user.email}</chakra.p>
                    </chakra.div>
                    <TableContainer>
                      <Table>
                        <Thead bg="#E9EAEC">
                          <Tr>
                            <Th>Product</Th>
                            <Th>Price</Th>
                            <Th>QTY</Th>
                            <Th>Total</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {invoiceData.data?.cart.cart_items.map((data) => (
                            <Tr key={data.id}>
                              <Td>{`${data.shop_product?.product.name}`}<br />{`${data.shop_product?.product_unit.name}`}</Td>
                              <Td>&#8358; {formatPrice(data.shop_product?.sell_price)}</Td>
                              <Td>{formatNum(data.quantity)}</Td>
                              <Td>&#8358; {formatPrice(data.price)}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <chakra.div
                      ml="auto"
                    >
                      <chakra.div display="flex" justifyContent="space-between" mt="4px">
                        <chakra.p fontSize="0.875rem" fontWeight="500">Sub Total:</chakra.p>
                        <chakra.p fontSize="0.875rem" fontWeight="500">&#8358;{formatPrice(invoiceData.data.amount)}</chakra.p>
                      </chakra.div>
                      <chakra.div display="flex" justifyContent="space-between" mt="4px">
                        <chakra.p fontSize="0.875rem" fontWeight="500">Total:</chakra.p>
                        <chakra.p fontSize="0.875rem" fontWeight="500">&#8358;{formatPrice(invoiceData.data.amount_to_pay)}</chakra.p>
                      </chakra.div>
                      <chakra.div display="flex" justifyContent="space-between" mt="4px">
                        <chakra.p fontSize="0.875rem" fontWeight="500">Amount paid:</chakra.p>
                        <chakra.p fontSize="0.875rem" fontWeight="500">&#8358;{formatPrice(invoiceData.data.amount_paid)}</chakra.p>
                      </chakra.div>
                      <chakra.div display="flex" justifyContent="space-between" mt="4px">
                        <chakra.p fontSize="0.875rem" fontWeight="500">Amount remaining:</chakra.p>
                        <chakra.p fontSize="0.875rem" fontWeight="500">&#8358;{formatPrice(invoiceData.data.remaining_amount).slice(1)}</chakra.p>
                      </chakra.div>
                    </chakra.div>
                    {receiptNote.status &&
                      <>
                        <chakra.p fontSize="0.75rem" fontWeight="500" mt="40px">Notes:</chakra.p>
                        <chakra.p>
                          {receiptNote.value}
                        </chakra.p>
                      </>
                    }
                  </chakra.div>
                }
              </chakra.div>

              <PaymentModal
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                orderAmount={invoiceData.data?.remaining_amount || 0}
                setOrderAmount={e => setPay(e.target.value)}
                status={invoiceData.data.status}
                pay={makePayment}
                refund={refundPaid}
                payments={invoiceData.data?.payments}
                request={request}
                disabled={!paymentMethod || request}
              />
            </>
          ) : (
            <chakra.div display="flex" h="100vh" alignItems="center" justifyContent="center">
              <Spinner size="md" color="#2153CC" />
            </chakra.div>
          )
          }

          {/* <chakra.button
            p="10px"
            borderRadius="5px"
            bg="#2153CC"
            onClick={handleDownload}
            mx="auto"
          >
            <chakra.p color="#fff">Download</chakra.p>
          </chakra.button> */}
        </chakra.div >
      </chakra.div>
    </VendorDashBoardLayout>
  );
};

export default Invoice;
