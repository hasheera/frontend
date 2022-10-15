/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra } from '@chakra-ui/react'

interface InputProps {
  label: string;
  type?: string;
  id?: string;
  inputClass?: string;
  placeholder: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  value?: string;
}


const Input = ({
  label,
  type,
  id,
  inputClass,
  placeholder,
  onChange,
  onBlur,
  value
}: InputProps) => (
  <chakra.div
    display="flex"
    flexDir="column"
    w="full"
  >
    <chakra.label
      htmlFor={id}
      width="fit-content"
      fontSize="1.4rem"
      fontWeight="500"
      lineHeight="1.6rem"
      color="#737F90;"
    >
      {label}
    </chakra.label>
    <chakra.input
      type={type || "text"}
      id={id}
      className={[inputClass].join(" ")}
      mt="0.6rem"
      height="4rem"
      bg="#F7F7F9"
      borderRadius="0.8rem"
      p="1.05rem 2rem"
      fontSize="1.6rem"
      fontWeight="500"
      lineHeight="1.9rem"
      color="#191D23"
      css={{
        caretColor: "#191D23"
      }}
      _hover={{
        border: "1px solid #A1C8F7"
      }}
      _focus={{
        border: "1px solid #A1C8F7",
        outline: "none"
      }}
      _placeholder={{
        color: "#A0ABBB"
      }}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
    />
  </chakra.div>
)

export default Input