/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra } from '@chakra-ui/react'

type Props = {
  id: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  title: string;
  selected: boolean;
}

const RadioInput = ({ id, value, name, onChange, title, selected }: Props) => (
  <chakra.label
    htmlFor={id}
    cursor="pointer"
    fontWeight="500"
    fontSize="1.4rem"
    lineHeight="1.6rem"
    color="#4B5768"
    display="flex"
    alignItems="center"
    gap="0.8rem"
    css={{
      "&:hover": {
        ".radio-input": {
          border: "1px solid #1374E7"
        }
      },
      "&:focus": {
        ".radio-input": {
          border: "1px solid #1374E7",
          outline: "none"
        }
      }
    }}
  >
    <chakra.input
      display="none"
      type="radio"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
    <chakra.span
      className="radio-input"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="2rem"
      h="2rem"
      bg="#F7F7F9"
      border="1px solid #E6EBEF"
      borderRadius="0.3rem"
    >
      {selected && <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6667 1.5L4.25 7.91667L1.33333 5" stroke="#1374E7" strokeWidth="1.3189" strokeLinecap="round" strokeLinejoin="round" />
      </svg>}
    </chakra.span>
    {title}
  </chakra.label>
)

export default RadioInput