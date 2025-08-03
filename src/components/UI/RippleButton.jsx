import { Box, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export const RippleButton = ({ children, onClick, variant = "ghost", size = "md", ...props }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(event);
  };

  return (
    <MotionButton
      {...props}
      variant={variant}
      size={size}
      onClick={handleClick}
      position="relative"
      overflow="hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
      {ripples.map((ripple) => (
        <MotionBox
          key={ripple.id}
          position="absolute"
          left={`${ripple.x}px`}
          top={`${ripple.y}px`}
          width={`${ripple.size}px`}
          height={`${ripple.size}px`}
          borderRadius="50%"
          bg="whiteAlpha.300"
          pointerEvents="none"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </MotionButton>
  );
};
