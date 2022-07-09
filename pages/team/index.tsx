import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ShopContext } from "@providers/shopProvider";
import { chakra, Spinner } from "@chakra-ui/react";
type Props = {};

const Team = (props: Props) => {
  const { vendorSingleShop } = useContext(ShopContext);
  const router = useRouter();

  useEffect(() => {
    if (vendorSingleShop.loaded) {
      router.replace(
        `/vendor/team/${vendorSingleShop.selected.shop.name
          .split(" ")
          .join("-")
          .toLowerCase()}-${vendorSingleShop.selected.shop_id}`
      );
    }
  }, [vendorSingleShop]);

  return (
    <chakra.div
      w="100%"
      h="100vh"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="lg" color="#2153CC" />
    </chakra.div>
  );
};

export default Team;
