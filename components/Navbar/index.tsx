import { chakra } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Navbar = () => {
  const router = useRouter();
  
  useEffect(() => {
    console.log(router)
  }, [router])
  

  return (
    <>
      <Head>
        <title>Hasheera | Welcome</title>
        <meta name="description" content="Virtual healthcare for you and your family" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      <chakra.nav
        w="full"
        h="9.3rem"
        bg="white"
        pos="sticky"
        top="0"
        zIndex="10"
        px={{ base: "2rem", md: "4rem", xl: "0" }}
        >
        <chakra.div
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          h="full"
          maxW="151.2rem"
          mx="auto"
          px={{ base: "2rem", md: "4rem", xl: "12rem" }}
        >
          <Link href="/" passHref>
            <chakra.a href="/">
              <Image src="/assets/image/logo.svg" width={501} height={30} />
            </chakra.a>
          </Link>


          <chakra.div
            display="flex"
            alignItems="center"
          >
            {/* <Link href="/" passHref>
              <chakra.a
                fontWeight="700"
                fontSize="1.6rem"
                lineHeight="1.9rem"
                color="#1374E7"
              >
                Home
              </chakra.a>
            </Link>

            <Link href="/" passHref>
              <chakra.a
                fontWeight={router.asPath === "/#pricing" ? "700" : "500"}
                fontSize="1.6rem"
                lineHeight="1.9rem"
                color={router.asPath === "/#pricing" ? "#1374E7" : "#A0ABBB"}
                ml="2.4rem"
              >
                Pricing
              </chakra.a>
            </Link>

            <Link href="/login/patient" passHref>
              <chakra.a
                fontWeight="700"
                fontSize="1.4rem"
                lineHeight="2.1rem"
                color="#1374E7"
                bg="white"
                p="1.2rem 3.2rem"
                border="1px solid #1374E7"
                borderRadius="40px"
                ml="2.8rem"
              >
                Log In
              </chakra.a>
            </Link> */}

            <Link href="register/patient" passHref>
              <chakra.a
                fontWeight="700"
                fontSize="1.4rem"
                lineHeight="2.1rem"
                color="white"
                bg="#1374E7"
                p="1.2rem 3.2rem"
                borderRadius="40px"
                ml="1.6rem"
              >
                Book an appointment
              </chakra.a>
            </Link>
          </chakra.div>
        </chakra.div>
      </chakra.nav>
    </>
  )
}

export default Navbar