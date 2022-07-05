import { chakra, Spinner } from '@chakra-ui/react'
import { useAppSelector } from 'hooks'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { shopsData } from 'store/slices/shops'

const Home: NextPage = () => {
  const { singleShop } = useAppSelector(shopsData);
  const router = useRouter()

  useEffect(() => {
    if(singleShop.loaded && singleShop.selectedShop) {
      router.replace(`/dashboard/${singleShop.selectedShop.shop.name.split(" ").join("-").toLowerCase()}-${singleShop.selectedShop.id}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop])
  
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

export default Home
