/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Button,
  chakra,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
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
  ShopIcon,
} from "@public/assets";
import AuthAxios from "@utils/api/authAxios";
import { useAppSelector } from "hooks";
import { setSearchProducts, shopsData } from "store/slices/shops";
import AddProduct from "@components/Modals/AddProduct";


interface SuggestedProducts {
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
        name: string;
        photo: string;
      };
    };
  }[];
  loaded: boolean;
};

export const SearchProducts = ({ shop_product }: any) => {
  const addProductModal = useDisclosure();

  return (
    <>
      {shop_product.map((prod) => (
        <chakra.div
          key={prod.id}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          columnGap="20px"
          rowGap="20px"
          gridTemplateColumns="repeat(auto-fit, minmax(152px, 1fr))"
        >
          {prod.product_units.map((unit) => (
            <chakra.div cursor="pointer" key={unit.id}>
              <chakra.div
                w="152.68px"
                overflow="hidden"
                m={{ base: "5px", md: "10px", lg: "10px" }}
                borderTopRadius="15.3247px"
                onClick={() => addProductModal.onOpen()}
              >
                <chakra.div w="100%" h="151.45px">
                  <chakra.img
                    src={unit?.photo}
                    alt="image"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </chakra.div>
                <chakra.div m="5.36366px 0px" h="50px">
                  <chakra.p
                    letterSpacing="0.0275em"
                    fontSize="10.76px"
                    fontWeight="500"
                    color="#19191D"
                  >
                    {`${prod.name} - ${unit?.name}`}
                  </chakra.p>
                </chakra.div>
              </chakra.div>
              <chakra.div w="100%" display="flex" justifyContent="center">
                <Button
                  w="151.47px"
                  h="43.53px"
                  bg="#ffffff"
                  color="#2264D1"
                  _hover={{ bg: "#2264D1", color: "#ffffff" }}
                  borderRadius="3.88px"
                // m="16px 0px"
                // onClick={() =>
                //   addShopProduct(
                //     shop_product?.product_unit?.id,
                //     shop_product?.product?.id
                //   )
                // }
                >
                  <chakra.div
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="32.18px"
                    h="32.18px"
                    borderRadius="3.79px"
                    p="4.73px"
                    boxShadow="0px 3.7855px 11.3565px rgba(0, 0, 0, 0.08)"
                    bg="#ffffff"
                  >
                    <ShopIcon width={24} height={24} color="#292D32" />
                  </chakra.div>
                  <chakra.p fontSize="13.25px" fontWeight="600" m="0px 7.571px">
                    Add to shop
                  </chakra.p>
                </Button>
              </chakra.div>
            </chakra.div >

          ))}
        </chakra.div>
      ))}

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AddProduct {...addProductModal} {...shop_product} />
    </>
  )
};

