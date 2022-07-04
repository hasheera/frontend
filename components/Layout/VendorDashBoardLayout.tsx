import { chakra } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
// import VendorSideBar from "@components/Navbar/VendorSideBar";
import VendorNavbarHeader from "@components/Navbar/VendorNavbarHeader";
// import MobileFooterNav from "@components/Navbar/MobileFooterNav";
import { useAppDispatch, useAppSelector } from "hooks";
import { getUser, setUser, userData } from "store/slices/user";

interface Props {
  children: ReactNode;
}

const VendorDashBoardLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const { userLoaded } = useAppSelector(userData)
  
  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  if(!userLoaded) return <chakra.div>Loading...</chakra.div>

  return (
    <>
      {/* <VendorSideBar /> */}
      <chakra.div
        minH="100vh"
        ml={{ lg: "278px" }}
        bg="#F7F8FA"
      >
        <VendorNavbarHeader />
        <chakra.div
          // pt={{ base: "28px", md: "32px" }}
          px={{ base: "16px", xl: "48px" }}
          pb="26px"
        >
          {children}
        </chakra.div>
      </chakra.div>
      {/* <MobileFooterNav /> */}
    </>
  );
};

export default VendorDashBoardLayout;
