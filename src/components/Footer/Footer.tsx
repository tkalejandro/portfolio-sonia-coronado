import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box as="footer" textAlign="center" p={4} borderTop="2px solid #f2f0f4" mt={10}>
      &copy; Sonia Coronado {year} | Crafted with ❤️ by the amazing{' '}
      <Link href="/developers">
        <Text fontWeight="700" color={'#9679db'} textDecoration="underline">
          Three Mania Team
        </Text>
      </Link>
    </Box>
  );
};

export default Footer;
