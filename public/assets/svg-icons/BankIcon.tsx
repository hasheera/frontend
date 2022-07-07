interface Props {
  width: string;
  height: string;
}

const BankIcon = ({ width, height }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.908203 4.02092L8.4442 1.22266L15.9802 4.02092"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.908203 16.1465H15.9802"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.44531 12.4149V6.81836"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.0957 12.4149V6.81836"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.79102 12.4149C2.79102 12.4149 2.79102 9.00394 2.79102 6.81836"
      stroke="#2153CC"
      strokeWidth="1.65823"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BankIcon;
