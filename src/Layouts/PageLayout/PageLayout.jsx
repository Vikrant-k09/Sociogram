import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import { useTheme } from "../../context/ThemeContext";

// instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebar on every page except the AuthPage.

const PageLayout = ({ children }) => {
	const { pathname } = useLocation();
	const [user, loading] = useAuthState(auth);
	const { isDark, theme } = useTheme();
	const canRenderSidebar = pathname !== "/auth" && user;
	const canRenderNavbar = !user && !loading && pathname !== "/auth";

	const checkingUserIsAuth = !user && loading;
	if (checkingUserIsAuth) return <PageLayoutSpinner />;

	return (
		<Flex 
			flexDir={canRenderNavbar ? "column" : "row"}
			bg={theme.colors.background.primary}
			bgImage={isDark 
				? 'radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)'
				: 'radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)'
			}
			color={theme.colors.text.primary}
			minH="100vh"
			transition="all 0.3s ease"
			position="relative"
			_before={isDark ? {
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(102, 126, 234, 0.06), transparent 40%)',
				pointerEvents: 'none',
				zIndex: -1
			} : {}}
		>
			{/* sidebar on the left */}
			{canRenderSidebar ? (
				<Box w={{ base: "70px", md: "240px" }}>
					<Sidebar />
				</Box>
			) : null}
			{/* Navbar */}
			{canRenderNavbar ? <Navbar /> : null}
			{/* the page content on the right */}
			<Box 
				flex={1} 
				w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} 
				mx={"auto"}
				bg={theme.colors.background.primary}
			>
				{children}
			</Box>
		</Flex>
	);
};

export default PageLayout;

const PageLayoutSpinner = () => {
	const { theme } = useTheme();
	return (
		<Flex 
			flexDir='column' 
			h='100vh' 
			alignItems='center' 
			justifyContent='center'
			bg={theme.colors.background.primary}
		>
			<Spinner size='xl' color={theme.colors.accent} />
		</Flex>
	);
};
