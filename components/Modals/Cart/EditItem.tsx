/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import {
  AddtionIcon,
  SubtractionIcon,
  PencilIcon,
} from "../../../public/assets";

interface Props {
  setEditModal: any;
}

const style = {
  E_I_container: {
    position: "absolute",
    top: "0",
    width: "100%",
    height: "100vh",
    background: "rgba(27, 27, 27, 0.54)",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  E_I_box: {
    width: "302.32px",
    height: "477px",
    background: "#FFFFFF",
    borderRadius: "12px",
    padding: "14px",
    gap: "9px",
  },
  E_I_Title: { color: "#2153CC", fontSize: "19.39px", fontWeight: "600" },
  E_I_InnerBox: {
    borderRadius: "10px",
    border: " 0.970696px solid rgba(0, 0, 0, 0.1)",
    padding: "10px",
  },
  E_I_ST: {
    fontSize: "13.76px",
    fontWeight: "600",
    color: "#757575",
    marginTop: "10px",
  },
};

const EditItem: React.FC<Props> = ({ setEditModal }: Props) => {
  const [inputValue, setInputValue] = useState(0);

  const handleValueIncrement = () => {
    setInputValue(inputValue + 1);
  };

  const handleValueDecrement = () => {
    setInputValue(inputValue - 1);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        right: "0",
        bottom: "0",
        // height: "100vh",
        background: "rgba(27, 27, 27, 0.54)",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={style.E_I_box}>
        <chakra.h4 style={style.E_I_Title}>Edit cart Item</chakra.h4>
        <div style={style.E_I_InnerBox}>
          <chakra.img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
            alt="image"
            style={{
              width: "75.84px",
              height: "75.84px",
              borderRadius: "4px",
              margin: "0 3px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          />

          <chakra.h5 style={style.E_I_ST}>Set Quantity</chakra.h5>
          <chakra.div justifyContent="space-between" alignItems="middle">

            <div
              style={{
                border: "1.5px solid #2153CC",
                borderRadius: "10px",
              }}
            >
              <chakra.div alignItems="middle" style={{ padding: "10px" }}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleValueDecrement}
                >
                  <SubtractionIcon />
                </div>
                <input
                  value={inputValue}
                  type="text"
                  style={{
                    border: "none",
                    outline: "none",
                    width: "50px",
                    textAlign: "center",
                  }}
                />
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleValueIncrement}
                >
                  <AddtionIcon />
                </div>
              </chakra.div>
            </div>
            <chakra.h5
              style={{
                fontSize: "8px",
                fontWeight: 500,
                color: "#000000",
                opacity: "54%",
                margin: "3px 0",
              }}
            >
              Min. purchase of 30 pcs
            </chakra.h5>


            <chakra.p
              style={{
                color: "#FB8200",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              90 Available
            </chakra.p>

          </chakra.div>
          <chakra.div style={{ margin: "10px 0" }}>

            <chakra.input
              placeholder="Add a note here"
              style={{
                fontWeight: "500",
                fontSize: "12px",
                color: "#757575",
                textDecoration: "underline",
                outline: "none",
                border: "none",
                padding: "5px 0",
              }}
            />

          </chakra.div>
          <chakra.div justifyContent="space-between" alignItems="middle">

            <chakra.h5
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "#2153CC",
              }}
            >
              Total
            </chakra.h5>


            <div
              style={{
                width: "83px",
                height: "28px",
                border: "0.4px solid #B3B3B3",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <chakra.p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333333",
                  margin: "5px 0",
                }}
              >
                N30,000
              </chakra.p>
            </div>

          </chakra.div>

          <chakra.div style={{ margin: "14px 0" }}>
            <chakra.button
              style={{
                width: "242.01px",
                height: "43.13px",
                background: "#2153CC",
                borderRadius: "5.28px",
                padding: "11.47px",
                margin: "0 auto",
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
              }}
            >
              Add to cart
            </chakra.button>
          </chakra.div>
          <chakra.div style={{ margin: "14px 0" }}>
            <chakra.button
              style={{
                width: "242.01px",
                height: "43.13px",
                background: "#ffffff",
                borderRadius: "5.28px",
                border: "1.61556px solid rgba(33, 83, 204, 0.5)",
                padding: "11.47px",
                margin: "0 auto",
                fontSize: "16px",
                fontWeight: "600",
                color: "#2153CC",
              }}
            >
              Remove Item
            </chakra.button>
          </chakra.div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
