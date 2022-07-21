/* eslint-disable camelcase */
import React, { FC, useState } from "react";
import { chakra, useToast, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import AuthAxios from "@utils/api/authAxios";
import { useAppSelector } from "hooks";
import { userData } from "store/slices/user";
import { shopsData } from "store/slices/shops";

type Props = {
  setModalStage: any;
  productData: any;
};

const StockIn: FC<Props> = ({ setModalStage, productData }) => {
  const { singleShop } = useAppSelector(shopsData);
  const { user } = useAppSelector(userData);
  const toast = useToast();

  const [quantity, setQuantity] = useState<any>(null);
  const [isRequest, setIsRequest] = useState<boolean>(false);

  const updateStock = (action_type: number) => {
    // e.preventDefault();
    if (Number(action_type) === 0 && Number(quantity) < 0) {
      return toast({
        description: "Cannot remove more than available stock",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
    }
    setIsRequest(true);
    AuthAxios.post(
      `/oga/shop/product/stock/action/create?shop_id=${singleShop.selectedShop.shop_id}&shop_product_id=${
        productData.id
      }&action_type=${action_type}&quantity=${quantity}&action_reason=${null}&user_id=${
        user?.user.id
      }`
    )
      .then((res) => {
        if (res.status === 200) {
          setIsRequest(false);
          setModalStage("add_custom_photo");
          toast({
            description: "Stock in successful",
            status: "success",
            duration: 3000,
            position: "top-right",
          });
        }
      })
      .catch((e) => {
        setIsRequest(false);
        return e;
      });
      return null
  };

  return (
    <chakra.div w="full">
      <chakra.button
        onClick={() => setModalStage("add_custom_photo")}
        fontSize="14px"
        color="#2153CC"
        fontWeight="500"
        float="right"
        p="10px"
      >
        Skip
      </chakra.button>

      <chakra.input
        w="full"
        name="stock"
        type="number"
        fontSize="14px"
        px="16px"
        mt="1px"
        placeholder="0"
        border="1px solid rgba(154, 161, 174, 0.3)"
        borderRadius="12px"
        inputMode="numeric"
        h="44px"
        _focus={{ border: "1px solid #1739E8", outline: "none" }}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <chakra.button
        onClick={() => updateStock(1)}
        w="full"
        disabled={isRequest}
        bg="#2153CC"
        color="white"
        borderRadius="5px"
        mt="10px"
        h="48px"
        _focus={{ outline: "4px solid #9CAAF5" }}
        fontSize="14px"
        fontWeight="600"
      >
        {isRequest ? (
          <Spinner size="sm" color="white" />
        ) : (
          <chakra.p fontWeight="600" fontSize="14px">
            Stock In
          </chakra.p>
        )}
      </chakra.button>
    </chakra.div>
  );
};

export default StockIn;
