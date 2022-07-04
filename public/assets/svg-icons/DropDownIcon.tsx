import { IconType } from "./iconType";

const DropDownIcon = ({ width, height, color }: IconType) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.22852 1.4082L5.40816 5.22856L1.5878 1.4082"
      stroke={color}
      strokeWidth="1.44075"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DropDownIcon;
