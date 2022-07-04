import { chakra } from "@chakra-ui/react";
import Link from 'next/link';
import { useRouter } from "next/dist/client/router";

const SettingsNav = () => {
  const router = useRouter();

  return (
    <chakra.nav borderBottom="1px solid #EEE" pb="8px">
      <Link href={`/vendor/settings/${router.query?.singleShop}/info`} passHref>
        <chakra.a pb="8px" _hover={{ color: '#1739E8', borderBottom: "4px solid #1739E8" }} fontWeight="500" color={router.pathname === `/vendor/settings/[singleShop]/info` && '#1739E8'} px="24px" borderBottom={router.pathname === `/vendor/settings/[singleShop]/info` && "4px solid #1739E8"}>Info</chakra.a>
      </Link>
      <Link href={`/vendor/settings/${router.query?.singleShop}/team`} passHref>
        <chakra.a pb="8px" _hover={{ color: '#1739E8', borderBottom: "4px solid #1739E8" }} fontWeight="500" color={router.pathname === `/vendor/settings/[singleShop]/team` && '#1739E8'} px="24px" borderBottom={router.pathname === `/vendor/settings/[singleShop]/team` && "4px solid #1739E8"}>Team</chakra.a>
      </Link>
      <Link href={`/vendor/settings/${router.query?.singleShop}/addresses`} passHref>
        <chakra.a pb="8px" _hover={{ color: '#1739E8', borderBottom: "4px solid #1739E8" }} fontWeight="500" color={router.pathname === `/vendor/settings/[singleShop]/addresses` && '#1739E8'} px="24px" borderBottom={router.pathname === `/vendor/settings/[singleShop]/addresses` && "4px solid #1739E8"}>Addresses</chakra.a>
      </Link>
    </chakra.nav>
  )
}

export default SettingsNav
