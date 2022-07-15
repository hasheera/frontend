/* eslint-disable camelcase */
import React, { FC, useState } from "react";
import { chakra, Input, Spinner, useToast } from "@chakra-ui/react";
import AuthAxios from "@utils/api/authAxios";
import { shopsData } from "store/slices/shops";
import { useAppSelector } from "hooks";
import ModalUI from "..";
import StockIn from "./StockIn";
import AddCustomPhotos from "./AddCustomPhoto";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: { id: any };
  product_unit: { id: any };
}

const AddProduct: FC<Props> = ({ isOpen, onClose, product, product_unit }) => {
  const { singleShop } = useAppSelector(shopsData);
  const toast = useToast();
  const [modalStage, setModalStage] = useState<string>("add_product");
  const [productData, setProductData] = useState<any>({});
  const [isRequest, setIsRequest] = useState(false);
  const [form, setForm] = useState({
    product_id: product?.id,
    product_unit_id: product_unit?.id,
    sell_price: 0,
    cost_price: 0,
    restock_alert: 1,
    category_id: 1,
    expired_date: null,
    other_details: "",
    attributes: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AuthAxios.post("/oga/shop/product/create", {
        shop_id: Number(singleShop.selectedShop.shop_id),
        ...form,
      });

      if (res.status === 200) {
        if (res.data.data.status === "error") {
          onClose();
          toast({
            description: res.data.data.message,
            status: "info",
            duration: 3000,
            position: "top",
          });
        } else {
          // onClose();
          setProductData(res.data.data);
          setModalStage("stock_in");
          toast({
            description: "Product added to shop successfully",
            status: "success",
            duration: 3000,
            position: "top",
          });
        }
      }
      return res
    } catch (err) {
      return err;
    }
  };

  const setHeader: any = () => {
    if(modalStage === "add_product") {
      return "Add product to shop"
    }

    if(modalStage === "stock_in") {
      return "Opening Stock"
    }

    return "Add custom photos"
  }

  return (
    <ModalUI
      open={isOpen}
      close={onClose}
      heading={setHeader}
    >
      {modalStage === "add_product" && (
        <chakra.form onSubmit={handleSubmit}>
          {/* Sell Price */}
          <chakra.div my="20px">
            <chakra.p fontSize="14px" color="#333333" fontWeight="600">
              Sell price
            </chakra.p>
            <Input
              name="sell_price"
              value={form.sell_price}
              placeholder="Edit sell price"
              type="number"
              required
              _placeholder={{
                color: "#B3B3B3",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onChange={handleChange}
            />
          </chakra.div>
          {/* Sell Price */}

          <chakra.div my="20px">
            <chakra.p fontSize="14px" color="#333333" fontWeight="600">
              Cost price
            </chakra.p>
            <Input
              name="cost_price"
              value={form.cost_price}
              placeholder="Edit Cost price"
              type="number"
              required
              _placeholder={{
                color: "#B3B3B3",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onChange={handleChange}
            />
          </chakra.div>
          <chakra.div my="20px">
            <chakra.p fontSize="14px" color="#333333" fontWeight="600">
              Low Stock Alert
            </chakra.p>
            <Input
              name="restock_alert"
              value={form.restock_alert}
              placeholder="Edit restock alert"
              type="number"
              required
              _placeholder={{
                color: "#B3B3B3",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onChange={handleChange}
            />
          </chakra.div>
          <chakra.div display="flex" flexDir="column">
            <chakra.label fontSize="0.75rem" fontWeight="500">
              Set Expiry date -Optional: {form.expired_date !== null && new Date(form.expired_date).toLocaleDateString()}
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
                setForm({
                  ...form,
                  expired_date: new Date(e.target.value).toISOString(),
                })
              }
            />
          </chakra.div>
          <chakra.div my="20px">
            <chakra.p fontSize="14px" color="#333333" fontWeight="600">
              Other details (optional)
            </chakra.p>
            <Input
              name="other_details"
              value={form.other_details}
              placeholder="Edit other details"
              type="text"
              _placeholder={{
                color: "#B3B3B3",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onChange={handleChange}
            />
          </chakra.div>
          <chakra.div
            w="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <chakra.button
              w="268px"
              h="47.4px"
              borderRadius="5.84px"
              bg="#2153CC"
              type="submit"
            >
              {isRequest ? (
                <Spinner size="sm" color="#ffffff" />
              ) : (
                <chakra.p fontSize="18px" fontWeight="600" color="#FFFFFF">
                  Submit
                </chakra.p>
              )}
            </chakra.button>
          </chakra.div>
        </chakra.form>
      )}
      {modalStage === "stock_in" && (
        <StockIn productData={productData} setModalStage={setModalStage} />
      )}
      {modalStage === "add_custom_photo" && (
        <AddCustomPhotos
          productData={productData}
          setModalStage={setModalStage}
          onClose={onClose}
        />
      )}
    </ModalUI>
  );
};

export default AddProduct;
