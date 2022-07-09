import { useEffect } from "react";
import { useRouter } from "next/router";
import { chakra, Spinner } from "@chakra-ui/react";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";


const Import = () => {
  const { singleShop } = useAppSelector(shopsData);
  const router = useRouter();

  useEffect(() => {
    if (singleShop.loaded) {
      router.replace(
        `/import/${singleShop.selectedShop.shop.name
          .split(" ")
          .join("-")
          .toLowerCase()}-${singleShop.selectedShop.shop_id}`
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  return (
    <chakra.div
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="lg" color="#2153CC" />
    </chakra.div>
  );
};

export default Import;
