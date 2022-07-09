import React, { FC, useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { IconButton, Link } from "@chakra-ui/react";
import Slider from "react-slick";
import type { CustomArrowProps } from "react-slick";
import { NextIcon } from "@public/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import PopularCategory from "./PopularCategory";


interface PopularCategories {
  data: { name: string; photo: string; id: number }[];
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

const PopularCategories: FC = () => {
  const { singleShop } = useAppSelector(shopsData);
  const [popularCategories, setPopularCategories] = useState<PopularCategories>(
    { data: [], loaded: false }
  );

  const getPopularCategories = () => {
    AuthAxios.get("oga/product/category/index")
      .then((res) => {
        if (res.status === 200) {
          setPopularCategories({
            data: res.data.data.data,
            loaded: true,
          });
        }
      })
      .catch((e) => e);
  };

  useEffect(() => {
    getPopularCategories();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slider {...settings}>
        {popularCategories.data.map((data) => (
          <NextLink
            key={data.id}
            href={`/vendor/import/category/${singleShop.selectedShop?.shop.name
              .split(" ")
              .join("-")
              .toLowerCase()}-${singleShop.selectedShop?.shop_id}?name=${
              data.name
            }&id=${data.id}`}
            passHref
          >
            <Link href={data.name}>
              <PopularCategory name={data.name} photo={data.photo} />
            </Link>
          </NextLink>
        ))}
      </Slider>
  );
};

export default PopularCategories;
