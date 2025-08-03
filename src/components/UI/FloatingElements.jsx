import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const FloatingActionButton = ({ 
  children, 
  onClick, 
  bg = "blue.500",
  color = "white",
  size = "56px",
  ...props 
}) => {
  return (
    <MotionBox
      {...props}
      position="fixed"
      bottom="20px"
      right="20px"
      width={size}
      height={size}
      bg={bg}
      color={color}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      boxShadow="0 4px 20px rgba(0,0,0,0.25)"
      zIndex={1000}
      onClick={onClick}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 6px 25px rgba(0,0,0,0.3)"
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionBox>
  );
};

export const PulseIndicator = ({ 
  size = "8px", 
  color = "green.400", 
  ...props 
}) => {
  return (
    <MotionBox
      {...props}
      width={size}
      height={size}
      bg={color}
      borderRadius="50%"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
