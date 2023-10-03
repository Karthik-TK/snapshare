import React, { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Text,
  VStack,
  Image as ChakraImage,
} from "@chakra-ui/react";
import PhotoUpload from "app/components/PhotoUpload";
import ImageViewModal from "app/components/common/viewImage";

const Home = () => {
  const [photos, setPhotos] = useState<{ url: string; comments: string[] }[]>(
    []
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const openModal = (imageUrl: any) => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImageUrl("");
  };

  return (
    <Container maxW="xl" centerContent>
      <PhotoUpload photos={photos} setPhotos={setPhotos} />
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {photos.map((photo, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => openModal(photo.url)} // Open modal when clicking the image box
            cursor="pointer"
          >
            <ChakraImage
              src={photo.url}
              alt={`Uploaded ${index}`}
              objectFit="cover"
              boxSize="250px" // Set your desired image size
            />
            <Box p={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Comments:
              </Text>
              <VStack align="start" spacing={2}>
                {photo.comments.map((c, i) => (
                  <Text key={i}>{c}</Text>
                ))}
              </VStack>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Image Modal */}
      <ImageViewModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </Container>
  );
};

export default Home;