const ImportProduct: NextPage = () => {
  const { singleShop } = useAppSelector(shopsData);
  const [suggestedProducts, setSuggestedProducts] = useState<SuggestedProducts>({ data: [], loaded: false });
  const [activeCategory, setActiveCategory] = useState({ name: "", id: null });
  const [categories, setCategories] = useState<PopularCategories>({ data: [], loaded: false });
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [activeBrand, setActiveBrand] = useState<any>(null);
  const [currentBrandName, setCurrentBrandName] = useState("");
  const [brandList, setBrandList] = useState({ data: [], loaded: false });
  const modal = useDisclosure();
  const toast = useToast();

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
          if (showSearch) setShowSearch(false);
          setSuggestedProducts({ data: res.data.data.data, loaded: true });
        }
      })
      .catch((err) => err);
  };

  const searchProductByCategory = async () => {
    try {
      const res = await AuthAxios.post("/oga/product/direct-search", { name: search, product_category_id: activeCategory.id });
      if (res.status === 200) {
        const { data } = res.data.data;
        setProducts(data);
        setShowSearch(true);
      }
      return null
    } catch (error) {
      return error
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (activeCategory.name) {
      return searchProductByCategory()
    }
    AuthAxios.post("oga/product/search", { name: search })
      .then((res) => {
        setProducts(res.data.data.data);
        setShowSearch(true);
        // setSuggestedProducts({ data: res.data.data.data, loaded: true });
        //   if (res.data.data.data.length) {
        //   // const result = res.data.data.data.slice(0, 2);
        //   setProduct(res.data.data.data);
        // }
      })
      .catch((err: any) => err);
    return null;
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

  const getCategories = () => {
    AuthAxios.get("oga/product/category/index")
      .then((res) => {
        if (res.status === 200) {
          setCategories({
            data: res.data.data.data,
            loaded: true,
          });
        }
      })
      .catch((e: any) => e);
  };

  const getBrand = (id: number) => {
    AuthAxios.get(`oga/brand/index?product_category_id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data.data.data;
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

  const getProductByCategory = (id?: number) => {
    AuthAxios.get(
      `oga/product/index?${`product_category_id=${id || activeCategory.id}`}`
    )
      .then((res) => {
        if (res.status === 200) {
          setShowSearch(true);
          setProducts(res.data.data.data);
          if (id) getBrand(id);
        }
      })
      .catch((e) => e);
  };

  const getProductByBrandCategory = (brandId: number) => {
    AuthAxios.get(
      `oga/product/index?${`product_category_id=${activeCategory.id}&brand_id=${brandId}`}`
    )
      .then((res) => {
        if (res.status === 200) {
          setShowSearch(true);
          setProducts(res.data.data.data);
        }
      })
      .catch((e) => e);
  };

  const addShopProduct = async (id: string | number, prodId: string | number) => {
    try {
      const res = await AuthAxios.post("/oga/shop/product/create", {
        shop_id: Number(singleShop.selectedShop.shop_id),
        product_id: prodId,
        product_unit_id: id,
        sell_price: 0,
        cost_price: 0,
        restock_alert: 1,
        category_id: 1,
        expired_date: null,
        other_details: "",
        attributes: 0,
      });
      if (res.status === 200) {
        if (res.data.data.status === "error") {
          toast({
            description: res.data.data.message,
            status: "info",
            duration: 3000,
            position: "top-right",
          });
        } else {
          toast({
            description: "Product added to shop successfully",
            status: "success",
            duration: 3000,
            position: "top-right",
          });
        }
      }
      return res
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    getSuggestedProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (!search) {
      setShowSearch(false);
    }
  }, [search]);

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
          mt="10px"
        >
          Import Products
        </chakra.p>

        <chakra.div
          display="flex"
          flexDir={{ base: "column", xl: "row" }}
          alignItems="start"
          justifyContent={{ base: "none", xl: "space-between" }}
          mt="10px"
        >
          <chakra.form
            onSubmit={handleSearch}
            display="flex"
            flexDir={{ base: "column", md: "row" }}
            alignItems="center"
            gap="20px"
            pos="relative"
            borderRadius="8px"
            w={{ base: "100%", xl: "400px" }}
          >
            <chakra.div w="full" display="flex" pos="relative">
              <chakra.input
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (!e.target.value) {
                    setProducts([]);
                    getSuggestedProducts();
                  }
                }}
                bg="transparent"
                w="100%"
                h="40px"
                borderRadius="8px"
                placeholder="Search for products"
                fontSize="0.75rem"
                fontWeight="500"
                color="#333"
                p="0 16px 0 44px"
                border="1px solid #E0E0E0"
                _hover={{ border: "1px solid #2153CC" }}
                _focus={{ border: "1px solid #2153CC", outline: "none" }}
              />
              <chakra.span
                pos="absolute"
                top="1px"
                left="0"
                bottom="1px"
                w="48px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="0 8px 8px 0"
              >
                <SearchIcon width={24} height={24} color="black" />
              </chakra.span>
            </chakra.div>
            <chakra.button
              type="submit"
              w={{ base: "full", md: "120px" }}
              // disabled={isSearch}
              bg="#2153CC"
              color="white"
              borderRadius="5px"
              h="40px"
              _focus={{ outline: "4px solid #9CAAF5" }}
              fontSize="14px"
              fontWeight="600"
            >
              Search
            </chakra.button>
          </chakra.form>

          {/* <chakra.div w={{ base: "383px", lg: "411.52px" }} pos="relative">
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
          </chakra.div> */}

          <chakra.div display="flex" mt={{ base: "20px", xl: "0" }}>
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
                    bg="white"
                  >
                    <chakra.span
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <chakra.p
                        fontSize="15px"
                        fontWeight="500"
                        color="#333333"
                        mr="10px"
                      >
                        {activeCategory.name || "All Categories"}
                      </chakra.p>
                      {/* {activeCategory ? (
                        <chakra.button>
                          <CancelIcon />
                        </chakra.button>
                      ) : <chakra.span
                        transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                      >
                        <DropDownIcon
                          width={10}
                          height={6}
                          color={activeCategory ? "white" : "#242533"}
                        />
                      </chakra.span>} */}
                      <chakra.span
                        transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                      >
                        <DropDownIcon
                          width={10}
                          height={6}
                          color="#242533"
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
                        getSuggestedProducts();
                        setActiveCategory({ name: "", id: null });
                        setBrandList({ data: [], loaded: false })
                      }}
                    >
                      All Cateories
                    </MenuItem>
                    {categories.data.map((data: any) => (
                      <MenuItem
                        key={data.id}
                        onClick={() => {
                          // setActiveCategory(Number(data.split("-")[1]));
                          setActiveCategory({ name: data.name, id: data.id });
                          getProductByCategory(data.id)
                          // goToCategories(data.name, data.id);
                        }}
                      >
                        {data.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>

            {brandList.loaded && (
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
                      bg="white"
                    >
                      <chakra.span
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <chakra.p
                          fontSize="15px"
                          fontWeight="500"
                          color="#333333"
                          mr="10px"
                        >
                          {currentBrandName || "All brands"}
                        </chakra.p>
                        <chakra.span
                          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                        >
                          <DropDownIcon
                            width={10}
                            height={6}
                            color="#242533"
                          />
                        </chakra.span>
                      </chakra.span>
                    </MenuButton>
                    <MenuList w="fit-content">
                      <MenuItem
                        onClick={() => {
                          setActiveBrand(null);
                          setCurrentBrandName("");
                          getProductByCategory();
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
                            getProductByBrandCategory(Number(data.split("-")[1]))
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
            <chakra.button
              onClick={modal.onOpen}
              w="151px"
              h="40px"
              borderRadius="6px"
              bg="#2153CC"
              color="#fff"
              fontWeight="500"
              display={{ base: "none", xl: "inline" }}
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


        <chakra.div display={{ base: "none", lg: "block" }} w="100%" my="30px">
          <Ads />
        </chakra.div>

        <chakra.div
          // w={{ base: "375px", lg: "1060.28px" }}
          w="100%"
          py="20px"
          borderRadius="8px"
          bg="#ffffff"
          mt={{ base: "40px", lg: "none" }}
        >
          <chakra.p
            color="#2153CC"
            ml="25px"
            display={{ lg: "block" }}
            fontSize="20px"
            fontWeight="500"
          >
            {showSearch ? "Product results" : "Suggested Products"}
          </chakra.p>
          {showSearch ? (
            <chakra.div display="flex">
              <SearchProducts shop_product={products} />
            </chakra.div>
          ) : (
            <Products data={suggestedProducts.data} loaded={suggestedProducts.loaded} />
          )}
        </chakra.div>
      </chakra.div>

      <AddShopProduct isOpen={modal.isOpen} onClose={modal.onClose} />
    </VendorDashBoardLayout>
  );
};

export default ImportProduct;
