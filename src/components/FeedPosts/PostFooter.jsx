import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import { AnimatedIcon } from "../UI/AnimatedIcon";
import { RippleButton } from "../UI/RippleButton";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import { useNotificationGenerator } from "../../hooks/useNotificationGenerator";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { generateLikeNotification, generateCommentNotification } = useNotificationGenerator();

	const handleLikeWithNotification = async () => {
		await handleLikePost();
		// Generate notification for demo (in real app, only generate for other users' posts)
		if (!isLiked && authUser?.uid !== post.createdBy) {
			generateLikeNotification(post.id);
		}
	};

	const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		// Generate notification for demo
		if (comment.trim() && authUser?.uid !== post.createdBy) {
			generateCommentNotification(post.id, comment);
		}
		setComment("");
	};

	return (
		<Box mb={10} marginTop={"auto"}>
			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
				<AnimatedIcon
					onClick={handleLikeWithNotification}
					cursor={"pointer"}
					fontSize={18}
					tooltip={isLiked ? "Unlike" : "Like"}
					isActive={isLiked}
					hoverScale={1.2}
				>
					{!isLiked ? <NotificationsLogo isAnimated={false} /> : <UnlikeLogo />}
				</AnimatedIcon>

				<AnimatedIcon
					cursor={"pointer"}
					fontSize={18}
					onClick={() => commentRef.current.focus()}
					tooltip="Comment"
					hoverScale={1.15}
				>
					<CommentLogo isAnimated={false} />
				</AnimatedIcon>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"}>
				{likes} likes
			</Text>

			{isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={700}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
					{/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
					{isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
				</>
			)}

			{authUser && (
				<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
					<InputGroup>
						<Input
							variant={"flushed"}
							placeholder={"Add a comment..."}
							fontSize={14}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							ref={commentRef}
							_focus={{
								borderColor: "blue.400",
								boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)"
							}}
							transition="all 0.2s ease"
						/>
						<InputRightElement>
							<RippleButton 
								fontSize={14} 
								color={"blue.500"} 
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "blue.400" }}
								bg={"transparent"}
								w={"fit-content"}
								h={"28px"}
								onClick={handleSubmitComment}
								isLoading={isCommenting}
								size="sm"
							>
								Post
							</RippleButton>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
};

export default PostFooter;
