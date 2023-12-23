'use client';
import { useDeveloperSettings } from '@/store';
import { Leva } from 'leva';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme/theme';
import '@fontsource-variable/montserrat';

export function Providers({ children }: { children: React.ReactNode }) {
  const debugMode = useDeveloperSettings((state) => state.debugMode);

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Leva hidden={!debugMode} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
