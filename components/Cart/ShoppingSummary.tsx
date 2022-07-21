import { useEffect, useState } from "react";
import PaymentLogo from "@components/PaymentLogo";
import { useRouter } from "next/router";
import { chakra, Button, useDisclosure, useToast, Spinner } from "@chakra-ui/react";
import { RemoveIcon } from "@public/assets";
import { useAppDispatch, useAppSelector } from "hooks";
import { userData } from "store/slices/user";
import { cartsData, getOpenCart } from "store/slices/carts";
import AuthAxios from "@utils/api/authAxios";
import { shopsData } from "store/slices/shops";
import CustomerInfo from "./CustomerInfo";
import ShoppingSummaryRecipt from "./ShoppingSummaryRecipt";



const ShoppingSummary: React.FC = () => {
  const { user } = useAppSelector(userData);
  const { carts } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [showDelivery, setShowDelivery] = useState(0);
  const [customer, setCustomer] = useState("");
  const [customerDetails, setCustomerDetails] = useState({ name: "", phone: "" });
  const [searchAddress, setSearchAddress] = useState(null)
  const [isRequest, setIsRequest] = useState(false);
  const customerInfo = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const checkOut = async () => {
    try {
      setIsRequest(true);
      const res = await AuthAxios.post(
        `/oga/cart/checkout?cart_id=${carts[0].id}&customer_name=${customerDetails.name}&created_for=${customerDetails.phone}${searchAddress ? `&shipping_address_id=${searchAddress.id}` : ""}`
      );

      if (res.status === 200) {
        setIsRequest(false);
        if (res.data.status === 403) {
          return toast({
            description:
              res.data.message.charAt(0).toUpperCase() +
              res.data.message.slice(1),
            status: "error",
            duration: 1000,
            position: "top-right",
          });
        }
        if (res.data.status === 401) {
          return toast({
            description:
              res.data.message.charAt(0).toUpperCase() +
              res.data.message.slice(1),
            status: "error",
            duration: 1500,
            position: "top-right",
          });
        }
        toast({
          description: "Checkout successful",
          status: "success",
          duration: 1000,
          position: "top-right",
        });
        router.replace(`/invoice/${router.query.singleShop}/${res.data.data.order.order_number}`)
        dispatch<any>(getOpenCart(singleShop.selectedShop.shop_id))
      }
      return res;
    } catch (e) {
      setIsRequest(false);
      toast({
        description: "Checkout unsuccessful",
        status: "error",
        duration: 1500,
        position: 'top',
      })
      return e
    }
  };

  useEffect(() => {
    if(customer === "me") {
      setCustomerDetails({
        name: `${user?.user.first_name} ${user?.user.surname}` || user?.user.username,
        phone: user?.user.contact_no
      });
    }

    if(customer === "customer") {
      setCustomerDetails({ name: "", phone: "" })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer])

  return (
    <chakra.div
      w={{ base: "full", lg: "359px" }}
      borderRadius="12px"
      bg="#FFFFFF"
      p="15px 20px"
    >
      <chakra.h3
        color="#2153CC"
        fontWeight="600"
        fontSize="19.39px"
      >Shopping summary</chakra.h3>
      <chakra.div>
        {/* <Select
          placeholder={"Select Customer"}
          style={{
            width: "100%",
            fontWeight: "500",
            fontSize: "13.59px",
            color: "#757575",
            borderRadius: " 5.82418px",
          }}
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </Select> */}
        {/* <Select
          placeholder={"Select Customer"}
          style={{
            width: "100%",
            fontWeight: "500",
            fontSize: "13.59px",
            color: "#757575",
            borderRadius: " 5.82418px",
          }}
          onChange={handleChange}
          showSearch
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA: any, optionB: any) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="1">Not Identified</Option>
          <Option value="2">Closed</Option>
          <Option value="3">Communicated</Option>
          <Option value="4">Identified</Option>
          <Option value="5">Resolved</Option>
          <Option value="6">Cancelled</Option>
        </Select> */}
        {/* <div
          onClick={() => handleAddNewCustomer()}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          <Title
            style={{
              color: "#EA4D33",
              textDecorationLine: "underline",
              fontWeight: "400",
              fontSize: "10px",
            }}
          >
            Add new customer
          </Title>
        </div> */}
        {customerDetails.name && customerDetails.phone && <chakra.div
          w="326px"
          borderRadius="10px"
          m="20px auto"
          border=" 0.970696px solid rgba(0, 0, 0, 0.1)"
          p="20px"
        >
          <chakra.div
            display="flex"
            justifyContent="space-between"
            mb="10px"
          >
            <chakra.p
              fontWeight="500"
              fontSize="13.76px"
              color="#000000"
              opacity="50%"

            >
              Customer Details
            </chakra.p>
            <chakra.span
              cursor="pointer"
              onClick={() => {
                setCustomerDetails({ name: "", phone: "" })
                setCustomer("")
              }}
            >
              <RemoveIcon />
            </chakra.span>
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
            marginBottom="5px"

          >
            <chakra.p
              fontSize="12px"
              color="#000000"
              opacity="40%"
              fontWeight="400"

            >
              Name:
            </chakra.p>
            <chakra.p
              fontSize="12px"
              fontWeight="500"
              color="#000000"
              marginLeft="5px"
              opacity="70%"

            >
              {customerDetails.name}
            </chakra.p>
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
          >
            <chakra.p
              fontSize="12px"
              color="#000000"
              opacity="40%"
              fontWeight="400"

            >
              Phone
            </chakra.p>
            <chakra.p
              fontSize="12px"
              fontWeight="500"
              color="#000000"
              marginLeft="5px"
              opacity="70%"

            >
              {customerDetails.phone}
            </chakra.p>
          </chakra.div>
        </chakra.div>}

        {searchAddress && <chakra.div
          w="326px"
          borderRadius="10px"
          m="20px auto"
          border=" 0.970696px solid rgba(0, 0, 0, 0.1)"
          p="20px"
        >
          <chakra.div
            display="flex"
            justifyContent="space-between"
            mb="10px"
          >
            <chakra.p
              fontWeight="500"
              fontSize="13.76px"
              color="#000000"
              opacity="50%"

            >
              Address Details
            </chakra.p>
            <chakra.span
              cursor="pointer"
              onClick={() => {
                setSearchAddress("")
                setShowDelivery(0)
              }}
            >
              <RemoveIcon />
            </chakra.span>
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
            marginBottom="5px"

          >
            <chakra.p
              fontSize="12px"
              color="#000000"
              opacity="40%"
              fontWeight="400"

            >
              Address:
            </chakra.p>
            <chakra.p
              fontSize="12px"
              fontWeight="500"
              color="#000000"
              marginLeft="5px"
              opacity="70%"

            >
              {searchAddress.address}
            </chakra.p>
          </chakra.div>
          {/* <chakra.div
            display="flex"
            alignItems="center"
          >
            <chakra.p
              fontSize="12px"
              color="#000000"
              opacity="40%"
              fontWeight="400"

            >
              Phone
            </chakra.p>
            <chakra.p
              fontSize="12px"
              fontWeight="500"
              color="#000000"
              marginLeft="5px"
              opacity="70%"

            >
              {customerDetails.phone}
            </chakra.p>
          </chakra.div> */}
        </chakra.div>}

        {/* {showDelivery && (
          <Select
            placeholder={"Select Address"}
            style={{
              width: "100%",
              fontWeight: "500",
              fontSize: "13.59px",
              color: "#757575",
              borderRadius: " 5.82418px",
              marginTop: "5px",
            }}
          >
            <option value="jack">Jack</option>
            <option value="lucy">Lucy</option>
          </Select>
        )} */}
      </chakra.div>

      <ShoppingSummaryRecipt />

      {(!customerDetails.name || !customerDetails.phone) && <Button
        onClick={customerInfo.onOpen}
        display="block"
        w="full"
        maxW="326px"
        h="47.4px"
        fontSize="1.125rem"
        color="#FFFFFF"
        fontWeight="600"
        borderRadius="5.84265px"
        bg="#2153CC"
        m="10px auto"
        _hover={{ bg: "#2153CC" }}
      >
        Proceed
      </Button>}

      {customerDetails.name && customerDetails.phone && <Button
        onClick={checkOut}
        display="block"
        w="full"
        maxW="326px"
        h="47.4px"
        fontSize="1.125rem"
        color="#FFFFFF"
        fontWeight="600"
        borderRadius="5.84265px"
        bg="#2153CC"
        m="10px auto"
        _hover={{ bg: "#2153CC" }}
      >
        {isRequest ? <Spinner /> : "Checkout"}
      </Button>}

      <PaymentLogo />

      <CustomerInfo
        userId={user?.user.id}
        isOpen={customerInfo.isOpen}
        onClose={() => {
          setShowDelivery(0)
          setCustomer("")
          customerInfo.onClose()
        }}
        cusType={customer}
        setCusType={setCustomer}
        cusName={customerDetails.name}
        setCusName={e => setCustomerDetails({ ...customerDetails, name: e })}
        cusNum={customerDetails.phone}
        setCusNum={e => setCustomerDetails({ ...customerDetails, phone: e })}
        delivery={showDelivery}
        setDelivery={setShowDelivery}
        setNewCustomer={setCustomerDetails}
        searchAddress={searchAddress?.address}
        setSearchAddress={setSearchAddress}
        removeCus={() => {
          setCustomerDetails({ name: "", phone: "" })
          setCustomer("")
        }}
      />
      {/* {showAddNewCustomerModal && <CreateCustomerModal />} */}
    </chakra.div >
  );
};

export default ShoppingSummary;
