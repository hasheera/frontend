import { chakra } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { getStockMovement, shopsData } from "store/slices/shops";
import StockMovementTable from "./StockMovementTable";


const StockMovement = () => {
  const { singleShop, stockMovements } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (singleShop.loaded) {
      if(!stockMovements.loaded) {
        dispatch<any>(getStockMovement(singleShop.selectedShop.shop_id));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  if (!stockMovements.loaded) {
    <div>Loading...</div>;
  }

  return (
      <chakra.div>
        <StockMovementTable />
      </chakra.div>
    );
}

export default StockMovement;
