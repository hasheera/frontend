/* eslint-disable camelcase */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { chakra, Button, IconButton } from "@chakra-ui/react";
import { NextIcon } from "public/assets";
import type { CustomArrowProps } from "react-slick";
import Slider from "react-slick";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import Variant from "../Variants/Varaint";

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

const SampleNextIcon = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <IconButton
      onClick={onClick}
      aria-label="Next Icon"
      position="absolute"
      right="0"
      top="40%  "
      bg="none"
      _hover={{ bg: "none" }}
      _focus={{ border: "none", bg: "none" }}
      _active={{ background: "none" }}
      icon={<NextIcon />}
    />
  );
};

const Brands: FC<Props> = ({ loaded, data }) => {
  const { singleShop } = useAppSelector(shopsData);
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextIcon />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToProducts = (slug: string, id: number, name: string) => {
    router.push({
      pathname: `/vendor/import/search/${singleShop.selectedShop?.shop.name
        .split(" ")
        .join("-")
        .toLowerCase()}-${singleShop.selectedShop?.shop_id}`,
      query: `product=${slug}&id=${id}&name=${name}`,
    });
  };

  return (
    <>
      {data.map((product: any, i) => (
        <chakra.div
          key={product.shop_product.product.id}
          h="377px"
          bg="#FFFFFF"
          borderRadius="4.11px"
          pt="10px"
          pl="15px"
        >
          <chakra.div display="flex" justifyContent="space-between">
            <chakra.p color="#2153CC" fontSize="17.94px" fontWeight="500">
              {product?.name}
            </chakra.p>
            <Button
              onClick={() =>
                goToProducts(product?.slug, product?.id, product?.name)
              }
              title="View all"
              color="#FF8A75"
              bg="none"
              fontSize="14px"
              fontWeight="400"
              textDecoration="underline"
              _hover={{ bg: "none" }}
            >
              View all
            </Button>
          </chakra.div>
          <chakra.div>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Slider {...settings}>
              {product?.product_units?.map((prod) => (
                <Variant
                  key={prod.id}
                  product_unit={prod}
                  product={product}
                />
              ))}
            </Slider>
          </chakra.div>
          <chakra.div
            w="95%"
            mt="25px"
            mx="auto"
            border="1px solid rgba(0, 0, 0, 0.2)"
          />
        </chakra.div>
      ))}
    </>
  );
};

export default Brands;
