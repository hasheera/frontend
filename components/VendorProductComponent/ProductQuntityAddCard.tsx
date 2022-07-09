import { chakra } from "@chakra-ui/system";

interface Props {
  stateData: any;
  onHandlerChangeForm: (e: any, data: any) => void;
}

const ProductQuntityAddCard = ({ stateData, onHandlerChangeForm }: Props) => {

  return (
      <chakra.div gap={{ xs: 12, sm: 8, md: 8, lg: 40 }}>
        {stateData?.map((data: any, index) => (
          <chakra.div key={index}>
            <div
              style={{
                width: "150px",
                height: "300px",
              }}
            >
              {/*<Image*/}
              {/*  style={{*/}
              {/*    width: "150px",*/}
              {/*    height: "139.71px",*/}
              {/*    borderTopLeftRadius: "8px",*/}
              {/*    borderTopRightRadius: "8px",*/}
              {/*  }}*/}
              {/*  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"*/}
              {/*  alt="pproduct"*/}
              {/*/>*/}
              <div style={{ marginTop: "4.48px" }}>
                <p
                  style={{
                    fontSize: "13.44px",
                    fontWeight: "400",
                    color: "#000000",
                    width: "150px"
                  }}
                >
                  Lee pucker design Leather bag botiniki
                </p>
              </div>
              <p
                style={{
                  fontSize: "9.19px",
                  fontWeight: "400",
                  color: "#000000",
                  opacity: "5",
                  marginTop: "10px",
                }}
              >
                90 stock left
              </p>
              <div
                style={{
                  display: "flex",
                  marginTop: "5px",
                  backgroundColor: "#EBF2FF",
                  borderRadius: "7.54px",
                  height: "36.46px",
                  width: "150px",
                  padding: "5px",
                }}
              >
                <p
                  style={{
                    fontSize: "12.86px",
                    fontWeight: "600",
                    color: "#2264D1",
                    paddingRight: "30px",
                    paddingTop: "5px",
                  }}
                >
                  Qty:
                </p>
                <chakra.input
                  onChange={(e: any) => onHandlerChangeForm(e, data)}
                  type="number"
                  min={0}
                />
              </div>
            </div>
          </chakra.div>
        ))}
      </chakra.div>
  );
};

export default ProductQuntityAddCard;
