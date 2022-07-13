import { chakra, Spinner } from "@chakra-ui/react";


interface Props {
  loading?: boolean;
  value: string;
  btnStyle: string;
  w?: string;
  m?: string;
  disabled?: boolean;
  onClick: (e?: any) => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  loading,
  value,
  btnStyle,
  w,
  m,
  disabled,
  onClick,
  type
}: Props) => {
  const btnBg = () => {
    if (btnStyle === "primary") {
      return "#2153CC"
    }
    return null;
  };

  return (
    <chakra.button
      type={type}
      bg={btnBg()}
      color="#FBFBFB"
      w={w || "full"}
      h={{ base: "48px", lg: "56px" }}
      borderRadius="12px"
      fontSize="1rem"
      fontWeight="600"
      lineHeight="24px"
      letterSpacing="0.1px"
      m={m}
      cursor="pointer"
      disabled={disabled}
      _hover={{ background: "#3163DC" }}
      _focus={{ background: "#0A38A7" }}
      _disabled={{ background: "#52689D", cursor: "not-allowed" }}
      onClick={onClick}
    >
      {loading ? <Spinner color="#FBFBFB" size="sm" /> : value}
    </chakra.button>
  )
}

export default Button