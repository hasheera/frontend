import {
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { NextPage } from "next";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import {
  ProductGridView,
} from "@components/VendorProductComponent";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  DropDownIcon,
  SearchIcon,
  SortIcon
} from "public/assets";
import Cookies from "js-cookie";
import { getSingleShop, setBatchType, setSearchProducts, setSingleShop, shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import AuthAxios from "@utils/api/authAxios";

const Product: NextPage = () => {
  const { batchType, singleShop, categories, vendorShops } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [productCategories, setProductCategories] = useState(null);
  const [productCategoriesId, setProductCategoriesId] = useState(null);
  const [productSort, setProductSort] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [sticky, setSticky] = useState(false);
  const router = useRouter();

  const stickyNav = () => {
    if (window.scrollY > 72) {
      setSticky(true);
    } else setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyNav);

    if (router.isReady) {
      const querySplit = (router.query.singleShop as string).split("-");
      const shopId = querySplit[querySplit.length - 1];

      if (router.query.batch) {
        dispatch(setBatchType(`${router.query.batch}`));
      } else {
        dispatch(setBatchType("checkout"));
        router.push({
          ...router,
          query: { ...router.query, batch: batchType },
        });
      }

      if (vendorShops.shops?.length && !singleShop.loaded) {
        const selected = vendorShops.shops?.find((shop: { shop_id: number }) => shop.shop_id === Number(shopId));
        dispatch<any>(getSingleShop(shopId));
        dispatch<any>(setSingleShop(selected));
      }

    }

    return () => {
      window.removeEventListener("scroll", stickyNav);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, vendorShops]);

  const goToProductTransferPage = () => {
    router.push({
      pathname: `/product/transfer_product/${singleShop.selectedShop.id}`,
    });
  };

  // const getProductByCategory = async (categoryId: number) => {
  //   const shopId = Cookies.get("shopId");
  //   try {
  //     setIsSearch(true);
  //     const res = await AuthAxios.get(
  //       `/oga/shop/product/index-by-product-category?shop_id=${shopId}&product_category_id=${categoryId}`,
  //     );
  //     if (res.status === 200) {
  //       setSingleShop({
  //         ...singleShop,
  //         data: res.data.data.data,
  //         next_page_url: res.data.data.next_page_url,
  //         prev_page_url: res.data.data.prev_page_url,
  //       });
  //       setIsSearch(false);
  //     }
  //   } catch (error) {
  //     setIsSearch(false);
  //     return error;
  //   }
  // };

  const searchShopProducts = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      setIsSearch(true);
      if (!e.target.value) {
        const res = await dispatch<any>(getSingleShop(singleShop.selectedShop.id));
        if (res.payload) {
          return setIsSearch(false)
        }
      }

      const res = await AuthAxios.post(
        `/oga/shop/product/search?shop_id=${singleShop.selectedShop.id}&name=${e.target.value}`
      );
      if (res.status === 200) {
        dispatch(setSearchProducts({
          ...singleShop,
          shopData: { ...res.data.data }
        }));
        setIsSearch(false);
      }
      return res
    } catch (error) {
      setIsSearch(false);
      return error;
    }
  };

  const goToImportPage = () => {
    router.push(
      singleShop.loaded
        ? `/import/${singleShop.selectedShop?.shop.name
          .split(" ")
          .join("-")
          .toLowerCase()}-${singleShop.selectedShop?.shop_id}`
        : ""
    );
  };

  return (
    <VendorDashBoardLayout>
      {!singleShop.loaded ? (
        <Flex h="100vh" alignItems="center" justifyContent="center">
          <Spinner size="md" color="#2153CC" />
        </Flex>
      ) : (
        <>
          <chakra.h3
            fontSize="1.5rem"
            fontWeight="500"
            display={{ base: "none", lg: "block" }}
            pt="10px"
          >
            Products
          </chakra.h3>
          <chakra.div
            // mt={{ lg: "24px" }}
            display="flex"
            flexDir={{ base: "column", xl: "row" }}
            alignItems="center"
            justifyContent={{ xl: "space-between" }}
            pos={sticky ? "fixed" : "static"}
            top={{ base: "60px", lg: "72px" }}
            right={sticky ? "0" : "unset"}
            left={{
              base: sticky ? "0" : "unset",
              lg: sticky ? "278px" : "unset",
            }}
            py={{ base: "28px", md: "24px" }}
            px={{ base: sticky ? "16px" : "0", xl: sticky ? "48px" : "0" }}
            bg={sticky ? "white" : "transparent"}
            boxShadow={sticky ? "0px 10px 13px rgba(0, 0, 0, 0.02)" : "none"}
            zIndex="1"
          >
            <chakra.div
              display="flex"
              alignItems="center"
              bg="white"
              pos="relative"
              borderRadius="8px"
              w={{ base: "100%", xl: "400px" }}
            >
              <chakra.input
                onChange={(e) => searchShopProducts(e)}
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

            <chakra.div
              display="flex"
              alignItems="center"
              gridColumnGap="20px"
              mt={{ base: "16px", xl: "0" }}
              w={{ base: "100%", xl: "auto" }}
              h={{ base: "40px", xl: "auto" }}
              pos="relative"
            >
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      bg={{
                        base: "white",
                        lg: productCategories ? "#2153CC" : "white",
                      }}
                      h="36px"
                      p="10px"
                      borderRadius="4px"
                      border="none"
                      color={productCategories ? "white" : "#242533"}
                      fontSize="0.875rem"
                      fontWeight="500"
                      pos={{ base: "absolute", xl: "static" }}
                      left={{ base: "0", xl: "unset" }}
                      css={{
                        "@media (min-width: 1024px)": {
                          "&:hover": {
                            color: productCategories ? "white" : "#2153CC",
                            border: productCategories
                              ? "none"
                              : "1px solid #2153CC",
                          },
                          "&:focus": {
                            color: productCategories ? "white" : "#2153CC",
                            outline: "none",
                            border: "1px solid #2153CC",
                          },
                        },
                      }}
                    >
                      <chakra.span display="flex" alignItems="center">
                        <chakra.span mr="14px">
                          {productCategories || "All Products"}
                        </chakra.span>
                        <chakra.span
                          transform={
                            isOpen ? "rotate(180deg)" : "rotate(0deg)"
                          }
                        >
                          <DropDownIcon
                            width={10}
                            height={6}
                            color={productCategories ? "white" : "#242533"}
                          />
                        </chakra.span>
                      </chakra.span>
                    </MenuButton>
                    <MenuList
                      p="0"
                      bg="white"
                      boxShadow="-4.8px 9.6px 26.4px rgba(0, 0, 0, 0.03)"
                      borderRadius="6px"
                      minW="108px"
                      w="fit-content"
                    >
                      <MenuItem
                        onClick={() => {
                          setProductCategories("");
                        }}
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                      >
                        All Products
                      </MenuItem>
                      {categories?.data?.map(({ id, name }) => (
                        <MenuItem
                          key={id}
                          onClick={() => {
                            setProductCategories(name);
                            setProductCategoriesId(id);
                          }}
                          p="10px"
                          fontSize="0.75rem"
                          color="#242533"
                          _hover={{
                            bg: "rgba(33, 83, 204, 0.08)",
                            color: "#2153CC",
                          }}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>

              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      bg={{
                        base: "transparent",
                        lg: productSort ? "#2153CC" : "white",
                      }}
                      h="36px"
                      p="10px"
                      borderRadius="4px"
                      border="none"
                      color={productSort ? "white" : "#242533"}
                      fontWeight="500"
                      pos={{ base: "absolute", xl: "static" }}
                      right={{ base: "56px", xl: "unset" }}
                      css={{
                        "@media (min-width: 1024px)": {
                          "&:hover": {
                            color: productSort ? "white" : "#2153CC",
                            border: productSort
                              ? "none"
                              : "1px solid #2153CC",
                          },
                          "&:focus": {
                            color: productSort ? "white" : "#2153CC",
                            outline: "none",
                            border: "1px solid #2153CC",
                          },
                        },
                      }}
                    >
                      <chakra.span display="flex" alignItems="center">
                        <chakra.span
                          display={{ base: "none", lg: "inline" }}
                          mr="14px"
                          fontSize="0.875rem"
                        >
                          {productSort || "Sort by"}
                        </chakra.span>
                        <chakra.span display={{ lg: "none" }} mr="14px">
                          <SortIcon />
                        </chakra.span>
                        <chakra.span
                          display={{ base: "none", lg: "inline" }}
                          transform={
                            isOpen ? "rotate(180deg)" : "rotate(0deg)"
                          }
                        >
                          <DropDownIcon
                            width={10}
                            height={6}
                            color={productSort ? "white" : "#242533"}
                          />
                        </chakra.span>
                      </chakra.span>
                    </MenuButton>
                    <MenuList
                      p="0"
                      bg="white"
                      boxShadow="-4.8px 9.6px 26.4px rgba(0, 0, 0, 0.03)"
                      borderRadius="6px"
                      minW="108px"
                      w="fit-content"
                    >
                      <MenuItem
                        onClick={() => setProductSort("")}
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                      >
                        All
                      </MenuItem>
                      <MenuItem
                        onClick={() => setProductSort("Expiry Date")}
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                      >
                        Sort by expiry date
                      </MenuItem>
                      <MenuItem
                        onClick={() => setProductSort("Price")}
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                      >
                        Sort by price
                      </MenuItem>
                      <MenuItem
                        onClick={() => setProductSort("Top selling")}
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                      >
                        Top selling
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          // getVendorSingleShop(
                          //   Cookies.get("shopId"),
                          //   "lowStock"
                          // );
                          setProductSort("Low stock");
                        }}
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                      >
                        Low stock
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>

              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      display={{ base: "none", xl: "flex" }}
                      bg={batchType ? "#2153CC" : "white"}
                      h="36px"
                      p="10px"
                      borderRadius="4px"
                      border="none"
                      fontWeight="500"
                      _hover={{
                        color: batchType ? "white" : "#2153CC",
                        border: batchType ? "none" : "1px solid #2153CC",
                      }}
                      _focus={{
                        outline: "none",
                        color: batchType ? "white" : "#2153CC",
                        border: batchType ? "none" : "1px solid #2153CC",
                      }}
                    >
                      <chakra.span display="flex" alignItems="center">
                        <chakra.span
                          mr="14px"
                          fontSize="0.875rem"
                          textTransform="capitalize"
                          color={batchType ? "white" : "#242533"}
                        >
                          {batchType
                            ? batchType.split("-").join(" ")
                            : "Batch tools"}
                        </chakra.span>
                        <chakra.span
                          transform={
                            isOpen ? "rotate(180deg)" : "rotate(0deg)"
                          }
                        >
                          <DropDownIcon
                            width={10}
                            height={6}
                            color={batchType ? "white" : "#242533"}
                          />
                        </chakra.span>
                      </chakra.span>
                    </MenuButton>
                    <MenuList
                      p="0"
                      bg="white"
                      boxShadow="-4.8px 9.6px 26.4px rgba(0, 0, 0, 0.03)"
                      borderRadius="6px"
                      minW="108px"
                      w="fit-content"
                    >
                      <MenuItem
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                        onClick={() => {
                          dispatch(setBatchType("checkout"));
                          router.push({
                            ...router,
                            query: { ...router.query, batch: "checkout" },
                          });
                        }}
                      >
                        Checkout
                      </MenuItem>
                      <MenuItem
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                        onClick={() => {
                          dispatch(setBatchType("transfer"));
                          router.push({
                            ...router,
                            query: { ...router.query, batch: "transfer" },
                          });
                        }}
                      >
                        Transfer
                      </MenuItem>
                      <MenuItem
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                        onClick={() => {
                          dispatch(setBatchType("photo"));
                          router.push({
                            ...router,
                            query: { ...router.query, batch: "photo" },
                          });
                        }}
                      >
                        Add photo(s)
                      </MenuItem>
                      <MenuItem
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                        onClick={() => {
                          dispatch(setBatchType("edit-product"));
                          router.push({
                            ...router,
                            query: { ...router.query, batch: "edit-product" },
                          });
                        }}
                      >
                        Edit Product
                      </MenuItem>
                      <MenuItem
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                        onClick={() => {
                          dispatch(setBatchType("delete-product"));
                          router.push({
                            ...router,
                            query: {
                              ...router.query,
                              batch: "delete-product",
                            },
                          });
                        }}
                      >
                        Delete Product
                      </MenuItem>
                      <MenuItem
                        p="10px"
                        fontSize="0.75rem"
                        color="#242533"
                        _hover={{
                          bg: "rgba(33, 83, 204, 0.08)",
                          color: "#2153CC",
                        }}
                        onClick={() => goToImportPage()}
                      >
                        Import Product
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>

              {/* <chakra.div
                  display="flex"
                  alignItems="center"
                  pos={{ base: "absolute", xl: "static" }}
                  right={{ base: "0", xl: "unset" }}
                >
                  <chakra.button
                    bg={view.list ? "#D5E8FF" : "transparent"}
                    borderRadius="2px"
                    border="none"
                    _hover={{ bg: "#D5E8FF" }}
                    _focus={{ outline: "none" }}
                    onClick={() =>
                      setView({
                        grid: false,
                        list: true,
                      })
                    }
                  >
                    <ListIcon />
                  </chakra.button>
                  <chakra.button
                    bg={view.grid ? "#D5E8FF" : "transparent"}
                    borderRadius="2px"
                    border="none"
                    _hover={{ bg: "#D5E8FF" }}
                    _focus={{ outline: "none" }}
                    ml="4px"
                    onClick={() =>
                      setView({
                        grid: true,
                        list: false,
                      })
                    }
                  >
                    <GridIcon />
                  </chakra.button>
                </chakra.div> */}
            </chakra.div>
          </chakra.div>

          {isSearch ? (
            <chakra.div w="40px" m="40px auto">
              <Spinner />
            </chakra.div>
          ) : (
            <chakra.div
              // bg="white"
              // p={{ base: "10px", lg: "24px" }}
              // borderRadius="7.87px"
              mt={{ base: "10px", lg: "20px" }}
            >
              <ProductGridView shopProducts={singleShop?.shopData} />
            </chakra.div>
          )}

          <chakra.div
            pos="fixed"
            right="12px"
            bottom={{ base: "106px", lg: "24px" }}
            display={{ xl: "none" }}
          >
            <Menu>
              <MenuButton
                bg="white"
                h="52px"
                p="14px"
                borderRadius="24px"
                boxShadow="-7.42424px 8.90909px 26.7273px rgba(33, 83, 204, 0.25)"
                border="none"
                fontWeight="500"
                _hover={{ color: "#2153CC" }}
                _focus={{ outline: "none", color: "#2153CC" }}
              >
                <chakra.span display="flex" alignItems="center">
                  <chakra.span
                    mr="14px"
                    fontSize="0.875rem"
                    textTransform="capitalize"
                    color="#2153CC"
                  >
                    {batchType
                      ? batchType.split("-").join(" ")
                      : "Batch tools"}
                  </chakra.span>
                </chakra.span>
              </MenuButton>
              <MenuList
                p="0"
                bg="white"
                boxShadow="-4.8px 9.6px 26.4px rgba(0, 0, 0, 0.03)"
                borderRadius="6px"
                minW="108px"
                w="fit-content"
              >
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                  onClick={() => {
                    dispatch(setBatchType("checkout"));
                    router.push({
                      ...router,
                      query: { ...router.query, batch: "checkout" },
                    });
                  }}
                >
                  Checkout
                </MenuItem>
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                  onClick={() => {
                    dispatch(setBatchType("transfer"))
                    router.push({
                      ...router,
                      query: { ...router.query, batch: "transfer" },
                    });
                  }}
                >
                  Transfer
                </MenuItem>
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                  onClick={() => {
                    dispatch(setBatchType("photo"));
                    router.push({
                      ...router,
                      query: { ...router.query, batch: "photo" },
                    });
                  }}
                >
                  Add photo(s)
                </MenuItem>
                {/* <MenuItem
                    p="10px"
                    fontSize="0.75rem"
                    color="#242533"
                    _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                    onClick={() => {
                      setBatchType("stock-in");
                      router.push({
                        ...router,
                        query: { ...router.query, batch: "stock-in" },
                      });
                    }}
                  >
                    Stock In
                  </MenuItem> */}
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                  onClick={() => {
                    dispatch(setBatchType("edit-product"));
                    router.push({
                      ...router,
                      query: { ...router.query, batch: "edit-product" },
                    });
                  }}
                >
                  Edit Product
                </MenuItem>
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                  onClick={() => {
                    dispatch(setBatchType("delete-product"));
                    router.push({
                      ...router,
                      query: { ...router.query, batch: "delete-product" },
                    });
                  }}
                >
                  Delete Product
                </MenuItem>
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{
                    bg: "rgba(33, 83, 204, 0.08)",
                    color: "#2153CC",
                  }}
                  onClick={() => goToImportPage()}
                >
                  Import Product
                </MenuItem>
              </MenuList>
            </Menu>
          </chakra.div>
        </>
      )}
    </VendorDashBoardLayout>
  );
};

export default Product;
