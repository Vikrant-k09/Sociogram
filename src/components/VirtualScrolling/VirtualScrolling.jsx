import { useState, useEffect, useRef, useMemo } from 'react';
import { Box } from '@chakra-ui/react';

const VirtualScrolling = ({ 
  items = [], 
  itemHeight = 200, 
  containerHeight = 400, 
  renderItem, 
  overscan = 3 
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef();

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + overscan, items.length - 1);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      index: startIndex + index,
    }));
  }, [items, startIndex, endIndex]);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Box
      ref={scrollElementRef}
      height={containerHeight}
      overflowY="auto"
      position="relative"
    >
      <Box height={totalHeight} position="relative">
        <Box
          position="absolute"
          top={startIndex * itemHeight}
          left={0}
          right={0}
        >
          {visibleItems.map((item) => (
            <Box key={item.index} height={itemHeight}>
              {renderItem(item, item.index)}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default VirtualScrolling;
