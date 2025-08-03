import {
  Box,
  VStack,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from '../../utils/timeAgo';

const NotificationCenter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock notifications - in real app, fetch from API
    const mockNotifications = [
      {
        id: 1,
        type: 'like',
        message: 'John liked your post',
        avatar: '/profilepic.png',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        actionUser: 'john_doe',
      },
      {
        id: 2,
        type: 'comment',
        message: 'Sarah commented on your post: "Amazing shot!"',
        avatar: '/profilepic.png',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        actionUser: 'sarah_wilson',
      },
      {
        id: 3,
        type: 'follow',
        message: 'Mike started following you',
        avatar: '/profilepic.png',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        read: true,
        actionUser: 'mike_photo',
      },
      {
        id: 4,
        type: 'mention',
        message: 'Alex mentioned you in a comment',
        avatar: '/profilepic.png',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        actionUser: 'alex_creative',
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👤';
      case 'mention':
        return '@';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like':
        return 'red';
      case 'comment':
        return 'blue';
      case 'follow':
        return 'green';
      case 'mention':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <Box position="relative" cursor="pointer" onClick={onOpen}>
        <BellIcon boxSize={6} />
        {unreadCount > 0 && (
          <Badge
            position="absolute"
            top="-8px"
            right="-8px"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
            minW={5}
            h={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Box>

      {/* Notifications Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
            <Text>Notifications</Text>
            {unreadCount > 0 && (
              <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={0} align="stretch" maxH="400px" overflowY="auto">
              {notifications.length === 0 ? (
                <Text textAlign="center" color="gray.500" py={8}>
                  No notifications yet
                </Text>
              ) : (
                notifications.map((notification, index) => (
                  <Box key={notification.id}>
                    <Flex
                      p={3}
                      bg={notification.read ? 'transparent' : 'blue.50'}
                      _dark={{ bg: notification.read ? 'transparent' : 'blue.900' }}
                      cursor="pointer"
                      onClick={() => !notification.read && markAsRead(notification.id)}
                      _hover={{ bg: 'gray.50' }}
                      borderRadius="md"
                    >
                      <Avatar size="sm" src={notification.avatar} mr={3} />
                      <Box flex={1}>
                        <Flex align="center" gap={2} mb={1}>
                          <Text fontSize="sm">
                            {getNotificationIcon(notification.type)}
                          </Text>
                          <Text fontSize="sm" fontWeight="medium">
                            {notification.actionUser}
                          </Text>
                          {!notification.read && (
                            <Badge
                              size="sm"
                              colorScheme={getNotificationColor(notification.type)}
                              borderRadius="full"
                            >
                              New
                            </Badge>
                          )}
                        </Flex>
                        <Text fontSize="sm" color="gray.600" mb={1}>
                          {notification.message}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          {formatDistanceToNow(notification.timestamp)}
                        </Text>
                      </Box>
                    </Flex>
                    {index < notifications.length - 1 && <Divider />}
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationCenter;
