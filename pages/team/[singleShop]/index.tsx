import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import {
  Avatar,
  Button,
  chakra,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { MoreIcon, SendInviteIcon } from "public/assets";
import { ShopContext } from "@providers/shopProvider";
import Cookies from "js-cookie";
import TeamBody from "@components/Team/TableBody";
import { apiCall } from "@utils/api";
import InviteTeamModal from "@components/Modals/InviteteamMember";
import RemoveShopOwner from "@components/AlertDialog/RemoveShopOwner";

type Props = {};
type VendorTeamProps = {
  id: number;
  contact_no: string;
  first_name: string;
  surname: string;
  roles: { name: string }[];
  user_shop: any;
};

const Team: NextPage = (props: Props) => {
  const { getTeams, vendorTeam, vendorSingleShop } = useContext(ShopContext);
  const [roles, setRoles] = useState([]);
  const teamModal = useDisclosure();
  const removeShopOwnerModal = useDisclosure();
  const [shopOwnerToRemove, setShopOwnerToRemove] = useState<any>({});

  const tableHeadData: string[] = ["S/N", "Name", "Phone", "Role", "Action"];

  useEffect(() => {
    if (vendorSingleShop.loaded) {
      const shopId = Cookies.get("shopId");
      getTeams(shopId);
    }
  }, [vendorSingleShop]);

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoles = async () => {
    try {
      const res = await apiCall("/oga/user/shop/list/role", "GET");
      if (res.status === 200) {
        setRoles(res.data.data);
      }
    } catch (e) {
      return e;
    }
  };

  return (
    <VendorDashBoardLayout>
      <chakra.p fontSize="22.19px" fontWeight="600" color="#333333">
        Team
      </chakra.p>
      <chakra.div d={{ base: "none", xl: "block" }}>
        <TableContainer bg="#ffffff" borderRadius="4px" p="9px" mt="20px">
          <chakra.div d="flex" justifyContent="end" my="29px">
            <Button
              w="117px"
              h="39px"
              borderRadius="8px"
              bg="#2153CC"
              mx="29px"
              _hover={{ bg: "#2153CC" }}
              leftIcon={<SendInviteIcon color="white" />}
              onClick={teamModal.onOpen}
            >
              <chakra.p
                fontSize="12px"
                fontWeight="700"
                m="8px 0"
                color="#FFFFFF"
              >
                Send Invite
              </chakra.p>
            </Button>
          </chakra.div>
          <Table>
            <Thead>
              <Tr>
                {tableHeadData.map((d: string, i: number) => (
                  <Th
                    key={i}
                    fontSize="14.78px"
                    fontWeight="500"
                    letterSpacing="0.16 px"
                    color="#1E2134"
                  >
                    {d}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {vendorTeam.loaded &&
                vendorTeam.data.map((data: VendorTeamProps, i: number) => (
                  <TeamBody key={data.id} {...data} num={i + 1} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </chakra.div>

      {/* Mobile */}

      <chakra.div
        d={{ base: "flex", xl: "none" }}
        w="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {vendorTeam.loaded &&
          vendorTeam.data.map((data: any, i) => (
            <chakra.div
              key={i}
              w="393px"
              h="118.65px"
              borderRadius="6px"
              bg="#FFFFFF"
              margin="7px 0px"
            >
              <chakra.div
                d="flex"
                p="10px"
                pl="15px"
                pt="15"
                justifyContent="space-between"
              >
                <chakra.div d="flex" alignItems="center">
                  <Avatar
                    size="sm"
                    name={`${data.surname} ${data.first_name}`}
                  />
                  <chakra.div ml="7px">
                    <chakra.p
                      fontSize="14px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="21.98px"
                      margin="3px 0"
                    >
                      {`${data.surname} ${data.first_name}`}
                    </chakra.p>
                    <chakra.p
                      fontSize="12px"
                      fontWeight="500"
                      color="#333333"
                      lineHeight="16.2px"
                      opacity="50%"
                      margin="3px 0"
                    >
                      {data.contact_no}
                    </chakra.p>
                  </chakra.div>
                </chakra.div>
                <chakra.button
                  onClick={() => {
                    removeShopOwnerModal.onOpen();
                    setShopOwnerToRemove({
                      ...data,
                    });
                  }}
                  w="84.1px"
                  h="27.56px"
                  borderRadius="5px"
                  border="1px solid #D9251D"
                >
                  <chakra.p
                    color="#D9251D"
                    fontWeight="500"
                    lineHeight="18px"
                    fontSize="12px"
                  >
                    Remove
                  </chakra.p>
                </chakra.button>
              </chakra.div>
              <chakra.div pl="40px">
                {data.user_shop.map(
                  (role: { role_name: string; shop_id: number }, i: number) => (
                    <chakra.span
                      key={i}
                      fontSize="12.27px"
                      fontWeight="500"
                      color="#1E2134"
                      letterSpacing="0.16px"
                    >
                      {role.shop_id === vendorSingleShop.selected.shop_id
                        ? role.role_name
                        : ""}
                    </chakra.span>
                  )
                )}
              </chakra.div>
            </chakra.div>
          ))}
      </chakra.div>

      <chakra.div
        onClick={() => teamModal.onOpen()}
        d={{ base: "flex", xl: "none" }}
        justifyContent="center"
        alignItems="center"
        position="fixed"
        w="205px"
        h="49px"
        borderRadius="11.88px"
        p="6.09111px 12.1822px"
        bg="#ffffff"
        right="1.95%"
        bottom="12.33%"
        boxShadow="-7.42424px 8.90909px 26.7273px rgba(33, 83, 204, 0.25)"
        cursor="pointer"
      >
        <SendInviteIcon color="#2153CC" />
        <chakra.p
          color="#2153CC"
          fontSize="14.85px"
          fontWeight="600"
          lineHeight="22px"
          margin="0px 8.12148px"
        >
          Send Invite
        </chakra.p>
      </chakra.div>

      <InviteTeamModal {...teamModal} roles={roles} />
      <RemoveShopOwner
        {...removeShopOwnerModal}
        shopOwnerToRemove={shopOwnerToRemove}
      />
    </VendorDashBoardLayout>
  );
};

export default Team;
