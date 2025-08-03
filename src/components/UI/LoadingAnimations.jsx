import { Box, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const LoadingSpinner = ({ size = "md", color = "blue.500" }) => {
  const sizeMap = {
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "40px"
  };

  return (
    <MotionBox
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      <Spinner 
        size={size} 
        color={color}
        thickness="3px"
        speed="0.8s"
      />
    </MotionBox>
  );
};

export const PulsingDot = ({ delay = 0, color = "blue.400" }) => (
  <MotionBox
    width="8px"
    height="8px"
    borderRadius="50%"
    bg={color}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

export const TypingIndicator = () => (
  <Box display="flex" alignItems="center" gap={1}>
    <PulsingDot delay={0} />
    <PulsingDot delay={0.2} />
    <PulsingDot delay={0.4} />
  </Box>
);
