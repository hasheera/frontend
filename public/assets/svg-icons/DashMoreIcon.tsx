import { IconType } from "./iconType"


const DashMoreIcon = ({ width, height, color = "#A3AED0", active }: IconType) => {
  if (!active) {
    return (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.66 4.52043L19.49 7.35043L16.66 10.1804L13.83 7.35043L16.66 4.52043ZM9 5.00043V9.00043H5V5.00043H9ZM19 15.0004V19.0004H15V15.0004H19ZM9 15.0004V19.0004H5V15.0004H9ZM16.66 1.69043L11 7.34043L16.66 13.0004L22.32 7.34043L16.66 1.69043ZM11 3.00043H3V11.0004H11V3.00043ZM21 13.0004H13V21.0004H21V13.0004ZM11 13.0004H3V21.0004H11V13.0004Z" fill={color} />
      </svg>
    )
  }

  if (active) {
    return (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 13.0004V21.0004H21V13.0004H13ZM3 21.0004H11V13.0004H3V21.0004ZM3 3.00043V11.0004H11V3.00043H3ZM16.66 1.69043L11 7.34043L16.66 13.0004L22.32 7.34043L16.66 1.69043Z" fill="white" />
      </svg>
    )
  }
  return null
}

export default DashMoreIcon