/* eslint-disable jsx-a11y/control-has-associated-label */
import { chakra, useToast, Spinner } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getSingleShop, shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PopularCategories {
  data: { name: string; photo: string; id: number }[];
  loaded: boolean;
}

const AddShopProduct = (props: ModalProps) => {
  const { isOpen, onClose } = props;
  const { singleShop } = useAppSelector(shopsData);
  const dispatch = useAppDispatch()
  const [popularCategories, setPopularCategories] = useState<PopularCategories>(
    { data: [], loaded: false }
  );
  const [addForm, setAddForm] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    brand_id: { id: null },
    category_id: { id: null },
    type: 0,
    units: [],
  });
  const [options, setOptions] = useState<any>({
    options: [],
    search: false,
  });
  const [unitProductCount, setUnitProductCount] = useState(0);
  const [isRequest, setIsRequest] = useState(false);
  const [brands, setBrands] = useState([]);
  const toast = useToast();

  const getBrands = async () => {
    try {
      const res = await AuthAxios.get("/oga/brand/index");
      return setBrands(res.data.data.data.data);
    } catch (e) {
      return e;
    }
  };

  const getPopularCategories = () => {
    AuthAxios.get("oga/product/category/index")
      .then((res) => {
        if (res.status === 200) {
          setPopularCategories({
            data: res.data.data.data,
            loaded: true,
          });
        }
      })
      .catch((e: any) => e);
  };

  const searchProducts = (e: any) => {
    setFormValues({
      ...formValues,
      name: e.target.value,
    });
    if (e.target.value.length >= 3) {
      setTimeout(async () => {
        const res = await AuthAxios.post("/oga/product/search", {
          name: e.target.value,
        });
        const opt = res.data.data.data.filter(
          (o: { product_units: string | any[] }) => o.product_units.length > 0
        );

        setOptions({
          opt,
          search: true,
        });
      }, 1000);
    }

    if (e.target.value === "") {
      setOptions({
        options: [],
        search: false,
      });
    }
  };

  const addShopProduct = async (id: any, prodId: any) => {
    try {
      const res = await AuthAxios.post("/oga/shop/product/create", {
        shop_id: Number(singleShop.selectedShop.id),
        product_id: prodId,
        product_unit_id: id,
        sell_price: 0,
        cost_price: 0,
        restock_alert: 1,
        category_id: 1,
        expired_date: null,
        other_details: "",
        attributes: 0,
      });
      if (res.status === 200) {
        if (res.data.data.status === "error") {
          toast({
            description: res.data.data.message,
            status: "info",
            duration: 3000,
            position: "top",
          });
          dispatch<any>(getSingleShop(singleShop.selectedShop.id));
        } else {
          toast({
            description: "Product added to shop successfully",
            status: "success",
            duration: 3000,
            position: "top",
          });
          dispatch<any>(getSingleShop(singleShop.selectedShop.id));
        }
      }
      return res;
    } catch (e) {
      return e;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const productForm = new FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const key in formValues) {
      if (Object.prototype.hasOwnProperty.call(formValues, key)) {
        productForm.append(key, formValues[key]);
      }
    }
    productForm.set("brand_id", formValues.brand_id.id);
    productForm.set("product_category_id", formValues.category_id.id);

    if (formValues.units.length > 0) {
      if (formValues.units[unitProductCount - 1].photo === null) {
        return toast({
          description: `Enter Product Unit photo${formValues.units.length > 1 ? "s" : ""
            }`,
          status: "info",
          duration: 2500,
          position: "top",
        });
      }
    }
    for (let i = 0; i < formValues.units.length; i += 1) {
      productForm.append(`units[${i}][name]`, formValues.units[i].name);
      productForm.append(`units[${i}][photo]`, formValues.units[i].photo);
      productForm.append(`units[${i}][barcode]`, formValues.units[i].barcode);
      productForm.append(`units[${i}][shop_id]`, singleShop.selectedShop.id);
    }
    productForm.append(`shop_id`, singleShop.selectedShop.id);

    // productForm.delete("units");

    try {
      setIsRequest(true);
      const res = await AuthAxios.post("/oga/product/create", productForm);
      if (res.status === 200) {
        setIsRequest(false);
        onClose();
        toast({
          description: "Product submited for admin approval",
          status: "success",
          duration: 3000,
          position: "top",
        });

        setFormValues({
          name: "",
          brand_id: { id: null },
          category_id: { id: null },
          type: 0,
          units: [],
        });
        // setAddForm(false);
        setUnitProductCount(0);
        dispatch<any>(getSingleShop(singleShop.selectedShop.id));
      }
      return res;
    } catch (err) {
      setIsRequest(false);
      toast({
        description: "Sorry, something went wrong. Contact your administrator",
        status: "error",
        duration: 5000,
        position: "top",
      });
      return err;
    }
  };

  const addProductUnitField = () => {
    setUnitProductCount(unitProductCount + 1);
    const units = [...formValues.units];
    units[unitProductCount] = {
      name: "",
      barcode: null,
      photo: null,
      photoName: "Select photo",
    };
    setFormValues({
      ...formValues,
      units,
    });
  };

  const setUnitPhoto = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const units = [...formValues.units];
    units[i] = {
      ...units[i],
      name: units[i].name,
      barcode: units[i].barcode,
      photo: e.target.files[0],
      photoName: e.target.files[0].name,
    };
    setFormValues({
      ...formValues,
      units,
    });
  };

  const setUnitName = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const units = [...formValues.units];
    units[i] = {
      ...units[i],
      name: e.target.value,
      barcode: units[i].barcode,
      photo: units[i].photo,
      photoName: units[i].photoName,
    };
    setFormValues({
      ...formValues,
      units,
    });
  };

  const setUnitBarcode = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const units = [...formValues.units];
    units[i] = {
      ...units[i],
      name: units[i].name,
      barcode: e.target.value,
      photo: units[i].photo,
      photoName: units[i].photoName,
    };
    setFormValues({
      ...formValues,
      units,
    });
  };

  const removeProductUnit = (i: number) => {
    setUnitProductCount(unitProductCount - 1);
    const units = [...formValues.units];
    units.splice(i, 1);
    setFormValues({
      ...formValues,
      units,
    });
  };

  useEffect(() => {
    getBrands();
    getPopularCategories();
  }, []);

  return (
    <ModalUI
      open={isOpen}
      close={onClose}
      heading={addForm ? "Create Product" : "Add New Product to Inventory"}
    >
      {/* {!addForm && (
        <>
          <chakra.input
            name="phoneNumber"
            onKeyUp={(e: any) => searchProducts(e)}
            type="text"
            fontSize="14px"
            px="16px"
            mt="1.5"
            w="full"
            placeholder="Search our product catalogue"
            border="1px solid rgba(154, 161, 174, 0.3)"
            borderRadius="12px"
            defaultValue={formValues.name}
            h="48px"
            textTransform="capitalize"
            _focus={{ border: "1px solid #1739E8", outline: "none" }}
          />
          <chakra.div display="flex" flexDir="column" mt="20px" gridGap="10px">
            {options.options.length > 0 ? (
              options.options.map((product) =>
                product.product_units.map((unit: any, i: number) => {
                  return (
                    <chakra.div
                      key={unit.id}
                      mt="16px"
                      display="flex"
                      borderRadius="12px"
                      border="1px solid #ddd"
                      py="8px"
                      px="16px"
                      w="full"
                      h="full"
                      cursor={!unit.status ? "not-allowed" : "pointer"}
                      _hover={{ borderColor: "#1E75FF" }}
                    >
                      <chakra.img
                        height="72px"
                        width="72px"
                        src={
                          unit.photo === null ? product.brand.logo : unit.photo
                        }
                        alt=""
                      />
                      <chakra.div
                        display="flex"
                        w="full"
                        minH="72px"
                        flexDir="column"
                      >
                        <chakra.div
                          display="flex"
                          ml="8px"
                          flexDir="column"
                          h="full"
                          justifyContent="space-between"
                        >
                          <chakra.div>
                            <chakra.p
                              fontWeight="600"
                              textTransform="capitalize"
                            >
                              {product.name}
                            </chakra.p>
                            <chakra.p fontWeight="600">{unit.name}</chakra.p>
                          </chakra.div>
                          <chakra.p fontSize="0.75rem" color="#2E93FF">
                            {product.brand.name}
                          </chakra.p>
                        </chakra.div>
                        {unit.status ? (
                          <chakra.button
                            onClick={() => addShopProduct(unit.id, product.id)}
                            fontSize="0.75rem"
                            display="block"
                            mt="12px"
                            w="full"
                            h="48px"
                            fontWeight="500"
                            bg="#1739E8"
                            color="white"
                            borderRadius="12px"
                            _focus={{ outline: "4px solid #9CAAF5" }}
                          >
                            Add
                          </chakra.button>
                        ) : (
                          ""
                        )}
                      </chakra.div>
                    </chakra.div>
                  );
                })
              )
            ) : !options.search ? (
              <chakra.p
                textAlign="center"
                mt="20px"
                color="#27282E"
                fontSize="0.875rem"
              >
                Start typing to search
              </chakra.p>
            ) : (
              ""
            )}
            <chakra.div textAlign="center" mt="40px" fontSize="0.875rem">
              {`Can't find product?,`}{" "}
              <chakra.span
                onClick={() => {
                  setAddForm(true);
                }}
                color="#2680EB"
                cursor="pointer"
              >
                Click here to suggest your product
              </chakra.span>
            </chakra.div>
          </chakra.div>
        </>
      )} */}
      {addForm && (
        <chakra.div mt="12px" px="16px">
          {/* <chakra.p
            color="#1739E8"
            display="flex"
            alignItems="center"
            cursor="pointer"
            onClick={() => setAddForm(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <chakra.span fontSize="0.875rem" ml="8px" mt="1px">
              Go Back to search
            </chakra.span>
          </chakra.p> */}
          <chakra.form
            id="new-product-form"
            onSubmit={submitForm}
            encType="multipart/form-data"
            mt="24px"
          >
            <chakra.div
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gridRowGap="20px"
              gridColumnGap="16px"
            >
              {/* <chakra.div display="flex" flexDir="column" gridColumn="1/3">
                <chakra.label fontSize="0.75rem" fontWeight="600" color="#212429">Product Barcode (Optional)</chakra.label>
                <chakra.input
                  type="number"
                  px="16px"
                  mt="1px"
                  placeholder="Product barcode"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  inputMode="numeric"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  name="product-barcode"
                  id="product-barcode"
                  onChange={(e) => setFormValues({
                    ...formValues,
                    barcode: e.target.value
                  })}
                  fontSize="0.875rem"
                />
              </chakra.div> */}

              <chakra.div display="flex" flexDir="column" gridColumn="1/3">
                <chakra.label
                  fontSize="0.75rem"
                  fontWeight="600"
                  color="#212429"
                >
                  Product name
                </chakra.label>
                <chakra.input
                  type="text"
                  px="16px"
                  defaultValue={formValues.name}
                  textTransform="capitalize"
                  mt="1px"
                  placeholder="Enter product name"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  name="product-name"
                  id="product-name"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      name:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    })
                  }
                  fontSize="0.875rem"
                  required
                />
              </chakra.div>

              <chakra.div display="flex" flexDir="column" gridColumn="1/3">
                <chakra.label
                  fontSize="0.75rem"
                  fontWeight="600"
                  color="#212429"
                >
                  Select categories
                </chakra.label>
                <chakra.input
                  type="text"
                  px="16px"
                  mt="1px"
                  placeholder="Search categories list"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  name="product-categories"
                  id="product-categories"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      category_id: popularCategories.data.find(
                        (b) => b.name === e.target.value
                      ),
                    });
                  }}
                  list="categories"
                  fontSize="0.875rem"
                  required
                />
                <datalist id="categories">
                  <option> Select categories</option>
                  {popularCategories.data.map((display) => (
                    <option value={display.name} key={display.id} />
                  ))}
                </datalist>
              </chakra.div>

              <chakra.div display="flex" flexDir="column" gridColumn="1/3">
                <chakra.label
                  fontSize="0.75rem"
                  fontWeight="600"
                  color="#212429"
                >
                  Select brand
                </chakra.label>
                <chakra.input
                  type="text"
                  px="16px"
                  mt="1px"
                  placeholder="Search brand list"
                  border="1px solid rgba(154, 161, 174, 0.3)"
                  borderRadius="12px"
                  h="44px"
                  _focus={{ border: "1px solid #1739E8", outline: "none" }}
                  name="product-brand"
                  id="product-brand"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      brand_id: brands.find((b) => b.name === e.target.value),
                    });
                  }}
                  list="brands"
                  fontSize="0.875rem"
                  required
                />
                <datalist id="brands">
                  <option>Select brand</option>
                  {brands.map((brand) => (
                    <option value={brand.name} key={brand.id} />
                  ))}
                </datalist>
              </chakra.div>

              {[...Array.from(Array(unitProductCount).keys())].map((n, i) => (
                  <chakra.div gridColumn="1/3" key={n}>
                    <chakra.p
                      pb={0.5}
                      borderBottom="1px solid gray"
                      gridColumn="1/3"
                      fontWeight="600"
                    >
                      Product Variant {i + 1}
                    </chakra.p>
                    <chakra.div display="flex" flexDir="column" mt={1} w="full">
                      <chakra.label fontSize="0.8rem" fontWeight="500">
                        Product Variant Name
                      </chakra.label>
                      <chakra.input
                        name="product-unit-name"
                        id="product-unit-name"
                        onChange={(e) => setUnitName(e, i)}
                        fontSize="0.875rem"
                        required
                        type="text"
                        px="16px"
                        textTransform="capitalize"
                        mt="1px"
                        placeholder="Enter variant name"
                        border="1px solid rgba(154, 161, 174, 0.3)"
                        borderRadius="12px"
                        h="44px"
                        _focus={{
                          border: "1px solid #1739E8",
                          outline: "none",
                        }}
                      />
                    </chakra.div>
                    <chakra.div display="flex" flexDir="column" mt={3} w="full">
                      <chakra.label fontSize="0.8rem" fontWeight="500">
                        Product Variant Barcode (Optional)
                      </chakra.label>
                      <chakra.input
                        name="product-unit-barcode"
                        id="product-unit-barcode"
                        onChange={(e) => setUnitBarcode(e, i)}
                        fontSize="0.875rem"
                        type="text"
                        px="16px"
                        mt="1px"
                        placeholder="Enter variant barcode"
                        border="1px solid rgba(154, 161, 174, 0.3)"
                        borderRadius="12px"
                        h="44px"
                        _focus={{
                          border: "1px solid #1739E8",
                          outline: "none",
                        }}
                      />
                    </chakra.div>
                    <chakra.div mt="12px" w="full">
                      <chakra.label
                        htmlFor={`unit-photo-${i}`}
                        w="full"
                        display="block"
                        fontSize="0.8rem"
                        fontWeight="500"
                      >
                        Add Variant Photo
                        <chakra.div
                          p="0 16px"
                          display="flex"
                          alignItems="center"
                          fontWeight="400"
                          cursor="pointer"
                          id={`unit-photo-name-${i}`}
                          fontSize="0.875rem"
                          px="16px"
                          textTransform="capitalize"
                          mt="1px"
                          border="1px solid rgba(154, 161, 174, 0.3)"
                          borderRadius="12px"
                          h="44px"
                          _focus={{
                            border: "1px solid #1739E8",
                            outline: "none",
                          }}
                          w="full"
                        >
                          {formValues.units[i] &&
                            formValues.units[i].photoName.slice(0, 16)}
                        </chakra.div>
                      </chakra.label>
                      <chakra.input
                        name={`variant-photo-${i}`}
                        id={`unit-photo-${i}`}
                        type="file"
                        display="none"
                        onChange={(e) => setUnitPhoto(e, i)}
                        accept=".png,.jpg,.jpeg"
                        w="full"
                      />
                    </chakra.div>
                    <chakra.p
                      fontSize="0.75rem"
                      mt={0.5}
                      color="red.300"
                      cursor="pointer"
                      onClick={() => removeProductUnit(i)}
                    >
                      Remove
                    </chakra.p>
                  </chakra.div>
                ))}
              <chakra.button
                gridColumn="1/3"
                width="full"
                h="48px"
                fontSize="0.875rem"
                mt="4px"
                color="white"
                fontWeight="500"
                bg="#2153CC"
                borderRadius="5px"
                _focus={{ outline: "4px solid #9CAAF5" }}
                type="button"
                onClick={() => addProductUnitField()}
              >
                Add Another Variant
              </chakra.button>
              <chakra.div gridColumn="1/3">
                <chakra.p
                  fontStyle="italic"
                  fontSize="0.875rem"
                  color="#27282E"
                >
                  By clicking submit you have suggested product for admin
                  approval
                </chakra.p>
                <chakra.button
                  disabled={isRequest || unitProductCount === 0}
                  width="full"
                  h="3rem"
                  bg={unitProductCount === 0 ? "gray.300" : "#2153CC"}
                  mt="12px"
                  color="white"
                  _focus={{ outline: "4px solid #9CAAF5" }}
                  borderRadius="5px"
                  fontWeight="600"
                  type="submit"
                >
                  {isRequest ? (
                    <Spinner size="sm" color="#fff" />
                  ) : (
                    <chakra.p color="#fff" fontWeight="600">
                      Submit
                    </chakra.p>
                  )}
                </chakra.button>
              </chakra.div>
            </chakra.div>
          </chakra.form>
        </chakra.div>
      )}
    </ModalUI>
  );
};

export default AddShopProduct;
