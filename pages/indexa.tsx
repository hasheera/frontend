/* eslint-disable arrow-body-style */
import { chakra } from '@chakra-ui/react'
import VendorDashBoardLayout from '@components/Layout/VendorDashBoardLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <VendorDashBoardLayout>
      <Head>
        <title>Vendor Overview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <chakra.div>Welcome to the Shop Urban Vendor app. Coming soon... <Link href="/">Back to home page</Link></chakra.div>
    </VendorDashBoardLayout>
  )
}

export default Home