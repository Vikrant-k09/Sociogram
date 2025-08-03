import { useState, useRef, useEffect } from 'react';
import { Image, Skeleton, Box } from '@chakra-ui/react';

const LazyImage = ({ 
  src, 
  alt, 
  fallbackSrc = '/placeholder.jpg',
  showLoadingProgress = false,
  onLoadComplete,
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [error, setError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imgRef = useRef();

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Increased for better UX
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setLoadingProgress(100);
    onLoadComplete?.();
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
    console.warn(`Failed to load image: ${src}`);
  };

  const handleProgress = (event) => {
    if (showLoadingProgress && event.lengthComputable) {
      const progress = (event.loaded / event.total) * 100;
      setLoadingProgress(progress);
    }
  };

  return (
    <Box ref={imgRef} position="relative" {...props}>
      {!isLoaded && (
        <Skeleton
          height={props.height || "200px"}
          width={props.width || "100%"}
          borderRadius={props.borderRadius || "md"}
          startColor="gray.100"
          endColor="gray.300"
        />
      )}
      {isInView && (
        <Image
          src={error ? fallbackSrc : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          onProgress={handleProgress}
          loading={priority ? "eager" : "lazy"}
          style={{
            display: isLoaded ? 'block' : 'none',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 1 : 0,
          }}
          {...props}
        />
      )}
      {showLoadingProgress && !isLoaded && isInView && (
        <Box
          position="absolute"
          bottom="4px"
          left="4px"
          right="4px"
          height="2px"
          bg="gray.200"
          borderRadius="full"
          overflow="hidden"
        >
          <Box
            height="100%"
            bg="blue.500"
            width={`${loadingProgress}%`}
            transition="width 0.2s ease"
          />
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;
