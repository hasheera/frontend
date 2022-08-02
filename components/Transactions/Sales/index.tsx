import { FC, useEffect } from "react";
import SalesTable from "@components/Transactions/Sales/SalesTable";
import { useAppDispatch, useAppSelector } from "hooks";
import { cartsData, getTransactionSales } from "store/slices/carts";
import { shopsData } from "store/slices/shops";


const Sales: FC = () => {
  const { transactionSales } = useAppSelector(cartsData);
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (singleShop.loaded) {
      if(!transactionSales.loaded) {
        // dispatch<any>(getTransactionSales({ id: singleShop.selectedShop.shop_id }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  if (!transactionSales.loaded) {
    <div>Loading...</div>;
  }

  return (
    /* //# Sale Table */ 
    <SalesTable />
  );
};

export default Sales;
