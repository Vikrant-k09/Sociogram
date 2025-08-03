import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import { useTheme } from "../../context/ThemeContext";

const HomePage = () => {
	const { theme } = useTheme();

	return (
		<Container maxW={"container.xl"} bg="transparent" px={{ base: 4, md: 8 }}>
			<Flex gap={{ base: 4, md: 8, lg: 20 }} direction={{ base: "column", lg: "row" }}>
				<Box flex={2} py={10} w="full">
					<FeedPosts />
				</Box>
				<Box 
					flex={1} 
					display={{ base: "none", lg: "block" }} 
					maxW={"320px"}
					minW={"280px"}
					py={10}
				>
					<SuggestedUsers />
				</Box>
			</Flex>
		</Container>
	);
};

export default HomePage;
