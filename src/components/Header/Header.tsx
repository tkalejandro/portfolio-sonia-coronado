import React from 'react';
import Link from 'next/link';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button, ButtonGroup, Container } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box position="fixed" top={0} left={0} right={0} py={4} borderBottom="2px solid #f2f0f4">
      <Box
        bg="#FFFFF0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: 'blur(10px)', // Adjust the blur value as per your preference
          zIndex: -1,
        }}
      />
      <Container maxW="container.xl" px={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" fontWeight={700}>
            <Link href="/resume">Sonia Coronado</Link>
          </Heading>
          <ButtonGroup gap="2">
            <Button>
              <Link href="/">Music Experience</Link>
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
