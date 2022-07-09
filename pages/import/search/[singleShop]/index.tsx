import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { chakra } from "@chakra-ui/react";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import { PrevIcon } from "public/assets";
import Variants from "@components/ImportProducts/Variants";
import { NextPage } from "next";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";


const Search: NextPage = () => {
  const { singleShop } = useAppSelector(shopsData);
  const [products, setProducts] = useState<{ data: []; loaded: boolean }>({
    data: [],
    loaded: false,
  });
  const router = useRouter();
  
    const showProduct = () => {
      AuthAxios.post(`oga/product/search`, { name: router.query.product })
        .then((res) => {
          setProducts({ data: res.data.data.data, loaded: true });
        })
        .catch((e) => e);
    };

  useEffect(() => {
    if (router.query.product) {
      showProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.product]);

  return (
    <VendorDashBoardLayout>
      <chakra.div display="flex" alignItems="center" mt="20px">
        <NextLink
          href={`/vendor/import/${singleShop.selectedShop?.shop.name
            .split(" ")
            .join("-")
            .toLowerCase()}-${singleShop.selectedShop?.shop_id}`}
          passHref
        >
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
          {router.query.name}
        </chakra.p>
      </chakra.div>
      <chakra.div display="flex" justifyContent="end">
        <chakra.p color="#333333" opacity="50%" fontWeight="400">
          {/* Showing 19,38867 results */}
        </chakra.p>
      </chakra.div>

      <chakra.div
        mt="30px"
        p={{ base: "10px", xl: "22px" }}
        borderRadius="8px"
        bg="#ffffff"
      >
        <Variants data={products.data} loaded={products.loaded} />
      </chakra.div>
    </VendorDashBoardLayout>
  );
};

export default Search;
