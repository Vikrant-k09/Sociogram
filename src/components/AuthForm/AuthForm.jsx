import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import { SociogramLogo } from "../../assets/constants";
import { useTheme } from "../../context/ThemeContext";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { isDark, theme } = useTheme();

	return (
		<>
			<Box 
				border="1px solid" 
				borderColor={isDark ? "gray.600" : "gray.300"}
				borderRadius={4} 
				padding={5}
				bg={isDark ? "gray.800" : "white"}
				backdropFilter="blur(10px)"
				boxShadow={isDark ? "0 8px 32px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.1)"}
			>
				<VStack spacing={4}>
					<Box cursor="pointer" _hover={{ transform: "scale(1.05)" }} transition="all 0.2s">
						<SociogramLogo />
					</Box>

					{isLogin ? <Login /> : <Signup />}

					{/* ---------------- OR -------------- */}
					<Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
						<Box flex={2} h={"1px"} bg={isDark ? "gray.600" : "gray.400"} />
						<Text mx={1} color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
							OR
						</Text>
						<Box flex={2} h={"1px"} bg={isDark ? "gray.600" : "gray.400"} />
					</Flex>

					<GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
				</VStack>
			</Box>

			<Box 
				border="1px solid" 
				borderColor={isDark ? "gray.600" : "gray.300"}
				borderRadius={4} 
				padding={5}
				bg={isDark ? "gray.800" : "white"}
				backdropFilter="blur(10px)"
				boxShadow={isDark ? "0 8px 32px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.1)"}
			>
				<Flex alignItems={"center"} justifyContent={"center"}>
					<Box mx={2} fontSize={14} color={isDark ? "gray.300" : "gray.700"}>
						{isLogin ? "Don't have an account?" : "Already have an account?"}
					</Box>
					<Box 
						onClick={() => setIsLogin(!isLogin)} 
						color={theme.colors.primary} 
						cursor={"pointer"}
						fontWeight="semibold"
						_hover={{ textDecoration: "underline" }}
					>
						{isLogin ? "Sign up" : "Log in"}
					</Box>
				</Flex>
			</Box>
		</>
	);
};

export default AuthForm;
