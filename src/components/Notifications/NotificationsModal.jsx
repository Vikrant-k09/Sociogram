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
  Avatar,
  Box,
  Badge,
  Divider,
  Button,
  useColorModeValue,
  useToast,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiFillHeart, AiFillMessage, AiOutlineUserAdd } from 'react-icons/ai';
import { DeleteIcon } from '@chakra-ui/icons';
import { timeAgo } from '../../utils/timeAgo';
import { useTheme } from '../../context/ThemeContext';
import useNotificationStore from '../../store/notificationStore';

const MotionBox = motion(Box);

const NotificationsModal = ({ isOpen, onClose }) => {
  const { isDark, theme } = useTheme();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();

  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getUnreadCount
  } = useNotificationStore();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: 'All notifications marked as read',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    // Navigate to post or profile based on notification type
    if (notification.postId) {
      console.log('Navigate to post:', notification.postId);
      toast({
        title: 'Navigating to post...',
        status: 'info',
        duration: 1500,
        isClosable: true,
      });
    } else if (notification.followerId) {
      console.log('Navigate to profile:', notification.followerId);
      toast({
        title: 'Navigating to profile...',
        status: 'info',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleDeleteNotification = (e, notificationId) => {
    e.stopPropagation();
    removeNotification(notificationId);
    toast({
      title: 'Notification removed',
      status: 'info',
      duration: 1500,
      isClosable: true,
    });
  };

  const handleClearAll = () => {
    clearAll();
    toast({
      title: 'All notifications cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { icon: AiFillHeart, color: 'red.500' };
      case 'comment':
        return { icon: AiFillMessage, color: 'blue.500' };
      case 'follow':
        return { icon: AiOutlineUserAdd, color: 'green.500' };
      default:
        return { icon: AiFillMessage, color: 'gray.500' };
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        bg={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        backdropFilter="blur(20px)"
        backgroundColor={isDark ? 'rgba(26, 32, 44, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
        boxShadow="xl"
        borderRadius="xl"
        mx={4}
        my={8}
      >
        <ModalHeader
          borderBottom="1px"
          borderColor={borderColor}
          py={4}
          px={6}
        >
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                Notifications
              </Text>
              {getUnreadCount() > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  px={2}
                  py={1}
                  fontSize="xs"
                >
                  {getUnreadCount()}
                </Badge>
              )}
            </HStack>
            <HStack spacing={2}>
              {notifications.length > 0 && (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={handleMarkAllAsRead}
                    disabled={getUnreadCount() === 0}
                  >
                    Mark all read
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleClearAll}
                  >
                    Clear all
                  </Button>
                </>
              )}
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p={0}>
          {notifications.length === 0 ? (
            <Box textAlign="center" py={12}>
              <Text color={mutedTextColor} fontSize="lg">
                🔔 No notifications yet
              </Text>
              <Text color={mutedTextColor} fontSize="sm" mt={2}>
                When someone likes or comments on your posts, you'll see it here
              </Text>
            </Box>
          ) : (
            <VStack spacing={0} align="stretch">
              {notifications.map((notification, index) => {
                const { icon: IconComponent, color } = getNotificationIcon(notification.type);
                
                return (
                  <MotionBox
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box
                      px={6}
                      py={4}
                      borderBottom={index < notifications.length - 1 ? "1px" : "none"}
                      borderColor={borderColor}
                      cursor="pointer"
                      _hover={{ bg: hoverBg }}
                      transition="all 0.2s"
                      onClick={() => handleNotificationClick(notification)}
                      position="relative"
                    >
                      <HStack spacing={4} align="start">
                        {/* User Avatar */}
                        <Avatar
                          size="md"
                          src={notification.user.profilePic}
                          name={notification.user.username}
                        >
                          <Box
                            position="absolute"
                            bottom="-2px"
                            right="-2px"
                            bg={color}
                            borderRadius="full"
                            p={1}
                            border="2px solid"
                            borderColor={bgColor}
                          >
                            <IconComponent size={12} color="white" />
                          </Box>
                        </Avatar>

                        {/* Notification Content */}
                        <VStack align="start" spacing={1} flex={1}>
                          <HStack spacing={2} w="full" justify="space-between">
                            <Text color={textColor} fontSize="sm">
                              <Text as="span" fontWeight="bold">
                                @{notification.user.username}
                              </Text>{' '}
                              {notification.message}
                            </Text>
                            <IconButton
                              icon={<DeleteIcon />}
                              size="xs"
                              variant="ghost"
                              colorScheme="red"
                              opacity={0.6}
                              _hover={{ opacity: 1 }}
                              onClick={(e) => handleDeleteNotification(e, notification.id)}
                              aria-label="Delete notification"
                            />
                          </HStack>
                          <HStack spacing={2} align="center">
                            <Text color={mutedTextColor} fontSize="xs">
                              {timeAgo(notification.time)}
                            </Text>
                            {!notification.isRead && (
                              <Box
                                w={2}
                                h={2}
                                bg="blue.500"
                                borderRadius="full"
                              />
                            )}
                          </HStack>
                        </VStack>
                      </HStack>
                    </Box>
                  </MotionBox>
                );
              })}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NotificationsModal;
