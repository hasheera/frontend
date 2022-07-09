/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { createContext, ReactElement, useEffect, useState } from "react";
import { getOpenCart, getTransactionSales } from "store/slices/carts";
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
    if (singleShop.loaded && singleShop.selectedShop) {
      dispatch<any>(getOpenCart(singleShop.selectedShop.id))
      dispatch<any>(getTransactionSales(singleShop.selectedShop.id))
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
