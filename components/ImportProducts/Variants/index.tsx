/* eslint-disable camelcase */
import { chakra, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "public/assets";
import CreateProductUnit from "@components/Modals/CreateProductUnit";
import Variant from "./Varaint";

interface Props { data: any; loaded: boolean }

const Variants = ({ data, loaded }: Props) => {
  const productUnitModal = useDisclosure();

  return (
    <>
      <chakra.div
        display="grid"
        columnGap="20px"
        rowGap="20px"
        gridTemplateColumns="repeat(auto-fit, minmax(152.58px, 1fr))"
      >
        {loaded &&
          data.map((product) =>
            product?.product_units?.map((product_unit: any) => (
              <Variant key={product_unit.id} product_unit={product_unit} product={product} />
            ))
          )}
        <chakra.div
          onClick={productUnitModal.onOpen}
          w="152.68px"
          h="250px"
          borderRadius="15.3247px"
          border="2px dotted #2264D1"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
          cursor="pointer"
          _hover={{ transform: "scale(1.1)" }}
        >
          <chakra.div mt="30px">
            <AddIcon width={25} height={25} />
          </chakra.div>
          <chakra.p fontSize="15px" fontWeight="500" color="#2153CC">
            Click Here to Suggest New Variant
          </chakra.p>
        </chakra.div>
      </chakra.div>
      <CreateProductUnit isOpen={productUnitModal.isOpen} onClose={productUnitModal.onClose} />
    </>
  );
};

export default Variants;
