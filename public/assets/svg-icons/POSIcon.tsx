interface Props {
  width: string;
  height: string;
}

const POSIcon = ({ width, height }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.1278 4.35088H14.267V0.046875H3.93735V4.35088H3.07655C1.64761 4.35088 0.494141 5.50436 0.494141 6.93329V12.0981H3.93735V15.5413H14.267V12.0981H17.7102V6.93329C17.7102 5.50436 16.5567 4.35088 15.1278 4.35088ZM5.65895 1.76848H12.5454V4.35088H5.65895V1.76848ZM12.5454 12.0981V13.8197H5.65895V10.3765H12.5454V12.0981ZM14.267 10.3765V8.65489H3.93735V10.3765H2.21574V6.93329C2.21574 6.45985 2.6031 6.07249 3.07655 6.07249H15.1278C15.6012 6.07249 15.9886 6.45985 15.9886 6.93329V10.3765H14.267Z"
      fill="#2153CC"
    />
  </svg>
);

export default POSIcon;
