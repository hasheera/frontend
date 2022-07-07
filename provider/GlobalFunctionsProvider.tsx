/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { createContext, ReactElement, useEffect, useState } from "react";
import { getOpenCart } from "store/slices/carts";
import { dashboardData, getDashboardData } from "store/slices/dashboard";
import { getSingleShop, getTopSellingData, getVendorShops, setSingleShop, setTopSellingData, shopsData } from "store/slices/shops";
import { getUser, userData } from "store/slices/user";

interface GlobalFunctionsProps {
  loading: boolean,
  setLoading: (a: boolean) => void;
}

const GlobalFunctionsContext = createContext<Partial<GlobalFunctionsProps>>({});

const GlobalFunctionsProvider = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { userLoaded } = useAppSelector(userData)
  const { dashboard } = useAppSelector(dashboardData)
  const { vendorShops, singleShop } = useAppSelector(shopsData)
  const router = useRouter()

  useEffect(() => {
    if (!userLoaded) dispatch<any>(getUser())
    if (!vendorShops.loaded) dispatch<any>(getVendorShops())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (vendorShops.shops && vendorShops.shops.length) {
      if (!singleShop.loaded && !router.query.singleShop) {
        const selected = vendorShops.shops[0]
        dispatch<any>(getSingleShop(selected.id))
        dispatch<any>(setSingleShop(selected))
        // Cookies.set("shop", selected.shop.name.split(" ").join("-").toLowerCase())
        // Cookies.set("alphaShopId", selected.shop.shop_id);
        // Cookies.set("shopId", selected.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorShops.shops])

  useEffect(() => {
    if (router.query.singleShop && vendorShops.shops?.length) {
      const querySplit = (router.query.singleShop as string).split("-");
      const shopId = querySplit[querySplit.length - 1];
      if (vendorShops.shops?.length) {
        const selected = vendorShops.shops.find((shop: { shop_id: number }) => shop.shop_id === Number(shopId))

        dispatch<any>(getSingleShop(shopId))
        dispatch<any>(setSingleShop(selected))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const topSelling = async () => {
    try {
      const res = await dispatch<any>(getTopSellingData(singleShop.selectedShop.id))
      dispatch<any>(setTopSellingData(res.payloaad.data))
    } catch (error) {
      return error
    }
    return null
  }

  useEffect(() => {
    if (singleShop.loaded && singleShop.selectedShop) {
      const a = { id: singleShop.selectedShop.id }
      dispatch<any>(getOpenCart(singleShop.selectedShop.id))
      if (!dashboard.loaded) dispatch<any>(getDashboardData(a))
      topSelling()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop.loaded])



  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GlobalFunctionsContext.Provider value={{
      loading,
      setLoading
    }}>
      {children}
    </GlobalFunctionsContext.Provider>
  )
}

export default GlobalFunctionsProvider;
