import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
	const authUser = useAuthStore((state) => state.user);

	const onFollowUser = async () => {
		await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
	};

	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} gap={3}>
			<Flex alignItems={"center"} gap={3} flex={1} minW={0}>
				<Link to={`/${user.username}`}>
					<Avatar 
						src={user.profilePicURL} 
						size={"md"} 
						loading="lazy"
						bg="gray.200"
						border="2px solid"
						borderColor="gray.100"
						_hover={{ 
							transform: "scale(1.05)",
							transition: "transform 0.2s"
						}}
					/>
				</Link>
				<VStack spacing={1} alignItems={"flex-start"} flex={1} minW={0}>
					<Link to={`/${user.username}`}>
						<Box 
							fontSize={12} 
							fontWeight={"bold"}
							noOfLines={1}
							_hover={{ textDecoration: "underline" }}
						>
							{user.fullName}
						</Box>
					</Link>
					<Box fontSize={11} color={"gray.500"} noOfLines={1}>
						{user.followers.length} followers
					</Box>
				</VStack>
			</Flex>
			{authUser.uid !== user.uid && (
				<Button
					fontSize={13}
					bg={"transparent"}
					p={2}
					h={"auto"}
					minW={"60px"}
					fontWeight={"medium"}
					color={"blue.400"}
					cursor={"pointer"}
					_hover={{ color: "white" }}
					onClick={onFollowUser}
					isLoading={isUpdating}
					size="sm"
				>
					{isFollowing ? "Unfollow" : "Follow"}
				</Button>
			)}
		</Flex>
	);
};

export default SuggestedUser;
