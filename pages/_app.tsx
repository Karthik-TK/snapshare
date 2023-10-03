// pages/_app.js
import { Box, CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "app/components/Header";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Header />
      <Box p={4}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
