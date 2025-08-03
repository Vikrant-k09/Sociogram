import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import { useTheme } from "../../context/ThemeContext";

const SuggestedUsers = () => {
	const { isLoading, suggestedUsers } = useGetSuggestedUsers();
	const { isDark, theme } = useTheme();

	// optional: render loading skeleton
	if (isLoading) return null;

	return (
		<Box
			bg={theme.colors.glass.background}
			backdropFilter="blur(10px)"
			border="1px solid"
			borderColor={theme.colors.glass.border}
			borderRadius="xl"
			p={{ base: 4, md: 6 }}
			boxShadow={theme.shadows.soft}
			position="sticky"
			top="20px"
			w="full"
			maxW="100%"
		>
			<VStack gap={4} align="stretch">
				<SuggestedHeader />

				{suggestedUsers.length !== 0 && (
					<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
						<Text fontSize={12} fontWeight={"bold"} color={theme.colors.text.secondary}>
							Suggested for you
						</Text>
						<Text 
							fontSize={12} 
							fontWeight={"bold"} 
							color={theme.colors.primary}
							_hover={{ color: theme.colors.primaryHover }} 
							cursor={"pointer"}
							transition="color 0.2s"
						>
							See All
						</Text>
					</Flex>
				)}

				{suggestedUsers.map((user) => (
					<SuggestedUser user={user} key={user.id} />
				))}

				<Box fontSize={12} color={theme.colors.text.secondary} mt={5} alignSelf={"start"}>
					© 2024 Built By{" "}
					<Link 
						href='https://www.youtube.com/watch?v=HEXWRTEbj1I' 
						target='_blank' 
						color={theme.colors.primary}
						fontSize={14}
						_hover={{ color: theme.colors.primaryHover }}
						transition="color 0.2s"
					>
						Vikrant
					</Link>
				</Box>
			</VStack>
		</Box>
	);
};

export default SuggestedUsers;
