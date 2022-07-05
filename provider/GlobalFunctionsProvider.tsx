/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { createContext, ReactElement, useEffect, useState } from "react";
import { getOpenCart } from "store/slices/carts";
import { getSingleShop, getVendorShops, setSingleShop, shopsData } from "store/slices/shops";
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
  const { vendorShops, singleShop } = useAppSelector(shopsData)
  const router = useRouter()

  useEffect(() => {
    dispatch<any>(getOpenCart())
    if (!userLoaded) dispatch<any>(getUser())
    if (!vendorShops.loaded) dispatch<any>(getVendorShops())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (vendorShops.shops && vendorShops.shops.length) {
      if (!singleShop.loaded && !router.query.singleShop) {
        const selected = vendorShops.shops[0]
        // eslint-disable-next-line
        // @ts-ignore 
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
    if (router.query.singleShop) {
      const querySplit = (router.query.singleShop as string).split("-");
      const shopId = querySplit[querySplit.length - 1];
      if (vendorShops.shops) {
        const selected = vendorShops.shops.find((shop: { shop_id: number }) => shop.shop_id === Number(shopId))
        // eslint-disable-next-line
        // @ts-ignore 
        dispatch<any>(getSingleShop(shopId))
        dispatch<any>(setSingleShop(selected))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, vendorShops.shops])

  useEffect(() => {
    if (singleShop.loaded && singleShop.selectedShop) {
      // eslint-disable-next-line
      // @ts-ignore
      dispatch<any>(getOpenCart(singleShop.selectedShop.id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop.selectedShop])

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
