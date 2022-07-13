/* eslint-disable camelcase */
import { useState } from "react";
import { NextPage } from "next";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import ShoppingSummary from "@components/Cart/ShoppingSummary";
import EditItem from "@components/Modals/Cart/EditItem";
import { CartItem } from "@components/Cart/CurrentCart";
import { chakra, Accordion } from "@chakra-ui/react";
import { useAppSelector } from "hooks";
import { cartsData } from "store/slices/carts";


const CartPage: NextPage = () => {
  const { carts, cartsLoaded } = useAppSelector(cartsData);
  const [editModal, setEditModal] = useState(false);

  const cartItemImg = (shop_product: { product_unit: any; product: any; }) => {
    const { product_unit, product } = shop_product;
    if(shop_product) {
      if(product_unit) return product_unit.photo;
      if(product) return product.photo;
    }
    return "/assets/image/logo.png"
  } 

  return (
    <VendorDashBoardLayout>
      {cartsLoaded && (
        carts.length && carts[0].cart_items.length > 0 ? (
          <chakra.div
            mt={{ base: "10px", lg: "20px" }}
            pb={{ base: "80px", lg: "0" }}
          >
            <chakra.h3
              fontSize="1.375rem"
              fontWeight="500"
              display={{ base: "none", lg: "block" }}
              pt="10px"
            >
              Cart Summary ({carts[0].cart_items.length})
            </chakra.h3>
            <chakra.div
              display="flex"
              flexDir={{ base: "column", lg: "row" }}
              mt="12px"
            >
              <chakra.div
                display="flex"
                flexDir="column"
                gridRowGap="24px"
                width="100%"
                maxW="960px"
              >
                <Accordion
                  allowToggle
                  w="full"
                  overflowY="scroll"
                  className="custom-scroll"
                  gap="24px"
                  display="flex"
                  flexDir="column"
                >
                  {carts[0].cart_items.map(({
                    id,
                    shop_product,
                    price,
                    quantity,
                    shop_product_id,
                    is_shop_owner
                  }) => (
                    <CartItem
                      key={id}
                      // eslint-disable-next-line no-nested-ternary
                      image={shop_product ? shop_product?.product_unit?.photo ? shop_product?.product_unit?.photo : shop_product?.product?.photo : `/assets/image/logo.png`}
                      itemName={shop_product?.product_unit.slug.split("-").join(" ")}
                      subTotal={price}
                      qty={quantity}
                      productId={shop_product_id}
                      stock_count={shop_product?.stock_count}
                      sell={shop_product?.sell_price}
                      itemId={id}
                      shopOwner={is_shop_owner}
                    />
                  ))}
                </Accordion>
              </chakra.div>

              <chakra.div
                ml={{ lg: "64px" }}
                mt={{ base: "40px", lg: "0" }}
                // display={{ base: "none", xl: "block" }}
                pos="sticky"
                top="120px"
                h="fit-content"
              >
                <ShoppingSummary

                />
              </chakra.div>
            </chakra.div>
          </chakra.div>
        ) : (
          <div>No cart Items</div>
        )
      )}

      {!cartsLoaded && <div>Loading...</div>}

      {editModal && <EditItem setEditModal={setEditModal} />}
    </VendorDashBoardLayout>
  );
};

export default CartPage;
