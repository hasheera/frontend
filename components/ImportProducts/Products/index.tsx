import React, { FC } from "react";
import { Grid, chakra } from "@chakra-ui/react";
import Product from "./Product";

interface Props {
  data: {
    shop_product: {
      product_unit: {
        id: any;
        photo: string;
        name: string;
      };
      product: {
        id: any;
        photo: string;
        name: string;
      };
    };
  }[];
  loaded: boolean;
}

const Products: FC<Props> = ({ data, loaded }) => (
  <chakra.div
    display="grid"
    columnGap="20px"
    rowGap="20px"
    gridTemplateColumns="repeat(auto-fit, minmax(152.68px,1fr))"
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {loaded && data.map((prod) => <Product key={prod.shop_product?.product?.id} {...prod} />)}
  </chakra.div>
);

export default Products;
