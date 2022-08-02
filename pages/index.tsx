
import { chakra } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    Router.replace("/dashboard")
  }, [])
  

  return (
    <chakra.div>Loading...</chakra.div>
  )
}

export default Home
