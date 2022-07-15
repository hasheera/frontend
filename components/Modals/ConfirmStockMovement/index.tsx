import React, { FC } from "react";
import { chakra, useToast } from "@chakra-ui/react";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productDetails: any;
};

const ConfirmStockMovement: FC<Props> = ({
  isOpen,
  onClose,
  productDetails,
}) => {
  const { singleShop } = useAppSelector(shopsData);
  const toast = useToast();
  const confirm = async () => {
    try {
      const res = await AuthAxios.post(
        `/oga/shop/product/stock/transfer/confirm?shop_id=${singleShop.selectedShop.shop_id}&shop_product_stock_transfer_id=${productDetails.id}'`,
      );
      if (res.status === 200) {
        toast({
          description: `${res.data.message}`,
          status: "success",
          duration: 3000,
          position: "top",
        });
        onClose();
        window.location.reload();
      };
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Confirm Product">
      Are you sure you want to confirm
      <chakra.p fontSize="18px" fontWeight="500" my="20px">
        {productDetails.product_unit?.name}
      </chakra.p>
      <chakra.img
        w="100px"
        h="100px"
        objectFit="cover"
        borderRadius="5px"
        src={productDetails.product_unit?.photo}
        alt={productDetails.product_unit?.name}
      />
      <chakra.div display="flex" justifyContent="center" w="full" my="10px">
        {productDetails.status === "received" ? (
          <chakra.button
            w="200px"
            h="42px"
            bg="green"
            color="#fff"
            borderRadius="10px"
          >
            confirmed
          </chakra.button>
        ) : (
          <chakra.button
            onClick={confirm}
            w="200px"
            h="42px"
            bg="#2153CC"
            color="#fff"
            borderRadius="10px"
          >
            confirm
          </chakra.button>
        )}
      </chakra.div>
    </ModalUI>
  );
};

export default ConfirmStockMovement;
