import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Providers } from './providers';
import '../theme/globals.css';
import { Footer, Header } from '@/components';
import { Box, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sonia Coronado',
  description: 'Music composer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <Flex direction="column" minH="100vh" p="2">
            <Header />
            <Box flex="1" pt={10}>
              <Container maxW="container.xl">{children}</Container>
            </Box>
            <Footer />
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
