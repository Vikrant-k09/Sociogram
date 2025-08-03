import { Box, Button, Icon } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useTheme } from "../../context/ThemeContext";

const MotionBox = motion(Box);

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('Theme toggle clicked! Current isDark:', isDark);
    toggleTheme();
  };

  return (
    <Button
      variant="ghost"
      size="lg"
      borderRadius="full"
      p={3}
      onClick={handleToggle}
      bg={isDark 
        ? "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)" 
        : "linear-gradient(135deg, #fef7cd 0%, #fbbf24 100%)"
      }
      _hover={{
        transform: 'scale(1.05)',
        bg: isDark 
          ? "linear-gradient(135deg, #312e81 0%, #5b21b6 100%)" 
          : "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)"
      }}
      _active={{
        transform: 'scale(0.95)'
      }}
      cursor="pointer"
      transition="all 0.3s ease"
    >
      <AnimatePresence mode="wait">
        <MotionBox
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Icon
            as={isDark ? MoonIcon : SunIcon}
            w={5}
            h={5}
            color={isDark ? '#e0e7ff' : '#92400e'}
          />
        </MotionBox>
      </AnimatePresence>
    </Button>
  );
};

export default ThemeToggle;
