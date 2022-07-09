import { FC } from "react";
import { chakra, Tr, Td, Avatar } from "@chakra-ui/react";

interface Props {
  num: number;
  name: string;
  phone: string;
}

const CustomersBody: FC<Props> = ({ num, name, phone }) => (
    <Tr>
      <Td>
        <chakra.p fontSize="14.78px" fontWeight="400" color="#1E2134">
          {num <= 9 ? `0${num}` : num}
        </chakra.p>
      </Td>
      <Td>
        <chakra.div display="flex" alignItems="center">
          <Avatar size="sm" name={name} />

          <chakra.p
            fontSize="14.78px"
            fontWeight="400, Regular"
            color="#1E2134"
            letterSpacing="0.16px"
            ml="10px"
          >
            {name}
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
          {phone}
        </chakra.p>
      </Td>
      <Td>
        <chakra.p
          fontSize="16.27px"
          fontWeight="600"
          color="#1E2134"
          letterSpacing="0.16px"
        >
          17
        </chakra.p>
      </Td>
      <Td>
        <chakra.button
          w="102.25px"
          h="35.62px"
          borderRadius="5.81px"
          color="#2153CC"
          border="1.16199px solid #2153CC"
        >
          <chakra.p fontSize="16.27px" fontWeight="500">
            View
          </chakra.p>
        </chakra.button>
      </Td>
    </Tr>
  );

export default CustomersBody;
