import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import {
  chakra,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import PopularCategories from "@components/ImportProducts/PopularCategories";
import Ads from "@components/ImportProducts/Ads";
import Products from "@components/ImportProducts/Products";
import Categories from "@components/ImportProducts/Categories";
import router from "next/router";
import AddShopProduct from "@components/Modals/AddShopProduct";
import {
  DropDownIcon,
  SearchIcon,
  CancelIcon,
} from "@public/assets";
import AuthAxios from "@utils/api/authAxios";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";


interface SuggestedProducts {
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
      };
    };
  }[];
  loaded: boolean;
}

const ImportProduct: NextPage = () => {
  const { singleShop } = useAppSelector(shopsData);
  const [suggestedProducts, setSuggestedProducts] = useState<SuggestedProducts>(
    { data: [], loaded: false }
  );
  const [activeCategory, setActiveCategory] = useState("");
  const [popularCategories, setPopularCategories] = useState<PopularCategories>(
    { data: [], loaded: false }
  );
  const [search, setSearch] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState([]);
  const modal = useDisclosure();

  const collections: string[] = [
    "Beverages",
    "Phone Accessories",
    "food stuff",
    "Drinks",
    "Fashion",
    "Foot wears",
  ];

  const getSuggestedProducts = () => {
    AuthAxios.get("guest/top-selling-products")
      .then((res) => {
        if (res.status === 200) {
          setSuggestedProducts({ data: res.data.data.data, loaded: true });
        }
      })
      .catch((err) => err);
  };

  const handleSearch = async (e: any) => {
    if (e.target.value === "") {
      setProduct([]);
      return;
    }
    AuthAxios.post("oga/product/search", { name: e.target.value })
      .then((res) => {
        if (res.data.data.data.length) {
          // const result = res.data.data.data.slice(0, 2);
          setProduct(res.data.data.data);
        }
      })
      .catch((err: any) => err);
  };

  const goToProducts = (slug: string, id: number, name: string) => {
    router.push({
      pathname: `/import/search/${singleShop.selectedShop.shop.name
        .split(" ")
        .join("-")
        .toLowerCase()}-${singleShop.selectedShop.shop_id}`,
      query: `product=${slug}&id=${id}&name=${name}`,
    });
  };

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
      .catch((e: any) => e);
  };

  const goToCategories = (name: string, id: number) => {
    router.push(
      `/import/category/${singleShop.selectedShop?.shop.name
        .split(" ")
        .join("-")
        .toLowerCase()}-${singleShop.selectedShop?.shop_id
      }?name=${name}&id=${id}`
    );
  };

  const closeSearch = () => {
    setSearch(false);
    setProduct([]);
    if (searchInputRef.current.value !== null) {
      searchInputRef.current.value = "";
    }
  };

  useEffect(() => {
    getSuggestedProducts();
    getPopularCategories();
  }, []);

  return (
    <VendorDashBoardLayout>
      {/* <chakra.div
        position="fixed"
        w="100%"
        top="55px"
        bg="#ffffff"
        overflow="auto"
      >
        <Categories />
      </chakra.div> */}
      <chakra.div>
        <chakra.p
          fontSize={{ base: "18px", lg: "20px" }}
          fontWeight="500"
          color="#000000"
          mt="40px"
        >
          Import Products
        </chakra.p>

        <chakra.div
          display="flex"
          alignItems="start"
          justifyContent={{ base: "none", xl: "space-between" }}
          mt="20px"
        >
          <chakra.div w={{ base: "383px", lg: "411.52px" }} pos="relative">
            <InputGroup
              w={{ base: "383px", lg: "411.52px" }}
              h={{ base: "39px", lg: "39.08px" }}
              bg="#FFFFFF"
            >
              <Input
                ref={searchInputRef}
                placeholder="Search for products"
                fontSize={{ base: "14px", lg: "12px" }}
                color="#333333"
                fontWeight="500"
                onFocus={() => setSearch(true)}
                onKeyUp={handleSearch}
              />
              <InputRightElement>
                {search ? (
                  <chakra.span onClick={closeSearch} cursor="pointer">
                    <CancelIcon />
                  </chakra.span>
                ) : (
                  <SearchIcon width={21} height={21} color="#333333" />
                )}
              </InputRightElement>
            </InputGroup>
            {product.length ? (
              <chakra.div
                mt="10px"
                pt="20px"
                w="409px"
                maxH="500px"
                h="fit-content"
                overflowY="scroll"
                borderRadius="8px"
                bg="#ffffff"
                boxShadow="0px 4px 11px rgba(0, 0, 0, 0.05)"
                pos="absolute"
                top="30px"
                zIndex="1"
              >
                {product.map(
                  (
                    data: {
                      slug: string;
                      name: string;
                      id: number;
                      product_category: {
                        name: string;
                      };
                    },
                    i: number
                  ) => (
                    <chakra.div
                      onClick={() =>
                        goToProducts(data.slug, data.id, data.name)
                      }
                      key={data.id}
                      display="flex"
                      w="100%"
                      h="27px"
                      _hover={{ bg: "#F7F8FA" }}
                      cursor="pointer"
                      alignItems="center"
                      justifyContent="space-between"
                      pr="40px"
                      pl="20px"
                      my="10px"
                    >
                      <chakra.div display="flex" alignItems="center">
                        <SearchIcon width={21} height={21} color="#000000CC" />
                        <chakra.p
                          ml="10px"
                          fontSize="12px"
                          fontWeight="500"
                          color="#333333"
                        >
                          {data.name.length > 20
                            ? `${data.name.substring(0, 25)}...`
                            : data.name}
                        </chakra.p>
                      </chakra.div>
                      <chakra.p
                        color="#FB8200"
                        fontSize="12px"
                        fontWeight="600"
                      >
                        {data.product_category
                          ? `In ${data.product_category?.name}`
                          : ""}
                      </chakra.p>
                    </chakra.div>
                  )
                )}
              </chakra.div>
            ) : (
              ""
            )}
          </chakra.div>
          <chakra.div display={{ base: "none", xl: "flex" }}>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    // w="159px"
                    h="40px"
                    borderRadius="6px"
                    border="0.2px solid rgba(117, 117, 117, 0.5)"
                    mr="40px"
                    p="8px 21px 8px 16px"
                    bg={activeCategory ? "#2153CC" : ""}
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
                        color={activeCategory ? "white" : "#333333"}
                        mr="10px"
                      >
                        {activeCategory || "ALL CATEGORIES"}
                      </chakra.p>

                      <chakra.span
                        transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                      >
                        <DropDownIcon
                          width={10}
                          height={6}
                          color={activeCategory ? "white" : "#242533"}
                        />
                      </chakra.span>
                    </chakra.span>
                  </MenuButton>
                  <MenuList
                    w="fit-content"
                    h="fit-content"
                    maxH="500px"
                    overflowY="scroll"
                  >
                    <MenuItem
                      onClick={() => {
                        // setActiveBrand(null);
                        setActiveCategory("");
                      }}
                    >
                      All Brands
                    </MenuItem>
                    {popularCategories.data.map((data: any) => (
                      <MenuItem
                        key={data.id}
                        onClick={() => {
                          // setActiveCategory(Number(data.split("-")[1]));
                          setActiveCategory(data.name);
                          goToCategories(data.name, data.id);
                        }}
                      >
                        {data.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
            <chakra.button
              onClick={modal.onOpen}
              w="151px"
              h="40px"
              borderRadius="6px"
              bg="#2153CC"
              color="#fff"
              fontWeight="500"
            >
              <chakra.p fontSize="16px" fontWeight="600" color="#FFFFFF">
                Create Product
              </chakra.p>
            </chakra.button>
          </chakra.div>
          <chakra.div
            display={{ base: "block", xl: "none" }}
            pos="fixed"
            bottom=" 12.33%"
            right="4.62%"
            zIndex="200"
          >
            <chakra.button
              w="154px"
              h="40px"
              borderRadius="11.88px"
              onClick={modal.onOpen}
              bg="#FFFFFF"
              boxShadow="-7.42424px 8.90909px 26.7273px rgba(33, 83, 204, 0.25)"
              fontWeight="500"
            >
              <chakra.p fontWeight="600" fontSize="14px" color="#2153CC">
                Create Product
              </chakra.p>
            </chakra.button>
          </chakra.div>
        </chakra.div>
        <chakra.div
          mt="30px"
          display={{ base: "none", xl: "flex" }}
          alignItems="center"
        >
          <chakra.p fontSize="14px" fontWeight="600" color="#000">
            Popular searches:
          </chakra.p>
          <chakra.div display="flex">
            {suggestedProducts.data.slice(0, 8).map((data, i) => (
              <chakra.button p="5px" key={data.shop_product?.product?.id}>
                {`${data.shop_product?.product?.name.split(" ")[0]} ${data.shop_product?.product?.name.split(" ")[1]}`}
                {i !== suggestedProducts.data.slice(0, 10).length - 1
                  ? " - "
                  : ""}
              </chakra.button>
            ))}
          </chakra.div>
        </chakra.div>
        <chakra.div display={{ base: "none", lg: "block" }} w="100%" my="30px">
          <Ads />
        </chakra.div>
        <chakra.div
          // w={{ base: "375px", lg: "1060.28px" }}
          w="100%"
          py="20px"
          borderRadius="8px"
          bg="#ffffff"
        >
          <chakra.p
            color="#2153CC"
            ml="25px"
            display={{ base: "none", lg: "block" }}
            fontSize="20px"
            fontWeight="500"
          >
            Suggested Products
          </chakra.p>
          <chakra.div>
            <Products data={suggestedProducts.data} loaded={suggestedProducts.loaded} />
          </chakra.div>
        </chakra.div>
      </chakra.div>
      <AddShopProduct isOpen={modal.isOpen} onClose={modal.onClose} />
    </VendorDashBoardLayout>
  );
};

export default ImportProduct;
