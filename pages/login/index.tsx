import { chakra, useToast } from "@chakra-ui/react";
import Button from "@components/Button";
import Input from "@components/Input";
import { PasswordCloseIcon } from "@public/assets";
import AuthAxios from "@utils/api/authAxios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [password, setPassword] = useState("");
  const [request, setRequest] = useState(false);
  const [numErr, setNumErr] = useState({ error: false, message: "" });
  const [confirmAuth, setConfirmAuth] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    contact_no: "",
    verification_code: "",
    surname: "",
    first_name: "",
    password: "",
  });
  const phonePattern = /^(\+?234|0)?(80|81|70|90)[0-9]{8}/g;
  const toast = useToast();

  const shopRole = (roles: { name: string }[]) => {
    const shopRoles = [
      "cashier",
      "manager",
      "inventoryManager",
      "accountant",
      "shopOwner",
    ];
    const adminRoles = ["subSupperAdmin", "supperAdmin"];
    const userRoles = roles.map((r: { name: string }) => r.name);

    if (
      userRoles.some((role: string) => shopRoles.includes(role)) ||
      userRoles.some((role: string) => adminRoles.includes(role))
    ) {
      return true;
    }
    return false;
  };

  const loginResponse = (res: AxiosResponse<any, any>) => {
    const { user, token } = res.data.data;
    if (window.location.origin.includes("shopurban")) {
      Cookies.set("token", token, { path: '/', domain: process.env.NEXT_PUBLIC_DOMAIN, secure: true, sameSite: 'none' });
    } else {
      Cookies.set("token", token);
    }

    Cookies.set("hasShopRole", JSON.stringify(shopRole(user.roles)));
    toast({
      description: "Login successful",
      status: "success",
      duration: 2500,
      position: "top-right",
    });
    return window.location.replace("/dashboard");
  };

  const completeRegistration = (e: any) => {
    e.preventDefault();

    const phone =
      loginDetails.contact_no.charAt(0) === "0"
        ? loginDetails.contact_no.slice(1)
        : loginDetails.contact_no;

    setRequest(true);
    AuthAxios.post("/auth/complete-registration", {
      ...loginDetails,
      contact_no: `+234${phone}`,
    })
      .then((res) => {
        setRequest(false);
        loginResponse(res)
      })
      .catch((err) => {
        setRequest(false);
        setNumErr({
          error: true,
          message:
            e.response.data.message || "An error occurred. Please try again.",
        });
        setTimeout(() => {
          setNumErr({ error: false, message: "" });
        }, 2500);
        return err;
      });
  };

  const checkPhoneNum: any = (e: any) => {
    e.preventDefault();

    const phoneMatch = loginDetails.contact_no.match(phonePattern);
    const phone =
      loginDetails.contact_no.charAt(0) === "0"
        ? loginDetails.contact_no.slice(1)
        : loginDetails.contact_no;

    if (phoneMatch) {
      setRequest(true);
      AuthAxios.post("/auth/enter-phone", { contact_no: `+234${phone}` })
        .then((res) => {
          setRequest(false);
          if (res.status && res.data.status === "success") {
            if (res.data.data.is_phone_verified) {
              setIsVerified(true);
              setConfirmAuth(true);
              document.getElementById("password").focus();
            } else {
              setIsVerified(false);
            }
          }
        })
        .catch((err) => {
          setRequest(false);
          setNumErr({
            error: true,
            message: "An error occurred. Please try again.",
          });
          setTimeout(() => {
            setNumErr({ error: false, message: "" });
          }, 2500);
          return err;
        });
    } else {
      setNumErr({ error: true, message: "Enter a valid phone number" });
      return setTimeout(() => {
        setNumErr({ error: false, message: "" });
      }, 2500);
    }
    return null
  };

  const confirmLogin = (e: any) => {
    e.preventDefault();

    const phone =
      loginDetails.contact_no.charAt(0) === "0"
        ? loginDetails.contact_no.slice(1)
        : loginDetails.contact_no;

    setRequest(true);
    AuthAxios.post("/auth/password-login", {
      ...loginDetails,
      contact_no: `+234${phone}`,
    })
      .then((res) => {
        setRequest(false);
        loginResponse(res)
      })
      .catch((err) => {
        setRequest(false);
        setNumErr({
          error: true,
          message:
            err.response?.data.message || "An error occurred. Please try again.",
        });
        setTimeout(() => {
          setNumErr({ error: false, message: "" });
        }, 2500);
        return e;
      });
  };

  return (
    <chakra.div>
      <chakra.nav
        px="28px"
        h="64px"
        display={{ base: "flex", lg: "none" }}
        alignItems="center"
        boxShadow="0px 4px 7px rgba(172, 174, 178, 0.12)"
      >
        <chakra.img src="/assets/image/logo.png" w="132px" />
      </chakra.nav>

      <chakra.div display="flex">
        <chakra.div bg="#2153CC" display={{ base: "none", lg: "block" }} w="30vw" h="100vh" />
        <chakra.div
          mt={{ base: "100px", lg: "0" }}
          px={{ base: "28px", lg: "0" }}
          w={{ sm: "400px", lg: "480px" }}
          h="100vh"
          mx="auto"
          display={{ lg: "flex" }}
          flexDir={{ lg: "column" }}
          justifyContent={{ lg: "center" }}
        >
          {isVerified ? (
            <>
              <chakra.h3
                fontSize="1.25rem"
                fontWeight="700"
                lineHeight="24px"
              >
                Login
              </chakra.h3>
              <chakra.p
                mt="8px"
                color="#ACAEB3"
                fontSize="0.875rem"
                fontWeight="500"
              >
                Enter your credentials to access your account
              </chakra.p>
            </>
          ) : (
            <>
              <chakra.h3
                fontSize="1.25rem"
                fontWeight="700"
                lineHeight="24px"
              >
                Get Started
              </chakra.h3>
              <chakra.p
                mt="8px"
                color="#ACAEB3"
                fontSize="0.875rem"
                fontWeight="500"
              >
                Complete your registration to access your account
              </chakra.p>
            </>
          )}

          <chakra.form
            mt="62px"
          >
            {isVerified ? (
              <>
                <Input
                  label="Phone number"
                  type="tel"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      contact_no: e.target.value,
                    })
                  }
                  value={loginDetails.contact_no}
                  placeholder="08012345678"
                  rightElementText="+234"
                  disabled={confirmAuth}
                />
                {confirmAuth && <Input
                  id="password"
                  label="Password"
                  containerMargin="24px 0 0"
                  type={passwordShow ? "text" : "password"}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })}
                  placeholder="Atleast 8 characters"
                  passwordIcon={<PasswordCloseIcon width={21} height={20} color={!loginDetails.contact_no ? "#52689D" : "#0F1010"} />}
                  passwordClick={() => setPasswordShow(!passwordShow)}
                />}
                {/* <Link href="/password/forgot" passHref>
                      <chakra.a
                        color="#2153CC"
                        fontSize="0.75rem"
                        fontWeight="600"
                        lineHeight="16px"
                        mt="8px"
                        display="inline-block"
                        float="right"
                      >
                        Forgot password?
                      </chakra.a>
                    </Link> */}
                <Button
                  type="button"
                  btnStyle="primary"
                  value="Continue"
                  m="48px 0 0"
                  disabled={request}
                  loading={request}
                  onClick={confirmAuth ? (e) => confirmLogin(e) : (e) => checkPhoneNum(e)}
                />
              </>
            ) : (
              <>
                <Input
                  label="Input the OTP number sent to you"
                  value={loginDetails.verification_code}
                  containerMargin="24px 0 0"
                  type={passwordShow ? "text" : "password"}
                  maxLength={4}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      verification_code: e.target.value,
                    })}
                  placeholder="****"
                  passwordIcon={<PasswordCloseIcon width={21} height={20} color="#0F1010" />}
                  passwordClick={() => setPasswordShow(!passwordShow)}
                />
                <Input
                  label="Surname"
                  type="text"
                  containerMargin="24px 0 0"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      surname: e.target.value,
                    })}
                  value={loginDetails.surname}
                  placeholder="Please enter your surname"
                />
                <Input
                  label="First name"
                  type="text"
                  containerMargin="24px 0 0"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      first_name: e.target.value,
                    })}
                  value={loginDetails.first_name}
                  placeholder="Please enter your first name"
                />
                <Input
                  label="Password"
                  containerMargin="24px 0 0"
                  type={passwordShow ? "text" : "password"}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })}
                  placeholder="Atleast 8 characters"
                  passwordIcon={<PasswordCloseIcon width={21} height={20} color="#0F1010" />}
                  passwordClick={() => setPasswordShow(!passwordShow)}
                />
                <Button
                  type="button"
                  btnStyle="primary"
                  value="Complete registration"
                  m="48px 0 0"
                  disabled={request}
                  loading={request}
                  onClick={(e) => completeRegistration(e)}
                />
              </>
            )}
          </chakra.form>
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
}

export default Login