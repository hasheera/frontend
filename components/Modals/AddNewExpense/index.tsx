import { useState } from "react";
import {
  chakra,
  InputLeftElement,
  InputGroup,
  Input,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import { getTransactionsExpenses } from "store/slices/carts";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewExpense = ({ isOpen, onClose }: Props) => {
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [isRequest, setIsRequest] = useState(false);
  const [form, setForm] = useState({
    amount: null,
    purpose: "",
    description: "",
  });

  const toast = useToast();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsRequest(true);
      const { amount, purpose, description } = form;

      const res = await AuthAxios.post(
        `oga/shop/expense/create?shop_id=${singleShop.selectedShop.shop_id}&amount=${amount}&amount_paid=${amount}&spent_on=${purpose}&description=${description}`
      );

      if (res.status === 200) {
        dispatch<any>(getTransactionsExpenses(singleShop.selectedShop.shop_id));
        setIsRequest(false);
        onClose();
        setForm({
          amount: null,
          purpose: "",
          description: "",
        });
        return toast({
          duration: 3000,
          position: "top",
          description: `${res.data.message}`,
          status: "success",
        });
      }
      return res;
    } catch (err) {
      return err;
    }
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Add new expense">
      <chakra.form onSubmit={handleSubmit}>
        <chakra.p
          mt="10px"
          fontSize="12px"
          fontWeight="500"
          color="#333333"
          lineHeight="15.16px"
        >
          Amount
        </chakra.p>
        <InputGroup>
          <InputLeftElement color="#B3B3B3" fontWeight="400" fontSize="16px">
            &#8358;
          </InputLeftElement>
          <Input
            onChange={handleChange}
            type="number"
            name="amount"
            value={form.amount}
          />
        </InputGroup>
        <chakra.p
          mt="10px"
          fontSize="12px"
          fontWeight="500"
          color="#333333"
          lineHeight="15.16px"
        >
          Purpose
        </chakra.p>
        <Input
          onChange={handleChange}
          value={form.purpose}
          name="purpose"
          type="text"
          placeholder="Fuel, lunch, transport, salary etc..."
          _placeholder={{
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "13.76px",
            color: "#B3B3B3",
          }}
        />
        <chakra.p
          mt="10px"
          fontSize="12px"
          fontWeight="500"
          color="#333333"
          lineHeight="15.16px"
        >
          Description
        </chakra.p>
        <Textarea
          onChange={handleChange}
          value={form.description}
          name="description"
          placeholder="A short details of your expense"
          _placeholder={{
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "13.76px",
            color: "#B3B3B3",
          }}
          resize="none"
        />
        <chakra.div display="flex" justifyContent="center">
          <chakra.button
            opacity={isRequest ? "0.5" : "1"}
            disabled={isRequest}
            type="submit"
            background="#2153CC"
            color="#ffffff"
            w="306.01px"
            h="47.4px"
            borderRadius="5.77px"
            fontSize="18px"
            fontWeight="600"
            mt="30px"
          >
            {isRequest ? <Spinner color="#fff" size="sm" /> : "Submit"}
          </chakra.button>
        </chakra.div>
      </chakra.form>

      <chakra.div display="flex" justifyContent="center" mt="10px">
        <chakra.p
          w="192px"
          color="#888888"
          fontSize="8.22px"
          fontWeight="500"
          lineHeight="10.83px"
          textAlign="center"
        >
          By clicking submit you have successfully created a new expense
        </chakra.p>
      </chakra.div>
    </ModalUI>
  );
};

export default AddNewExpense;
