import { IconType } from "./iconType"


const DashLedgerIcon = ({ width, height, color = "#A3AED0", active }: IconType) => {
  if (!active) {
    return (
      <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.2002 13.5733V15.6133C2.2002 20.6133 4.2002 22.6133 9.2002 22.6133H15.2002C20.2002 22.6133 22.2002 20.6133 22.2002 15.6133V9.61328C22.2002 4.61328 20.2002 2.61328 15.2002 2.61328H9.2002C4.2002 2.61328 2.2002 4.61328 2.2002 9.61328" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.53027 15.103L9.91027 12.013C10.2503 11.573 10.8803 11.493 11.3203 11.833L13.1503 13.273C13.5903 13.613 14.2203 13.533 14.5603 13.103L16.8703 10.123" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (active) {
    return (
      <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.3902 2.61328H8.0102C4.3702 2.61328 2.2002 4.78328 2.2002 8.42328V16.7933C2.2002 20.4433 4.3702 22.6133 8.0102 22.6133H16.3802C20.0202 22.6133 22.1902 20.4433 22.1902 16.8033V8.42328C22.2002 4.78328 20.0302 2.61328 16.3902 2.61328ZM17.4602 10.5733L15.1502 13.5533C14.8602 13.9233 14.4502 14.1633 13.9802 14.2133C13.5102 14.2733 13.0502 14.1433 12.6802 13.8533L10.8502 12.4133C10.7802 12.3533 10.7002 12.3533 10.6602 12.3633C10.6202 12.3633 10.5502 12.3833 10.4902 12.4633L8.1102 15.5533C7.9602 15.7433 7.7402 15.8433 7.5202 15.8433C7.3602 15.8433 7.2002 15.7933 7.0602 15.6833C6.7302 15.4333 6.6702 14.9633 6.9202 14.6333L9.3002 11.5433C9.5902 11.1733 10.0002 10.9333 10.4702 10.8733C10.9302 10.8133 11.4002 10.9433 11.7702 11.2333L13.6002 12.6733C13.6702 12.7333 13.7402 12.7333 13.7902 12.7233C13.8302 12.7233 13.9002 12.7033 13.9602 12.6233L16.2702 9.64328C16.5202 9.31328 17.0002 9.25328 17.3202 9.51328C17.6502 9.78328 17.7102 10.2533 17.4602 10.5733Z" fill="white" />
      </svg>
    )
  }
  return null
}

export default DashLedgerIcon