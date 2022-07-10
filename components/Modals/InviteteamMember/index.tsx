import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import AuthAxios from "@utils/api/authAxios";
import { useAppSelector } from "hooks";
import { ReactElement, useState } from "react";
import { shopsData } from "store/slices/shops";
import ModalUI from "..";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roles: { id: number; name: string }[];
}

const InviteTeamModal = ({ isOpen, onClose, roles }: Props): ReactElement => {
  const { singleShop } = useAppSelector(shopsData);
  const [isRequest, setIsRequest] = useState(false);
  const [formValues, setFormValues] = useState({
    user_phone_number: "",
    shop_id: "",
    role_name: "",
  });
  const toast = useToast();

  const submitForm = async (e) => {
    e.preventDefault();
    if (formValues.role_name === "") {
      return toast({
        description: "Please assign a role to user",
        status: "info",
        duration: 3000,
        position: "top",
      });
    }
    try {
      setIsRequest(true);
      const phone = formValues.user_phone_number;
      const res = await AuthAxios.post("/oga/user/shop/assign/role", {
        ...formValues,
        shop_id: singleShop.selectedShop.id,
        user_phone_number:
          phone.charAt(0) === "0" ? `+234${phone.slice(1)}` : `+234${phone}`,
      });
      if (res.status === 200) {
        setIsRequest(false);
        onClose();
        return toast({
          description: "Invite has been sent to user",
          status: "success",
          duration: 3000,
          position: "top",
        });
      }
      return res;
    } catch (err) {
      setIsRequest(false);
      return err;
    }
  };

  return (
    <ModalUI open={isOpen} close={onClose} heading="Invite team member">
      <form onSubmit={submitForm}>
        <Grid templateColumns="1fr 1fr" columnGap="16px">
          <FormControl>
            <FormLabel mb="2px" fontSize="0.875rem">
              Users Phone Number
            </FormLabel>
            <InputGroup h="32px">
              <InputLeftAddon fontSize="14px" px="8px" bg="white">
                <svg
                  width="28px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 6 3"
                >
                  <path fill="#008751" d="M0 0h6v3H0z" />
                  <path fill="#FFF" d="M2 0h2v3H2z" />
                </svg>
              </InputLeftAddon>
              <Input
                name="phoneNumber"
                value={formValues.user_phone_number}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    user_phone_number: e.target.value,
                  });
                }}
                type="tel"
                fontSize="14px"
                pl="5px"
                maxLength={11}
                placeholder="08013456789"
                required
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel mb="2px" fontSize="0.875rem">
              Shop Roles
            </FormLabel>
            <Select
              required
              name="roles"
              id="roles"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  role_name: e.target.value,
                })
              }
            >
              <option>Select role</option>
              {roles.length > 0 &&
                roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </option>
                  ))}
            </Select>
          </FormControl>
        </Grid>
        <Box mt="24px">
          <Text fontStyle="italic" fontSize="0.875rem" color="#27282E">
            By clicking send invite, the user will receive a notification
          </Text>
          <Button
            disabled={isRequest}
            width="full"
            h="48px"
            bg="#1739E8"
            mt="4px"
            color="white"
            type="submit"
            _hover={{ bg: "#1739E8" }}
          >
            {isRequest ? "..." : "Send Invite"}
          </Button>
        </Box>
      </form>
    </ModalUI>
  );
};

export default InviteTeamModal;
