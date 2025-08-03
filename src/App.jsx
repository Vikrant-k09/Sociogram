import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { ThemeProvider } from "./context/ThemeContext";

// Page transition animations
const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
		scale: 0.98
	},
	in: {
		opacity: 1,
		y: 0,
		scale: 1
	},
	out: {
		opacity: 0,
		y: -20,
		scale: 1.02
	}
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.4
};

function App() {
	const [authUser] = useAuthState(auth);
	const location = useLocation();

	return (
		<ThemeProvider>
			<PageLayout>
				<AnimatePresence mode="wait">
					<Box key={location.pathname}>
						<motion.div
							initial="initial"
							animate="in"
							exit="out"
							variants={pageVariants}
							transition={pageTransition}
						>
							<Routes location={location}>
								<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
								<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
								<Route path='/:username' element={<ProfilePage />} />
							</Routes>
						</motion.div>
					</Box>
				</AnimatePresence>
			</PageLayout>
		</ThemeProvider>
	);
}

export default App;
