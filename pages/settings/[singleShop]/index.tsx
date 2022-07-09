import React, { useContext, useEffect, useState } from "react";
import {
  chakra,
  Avatar,
  Input,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  useToast,
} from "@chakra-ui/react";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import { ErrorIcon } from "public/assets";
import { apiCall } from "@utils/api";
import Cookies from "js-cookie";
import { ShopContext } from "@providers/shopProvider";
import { NextPage } from "next";

const Settings: NextPage = () => {
  const { vendorSingleShop, shopSettings, listShopSettings } = useContext(ShopContext);
  const toast = useToast();
  const [settings, setSettings] = useState({
    vat: "",
    receipt_note: "",
    instagram: "",
    facebook: "",
    email: "",
    term_and_conditions: "",
    privacy_policy: ""
  })

  //   Table Headers
  const tablrHeader: string[] = ["Name", "Users", "Permisions"];

  useEffect(() => {
    if (vendorSingleShop.loaded) {
      const shopId = Cookies.get("shopId");
      listShopSettings(shopId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorSingleShop]);

  useEffect(() => {
    if(shopSettings) {
      setSettingsData(shopSettings)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopSettings])
  

  const createOrUpdateSettings = async (key: string, value: string) => {
    const shopId = Cookies.get("shopId");
    const res = await apiCall(`/oga/shop/setting/create`, "POST", {
      shop_id: shopId,
      key,
      value,
    });
    if (res.status === 200) {
      listShopSettings(shopId);
      toast({
        description: `${res.data.message}`,
        position: "top-right",
        status: "success",
        duration: 2000,
      });
    }
  };

  const setSettingsData = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.key === "receipt_note") {
        setSettings({ ...settings, receipt_note: element.value });
      }
      if (element.key === "term_and_conditions") {
        setSettings({ ...settings, term_and_conditions: element.value });
      }
      if (element.key === "privacy_policy") {
        setSettings({ ...settings, privacy_policy: element.value });
      }
      if (element.key === "facebook") {
        setSettings({ ...settings, facebook: element.value });
      }
      if (element.key === "email") {
        setSettings({ ...settings, email: element.value });
      }
      if (element.key === "instagram") {
        setSettings({ ...settings, instagram: element.value });
      }
      if (element.key === "vat") {
        setSettings({ ...settings, vat: element.value });
      }
    }
  };

  return (
    <VendorDashBoardLayout>
      <chakra.p color="#333333" fontFamily="600" fontSize="22.19px">
        Settings
      </chakra.p>
      <chakra.div
        h="214px"
        borderRadius="8px"
        bg="#fff"
        mt="20px"
        overflow="hidden"
      >
        <chakra.div w="100%" h="50%" pos="relative">
          <chakra.img
            w="100%"
            h="100%"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1638913970961-1946e5ee65c4?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=600"
            alt="image"
          />
          <chakra.button
            pos="absolute"
            bottom="10px"
            right="20px"
            w="139px"
            h="32px"
            borderRadius="4px"
            fontSize="15px"
            fontWeight="500"
            color="#fff"
            zIndex="1"
            bg="#2153CC"
          >
            Change Banner
          </chakra.button>
        </chakra.div>

        <chakra.div d="flex" m="20px" alignItems="center">
          <Avatar
            size="lg"
            src={vendorSingleShop.selected?.shop.logo}
            name={vendorSingleShop.selected?.shop.name}
          />
          <chakra.div ml="10px">
            <chakra.p color="#506176" fontSize="12px" fontWeight="500">
              Recommended dimensions: 200x200, maximum file size: 5MB
            </chakra.p>
            <chakra.button
              color="#003ECB"
              fontSize="12px"
              px="10px"
              py="5px"
              my="8px"
              borderRadius="8px"
              border="1.08202px solid rgba(27, 27, 27, 0.25)"
              fontWeight="500"
            >
              Change Logo
            </chakra.button>
          </chakra.div>
        </chakra.div>
      </chakra.div>

      <chakra.p fontSize="20px" fontWeight="500" color="#2153CC" mt="30px">
        Link Social Media
      </chakra.p>
      <chakra.div borderRadius="8px" bg="#FFFFFF" mt="20px" p="20px">
        <chakra.p fontSize="14px" fontWeight="600" color="#2153CC">
          Instagram
        </chakra.p>

        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() => createOrUpdateSettings("instagram", settings.instagram)}
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>

        <chakra.p fontSize="14px" fontWeight="600" mt="35px" color="#2153CC">
          Facebook
        </chakra.p>
        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() => createOrUpdateSettings("facebook", settings.facebook)}
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>

        <chakra.p fontSize="14px" fontWeight="600" mt="35px" color="#2153CC">
          Email Address
        </chakra.p>
        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() => createOrUpdateSettings("email", settings.email)}
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>
      </chakra.div>

      <chakra.p fontSize="20px" fontWeight="500" color="#2153CC" mt="30px">
        Invoice Settings
      </chakra.p>
      <chakra.div borderRadius="8px" bg="#FFFFFF" mt="20px" p="20px">
        <chakra.p fontSize="14px" fontWeight="600" color="#2153CC">
          Refund Policy
        </chakra.p>

        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.privacy_policy}
              onChange={(e) => setSettings({ ...settings, privacy_policy: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() =>
              createOrUpdateSettings("privacy_policy", settings.privacy_policy)
            }
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>

        <chakra.p fontSize="14px" fontWeight="600" mt="35px" color="#2153CC">
          Terms & Conditions
        </chakra.p>
        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.term_and_conditions}
              onChange={(e) => setSettings({ ...settings, term_and_conditions: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() =>
              createOrUpdateSettings("term_and_conditions", settings.term_and_conditions)
            }
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>

        <chakra.p fontSize="14px" fontWeight="600" mt="35px" color="#2153CC">
          VAT
        </chakra.p>
        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.vat}
              onChange={(e) => setSettings({ ...settings, vat: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() => createOrUpdateSettings("vat", settings.vat)}
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>

        <chakra.p fontSize="14px" fontWeight="600" mt="35px" color="#2153CC">
          Receipt Note
        </chakra.p>
        <chakra.div
          w="600px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.div d="flex" alignItems="center">
            <Input
              value={settings.receipt_note}
              onChange={(e) => setSettings({ ...settings, receipt_note: e.target.value})}
              w="408px"
              h="45px"
            />
            <chakra.div ml="10px">
              <ErrorIcon />
            </chakra.div>
          </chakra.div>
          <chakra.button
            onClick={() => createOrUpdateSettings("receipt_note", settings.receipt_note)}
            w="79px"
            h="42"
            borderRadius="4px"
            bg="#2153CC"
            color="#fff"
            fontSize="15px"
          >
            Save
          </chakra.button>
        </chakra.div>
      </chakra.div>
      <chakra.p fontSize="20px" fontWeight="500" color="#2153CC" mt="30px">
        Roles & Permissions
      </chakra.p>
      <TableContainer bg="#fff" borderRadius="4px" mt="20px">
        <Table>
          <Thead>
            <Tr>
              {tablrHeader.map((header: string, i: number) => (
                <Th key={i} color="#333333" opacity="50%">
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </VendorDashBoardLayout>
  );
};

export default Settings;
