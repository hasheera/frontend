import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Deals, ProductsIcon, ShoppingCart } from "public/assets";

type Props = {
  executeScroll: () => void;
  executeScrollToProduct: () => void;
};

const MobileShopNav: FC<Props> = ({
  executeScroll,
  executeScrollToProduct,
}: Props) => {
  return (
    <Box
      d={{ base: "block", lg: "none" }}
      pos="fixed"
      w="full"
      right={0}
      left={0}
      bottom={0}
      h="80px"
      bg="#fff"
      boxShadow="0px 4px 23px rgba(0, 0, 0, 0.05)"
    >
      <Flex w="full" h="full" alignItems="center" justifyContent="space-around">
        <Flex
          onClick={() => executeScroll()}
          flexDir="column"
          alignItems="center"
          cursor="pointer"
        >
          <Deals />
          <Text fontSize="12px" fontWeight="400" color={"#2153CC"}>
            Deals
          </Text>
        </Flex>
        <Flex
          onClick={() => executeScrollToProduct()}
          flexDir="column"
          alignItems="center"
          cursor="pointer"
        >
          <ProductsIcon color="#2153CC" />
          <Text fontSize="12px" fontWeight="400" color={"#2153CC"}>
            Products
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" cursor="pointer">
          <ShoppingCart color="#2153CC" />
          <Text fontSize="12px" fontWeight="400" color={"#2153CC"}>
            Cart
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileShopNav;
