import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import TopSellingProduct from "./TopSellingProduct";


const TopSellingProducts = () => {
  const { topSellingData } = useAppSelector(shopsData);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {topSellingData.loaded &&
        topSellingData.data && topSellingData.data.data.map((data) => (
          <TopSellingProduct key={data.id} data={data} />
        ))}
    </>
  );
};

export default TopSellingProducts;
