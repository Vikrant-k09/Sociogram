import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
  notifications: [
    {
      id: 1,
      type: 'like',
      user: { username: 'john_doe', profilePic: 'https://bit.ly/dan-abramov' },
      message: 'liked your photo',
      time: Date.now() - 300000, // 5 minutes ago
      isRead: false,
      postId: 'sample-post-1'
    },
    {
      id: 2,
      type: 'comment',
      user: { username: 'sarah_smith', profilePic: 'https://bit.ly/sage-adebayo' },
      message: 'commented on your post: "Amazing shot! 📸"',
      time: Date.now() - 1800000, // 30 minutes ago
      isRead: false,
      postId: 'sample-post-2'
    },
    {
      id: 3,
      type: 'follow',
      user: { username: 'alex_photo', profilePic: 'https://bit.ly/kent-c-dodds' },
      message: 'started following you',
      time: Date.now() - 3600000, // 1 hour ago
      isRead: true,
      followerId: 'user-123'
    }
  ],

  // Add a new notification
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Date.now() + Math.random(),
        time: Date.now(),
        isRead: false
      },
      ...state.notifications
    ]
  })),

  // Mark specific notification as read
  markAsRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    )
  })),

  // Mark all notifications as read
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(notification => ({
      ...notification,
      isRead: true
    }))
  })),

  // Remove a notification
  removeNotification: (notificationId) => set((state) => ({
    notifications: state.notifications.filter(
      notification => notification.id !== notificationId
    )
  })),

  // Get unread count
  getUnreadCount: () => {
    const { notifications } = get();
    return notifications.filter(n => !n.isRead).length;
  },

  // Clear all notifications
  clearAll: () => set({ notifications: [] })
}));

export default useNotificationStore;
