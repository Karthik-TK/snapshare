import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

interface ImageViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({
  isOpen,
  onRequestClose,
  imageUrl,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="8px">
        <ModalBody
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image
            src={imageUrl}
            alt="Image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              transition: "transform 0.3s ease",
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageViewModal;
