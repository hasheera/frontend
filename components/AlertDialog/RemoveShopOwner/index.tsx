import { useToast } from "@chakra-ui/react";
import AuthAxios from "@utils/api/authAxios";
import { useAppDispatch, useAppSelector } from "hooks";
import { FC, useState } from "react";
import { getTeams, shopsData } from "store/slices/shops";
import AlertDialogUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  shopOwnerToRemove: any;
};

const RemoveShopOwner: FC<Props> = ({ isOpen, onClose, shopOwnerToRemove }) => {
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [isRequest, setIsRequest] = useState(false);
  const toast = useToast();

  const removeOwner = async () => {
    try {
      setIsRequest(true);
      const res = await AuthAxios.post(`oga/user/shop/remove/role`, {
        shop_id: singleShop.selectedShop.id,
        user_phone_number: shopOwnerToRemove.contact_no,
      });
      if (res.status === 200) {
        dispatch<any>(getTeams(singleShop.selectedShop.id));
        setIsRequest(false);
        onClose();
        toast({
          position: "top",
          description: "Shop owner removed",
          status: "success",
          duration: 2000,
        });
      }
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <AlertDialogUI
      open={isOpen}
      close={onClose}
      header="Remove shop owner"
      isRequest={isRequest}
      action={removeOwner}
      question="Are you sure you want this User from your team?"
    />
  );
};

export default RemoveShopOwner;
