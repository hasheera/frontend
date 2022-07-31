/* eslint-disable camelcase */
import PaymentLogoComponent from "@components/PaymentLogo";
import { chakra, Button, Menu, MenuButton, MenuItem, MenuList, Spinner } from "@chakra-ui/react";
import { formatPrice } from "@utils/helpers";
import Image from "next/image";
import {
  PayLaterIcon,
  CashIcon,
  BankIcon,
  POSIcon,
  DropDownIcon,
} from "@public/assets";
import PaymentHistory from "./PaymentHistory";

interface Props {
  paymentMethod: string;
  setPaymentMethod: (p) => void;
  orderAmount: number;
  pay: () => void;
  refund: () => void;
  setOrderAmount: (e) => void;
  status: string;
  request: boolean;
  disabled: boolean;
  payments: [];
}

const PaymentModal = ({
  paymentMethod,
  setPaymentMethod,
  orderAmount,
  setOrderAmount,
  pay,
  refund,
  request,
  disabled,
  status,
  payments
}: Props) => (
  <chakra.div
    maxW="359px"
    background="#FFFFFF"
    borderRadius="12px"
    p="14px"
  >
    <chakra.h2
      color="#2153CC"
      fontSize="1.125rem"
      fontWeight="600"
    >Payment</chakra.h2>
    <chakra.p
      fontSize="14px"
      fontWeight="500"
      color="#22262A"
    // textAlign={{ base: "left", xl: "right" }}
    >
      &#8358;{formatPrice(orderAmount).slice(1)}
    </chakra.p>

    {["pending", "incomplete payment"].includes(status) &&
      <>
        <Menu>
          <MenuButton
            as={Button}
            display="flex"
            alignItems="center"
            textAlign="left"
            bg="transparent"
            w="100%"
            h="40px"
            fontSize="0.875rem"
            fontWeight="500"
            color="#757575"
            borderRadius="4px"
            border="1px solid rgba(0, 0, 0, 0.1)"
            mt="10px"
            _hover={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            rightIcon={<DropDownIcon width={10} height={10} color="#2153cc" />}
          >
            {paymentMethod || "Select payment type"}
          </MenuButton>
          <MenuList>
            <MenuItem
              display="flex"
              alignItems="center"
              gap="8px"
              fontSize="0.875rem"
              onClick={() => setPaymentMethod("Cash")}
            >
              <CashIcon
                width="16"
                height="16"
              />
              Cash
            </MenuItem>
            <MenuItem
              display="flex"
              alignItems="center"
              gap="8px"
              fontSize="0.875rem"
              onClick={() => setPaymentMethod("Paylater")}
            >
              <PayLaterIcon />
              Pay later
            </MenuItem>
            <MenuItem
              display="flex"
              alignItems="center"
              gap="8px"
              fontSize="0.875rem"
              onClick={() => setPaymentMethod("Bank transfer")}
            >
              <BankIcon
                width="16"
                height="16"
              />
              Bank transfer
            </MenuItem>
            <MenuItem
              display="flex"
              alignItems="center"
              gap="8px"
              fontSize="0.875rem"
              onClick={() => setPaymentMethod("POS")}
            >
              <POSIcon
                width="16"
                height="14"
              />
              POS
            </MenuItem>
          </MenuList>
        </Menu>
        <>
          {paymentMethod === "Cash" && (
            <chakra.div
              display="flex"
              alignItems="center"
              mt="20px"
              pos="relative"
            >
              <chakra.span
                pos="absolute"
                left="8px"
                px="8px"
                borderRight="1px solid rgba(0, 0, 0, 0.1)"
              >&#8358;</chakra.span>
              <chakra.input
                placeholder="Input Amount"
                w="100%"
                h="40px"
                borderRadius="8px"
                border="1px solid rgba(0, 0, 0, 0.1)"
                ml="4px"
                pl="40px"
                defaultValue={orderAmount}
                onChange={setOrderAmount}
              />
            </chakra.div>
          )}

          {paymentMethod === "Paylater" && (
            ""
          )}

          {paymentMethod === "Bank transfer" && (
            <chakra.div mt="20px">
              <chakra.div display="flex" alignItems="center">
                <Image
                  width={24}
                  height={24}
                  src="/assets/image/wemaIcon.png"
                  alt="image"
                />
                <chakra.p
                  ml="8px"
                  color="#333333"
                  fontWeight="500"
                  fontSize="0.875rem"
                >
                  Wema Bank | 017485789389
                </chakra.p>
              </chakra.div>
              <chakra.div
                display="flex"
                alignItems="center"
                mt="20px"
                pos="relative"
              >
                <chakra.span
                  pos="absolute"
                  left="8px"
                  px="8px"
                  borderRight="1px solid rgba(0, 0, 0, 0.1)"
                >&#8358;</chakra.span>
                <chakra.input
                  placeholder="Input Amount"
                  w="100%"
                  h="40px"
                  borderRadius="8px"
                  border="1px solid rgba(0, 0, 0, 0.1)"
                  ml="4px"
                  pl="40px"
                  defaultValue={orderAmount}
                  onChange={setOrderAmount}
                />
              </chakra.div>
            </chakra.div>
          )}

          {paymentMethod === "POS" && (
            <chakra.div mt="20px">
              <chakra.p
                color="#000000"
                opacity="54%"
                fontSize="0.875rem"
                fontWeight="600"
              >
                Transaction Id
              </chakra.p>
              <chakra.input
                placeholder="432882"
                w="100%"
                h="40px"
                borderRadius="8px"
                border="1px solid rgba(0, 0, 0, 0.1)"
                mt="4px"
                px="16px"
              />
              <chakra.div
                display="flex"
                alignItems="center"
                mt="20px"
                pos="relative"
              >
                <chakra.span
                  pos="absolute"
                  left="8px"
                  px="8px"
                  borderRight="1px solid rgba(0, 0, 0, 0.1)"
                >&#8358;</chakra.span>
                <chakra.input
                  placeholder="Input Amount"
                  w="100%"
                  h="40px"
                  borderRadius="8px"
                  border="1px solid rgba(0, 0, 0, 0.1)"
                  ml="4px"
                  pl="40px"
                  defaultValue={orderAmount}
                  onChange={setOrderAmount}
                />
              </chakra.div>
            </chakra.div>
          )}

          {paymentMethod === "multiplepay" && (
            <>
            </>
          )}
        </>
      </>
    }

    <chakra.div mt="20px">
      <chakra.h2
        color="#2153CC"
        fontSize="19.39px"
        fontWeight="600"
      >Payment History</chakra.h2>

      {payments.map(({ id, payment_type, created_at, amount }) => (
        <chakra.div key={id} py="10px" borderBottom="1px solid #EEE">
          <PaymentHistory
            payment_type={payment_type}
            created_at={created_at}
            amount_paid={amount}
          />
          </chakra.div>
      ))}
      {/* <PaymentHistory />
      <PaymentHistory /> */}

      {["pending", "incomplete payment"].includes(status) && <chakra.button
        m="20px auto"
        display="block"
        color="#ffffff"
        w="268px"
        h="48px"
        bg="#2153CC"
        borderRadius="8px"
        fontSize="0.875rem"
        fontWeight="600"
        onClick={pay}
        disabled={disabled}
        _disabled={{ bg: "#EEE", cursor: "not-allowed" }}
      >
        {request ? <Spinner /> : "Pay now"}
      </chakra.button>}

      {["paid", "incomplete payment"].includes(status) && <chakra.button
        m="20px auto"
        display="block"
        color="#ffffff"
        w="268px"
        h="48px"
        bg="#2153CC"
        borderRadius="8px"
        fontSize="0.875rem"
        fontWeight="600"
        onClick={refund}
        // disabled={disabled}
        _disabled={{ bg: "#EEE", cursor: "not-allowed" }}
      >
        {request ? <Spinner /> : "Refund"}
      </chakra.button>}
      <PaymentLogoComponent />
    </chakra.div>
  </chakra.div>
);

export default PaymentModal;
