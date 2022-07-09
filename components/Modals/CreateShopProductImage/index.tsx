import { FC, useState } from "react";
import {
  Box,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useAppSelector } from "hooks";
import { shopsData } from "store/slices/shops";
import AuthAxios from "@utils/api/authAxios";
import ModalUI from "..";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateShopProductImage: FC<Props> = ({ isOpen, onClose }) => {
  const { singleProduct, singleShop } = useAppSelector(shopsData);
  const toast = useToast();
  const [photoCount, setPhotoCount] = useState(0);
  const [isRequest, setIsRequest] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>([]);
  const [fileName, setFileName] = useState("Select logo");
  const [photosForm, setPhotosForm] = useState({
    photos: [],
  });
  const [formValues, setFormvalues] = useState({
    logo: null,
  });
  // useEffect(() => {
  //   if (formValues.logo) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(formValues.logo);
  //   } else {
  //     setImagePreview("");
  //   }
  // }, [formValues.logo]);

  const createShopPhotoImage = async () => {
    const formData: any = new FormData();

    formData.append("shop_id", singleShop.selectedShop.id);
    formData.append("shop_product_id", singleProduct.id);
    for (let i = 0; i < photosForm.photos.length; i+1) {
      formData.append(`photo[${i}]`, photosForm.photos[i].photo);
    }

    try {
      setIsRequest(true);
      const res = await AuthAxios.post(
        `oga/shop-product-image/create?shop_id=${singleShop.selectedShop.id}&shop_product_id=${singleProduct.id}`,
        formData
      );
      console.log(res);

      if (res.status === 200) {
        toast({
          position: "top",
          status: "success",
          duration: 3000,
          description: "Product Imsge Created Successfully",
        });
        setFormvalues({ logo: null });
        onClose();
        setIsRequest(false);
      }
      return res
    } catch (error) {
      setIsRequest(false);
      return error;
    }
  };

  const addPhotoForm = () => {
    setPhotoCount((num) => num + 1);
    const photos = [...photosForm.photos];
    photos[photoCount] = {
      fileName: "",
      photo: null,
    };
    setPhotosForm({
      ...photosForm,
      photos,
    });
  };

  const removePhotoForm = (i: number) => {
    setPhotoCount((num) => num - 1);
    const photos = [...photosForm.photos];
    photos.slice(i, 1);
    setPhotosForm({
      ...photosForm,
      photos,
    });
  };

  const renderImageToBase64 = (file: any, i) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview([
        ...imagePreview,
        (imagePreview[i] = reader.result as string),
      ]);
      reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const photoHandle = (e: any, i: number) => {
    const photos = [...photosForm.photos];

    renderImageToBase64(e.target.files[0], i);

    photos[i] = {
      ...photos[i],
      photo: e.target.files[0],
      fileName: e.target.files[0].name,
    };
    setPhotosForm({
      ...photosForm,
      photos,
    });
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Promote Product">
      {[...Array.from(Array(photoCount).keys())].map((a, i: number) => (
        <>
          <FormControl key={a}>
            <FormLabel htmlFor={`logo-${i}`} w="100%">
              Photo {i + 1}
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
                  {imagePreview[i] && (
                    <chakra.img
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      src={imagePreview[i]}
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
                  {photosForm.photos[i].fileName
                    ? `${photosForm.photos[i].fileName.slice(0, 20)}...`
                    : "Select Logo"}
                </Box>
              </chakra.div>
            </FormLabel>
            <Input
              name={`logo-${i}`}
              id={`logo-${i}`}
              type="file"
              display="none"
              onChange={(e) => {
                photoHandle(e, i);
              }}
              accept=".png,.jpg,.jpeg"
            />
          </FormControl>
          <chakra.button
            onClick={() => removePhotoForm(i)}
            color="red"
            fontSize="14px"
            fontWeight="400"
          >
            Remove
          </chakra.button>
        </>
      ))}

      <chakra.button
        onClick={addPhotoForm}
        w="full"
        h="40px"
        borderRadius="6px"
        color="#fff"
        fontSize="14px"
        fontWeight="500"
        bg="#2153CC"
        my="20px"
      >
        Add Photo
      </chakra.button>

      <chakra.div w="full" display="flex" justifyContent="center">
        <chakra.button
          onClick={() => createShopPhotoImage()}
          disabled={isRequest}
          w="200px"
          h="42"
          borderRadius="5px"
          bg="#2153CC"
          color="#fff"
          fontWeight="500"
          fontSize="16px"
        >
          {isRequest ? <Spinner color="#fff" size="sm" /> : "  Submit"}
        </chakra.button>
      </chakra.div>
    </ModalUI>
  );
};

export default CreateShopProductImage;
