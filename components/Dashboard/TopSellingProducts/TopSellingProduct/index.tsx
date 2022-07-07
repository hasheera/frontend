import { chakra } from "@chakra-ui/react";
import { StarIcon } from "public/assets";

type Props = {
  data: {
    id: number;
    shop_product: {
      sell_price: number;
      product: { name: string; photo: string };
      product_unit: any;
      stock_count: number;
    };
    price: number;
    quantity: number;
  };
};

const TopSellingProduct = ({ data }: Props) => (
    <chakra.div display="flex" alignItems="center" m="20px 0">
      <chakra.div
        w={{ base: "112.18px", xl: "91.24px" }}
        h={{ base: "111.17px", xl: "90.21px" }}
        borderRadius={{ base: "8.61px", xl: "5.5px" }}
        overflow="hidden"
      >
        <chakra.img
          w="100%"
          h="100%"
          objectFit="cover"
          src={data.shop_product?.product_unit.photo}
        />
      </chakra.div>
      <chakra.div ml="20px">
        <chakra.p
          w={{ base: "208px", xl: "164.19px" }}
          fontSize={{ base: "11.94px", xl: "12.16px" }}
          fontWeight="400"
          color="#19191D"
          mb={{ base: "12.1277px", xl: "4.05419px" }}
        >
          {`${data.shop_product?.product_unit.name} ${
            data.shop_product?.product.name.length > 30
              ? `${data.shop_product?.product.name.substring(0, 30)}...`
              : data.shop_product?.product.name
          }`}
        </chakra.p>
        <chakra.p
          w="164.19px"
          fontSize={{ base: "17.9px", xl: "15.42px" }}
          fontWeight="500"
          color="#1B1B1B"
          opacity="54%"
          m="4.05419px 0px"
        >
          &#8358;{data.shop_product?.sell_price}{" "}
          <chakra.span display="none">| 325 sold</chakra.span>
        </chakra.p>
        <chakra.div display="flex" alignItems="center">
          <chakra.span display="none">
            <StarIcon w={8} h={8} />
          </chakra.span>
          <chakra.p
            color="#787885"
            fontWeight="400"
            fontSize={{ base: "10.44px", xl: "8.99px" }}
            m="0px 0.642405px"
            letterSpacing={{ base: "0.07px", xl: "0.06px" }}
          >
            <chakra.span display="none">4.87 |</chakra.span>
            {data.shop_product?.stock_count}
          </chakra.p>
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );

export default TopSellingProduct;
