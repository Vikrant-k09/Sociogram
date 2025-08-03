import { Box, VStack } from '@chakra-ui/react';
import { FixedSizeList as List } from 'react-window';
import { useCallback, useMemo } from 'react';

const VirtualizedFeed = ({ 
  posts, 
  renderPost, 
  itemHeight = 600, 
  containerHeight = 'calc(100vh - 100px)',
  overscan = 5 
}) => {
  const itemCount = posts.length;

  const Item = useCallback(({ index, style }) => {
    const post = posts[index];
    
    return (
      <Box style={style} px={2}>
        {renderPost(post, index)}
      </Box>
    );
  }, [posts, renderPost]);

  const itemData = useMemo(() => posts, [posts]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Box height={containerHeight} width="100%">
      <List
        height={parseInt(containerHeight.replace(/[^\d]/g, '')) || 800}
        itemCount={itemCount}
        itemSize={itemHeight}
        itemData={itemData}
        overscanCount={overscan}
        width="100%"
      >
        {Item}
      </List>
    </Box>
  );
};

export default VirtualizedFeed;
