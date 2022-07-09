import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import Variants from "@components/ImportProducts/Variants";
import { PrevIcon } from "public/assets";
import NextLink from "next/link";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import AuthAxios from "@utils/api/authAxios";


interface ProductsCategory {
  data: {
    shop_product: {
      product_unit: {
        id: any;
        photo: string;
        name: string;
      };
      product: {
        id: any;
        name: string;
        photo: string;
        brand: {
          name: string;
        };
      };
    };
  }[];
  loaded: boolean;
}

const ProductsUnit = () => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductsCategory>({
    data: [],
    loaded: false,
  });
  const [resultsNumber, setresultsNumber] = useState<number>(0);

  const calculateCount = (data: { product_units: [] }[]) => {
    let sum = 0;
    for (let i = 0; i < data.length; i+=1) {
      const element = data[i];
      sum += element.product_units.length;
    }
    setresultsNumber(sum);
  };
  
  const getCategory = async () => {
    AuthAxios.get(`oga/product/index`, {
      // product_category_id: router.query.id,
    })
      .then((res) => {
        if (res.status === 200) {
          // setProducts({ data: res.data.data.data, loaded: true });
          calculateCount(res.data.data.data);
        }
      })
      .catch((e) => e);
  };

  useEffect(() => {
    if (router.query.id) {
      getCategory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  return (
    <VendorDashBoardLayout>
      <chakra.div display="flex" alignItems="center" mt="20px">
        <NextLink href="/import" passHref>
          <chakra.a
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="39.24px"
            h="39.24px"
            border="0.970696px solid #082CF5"
            borderRadius="50%"
            boxSizing="border-box"
          >
            <PrevIcon />
          </chakra.a>
        </NextLink>
        <chakra.p
          color="#000000"
          fontWeight="500"
          fontSize="17.47px"
          textTransform="capitalize"
          ml="20px"
        >
          {router.query.name} Category
        </chakra.p>
      </chakra.div>
      <chakra.div maxW="1060.28px" mt="30px" borderRadius="8px" bg="#ffffff">
        <Variants data={products.data} loaded={products.loaded} />
      </chakra.div>
    </VendorDashBoardLayout>
  );
};

export default ProductsUnit;
