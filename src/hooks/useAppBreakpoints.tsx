import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { useAppTheme } from '.';

/**
 * It will provide booleans when the width has reach certain size.
 */
const useAppBreakpoints = () => {
  const theme = useAppTheme();

  const [isBase] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
  const [isMobile] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
  const [isTablet] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const [isBigTablet] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const [isDesktop] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
  const [isLargeDesktop] = useMediaQuery(`(min-width: ${theme.breakpoints['2xl']})`);

  return {
    isBase,
    isMobile,
    isTablet,
    isBigTablet,
    isDesktop,
    isLargeDesktop,
  };
};

export default useAppBreakpoints;
