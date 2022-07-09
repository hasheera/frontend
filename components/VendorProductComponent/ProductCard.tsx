import { chakra, Divider, Box, Grid, Select } from "@chakra-ui/react";


const ProductCard = () => (
    <chakra.main
      bg="#ffffff"
      w={{ base: "", lg: "1092px" }}
      p={{ base: "20px", lg: "50px" }}
      borderRadius="7.87px"
    >
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={{ base: 5, lg: 10 }}
      >
        <Box w="162px">
          <chakra.img
            borderTopRadius="15.78px"
            w="162px"
            h="155.98px"
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
            alt="product"
          />
          <chakra.p
            w="162px"
            fontSize="10.26px"
            fontWeight={500}
            mt="20px"
          >
            Lee Pucker design. Leather botinki for handsome and
            designers. 90 stock left
          </chakra.p>
          <Box
            bg="#EBF2FF"
            w="162px"
            h="38.7px"
            borderRadius="8px"
            mt="20px"
          >
            <chakra.div p="6px 12px 6px 12px" display="flex">
              <chakra.p
                mt="2px"
                color="#2264D1"
                fontSize="13.65px"
                fontWeight={600}
              >
                Qty:
              </chakra.p>
              <chakra.input
                mt="2px"
                ml="5px"
                borderRadius="4px"
                w="103px"
                h="22px"
                name=""
              />
            </chakra.div>
          </Box>
        </Box>
        <Box w="162px">
          <chakra.img
            borderTopRadius="15.78px"
            w="162px"
            h="155.98px"
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
            alt="product"
          />
          <chakra.p
            w="162px"
            fontSize="10.26px"
            fontWeight={500}
            mt="20px"
          >
            Lee Pucker design. Leather botinki for handsome and
            designers. 90 stock left
          </chakra.p>
          <Box
            bg="#EBF2FF"
            w="162px"
            h="38.7px"
            borderRadius="8px"
            mt="20px"
          >
            <chakra.div p="6px 12px 6px 12px" display="flex">
              <chakra.p
                mt="2px"
                color="#2264D1"
                fontSize="13.65px"
                fontWeight={600}
              >
                Qty:
              </chakra.p>
              <chakra.input
                mt="2px"
                ml="5px"
                borderRadius="4px"
                w="103px"
                h="22px"
                name=""
              />
            </chakra.div>
          </Box>
        </Box>
      </Grid>
      <Divider h="100px" color="#000000" mt="20px" />
      <chakra.div mt="30px" display="flex">
        <chakra.p
          mt="10px"
          color="#2264D1"
          fontSize="13.65px"
          fontWeight={600}
        >
          Transfer products to:
        </chakra.p>
        <Select ml="20px" w="250px" placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </chakra.div>
      <chakra.button
        fontWeight="600"
        fontSize="18px"
        color="#FFFFFF"
        borderRadius="8px"
        w="181px"
        h="42px"
        bg="#2153CC"
        mt="20"
      >
        Make Transfer
      </chakra.button>
    </chakra.main>
  )

export default ProductCard