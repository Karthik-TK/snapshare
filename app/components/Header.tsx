"use client";
import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const brandColor = useColorModeValue("blue.200", "blue.500");
  const textColor = useColorModeValue("gray.800", "gray.50");

  return (
    <Box bg={brandColor} color={textColor} p={4} shadow="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          SnapShare
        </Text>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
