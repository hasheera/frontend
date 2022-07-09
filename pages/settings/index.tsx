import { ShopContext } from "@providers/shopProvider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { chakra, Spinner } from "@chakra-ui/react";

const Settings = () => {
  const { vendorSingleShop } = useContext(ShopContext);

  const router = useRouter();

  useEffect(() => {
    if (vendorSingleShop.loaded) {
      router.replace(
        `/vendor/vendor_settings/${vendorSingleShop.selected.shop.name
          .split(" ")
          .join("-")
          .toLowerCase()}-${vendorSingleShop.selected.shop_id}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default Settings;
