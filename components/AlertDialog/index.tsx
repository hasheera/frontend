import React, { Children, FC, ReactNode, useRef } from "react";
import {
  chakra,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
type Props = {
  open: boolean;
  close: () => void;
  // children:
  //   | ReactNode
  //   | React.ReactChild
  //   | React.ReactFragment
  //   | React.ReactPortal;
  header: string;
  isRequest: boolean;
  action: any;
  question: string;
};

const AlertDialogUI: FC<Props> = ({
  open,
  close,
  header,
  isRequest,
  action,
  question,
}) => {
  const cancelRef = useRef();
  return (
    <AlertDialog isOpen={open} onClose={close} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="500">
            {header}
          </AlertDialogHeader>
          <AlertDialogBody>
            <chakra.p>{question}</chakra.p>
          </AlertDialogBody>
          <AlertDialogFooter w="full">
            <chakra.div
              w="full"
              d="flex"
              alignItems="center"
              justifyContent="space-around"
              mt="20px"
            >
              <chakra.button
                w="120px"
                h="40px"
                disabled={isRequest}
                opacity={isRequest ? "0.5" : "1"}
                borderRadius="6px"
                fontSize="16px"
                fontWeight="600"
                bg="gray.300"
                onClick={close}
                ref={cancelRef}
              >
                {isRequest ? <Spinner size="sm" color="#fff" /> : "Cancel"}
              </chakra.button>
              <chakra.button
                onClick={action}
                disabled={isRequest}
                opacity={isRequest ? "0.5" : "1"}
                w="120px"
                h="40px"
                borderRadius="6px"
                fontSize="16px"
                fontWeight="600"
                bg="red.500"
                color="#fff"
              >
                {isRequest ? <Spinner size="sm" color="#fff" /> : "Delete"}
              </chakra.button>
            </chakra.div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogUI;
