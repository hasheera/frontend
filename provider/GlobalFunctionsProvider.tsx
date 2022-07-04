import { useAppDispatch, useAppSelector } from "hooks";
import { createContext, ReactElement, useEffect, useState } from "react";
import { getOpenCart, setOpenCart } from "store/slices/carts";
import { getUser, setUser, userData } from "store/slices/user";

interface GlobalFunctionsProps {
loading: boolean,
setLoading: (a: boolean) => void;
}

const GlobalFunctionsContext = createContext<Partial<GlobalFunctionsProps>>({});

const GlobalFunctionsProvider = ({ children }: { children: ReactElement}) => {
  const[loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { userLoaded } = useAppSelector(userData)
  useEffect(() => {
    dispatch<any>(getOpenCart())
    dispatch<any>(getUser())
    // (async () => {
    //   console.log(res)
    //   dispatch(setOpenCart(res.payload.data[0]))
    // })()

    // (async () => {
    //   if(!userLoaded) {
    //     dispatch<any>(setUser(res.payload.data))
    //   }
    // })()
  }, [])

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
