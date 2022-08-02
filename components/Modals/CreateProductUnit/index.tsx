import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  chakra,
  useToast,
  InputRightElement,
  InputGroup,
  Input,
  Spinner,
} from "@chakra-ui/react";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface PopularCategories {
  data: { name: string; photo: string; id: number }[];
  loaded: boolean;
}

const CreateProductUnit: FC<Props> = ({ isOpen, onClose }) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formValues, setFormValues] = useState({
    name: "",
  photo: null,
  photoName: "",
  product_id: null,
  barcode: null,
});
const [addForm, setAddForm] = useState(true);
  // const [data, setData] = useState("");
  // const [popularCategories, setPopularCategories] = useState<PopularCategories>(
  //   { data: [], loaded: false }
  //   );
  // const [options, setOptions] = useState({
  //   options: [],
  //   search: false,
  // });
  const [isRequest, setIsRequest] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handlePhotoChange = (e: InputEvent) => {
    setFormValues({
      ...formValues,
      photo: e.target.files[0],
      photoName: e.target.files[0] ? e.target.files[0].name : "",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsRequest(true);
    const productId: any = router.query.id;
    const { name, photo, barcode } = formValues;

    const formData = new FormData();

    formData.append("product_id", productId);
    formData.append("name", name);
    formData.append("photo", photo);
    formData.append("barcode", barcode);

    AuthAxios.post("oga/product-unit/create", formData)
      .then((res) => {
        if (res.status === 200) {
          onClose();
          setIsRequest(false);
          toast({
            position: "top-right",
            description: "varient created successfully",
            status: "success",
            duration: 2000,
          });
        }
      })
      .catch((err) => {
        toast({
          position: "top-right",
          description: "An Error occured Please try again",
          status: "error",
          duration: 2000,
        });
        return err;
      });
  };

  useEffect(() => {
    if (formValues.photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(formValues.photo);
    } else {
      setPreviewImage("");
    }
  }, [formValues.photo]);

  return (
    <ModalUI open={isOpen} close={onClose} heading="Create variant">
      {addForm && (
        <chakra.div mt="12px" px="16px">
          <chakra.p fontSize="18px" fontWeight="500">
            Create new variant for {router.query.name}
          </chakra.p>
          <chakra.form
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
              <chakra.div gridColumn="1/3">
                <chakra.div display="flex" flexDir="column" mt={1} w="full">
                  <chakra.label fontSize="0.8rem" fontWeight="500">
                    Product Variant Name
                  </chakra.label>
                  <chakra.input
                    name="name"
                    id="name"
                    onChange={(e: InputEvent) =>
                      setFormValues({
                        ...formValues,
                        name: e.target.value,
                      })
                    }
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
                  <InputGroup>
                    <Input
                      name="barcode"
                      id="barcode"
                      onChange={(e: InputEvent) =>
                        setFormValues({
                          ...formValues,
                          barcode: e.target.value,
                        })
                      }
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
                    <InputRightElement>
                      <chakra.div
                        cursor="pointer"
                        w="10px"
                        h="10px"
                        borderRadius="50%"
                        bg="#000"
                       />
                    </InputRightElement>
                  </InputGroup>
                </chakra.div>
                <chakra.div mt="12px" w="full">
                  <chakra.label
                    htmlFor="unit-photo"
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
                      justifyContent="space-around"
                      fontWeight="400"
                      cursor="pointer"
                      id="unit-photo-name"
                      fontSize="0.875rem"
                      px="16px"
                      textTransform="capitalize"
                      mt="1px"
                      border="1px solid rgba(154, 161, 174, 0.3)"
                      borderRadius="12px"
                      // h="44px"
                      _focus={{
                        border: "1px solid #1739E8",
                        outline: "none",
                      }}
                      w="full"
                    >
                      <chakra.div w="80px" h="80px" border="">
                        <chakra.img
                          src={previewImage}
                          alt="preview"
                          w="100%"
                          h="100%"
                        />
                      </chakra.div>
                      {formValues.photoName}
                    </chakra.div>
                  </chakra.label>
                  <chakra.input
                    name="variant-photo"
                    id="unit-photo"
                    type="file"
                    display="none"
                    onChange={handlePhotoChange}
                    accept=".png,.jpg,.jpeg"
                    w="full"
                  />
                </chakra.div>
              </chakra.div>

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
                  disabled={isRequest}
                  width="full"
                  h="3rem"
                  bg="#2153CC"
                  mt="12px"
                  _focus={{ outline: "4px solid #9CAAF5" }}
                  borderRadius="5px"
                  type="submit"
                >
                  {isRequest ? (
                    <Spinner size="sm" color="#ffffff" />
                  ) : (
                    <chakra.p color="#ffffff" fontWeight="600">
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

export default CreateProductUnit;
