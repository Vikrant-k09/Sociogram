import { Flex, Text, Icon } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { RippleButton } from "../UI/RippleButton";
import { useTheme } from "../../context/ThemeContext";

// Custom Google Icon component
const GoogleIcon = (props) => (
	<Icon viewBox="0 0 24 24" {...props}>
		<path
			fill="currentColor"
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
		/>
		<path
			fill="currentColor"
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
		/>
		<path
			fill="currentColor"
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
		/>
		<path
			fill="currentColor"
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
		/>
	</Icon>
);

const GoogleAuth = ({ prefix }) => {
	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);
	const { isDark } = useTheme();

	const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<RippleButton
			w="full"
			variant="outline"
			borderColor={isDark ? "gray.600" : "gray.300"}
			bg={isDark ? "gray.800" : "white"}
			color={isDark ? "white" : "gray.700"}
			_hover={{ 
				borderColor: "gray.400", 
				bg: isDark ? "gray.700" : "gray.50",
				transform: "translateY(-1px)",
				boxShadow: "md"
			}}
			_active={{ transform: "translateY(0)" }}
			onClick={handleGoogleAuth}
			transition="all 0.2s"
			size="lg"
			py={6}
		>
			<Flex alignItems={"center"} justifyContent={"center"} gap={3}>
				<GoogleIcon boxSize={5} />
				<Text fontSize="sm" fontWeight="medium">
					{prefix} with Google
				</Text>
			</Flex>
		</RippleButton>
	);
};

export default GoogleAuth;
