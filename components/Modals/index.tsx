import { ReactElement } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
} from "@chakra-ui/react";

interface Props {
  open: boolean;
  close: () => void;
  p?: string | number;
  minH?: string | number;
  headPadding?: string | number;
  heading: string;
  pBody?: string | number | { base: string; xs: string; sm: string; md: string; lg: string; xl: string; xxl: string; };
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
  footer?: React.ReactChild | React.ReactFragment | React.ReactPortal;
  maxW?: string;
}

const ModalUI = ({
  open,
  close,
  p,
  minH,
  headPadding,
  heading,
  pBody,
  children,
  footer,
  maxW,
}: Props): ReactElement => (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay />
      <ModalContent
        p={p || 4}
        mx="3"
        w="100%"
        maxW={maxW}
        minH={minH || "min-content"}
      >
        <ModalHeader fontSize="18.76px" textAlign="center" color="#2153CC">
          {heading}
        </ModalHeader>
        <ModalCloseButton size="sm" />
        <Divider />
        <ModalBody w="100%" p={pBody || "0.5rem 0rem"}>
          {children}
        </ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );

export default ModalUI;
