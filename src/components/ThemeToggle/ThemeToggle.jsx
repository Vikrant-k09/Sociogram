import { IconButton, useColorMode, Tooltip } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      placement="right"
      hasArrow
    >
      <IconButton
        aria-label="Toggle theme"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        size="lg"
        color="current"
        _hover={{
          bg: 'whiteAlpha.200',
        }}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
