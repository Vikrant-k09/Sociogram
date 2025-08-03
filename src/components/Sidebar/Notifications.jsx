import { Box, Flex, Tooltip, Badge, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { NotificationsLogo } from "../../assets/constants";
import { AnimatedIcon } from "../UI/AnimatedIcon";
import NotificationsModal from "../Notifications/NotificationsModal";
import { useTheme } from "../../context/ThemeContext";
import useNotificationStore from "../../store/notificationStore";
import { useNotificationGenerator } from "../../hooks/useNotificationGenerator";

const Notifications = () => {
	const { getUnreadCount } = useNotificationStore();
	const { generateRandomNotification } = useNotificationGenerator();
	const [isAnimated, setIsAnimated] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isDark, theme } = useTheme();

	const unreadCount = getUnreadCount();
	const hasNotifications = unreadCount > 0;

	// Generate a random notification every 30 seconds for demo
	useEffect(() => {
		const interval = setInterval(() => {
			if (Math.random() > 0.7) { // 30% chance every 30 seconds
				generateRandomNotification();
			}
		}, 30000);

		return () => clearInterval(interval);
	}, [generateRandomNotification]);

	const handleNotificationClick = () => {
		setIsAnimated(true);
		onOpen();
		// Reset animation after a delay
		setTimeout(() => {
			setIsAnimated(false);
		}, 600);
	};

	return (
		<>
			<Tooltip
				hasArrow
				label={"Notifications"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
				bg={isDark ? "gray.800" : "gray.600"}
				color="white"
			>
				<Flex
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
					cursor="pointer"
					onClick={handleNotificationClick}
					position="relative"
					color={theme.colors.primary}
					transition="all 0.3s ease"
				>
					<AnimatedIcon 
						hoverScale={1.15} 
						tapScale={0.95}
						tooltip={hasNotifications ? "You have new notifications!" : "No new notifications"}
					>
						<Box position="relative">
							<NotificationsLogo 
								isAnimated={isAnimated} 
								hasNotification={hasNotifications} 
							/>
							{hasNotifications && (
								<Badge
									position="absolute"
									top="-2px"
									right="-2px"
									colorScheme="red"
									borderRadius="full"
									fontSize="xs"
									minW="18px"
									h="18px"
									display="flex"
									alignItems="center"
									justifyContent="center"
									border="2px solid"
									borderColor={isDark ? "gray.800" : "white"}
									bg="red.500"
									color="white"
									fontWeight="bold"
								>
									{unreadCount > 9 ? '9+' : unreadCount}
								</Badge>
							)}
						</Box>
					</AnimatedIcon>
					<Box 
						display={{ base: "none", md: "block" }}
						fontWeight="500"
						fontSize="md"
					>
						Notifications
						{hasNotifications && (
							<Badge ml={2} colorScheme="red" fontSize="xs">
								New
							</Badge>
						)}
					</Box>
				</Flex>
			</Tooltip>
			
			<NotificationsModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default Notifications;
