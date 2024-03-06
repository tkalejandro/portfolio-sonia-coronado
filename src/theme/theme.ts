import { theme as chakraTheme, withDefaultColorScheme, extendTheme } from '@chakra-ui/react';

// Define the type for your theme

/**
 * TO extend the Theme is very simple.
 * Console.log useTheme() for more info.
 */

const baseTheme: typeof chakraTheme = chakraTheme;

const customTheme = {
  ...baseTheme,
  breakpoints: {
    base: '0px',
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  fonts: {
    heading: `'Montserrat Variable', sans-serif`,
    body: `'Montserrat Variable', sans-serif`,
  },
  colors: {
    background: '#FFFFF0',
    black: '#1C1C1C', // A dark, elegant black
    white: '#F5F5F5', // A slightly off-white for elegance
    grey: '#CCCCCC',
    primary: {
      50: '#e6f2ff',
      100: '#b3d9ff',
      200: '#80c2ff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#220632', // Very dark purple (adjust as needed)
      600: '#361142',
      700: '#4a1a52',
      800: '#5e2362',
      900: '#722d72',
      main: '#220632', // Use the same main shade for consistency
      contrastText: '#f5f5f5',
    },
    secondary: {
      50: '#f2f0f4', // Very light purple (adjust as needed)
      100: '#e0ddee',
      200: '#cdc3e9',
      300: '#bba8e4',
      400: '#a993e0',
      500: '#9679db', // Light Secondary
      600: '#816fd6',
      700: '#6e64d2',
      800: '#5b5acf',
      900: '#494fcb',
      main: '#9679db', // Use the same main shade for consistency
      contrastText: '#f5f5f5',
    },
    warning: {
      50: '#fff7e6',
      100: '#ffecbf',
      200: '#ffe099',
      300: '#ffd366',
      400: '#ffcc33',
      500: '#FFC107',
      600: '#e69900',
      700: '#cc8800',
      800: '#b37700',
      900: '#995c00',
      main: '#FFC107',
      contrastText: '#000000',
    },
    success: {
      50: '#e6f7e6',
      100: '#cceccc',
      200: '#b3e6b3',
      300: '#99d699',
      400: '#80c780',
      500: '#28A745',
      600: '#248f3b',
      700: '#1f7d32',
      800: '#1a6b29',
      900: '#14591f',
      main: '#28A745',
      contrastText: '#000000',
    },
    danger: {
      50: '#ffe6e6',
      100: '#ffcccc',
      200: '#ff9999',
      300: '#ff6666',
      400: '#ff3333',
      500: '#DC3545',
      600: '#c42f3e',
      700: '#ad2936',
      800: '#961f2f',
      900: '#7f1a29',
      main: '#DC3545',
      contrastText: '#ffffff',
    },
    info: {
      50: '#e6f7ff',
      100: '#cce6ff',
      200: '#99ccff',
      300: '#66b2ff',
      400: '#3399ff',
      500: '#007bff',
      600: '#0066cc',
      700: '#0052b3',
      800: '#004080',
      900: '#002633',
      main: '#007bff',
      contrastText: '#000000',
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'normal', // Adiciona esta linha para definir o fontWeight como normal
      },
    },
  },
};

/**
 * Make it safe the type theme.
 */
export type AppTheme = typeof customTheme;

export const theme = extendTheme(
  customTheme,
  withDefaultColorScheme({ colorScheme: 'primary' }),
) as AppTheme;
