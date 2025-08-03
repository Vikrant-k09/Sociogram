import { useState } from 'react';
import {
  Box,
  Image,
  IconButton,
  Flex,
  Text,
  Badge,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import LazyImage from '../LazyImage/LazyImage';

const MultiImagePost = ({ images = [], alt = "Post image" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <LazyImage
        src={images[0]}
        alt={alt}
        w="full"
        h="400px"
        objectFit="cover"
        borderRadius="md"
      />
    );
  }

  return (
    <Box position="relative" w="full" h="400px" borderRadius="md" overflow="hidden">
      {/* Current Image */}
      <LazyImage
        src={images[currentImageIndex]}
        alt={`${alt} ${currentImageIndex + 1}`}
        w="full"
        h="full"
        objectFit="cover"
      />

      {/* Image Counter Badge */}
      <Badge
        position="absolute"
        top={3}
        right={3}
        colorScheme="blackAlpha"
        bg="blackAlpha.600"
        color="white"
        fontSize="xs"
        borderRadius="full"
        px={2}
        py={1}
      >
        {currentImageIndex + 1} / {images.length}
      </Badge>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <IconButton
            icon={<ChevronLeftIcon />}
            position="absolute"
            left={2}
            top="50%"
            transform="translateY(-50%)"
            bg="blackAlpha.600"
            color="white"
            size="sm"
            borderRadius="full"
            _hover={{ bg: "blackAlpha.800" }}
            onClick={handlePrevImage}
            opacity={0.8}
            zIndex={2}
          />
          <IconButton
            icon={<ChevronRightIcon />}
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            bg="blackAlpha.600"
            color="white"
            size="sm"
            borderRadius="full"
            _hover={{ bg: "blackAlpha.800" }}
            onClick={handleNextImage}
            opacity={0.8}
            zIndex={2}
          />
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && images.length <= 10 && (
        <Flex
          position="absolute"
          bottom={3}
          left="50%"
          transform="translateX(-50%)"
          gap={2}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={index === currentImageIndex ? "white" : "whiteAlpha.500"}
              cursor="pointer"
              onClick={() => handleDotClick(index)}
              transition="all 0.2s"
              _hover={{ bg: "white", transform: "scale(1.2)" }}
            />
          ))}
        </Flex>
      )}

      {/* Swipe Gesture Areas (invisible) */}
      <Box
        position="absolute"
        left={0}
        top={0}
        w="30%"
        h="full"
        cursor="pointer"
        onClick={handlePrevImage}
        zIndex={1}
      />
      <Box
        position="absolute"
        right={0}
        top={0}
        w="30%"
        h="full"
        cursor="pointer"
        onClick={handleNextImage}
        zIndex={1}
      />
    </Box>
  );
};

export default MultiImagePost;
