import { Button, chakra, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import VendorDashBoardLayout from "@components/Layout/VendorDashBoardLayout";
import { ProductQuntityAddCard } from "@components/VendorProductComponent";
import Link from "next/link";
import { DropDownIcon } from "@public/assets";

const TransferProduct: NextPage = () => {
  const [bactToolData, setBactToolData] = useState();
  const [qtyData, setQtyData] = useState([]);
  const [realQtyData, setRealQtyData] = useState([]);
  const [updateQtyData, setUpdateQtyData] = useState({});

  useEffect(() => {
    const data: any = localStorage.getItem("bactToolData");
    setBactToolData(JSON.parse(data));
  }, []);

  let globalE: any;

  const onHandlerChangeForm = (e: any, data: any) => {
    globalE = e;
    const checking: any = qtyData.find((val) => val.shop_product_id === data.id);
    if (checking !== undefined) {
      setUpdateQtyData({ ...checking, quantity: e });
    } else {
      const val = qtyData.concat({
        shop_id: "",
        quantity: e,
        shop_product_id: data.id,
        receiver_shop_id: "",
      });
      setQtyData(val);
    }
  };

  useEffect(() => {
    const isEmpty = Object.keys(updateQtyData).length !== 0;
    if (isEmpty) {
      const data = [];
      const val = qtyData.concat(updateQtyData);
      val.forEach((x) => {
        let find;
        if (
          (find === data.find((y) => y.shop_product_id === x.shop_product_id))
        ) {
          find.shop_product_id = Array.isArray(find.shop_product_id)
            ? [...find.shop_product_id, x.shop_product_id]
            : [find.shop_product_id, x.shop_product_id];
        } else {
          data.push(x);
        }
      });
      setQtyData(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQtyData]);

  // useEffect(() => {
  //   let data: any = realQtyData.concat(qtyData);
  //   items.forEach(x => {
  //     let find;
  //     if (find = dest.find(y => y.title === x.title)) {
  //         find.id = Array.isArray(find.id) ? [...find.id, x.id] : [find.id, x.id]
  //     } else {
  //         dest.push(x)
  //     }
  // })

  //   let val = Array.from(new Set(data));
  //   setRealQtyData(val);
  // }, [qtyData]);

  return (
    <VendorDashBoardLayout>
      <chakra.div
        display="flex"
        mb="30px"
      >
        <chakra.div style={{ marginTop: "-5px" }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_10322_48902)">
              <path
                d="M-3.60254 16.1573C-3.60254 5.59051 4.96356 -2.97559 15.5304 -2.97559C26.0972 -2.97559 34.6633 5.59051 34.6633 16.1573C34.6633 26.7242 26.0972 35.2903 15.5304 35.2903C4.96356 35.2903 -3.60254 26.7242 -3.60254 16.1573Z"
                stroke="#082CF5"
                strokeWidth="0.970696"
              />
              <path
                d="M24.5235 15.4309H10.3665L13.9432 11.8442L12.5345 10.4355L6.54004 16.43L12.5345 22.4245L13.9432 21.0158L10.3665 17.4291H24.5235V15.4309Z"
                fill="black"
              />
            </g>
            <rect
              x="0.485348"
              y="1.1123"
              width="30.0916"
              height="30.0916"
              rx="15.0458"
              stroke="#082CF5"
              strokeWidth="0.970696"
            />
            <defs>
              <clipPath id="clip0_10322_48902">
                <rect
                  y="0.626953"
                  width="31.0623"
                  height="31.0623"
                  rx="15.5311"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </chakra.div>
        <chakra.p
          pl="10px"
          fontSize="17.47px"
          color="#000000"
          fontWeight="500"
        >
          Selected Products
        </chakra.p>
      </chakra.div>

      <chakra.div
        display="flex"
        justifyContent="space-between"
        mb="30px"
      >
        <chakra.div display="flex">
          <chakra.p
            pr="10px"
            fontSize="13.59px"
            color="#2153CC"
            fontWeight="600"
            pt="5px"
          >
            Transfer product to
          </chakra.p>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<DropDownIcon width={12} height={12} />}
              h="38.42px"
              w="150pxpx"
              borderRadius="5px"
              mr="20px"
            >
              List of shops
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
            </MenuList>
          </Menu>
          <chakra.button
            bg="#2153CC"
            color="#ffffff"
            fontSize="13px"
            fontWeight="500"
            borderRadius="5px"
          >
            Make Transfer
          </chakra.button>
        </chakra.div>

        <chakra.div
          pl="12px"
        >
          <svg
            width="50"
            height="65"
            viewBox="0 0 71 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M51.0282 48.6041V42.5521L42.417 51.1979L51.0282 59.8437V53.7916H70.0837V48.6041H51.0282ZM61.4724 63.3021H42.417V68.4896H61.4724V74.5416L70.0837 65.8958L61.4724 57.25V63.3021ZM26.8545 14.0208C30.6587 14.0208 33.7712 10.9083 33.7712 7.10416C33.7712 3.3 30.6587 0.1875 26.8545 0.1875C23.0503 0.1875 19.9378 3.3 19.9378 7.10416C19.9378 10.9083 23.0503 14.0208 26.8545 14.0208ZM13.8857 25.7792L4.37533 74.5416H11.6378L17.6899 46.875L25.1253 53.7916V74.5416H32.042V48.4312L24.9524 41.3416L27.0274 30.9667C31.5232 36.5 38.267 39.9583 45.8753 39.9583V33.0417C39.4774 33.0417 33.9441 29.5833 30.8316 24.5687L27.5462 19.0354C26.3357 16.9604 24.0878 15.75 21.667 15.75C20.8024 15.75 19.9378 15.9229 19.0732 16.2687L0.916992 23.7042V39.9583H7.83366V28.3729L13.8857 25.7792Z"
              fill="#2153CC"
              fillOpacity="0.75"
            />
          </svg>
        </chakra.div>
        <chakra.p
          fontSize="10px"
          color="#00000"
          fontWeight="400"
          textAlign="center"
        >
          Showing 10 product selected
        </chakra.p>

        <chakra.div
          bg="#ffffff"
          px="10px"
          pb="30px"
          pt="50px"
          borderRadius="7.87px"
        >
          <ProductQuntityAddCard
            onHandlerChangeForm={onHandlerChangeForm}
            stateData={bactToolData}
          />
        </chakra.div>
      </chakra.div>
    </VendorDashBoardLayout >
  );
};

export default TransferProduct;
