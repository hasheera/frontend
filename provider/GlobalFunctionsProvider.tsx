/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra, Spinner } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactElement, useCallback, useEffect, useState } from "react";
import { getOpenCart, getTransactionSales } from "store/slices/carts";
import { getCategories, getSingleShop, getVendorShops, setSingleShop, shopsData, updateHasShopRole } from "store/slices/shops";
import { getUser, userData } from "store/slices/user";

interface GlobalFunctionsProps {
  loading: boolean,
  setLoading: (a: boolean) => void;
}

const GlobalFunctionsContext = createContext<Partial<GlobalFunctionsProps>>({});

const GlobalFunctionsProvider = ({ children }: { children: ReactElement }) => {
  const { userLoaded, user } = useAppSelector(userData)
  const { vendorShops, singleShop, hasShop, hasShopRole } = useAppSelector(shopsData)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if(!Cookies.get("token")) {
      if(router.pathname !== "/login") {
        window.location.replace("/login");
      }
    };
    if(Cookies.get("token")) {
      if(router.pathname === "/login") {
        window.location.replace("/dashboard")
      }
      if (!userLoaded) dispatch<any>(getUser());
      if (!vendorShops.loaded) dispatch<any>(getVendorShops());
    }
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
      if (!singleShop.loaded && router.query.singleShop) {
        const querySplit = (router.query.singleShop as string).split("-");
        const shopId = querySplit[querySplit.length - 1];
        const selected = vendorShops.shops?.find((shop: { shop_id: number }) => shop.shop_id === Number(shopId));
        dispatch<any>(getSingleShop(shopId));
        dispatch<any>(setSingleShop(selected))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorShops.shops])

  useEffect(() => {
    if (singleShop.loaded && singleShop.selectedShop) {
      dispatch<any>(getOpenCart(singleShop.selectedShop.shop_id))
      dispatch<any>(getTransactionSales({ id: singleShop.selectedShop.shop_id }))
      dispatch<any>(getCategories(singleShop.selectedShop.shop_id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop])

  useEffect(() => {
    if (userLoaded && singleShop.selectedShop) {
      if (hasShop && hasShopRole === null) {
        const role = user.user.user_shop.some(s => s.shop_id === singleShop.selectedShop.shop_id)
        dispatch<any>(updateHasShopRole(role))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoaded, singleShop, hasShop])

  if(!userLoaded && router.pathname !== "/login") {
    return (
      <chakra.div
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100vh"
      >
        <Spinner color="#2153cc" />
      </chakra.div>
    )
  }


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
