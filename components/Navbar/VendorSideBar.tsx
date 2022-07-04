import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import CreateShop from "@components/Modals/CreateShop";
import { ShopContext } from "@providers/shopProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CardIcon,
  CautionIcon,
  DashAddProductsIcon,
  DashLedgerIcon,
  DashMoreIcon,
  DashOverviewIcon,
  DashProductsIcon,
  GearIcon,
  GraphIcon,
  SpeakerIcon,
  TeamIcon,
  UserIcon,
  WalletIcon,
} from "public/assets";
import { useContext, useEffect, useState } from "react";

const VendorSideBar = () => {
  const createShopModal = useDisclosure();
  const { allVendorShops, vendorSingleShop } = useContext(ShopContext);
  const [otherShops, setOtherShops] = useState([]);
  const [activeLink, setActiveLink] = useState({
    overview: false,
    products: false,
    add: false,
    orders: false,
    more: false,
  });
  const router = useRouter();
  const moreRoutes = [
    "/vendor/customers/[singleShop]",
    "/vendor/team/[singleShop]",
  ];

  useEffect(() => {
    if (allVendorShops.loaded && vendorSingleShop.loaded) {
      const filtered = allVendorShops.data.filter(
        (shop: { shop_id: number }) =>
          shop.shop_id !== vendorSingleShop.selected.shop_id
      );
      setOtherShops(filtered);
    }
  }, [allVendorShops, vendorSingleShop]);

  useEffect(() => {
    if (router.pathname.includes("dashboard")) {
      return setActiveLink({
        ...activeLink,
        overview: true,
      });
    }
    if (router.pathname.includes("products")) {
      return setActiveLink({
        ...activeLink,
        products: true,
      });
    }
    if (router.pathname.includes("import")) {
      return setActiveLink({
        ...activeLink,
        add: true,
      });
    }
    if (router.pathname.includes("transactions")) {
      return setActiveLink({
        ...activeLink,
        orders: true,
      });
    }
    if (moreRoutes.includes(router.pathname)) {
      return setActiveLink({
        ...activeLink,
        more: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleHover = (link: string, state: boolean) => {
    setActiveLink({
      ...activeLink,
      [link]: state,
    });
  };

  const handleShopClick = (id, name) => {
    const path = router.pathname.split("/").slice(0, -1).join("/");
    router.push(`${path}/${name.split(" ").join("-").toLowerCase()}-${id}`);
  };

  return (
    <chakra.div
      d={{ base: "none", lg: "block" }}
      pos="fixed"
      left={0}
      top={0}
      bottom={0}
      width="278px"
      bg="white"
      boxShadow="0px -6px 28px rgba(0, 0, 0, 0.02)"
      px="56px"
      pt="32px"
      zIndex={1}
    >
      <Link href="/" passHref>
        <chakra.a>
          <Image
            src="/assets/image/logo.png"
            alt=""
            width={152}
            height={27.49}
          />
        </chakra.a>
      </Link>
      <chakra.div mt="68px">
        <Link
          href={
            vendorSingleShop.loaded
              ? `/vendor/dashboard/${vendorSingleShop.selected?.shop.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}-${vendorSingleShop.selected?.shop_id}`
              : ""
          }
          passHref
        >
          <chakra.a
            d="flex"
            alignItems="center"
            p="10px"
            borderRadius="5px"
            fontSize="1rem"
            fontWeight={activeLink.overview ? "600" : "500"}
            bg={activeLink.overview ? "#2153CC" : "transparent"}
            color={activeLink.overview ? "white" : "#A3AED0"}
            _hover={{ color: "white", bg: "#2153CC", fontWeight: "600" }}
            onMouseOver={() =>
              router.pathname.includes("dashboard")
                ? false
                : handleHover("overview", true)
            }
            onMouseOut={() =>
              router.pathname.includes("dashboard")
                ? false
                : handleHover("overview", false)
            }
          >
            <chakra.span mr="14px">
              <DashOverviewIcon
                width={24}
                height={24}
                active={activeLink.overview}
              />
            </chakra.span>
            Overview
          </chakra.a>
        </Link>

        <Link
          href={
            vendorSingleShop.loaded
              ? `/vendor/products/${vendorSingleShop.selected?.shop.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}-${vendorSingleShop.selected?.shop_id}`
              : ""
          }
          passHref
        >
          <chakra.a
            mt="22px"
            d="flex"
            alignItems="center"
            p="10px"
            borderRadius="5px"
            fontWeight={activeLink.products ? "600" : "500"}
            bg={activeLink.products ? "#2153CC" : "transparent"}
            color={activeLink.products ? "white" : "#A3AED0"}
            _hover={{ color: "white", bg: "#2153CC", fontWeight: "600" }}
            onMouseOver={() =>
              router.pathname.includes("products")
                ? false
                : handleHover("products", true)
            }
            onMouseOut={() =>
              router.pathname.includes("products")
                ? false
                : handleHover("products", false)
            }
          >
            <chakra.span mr="14px">
              <DashProductsIcon
                width={24}
                height={24}
                active={activeLink.products}
              />
            </chakra.span>
            Products
          </chakra.a>
        </Link>

        <Link
          href={
            vendorSingleShop.loaded
              ? `/vendor/import/${vendorSingleShop.selected?.shop.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}-${vendorSingleShop.selected?.shop_id}`
              : ""
          }
          passHref
        >
          <chakra.a
            mt="22px"
            d="flex"
            alignItems="center"
            p="10px"
            borderRadius="5px"
            fontWeight={activeLink.add ? "600" : "500"}
            bg={activeLink.add ? "#2153CC" : "transparent"}
            color={activeLink.add ? "white" : "#A3AED0"}
            _hover={{ color: "white", bg: "#2153CC", fontWeight: "600" }}
            onMouseOver={() =>
              router.pathname.includes("import")
                ? false
                : handleHover("add", true)
            }
            onMouseOut={() =>
              router.pathname.includes("import")
                ? false
                : handleHover("add", false)
            }
          >
            <chakra.span mr="14px">
              <DashAddProductsIcon
                width={24}
                height={24}
                active={activeLink.add}
              />
            </chakra.span>
            Add Product
          </chakra.a>
        </Link>

        <Link
          href={
            vendorSingleShop.loaded
              ? `/vendor/transactions/${vendorSingleShop.selected?.shop.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}-${vendorSingleShop.selected?.shop_id}`
              : ""
          }
          passHref
        >
          <chakra.a
            mt="22px"
            d="flex"
            alignItems="center"
            p="10px"
            borderRadius="5px"
            fontWeight={activeLink.orders ? "600" : "500"}
            bg={activeLink.orders ? "#2153CC" : "transparent"}
            color={activeLink.orders ? "white" : "#A3AED0"}
            _hover={{ color: "white", bg: "#2153CC", fontWeight: "600" }}
            onMouseOver={() =>
              router.pathname.includes("transactions")
                ? false
                : handleHover("orders", true)
            }
            onMouseOut={() =>
              router.pathname.includes("transactions")
                ? false
                : handleHover("orders", false)
            }
          >
            <chakra.span mr="14px">
              <DashLedgerIcon
                width={24}
                height={24}
                active={activeLink.orders}
              />
            </chakra.span>
            Orders
          </chakra.a>
        </Link>

        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                mt="22px"
                w="full"
                css={{
                  span: {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                p="10px"
                borderRadius="5px"
                fontWeight={activeLink.more || isOpen ? "600" : "500"}
                bg={activeLink.more || isOpen ? "#2153CC" : "transparent"}
                color={activeLink.more || isOpen ? "white" : "#A3AED0"}
                _hover={{ color: "white", bg: "#2153CC", fontWeight: "600" }}
                onMouseOver={() =>
                  router.pathname.includes("settings")
                    ? false
                    : handleHover("more", true)
                }
                onMouseOut={() =>
                  router.pathname.includes("settings")
                    ? false
                    : handleHover("more", false)
                }
              >
                <chakra.span mr="14px">
                  <DashMoreIcon
                    width={24}
                    height={24}
                    active={activeLink.more || isOpen}
                  />
                </chakra.span>
                More
              </MenuButton>
              <MenuList
                bg="white"
                boxShadow="0px 4px 24px rgba(0, 0, 0, 0.04)"
                borderRadius="12px"
                w="235px"
              >
                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link
                    href={
                      vendorSingleShop.loaded
                        ? `/vendor/customers/${vendorSingleShop.selected?.shop.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}-${
                            vendorSingleShop.selected?.shop_id
                          }`
                        : ""
                    }
                    passHref
                  >
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <UserIcon />
                      </chakra.span>
                      Customers
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link
                    href={
                      vendorSingleShop.loaded
                        ? `/vendor/team/${vendorSingleShop.selected?.shop.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}-${
                            vendorSingleShop.selected?.shop_id
                          }`
                        : ""
                    }
                    passHref
                  >
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <TeamIcon />
                      </chakra.span>
                      Team
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link href="#" passHref>
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <WalletIcon />
                      </chakra.span>
                      Balance
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link href="#" passHref>
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <CardIcon />
                      </chakra.span>
                      Billing
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link href="#" passHref>
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <SpeakerIcon />
                      </chakra.span>
                      Marketing
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link
                    href={
                      vendorSingleShop.loaded
                        ? `/vendor/settings/${vendorSingleShop.selected?.shop.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}-${
                            vendorSingleShop.selected?.shop_id
                          }`
                        : ""
                    }
                    passHref
                  >
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <GearIcon />
                      </chakra.span>
                      Settings
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link href="/vendor/help" passHref>
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <CautionIcon />
                      </chakra.span>
                      Help Center
                    </chakra.a>
                  </Link>
                </MenuItem>

                <MenuItem h="45px" px="15px" _hover={{ bg: "#F7F8FA" }}>
                  <Link href="#" passHref>
                    <chakra.a
                      w="full"
                      d="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontWeight="500"
                      color="#757575"
                      _hover={{ color: "#757575" }}
                    >
                      <chakra.span mr="16px">
                        <GraphIcon />
                      </chakra.span>
                      Algorithm
                    </chakra.a>
                  </Link>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>

        {vendorSingleShop.loaded && (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  pos="absolute"
                  right="32px"
                  left="32px"
                  bottom="20px"
                  p="6px 12px 6px 6px"
                  borderRadius="5px"
                  bg="#F7F8FA"
                  w="210px"
                >
                  <chakra.div
                    d="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <chakra.div d="flex" alignItems="center">
                      <chakra.div
                        d="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="46px"
                        h="46px"
                        borderRadius="100%"
                        bg="white"
                      >
                        <Image
                          src={vendorSingleShop.selected?.shop.logo}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </chakra.div>
                      <chakra.div
                        d="flex"
                        flexDir="column"
                        ml="10px"
                        alignItems="flex-start"
                      >
                        <chakra.span
                          color="#2153CC"
                          fontWeight="500"
                          fontSize="0.75rem"
                        >
                          {vendorSingleShop.selected?.shop.name}
                        </chakra.span>
                        <chakra.span
                          color="rgba(27, 27, 27, 0.54)"
                          fontWeight="500"
                          fontSize="0.75rem"
                        >
                          {vendorSingleShop.selected?.shop.shop_id}
                        </chakra.span>
                      </chakra.div>
                    </chakra.div>

                    <chakra.svg
                      transform={isOpen ? "rotate(180deg)" : ""}
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1328 9.9707L8.26708 7.10497L5.40135 9.9707"
                        stroke="#2153CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </chakra.svg>
                  </chakra.div>
                </MenuButton>

                {allVendorShops.loaded && (
                  <MenuList
                    bg="white"
                    boxShadow="0px 3.66153px 21.9692px rgba(0, 0, 0, 0.04)"
                    borderRadius="10px"
                    w="282px"
                    h="372px"
                    pos="relative"
                  >
                    <chakra.div h="242px" overflowY="scroll">
                      {otherShops.map(
                        ({ shop: { id, shop_id, logo, name } }) => (
                          <MenuItem
                            key={id}
                            p="0"
                            _hover={{ bg: "transparent" }}
                          >
                            <chakra.div
                              _hover={{ bg: "rgba(33, 83, 204, 0.04)" }}
                              role="group"
                              p="13px"
                              cursor="pointer"
                              w="full"
                              onClick={() => handleShopClick(id, name)}
                            >
                              <chakra.div d="flex" alignItems="center">
                                <chakra.div
                                  d="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  w="46px"
                                  h="46px"
                                  borderRadius="100%"
                                  bg="white"
                                  border="0.1px solid #757575"
                                >
                                  <Image
                                    src={logo}
                                    alt=""
                                    width={28}
                                    height={28}
                                  />
                                </chakra.div>
                                <chakra.div
                                  d="flex"
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
                        )
                      )}
                    </chakra.div>
                    <chakra.div
                      pos="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      w="280px"
                    >
                      <Link href="/" passHref>
                        <chakra.a
                          p="18px"
                          textAlign="center"
                          color="#2153CC"
                          fontSize="0.625rem"
                          textDecor="underline"
                          d="inline-block"
                          bg="white"
                          w="280px"
                          _hover={{ color: "#2153CC", textDecor: "underline" }}
                        >
                          Learn more on becoming a vendor
                        </chakra.a>
                      </Link>
                      <chakra.div
                        p="18px"
                        w="280px"
                        borderTop="0.5px solid #A3AED0"
                      >
                        {/* <Link href="/vendor/addshop" passHref> */}
                        <chakra.a
                          onClick={() => createShopModal.onOpen()}
                          textAlign="center"
                          color="white"
                          fontSize="0.75rem"
                          fontWeight="500"
                          borderRadius="28px"
                          mx="auto"
                          w="176px"
                          h="36px"
                          d="flex"
                          alignItems="center"
                          justifyContent="center"
                          bg="#2153CC"
                          _hover={{ color: "white" }}
                        >
                          <chakra.svg
                            mr="4px"
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_18374_268437)">
                              <path
                                d="M18.1552 11.9451H12.6629V17.4374H10.8321V11.9451H5.33984V10.1144H10.8321V4.62207H12.6629V10.1144H18.1552V11.9451Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_18374_268437">
                                <rect
                                  width="21.9692"
                                  height="21.9692"
                                  fill="white"
                                  transform="translate(0.762695 0.0439453)"
                                />
                              </clipPath>
                            </defs>
                          </chakra.svg>
                          Create a Free Shop
                        </chakra.a>
                        {/* </Link> */}
                      </chakra.div>
                    </chakra.div>
                  </MenuList>
                )}
              </>
            )}
          </Menu>
        )}
      </chakra.div>
      <CreateShop {...createShopModal} />
    </chakra.div>
  );
};

export default VendorSideBar;