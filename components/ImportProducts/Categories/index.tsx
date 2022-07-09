import React, { useState } from "react";
import NextLink from "next/link";
import Slider from "react-slick";
import { chakra } from "@chakra-ui/react";


const Categories = () => {
  const [currentCat, setCurrentCat] = useState("");

  const categories: string[] = [
    "Kid wears",
    "Wedding rings",
    "Iphone 12 pro",
    "Jewelry",
    "Bow Tie",
    "Men cloth",
    "Women shoes",
    "Shirt",
    "Wines",
    "Belts",
    "Women cloths",
    "Bags",
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 4,
    initialSlide: 0,
  };
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {categories.map((data) => (
          <chakra.div
            key={data}
            p="9px 12px"
            onClick={() => setCurrentCat(data)}
            borderBottom={currentCat === data ? "1.8px solid #2153CC" : ""}
            h="33px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <chakra.p
              fontSize="11.6px"
              fontWeight="400"
              textTransform="capitalize"
              color="400"
            >
              {data}
            </chakra.p>
          </chakra.div>
        ))}
      </Slider>
      {/* <chakra.div d="flex">
        {categories.map((data, i) => (
          <NextLink
            key={i}
            href={`/import/category?name=${data}`}
            passHref
          >
            <chakra.div
              p="9px 12px"
              h="33px"
              onClick={() => setCurrentCat(data)}
              borderBottom={currentCat === data ? "1.8px solid #2153CC" : ""}
              ml="14px"
            >
              <chakra.p fontSize="11.6px" fontWeight="400" color="400">
                {data}
              </chakra.p>
            </chakra.div>
          </NextLink>
        ))}
      </chakra.div> */}
    </>
  );
};

export default Categories;
