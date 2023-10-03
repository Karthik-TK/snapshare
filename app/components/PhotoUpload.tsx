import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface FileUploadProps {
  photos: any[];
  setPhotos: Dispatch<SetStateAction<any>>;
}

const PhotoUpload: React.FC<FileUploadProps> = ({ photos, setPhotos }) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState<string>("");
  const [uploadedFileInfo, setUploadedFileInfo] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Display file name and size
      const fileInfo = `${selectedFile.name} (${formatFileSize(
        selectedFile.size
      )})`;
      setUploadedFileInfo(fileInfo);
    }
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setUploadedFileInfo(null);
  };

  const handleUpload = () => {
    if (file) {
      const newPhotos = [
        ...photos,
        {
          url: URL.createObjectURL(file),
          comments: [comment],
        },
      ];
      setPhotos(newPhotos);
      toast({
        title: "Photo Uploaded",
        description: "Your photo has been successfully uploaded.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setFile(null);
      setComment("");
      setUploadedFileInfo(null);
    }
  };

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Container maxW="container.sm">
      <Heading mb={4}>Photo Upload and Comment</Heading>
      <Box p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
        <FormControl>
          <FormLabel>Select an image</FormLabel>
          {file ? (
            <Box display="flex" alignItems="center">
              <Text fontSize={"sm"} color={"gray.400"} mr={2}>
                {uploadedFileInfo}
              </Text>
              <IconButton
                icon={<CloseIcon />}
                aria-label="Remove Image"
                onClick={handleRemoveImage}
                colorScheme="red"
                size="xs"
                borderRadius={"md"}
              />
            </Box>
          ) : (
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              display="none"
              id="upload-photo-input"
            />
          )}
          {!file && (
            <label htmlFor="upload-photo-input">
              <Button as="span" colorScheme="gray" size="sm" cursor="pointer">
                Choose Image
              </Button>
            </label>
          )}
        </FormControl>
        <FormControl>
          <FormLabel mt={4}>Add a comment</FormLabel>
          <Textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your comment"
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleUpload}
          isDisabled={!file}
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export default PhotoUpload;
