
type Props = {
  w: number;
  h: number;
};

const StarIcon = ({ w, h }: Props) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.59306 6.28623L5.79004 7.58728L5.20702 5.13517L7.14804 3.48532L4.59201 3.26906L3.59306 0.959961L2.59412 3.26906L0.0380859 3.48532L1.97555 5.13517L1.39609 7.58728L3.59306 6.28623Z"
        fill="#FB8200"
      />
    </svg>
  );

export default StarIcon;
