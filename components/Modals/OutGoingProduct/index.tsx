import { FC } from "react";
import { chakra, useToast } from "@chakra-ui/react";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productDetails: any;
};

const OutGoingProduct: FC<Props> = ({ isOpen, onClose, productDetails }) => {
  const toast = useToast();

  return (
    <ModalUI open={isOpen} close={onClose} heading="OutGoing">
      Product Transfered to {productDetails.receiver_shop?.name}
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
      <chakra.div
        display="flex"
        justifyContent="center"
        w="full"
        my="10px"
       />
    </ModalUI>
  );
};

export default OutGoingProduct;
