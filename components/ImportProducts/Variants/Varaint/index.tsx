/* eslint-disable camelcase */
import { FC } from "react";
import { Button, chakra, useDisclosure, useToast } from "@chakra-ui/react";
import { ShopIcon } from "public/assets";
import Cookies from "js-cookie";
import AddProduct from "@components/Modals/AddProduct";
import AuthAxios from "@utils/api/authAxios";

interface Props {
  product_unit: any;
  product: any;
}

const Variant: FC<Props> = ({ product_unit, product }) => {
  const toast = useToast();
  const addProductModal = useDisclosure();

  const addShopProduct = async (id: any, prodId: any) => {
    const shopId = Cookies.get("shopId");

    try {
      const res = await AuthAxios.post("/oga/shop/product/create", {
        shop_id: Number(shopId),
        product_id: prodId,
        product_unit_id: id,
        sell_price: 0,
        cost_price: 0,
        restock_alert: 1,
        category_id: 1,
        expired_date: null,
        other_details: "",
        attributes: 0,
      });
      if (res.status === 200) {
        if (res.data.data.status === "error") {
          toast({
            description: res.data.data.message,
            status: "info",
            duration: 3000,
            position: "top",
          });
        } else {
          toast({
            description: "Product added to shop successfully",
            status: "success",
            duration: 3000,
            position: "top",
          });
        }
      }
      return res;
    } catch (e) {
      return e;
    }
  };

  const addProductManual = () => {
    addProductModal.onOpen();
  };

  return (
    <>
      <chakra.div cursor="pointer" w="152.68px">
        <chakra.div
          w="152.68px"
          overflow="hidden"
          // m={{ base: "5px", md: "10px", lg: "10px" }}
          borderTopRadius="15.3247px"
          onClick={() => addProductManual()}
        >
          <chakra.div w="100%" h="151.45px">
            <chakra.img
              src={product_unit?.photo}
              alt="image"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </chakra.div>
          <chakra.div m="5.36366px 0px" h="50px">
            <chakra.p
              letterSpacing="0.0275em"
              fontSize="10.76px"
              fontWeight="500"
              color="#19191D"
            >
              {product_unit?.name}
            </chakra.p>
          </chakra.div>
        </chakra.div>
        <chakra.div w="100%" display="flex" justifyContent="center">
          <Button
            w="151.47px"
            h="43.53px"
            bg="#ffffff"
            color="#2264D1"
            _hover={{ bg: "#2264D1", color: "#ffffff" }}
            borderRadius="3.88px"
            // m="16px 0px"
            onClick={() => addShopProduct(product_unit.id, product.id)}
          >
            <chakra.div
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="32.18px"
              h="32.18px"
              borderRadius="3.79px"
              // p="4.73px"
              boxShadow="0px 3.7855px 11.3565px rgba(0, 0, 0, 0.08)"
              bg="#ffffff"
            >
              <ShopIcon width={24} height={24} color="#292D32" />
            </chakra.div>
            <chakra.p fontSize="13.25px" fontWeight="600" m="0px 7.571px">
              Add to shop
            </chakra.p>
          </Button>
        </chakra.div>
      </chakra.div>
      <AddProduct
        isOpen={addProductModal.isOpen}
        onClose={addProductModal.onClose}
        product_unit={product_unit}
        product={product}
      />
    </>
  );
};

export default Variant;
