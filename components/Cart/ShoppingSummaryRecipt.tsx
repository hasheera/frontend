import { chakra } from "@chakra-ui/react"
import { useEffect, useState } from "react";
// import { FaLock } from "react-icons/fa";
import { formatPrice } from "@utils/helpers";
import { useAppSelector } from "hooks";
import { cartsData } from "store/slices/carts";


const ShoppingSummaryRecipt: React.FC = () => {
  const { carts } = useAppSelector(cartsData);
  const [amounts, setAmounts] = useState({
    subTotal: 0,
    VAT: 0,
    delivery: 0
  })

  useEffect(() => {
    setAmounts({
      subTotal: carts[0].cart_items.reduce((a: any, b: { price: number; }) => a + b.price, 0),
      VAT: 0,
      delivery: 0
    })
  }, [carts])


  return (
    <chakra.div
      w="326px"
      borderRadius="10px"
      m="20px auto"
      border="0.970696px solid rgba(0, 0, 0, 0.1)"
      p="20px"
    >
      <chakra.div
        display="flex"
        justifyContent="space-between"
        mb="10px"
      >
        <chakra.p
          fontWeight="500"
          color="#333"
          fontSize="12px"
          opacity="50%"
        >
          Total Price ({carts[0].cart_items.length} items)
        </chakra.p>
        <chakra.p
          fontWeight="600"
          fontSize="14px"
          color="#333"
          opacity="50%"
        >
          &#8358;{formatPrice(amounts.subTotal)}
        </chakra.p>
      </chakra.div>
      <chakra.div
        display="flex"
        justifyContent="space-between"
        mb="10px"
      >
        <chakra.p
          fontWeight="500"
          color="#333"
          fontSize="14px"
          opacity="50%"
        >
          VAT (7.5%)
        </chakra.p>
        <chakra.p
          fontWeight="600"
          fontSize="14px"
          color="#333"
          opacity="50%"
        >
          &#8358;{formatPrice(amounts.VAT)}
        </chakra.p>
      </chakra.div>
      {amounts.delivery > 0 && <chakra.div
        display="flex"
        justifyContent="space-between"
        mb="10px"
      >
        <chakra.p
          fontWeight="500"
          color="#333"
          fontSize="12px"
          opacity="50%"
        >
          Delivery fee
        </chakra.p>
        <chakra.p
          fontWeight="600"
          fontSize="14px"
          color="#333"
          opacity="50%"
        >
          &#8358;{formatPrice(amounts.delivery)}
        </chakra.p>
      </chakra.div>}
      <chakra.div w="285px" border="1px dashed rgba(0, 0, 0, 0.7)" />
      <chakra.div
        display="flex"
        justifyContent="space-between"
        my="10px"
      >
        <chakra.p
          fontWeight="500"
          color="#333"
          fontSize="14px"
          opacity="70%"
        >
          Total
        </chakra.p>
        <chakra.p
          fontWeight="600"
          fontSize="14px"
          color="#333"
        >
          &#8358;{formatPrice(amounts.subTotal + amounts.VAT + amounts.delivery)}
        </chakra.p>
      </chakra.div>
    </chakra.div>
  );
};

export default ShoppingSummaryRecipt;
