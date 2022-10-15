import { chakra } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'


const Footer = () => (
  <chakra.footer
    px={{ base: "2rem", md: "4rem", xl: "0" }}
    pt="8rem"
    pb="2.4rem"
    bg="#191D23"
  >
    <chakra.div
      px={{ xl: "12rem" }}
      display="flex"
      flexDir="column"
      // alignItems="center"
      maxW="151.2rem"
      mx="auto"
      gap="4.8rem"
    >
      <chakra.div pb="8.8rem" borderBottom="1px solid #A0ABBB">
        <Link href="/" passHref>
          <chakra.a href="/">
            <Image src="/assets/image/logo-white.svg" width={164} height={39} />
          </chakra.a>
        </Link>
      </chakra.div>

      <chakra.p
        fontWeight="500"
        fontSize="1.6rem"
        lineHeight="130%"
        color="#CCCFD6"
        textAlign="center"
      >
        All rights reserved &copy; {new Date().getFullYear()} Hasheera
      </chakra.p>
    </chakra.div>
  </chakra.footer>
)

export default Footer