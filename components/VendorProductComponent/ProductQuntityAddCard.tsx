import { chakra } from "@chakra-ui/react";

interface Props {
  stateData: any;
  onHandlerChangeForm: (e: any, data: any) => void;
}

// eslint-disable-next-line arrow-body-style
const ProductQuntityAddCard = ({ stateData, onHandlerChangeForm }: Props) => {

  return (
    <chakra.div gap={{ xs: 12, sm: 8, md: 8, lg: 40 }}>
      {stateData?.map((data: any) => (
        <chakra.div key={data.id}>
          <chakra.div
            w="150px"
            h="300px"
          >
            {/* <Image */}
            {/*  style={{ */}
            {/*    width: "150px", */}
            {/*    height: "139.71px", */}
            {/*    borderTopLeftRadius: "8px", */}
            {/*    borderTopRightRadius: "8px", */}
            {/*  }} */}
            {/*  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80" */}
            {/*  alt="pproduct" */}
            {/* /> */}
            <chakra.div mt="4px">
              <chakra.p
                fontSize="13.44px"
                fontWeight="400"
                color="#000000"
                w="150px"
              >
                Lee pucker design Leather bag botiniki
              </chakra.p>
            </chakra.div>
            <chakra.p
              fontSize="9.19px"
              fontWeight="400"
              color="#000000"
              mt="10px"
            >
              90 stock left
            </chakra.p>
            <chakra.div
              display="flex"
              mt="5px"
              bg="#EBF2FF"
              borderRadius="7.54px"
              h="36.46px"
              w="150px"
              p="5px"
            >
              <chakra.p
                fontSize="12.86px"
                fontWeight="600"
                color="#2264D1"
                pr="30px"
                pt="5px"
              >
                Qty:
              </chakra.p>
              <chakra.input
                onChange={(e: any) => onHandlerChangeForm(e, data)}
                type="number"
                min={0}
              />
            </chakra.div>
          </chakra.div>
        </chakra.div>
      ))}
    </chakra.div>
  );
};

export default ProductQuntityAddCard;
