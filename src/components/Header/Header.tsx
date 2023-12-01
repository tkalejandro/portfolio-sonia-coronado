import React from 'react';
import Link from 'next/link';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react';
import NavBar from '../NavBar/NavBar';

/**
 * THIS HEADER IS DUMMY. IT WILL CHANGE.
 * @returns
 */
const Header = () => {
  return (
    <Flex as="header" justify="space-between" gap="2">
      <Box>
        <Heading size="md">Sonia Coronado</Heading>
      </Box>
      <NavBar />
      {/* <ButtonGroup gap="2">
        <Button colorScheme="primary">
          <Link href="/">Home </Link>
        </Button>
        <Button colorScheme="primary">
          <Link href="/resume">Resume </Link>
        </Button>
        <Button colorScheme="primary">
          <Link href="/docs">Docs </Link>
        </Button>
      </ButtonGroup> */}
    </Flex>
  );
};

export default Header;
