import { AppTheme } from '@/theme/theme';
import { useTheme } from '@chakra-ui/system';

/**
 * Custom hook that returns a safe type theme options.
 * It will always adapt to the newest version of theme.ts
 */
const useAppTheme = () => {
  const theme: AppTheme = useTheme();
  return theme;
};

export default useAppTheme;
