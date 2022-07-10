import { NextPage } from "next";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import { chakra, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@public/assets";


const Help: NextPage = () => (
    <VendorDashBoardLayout>
      <chakra.p color="#333333" fontWeight="600" fontSize="22.19px">
        Help Center
      </chakra.p>
      <chakra.div
        // position="absolute"
        top="0"
        w="100%"
        h="308px"
        borderRadius="12px"
        bg="linear-gradient(135deg, #FF0080 0%, #C412A0 43.75%, #7928CA 100%)"
      />
      <chakra.div
        zIndex="1"
        maxW="965px"
        h="1729.24px"
        borderRadius="18.51px"
        bg="#ffffff"
        m="0 auto"
        mt="-260px"
        pt="30px"
        pl="50px"
      >
        <chakra.p fontSize="24px" fontWeight="500" color="#2153CC">
          Hi, how can we help?
        </chakra.p>
        <InputGroup w="411.52px" mt="20px">
          <Input
            w="411.52px"
            h="39.08px"
            placeholder="Ask questions or input key words"
            _placeholder={{
              color: "#333333",
              fontSize: "12px",
              fontWeight: "500",
              opacity: "0.7",
            }}
          />
          <InputRightElement>
            <SearchIcon width={24} height={24} color="#000000CC" />
          </InputRightElement>
        </InputGroup>
        <chakra.p
          color="#FE7062"
          fontSize="18px"
          fontWeight="600"
          mt="20px"
          mb="5px"
        >
          Frequently asked Questions
        </chakra.p>
        <chakra.p fontSize="14px" fontWeight="400" color="#000000">
          Frequently asked questions about Shop Urban
        </chakra.p>

        <chakra.div mt="30px">
          <chakra.div
            display="flex"
            alignItems="center"
            maxW="820px"
            h="43px"
            bg="#ffffff"
            boxShadow="-11px 4px 22px rgba(0, 0, 0, 0.04)"
            m="22.5px 0px"
          >
            <chakra.div
              w="2.25px"
              h="24px"
              bg="#53B175"
              borderRadius="7.5px 0px 0px 7.5px"
            />
            <chakra.p
              color="#000000"
              fontWeight="600"
              fontSize="18px"
              ml="30px"
            >
              Amet minim mollit non deserunt ullamco est sit aliqua?
            </chakra.p>
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
            maxW="820px"
            h="43px"
            bg="#ffffff"
            boxShadow="-11px 4px 22px rgba(0, 0, 0, 0.04)"
            m="22.5px 0px"
          >
            <chakra.div
              w="2.25px"
              h="24px"
              bg="#D9251D"
              borderRadius="7.5px 0px 0px 7.5px"
            />
            <chakra.p
              color="#000000"
              fontWeight="600"
              fontSize="18px"
              ml="30px"
            >
              Amet minim mollit non deserunt ullamco est sit aliqua?
            </chakra.p>
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
            maxW="820px"
            h="43px"
            bg="#ffffff"
            boxShadow="-11px 4px 22px rgba(0, 0, 0, 0.04)"
            m="22.5px 0px"
          >
            <chakra.div
              w="2.25px"
              h="24px"
              bg="#F5AF1B"
              borderRadius="7.5px 0px 0px 7.5px"
            />
            <chakra.p
              color="#000000"
              fontWeight="600"
              fontSize="18px"
              ml="30px"
            >
              Amet minim mollit non deserunt ullamco est sit aliqua?
            </chakra.p>
          </chakra.div>
          <chakra.div
            maxW="811.25px"
            // h="350.5px"
            boxShadow="-11px 4px 15px rgba(0, 0, 0, 0.04)"
            m="22.5px 0px"
            display="flex"
            alignItems="center"
          >
            <chakra.div
              w="2px"
              h="332px"
              borderRadius="7.5px 0px 0px 7.5px"
              bg="#2153CC"
            />
            <chakra.div ml="30px">
              <chakra.p color="#000000" fontWeight="600" fontSize="18px">
                Amet minim mollit non deserunt ullamco est sit aliqua?
              </chakra.p>
              <chakra.p m="22.5px 0px">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
                Elit aute irure tempor cupidatat incididunt sint deserunt ut
                voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure
                ex duis ea quis id quis ad et. Sunt qui esse pariatur duis
                deserunt mollit dolore cillum minim tempor enim. Elit aute irure
                tempor cupidatat incididunt sint deserunt ut voluptate aute id
                deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis id
                quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore
                cillum minim tempor enim. Elit aute irure tempor cupidatat
                incididunt sint deserunt ut voluptate aute id deserunt
                nisi.Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                et. Sunt qui esse pariatur duis deserunt mollit dolore cillum
                minim tempor enim. Elit aute irure tempor cupidatat incididunt
                sint deserunt ut voluptate aute id deserunt nisi.
              </chakra.p>
            </chakra.div>
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
            maxW="820px"
            h="43px"
            bg="#ffffff"
            boxShadow="-11px 4px 22px rgba(0, 0, 0, 0.04)"
            m="22.5px 0px"
          >
            <chakra.div
              w="2.25px"
              h="24px"
              bg="#121216"
              borderRadius="7.5px 0px 0px 7.5px"
            />
            <chakra.p
              color="#000000"
              fontWeight="600"
              fontSize="18px"
              ml="30px"
            >
              Amet minim mollit non deserunt ullamco est sit aliqua?
            </chakra.p>
          </chakra.div>
        </chakra.div>
        <chakra.div
          display="flex"
          justifyContent="space-between"
          flexDir={{ base: "column", md: "row" }}
          maxW="901.95px"
          h="222.51px"
          bg="#F8F9FA"
          borderRadius="18.51px"
          mt="100px"
          p="30px"
        >
          <chakra.p color="#252F40" fontWeight="600" m="0" fontSize="21.6px">
            Contact Us
          </chakra.p>
          <chakra.div>
            <chakra.p color="#67748E" fontWeight="400" fontSize="16px">
              Phone Number
            </chakra.p>
            <chakra.div>
              <chakra.p
                color="#67748E"
                mt="10px"
                fontWeight="400"
                fontSize="20.06px"
              >
                (+234)903 430 2172
              </chakra.p>
            </chakra.div>
          </chakra.div>
          <chakra.div>
            <chakra.p fontSize="16px" fontWeight="600" color="#53B175">
              Emails
            </chakra.p>
            <chakra.div>
              <chakra.a fontSize="20.06px" fontWeight="400">
                support@shopurban.co
              </chakra.a>
            </chakra.div>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </VendorDashBoardLayout>
  );

export default Help;
