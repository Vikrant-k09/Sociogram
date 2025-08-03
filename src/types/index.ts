export interface User {
  uid: string;
  email: string;
  username: string;
  fullName: string;
  bio: string;
  profilePicURL: string;
  followers: string[];
  following: string[];
  posts: string[];
  createdAt: number;
}

export interface Post {
  id: string;
  createdBy: string;
  caption: string;
  imageURL: string;
  likes: string[];
  comments: Comment[];
  createdAt: number;
}

export interface Comment {
  id: string;
  postId: string;
  createdBy: string;
  comment: string;
  createdAt: number;
}

export interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export interface PostStore {
  posts: Post[];
  createPost: (post: Post) => void;
  deletePost: (postId: string) => void;
  setPosts: (posts: Post[]) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export interface UserProfileStore {
  userProfile: User | null;
  setUserProfile: (user: User | null) => void;
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export type ThemeMode = 'light' | 'dark';

export interface AppTheme {
  mode: ThemeMode;
  colors: ThemeColors;
}
