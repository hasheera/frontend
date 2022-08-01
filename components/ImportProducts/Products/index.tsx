import React, { FC } from "react";
import { Grid, chakra } from "@chakra-ui/react";
import Product from "./Product";

interface Props {
  data: {
    id: number;
    name: string;
    product_units: any[];
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
    gridTemplateColumns="repeat(auto-fit, minmax(152px, 1fr))"
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {loaded && data.map((prod) => <Product key={prod.id} {...prod} />)}
  </chakra.div>
)

export default Products;
