import { chakra } from '@chakra-ui/react'
import DesktopView from '@components/Dashboard/Desktop'
import MobileView from '@components/Dashboard/Mobile'
import VendorDashBoardLayout from '@components/Layout/VendorDashBoardLayout'
import { useAppDispatch, useAppSelector } from 'hooks'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { dashboardData, getDashboardData } from 'store/slices/dashboard'
import { getSingleShop, getTopSellingData, setSingleShop, shopsData } from 'store/slices/shops'

const VendorDashboard: NextPage = () => {
  const { dashboard } = useAppSelector(dashboardData);
  const { singleShop, vendorShops, topSellingData } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const querySplit = (router.query.singleShop as string).split("-");
      const shopId = querySplit[querySplit.length - 1];

      if (vendorShops.shops?.length && !singleShop.loaded) {
        const selected = vendorShops.shops?.find((shop: { shop_id: number }) => shop.shop_id === Number(shopId));
        dispatch<any>(getSingleShop(shopId));
        dispatch<any>(setSingleShop(selected));
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, vendorShops]);

  useEffect(() => {
    if (singleShop.loaded && singleShop.selectedShop) {
      const a = { id: singleShop.selectedShop.shop_id }
      if (!dashboard.loaded) dispatch<any>(getDashboardData(a))
      if (!topSellingData.loaded) dispatch<any>(getTopSellingData(singleShop.selectedShop.shop_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop])

  return (
    <>
      <Head>
        <title>Vendor Overview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VendorDashBoardLayout>
        <chakra.div display={{ base: "none", xl: "block" }}>
          <DesktopView />
        </chakra.div>
        <chakra.div display={{ base: "block", xl: "none" }}>
          <MobileView />
        </chakra.div>
      </VendorDashBoardLayout>
    </>
  )
}

export default VendorDashboard
