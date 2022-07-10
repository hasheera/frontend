/* eslint-disable camelcase */
import { chakra, Button, Radio, RadioGroup, Switch, useDisclosure, useToast } from "@chakra-ui/react";
import ModalUI from "@components/Modals";
import CreateAdress from "@components/Modals/CreateAdress";
import AuthAxios from "@utils/api/authAxios";
import { useAppSelector } from "hooks";
import { useEffect, useRef, useState } from "react";
import { shopsData } from "store/slices/shops";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cusType: string;
  setCusType: (customer: string) => void;
  cusName: string;
  setCusName: (cus: string) => void;
  cusNum: string;
  setCusNum: (cus: string) => void;
  delivery: number;
  setDelivery: (delivery: number) => void;
  setNewCustomer: (newName: { name: string; phone: string }) => void;
  removeCus: () => void;
  userId: number;
  searchAddress: string;
  setSearchAddress: (add: { id: number; address: string }) => void;
}

const CustomerInfo = ({
  isOpen,
  onClose,
  cusType,
  setCusType,
  cusName,
  setCusName,
  cusNum,
  setCusNum,
  delivery,
  setDelivery,
  setNewCustomer,
  removeCus,
  userId,
  searchAddress,
  setSearchAddress,
}: Props) => {
  const { singleShop } = useAppSelector(shopsData);
  const [shopCustomers, setShopCustomers] = useState(null)
  const [newName, setNewName] = useState(null)
  const [addresses, setAddresses] = useState({ active: false, data: [] })
  const addressDropdown = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const addressInput = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
  const toast = useToast();
  const createAddress = useDisclosure();

  const allShopCustomers = (cus: string) => {
    AuthAxios.post(
      `/oga/shop/customer/search?shop_id=${singleShop.selectedShop.id}&search=${cus}`,
    )
      .then((res) => {
        const {
          data: {
            data: { data },
          },
        } = res;
        setShopCustomers(data);
      })
      .catch((err) => err);
  };

  const getUserAddresses = () => {
    AuthAxios.get(`/oga/user/address/index?user_id=${userId}`)
      .then((res) => {
        const {
          data: {
            data: { data },
          },
        } = res;
        setAddresses({ active: false, data });
      })
      .catch(err => err)
  }

  const getAddresses = (add: string) => {
    AuthAxios.post(`/oga/address/search?street_name=${add}`)
      .then(res => {
        const {
          data: { data: { data } }
        } = res
        setAddresses({ active: true, data })
      })
      .catch(err => err)
  }

  useEffect(() => {
    if (userId) getUserAddresses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (
        addresses.active &&
        addressDropdown.current &&
        addressInput &&
        !addressDropdown.current.contains(e.target) &&
        !addressInput.current.contains(e.target)
      ) {
        setAddresses({ ...addresses, active: false });
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => document.removeEventListener("mousedown", clickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses.active]);

  return (
    <ModalUI open={isOpen} close={onClose} heading="Customer Info" maxW="302px">
      <chakra.div
        border="1px solid rgba(0, 0, 0, 0.05)"
        p="8px"
        borderRadius="12px"
      >
        <RadioGroup
          onChange={(e) => setCusType(e)}
          value={cusType}
          display="flex"
          flexDir="column"
          gap="12px"
        >
          <Radio value="me" border="1px solid rgba(0, 0, 0, 0.05)">
            Me
          </Radio>
          <Radio value="customer">Customer</Radio>
        </RadioGroup>
      </chakra.div>

      {cusType === "me" && (
        <chakra.div
          border="1px solid rgba(0, 0, 0, 0.05)"
          p="8px"
          borderRadius="12px"
          mt="24px"
        >
          <chakra.div display="flex" flexDir="column">
            <chakra.label fontSize="0.75rem" fontWeight="500" color="#212429">
              Customer name
            </chakra.label>
            <chakra.input
              type="text"
              px="16px"
              defaultValue={cusName}
              textTransform="capitalize"
              mt="1px"
              color="#333"
              placeholder="Enter customer name"
              border="1px solid rgba(154, 161, 174, 0.3)"
              borderRadius="12px"
              h="40px"
              _focus={{ border: "1px solid #1739E8", outline: "none" }}
              name="customer-name"
              onChange={(e) => setCusName(e.target.value)}
              fontSize="0.875rem"
              disabled
              required
            />
          </chakra.div>

          <chakra.div display="flex" flexDir="column" mt="24px">
            <chakra.label fontSize="0.75rem" fontWeight="500" color="#212429">
              Whatsapp number
            </chakra.label>
            <chakra.input
              type="tel"
              px="16px"
              defaultValue={cusNum}
              textTransform="capitalize"
              mt="1px"
              color="#333"
              placeholder="Phone number"
              border="1px solid rgba(154, 161, 174, 0.3)"
              borderRadius="12px"
              h="40px"
              _focus={{ border: "1px solid #1739E8", outline: "none" }}
              name="phone-number"
              onChange={(e) => setCusNum(e.target.value)}
              fontSize="0.875rem"
              disabled
              required
            />
          </chakra.div>
        </chakra.div>
      )}

      {cusType === "customer" && (
        <chakra.div mt="24px">
          <chakra.div
            border="1px solid rgba(0, 0, 0, 0.05)"
            p="8px"
            borderRadius="12px"
            mt="24px"
          >
            <chakra.div display="flex" flexDir="column" pos="relative">
              <chakra.label fontSize="0.75rem" fontWeight="500" color="#212429">
                Customer name
              </chakra.label>
              <chakra.input
                type="text"
                px="16px"
                value={newName?.name}
                textTransform="capitalize"
                mt="1px"
                color="#333"
                placeholder="Enter customer name"
                border="1px solid rgba(154, 161, 174, 0.3)"
                borderRadius="12px"
                h="40px"
                _focus={{ border: "1px solid #1739E8", outline: "none" }}
                name="customer-name"
                onChange={(e) => {
                  setNewName({ ...newName, name: e.target.value });
                  allShopCustomers(e.target.value);
                }}
                fontSize="0.875rem"
                required
              />
              {shopCustomers && shopCustomers.length > 0 && (
                <chakra.div
                  borderRadius="12px"
                  py="10px"
                  bg="white"
                  pos="absolute"
                  top="60px"
                  left="0"
                  right="0"
                  border="1px solid rgba(0, 0, 0, 0.05)"
                  maxH="200px"
                  h="fit-content"
                  overflowY="scroll"
                  zIndex="1"
                >
                  {shopCustomers.map(({ id, name, phone }) => (
                    <chakra.p
                      key={id}
                      color="#333"
                      py="12px"
                      px="10px"
                      _hover={{ bg: "#F5F8FA" }}
                      cursor="pointer"
                      onClick={() => {
                        setNewName({ name, phone });
                        setShopCustomers(null);
                      }}
                    >
                      {name} - {phone}
                    </chakra.p>
                  ))}
                </chakra.div>
              )}
            </chakra.div>

            <chakra.div display="flex" flexDir="column" mt="24px">
              <chakra.label fontSize="0.75rem" fontWeight="500" color="#212429">
                Whatsapp number
              </chakra.label>
              <chakra.input
                type="tel"
                px="16px"
                value={newName?.phone}
                textTransform="capitalize"
                mt="1px"
                color="#333"
                placeholder="Phone number"
                border="1px solid rgba(154, 161, 174, 0.3)"
                borderRadius="12px"
                h="40px"
                _focus={{ border: "1px solid #1739E8", outline: "none" }}
                name="phone-number"
                onChange={(e) => {
                  setNewName({ ...newName, phone: e.target.value });
                  allShopCustomers(e.target.value);
                }}
                fontSize="0.875rem"
                required
              />
            </chakra.div>
          </chakra.div>
        </chakra.div>
      )}

      <chakra.div display="flex" justifyContent="space-between" mt="24px">
        <chakra.p
          fontWeight="500"
          fontSize="13.76px"
          color="#757575"
          opacity="70%"
        >
          Enable delivery
        </chakra.p>
        {/* //TODO: Switch */}
        <Switch
          onChange={() => setDelivery(!delivery ? 1 : 0)}
          value={delivery}
        />
      </chakra.div>

      {delivery === 1 && <chakra.div
        border="1px solid rgba(0, 0, 0, 0.05)"
        p="8px"
        borderRadius="12px"
        mt="24px"
      >
        <chakra.div display="flex" flexDir="column" pos="relative">
          <chakra.label fontSize="0.75rem" fontWeight="500">
            Search for delivery addresses
          </chakra.label>
          <chakra.input
            ref={addressInput}
            type="text"
            px="16px"
            value={searchAddress}
            textTransform="capitalize"
            mt="1px"
            color="#333"
            placeholder="Enter address"
            border="1px solid rgba(154, 161, 174, 0.3)"
            borderRadius="12px"
            h="40px"
            _focus={{ border: "1px solid #1739E8", outline: "none" }}
            name="address"
            onFocus={() => setAddresses({ ...addresses, active: true })}
            onChange={e => {
              // setSearchAddress(e.target.value);
              // setAddresses({ ...addresses, active: false });
              getAddresses(e.target.value);
            }}
            fontSize="0.875rem"
            required
          />
          {addresses.active && <chakra.div
            ref={addressDropdown}
            borderRadius="12px"
            py="10px"
            bg="white"
            pos="absolute"
            top="60px"
            left="0"
            right="0"
            border="1px solid rgba(0, 0, 0, 0.05)"
            maxH="200px"
            h="fit-content"
            overflowY="scroll"
            zIndex="1"
          >
            {addresses.data.map(({ id, address, street_name, city, state }) => (
              <chakra.p
                key={id}
                color="#333"
                py="12px"
                px="10px"
                _hover={{ bg: "#F5F8FA" }}
                cursor="pointer"
                onClick={() => {
                  setSearchAddress({ id, address: address?.street_name || street_name });
                  setAddresses({ ...addresses, active: false });
                }}
              >
                {`${address?.street_name || street_name}, ${address?.city.name || city.name}, ${address?.state.name || state.name}`}
              </chakra.p>
            ))}

            <chakra.p
              onClick={createAddress.onOpen}
              fontWeight="400"
              fontSize="0.75rem"
              color="#EA4D33"
              textDecoration="underline"
              p="10px"
              cursor="pointer"
            >
              Can’t Find address? Fill in address manually
            </chakra.p>
          </chakra.div>}
        </chakra.div>
      </chakra.div>}

      <Button
        w="full"
        h="47.4px"
        fontSize="1.125rem"
        color="#FFFFFF"
        fontWeight="600"
        borderRadius="5.84265px"
        bg="#2153CC"
        m="32px auto 0"
        disabled={!cusType}
        _hover={{ bg: "#2153CC" }}
        _disabled={{ background: "#CCC", cursor: "not-allowed" }}
        onClick={() => {
          if (!cusType) {
            toast({
              title: "Please select customer",
              status: "info",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
          }
          if (cusType === "me") {
            onClose();
          }
          if (cusType === "customer") {
            if (newName?.name && newName?.phone) {
              setNewCustomer(newName);
              onClose()
            } else {
              toast({
                title: "Please enter customer name and phone number",
                status: "info",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }
          }
        }}
      >
        Finish
      </Button>

      <CreateAdress
        isOpen={createAddress.isOpen}
        onClose={createAddress.onClose}

      />
    </ModalUI>
  );
};

export default CustomerInfo;
