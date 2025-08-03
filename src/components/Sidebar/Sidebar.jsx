import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SociogramLogo, SociogramMobileLogo } from "../../assets/constants";
import { AnimatedIcon } from "../UI/AnimatedIcon";
import { RippleButton } from "../UI/RippleButton";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const { isDark, theme } = useTheme();

	const sidebarVariants = {
		hidden: { x: -100, opacity: 0 },
		visible: { 
			x: 0, 
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { x: -20, opacity: 0 },
		visible: { 
			x: 0, 
			opacity: 1,
			transition: { duration: 0.4, ease: "easeOut" }
		}
	};

	return (
		<MotionBox
			height={"100vh"}
			borderRight={"1px solid"}
			borderColor={theme.colors.glass.border}
			py={8}
			position={"sticky"}
			top={0}
			left={0}
			px={{ base: 2, md: 4 }}
			background={theme.colors.glass.background}
			backdropFilter="blur(20px)"
			boxShadow={theme.shadows.soft}
			initial="hidden"
			animate="visible"
			variants={sidebarVariants}
			_before={{
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: isDark 
					? 'linear-gradient(180deg, rgba(102, 126, 234, 0.02) 0%, transparent 50%, rgba(118, 75, 162, 0.02) 100%)'
					: 'linear-gradient(180deg, rgba(102, 126, 234, 0.01) 0%, transparent 50%, rgba(118, 75, 162, 0.01) 100%)',
				pointerEvents: 'none'
			}}
		>
			<Flex direction={"column"} gap={10} w='full' height={"full"}>
				{/* Desktop Logo */}
				<MotionBox variants={itemVariants}>
					<Link 
						to={"/"} 
						as={RouterLink} 
						pl={2} 
						display={{ base: "none", md: "block" }} 
						cursor='pointer'
					>
						<MotionBox
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<SociogramLogo />
						</MotionBox>
					</Link>
				</MotionBox>

				{/* Mobile Logo */}
				<MotionBox variants={itemVariants}>
					<Link
						to={"/"}
						as={RouterLink}
						p={2}
						display={{ base: "block", md: "none" }}
						borderRadius={12}
						_hover={{
							bg: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
						}}
						w={10}
						cursor='pointer'
					>
						<MotionBox
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.9 }}
							transition={{ duration: 0.2 }}
						>
							<SociogramMobileLogo />
						</MotionBox>
					</Link>
				</MotionBox>

				{/* Navigation Items */}
				<MotionFlex 
					direction={"column"} 
					gap={5} 
					cursor={"pointer"}
					variants={itemVariants}
				>
					<SidebarItems />
				</MotionFlex>

				{/* Theme Toggle */}
				<MotionFlex 
					justifyContent={{ base: "center", md: "flex-start" }} 
					mt={4}
					variants={itemVariants}
				>
					<ThemeToggle />
				</MotionFlex>

				{/* Logout Button */}
				<MotionBox variants={itemVariants}>
					<Tooltip
						hasArrow
						label={"Logout"}
						placement='right'
						ml={1}
						openDelay={500}
						display={{ base: "block", md: "none" }}
						bg={isDark ? "gray.800" : "gray.600"}
						color="white"
					>
						<MotionFlex
							onClick={handleLogout}
							alignItems={"center"}
							gap={4}
							_hover={{ 
								bg: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
								transform: "translateX(4px)"
							}}
							borderRadius={12}
							p={3}
							w={{ base: 10, md: "full" }}
							mt={"auto"}
							justifyContent={{ base: "center", md: "flex-start" }}
							transition="all 0.3s ease"
							cursor="pointer"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<MotionBox
								animate={{ rotate: isLoggingOut ? 360 : 0 }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
							>
								<BiLogOut size={25} color={isDark ? "#ffffff" : "#262626"} />
							</MotionBox>
							<Button
								display={{ base: "none", md: "block" }}
								variant={"ghost"}
								_hover={{ bg: "transparent" }}
								isLoading={isLoggingOut}
								color={isDark ? "white" : "black"}
								fontWeight="500"
								fontSize="md"
							>
								Logout
							</Button>
						</MotionFlex>
					</Tooltip>
				</MotionBox>
			</Flex>
		</MotionBox>
	);
};

export default Sidebar;
