/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import { FC, useEffect, useState } from "react";
import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { getStates, getCities } from "@utils/queries";
import AuthAxios from "@utils/api/authAxios";
import useSWR from "swr";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setFormvaluesProp?: any;
  setStreetName?: any;
  addValue?: any;
  // formValuesProp: any;
};
type InputEventType = React.ChangeEvent<HTMLInputElement>;
type FormEventType = React.ChangeEvent<HTMLFormElement>;

type FormValues = {
  street_name: string;
  land_mark: string;
  country_id: number;
  city_id: any;
  state_id: any;
};


const StateOptions = () => {
  const { data, error } = useSWR("/auth/state/list/160", getStates);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(data) setStates(data);
    return () => data && setStates(data);
  }, [data]);

  useEffect(() => {
    if (data || error) {
      setLoading(false);
    }
  }, [data, error]);

  return (
    <>
      {loading ? (
        <option value="">Loading...</option>
      ) : data ? (
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

const CityOptions = ({ stateId }: any) => {
  const [cityList, setCities] = useState([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (stateId) {
      setLoading(true);
      getCities(stateId)
        .then((cities) => {
          setLoading(false);
          setCities(cities);
        })
        .catch((e) => {
          setLoading(false);
          setError(e.message);
        });
    }
  }, [stateId]);

  return (
    <>
      {loading ? (
        <option value="">Loading...</option>
      ) : cityList.length ? (
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

const CreateAdress: FC<Props> = ({
  isOpen,
  onClose,
  setFormvaluesProp,
  setStreetName,
  addValue,
}) => {
  const toast = useToast();
  const [currentState, setCurrentState] = useState("");
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [createAdressFormValues, setCreateAdressFormvalues] =
    useState<FormValues>({
      street_name: "",
      land_mark: "",
      //  The Country Id : 160 is for
      country_id: 160,
      city_id: "",
      state_id: "",
    });

  useEffect(() => {
    setCreateAdressFormvalues((va) => ({ ...va, street_name: addValue }));
  }, [addValue]);

  //   Input Change Handler
  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
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
        position: "top",
        status: "error",
        duration: 3000,
      });
    }

    setIsRequest(true);
    AuthAxios.post(
      `/oga/address/create?country_id=${createAdressFormValues.country_id}&state_id=${createAdressFormValues.state_id}&city_id=${createAdressFormValues.city_id}&street_name=${createAdressFormValues.street_name}&land_mark=${createAdressFormValues.land_mark}`
    )
      .then((res) => {
        if (res.status === 200) {
          setIsRequest(false);
          toast({
            description: "Adress Created Successfully",
            position: "top",
            status: "success",
            duration: 3000,
          });
          setStreetName(res.data.data.street_name);
          setFormvaluesProp((values) => ({
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
            city_id: "",
            state_id: "",
          });
          onClose();
        }
      })
      .catch((err) => err);
      return null;
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Create Adress">
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
              <chakra.p color="#FFFFFF" fontSize="18px" fontWeight="600">
                Submit
              </chakra.p>
            )}
          </chakra.button>
        </Flex>
      </chakra.form>
    </ModalUI>
  );
};

export default CreateAdress;
