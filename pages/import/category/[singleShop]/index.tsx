import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import NextLink from "next/link";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import { chakra, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Brands from "@components/ImportProducts/Brands";
import { DropDownIcon, PrevIcon } from "@public/assets";
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

const Category: NextPage = () => {
  const [resultsNumber, setresultsNumber] = useState<number>(0);
  const router = useRouter();
  const [activeBrand, setActiveBrand] = useState<any>(null);
  const [currentBrandName, setCurrentBrandName] = useState("");
  const [products, setProducts] = useState<ProductsCategory>({
    data: [],
    loaded: false,
  });
  const [brandList, setBrandList] = useState({ data: [], loaded: false });


  const calculateCount = (data: { product_units: [] }[]) => {
    let sum = 0;
    for (let i = 0; i < data.length; i+=1) {
      const element = data[i];
      sum += element.product_units.length;
    }
    setresultsNumber(sum);
  };

  const sortArray = (data: any) => {
    const reducer = data.reduce((array, value) => {
      if (!array.includes(`${value.name}-${value.id}`)) {
        array.push(`${value.name}-${value.id}`);
      }
      return array;
    }, []);

    setBrandList({ data: reducer, loaded: true });
  };

  const getCategory = async () => {
    AuthAxios.get(
      `oga/product/index?${
        !activeBrand
          ? `product_category_id=${router.query.id}`
          : `product_category_id=${router.query.id}&brand_id=${activeBrand}`
      }`
    )
      .then((res) => {
        if (res.status === 200) {
          setProducts({ data: res.data.data.data, loaded: true });
          calculateCount(res.data.data.data);
        }
      })
      .catch((e) => e);
  };

  const getBrand = async () => {
    AuthAxios.get(`oga/brand/index?product_category_id=${router.query.id}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data.data.data
          const reducer = data.reduce((array, value) => {
            if (!array.includes(`${value.name}-${value.id}`)) {
              array.push(`${value.name}-${value.id}`);
            }
            return array;
          }, []);
      
          setBrandList({ data: reducer, loaded: true });
        }
      })
      .catch((e) => e);
  };

  useEffect(() => {
    if (router.query.id) {
      getCategory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, activeBrand]);

  useEffect(() => {
    if (router.query.id) {
      getBrand();
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
      <chakra.div
        h="67px"
        bg="#fff"
        my="30px"
        display="flex"
        justifyContent="end"
        alignItems="center"
      >
        {brandList.loaded && (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  // w="159px"
                  h="40px"
                  borderRadius="6px"
                  border="0.2px solid rgba(117, 117, 117, 0.5)"
                  ml="40px"
                  p="8px 21px 8px 16px"
                  bg={currentBrandName ? "#2153CC" : ""}
                >
                  <chakra.span
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <chakra.p
                      fontSize="15px"
                      fontWeight="500"
                      textTransform="uppercase"
                      color={currentBrandName ? "white" : "#333333"}
                      mr="10px"
                    >
                      {currentBrandName || "ALL BRANDS"}
                    </chakra.p>
                    <chakra.span
                      transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    >
                      <DropDownIcon
                        width={10}
                        height={6}
                        color={currentBrandName ? "white" : "#242533"}
                      />
                    </chakra.span>
                  </chakra.span>
                </MenuButton>
                <MenuList w="fit-content">
                  <MenuItem
                    onClick={() => {
                      setActiveBrand(null);
                      setCurrentBrandName("");
                    }}
                  >
                    All Brands
                  </MenuItem>
                  {brandList.data.map((data) => (
                    <MenuItem
                      key={data.id}
                      onClick={() => {
                        setActiveBrand(Number(data.split("-")[1]));
                        setCurrentBrandName(data.split("-")[0]);
                      }}
                    >
                      {data.split("-")[0]}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        )}
      </chakra.div>
      {/* <chakra.div maxW="1060.28px" mt="30px" borderRadius="8px" bg="#ffffff"> */}
      {/* <Variants {...products} /> */}
      {/* </chakra.div> */}
      <Brands loaded={products.loaded} data={products.data} />
    </VendorDashBoardLayout>
  );
};

export default Category;
