import { theme } from '@/theme/theme';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { Html } from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import React, { forwardRef, PropsWithChildren } from 'react';
// import '@fontsource-variable/montserrat';
interface ChakraHtmlProps extends HtmlProps {
  children: React.ReactNode;
}

const ChakraHtml: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PropsWithChildren<ChakraHtmlProps>
> = ({ children, ...rest }, ref) => {
  return (
    <Html {...rest} ref={ref}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Html>
  );
};

// Use forwardRef to forward the ref
const ForwardedChakraHtml = forwardRef(ChakraHtml);

export default ForwardedChakraHtml;
