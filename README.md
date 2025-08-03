# 🌟 Sociogram - Modern Social Media Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Firebase-9.0+-FF6F00?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white" alt="Chakra UI" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<div align="center">
  <h3>🚀 A modern social media platform for sharing photos and connecting with others</h3>
  <p><em>Built with React, Firebase, and modern web technologies</em></p>
</div>

## 📖 **Project Overview**

Sociogram is a full-stack social media application that allows users to share photos, follow friends, and engage with content through likes and comments. The platform features a clean, Instagram-inspired design with modern enhancements including dark/light themes, smooth animations, and real-time updates.

**Key Capabilities:**
- 📸 Photo sharing with multiple image support
- 👥 User profiles and follow/unfollow functionality  
- 💬 Real-time commenting and liking
- 🔍 User search and discovery
- 🌓 Dark/light theme switching
- 📱 Fully responsive mobile-first design

## ✨ **Features**

### 🔐 **Authentication**
- User registration and login
- Google OAuth integration
- Secure session management
- Protected routes

### � **Content Sharing**
- Photo upload and sharing
- Multiple image posts
- Image cropping and optimization
- Real-time feed updates

### 👥 **Social Features**
- User profiles with bio and stats
- Follow/unfollow functionality
- User search and discovery
- Suggested users algorithm

### 💬 **Engagement**
- Like and unlike posts
- Comment on posts
- Real-time notifications
- Post engagement analytics

### 🎨 **User Experience**
- Dark/light theme toggle
- Responsive mobile design
- Smooth animations and transitions
- Modern glass morphism UI effects

## 🛠️ **Tech Stack**

**Frontend:**
- **React 18** - Component-based UI library
- **Vite** - Fast build tool and dev server
- **Chakra UI** - Modern component library
- **Framer Motion** - Animation library
- **Zustand** - Lightweight state management

**Backend & Services:**
- **Firebase Auth** - User authentication
- **Firestore** - NoSQL real-time database
- **Firebase Storage** - Image and file storage

**Tools & Deployment:**
- **Vercel** - Hosting and deployment
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sociogram.git
   cd sociogram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Add your Firebase config to `src/firebase/firebase.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## � **Project Structure**

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── firebase/           # Firebase configuration
└── utils/              # Utility functions
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 **Contact**

For questions or support, please reach out via email or create an issue on GitHub.

## 🏗️ Project Structure

```
sociogram/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Constants and shared assets
│   ├── components/        # Reusable UI components
│   │   ├── AuthForm/      # Authentication components
│   │   ├── FeedPosts/     # Post-related components
│   │   ├── Profile/       # Profile management
│   │   ├── Sidebar/       # Navigation sidebar
│   │   └── SuggestedUsers/# User discovery
│   ├── firebase/          # Firebase configuration
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layout components
│   ├── pages/             # Main page components
│   ├── store/             # Zustand state management
│   └── utils/             # Utility functions
├── package.json
└── README.md
```

## 🎯 Performance Optimizations

- **Lazy Loading** - Components and images load on demand
- **Optimistic Updates** - Immediate UI feedback for better UX
- **Efficient Re-renders** - Minimized component re-renders with proper state management
- **Image Optimization** - Compressed images and progressive loading
- **Bundle Splitting** - Code splitting for faster initial load times

## 🔒 Security Features

- **Input Validation** - Client and server-side validation
- **Authentication Guards** - Protected routes and components
- **Data Privacy** - Secure user data handling
- **Content Moderation** - Basic content filtering capabilities

## 🧪 Testing & Quality

- **ESLint** - Code linting and style consistency
- **Error Boundaries** - Graceful error handling
- **Performance Monitoring** - Built-in performance tracking
- **Responsive Testing** - Cross-device compatibility

## 📈 Future Enhancements

- [ ] **Stories Feature** - Instagram-style stories
- [ ] **Direct Messaging** - Real-time chat functionality
- [ ] **Video Support** - Video uploads and playback
- [ ] **Advanced Search** - Hashtag and location-based search
- [ ] **Push Notifications** - Real-time notifications
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Analytics Dashboard** - Detailed user and post analytics
- [ ] **Content Scheduling** - Schedule posts for later

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎨 Design Philosophy

Sociogram prioritizes user experience with a clean, intuitive interface that adapts seamlessly across devices. The design emphasizes content discovery and social interaction while maintaining fast performance and accessibility standards.

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please reach out through:
- GitHub Issues
- Email: your-email@example.com
- LinkedIn: your-linkedin-profile

---

**Built with ❤️ using React, Firebase, and modern web technologies.**
