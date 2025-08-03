import { Container, Flex, VStack, Box, Text, useColorModeValue } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const AuthPage = () => {
	const { isDark, theme } = useTheme();
	const bgGradient = useColorModeValue(
		'linear(to-br, purple.50, blue.50, pink.50)',
		'linear(to-br, gray.900, purple.900, blue.900)'
	);

	return (
		<Flex 
			minH={"100vh"} 
			justifyContent={"center"} 
			alignItems={"center"} 
			px={4}
			bgGradient={bgGradient}
			position="relative"
			overflow="hidden"
		>
			{/* Animated background elements */}
			<MotionBox
				position="absolute"
				top="10%"
				left="10%"
				w="300px"
				h="300px"
				bg={theme.colors.primary}
				borderRadius="full"
				opacity={0.1}
				animate={{
					scale: [1, 1.2, 1],
					rotate: [0, 180, 360],
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "linear"
				}}
			/>
			<MotionBox
				position="absolute"
				bottom="10%"
				right="10%"
				w="200px"
				h="200px"
				bg="purple.400"
				borderRadius="full"
				opacity={0.1}
				animate={{
					scale: [1.2, 1, 1.2],
					rotate: [360, 180, 0],
				}}
				transition={{
					duration: 15,
					repeat: Infinity,
					ease: "linear"
				}}
			/>

			<Container maxW={"container.md"} padding={0} position="relative" zIndex={1}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					{/* Left hand-side - Welcome section */}
					<MotionBox 
						display={{ base: "none", md: "block" }}
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<VStack spacing={6} align="start" maxW="400px">
							<MotionText
								fontSize="4xl"
								fontWeight="bold"
								bgGradient="linear(to-r, purple.400, blue.400, pink.400)"
								bgClip="text"
								animate={{ 
									backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
								}}
								transition={{ duration: 3, repeat: Infinity }}
							>
								Welcome to Sociogram
							</MotionText>
							<Text 
								fontSize="lg" 
								color={isDark ? "gray.300" : "gray.600"}
								lineHeight={1.6}
							>
								Connect with friends, share your moments, and discover amazing content from people around the world.
							</Text>
							<VStack spacing={3} align="start" w="full">
								<Flex align="center" gap={3}>
									<Box w={2} h={2} bg={theme.colors.primary} borderRadius="full" />
									<Text color={isDark ? "gray.400" : "gray.500"}>Share photos and videos</Text>
								</Flex>
								<Flex align="center" gap={3}>
									<Box w={2} h={2} bg="purple.400" borderRadius="full" />
									<Text color={isDark ? "gray.400" : "gray.500"}>Connect with friends</Text>
								</Flex>
								<Flex align="center" gap={3}>
									<Box w={2} h={2} bg="pink.400" borderRadius="full" />
									<Text color={isDark ? "gray.400" : "gray.500"}>Discover new content</Text>
								</Flex>
							</VStack>
						</VStack>
					</MotionBox>

					{/* Right hand-side - Auth form */}
					<MotionBox
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<VStack spacing={4} align={"stretch"} minW={{ base: "300px", md: "350px" }}>
							<AuthForm />
							<Text 
								textAlign={"center"} 
								fontSize="sm" 
								color={isDark ? "gray.400" : "gray.600"}
								mt={4}
							>
								Join the Sociogram community today.
							</Text>
						</VStack>
					</MotionBox>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
