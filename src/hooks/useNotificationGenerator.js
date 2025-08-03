import { useMemo } from 'react';
import useNotificationStore from '../store/notificationStore';
import useAuthStore from '../store/authStore';

const USER_AVATARS = [
  'https://bit.ly/dan-abramov',
  'https://bit.ly/sage-adebayo', 
  'https://bit.ly/kent-c-dodds',
  'https://bit.ly/prosper-baba',
  'https://bit.ly/ryan-florence'
];

const USERNAMES = [
  'john_doe', 'sarah_smith', 'alex_photo', 'emma_wilson', 'mike_photographer',
  'lisa_art', 'david_travel', 'anna_creative', 'tom_vision', 'jane_lens'
];

const COMMENT_MESSAGES = [
  'Amazing shot! 📸',
  'Love this! ❤️',
  'Great composition! 👏',
  'Beautiful work! ✨',
  'Incredible! 🔥',
  'So inspiring! 💫',
  'Perfect timing! ⏰',
  'Stunning capture! 🎯'
];

export const useNotificationGenerator = () => {
  const { addNotification } = useNotificationStore();
  const authUser = useAuthStore(state => state.user);

  const getRandomUser = useMemo(() => () => {
    const randomIndex = Math.floor(Math.random() * USERNAMES.length);
    return {
      username: USERNAMES[randomIndex],
      profilePic: USER_AVATARS[randomIndex % USER_AVATARS.length]
    };
  }, []);

  const getRandomComment = useMemo(() => () => {
    return COMMENT_MESSAGES[Math.floor(Math.random() * COMMENT_MESSAGES.length)];
  }, []);

  const generateLikeNotification = (postId) => {
    if (!authUser) return;
    
    const user = getRandomUser();
    addNotification({
      type: 'like',
      user,
      message: 'liked your photo',
      postId
    });
  };

  const generateCommentNotification = (postId, comment) => {
    if (!authUser) return;
    
    const user = getRandomUser();
    const message = comment ? `commented: "${comment}"` : `commented: "${getRandomComment()}"`;
    
    addNotification({
      type: 'comment',
      user,
      message,
      postId
    });
  };

  const generateFollowNotification = (followerId) => {
    if (!authUser) return;
    
    const user = getRandomUser();
    addNotification({
      type: 'follow',
      user,
      message: 'started following you',
      followerId
    });
  };

  // Auto-generate some random notifications for demo
  const generateRandomNotification = () => {
    const types = ['like', 'comment', 'follow'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    switch (randomType) {
      case 'like':
        generateLikeNotification('demo-post-' + Date.now());
        break;
      case 'comment':
        generateCommentNotification('demo-post-' + Date.now());
        break;
      case 'follow':
        generateFollowNotification('user-' + Date.now());
        break;
    }
  };

  return {
    generateLikeNotification,
    generateCommentNotification,
    generateFollowNotification,
    generateRandomNotification
  };
};

export default useNotificationGenerator;
