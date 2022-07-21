import { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks";
import { deleteProduct, getSingleShop, shopsData } from "store/slices/shops";
import AlertDialogUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  deleteShopProductId: any;
};

const DeleteProductDialog: FC<Props> = ({
  isOpen,
  onClose,
  deleteShopProductId,
}) => {
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [isRequest, setIsRequest] = useState(false);
  const toast = useToast();

  const deleteShopProduct = async () => {
    setIsRequest(true);
    const res: any = await dispatch<any>(deleteProduct({ id: deleteShopProductId, shopId: singleShop.selectedShop.shop_id }));
    if (res.payload) {
      dispatch<any>(getSingleShop(singleShop.selectedShop.shop_id))
      setIsRequest(false);
      toast({
        description: `${res.payload.data.data.message}`,
        status: "success",
        position: "top-right",
        duration: 3000,
      });
      onClose();
    }
  };

  return (
    <AlertDialogUI
      open={isOpen}
      close={onClose}
      header="Delete Product"
      isRequest={isRequest}
      action={deleteShopProduct}
      question="Are you sure you want to delete this product?"
    />
  );
};

export default DeleteProductDialog;
