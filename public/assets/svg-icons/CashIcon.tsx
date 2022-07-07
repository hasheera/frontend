interface Props {
  width: string;
  height: string;
}

const CashIcon = ({ width, height }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.072 0.865234H1V12.0583H16.072V0.865234Z"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 4.5957H16.072"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CashIcon;
