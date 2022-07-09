import { chakra, Avatar } from "@chakra-ui/react";


// # Payment Type
export const PaymentCashType = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div>
      <svg
        width="17"
        height="13"
        viewBox="0 0 17 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          display="M16.072 0.865234H1V12.0583H16.072V0.865234Z"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          display="M1 4.5957H16.072"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <p
      style={{
        fontWeight: "500",
        fontSize: "9.95px",
        color: "#333333",
        marginLeft: "10px",
      }}
    >
      Cash
    </p>
  </div>
);

export const PaymentBankTransferType = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          display="M0.908203 4.02092L8.4442 1.22266L15.9802 4.02092"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          display="M0.908203 16.1465H15.9802"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          display="M8.44531 12.4149V6.81836"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          display="M14.0957 12.4149V6.81836"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          display="M2.79102 12.4149C2.79102 12.4149 2.79102 9.00394 2.79102 6.81836"
          stroke="#2153CC"
          strokeWidth="1.65823"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <p
      style={{
        fontWeight: "500",
        fontSize: "9.95px",
        color: "#333333",
        marginLeft: "10px",
      }}
    >
      Bank Transfer
    </p>
  </div>
);
export const PaymentPOSType = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div>
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          display="M15.1278 4.35088H14.267V0.046875H3.93735V4.35088H3.07655C1.64761 4.35088 0.494141 5.50436 0.494141 6.93329V12.0981H3.93735V15.5413H14.267V12.0981H17.7102V6.93329C17.7102 5.50436 16.5567 4.35088 15.1278 4.35088ZM5.65895 1.76848H12.5454V4.35088H5.65895V1.76848ZM12.5454 12.0981V13.8197H5.65895V10.3765H12.5454V12.0981ZM14.267 10.3765V8.65489H3.93735V10.3765H2.21574V6.93329C2.21574 6.45985 2.6031 6.07249 3.07655 6.07249H15.1278C15.6012 6.07249 15.9886 6.45985 15.9886 6.93329V10.3765H14.267Z"
          fill="#2153CC"
        />
      </svg>
    </div>
    <p
      style={{
        fontWeight: "500",
        fontSize: "9.95px",
        color: "#333333",
        marginLeft: "10px",
      }}
    >
      POS
    </p>
  </div>
);

const PaymentHistory = () => (
  <chakra.div
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    w="330px"
    h="60px"
    borderRadius="6px"
    mt="10px"
  >
    <Avatar
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
      >David Ibioye</chakra.h3>
      <chakra.p color="#B3B3B3" fontSize="8px" fontWeight="500">
        May 19, 2022 | 14:02
      </chakra.p>
    </chakra.div>
    <chakra.div
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* // # You can a Condition to Render the payment Type */}
      <PaymentPOSType />
      {/* <PaymentCashType />
            <PaymentBankTransferType />
             */}
      <chakra.p
        fontWeight="500"
        color="#22262A"
        fontSize="14px"
      >
        N3,000
      </chakra.p>
    </chakra.div>
  </chakra.div>
);

export default PaymentHistory;


