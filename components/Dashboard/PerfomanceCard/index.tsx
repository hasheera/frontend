import React from "react";
import { chakra, Grid, GridItem } from "@chakra-ui/react";
import { PerformanceIcon } from "public/assets";
import { formatNum, formatPrice } from "@utils/helpers";
import { dashboardData } from "store/slices/dashboard";
import { useAppSelector } from "hooks";


const PerfomanceCard = () => {
  const { dashboard } = useAppSelector(dashboardData);

  return (
    <>
      {/* //#  Left */}
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }}
        gap={4}
      >
        {/* //# ROW 1 */}
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#2153CC" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {formatNum(dashboard.data?.num_of_orders)}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Sales
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#2153CC" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              &#8358;
              {dashboard.data?.revenue
                ? formatPrice(dashboard.data?.revenue)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Revenue
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#EA4D33" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {dashboard.data?.customers_count
                ? formatNum(dashboard.data?.customers_count)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Customers
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#EA4D33" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              &#8358;
              {dashboard.data?.payment_due
                ? formatPrice(dashboard.data?.payment_due)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Payment Due
            </chakra.p>
          </chakra.div>
        </GridItem>
        {/* //# ROW 2 */}
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#53B175" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {dashboard.data?.products_sold
                ? formatNum(dashboard.data?.products_sold)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Products Sold
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#53B175" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              &#8358;
              {dashboard.data?.profit
                ? formatPrice(dashboard.data?.profit)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Profit from Sales
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#EA4D33" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {dashboard.data?.low_stock_count
                ? dashboard.data?.low_stock_count
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Low Stock Alert
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#EA4D33" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {formatNum(dashboard.data?.num_of_expired_items)}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Expired/damaged
            </chakra.p>
          </chakra.div>
        </GridItem>
        {/* //# ROW 3 */}
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#2153CC" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {dashboard.data?.total_stock_count
                ? formatNum(dashboard.data?.total_stock_count)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Stock Count
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#2153CC" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              &#8358;
              {dashboard.data?.total_stock_profit
                ? formatPrice(dashboard.data?.total_sell_price)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Stock Value
            </chakra.p>
          </chakra.div>
        </GridItem>

        {/* //# ROW 2 */}

        {/* //# ROW 3 */}
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#2153CC" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              0
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Shop Visits
            </chakra.p>
          </chakra.div>
        </GridItem>
        <GridItem>
          <chakra.div
            w={{ base: "180px", xl: "249.3px" }}
            h={{ base: "91px", xl: "126.04px" }}
            borderRadius="5px"
            bg="#FFFFFF"
            position="relative"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <chakra.div position="absolute" right="12%" top="12.5%">
              <PerformanceIcon color="#2153CC" />
            </chakra.div>
            <chakra.p
              color="#333333"
              fontSize={{ base: "16px", xl: "22.17px" }}
              fontWeight="600"
              letterSpacing="1.01px"
              textTransform="capitalize"
              m="5.54153px 20px"
            >
              {dashboard.data?.followers_count
                ? formatNum(dashboard.data?.followers_count)
                : 0}
            </chakra.p>
            <chakra.p
              color="#757575"
              fontSize={{ base: "12px", xl: "16.62px" }}
              fontWeight="400"
              letterSpacing="1.01px"
              textTransform="capitalize"
              ml="20px"
            >
              Followers
            </chakra.p>
          </chakra.div>
        </GridItem>
      </Grid>
    </>
  );
};

export default PerfomanceCard;
