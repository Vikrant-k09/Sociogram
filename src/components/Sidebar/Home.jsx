import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { AnimatedIcon } from "../UI/AnimatedIcon";
import { useTheme } from "../../context/ThemeContext";

const Home = () => {
	const { isDark, theme } = useTheme();

	return (
		<Tooltip
			hasArrow
			label={"Home"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
			bg={isDark ? "gray.800" : "gray.600"}
			color="white"
		>
			<Link
				display={"flex"}
				to={"/"}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ 
					bg: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
					transform: "translateX(4px)"
				}}
				borderRadius={12}
				p={3}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				color={theme.colors.primary}
				transition="all 0.3s ease"
			>
				<AnimatedIcon hoverScale={1.15} tapScale={0.95}>
					<AiFillHome size={25} color={theme.colors.primary} />
				</AnimatedIcon>
				<Box 
					display={{ base: "none", md: "block" }}
					fontWeight="500"
					fontSize="md"
				>
					Home
				</Box>
			</Link>
		</Tooltip>
	);
};

export default Home;
