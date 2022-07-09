import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";

interface Props {
  img: string;
  companyName: string;
}
const Ad: FC<Props> = ({ img, companyName }) => (
    <chakra.div w="334.54px" h="122.66px" borderRadius="8px" overflow="hidden">
      <chakra.img
        src={img}
        alt={companyName}
        w="100%"
        h="100%"
        objectFit="cover"
      />
    </chakra.div>
  );

export default Ad;
