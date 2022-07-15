import { FC, useEffect, useState } from "react";
import {
  chakra,
  Spinner,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { AdditionIcon, PencilIcon, SubtractionIcon } from "public/assets";
import { shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import { addToCart, cartsData, getOpenCart } from "store/slices/carts";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CartItem: FC<Props> = ({ isOpen, onClose }) => {
  const { carts } = useAppSelector(cartsData);
  const { singleShop, singleProduct } = useAppSelector(shopsData);
  const dispatch = useAppDispatch()
  const [price, setPrice] = useState<any>(0);
  const [productNote, setProductNote] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [isRequest, setIsRequest] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (singleShop.selectedShop.shop_id) {
      setPrice(singleProduct.sell_price);
      setProductQuantity(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleShop, isOpen]);
  

  const addItemToCart = async () => {
    setIsRequest(true);
    try {
      const item = carts.length ? carts[0].cart_items.find(i => i.shop_product_id === singleProduct.id) : null;
      const res: { data: any } | any = await dispatch<any>(addToCart(
        {
          quantity: productQuantity,
          amount: singleProduct.sell_price * productQuantity,
          shopProductId: singleProduct.id,
          content: productNote,
          shopId: singleShop.selectedShop.shop_id,
          cartLength: carts.length ? carts[0].cart_items?.length : 0,
          cartId: carts[0]?.id,
          itemInCart: !!item,
          itemId: item ? item.id : null
        }
      ));
      if(res.payload) {
        dispatch<any>(getOpenCart(singleShop.selectedShop.shop_id))
        toast({
          description: res.payload.message || "Item added to Cart",
            // res.payload.message.includes("already exist")
            //   ? res.payload.message
            //   : "Item added to Cart",
          status: "success",
          duration: 1000,
          position: "top",
        });
        setIsRequest(false);
        return onClose();
      }
      return res;
    } catch (error) {
      console.log(error)
      return error
    }
  };

  return (
    <ModalUI
      open={isOpen}
      close={onClose}
      heading="Add to Cart"
      maxW="302px"
    >
      <chakra.div>
        <chakra.img
          src={
            singleProduct.shop_product_images?.length
              ? singleProduct.shop_product_images[0]?.photo
              : singleProduct.product_unit?.photo
          }
          alt="image"
          style={{
            width: "75.84px",
            height: "75.84px",
            borderRadius: "4px",
            margin: "0 3px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        />

        <chakra.p
          fontSize="13.76px"
          fontWeight="600"
          color="#757575"
          marginTop="10px"
        >
          Set Quantity
        </chakra.p>
        <chakra.div display="flex" justifyContent="space-between" alignItems="center">
          <chakra.div>
            <InputGroup minW="115px">
              {productQuantity >= 1 && (
                <chakra.button
                  onClick={() => setProductQuantity((num: number) => num - 1)}
                >
                  <InputLeftElement>
                    <SubtractionIcon />
                  </InputLeftElement>
                </chakra.button>
              )}

              <Input type="number" onChange={e => {
                if(Number(e.target.value) > singleProduct.stock_count) {
                  return setProductQuantity(singleProduct.stock_count)
                }
                return setProductQuantity(Number(e.target.value))
              }} value={productQuantity} textAlign="center" />

              {productQuantity < singleProduct.stock_count && (
                <chakra.button
                  onClick={() => setProductQuantity((num: number) => num + 1)}
                >
                  <InputRightElement>
                    <AdditionIcon />
                  </InputRightElement>
                </chakra.button>
              )}
            </InputGroup>
            <chakra.p
              fontSize="8px"
              fontWeight="500"
              color="#000000"
              opacity="54%"
              margin="3px 0"
            >
              Min. purchase of 30 pcs
            </chakra.p>
          </chakra.div>
          <chakra.div w="full" ml="24px">
            <chakra.p color="#FB8200" fontWeight="600" fontSize="14px">
              {singleProduct.stock_count} Available
            </chakra.p>
          </chakra.div>
        </chakra.div>
        <chakra.div display="flex" style={{ margin: "10px 0" }}>
          <InputGroup w="100%">
            <InputRightElement>
              <PencilIcon />
            </InputRightElement>

            <Input
              w="100%"
              placeholder="Add a note here"
              _placeholder={{
                fontWeight: "500",
                fontSize: "12px",
                color: "#757575",
                textDecoration: "underline",
              }}
              outline="none"
              padding="5px 0"
              onChange={(e) => setProductNote(e.target.value)}
            />
          </InputGroup>
        </chakra.div>
        <chakra.div display="flex" justifyContent="space-between" alignItems="center">
          <chakra.div>
            <chakra.p fontWeight="600" fontSize="12px" color="#2153CC">
              Total: &#x20A6;
            </chakra.p>
          </chakra.div>
          <chakra.div>
            <chakra.input
              value={price * productQuantity}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              width="83px"
              height="28px"
              border="0.4px solid #B3B3B3"
              borderRadius="4px"
              textAlign="center"
              fontSize="14px"
              fontWeight="600"
              color="#333333"
            />
          </chakra.div>
        </chakra.div>

        <chakra.div margin="14px 0">
          <chakra.button
            onClick={() => addItemToCart()}
            width="100%"
            height="43.13px"
            background="#2153CC"
            borderRadius="5.28px"
            padding="11.47px"
            margin="0 auto"
          >
            {isRequest ? (
              <Spinner color="#fff" size="sm" />
            ) : (
              <chakra.p fontSize="16px" fontWeight="600" color="#ffffff">
                Add to cart
              </chakra.p>
            )}
          </chakra.button>
        </chakra.div>
        {/* <chakra.div margin="14px 0">
          <chakra.button
            width="100%"
            height="43.13px"
            background="#ffffff"
            borderRadius="5.28px"
            border="1.61556px solid rgba(33, 83, 204, 0.5)"
            padding="11.47px"
            margin="0 auto"
          >
            {isRequest ? (
              <Spinner color="#2153CC" size="sm" />
            ) : (
              <chakra.p fontSize="16px" fontWeight="600" color="#2153CC">
                Remove Item
              </chakra.p>
            )}
          </chakra.button>
        </chakra.div> */}
      </chakra.div>
    </ModalUI>
  );
};

export default CartItem;
