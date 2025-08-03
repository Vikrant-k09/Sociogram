import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { useTheme } from "../../context/ThemeContext";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);
	const { isDark, theme } = useTheme();

	return (
		<Box
			bg={theme.colors.glass.background}
			backdropFilter="blur(10px)"
			border="1px solid"
			borderColor={theme.colors.glass.border}
			borderRadius="xl"
			overflow="hidden"
			mb={6}
			boxShadow={theme.shadows.soft}
			transition="all 0.3s ease"
			_hover={{
				transform: "translateY(-2px)",
				boxShadow: theme.shadows.medium
			}}
		>
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box overflow={"hidden"}>
				<Image 
					src={post.imageURL} 
					alt={"FEED POST IMG"} 
					w="100%"
					objectFit="cover"
				/>
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</Box>
	);
};

export default FeedPost;
