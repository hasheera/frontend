import React, { useContext, useState } from "react";
import { NigeriaFlag } from "@public/assets";
import {
  chakra,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getCustomers, shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

interface Props {
  isOpen: any;
  onClose: any;
}

const CreateCustomerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const toast = useToast();
  const [addNewCustomerForm, setAddNewCustomerForm] = useState<{
    name: string;
    phone: string;
  }>({
    name: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    setAddNewCustomerForm((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (addNewCustomerForm.name === "" || addNewCustomerForm.phone === "") {
      return toast({
        position: "top",
        duration: 3000,
        status: "info",
        description: "please all input field are required",
      });
    }

    try {
      setIsRequest(true);
      const { phone, name } = addNewCustomerForm;
      const res = await AuthAxios.post(`/oga/shop/customer/create`, {
        shop_id: singleShop.selectedShop.id,
        phone:
          phone.charAt(0) === "0" ? `+234${phone.slice(1)}` : `+234${phone}`,
        name,
      });
      if (res.status === 200) {
        setIsRequest(false);
        dispatch<any>(getCustomers(singleShop.selectedShop.id));
        onClose();
        return toast({
          position: "top",
          status: "success",
          duration: 3000,
          description: "Successfull",
        });
      }
      return res;
    } catch (err) {
      setIsRequest(false);
      return err;
    }
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Create a customer">
      <chakra.form onSubmit={handleSubmit}>
        <chakra.div my="20px">
          <chakra.p fontSize="14px" color="#333333" fontWeight="600">
            Customer name
          </chakra.p>
          <Input
            name="name"
            value={addNewCustomerForm.name}
            placeholder="Enter customer name"
            required
            _placeholder={{
              color: "#B3B3B3",
              fontSize: "12px",
              fontWeight: "400",
            }}
            onChange={handleChange}
          />
        </chakra.div>
        <chakra.div my="20px">
          <chakra.p fontSize="14px" color="#333333" fontWeight="600">
            Whatsapp Number
          </chakra.p>
          <InputGroup>
            <InputLeftElement>
              <NigeriaFlag />
            </InputLeftElement>
            <Input
              name="phone"
              value={addNewCustomerForm.phone}
              placeholder="Phone Number"
              required
              maxLength={11}
              _placeholder={{
                color: "#B3B3B3",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onChange={handleChange}
            />
          </InputGroup>
        </chakra.div>
        <chakra.div
          w="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <chakra.button
            w="268px"
            h="47.4px"
            borderRadius="5.84px"
            bg="#2153CC"
            type="submit"
          >
            {isRequest ? (
              <Spinner size="sm" color="#ffffff" />
            ) : (
              <chakra.p fontSize="18px" fontWeight="600" color="#FFFFFF">
                Submit
              </chakra.p>
            )}
          </chakra.button>
          <chakra.p
            fontSize="7.22px"
            fontWeight="500"
            color="#888888"
            my="11.5474px"
            textDecoration="underline"
            w="228px"
            textAlign="center"
          >
            By clicking submit you have created a new shop, proceed to setting
            up your address
          </chakra.p>
        </chakra.div>
      </chakra.form>
    </ModalUI>
  );
};

export default CreateCustomerModal;
