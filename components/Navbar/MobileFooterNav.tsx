import { chakra, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
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
  WalletIcon
} from "public/assets";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shopsData } from "store/slices/shops";
import { useAppSelector } from "hooks";

const MobileFooterNav = () => {
  const { singleShop } = useAppSelector(shopsData);
  const [activeLink, setActiveLink] = useState({
    overview: false,
    products: false,
    add: false,
    orders: false,
    more: false,
  })
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("dashboard")) {
      return setActiveLink({
        ...activeLink,
        overview: true
      })
    }
    if (router.pathname.includes("products")) {
      return setActiveLink({
        ...activeLink,
        products: true
      })
    }
    if (router.pathname.includes("import")) {
      return setActiveLink({
        ...activeLink,
        add: true
      })
    }
    if (router.pathname.includes("transactions")) {
      return setActiveLink({
        ...activeLink,
        orders: true
      })
    }
    if (router.pathname.includes("transactions")) {
      return setActiveLink({
        ...activeLink,
        orders: true
      })
    }
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <chakra.div
      display={{ base: "flex", lg: "none" }}
      alignItems="center"
      justifyContent="space-between"
      pos="fixed"
      right="0"
      bottom="0"
      left="0"
      bg="white"
      w="100%"
      p="18px 20px"
      boxShadow="0px -3.88328px 17.4748px rgba(0, 0, 0, 0.07)"
      zIndex="1"
    >
      <Link href={singleShop.loaded ?
        `/dashboard/${singleShop.selectedShop?.shop.name.split(' ').join('-').toLowerCase()}-${singleShop.selectedShop?.shop_id}`
        : ""} passHref>
        <chakra.a
          fontSize="0.75rem"
          lineHeight="18px"
          display="flex"
          flexDir="column"
          alignItems="center"
          color={activeLink.overview ? "#2153CC" : "#0C0C0C"}
        >
          <chakra.span mb="4px">
            <DashOverviewIcon
              width={20}
              height={20}
              color={activeLink.overview ? "#2153CC" : "#A3AED0"}
              active={false}
            />
          </chakra.span>
          Overview
        </chakra.a>
      </Link>

      <Link href={singleShop.loaded ?
        `/products/${singleShop.selectedShop?.shop.name.split(' ').join('-').toLowerCase()}-${singleShop.selectedShop?.shop_id}`
        : ""} passHref>
        <chakra.a
          fontSize="0.75rem"
          lineHeight="18px"
          display="flex"
          flexDir="column"
          alignItems="center"
          color={activeLink.products ? "#2153CC" : "#0C0C0C"}
        >
          <chakra.span mb="4px">
            <DashProductsIcon
              width={20}
              height={20}
              color={activeLink.products ? "#2153CC" : "#A3AED0"}
              active={false}
            />
          </chakra.span>
          Products
        </chakra.a>
      </Link>

      <Link href={singleShop.loaded ?
        `/import/${singleShop.selectedShop?.shop.name.split(' ').join('-').toLowerCase()}-${singleShop.selectedShop?.shop_id}`
        : ""} passHref>
        <chakra.a
          fontSize="0.75rem"
          lineHeight="18px"
          display="flex"
          flexDir="column"
          alignItems="center"
          color={activeLink.add ? "#2153CC" : "#0C0C0C"}
        >
          <chakra.span mb="4px">
            <DashAddProductsIcon
              width={20}
              height={20}
              color={activeLink.add ? "#2153CC" : "#A3AED0"}
              active={false}
            />
          </chakra.span>
          New
        </chakra.a>
      </Link>

      <Link href={singleShop.loaded ?
        `/transactions/${singleShop.selectedShop?.shop.name.split(' ').join('-').toLowerCase()}-${singleShop.selectedShop?.shop_id}`
        : ""} passHref>
        <chakra.a
          fontSize="0.75rem"
          lineHeight="18px"
          display="flex"
          flexDir="column"
          alignItems="center"
          color={activeLink.orders ? "#2153CC" : "#0C0C0C"}
        >
          <chakra.span mb="4px">
            <DashLedgerIcon
              width={20}
              height={20}
              color={activeLink.orders ? "#2153CC" : "#A3AED0"}
              active={false}
            />
          </chakra.span>
          Orders
        </chakra.a>
      </Link>

      <Menu>
        <MenuButton
          fontSize="0.75rem"
          lineHeight="18px"
          color={activeLink.more ? "#2153CC" : "#0C0C0C"}
        >
          <chakra.span
            display="flex"
            flexDir="column"
            alignItems="center"
            mb="4px"
            css={{
              "& svg": {
                margin: "4px 0"
              }
            }}
          >
            <DashMoreIcon
              width={20}
              height={20}
              color={activeLink.more ? "#2153CC" : "#A3AED0"}
              active={false}
            />
            More
          </chakra.span>
        </MenuButton>
        <MenuList
          bg="white"
          boxShadow="0px 4px 24px rgba(0, 0, 0, 0.04)"
          borderRadius="12px"
          w="235px"
        >
          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            <Link href={singleShop.loaded ?
              `/customers/${singleShop.selectedShop?.shop.name.split(' ').join('-').toLowerCase()}-${singleShop.selectedShop?.shop_id}`
              : ""} passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            <Link href={singleShop.loaded ?
              `/team/${singleShop.selectedShop?.shop.name.split(' ').join('-').toLowerCase()}-${singleShop.selectedShop?.shop_id}`
              : ""} passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link href="#" passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link href="#" passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link href="#" passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            <Link href={
              singleShop.loaded
                ? `/settings/${singleShop.selectedShop?.shop.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}-${singleShop.selectedShop?.shop_id
                }`
                : ""
            } passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            <Link href="/help" passHref>
              <chakra.a
                w="full"
                display="flex"
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

          <MenuItem
            h="45px"
            px="15px"
            _hover={{ bg: "#F7F8FA" }}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link href="#" passHref>
              <chakra.a
                w="full"
                display="flex"
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
      </Menu>
    </chakra.div>
  );
};

export default MobileFooterNav;
