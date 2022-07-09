/* eslint-disable camelcase */
import { FC } from "react";
import { chakra, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { ShopIcon } from "public/assets";
import AddProduct from "@components/Modals/AddProduct";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";

interface Props {
  shop_product: {
    product_unit: {
      id: any;
      photo: string;
      name: string;
    };
    product: {
      id: any;
      name: string;
      photo: string;
    };
  };
}

const Product: FC<Props> = ({ shop_product }) => {
  const { singleShop } = useAppSelector(shopsData)
  const toast = useToast();
  const addProductModal = useDisclosure();

  const addShopProduct = async (id: string | number, prodId: string | number) => {
    try {
      const res = await AuthAxios.post("/oga/shop/product/create", {
        shop_id: Number(singleShop.selectedShop.id),
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
      return res
    } catch (e) {
      return e;
    }
  };

  const addProductManual = () => {
    addProductModal.onOpen();
  };

  return (
    <>
      <chakra.div cursor="pointer">
        <chakra.div
          w="152.68px"
          overflow="hidden"
          m={{ base: "5px", md: "10px", lg: "10px" }}
          borderTopRadius="15.3247px"
          onClick={() => addProductManual()}
        >
          <chakra.div w="100%" h="151.45px">
            <chakra.img
              src={shop_product?.product_unit?.photo}
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
              {`${shop_product?.product?.name} ${shop_product?.product_unit?.name}`}
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
            onClick={() =>
              addShopProduct(
                shop_product?.product_unit?.id,
                shop_product?.product?.id
              )
            }
          >
            <chakra.div
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="32.18px"
              h="32.18px"
              borderRadius="3.79px"
              p="4.73px"
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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AddProduct {...addProductModal} {...shop_product} />
    </>
  );
};

export default Product;
