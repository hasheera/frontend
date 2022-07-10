/* eslint-disable camelcase */
import {
  chakra,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spinner,
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { formatPrice } from "@utils/helpers";
import { useAppDispatch, useAppSelector } from "hooks";
import { addToCart, cartsData, getOpenCart } from "store/slices/carts";
import AuthAxios from "@utils/api/authAxios";
import { shopsData } from "store/slices/shops";

interface CartItem {
  id: number;
  image: string;
  shop_product_id: number;
  shop_product: {
    sell_price: number;
    product_unit: { slug: string };
    stock_count: number;
  };
  quantity: number;
  price: number;
}

const CurrentCart = () => {
  const { singleShop } = useAppSelector(shopsData);
  const { carts } = useAppSelector(cartsData);
  const dispatch = useAppDispatch();
  const [isRequest, setIsRequest] = useState(false);
  const toast = useToast();

  const cumPrice = (c) => {
    const num = c.map((i) => i.price);
    return num.reduce((a, b) => a + b);
  };

  const checkOut = async () => {
    try {
      setIsRequest(true);
      const res = await AuthAxios.post(
        `/oga/cart/checkout?cart_id=${carts[0].id}&customer_name=3&created_for=07033008888&shipping_address_id=8`
      );

      if (res.status === 200) {
        setIsRequest(false);
        if (res.data.status === 403) {
          return toast({
            description:
              res.data.message.charAt(0).toUpperCase() +
              res.data.message.slice(1),
            status: "error",
            duration: 1000,
            position: "top",
          });
        }
        if (res.data.status === 401) {
          return toast({
            description:
              res.data.message.charAt(0).toUpperCase() +
              res.data.message.slice(1),
            status: "error",
            duration: 1500,
            position: "top",
          });
        }
        dispatch<any>(getOpenCart(singleShop.selectedShop.id));
        // setOpenCart({
        //   id: null,
        //   is_shop_owner: null,
        //   cart_items: [],
        //   loaded: false,
        // });
        // setOrders({ ...res.data.data.order, loaded: true });
        toast({
          description: "Checkout successful",
          status: "success",
          duration: 1000,
          position: "top",
        });
      }
      return res;
    } catch (e) {
      setIsRequest(false);
      toast({
        description: "Checkout unsuccessful",
        status: "error",
        duration: 1500,
        position: 'top',
      })
      return e
    }
  };

  return (
    <chakra.div>
      {carts[0].cart_items.length > 0 ? (
        <chakra.div
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          h="full"
        >
          <chakra.div
            h="calc(90vh - 200px)"
            overflowY="scroll"
            mt="4"
            className="custom-scroll"
          >
            <Accordion
              allowToggle
              w="full"
              overflowY="scroll"
              className="custom-scroll"
            >
              {carts[0].cart_items.length > 0 &&
                carts[0].cart_items.map((item: CartItem) => (
                  <CartItem
                    key={item.id}
                    itemId={item.id}
                    image="/assets/image/logo.png"
                    productId={item.shop_product_id}
                    itemName={item.shop_product?.product_unit.slug
                      .split("-")
                      .join(" ")}
                    // subQuantity={item.quantity}
                    // price={item.shop_product.sell_price}
                    sell={item.shop_product.sell_price}
                    qty={item.quantity}
                    subTotal={item.price}
                    stock_count={item.shop_product?.stock_count}
                    shopOwner={carts[0].is_shop_owner}
                  />
                ))}
            </Accordion>
          </chakra.div>

          <chakra.div
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            h="fit-content"
            borderRadius="0 0 10px 10px"
            flexWrap="wrap"
            borderTop="1px solid #EEE"
          >
            <chakra.div
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="20px 0"
            >
              <chakra.p fontWeight="500">
                {carts[0].cart_items.length} Item
                {carts[0].cart_items.length > 1 ? "s" : ""}
              </chakra.p>
              <chakra.p
                fontWeight="600"
                fontSize="1rem"
                ml="20px"
                w="fit-content"
                color="#212429"
              >
                &#8358;{formatPrice(cumPrice(carts[0].cart_items))}
              </chakra.p>
            </chakra.div>
            <chakra.button
              disabled={isRequest}
              onClick={checkOut}
              bg="#1739E8"
              borderRadius="12px"
              h="56px"
              cursor="pointer"
            >
              {isRequest ? (
                <Spinner color="white" />
              ) : (
                <>
                  <chakra.span color="white" mr="12px">
                    Checkout
                  </chakra.span>
                  {/* <FontAwesomeIcon icon={faArrowRight} color="white"/> */}
                </>
              )}
            </chakra.button>
          </chakra.div>
        </chakra.div>
      ) : (
        <chakra.div mx={{ base: "12px", sm: "28px" }}>
          <chakra.p fontWeight="500" textAlign="center" mt="48px">
            Cart is empty
          </chakra.p>
        </chakra.div>
      )}
    </chakra.div>
  );
};

export default CurrentCart;

export const CartItem = ({
  itemName,
  // subQuantity,
  // price,
  qty,
  image,
  subTotal,
  productId,
  stock_count,
  sell,
  itemId,
  shopOwner,
}: any) => {
  const { singleShop, hasShopRole } = useAppSelector(shopsData);
  const { carts } = useAppSelector(cartsData);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(qty);
  const [subAmount, setSubAmount] = useState(subTotal);
  const [productNote, setProductNote] = useState(" ");
  const [isRequest, setIsRequest] = useState(false);
  const toast = useToast();

  // const shopRole = () => {
  //   const shopRoles = [
  //     "cashier",
  //     "manager",
  //     "inventoryManager",
  //     "accountant",
  //     "shopOwner",
  //   ];
  //   const adminRoles = ["subSupperAdmin", "supperAdmin"];
  //   const userRoles = user?.user.roles.map((r: { name: string }) => r.name);

  //   if (userRoles) {
  //     return userRoles.some((role: string) => shopRoles.includes(role)) ||
  //       userRoles.some((role: string) => adminRoles.includes(role));
  //   }
  // };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: sell,
      defaultValue: subAmount,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const removeFromCart = async (id: number) => {
    try {
      const res = await AuthAxios.delete(`/oga/cart-item/delete/${id}`);
      toast({
        description: res.data.data,
        status: "info",
        duration: 1000,
        position: "top",
      });
      return dispatch<any>(getOpenCart(singleShop.selectedShop.id));
    } catch (e) {
      return e
    }
  };

  const deleteCart = async () => {
    try {
      const res = await AuthAxios.delete(`/oga/cart/delete/${carts[0].id}`);
      toast({
        description: res.data.data.message,
        status: "info",
        duration: 1000,
        position: "top",
      });
      return dispatch<any>(getOpenCart(singleShop.selectedShop.id));
    } catch (e) {
      return e;
    }
  };

  const updateCart = async (
    // cartsId: any,
    // productId: any,
    // quantity: any,
    // subAmount: any,
    // itemId: any,
    // shopOwner: number
  ) => {
    try {
      setIsRequest(true);
      const res: any = await dispatch<any>(addToCart({
        quantity,
        amount: subAmount,
        shopProductId: productId,
        shopId: singleShop.selectedShop.id,
        cartLength: carts[0].cart_items.length,
        cartId: carts[0].id,
        itemInCart: true,
        content: "",
        itemId
      }));
      if (res.payload.success) {
        dispatch<any>(getOpenCart(singleShop.selectedShop.id))
        setIsRequest(false);
        toast({
          description: res.payload.message,
          status: "success",
          duration: 1000,
          position: "top",
        });
      }
      return res;
    } catch (e) {
      setIsRequest(false);
      return e;
    }
  };

  return (
    <AccordionItem
      w="full"
      bg="white"
      px="12px"
      borderRadius="12px"
      border="none"
      _hover={{
        bg: "white",
        border: "1px solid #1739E8",
      }}
    >
      <AccordionButton
        pl="0"
        _hover={{
          bg: "white"
        }}
        _focus={{
          boxShadow: "none",
        }}
        _expanded={{ borderBottom: "1px solid #1739E8" }}
      >
        <chakra.div
          css={{
            "& img": {
              borderRadius: "12px"
            }
          }}
        >
          <chakra.img
            src={image}
            width={127}
            height={112}
            alt=""
          />
        </chakra.div>

        <chakra.div w="full" ml="12px">
          <chakra.p
            color="#212429"
            fontWeight="500"
            fontSize="0.875rem"
            textTransform="capitalize"
            textAlign="left"
          >
            {itemName}
          </chakra.p>
          <chakra.p fontWeight="600" mt="10px" textAlign="left">
            &#8358; {formatPrice(subAmount)}
          </chakra.p>
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb="16px" display="grid">
        <chakra.div
          onClick={() =>
            carts[0].cart_items.length > 1 ? removeFromCart(itemId) : deleteCart()
          }
          ml="auto"
          cursor="pointer"
        >
          {/* <FontAwesomeIcon icon={faTimes} color="#F03D3E" /> */}
        </chakra.div>
        <chakra.div borderBottom="1px solid #EEE" pb="12px">
          <chakra.p fontSize="0.75rem" color="#777">
            Modify cart quantity
          </chakra.p>
          <chakra.div
            mt="4px"
            display="grid"
            alignItems="center"
            gridTemplateColumns="40px 1fr 40px"
            gridColumnGap="20px"
          >
            {quantity > 0 && (
              <chakra.button
                onClick={() => {
                  setQuantity(quantity - 1);
                  setSubAmount((quantity - 1) * sell);
                }}
                gridColumnStart="1"
                fontWeight="500"
                fontSize="1rem"
                minW="40px"
                h="40px"
                borderRadius="10px"
                border="1px solid #1739E8"
                color="#1739E8"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...dec}
              >
                -
              </chakra.button>
            )}
            <chakra.input
              onKeyPress={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              onChange={(e) => {
                if (e.target.value > stock_count)
                  return setQuantity(stock_count);
                return setQuantity(Number(e.target.value));
              }}
              gridColumnStart="2"
              justifySelf="center"
              fontWeight="500"
              fontSize="1rem"
              w="100%"
              textAlign="center"
              h="40px"
              borderRadius="10px"
              border="1px solid #EEE"
              _focus={{ border: "1px solid #EEE", outline: "none" }}
              value={quantity}
            />
            {quantity < stock_count && (
              <chakra.button
                onClick={() => {
                  setQuantity(quantity + 1);
                  setSubAmount((quantity + 1) * sell);
                }}
                gridColumnStart="3"
                fontWeight="500"
                fontSize="1rem"
                minW="40px"
                h="40px"
                borderRadius="10px"
                border="1px solid #1739E8"
                color="#1739E8"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...inc}
              >
                +
              </chakra.button>
            )}
          </chakra.div>
        </chakra.div>
        <chakra.input
          onChange={(e) => {
            setProductNote(e.target.value);
          }}
          fontSize="0.875rem"
          w="100%"
          px="16px"
          my="16px"
          placeholder="Add Note here"
          h="40px"
          borderRadius="10px"
          border="1px solid #EEE"
          _focus={{ border: "1px solid #1739E8", outline: "none" }}
        />
        <chakra.div mt="2">
          {hasShopRole && (
            <chakra.p fontWeight="500" fontSize="0.875rem">
              Set Custom price:
            </chakra.p>
          )}
          <chakra.div
            display="grid"
            gridTemplateColumns={{ sm: hasShopRole ? "2fr 1fr" : "1fr" }}
            gridGap="4"
          >
            {hasShopRole && (
              <chakra.div w="full">
                <chakra.input
                  onChange={(e: any) =>
                    setSubAmount((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  pl="2"
                  fontSize="14px"
                  px="16px"
                  maxLength={11}
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  inputMode="numeric"
                  w="full"
                  h="44px"
                  readOnly={!shopOwner}
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  value={subAmount}
                // defaultValue={subAmount}
                />
              </chakra.div>
            )}
            <chakra.button
              onClick={() =>
                updateCart()
                // updateCart(
                //   carts[0].id,
                //   productId,
                //   quantity,
                //   subAmount,
                //   itemId,
                //   shopOwner
                // )
              }
              bg="#1739E8"
              borderRadius="12px"
              h="44px"
              cursor="pointer"
              color="white"
              fontWeight="500"
              fontSize="0.875rem"
            >
              {isRequest ? (
                <Spinner size="sm" />
              ) : (
                <chakra.span color="white" fontSize="0.876rem">
                  Update cart
                </chakra.span>
              )}
            </chakra.button>
          </chakra.div>
        </chakra.div>
      </AccordionPanel>
    </AccordionItem>
  );
};
