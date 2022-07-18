import { chakra } from "@chakra-ui/react";

interface Props {
  label?: string;
  rightElementText?: string;
  rightElementIcon?: any;
  type: string;
  onChange: (e: any) => void;
  placeholder: string;
  w?: string;
  containerMargin?: string | number;
  m?: string | number;
  disabled?: boolean;
  passwordClick?: () => void;
  passwordIcon?: any;
  value?: string;
  maxLength?: number;
  id?: string;
}

const Input = ({
  label,
  rightElementText,
  rightElementIcon,
  type,
  onChange,
  placeholder,
  w,
  containerMargin,
  m,
  disabled,
  passwordClick,
  passwordIcon,
  value,
  maxLength,
  id
}: Props) => (
  <chakra.div
    m={containerMargin}
  >
    <chakra.label
      fontSize="0.75rem"
      fontWeight="600"
      lineHeight="16px"
      htmlFor={id}
    >
      {label}

    </chakra.label>

    <chakra.div
      pos="relative"
      display="flex"
      alignItems="center"
      mt="4px"
    >
      {rightElementText && <chakra.span
        fontSize="0.875rem"
        fontWeight="500"
        lineHeight="16px"
        pos="absolute"
        pl="12px"
      >
        {rightElementText}
      </chakra.span>}
      <chakra.input
        id={id}
        onChange={onChange}
        type={type}
        display="flex"
        alignItems="center"
        w={w || "full"}
        m={m}
        pl={(rightElementText || rightElementIcon) ? "56px" : "12px"}
        pr={passwordIcon ? "48px" : "12px"}
        bg="#FFF"
        h={{ base: "48px", lg: "56px" }}
        value={value}
        border="1px solid #DCECFF"
        borderRadius="12px"
        fontSize="0.875rem"
        fontWeight="500"
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={["text", "tel"].includes(type) ? "on" : "off"}
        _hover={{ borderColor: "#2153CC" }}
        _focus={{ borderColor: "#2153CC", outline: "3px solid rgba(33, 83, 204, 0.2)" }}
        _placeholder={{ color: "#ACAEB3" }}
        _disabled={{ background: "#E9F1FC", border: "1px solid #CCE1FF" }}
      />
      {passwordIcon && <chakra.button
        pos="absolute"
        right="0"
        pr="12px"
        type="button"
        onClick={passwordClick}
        cursor="pointer"
        disabled={disabled}
        _disabled={{ cursor: "not-allowed" }}
      >
        {passwordIcon}
      </chakra.button>}
    </chakra.div>
  </chakra.div>
)

export default Input