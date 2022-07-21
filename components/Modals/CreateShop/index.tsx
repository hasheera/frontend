/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Box,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, PrevIcon } from "public/assets";
import { getCities, getStates } from "@utils/queries";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
type InputEventType = React.ChangeEvent<HTMLInputElement>;
type FormEventType = React.ChangeEvent<HTMLFormElement>;

// type AdressType = {
//   street_name: string;
//   city_id: any;
//   state_id: any;
//   id: any;
//   city: { name: string };
//   state: { name: string };
// };
type FormValues = {
  street_name: string;
  land_mark: string;
  country_id: number;
  city_id: number | string;
  state_id: number | string;
};


const CategoryOptions = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getCat = async () => {
    try {
      const res = await AuthAxios.get("/oga/shop/category/index");
      if (res.status === 200) {
        setCategories(res.data.data);
        setLoading(false);
      }
      return res
    } catch (e) {
      setError(true)
      return e;
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  if (loading) return <option value="">Loading...</option>

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {categories.length ? (
        <>
          <option value="">Choose a category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </>
      ) : (
        error && (
          <option value="" disabled>
            Failed to load
          </option>
        )
      )}
    </>
  );
};

const StateOptions = () => {
  // const { data, error } = useSWR("/auth/state/list/160", getStates);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // data && setStates(data);
    // return () => data && setStates(data);
    getStates("/auth/state/list/160")
      .then((cities: React.SetStateAction<{ id: number; name: string; }[]>) => {
        setLoading(false);
        setStates(cities);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        return err
      });

  }, []);

  // useEffect(() => {
  //   if (data || error) {
  //     setLoading(false);
  //   }
  // }, [data, error]);

  if (loading) return <option value="">Loading...</option>

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {states.length ? (
        <>
          <option value="">Choose a state</option>
          {states.map((state) => (
            <option value={state.id} key={state.id}>
              {state.name}
            </option>
          ))}
        </>
      ) : (
        error && (
          <option value="" disabled>
            Failed to load
          </option>
        )
      )}
    </>
  );
};

const CityOptions = ({ stateId }: { stateId: number | string }) => {
  const [cityList, setCities] = useState([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (stateId) {
      setLoading(true);
      getCities(stateId)
        .then((cities: React.SetStateAction<{ id: number; name: string; }[]>) => {
          setLoading(false);
          setCities(cities);
        })
        .catch((err: { message: React.SetStateAction<string>; }) => {
          setLoading(false);
          setError(err.message);
        });
    }
  }, [stateId]);

  if (loading) return <option value="">Loading...</option>

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {cityList.length ? (
        <>
          <option value="">Choose a city</option>
          {cityList.map((city) => (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          ))}
        </>
      ) : (
        error && (
          <option value="" disabled>
            error
          </option>
        )
      )}
    </>
  );
};

