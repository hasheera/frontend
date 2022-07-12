import { NextPage } from "next";
import { useState } from "react";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import {
  chakra,
  InputRightElement,
  InputGroup,
  Input,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import Expenses from "@components/Transactions/Expenses";
import {
  AddtionIcon,
  DropDownIcon,
  SearchIcon,
  FilterIcon
} from "public/assets";
import AddNewExpense from "@components/Modals/AddNewExpense";
import StockMovement from "@components/Transactions/StockMovement";
import Sales from "@components/Transactions/Sales";
import Activity from "@components/Transactions/Activity";


const TransactionsPage: NextPage = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const addNewExpense = useDisclosure();
  const [sales, setSales] = useState(false);
  const [transaction, setTransaction] = useState("sales");

  return (
    <VendorDashBoardLayout>
      <chakra.p fontSize="20.27px" fontWeight="500" color="#000000">
        Transactions
      </chakra.p>

      <chakra.div>
        <chakra.div
          // display={{ base: "none", xl: "flex" }}
          display="flex"
          justifyContent="space-between"
          m="20px 0"
        >
          {transaction === "sales" && (
            <chakra.div>
              <InputGroup w={{ base: "200px", xl: "411.52px" }}>
                <Input
                  placeholder="Search for products"
                  type="text"
                  w={{ base: "200px", xl: "411.52px" }}
                  h="39.08px"
                  fontSize="12px"
                  fontWeight="500, Medium"
                  lineHeight="15px"
                  bg="#ffffff"
                />
                <InputRightElement>
                  <SearchIcon width={20} height={20} color="black" />
                </InputRightElement>
              </InputGroup>
            </chakra.div>
          )}
          {transaction === "expenses" && (
            <chakra.div display="flex" alignItems="center">
              <InputGroup w={{ base: "200px", xl: "411.52px" }}>
                <Input
                  placeholder="Search for products"
                  type="text"
                  w={{ base: "200px", xl: "411.52px" }}
                  h="39.08px"
                  fontSize="12px"
                  fontWeight="500, Medium"
                  lineHeight="15px"
                  bg="#ffffff"
                />
                <InputRightElement>
                  <SearchIcon width={20} height={20} color="black" />
                </InputRightElement>
              </InputGroup>
              {/* 
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      mx="20px"
                      w="111.04px"
                      h="38.42px"
                      bg="#FFFFFF"
                      borderRadius="5.72px"
                      color="#333333"
                      _hover={{
                        border: "1px solid #2153CC",
                        color: "#2153CC",
                      }}
                    >
                      <chakra.div
                        display="flex"
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        <FilterIcon />
                        <chakra.p fontWeight="500" fontSize="14px">
                          Filter
                        </chakra.p>
                        <chakra.span
                          display={{ base: "none", lg: "inline" }}
                          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                        >
                          <DropDownIcon width={10} height={6} color="#242533" />
                        </chakra.span>
                      </chakra.div>
                    </MenuButton>
                    <MenuList w="397px" h="371.6px" p="20px">
                      <chakra.p
                        fontSize="12.66px"
                        fontWeight="500"
                        textAlign="center"
                      >
                        Choose from any or all option for filtering
                      </chakra.p>

                      <chakra.div
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt="20px"
                      >
                        <chakra.div>
                          <chakra.p
                            fontSize="12px"
                            fontWeight="600"
                            color="#2153CC"
                          >
                            Status
                          </chakra.p>

                          <Menu>
                            {({ isOpen }) => (
                              <>
                                <MenuButton
                                  w="150.25px"
                                  h="42"
                                  borderRadius="5px"
                                  border="0.5px solid #B2B2B2"
                                  p="5px"
                                >
                                  <chakra.span
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <chakra.span
                                      color="#B3B3B3"
                                      fontSize="10.85px"
                                      fontWeight="400"
                                    >
                                      All
                                    </chakra.span>
                                    <chakra.span
                                      transform={
                                        isOpen
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)"
                                      }
                                    >
                                      <DropDownIcon
                                        width={10}
                                        height={6}
                                        color="#242533"
                                      />
                                    </chakra.span>
                                  </chakra.span>
                                </MenuButton>
                                <MenuList
                                  w="160px"
                                  borderRadius="8px"
                                  bg="#FDFDFD"
                                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
                                  p="5px"
                                >
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      The haopha
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      hilkjgiu;dkl
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      lioshuosi
                                    </chakra.p>
                                  </MenuItem>
                                </MenuList>
                              </>
                            )}
                          </Menu>
                        </chakra.div>
                        <chakra.div>
                          <chakra.p
                            fontSize="12px"
                            fontWeight="600"
                            color="#2153CC"
                          >
                            Sold by
                          </chakra.p>
                          <Menu>
                            {({ isOpen }) => (
                              <>
                                <MenuButton
                                  w="150.25px"
                                  h="42"
                                  borderRadius="5px"
                                  border="0.5px solid #B2B2B2"
                                  p="5px"
                                >
                                  <chakra.span
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <chakra.span
                                      color="#B3B3B3"
                                      fontSize="10.85px"
                                      fontWeight="400"
                                    >
                                      Darlene Robertson
                                    </chakra.span>

                                    <chakra.span
                                      transform={
                                        isOpen
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)"
                                      }
                                    >
                                      <DropDownIcon
                                        width={10}
                                        height={6}
                                        color="#242533"
                                      />
                                    </chakra.span>
                                  </chakra.span>
                                </MenuButton>
                                <MenuList
                                  w="160px"
                                  borderRadius="8px"
                                  bg="#FDFDFD"
                                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
                                  p="5px"
                                >
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      The haopha
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      hilkjgiu;dkl
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      lioshuosi
                                    </chakra.p>
                                  </MenuItem>
                                </MenuList>
                              </>
                            )}
                          </Menu>
                        </chakra.div>
                      </chakra.div>

                      <chakra.div
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt="20px"
                      >
                        <chakra.div>
                          <chakra.p
                            fontSize="12px"
                            fontWeight="600"
                            color="#2153CC"
                          >
                            Channel
                          </chakra.p>

                          <Menu>
                            {({ isOpen }) => (
                              <>
                                <MenuButton
                                  w="150.25px"
                                  h="42"
                                  borderRadius="5px"
                                  border="0.5px solid #B2B2B2"
                                  p="5px"
                                >
                                  <chakra.span
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <chakra.span
                                      color="#B3B3B3"
                                      fontSize="10.85px"
                                      fontWeight="400"
                                    >
                                      All
                                    </chakra.span>
                                    <chakra.span
                                      transform={
                                        isOpen
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)"
                                      }
                                    >
                                      <DropDownIcon
                                        width={10}
                                        height={6}
                                        color="#242533"
                                      />
                                    </chakra.span>
                                  </chakra.span>
                                </MenuButton>
                                <MenuList
                                  w="160px"
                                  borderRadius="8px"
                                  bg="#FDFDFD"
                                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
                                  p="5px"
                                >
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      The haopha
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      hilkjgiu;dkl
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      lioshuosi
                                    </chakra.p>
                                  </MenuItem>
                                </MenuList>
                              </>
                            )}
                          </Menu>
                        </chakra.div>
                        <chakra.div>
                          <chakra.p
                            fontSize="12px"
                            fontWeight="600"
                            color="#2153CC"
                          >
                            Date
                          </chakra.p>
                          <Menu>
                            {({ isOpen }) => (
                              <>
                                <MenuButton
                                  w="150.25px"
                                  h="42"
                                  borderRadius="5px"
                                  border="0.5px solid #B2B2B2"
                                  p="5px"
                                >
                                  <chakra.span
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <chakra.span
                                      color="#B3B3B3"
                                      fontSize="10.85px"
                                      fontWeight="400"
                                    >
                                      Darlene Robertson
                                    </chakra.span>
                                    <chakra.span
                                      transform={
                                        isOpen
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)"
                                      }
                                    >
                                      <DropDownIcon
                                        width={10}
                                        height={6}
                                        color="#242533"
                                      />
                                    </chakra.span>
                                  </chakra.span>
                                </MenuButton>
                                <MenuList
                                  w="160px"
                                  borderRadius="8px"
                                  bg="#FDFDFD"
                                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
                                  p="5px"
                                >
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      The haopha
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      hilkjgiu;dkl
                                    </chakra.p>
                                  </MenuItem>
                                  <MenuItem
                                    _hover={{
                                      bg: "#2153CC14",
                                      color: "#2153CC",
                                    }}
                                    color="#1E2134"
                                  >
                                    <chakra.p
                                      fontSize="12.72px"
                                      fontWeight="400"
                                      letterSpacing="0.14 px"
                                    >
                                      lioshuosi
                                    </chakra.p>
                                  </MenuItem>
                                </MenuList>
                              </>
                            )}
                          </Menu>
                        </chakra.div>
                      </chakra.div>
                      {!showDatePicker ? (
                        <chakra.div w="full" display="flex" justifyContent="center">
                          <chakra.button
                            onClick={() => setShowDatePicker(true)}
                            color="#1225B2"
                            fontWeight="500"
                            fontSize="12px"
                            textDecoration="underline"
                            p="20px"
                            bg="none"
                          >
                            Select a date range
                          </chakra.button>
                        </chakra.div>
                      ) : (
                        <chakra.div>Date Picker</chakra.div>
                      )}
                    </MenuList>
                  </>
                )}
              </Menu> */}

              <chakra.div
                onClick={addNewExpense.onOpen}
                w="177.82px"
                h="38.42px"
                borderRadius="5.72px"
                padding="8px 10px"
                bg="#FFFFFF"
                display={{ base: "none", xl: "flex" }}
                justifyContent="space-around"
                alignItems="center"
                cursor="pointer"
              >
                <AddtionIcon />
                <chakra.p color="#242533" fontSize="14px" fontWeight="500">
                  New Expenses
                </chakra.p>
              </chakra.div>
            </chakra.div>
          )}

          {transaction === "stock movement" && (
            <chakra.div />
            )}

          {transaction === "activity" && (
            <chakra.div />
            // <chakra.div>
            //   <InputGroup w={{ base: "200px", xl: "411.52px" }}>
            //     <Input
            //       placeholder="Search for activity"
            //       type="text"
            //       w={{ base: "200px", xl: "411.52px" }}
            //       h="39.08px"
            //       fontSize="12px"
            //       fontWeight="500, Medium"
            //       lineHeight="15px"
            //       bg="#ffffff"
            //     />
            //     <InputRightElement>
            //       <SearchIcon width={20} height={20} color="black" />
            //     </InputRightElement>
            //   </InputGroup>
            // </chakra.div>
          )}

          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  bg={transaction ? "#2153CC" : "white"}
                  h="36px"
                  p="10px"
                  borderRadius="4px"
                  border="none"
                  color={transaction ? "white" : "#242533"}
                  fontSize="0.875rem"
                  fontWeight="500"
                >
                  <chakra.span display="flex" alignItems="center">
                    <chakra.span mr="14px" textTransform="capitalize">
                      {transaction || "All Products"}
                    </chakra.span>
                    <chakra.span
                      transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    >
                      <DropDownIcon
                        width={10}
                        height={6}
                        color={transaction ? "white" : "#242533"}
                      />
                    </chakra.span>
                  </chakra.span>
                </MenuButton>
                <MenuList
                  p="0"
                  bg="white"
                  boxShadow="-4.8px 9.6px 26.4px rgba(0, 0, 0, 0.03)"
                  borderRadius="6px"
                  minW="108px"
                  w="fit-content"
                >
                  <MenuItem
                    onClick={() => setTransaction("sales")}
                    p="10px"
                    fontSize="0.75rem"
                    color="#242533"
                    _hover={{
                      bg: "rgba(33, 83, 204, 0.08)",
                      color: "#2153CC",
                    }}
                  >
                    Sales
                  </MenuItem>
                  <MenuItem
                    textTransform="capitalize"
                    onClick={() => setTransaction("expenses")}
                    p="10px"
                    fontSize="0.75rem"
                    color="#242533"
                    _hover={{
                      bg: "rgba(33, 83, 204, 0.08)",
                      color: "#2153CC",
                    }}
                  >
                    Expenses
                  </MenuItem>
                  <MenuItem
                    textTransform="capitalize"
                    onClick={() => setTransaction("stock movement")}
                    p="10px"
                    fontSize="0.75rem"
                    color="#242533"
                    _hover={{
                      bg: "rgba(33, 83, 204, 0.08)",
                      color: "#2153CC",
                    }}
                  >
                    Stock movement
                  </MenuItem>
                  <MenuItem
                    textTransform="capitalize"
                    onClick={() => setTransaction("activity")}
                    p="10px"
                    fontSize="0.75rem"
                    color="#242533"
                    _hover={{
                      bg: "rgba(33, 83, 204, 0.08)",
                      color: "#2153CC",
                    }}
                  >
                    Activity
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </chakra.div>

        {transaction === "sales" && <Sales />}
        {transaction === "expenses" && <Expenses />}
        {transaction === "stock movement" && <StockMovement />}
        {transaction === "activity" && <Activity />}
      </chakra.div>
      <AddNewExpense isOpen={addNewExpense.isOpen} onClose={addNewExpense.onClose} />
    </VendorDashBoardLayout>
  );
};

export default TransactionsPage;
