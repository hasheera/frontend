/* eslint-disable camelcase */
import { chakra, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  CartCircularIcon,
  EditCircularIcon,
  StockInCircularIcon,
  StockOutCircularIcon,
  DeleteIcon,
  TransferCircularIcon
} from "public/assets";
import UpdateProduct from "@components/Modals/UpdateProduct";
import CartItem from "@components/Modals/CartItem";
import Transfer from "@components/Modals/TransferProduct";
import CreateShopProductImage from "@components/Modals/CreateShopProductImage";
import DeleteProductDialog from "@components/AlertDialog/DeleteProduct";
import { setSingleProduct, shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import AuthAxios from "@utils/api/authAxios";
import { formatNum, formatPrice } from "../../utils/helpers";

const ProductGridView = ({ shopProducts }) => {
  const { batchType, singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch();
  const [deleteShopProductId, setDeleteShopProductId] = useState<any>(null);
  const updateProduct = useDisclosure();
  const cartItemModal = useDisclosure();
  const transferModal = useDisclosure();
  const createPhotoModal = useDisclosure();
  const deleteProductDialog = useDisclosure();

  const handleProduct = (product, type: string) => {
    dispatch(setSingleProduct(product));

    if (type === "edit product") {
      updateProduct.onOpen();
    }

    if (type === "transfer") {
      transferModal.onOpen();
    }

    if (type === "checkout") {
      cartItemModal.onOpen();
    }

    if (type === "promote") {
      createPhotoModal.onOpen();
    }

    // if (type === "transfer") {
    //   return productTransfer.onOpen();
    // }
  };

  const fetchProduct = async (id) => {
    try {
      const res = await AuthAxios.get(`oga/shop/product/show/${id}?shop_id=${singleShop.selectedShop.id}`)
      if (res.status === 200) {
        dispatch(setSingleProduct(res.data.data));
      }
      return res
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <chakra.div
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap="24px"
        p={{ base: "10px 0", lg: "22px 0" }}
      // bg="#FAFAFA"
      >
        {shopProducts?.data.map(
          ({
            id,
            product_id,
            product,
            shop_product_images,
            product_unit,
            cost_price,
            sell_price,
            stock_count,
            shop,
            restock_alert,
            expired_date,
            category_id,
          }: any) => (
            <chakra.div
              key={id}
              w="100%"
              maxW="240px"
              // h="300px"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              title={product.name}
              borderRadius="8px"
              bg="#fff"
              p="16px"
            >
              <chakra.img
                w="100%"
                h="156px"
                borderRadius="8px"
                objectFit="cover"
                src={
                  shop_product_images.length
                    ? shop_product_images[0]?.photo
                    : product_unit.photo
                }
                alt="product"
              />

              <chakra.div mt="4.48px">
                <chakra.p
                  fontSize="0.75rem"
                  fontWeight="500"
                  textDecoration="underline"
                  css={{
                    "::first-letter": { textTransform: "capitalize" },
                  }}
                >
                  {product_unit.name}
                </chakra.p>
                <chakra.p fontSize="0.75rem">
                  {product.name.length > 54
                    ? `${product.name.slice(0, 50)}...`
                    : product.name}
                </chakra.p>
              </chakra.div>

              <chakra.div mt="4px">
                <chakra.p fontSize="1rem" fontWeight="700" color="#2153CC">
                  &#x20A6;{formatPrice(sell_price)}
                </chakra.p>

                <chakra.div
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  mt="6px"
                >
                  <chakra.p fontSize="0.825rem" fontWeight="500" color="#000">
                    {formatNum(stock_count)} stock left
                  </chakra.p>
                  {batchType === "checkout" && (
                    <chakra.button
                      onClick={() => {
                        handleProduct(
                          {
                            id,
                            product_id,
                            shop,
                            cost_price,
                            sell_price,
                            stock_count,
                            restock_alert,
                            expired_date,
                            product,
                            product_unit,
                            category_id,
                          },
                          "checkout"
                        );
                      }}
                      disabled={!stock_count || !sell_price}
                      _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                      cursor="pointer"
                    >
                      <CartCircularIcon />
                    </chakra.button>
                  )}
                  {batchType === "transfer" && (
                    <chakra.button
                      onClick={() => {
                        handleProduct(
                          {
                            id,
                            product_id,
                            shop,
                            cost_price,
                            sell_price,
                            stock_count,
                            restock_alert,
                            expired_date,
                            product,
                            product_unit,
                            category_id,
                          },
                          "transfer"
                        );
                      }}
                      disabled={stock_count === 0}
                      _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                      cursor="pointer"
                    >
                      <TransferCircularIcon />
                    </chakra.button>
                  )}
                  {batchType === "promote" && (
                    <chakra.button
                      onClick={() => {
                        handleProduct(
                          {
                            id,
                            product_id,
                            shop,
                            cost_price,
                            sell_price,
                            stock_count,
                            restock_alert,
                            expired_date,
                            product,
                            product_unit,
                            category_id,
                          },
                          "promote"
                        );
                      }}
                    >
                      <StockInCircularIcon />
                    </chakra.button>
                  )}
                  {batchType === "stock-out" && (
                    <chakra.button
                      disabled={stock_count === 0}
                      _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                      cursor="pointer"
                    >
                      <StockOutCircularIcon />
                    </chakra.button>
                  )}
                  {batchType === "delete-product" && (
                    <chakra.button
                      onClick={() => {
                        deleteProductDialog.onOpen();
                        setDeleteShopProductId(id);
                      }}
                    >
                      <DeleteIcon />
                    </chakra.button>
                  )}
                  {batchType === "edit-product" && (
                    <chakra.button
                      cursor="pointer"
                      onClick={() =>
                        handleProduct(
                          {
                            id,
                            product_id,
                            shop,
                            shop_product_images,
                            cost_price,
                            sell_price,
                            stock_count,
                            restock_alert,
                            expired_date,
                            product_unit,
                            category_id,
                          },
                          "edit product"
                        )
                      }
                    >
                      <EditCircularIcon />
                    </chakra.button>
                  )}
                </chakra.div>
              </chakra.div>
            </chakra.div>
          )
        )}
      </chakra.div>
      <UpdateProduct isOpen={updateProduct.isOpen} onClose={updateProduct.onClose} fetchProduct={fetchProduct} />
      <CartItem isOpen={cartItemModal.isOpen} onClose={cartItemModal.onClose} />
      <Transfer isOpen={transferModal.isOpen} onClose={transferModal.onClose} />
      <CreateShopProductImage isOpen={createPhotoModal.isOpen} onClose={createPhotoModal.onClose} />
      <DeleteProductDialog
        isOpen={deleteProductDialog.isOpen}
        onClose={deleteProductDialog.onClose}
        deleteShopProductId={deleteShopProductId}
      />
    </>
  );
};

export default ProductGridView;
