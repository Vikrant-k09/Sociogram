import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { RippleButton } from "../UI/RippleButton";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();
	const { theme } = useTheme();

	return (
		<>
			<Input
				placeholder='Email'
				fontSize={14}
				type='email'
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
				focusBorderColor={theme.colors.primary}
				_placeholder={{ color: "gray.500" }}
			/>
			<Input
				placeholder='Password'
				fontSize={14}
				size={"sm"}
				type='password'
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				focusBorderColor={theme.colors.primary}
				_placeholder={{ color: "gray.500" }}
			/>
			{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}
			<RippleButton
				w={"full"}
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={() => login(inputs)}
				bgGradient="linear(to-r, #667eea, #764ba2)"
				color="white"
				_hover={{ 
					opacity: 0.9, 
					transform: "translateY(-1px)",
					bgGradient: "linear(to-r, #5a67d8, #6b46c1)"
				}}
				_active={{ transform: "translateY(0)" }}
				transition="all 0.2s"
				fontWeight="semibold"
			>
				Log in to Sociogram
			</RippleButton>
		</>
	);
};

export default Login;