const CreateShop: FC<Props> = ({ isOpen, onClose }) => {
  // const { getAllVendorShops } = useContext(ShopContext);
  const toast = useToast();
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [createAdress, setCreateAdress] = useState<boolean>(false);
  const [createAdressButton, setCreateAdressButton] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState({ data: [], loaded: false });
  const [createNewShop, setCreateNewShop] = useState(false);
  const [fileName, setFileName] = useState("Select logo");
  const [streetName, setStreetName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [modalHeading, setModalHeading] = useState("Choose your shop Address");
  const [imagePreview, setImagePreview] = useState("");
  const [formValues, setFormvalues] = useState({
    address_id: "",
    name: "",
    category_id: "",
    whats_app_number: "",
    city_id: null,
    state_id: null,
    logo: null,
  });
  const [currentState, setCurrentState] = useState("");
  //   const [isRequest, setIsRequest] = useState<boolean>(false);
  const [createAdressFormValues, setCreateAdressFormvalues] =
    useState<FormValues>({
      street_name: "",
      land_mark: "",
      //  The Country Id : 160 is for
      country_id: 160,
      city_id: null,
      state_id: null,
    });

  const phonePattern = /^(\+?234|0)?(80|81|70|90)[0-9]{8}/g;

  useEffect(() => {
    if (formValues.logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(formValues.logo);
    } else {
      setImagePreview("");
    }
  }, [formValues.logo]);

  const searchAdress = (e: InputEventType) => {
    if (e.target.value === "") {
      return setSearchInput({ data: [], loaded: false });
    }
    // setValue(e.target.value);
    setCreateAdressFormvalues((va) => ({ ...va, street_name: e.target.value }));

    AuthAxios.post(`/oga/address/search?street_name=${e.target.value}`)
      .then((res) => {
        if (res.status === 200) {
          setSearchInput({ data: res.data.data.data, loaded: true });
        }
      })
      .catch((err) => err);
      return false
  };

  const handleCreateAdress = () => {
    setCreateAdress(true);
    setModalHeading("Create Address")
  };

  const createShop = async (shop) => {
    const formData = new FormData();

    // for (let key in shop) {
    //   formData.append(key, shop[key]);
    // }
    const data = Object.entries(shop)
    data.forEach((e: any) => formData.append(e, shop[e]));


    formData.append("logo", shop.logo);

    try {
      setIsRequest(true);
      const newShop = await AuthAxios.post("/oga/shop/create", formData);

      if (newShop.status === 200) {
        setIsRequest(false);
        // getAllVendorShops();
        toast({
          description: "Shop created successfully",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
        onClose();
      }
      return newShop
    } catch (error) {
      setIsRequest(false);
      return toast({
        position: "top-right",
        description: "Unsuccessful Please Try Again",
        status: "error",
        duration: 3000,
      });
    }
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    if (formValues.logo === null || formValues.logo === "") {
      setFileName("Please choose logo");
      document.getElementById("logo-name").style.color = "red";
      document.getElementById("logo-name").style.border = "1px solid red";
      setTimeout(() => {
        setFileName("Select logo");
        document.getElementById("logo-name").removeAttribute("style");
      }, 2500);
      return;
    }

    const phoneMatch = formValues.whats_app_number.match(phonePattern);
    if (!phoneMatch) {
      toast({
        description: "Please enter a valid phone number",
        status: "info",
        duration: 3000,
        position: "top-right",
      });
    }

    createShop({
      ...formValues,
      whats_app_number: String(
        formValues.whats_app_number.charAt(0) === "0"
          ? `+234${formValues.whats_app_number.slice(1)}`
          : `+234${formValues.whats_app_number}`
      ),
    });
  };

  //   Input Change Handler
  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target;
    setCreateAdressFormvalues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault();
    if (
      !createAdressFormValues.city_id ||
      !createAdressFormValues.street_name ||
      !createAdressFormValues.state_id
    ) {
      return toast({
        description: "Fill in the required input field",
        position: "top-right",
        status: "error",
        duration: 3000,
      });
    }

    setIsRequest(true);
    AuthAxios.post(
      `/oga/address/create?country_id=${createAdressFormValues.country_id}&state_id=${createAdressFormValues.state_id}&city_id=${createAdressFormValues.city_id}&street_name=${createAdressFormValues.street_name}&land_mark=${createAdressFormValues.land_mark}`)
      .then((res) => {
        if (res.status === 200) {
          setIsRequest(false);
          setCreateNewShop(true);
          toast({
            description: "Adress Created Successfully",
            position: "top-right",
            status: "success",
            duration: 3000,
          });
          setStreetName(res.data.data.street_name);
          setFormvalues((values) => ({
            ...values,
            state_id: res.data.data.state_id,
            city_id: res.data.data.city_id,
            // country_id: res.data.data.country_id,
            address_id: res.data.data.id,
          }));
          setCreateAdressFormvalues({
            street_name: "",
            land_mark: "",
            //  The Country Id : 160 is for
            country_id: 160,
            city_id: null,
            state_id: null,
          });
        }
      })
      .catch((err) => err);
    return false
  };

  return (
    <ModalUI
      open={isOpen}
      close={onClose}
      heading={modalHeading}
    >
      {createNewShop ? (
        <>
          <chakra.div
            onClick={() => setCreateNewShop(false)}
            display="flex"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            w="40px"
            h="40px"
            borderRadius="100%"
            border="1px solid #2153CC"
          >
            <PrevIcon />
          </chakra.div>
          <chakra.div
            w="full"
            h="50.12px"
            borderRadius="6px"
            p="10.06px"
            my="20px"
            border="0.2px solid rgba(117, 117, 117, 0.5)"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <chakra.div w="7px" h="7px" borderRadius="100%" bg="#C4C4C4" />
            <chakra.p ml="5px" fontSize="14px" fontWeight="500" w="80%">
              {`${streetName}, ${cityName}, ${stateName}`}
            </chakra.p>

            <CheckIcon />
          </chakra.div>
          <form onSubmit={submitForm} encType="multipart/form-data">
            <VStack spacing="20px" mb="20px">
              <FormControl>
                <FormLabel mb="2px">Shop Name</FormLabel>
                <Input
                  name="name"
                  id="name"
                  onChange={(e) =>
                    setFormvalues({
                      ...formValues,
                      name: e.target.value,
                    })
                  }
                  fontSize="0.875rem"
                  maxLength={20}
                  required
                />
              </FormControl>
              <FormControl id="whatsapp-number">
                <FormLabel mb="2px">Whatsapp Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    h="40px"
                    fontSize="14px"
                    px="8px"
                    bg="white"
                    borderTopLeftRadius="5px"
                    borderBottomLeftRadius="5px"
                  >
                    <svg
                      width="25px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 6 3"
                    >
                      <path fill="#008751" display="M0 0h6v3H0z" />
                      <path fill="#FFF" display="M2 0h2v3H2z" />
                    </svg>
                  </InputLeftAddon>
                  <Input
                    name="whats_app_number"
                    id="whats_app_number"
                    onChange={(e) =>
                      setFormvalues({
                        ...formValues,
                        whats_app_number: e.target.value,
                      })
                    }
                    maxLength={11}
                    type="tel"
                    fontSize="0.875rem"
                    pl="5px"
                    placeholder="Phone number"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel mb="2px">Type of shop</FormLabel>
                <Select
                  name="category_id"
                  id="category_id"
                  onChange={(e) =>
                    setFormvalues({
                      ...formValues,
                      category_id: e.target.value,
                    })
                  }
                  required
                >
                  <CategoryOptions />
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="logo" w="100%">
                  Shop Logo
                  <chakra.div
                    display="flex"
                    alignItems="center"
                    w="full"
                    h="100px"
                    borderRadius="10px"
                    border="1.08202px solid rgba(27, 27, 27, 0.25)"
                    overflow="hidden"
                  >
                    <chakra.div w="150px" h="full" overflow="hidden" mr="20px">
                      {imagePreview && (
                        <chakra.img
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          src={imagePreview}
                          alt="."
                        />
                      )}
                    </chakra.div>
                    <Box
                      h={10}
                      border="1px solid #2153CC"
                      borderRadius={8}
                      p="0 16px"
                      display="flex"
                      alignItems="center"
                      fontWeight="400"
                      cursor="pointer"
                      id="logo-name"
                      mt="2px"
                    >
                      {fileName ? `${fileName.slice(0, 20)}...` : "Select Logo"}
                    </Box>
                  </chakra.div>
                </FormLabel>
                <Input
                  name="logo"
                  id="logo"
                  type="file"
                  display="none"
                  onChange={(e) => {
                    setFileName(
                      e.target.files[0] ? e.target.files[0].name : ""
                    );
                    setFormvalues({
                      ...formValues,
                      logo: e.target.files[0],
                    });
                  }}
                  accept=".png,.jpg,.jpeg"
                />
              </FormControl>
            </VStack>

            <chakra.div display="flex" justifyContent="center">
              <chakra.button
                disabled={isRequest}
                width="268px"
                h="3rem"
                bg="#2153CC"
                mt="32px"
                color="white"
                _focus={{ outline: "4px solid #9CAAF5" }}
                borderRadius="5.84px"
                fontWeight="600"
                type="submit"
              >
                {isRequest ? (
                  <Spinner color="#fff" size="sm" />
                ) : (
                  <chakra.p color="#fff" fontSize="18px" fontWeight="600">
                    Submit
                  </chakra.p>
                )}
              </chakra.button>
            </chakra.div>
          </form>
        </>
      ) : (
        <>
          {createAdress ? (
            <>
              <chakra.div
                onClick={() => setCreateAdress(false)}
                display="flex"
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                w="40px"
                h="40px"
                borderRadius="100%"
                border="1px solid #2153CC"
              >
                <PrevIcon />
              </chakra.div>

              <chakra.form onSubmit={handleSubmit}>
                <HStack spacing="10px" mt="10px">
                  <FormControl isRequired>
                    <FormLabel mb="2px">State</FormLabel>
                    <Select
                      name="state_id"
                      id="state_id"
                      onChange={(e) => {
                        setCreateAdressFormvalues({
                          ...createAdressFormValues,
                          state_id: e.target.value,
                        });
                        setCurrentState(e.target.value);
                      }}
                    >
                      <StateOptions />
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel mb="2px">City</FormLabel>
                    <Select
                      name="city_id"
                      id="city_id"
                      onChange={(e) =>
                        setCreateAdressFormvalues({
                          ...createAdressFormValues,
                          city_id: e.target.value,
                        })
                      }
                    >
                      <CityOptions stateId={currentState} />
                    </Select>
                  </FormControl>
                </HStack>
                <FormControl isRequired>
                  <FormLabel mt="10px">Street name</FormLabel>
                  <Input
                    placeholder="No 1 ...."
                    name="street_name"
                    value={createAdressFormValues.street_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mt="10px">Land Mark</FormLabel>
                  <Input
                    name="land_mark"
                    placeholder=""
                    value={createAdressFormValues.land_mark}
                    onChange={handleChange}
                  />
                </FormControl>
                <Flex w="full" justifyContent="center" mt="10px">
                  <chakra.button
                    type="submit"
                    w="268px"
                    h="46px"
                    bg="#2153CC"
                    borderRadius="6px"
                  >
                    {isRequest ? (
                      <Spinner size="sm" color="#fff" />
                    ) : (
                      <chakra.p
                        color="#FFFFFF"
                        fontSize="18px"
                        fontWeight="600"
                      >
                        Submit
                      </chakra.p>
                    )}
                  </chakra.button>
                </Flex>
              </chakra.form>
            </>
          ) : (

            <chakra.div w="full">
              {streetName ? (
                <chakra.div
                  w="full"
                  h="50.12px"
                  borderRadius="6px"
                  p="10.06px"
                  my="10px"
                  border="0.2px solid rgba(117, 117, 117, 0.5)"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <chakra.div
                    w="7px"
                    h="7px"
                    borderRadius="100%"
                    bg="#C4C4C4"
                  />
                  <chakra.p
                    ml="5px"
                    fontSize="14px"
                    fontWeight="500"
                    w="80%"
                  >
                    {`${streetName}, ${cityName}, ${stateName}`}
                  </chakra.p>
                  {/* <CheckIcon /> */}
                  <chakra.button
                    p="5px"
                    color="red"
                    fontSize="20px"
                    onClick={() => {
                      setSearchInput({ data: [], loaded: false });
                      setStreetName("");
                    }}
                  >
                    X
                  </chakra.button>
                </chakra.div>

              ) : (
                <>
                  <chakra.p
                    fontSize="12.24px"
                    fontWeight="600"
                    color="#333333"
                  >
                    Search for nearby address
                  </chakra.p>
                  <Input
                    onChange={searchAdress}
                    placeholder="Search for nearby addresses"
                    w="full"
                    h="45px"
                    borderRadius="6.49px"
                    _placeholder={{ fontWeight: "500x", fontSize: "12px" }}
                    onFocus={() => setCreateAdressButton(true)}
                  />
                  {searchInput.loaded &&
                    searchInput.data.map(
                      (
                        {
                          street_name,
                          city_id,
                          state_id,
                          id,
                          city,
                          state,
                        }
                      ) => (
                        <chakra.div
                          key={id}
                          onClick={() => {
                            setFormvalues((values) => ({
                              ...values,
                              address_id: id,
                              city_id,
                              state_id,
                            }));
                            setStateName(state.name);
                            setCityName(city.name);
                            setStreetName(street_name);
                          }}
                          w="full"
                          h="50.12px"
                          cursor="pointer"
                          borderRadius="6px"
                          p="10.06px"
                          my="10px"
                          border="0.2px solid rgba(117, 117, 117, 0.5)"
                          display="flex"
                          alignItems="center"
                          _hover={{
                            border: "0.2px solid #2153CC",
                          }}
                        >
                          <chakra.div
                            w="7px"
                            h="7px"
                            borderRadius="100%"
                            bg="#C4C4C4"
                          />
                          <chakra.p
                            ml="5px"
                            fontSize="12px"
                            fontWeight="400"
                            w="80%"
                          >
                            {`${street_name}, ${city.name}, ${state.name}`}
                          </chakra.p>
                        </chakra.div>
                      )
                    )}
                </>
              )}
              {createAdressButton && (
                <chakra.p
                  onClick={handleCreateAdress}
                  fontWeight="400"
                  fontFamily="11.15px"
                  color="#EA4D33"
                  textDecoration="underline"
                  py="10px"
                  cursor="pointer"
                >
                  Can’t Find address? Fill in address manually
                </chakra.p>
              )}
              <chakra.div w="full" display="flex" justifyContent="center" my="20px">
                <chakra.button
                  onClick={() => {
                    if (!streetName) {
                      toast({
                        position: "top-right",
                        description: "Please provide shop adress",
                        status: "error",
                        duration: 3000,
                      });
                    } else {
                      setCreateNewShop(true);
                      setModalHeading("Enter shop details")
                    }
                  }}
                  w="235px"
                  h="46px"
                  borderRadius="6.64px"
                  bg="#2153CC"
                >
                  <chakra.p fontSize="18px" fontWeight="600" color="#FFFFFF">
                    Continue
                  </chakra.p>
                </chakra.button>
              </chakra.div>
            </chakra.div>

          )}
        </>
      )}
    </ModalUI>
  );
};

export default CreateShop;
