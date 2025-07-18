import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
} from "@chakra-ui/react";

const KeywordsModal = ({ isOpen, closeModal, keywords, isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      portalProps={{ appendToParentPortal: false }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keywords</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" alignItems="center" justifyContent="center">
          {isLoading ? (
            <CircularProgress isIndeterminate color="blue.300" />
          ) : (
            <Text>{keywords}</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KeywordsModal;
