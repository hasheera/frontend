/* eslint-disable camelcase */
import { FC, useState } from "react";
import { chakra, Tr, Td, Avatar, useDisclosure } from "@chakra-ui/react";
import RemoveShopOwner from "@components/AlertDialog/RemoveShopOwner";

interface Props {
  first_name: string;
  surname: string;
  contact_no: string;
  num: number;
  user_shop: any;
  role_name: string;
}

const TeamBody: FC<Props> = ({
  contact_no,
  first_name,
  surname,
  num,
  user_shop,
  role_name
}) => {
  const [shopOwnerToRemove, setShopOwnerToRemove] = useState<any>(null);
  const removeShopOwnerDialog = useDisclosure();

  return (
    <>
      <Tr>
        <Td>
          <chakra.p fontSize="14.78px" fontWeight="400" color="#1E2134">
            {num <= 9 ? `0${num}` : num}
          </chakra.p>
        </Td>
        <Td>
          <chakra.div display="flex" alignItems="center">
            <Avatar size="sm" name={`${surname} ${first_name}`} />
            <chakra.p
              fontSize="14.78px"
              fontWeight="400, Regular"
              color="#1E2134"
              letterSpacing="0.16px"
              ml="10px"
            >
              {`${surname} ${first_name}`}
            </chakra.p>
          </chakra.div>
        </Td>
        <Td>
          <chakra.p
            color="#1E2134"
            fontWeight="400"
            fontSize="14.78px"
            letterSpacing="0.16px"
          >
            {contact_no}
          </chakra.p>
        </Td>
        <Td>
          <chakra.span
            fontSize="14.27px"
            fontWeight="500"
            color="#1E2134"
            letterSpacing="0.16px"
          >
            {role_name}
          </chakra.span>
        </Td>
        <Td>
          {role_name !== "shopOwner" && <chakra.button
            onClick={() => {
              removeShopOwnerDialog.onOpen();
              setShopOwnerToRemove({
                contact_no,
                first_name,
                surname,
                num,
                user_shop,
              });
            }}
            w="102.25px"
            h="35.62px"
            borderRadius="5.81px"
            color="#D9251D"
            border="1.16199px solid #D9251D"
          >
            <chakra.p fontSize="16.27px" fontWeight="500">
              Remove
            </chakra.p>
          </chakra.button>}
        </Td>
      </Tr>
      <RemoveShopOwner
        isOpen={removeShopOwnerDialog.isOpen}
        onClose={removeShopOwnerDialog.onClose}
        shopOwnerToRemove={shopOwnerToRemove}
      />
    </>
  );
};

export default TeamBody;
