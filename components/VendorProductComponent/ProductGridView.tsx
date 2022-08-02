/* eslint-disable camelcase */
import { chakra, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CartCircularIcon,
  EditCircularIcon,
  StockInCircularIcon,
  StockOutCircularIcon,
  DeleteIcon,
  TransferCircularIcon,
  PagiPrev,
  PagiNext
} from "public/assets";
import UpdateProduct from "@components/Modals/UpdateProduct";
import CartItem from "@components/Modals/CartItem";
import Transfer from "@components/Modals/TransferProduct";
import CreateShopProductImage from "@components/Modals/CreateShopProductImage";
import DeleteProductDialog from "@components/AlertDialog/DeleteProduct";
import { getSingleShop, setSearchProducts, setSingleProduct, shopsData } from "store/slices/shops";
import { useAppDispatch, useAppSelector } from "hooks";
import AuthAxios from "@utils/api/authAxios";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const handleProduct = (product, type: string) => {
    dispatch(setSingleProduct(product));

    if (type === "edit-product") {
      updateProduct.onOpen();
    }

    if (type === "transfer") {
      transferModal.onOpen();
    }

    if (type === "checkout") {
      cartItemModal.onOpen();
    }

    if (type === "photo") {
      createPhotoModal.onOpen();
    }

    // if (type === "transfer") {
    //   return productTransfer.onOpen();
    // }
  };

  const fetchProduct = async (id) => {
    try {
      const res = await AuthAxios.get(`oga/shop/product/show/${id}?shop_id=${singleShop.selectedShop.shop_id}`)
      if (res.status === 200) {
        dispatch(setSingleProduct(res.data.data));
      }
      return res
    } catch (error) {
      return error
    }
  }

  const cardCursor = (batch: string, stock: number, sell: number) => {
    if (["checkout", "transfer", "stock-out"].includes(batch) && !stock) {
      return "not-allowed"
    }
    if (batchType === "checkout" && !sell) {
      return "not-allowed"
    }
    return "pointer"
  }

  const goToPage = (url: string) => {
    AuthAxios.get(`${url}&shop_id=${singleShop.selectedShop.shop_id}`)
      .then((res) => {
        dispatch(setSearchProducts({
          ...singleShop,
          shopData: { ...res.data.data }
        }));
      })
      .catch((e) => e);
  };

  useEffect(() => {
    if(!router.query.page) {
      router.replace({
        ...router,
        query: {
          ...router.query,
          page: 1
        }
      })
    }

    if(router.query.page && Number(router.query.page) !== shopProducts?.current_page) {
      dispatch<any>(getSingleShop(singleShop.selectedShop.id));
    }
  }, [router])
  

  return (
    <>
      {shopProducts?.data.length > 0 ? (
        <>
          <chakra.div
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
            justifyItems="center"
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
                  onClick={() => {
                    if (batchType === "delete-product") {
                      deleteProductDialog.onOpen();
                      return setDeleteShopProductId(id);
                    }
                    if (["checkout", "transfer", "stock-out"].includes(batchType) && !stock_count) {
                      return null
                    }
                    if (batchType === "checkout" && !sell_price) {
                      return null
                    }
                    return handleProduct(
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
                      batchType
                    );
                  }}
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
                  cursor={cardCursor(batchType, stock_count, sell_price)}
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
                    {/* <chakra.p
                      fontSize="0.75rem"
                      fontWeight="500"
                      textDecoration="underline"
                      css={{
                        "::first-letter": { textTransform: "capitalize" },
                      }}
                    >
                      {product_unit.name}
                    </chakra.p> */}
                    <chakra.p fontSize="0.75rem" textTransform="capitalize">
                      {product.name.length > 54
                        ? `${product.name.slice(0, 50)}... - ${product_unit.name}`
                        : `${product.name} - ${product_unit.name}`}
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
                        <CartCircularIcon />
                      )}
                      {batchType === "transfer" && (
                        <TransferCircularIcon />
                      )}
                      {batchType === "photo" && (
                        <StockInCircularIcon />
                      )}
                      {batchType === "stock-out" && (
                        <StockOutCircularIcon />
                      )}
                      {batchType === "delete-product" && (
                        <DeleteIcon />
                      )}
                      {batchType === "edit-product" && (
                        <EditCircularIcon />
                      )}
                    </chakra.div>
                  </chakra.div>
                </chakra.div>
              )
            )}
          </chakra.div>
          <chakra.div
            h="41.68px"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg="white"
          >
            <chakra.div display="flex" alignItems="center">
              <chakra.p fontSize="12px" fontWeight="500" color="#506176" ml="10px">
                Showing:
              </chakra.p>
              <chakra.p
                color="#1E2134"
                fontWeight="400"
                fontSize="10.42px"
                letterSpacing="0.2605px"
                px="10px"
              >
                {`${shopProducts?.from} - ${shopProducts?.to} of ${shopProducts?.total}`}
              </chakra.p>
            </chakra.div>

            <chakra.div display="flex" alignItems="center" justifyContent="space-between">
              <chakra.button
                disabled={!shopProducts?.first_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: 1 } })}
              >
                First page
              </chakra.button>
              <chakra.button
                disabled={!shopProducts?.prev_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: shopProducts.current_page - 1 } })}
              >
                <PagiPrev />
              </chakra.button>
              <chakra.p
                color="#1E2134"
                fontWeight="600"
                fontSize="12px"
                letterSpacing="0.2605px"
                px="10px"
              >
                {shopProducts?.current_page}
              </chakra.p>
              <chakra.button
                disabled={!shopProducts?.next_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                onClick={() => router.push({ ...router, query: { ...router.query, page: shopProducts.current_page + 1 } })}
              >
                <PagiNext />
              </chakra.button>
              <chakra.button
                disabled={!shopProducts?.last_page_url}
                cursor="pointer"
                _disabled={{ cursor: "not-allowed" }}
                px="10px"
                fontSize="0.75rem"
                onClick={() => router.push({ ...router, query: { ...router.query, page: shopProducts?.last_page } })}
              >
                Last page
              </chakra.button>
            </chakra.div>
          </chakra.div>
        </>
      ) : (
        <chakra.div textAlign="center" mt="20px">No results were returned</chakra.div>
      )}
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
