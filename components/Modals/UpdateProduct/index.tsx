/* eslint-disable camelcase */
import {
  chakra,
  Spinner,
  useToast,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { getSingleShop, shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import { userData } from "store/slices/user";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

interface ModalProps {
  fetchProduct?: (id) => void;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateProduct = (props: ModalProps) => {
  const { fetchProduct, onClose, isOpen } = props;
  const { user } = useAppSelector(userData);
  const { singleProduct, singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [stock, setStock] = useState({
    quantity: null,
    action_reason: null,
  });
  const [formValues, setFormValues] = useState<any>({
    category_id: null,
    cost_price: 0,
    sell_price: 0,
    restock_alert: null,
    expired_date: null,
    attributes: 0,
    photo: null,
  });
  const [categories, setCategories] = useState([]);
  const [request, setRequest] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (singleProduct.shop.id) {
      // getCategories()
      setFormValues({
        ...formValues,
        cost_price: singleProduct.cost_price,
        sell_price: singleProduct.sell_price,
        restock_alert: singleProduct.restock_alert,
        expired_date: singleProduct.expired_date,
        category_id: singleProduct.category_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProduct.shop]);

  const getCategories = async () => {
    try {
      const cat = await AuthAxios.get(
        `/oga/shop/category/product/index?shop_id=${singleProduct.shop.id}`
      );
      return setCategories(cat.data.data.data);
    } catch (e) {
      return e;
    }
  };

  const updateStock = (action_type: number) => {
    // e.preventDefault();
    if (
      Number(action_type) === 0 &&
      Number(stock.quantity) > Number(singleProduct.stock_count)
    ) {
      return toast({
        description: "Cannot remove more than available stock",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
    setRequest(true);
    return AuthAxios.post(
      `/oga/shop/product/stock/action/create?shop_id=${singleProduct.shop.id}&shop_product_id=${singleProduct.id}&action_type=${action_type}&quantity=${stock.quantity}&action_reason=${stock.action_reason}&user_id=${user?.user.id}`,
    )
      .then((res) => {
        if (res.status === 200) {
          setRequest(false);
          toast({
            description: "Product stock updated",
            status: "success",
            duration: 3000,
            position: "top",
          });
          dispatch<any>(getSingleShop(singleShop.selectedShop.id));
          return fetchProduct(singleProduct.id);
        }
        return res
      })
      .catch((e) => {
        setRequest(false);
        return e;
      });
  };

  const updateProduct = (e: any) => {
    e.preventDefault();
    setRequest(true);
    AuthAxios.put(
      `/oga/shop/product/update/${singleProduct.id}?shop_id=${singleProduct.shop.id
      }&shop_product_id=${singleProduct.id}&product_id=${singleProduct.product_id
      }&category_id=${formValues.category_id}&cost_price=${formValues.cost_price
      }&sell_price=${formValues.sell_price}&restock_alert=${formValues.restock_alert
      }${formValues.photo ? `&photo=${formValues.photo}` : ""}${formValues.expired_date
        ? `&expired_date=${formValues.expired_date}`
        : ""
      }&attributes=0&product_unit_id=${singleProduct.product_unit.id}`
    )
      .then((res) => {
        setRequest(false);
        if (res.status === 200) {
          // getOpenCart();
          toast({
            description: "Product updated successfully",
            status: "success",
            duration: 3000,
            position: "top",
          });
          setTimeout(() => {
            setFormValues({
              category_id: null,
              cost_price: 0,
              sell_price: 0,
              restock_alert: null,
              expired_date: null,
              attributes: 0,
              photo: null,
            });
            onClose();
          }, 1000);
          dispatch<any>(getSingleShop(singleShop.selectedShop.id));
        }
      })
      .catch((err) => {
        setRequest(false);
        return err;
      });
  };

  const closeModal = () => {
    setFormValues({
      category_id: null,
      cost_price: 0,
      sell_price: 0,
      restock_alert: null,
      expired_date: null,
      attributes: 0,
      photo: null,
    });
    onClose();
  };

  return (
    <ModalUI
      open={isOpen}
      close={closeModal}
      heading="Update Shop Product"
      p="20px 0 24px"
    >
      {singleProduct && singleProduct.loaded ? (
        <>
          <chakra.div p="24px">
            <chakra.h5 fontWeight="500" fontSize="0.875rem">
              Update Stock{" "}
              {singleProduct.stock_count === 0 && (
                <chakra.span pl={4} color="red.300">
                  Out of Stock
                </chakra.span>
              )}
            </chakra.h5>

            <chakra.div
              display="grid"
              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gridGap="16px"
              mt="8px"
            >
              <chakra.div display="flex" flexDir="column">
                <chakra.label fontSize="0.75rem" fontWeight="500">
                  Available Stock: {singleProduct.stock_count}
                </chakra.label>

                <chakra.input
                  w="full"
                  name="stock"
                  type="number"
                  fontSize="14px"
                  px="16px"
                  mt="1px"
                  placeholder="0"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  inputMode="numeric"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  onChange={(e) =>
                    setStock({
                      ...stock,
                      quantity: e.target.value,
                    })
                  }
                />
              </chakra.div>
              {/* <chakra.div display="flex" flexDir="column" fontSize="0.75rem">
                <chakra.label fontSize="0.75rem" fontWeight="500">
                  Select stock action
                </chakra.label>
                <chakra.select
                  name="stock-action"
                  fontSize="14px"
                  px="16px"
                  mt="1px"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  value={stock.action_type}
                  onChange={(e) =>
                    setStock({
                      ...stock,
                      action_type: Number(e.target.value),
                    })
                  }
                >
                  <option value={1}>Increase</option>
                  <option value={0}>Decrease</option>
                </chakra.select>

                <RadioGroup
                  mt="10px"
                  display="grid"
                  gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr" }}
                  gridGap="16px"
                  value={stock.action_type}
                  onClick={(e) =>
                    setStock({
                      ...stock,
                      // action_type: Number(e.target.value),
                      action_type: Number(
                        (e.target as HTMLButtonElement).value
                      ),
                    })
                  }
                >
                  <Radio colorScheme="green" value={1}>
                    Stock In
                  </Radio>
                  <Radio colorScheme="red" value={0}>
                    Deduct
                  </Radio>
                </RadioGroup>
              </chakra.div>
               */}
            </chakra.div>
            <chakra.div
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <chakra.button
                onClick={() => updateStock(1)}
                w="40%"
                disabled={request}
                bg="#2153CC"
                color="white"
                borderRadius="5px"
                mt="10px"
                h="48px"
                _focus={{ outline: "4px solid #9CAAF5" }}
                fontSize="14px"
                fontWeight="600"
              >
                {request ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <chakra.p fontWeight="600" fontSize="14px">
                    Stock In
                  </chakra.p>
                )}
              </chakra.button>

              <chakra.button
                onClick={() => updateStock(0)}
                w="40%"
                disabled={request}
                bg="#2153CC"
                color="white"
                borderRadius="5px"
                mt="10px"
                h="48px"
                _focus={{ outline: "4px solid #9CAAF5" }}
                fontSize="14px"
                fontWeight="600"
              >
                {request ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <chakra.p fontWeight="600" fontSize="14px">
                    Deduct
                  </chakra.p>
                )}
              </chakra.button>
            </chakra.div>
          </chakra.div>

          <chakra.form
            onSubmit={(e) => updateProduct(e)}
            mt="24px"
            p="24px"
            borderTop="1px solid #EEE"
          >
            <chakra.h5 fontWeight="500" fontSize="0.875rem">
              Update Product Detail
            </chakra.h5>

            <chakra.div
              display="grid"
              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gridGap="16px"
              mt="8px"
            >
              <chakra.div display="flex" flexDir="column">
                <chakra.label fontSize="0.75rem" fontWeight="500">
                  Product cost price
                </chakra.label>
                {/* <NumberInput defaultValue={singleProduct.cost_price}>
                  <NumberInputField
                  />
                </NumberInput> */}
                <chakra.input
                  name="unit-cost-price"
                  fontSize="14px"
                  px="16px"
                  mt="1px"
                  placeholder="Enter unit cost price"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  inputMode="numeric"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  value={formValues.cost_price}
                  onChange={(e) => {
                    if (Number(e.target.value) > singleProduct.sell_price) {
                      return setFormValues({
                        ...formValues,
                        cost_price: Number(singleProduct.sell_price)
                      })
                    }
                    return setFormValues({
                      ...formValues,
                      cost_price:
                        Number(e.target.value) < 0
                          ? 0
                          : Number(e.target.value),
                    })
                  }}

                />
              </chakra.div>
              <chakra.div display="flex" flexDir="column">
                <chakra.label fontSize="0.75rem" fontWeight="500">
                  Product selling price
                </chakra.label>
                {/* <NumberInput defaultValue={singleProduct.sell_price}>
                  <NumberInputField
                  />
                </NumberInput> */}
                <chakra.input
                  name="unit-sell-price"
                  fontSize="14px"
                  px="16px"
                  mt="1px"
                  placeholder="Enter unit selling price"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  inputMode="numeric"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  value={formValues.sell_price}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      sell_price:
                        Number(e.target.value) < 0
                          ? 0
                          : Number(e.target.value),
                    })
                  }
                />
              </chakra.div>
              <chakra.div display="flex" flexDir="column">
                <chakra.label fontSize="0.75rem" fontWeight="500">
                  Set Expiry date -Optional:{" "}
                  {singleProduct.expired_date !== null &&
                    new Date(singleProduct.expired_date).toLocaleDateString()}
                </chakra.label>
                <chakra.input
                  name="expiry-date"
                  type="date"
                  fontSize="14px"
                  px="16px"
                  mt="1px"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  w="full"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      expired_date: new Date(e.target.value).toISOString(),
                    })
                  }
                />
              </chakra.div>
              <chakra.div display="flex" flexDir="column">
                <chakra.label fontSize="0.75rem" fontWeight="500">
                  Restock Alert level: {singleProduct.restock_alert}
                </chakra.label>
                <NumberInput defaultValue={singleProduct.restock_alert}>
                  <NumberInputField
                    name="restock-level"
                    fontSize="14px"
                    px="16px"
                    mt="1px"
                    placeholder="Enter unit restock level"
                    border="1px solid rgba(154, 161, 174, 0.3)"
                    borderRadius="12px"
                    inputMode="numeric"
                    h="44px"
                    _focus={{ border: "1px solid #1739E8", outline: "none" }}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        restock_alert: Number(e.target.value),
                      })
                    }
                  />
                </NumberInput>
              </chakra.div>
            </chakra.div>
            <chakra.div display="flex" justifyContent="center">
              <chakra.button
                w="80%"
                disabled={request}
                bg="#2153CC"
                color="white"
                borderRadius="5px"
                mt="24px"
                h="48px"
                _focus={{ outline: "4px solid #9CAAF5" }}
              >
                {request ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <chakra.p fontWeight="600" fontSize="14px">
                    Update Product and Close
                  </chakra.p>
                )}
              </chakra.button>
            </chakra.div>
          </chakra.form>
        </>
      ) : (
        <chakra.div display="flex" justifyContent="center">
          <Spinner alignItems="center" />
        </chakra.div>
      )}
    </ModalUI>
  );
};

export default UpdateProduct;
