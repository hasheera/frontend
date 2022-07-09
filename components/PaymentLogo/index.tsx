import { chakra } from "@chakra-ui/react";
import Image from "next/image";
import { VisaLogo, MasterCardIcon, LockIcon } from "@public/assets";

const PaymentLogoComponent = () => (
    <chakra.div
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LockIcon />
      <chakra.h4
        color="#333333"
        fontSize="0.75rem"
        fontWeight="500"
        opacity="70%"
        m="0 4px"
      >100% secured payments</chakra.h4>
      <chakra.div ml="6px">
        <MasterCardIcon />
      </chakra.div>
      <chakra.div mr="6px">
        <VisaLogo />
      </chakra.div>
      <Image
        width={24}
        height={24}
        src="/assets/image/wemaIcon.png"
        alt="image"
      />
    </chakra.div>
  );

export default PaymentLogoComponent;
