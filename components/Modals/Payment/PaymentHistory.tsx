/* eslint-disable camelcase */
import { chakra, Avatar } from "@chakra-ui/react";
import { BankIcon, CashIcon, POSIcon } from "@public/assets";
import { formatPrice } from "@utils/helpers";
import dayjs from "dayjs";

interface Props {
  payment_type: string;
  created_at: string;
  amount_paid: number;
}

// # Payment Type
export const PaymentCashType = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <CashIcon width={17} height={13} />
    <p
      style={{
        fontWeight: "500",
        fontSize: "9.95px",
        color: "#333333",
        marginLeft: "4px",
      }}
    >
      Cash
    </p>
  </div>
);

export const PaymentBankTransferType = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <BankIcon width={17} height={17} />
    <p
      style={{
        fontWeight: "500",
        fontSize: "9.95px",
        color: "#333333",
        marginLeft: "4px",
      }}
    >
      Bank Transfer
    </p>
  </div>
);

export const PaymentPOSType = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <POSIcon width={18} height={18} />
    <p
      style={{
        fontWeight: "500",
        fontSize: "9.95px",
        color: "#333333",
        marginLeft: "4px",
      }}
    >
      POS
    </p>
  </div>
);

const PaymentHistory = ({ payment_type, created_at, amount_paid }: Props) => (
  <chakra.div
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    w="300px"
    borderRadius="6px"
    mt="10px"
  >
    {/* <Avatar
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9EWJXakOBhOQvhl8k0GCRsakU9RxV2m-qiQ&usqp=CAU"
      size="md"
    />
    <chakra.div
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="280px"
    >
      <chakra.h3
        color="#333333"
        fontSize="0.75rem"
        fontWeight="500"
        opacity="70%"
      >
        David Ibioye
      </chakra.h3>
    </chakra.div> */}

    <chakra.p fontSize="12px" fontWeight="500">
      {dayjs(created_at).format("MMM DD, YYYY | hh:ssa")}
    </chakra.p>

      {/* // # You can a Condition to Render the payment Type */}
      {payment_type === "pos" && <PaymentPOSType />}
      {payment_type === "cash" && <PaymentCashType />}
      {payment_type === "bank transfer" && <PaymentBankTransferType />}

    <chakra.div
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <chakra.p
        fontWeight="500"
        color="#22262A"
        fontSize="14px"
      >
        &#8358;{formatPrice(amount_paid)}
      </chakra.p>
    </chakra.div>
  </chakra.div>
);

export default PaymentHistory;


