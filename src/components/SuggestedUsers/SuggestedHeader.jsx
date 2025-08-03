import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const authUser = useAuthStore((state) => state.user);

	if (!authUser) return null;

	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} gap={3}>
			<Flex alignItems={"center"} gap={3} flex={1} minW={0}>
				<Link to={`${authUser.username}`}>
					<Avatar 
						size={"lg"} 
						src={authUser.profilePicURL}
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
				<Link to={`${authUser.username}`} style={{ flex: 1, minWidth: 0 }}>
					<Text 
						fontSize={12} 
						fontWeight={"bold"}
						noOfLines={1}
						_hover={{ textDecoration: "underline" }}
					>
						{authUser.username}
					</Text>
				</Link>
			</Flex>
			<Button
				size={"xs"}
				background={"transparent"}
				_hover={{ background: "transparent" }}
				fontSize={14}
				fontWeight={"medium"}
				color={"blue.400"}
				onClick={handleLogout}
				isLoading={isLoggingOut}
				cursor={"pointer"}
				minW={"60px"}
			>
				Log out
			</Button>
		</Flex>
	);
};

export default SuggestedHeader;
