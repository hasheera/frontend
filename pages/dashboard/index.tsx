import { chakra, Spinner, useDisclosure } from '@chakra-ui/react'
import CreateShop from '@components/Modals/CreateShop'
import VendorNavbarHeader from '@components/Navbar/VendorNavbarHeader'
import { useAppDispatch, useAppSelector } from 'hooks'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getDashboardData } from 'store/slices/dashboard'
import { shopsData } from 'store/slices/shops'

const Home: NextPage = () => {
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (singleShop.loaded && singleShop.selectedShop) {
      // router.replace(`/dashboard/${singleShop.selectedShop.shop.name.split(" ").join("-").toLowerCase()}-${singleShop.selectedShop.shop_id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop])

  const { vendorShops } = useAppSelector(shopsData);
  const createShopModal = useDisclosure();

  return (
    <>
      <VendorNavbarHeader />

      <chakra.h1 fontSize="1.25rem" textAlign="center" mt="20px" fontWeight="700">All your shops</chakra.h1>
      <chakra.div p="20px">
        {!vendorShops.loaded ? (
          <Spinner color="current" />
        ) : (
          <chakra.div
            display="flex"
            justifyContent="center"
            gap="24px"
            flexWrap="wrap"
            maxW="640px"
            margin="40px auto"
            border="1px solid #eee"
            borderRadius="15px"
            p="20px"
          >
            {vendorShops.shops.map(({ id, shop }) => (
              <Link href={`/dashboard/${shop.name.split(" ").join("-")}-${shop.id}`} key={id} passHref>
                <chakra.a
                  p="12px"
                  border="1px solid #eee"
                  w="180px"
                  borderRadius="15px"
                  _hover={{ borderColor: "#1739E8" }}
                >
                  <Image src={shop.logo} width={100} height={100} alt="Shop" />
                  <chakra.div mt="8px">
                    <chakra.h6 fontWeight="600" fontSize="1rem">{shop.name}</chakra.h6>
                    <chakra.p fontSize="0.875rem" color="#888">{`${shop.city.name}, ${shop.state.name}`}</chakra.p>
                  </chakra.div>
                </chakra.a>
              </Link>
            ))}
            <chakra.button
              onClick={() => createShopModal.onOpen()}
              bg="#1739E8"
              borderRadius="12px"
              h="48px"
              cursor="pointer"
              color="white"
              fontWeight="500"
              padding="0 24px"
              w="full"
            >
              Create shop
            </chakra.button>
          </chakra.div>
        )}
      </chakra.div>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CreateShop {...createShopModal} />
    </>
  )
}

export default Home
