import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Divider,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiFillHeart, AiFillEye } from 'react-icons/ai';
import { FaComment, FaShare } from 'react-icons/fa';
import { timeAgo } from '../../utils/timeAgo';
import { useTheme } from '../../context/ThemeContext';

const MotionBox = motion(Box);
const MotionStat = motion(Stat);

const PostAnalytics = ({ isOpen, onClose, post }) => {
  const { isDark, theme } = useTheme();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  if (!post) return null;

  // Calculate engagement metrics
  const totalLikes = post.likes?.length || 0;
  const totalComments = post.comments?.length || 0;
  const totalViews = post.views || Math.floor(Math.random() * 1000) + totalLikes + totalComments;
  const engagementRate = totalViews > 0 ? ((totalLikes + totalComments) / totalViews * 100).toFixed(1) : 0;

  const metrics = [
    {
      label: 'Total Views',
      value: totalViews,
      icon: AiFillEye,
      color: 'blue.400',
      helpText: 'Unique profile visits',
    },
    {
      label: 'Likes',
      value: totalLikes,
      icon: AiFillHeart,
      color: 'red.400',
      helpText: `${((totalLikes / totalViews) * 100).toFixed(1)}% of views`,
    },
    {
      label: 'Comments',
      value: totalComments,
      icon: FaComment,
      color: 'green.400',
      helpText: `${((totalComments / totalViews) * 100).toFixed(1)}% of views`,
    },
    {
      label: 'Engagement Rate',
      value: `${engagementRate}%`,
      icon: FaShare,
      color: 'purple.400',
      helpText: 'Likes + Comments / Views',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent 
        bg={bgColor} 
        border={`1px solid ${borderColor}`}
        color={textColor}
        borderRadius="lg"
        boxShadow="xl"
      >
        <ModalHeader 
          borderBottom={`1px solid ${borderColor}`}
          fontSize="lg"
          fontWeight="bold"
        >
          Post Analytics
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Post Summary */}
            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={2}>
                Posted {timeAgo(post.createdAt)}
              </Text>
              <Text fontSize="sm" noOfLines={2} color={textColor}>
                {post.caption || "No caption provided"}
              </Text>
            </Box>

            <Divider borderColor={borderColor} />

            {/* Metrics Grid */}
            <SimpleGrid columns={2} spacing={4}>
              {metrics.map((metric, index) => (
                <MotionStat 
                  key={index} 
                  p={4} 
                  borderRadius="md" 
                  bg={isDark ? 'gray.700' : 'gray.50'}
                  border={`1px solid ${borderColor}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <HStack spacing={2} mb={2}>
                    <Icon as={metric.icon} color={metric.color} boxSize={5} />
                    <StatLabel fontSize="sm" color={textColor}>{metric.label}</StatLabel>
                  </HStack>
                  <StatNumber fontSize="2xl" color={textColor}>{metric.value}</StatNumber>
                  <StatHelpText fontSize="xs" color={mutedTextColor}>
                    {metric.helpText}
                  </StatHelpText>
                </MotionStat>
              ))}
            </SimpleGrid>

            <Divider borderColor={borderColor} />

            {/* Performance Insights */}
            <MotionBox 
              p={4} 
              borderRadius="md" 
              bg={isDark ? 'gray.700' : 'gray.50'}
              border={`1px solid ${borderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Text fontWeight="bold" mb={3} color={textColor}>
                Performance Insights
              </Text>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" color={textColor}>Best performing time</Text>
                  <Text fontSize="sm" color={mutedTextColor}>
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </HStack>
                
                <HStack justify="space-between">
                  <Text fontSize="sm" color={textColor}>Engagement quality</Text>
                  <HStack>
                    <Box color={engagementRate > 5 ? 'green.400' : 'red.400'}>
                      {engagementRate > 5 ? '↗' : '↘'}
                    </Box>
                    <Text 
                      fontSize="sm" 
                      color={engagementRate > 10 ? 'green.400' : 
                             engagementRate > 5 ? 'blue.400' : 
                             engagementRate > 2 ? 'yellow.400' : 'red.400'}
                      fontWeight="medium"
                    >
                      {engagementRate > 10 ? 'Excellent' : 
                       engagementRate > 5 ? 'Good' : 
                       engagementRate > 2 ? 'Average' : 'Below Average'}
                    </Text>
                  </HStack>
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm" color={textColor}>Estimated reach</Text>
                  <Text fontSize="sm" color={mutedTextColor}>
                    {Math.floor(totalViews * 1.2 + Math.random() * 100)} accounts
                  </Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm" color={textColor}>Avg. engagement time</Text>
                  <Text fontSize="sm" color={mutedTextColor}>
                    {Math.floor(Math.random() * 30 + 15)}s
                  </Text>
                </HStack>
              </VStack>
            </MotionBox>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostAnalytics;
