import { useContext, useState } from "react";
import {
  chakra,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { getSingleShop, shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import AuthAxios from "@utils/api/authAxios";
import { AdditionIcon, SubtractionIcon } from "../../../public/assets";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Transfer = ({ isOpen, onClose }: Props) => {
  const { singleProduct, singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [formValues, setFormValues] = useState<{
    receiverShopId: any;
  }>({
    receiverShopId: "",
  });
  const [qty, setQty] = useState(0);

  const createTransfer = async () => {
    const { receiverShopId } = formValues;

    const res = await AuthAxios.post(
      `/oga/shop/product/stock/transfer/create?shop_id=${singleShop.selectedShop.shop_id}&receiver_shop_id=${receiverShopId}&shop_product_id=${singleProduct.id}&quantity=${qty}`
    );

    if (res.status === 200) {
      dispatch<any>(getSingleShop(singleShop.selectedShop.shop_id))
      toast({
        description: `${res.data.message}`,
        position: "top",
        status: "success",
        duration: 3000,
      });
      onClose();
      setFormValues({ receiverShopId: "" });
      setQty(0);
    }
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Transfer product">
      <chakra.div display="flex">
        <chakra.img
          w="156px"
          h="156px"
          borderRadius="8px"
          objectFit="cover"
          src={
            singleProduct.shop_product_images?.length
              ? singleProduct.shop_product_images[0]?.photo
              : singleProduct.product_unit.photo
          }
          alt="product"
        />

        <chakra.div mt="4.48px" ml="10px">
          <chakra.p
            fontSize="0.75rem"
            fontWeight="500"
            textDecoration="underline"
            css={{
              "::first-letter": { textTransform: "capitalize" },
            }}
          >
            {singleProduct.product_unit.name}
          </chakra.p>
          <chakra.p fontSize="0.75rem">
            {singleProduct.product?.name?.length > 54
              ? `${singleProduct.product?.name.slice(0, 50)}...`
              : singleProduct.product?.name}
          </chakra.p>
        </chakra.div>
      </chakra.div>
      <chakra.p fontSize="0.625rem" fontWeight="500" color="#FB8200">
        {singleProduct.stock_count} stock Left
      </chakra.p>
      <Input
        my="10px"
        placeholder="Enter Shop Id"
        value={formValues.receiverShopId}
        onChange={(e) =>
          setFormValues((val) => ({ ...val, receiverShopId: e.target.value }))
        }
      />
      <InputGroup my="10px">
        <InputLeftElement>
          {qty > 0 && (
            <chakra.button px="30px" onClick={() => setQty((num) => num - 1)}>
              <SubtractionIcon />
            </chakra.button>
          )}
        </InputLeftElement>

        <Input
          placeholder="Enter Quantity"
          value={qty}
          onChange={(e: any) => setQty(e.target.value)}
        />
        <InputRightElement>
          <chakra.button px="30px" onClick={() => setQty((num) => num + 1)}>
            <AdditionIcon />
          </chakra.button>
        </InputRightElement>
      </InputGroup>
      <chakra.div display="flex" justifyContent="center" w="full">
        <chakra.button
          onClick={createTransfer}
          mx="auto"
          color="#FFFFFF"
          fontSize="14px"
          fontWeight="600"
          w="306px"
          h="44px"
          bg="#2153CC"
          borderRadius="5.77px"
        >
          Submit
        </chakra.button>
      </chakra.div>
    </ModalUI>
  );
};

export default Transfer;
