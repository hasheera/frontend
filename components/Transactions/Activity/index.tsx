import { FC, useEffect } from "react";
import ActivityTable from "@components/Transactions/Activity/ActivityTable";
import { useAppDispatch, useAppSelector } from "hooks";
import { getShopActivity, shopsData } from "store/slices/shops";


const Activity: FC = () => {
  const { singleShop, shopActivity } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (singleShop.loaded) {
      if(!shopActivity.loaded) {
        // dispatch<any>(getShopActivity({ id: singleShop.selectedShop.shop_id }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  if (!shopActivity.loaded) {
    <div>Loading...</div>;
  }

  return (
    /* //# Sale Table */ 
    <ActivityTable />
  );
};

export default Activity;
