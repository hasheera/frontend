import React, { FC, useEffect } from "react";
import ExpensesTable from "@components/Transactions/Expenses/ExpensesTable";
import { chakra, useDisclosure } from "@chakra-ui/react";
import { AdditionIcon } from "@public/assets";
import AddNewExpense from "@components/Modals/AddNewExpense";
import { useAppDispatch, useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import { cartsData, getTransactionsExpenses } from "store/slices/carts";


const Expenses: FC = () => {
  const { transactionExpenses } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const addNewExpense = useDisclosure();

  useEffect(() => {
    if (singleShop.loaded) {
      if(!transactionExpenses.loaded) {
        dispatch<any>(getTransactionsExpenses(singleShop.selectedShop.shop_id));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  if (!transactionExpenses.loaded) {
    <div>Loading...</div>;
  }

  return (
    <>
      <chakra.div>
        <ExpensesTable />
      </chakra.div>
      <chakra.div>
        <chakra.div
          onClick={() => addNewExpense.onOpen()}
          display={{ base: "flex", xl: "none" }}
          justifyContent="center"
          alignItems="center"
          position="fixed"
          w="205px"
          h="49px"
          borderRadius="11.88px"
          p="6.09111px 12.1822px"
          bg="#ffffff"
          right="1.95%"
          bottom="12.33%"
          boxShadow="-7.42424px 8.90909px 26.7273px rgba(33, 83, 204, 0.25)"
          cursor="pointer"
        >
          <AdditionIcon />
          <chakra.p
            color="#2153CC"
            fontSize="14.85px"
            fontWeight="600"
            lineHeight="22px"
            margin="0px 8.12148px"
          >
            New Expenses
          </chakra.p>
        </chakra.div>
      </chakra.div>
      <AddNewExpense isOpen={addNewExpense.isOpen} onClose={addNewExpense.onClose} />
    </>
  );
};

export default Expenses;
