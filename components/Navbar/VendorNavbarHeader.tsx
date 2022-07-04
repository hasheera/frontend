/* eslint-disable camelcase */
import { chakra, Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
// import { ShopContext } from "@providers/shopProvider";
import Cookies from "js-cookie";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  // TransferIcon,
  LogOutIcon,
  CartIcon,
  DropDownIcon,
} from "public/assets";
import { useContext, useEffect, useState } from "react";
import { logout } from "@utils/helpers";
import { userData } from "store/slices/user";
import { cartsData, getOpenCart, setOpenCart } from "store/slices/carts";
import { useDispatch , useSelector } from "react-redux";

const VendorNavbarHeader = () => {
  const [otherShops, setOtherShops] = useState([]);
  // const { allVendorShops, vendorSingleShop, batchType, transferItems } =
  //   useContext(ShopContext);
  const { user } = useSelector(userData)
  const { carts } = useSelector(cartsData)
  const dispatch = useDispatch()
  const router = useRouter();

  // useEffect(() => {
  //   if (allVendorShops.loaded && vendorSingleShop.loaded) {
  //     const filtered = allVendorShops.data.filter(
  //       (shop: { shop_id: number }) =>
  //         shop.shop_id !== vendorSingleShop.selected.shop_id
  //     );
  //     setOtherShops(filtered);
  //   }
  // }, [allVendorShops, vendorSingleShop]);
  

  const handleShopClick = (id, name) => {
    const path = router.pathname.split("/").slice(0, -1).join("/");
    router.push(`${path}/${name.split(" ").join("-").toLowerCase()}-${id}`);
  };

  const goToDashboard = () => {
    router.push("/vendor/addshop");
  };

  return (
    <chakra.div
      h={{ base: "60px", lg: "72px" }}
      pos="sticky"
      top="0"
      w="100%"
      bg="white"
      zIndex="1"
      display="flex"
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      borderBottom="1px solid rgba(0, 0, 0, 0.03)"
      px={{ base: "16px", xl: "48px" }}
    >
      {/* <NextLink href="/" passHref>
        <chakra.div display={{ lg: "none" }}>
          <Image src="/assets/image/logo.png" alt="" width={122} height={22} />
        </chakra.div>
      </NextLink> */}
      <chakra.div display={{ base: "block", lg: "none" }}>
        <Menu>
          <MenuButton ml={{ base: "18px", lg: "32px" }}>
            {/* <ShopIcon width={24} height={24} color="#2153CC" /> */}
            {/* <chakra.p fontSize="20px" fontWeight="600" color="#2153CC">
              {vendorSingleShop.selected?.shop.name.length >= 10
                ? `${vendorSingleShop.selected?.shop.name.substring(0, 7)}...`
                : vendorSingleShop.selected?.shop.name}
            </chakra.p> */}Hi
          </MenuButton>
          {/* {allVendorShops.loaded && ( */}
            <MenuList
              h="100%"
              zIndex="1"
              maxH="500px"
              w={`${window.innerWidth}px`}
              overflowY="scroll"
            >
              <chakra.div display="flex" justifyContent="center" alignItems="center">
                <chakra.p fontSize="15px" fontWeight="500" color="#2153CC">
                  List of my shops
                </chakra.p>
              </chakra.div>
              {otherShops.map(({ shop: { id, shop_id, logo, name } }) => (
                <MenuItem key={id} p="0" _hover={{ bg: "transparent" }}>
                  <chakra.div
                    _hover={{ bg: "rgba(33, 83, 204, 0.04)" }}
                    role="group"
                    p="13px"
                    cursor="pointer"
                    w="full"
                    onClick={() => handleShopClick(id, name)}
                  >
                    <chakra.div display="flex" alignItems="center">
                      <chakra.div
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="46px"
                        h="46px"
                        borderRadius="100%"
                        bg="white"
                        border="0.1px solid #757575"
                      >
                        <Image src={logo} alt="" width={28} height={28} />
                      </chakra.div>
                      <chakra.div
                        display="flex"
                        flexDir="column"
                        ml="20px"
                        alignItems="flex-start"
                      >
                        <chakra.span
                          color="rgba(27, 27, 27, 0.54)"
                          fontWeight="600"
                          fontSize="0.75rem"
                          _groupHover={{ color: "#2153CC" }}
                        >
                          {name}
                        </chakra.span>
                        <chakra.span
                          color="rgba(27, 27, 27, 0.54)"
                          fontWeight="400"
                          fontSize="0.625rem"
                          _groupHover={{ color: "#2153CC" }}
                        >
                          {shop_id}
                        </chakra.span>
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => goToDashboard()}
                display="flex"
                justifyContent="center"
                // alignItems="center"
              >
                <chakra.button
                  w="380px"
                  h="54px"
                  color="#fff"
                  borderRadius="8px"
                  bg="#2153CC"
                >
                  <chakra.p fontWeight="600" fontSize="18.86px" color="#fff">
                    Create a Free Shop
                  </chakra.p>
                </chakra.button>
              </MenuItem>
              <MenuItem display="flex" justifyContent="center" alignItems="center">
                <chakra.p
                  fontSize="12.06px"
                  fontWeight="500"
                  textDecoration="underline"
                  color="#2153CC"
                >
                  Learn more on becoming a vendor
                </chakra.p>
              </MenuItem>
            </MenuList>
          {/* )} */}
        </Menu>
      </chakra.div>

      <chakra.div display="flex" alignItems="center">
        <chakra.div>
          {/* {batchType === "checkout" && ( */}
            <chakra.button
              // onClick={() =>
              //   router.push(
              //     `/vendor/cart/${vendorSingleShop.selected?.shop.name
              //       .split(" ")
              //       .join("-")
              //       .toLowerCase()}-${vendorSingleShop.selected?.shop_id}`
              //   )
              // }
              display="flex"
              alignItems="center"
              pos="relative"
            >
              {/* <CartRecIcon width={24} height={24} color="#2153CC" /> */}
              {carts && carts[0]?.cart_items.length > 0 ? (
                <chakra.div
                  w="18px"
                  h="18px"
                  bg="#FB7181"
                  pos="absolute"
                  top="-5px"
                  right="-5px"
                  borderRadius="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="2px solid #fff"
                >
                  <chakra.p color="#FFFFFF" fontWeight="700" fontSize="10px">
                    {carts[0].cart_items.length}
                  </chakra.p>
                </chakra.div>
              ) : (
                ""
              )}

              <CartIcon width={25} height={25} />
            </chakra.button>
          {/* )} */}

          {/* {batchType === "transfer" && (
            <chakra.button
              onClick={() => false}
              display="flex"
              alignItems="center"
              pos="relative"
            >
              {transferItems ? (
                <chakra.div
                  w="18px"
                  h="18px"
                  bg="#FB7181"
                  pos="absolute"
                  top="-5px"
                  right="-5px"
                  borderRadius="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="2px solid #fff"
                >
                  <chakra.p color="#FFFFFF" fontWeight="700" fontSize="10px">
                    {transferItems}
                  </chakra.p>
                </chakra.div>
              ) : (
                ""
              )}

              <TransferIcon width={24} height={24} color="#2153CC" />
            </chakra.button>
          )} */}
        </chakra.div>

        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton ml={{ base: "18px", lg: "32px" }}>
                <chakra.span display="flex" alignItems="center">
                  <Avatar
                    w={{ base: "30px", lg: "34px" }}
                    h={{ base: "30px", lg: "34px" }}
                    name={
                      user?.user.first_name
                        ? `${user.user.first_name} ${user.user.surname}`
                        : `${user?.user.username}`
                    }
                    src={user?.user.image ? user.user.image : ""}
                  />

                  <chakra.span
                    mx="10px"
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                  >
                    <DropDownIcon width={10} height={6} color="#242533" />
                  </chakra.span>
                </chakra.span>
              </MenuButton>
              <MenuList h="100%" maxH="500px" overflowY="scroll">
                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#242533"
                  _hover={{ bg: "rgba(33, 83, 204, 0.08)", color: "#2153CC" }}
                >
                  Notifications
                </MenuItem>
                <NextLink href="/" passHref>
                  <MenuItem color="#2153CC">
                    <chakra.p fontWeight="500" fontSize="15px">
                      Back to Home
                    </chakra.p>
                  </MenuItem>
                </NextLink>

                <MenuItem
                  p="10px"
                  fontSize="0.75rem"
                  color="#F03D3E"
                  onClick={() => logout()}
                >
                  <LogOutIcon />
                  <chakra.p ml="10px" fontWeight="500">
                    Logout
                  </chakra.p>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </chakra.div>
    </chakra.div>
  );
};

export default VendorNavbarHeader;