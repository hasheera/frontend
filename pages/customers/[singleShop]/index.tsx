import { useEffect } from "react";
import { NextPage } from "next";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import {
  Avatar,
  Button,
  chakra,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { MoreIcon, SendInviteIcon } from "@public/assets";
import CustomersBody from "@components/Customer/CustomerBody";
import CreateCustomerModal from "@components/Modals/CreateNewCustomer";
import { useAppDispatch, useAppSelector } from "hooks";
import { getCustomers, shopsData } from "store/slices/shops";


const Customers: NextPage = () => {
  const { singleShop, customers } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const tableHeadData: string[] = ["S/N", "Name", "Phone", "Transaction", ""];
  const customersModal = useDisclosure();


  useEffect(() => {
    if (singleShop.loaded) {
      dispatch<any>(getCustomers(singleShop.selectedShop.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop]);

  if (!customers.loaded) {
    return (
      <chakra.div
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="lg" color="#2153CC" />
      </chakra.div>
    )
  }

  return (
    <VendorDashBoardLayout>
      <chakra.p
        fontSize={{ base: "18px", xl: "22.19px" }}
        fontWeight="600"
        color="#333333"
      >
        Customers
      </chakra.p>
      <chakra.div display={{ base: "none", xl: "block" }}>
        <TableContainer bg="#ffffff" borderRadius="4px" p="9px" mt="20px">
          <chakra.div display="flex" justifyContent="end" my="29px">
            <Button
              w="145px"
              h="39px"
              borderRadius="8px"
              bg="#2153CC"
              mx="29px"
              _hover={{ bg: "#2153CC" }}
              leftIcon={<SendInviteIcon color="#fff" />}
              onClick={customersModal.onOpen}
            >
              <chakra.p
                fontSize="12px"
                fontWeight="700"
                m="8px 0"
                color="#FFFFFF"
              >
                New Customer
              </chakra.p>
            </Button>
          </chakra.div>
          <Table>
            <Thead>
              <Tr>
                {tableHeadData.map((display: string) => (
                  <Th
                    key={display}
                    fontSize="14.78px"
                    fontWeight="500"
                    letterSpacing="0.16 px"
                    color="#1E2134"
                  >
                    {display}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {customers.loaded && customers.data.length > 0 ? (
                customers.data.map((data: any, i: number) => (
                  <CustomersBody key={data.id} num={i + 1} name={data.name} phone={data.phone} />
                ))
              ) : (
                <chakra.div display="flex" w="100%" justifyContent="center">
                  <chakra.p>No data</chakra.p>
                </chakra.div>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </chakra.div>

      {/* Mobile */}
      <chakra.div
        display={{ base: "flex", xl: "none" }}
        w="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {customers.loaded &&
          customers.data.map((data: any, i) => (
            <chakra.div
              key={data.id}
              w="393px"
              h="118.65px"
              borderRadius="6px"
              bg="#FFFFFF"
              margin="7px 0px"
            >
              <chakra.div
                display="flex"
                p="10px"
                pl="15px"
                pt="15"
                justifyContent="space-between"
              >
                <chakra.div display="flex" alignItems="center">
                  <Avatar size="sm" name={data.name} />
                  <chakra.div ml="7px">
                    <chakra.p
                      fontSize="14px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="21.98px"
                      margin="3px 0"
                    >
                      {data.name}
                    </chakra.p>
                    <chakra.p
                      fontSize="12px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="16.2px"
                      opacity="50%"
                      margin="3px 0"
                    >
                      {data.phone}
                    </chakra.p>
                  </chakra.div>
                </chakra.div>
                <chakra.div display="flex">
                  <chakra.div cursor="pointer" ml="20px">
                    <MoreIcon />
                  </chakra.div>
                </chakra.div>
              </chakra.div>
              <chakra.div display="flex" justifyContent="space-around" pl="40px">
                <chakra.div
                  w="120px"
                  h="27.56px"
                  bg="#F7F8FA"
                  borderRadius="5px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <chakra.p
                    color="#757575"
                    fontWeight="500"
                    lineHeight="18px"
                    fontSize="12px"
                  >
                    Transactions : 17
                  </chakra.p>
                </chakra.div>
                <chakra.div
                  w="84.1px"
                  h="27.56px"
                  borderRadius="5px"
                  border="1px solid #2153CC"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <chakra.p
                    color="#2153CC"
                    fontWeight="500"
                    lineHeight="18px"
                    fontSize="12px"
                  >
                    View
                  </chakra.p>
                </chakra.div>
              </chakra.div>
            </chakra.div>
          ))}
      </chakra.div>
      <CreateCustomerModal isOpen={customersModal.isOpen} onClose={customersModal.onClose} />
    </VendorDashBoardLayout>
  );
};

export default Customers;
