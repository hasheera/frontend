import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";
import { formatNum } from "@utils/helpers";

interface Props {
  // imgSrc: string;
  name: string;
  photo: string;
}

const PopularCategory: FC<Props> = ({ name, photo }) => (
    <chakra.div
      w="158.03px"
      h="164.85px"
      borderRadius="7.44px"
      overflow="hidden"
      position="relative"
    >
      <chakra.img src={photo} alt="image" w="100%" h="100%" objectFit="cover" />
      <chakra.div
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        bg="linear-gradient(180deg, rgba(27, 27, 27, 0.045) 31.27%, rgba(27, 27, 51, 0.5) 75.91%)"
        display="flex"
        alignItems="end"
      >
        <chakra.div m="15px">
          <chakra.p color="#FFFFFF" fontSize="14.87px" fontWeight="600">
            {name}
          </chakra.p>
          {/* <chakra.p
            fontSize="9.82px"
            fontWeight="400"
            color="#FFFFFF"
          >{`${formatNum(categoryAmount)} product`}</chakra.p> */}
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );

export default PopularCategory;
