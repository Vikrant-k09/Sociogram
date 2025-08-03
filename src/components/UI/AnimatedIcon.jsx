import { Box, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const AnimatedIcon = ({ 
  children, 
  tooltip, 
  onClick, 
  isActive = false,
  hoverScale = 1.1,
  tapScale = 0.9,
  ...props 
}) => {
  const iconVariants = {
    idle: { 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    hover: { 
      scale: hoverScale,
      rotate: isActive ? 0 : 5,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { 
      scale: tapScale,
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    active: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const IconWrapper = (
    <MotionBox
      {...props}
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      variants={iconVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      animate={isActive ? "active" : "idle"}
      onClick={onClick}
    >
      {children}
    </MotionBox>
  );

  if (tooltip) {
    return (
      <Tooltip 
        label={tooltip} 
        hasArrow 
        placement="top"
        bg="gray.900"
        color="white"
        fontSize="sm"
        px={3}
        py={2}
        borderRadius="md"
        openDelay={500}
      >
        {IconWrapper}
      </Tooltip>
    );
  }

  return IconWrapper;
};
