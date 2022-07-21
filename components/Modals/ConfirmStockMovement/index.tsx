import React, { FC } from "react";
import { chakra, useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getStockMovement, shopsData } from "store/slices/shops";
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
  const dispatch = useAppDispatch();
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
          position: "top-right",
        });
        onClose();
        dispatch<any>(getStockMovement(singleShop.selectedShop.shop_id));
      };
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Confirm Product">
      Are you sure you want to confirm
      <chakra.p fontSize="1rem" fontWeight="500" my="20px">
        Product Unit: {productDetails.product_unit?.name}
      </chakra.p>
      <chakra.p fontSize="0.875rem" fontWeight="500" my="20px">
        From: {productDetails.sender_shop?.name}
      </chakra.p>
      <chakra.p fontSize="0.875rem" fontWeight="500" my="20px">
        Quantity: {productDetails.quantity}
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
            fontWeight="500"
          >
            Confirmed
          </chakra.button>
        ) : (
          <chakra.button
            onClick={confirm}
            w="200px"
            h="42px"
            bg="#2153CC"
            color="#fff"
            borderRadius="10px"
            fontWeight="500"
          >
            Confirm
          </chakra.button>
        )}
      </chakra.div>
    </ModalUI>
  );
};

export default ConfirmStockMovement;
