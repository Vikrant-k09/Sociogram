import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const showToast = useShowToast();

  const searchPosts = async (hashtag) => {
    setIsLoading(true);
    setPosts([]);
    
    try {
      // Search for posts that contain the hashtag in their caption
      const q = query(
        collection(firestore, "posts"),
        where("caption", ">=", `#${hashtag}`),
        where("caption", "<=", `#${hashtag}\uf8ff`)
      );
      
      const querySnapshot = await getDocs(q);
      const foundPosts = [];
      
      querySnapshot.forEach((doc) => {
        const post = { ...doc.data(), id: doc.id };
        // Additional client-side filtering for better hashtag matching
        if (post.caption.toLowerCase().includes(`#${hashtag.toLowerCase()}`)) {
          foundPosts.push(post);
        }
      });
      
      setPosts(foundPosts);
      
      if (foundPosts.length === 0) {
        showToast("Info", `No posts found for #${hashtag}`, "info");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, posts, searchPosts, setPosts };
};

export default useSearchPosts;
