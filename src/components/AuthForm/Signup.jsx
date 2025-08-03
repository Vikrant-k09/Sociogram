import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { RippleButton } from "../UI/RippleButton";
import { useTheme } from "../../context/ThemeContext";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, error, signup } = useSignUpWithEmailAndPassword();
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
				placeholder='Username'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
				focusBorderColor={theme.colors.primary}
				_placeholder={{ color: "gray.500" }}
			/>
			<Input
				placeholder='Full Name'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.fullName}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
				focusBorderColor={theme.colors.primary}
				_placeholder={{ color: "gray.500" }}
			/>
			<InputGroup>
				<Input
					placeholder='Password'
					fontSize={14}
					type={showPassword ? "text" : "password"}
					value={inputs.password}
					size={"sm"}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
					focusBorderColor={theme.colors.primary}
					_placeholder={{ color: "gray.500" }}
				/>
				<InputRightElement h='full'>
					<Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>

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
				onClick={() => signup(inputs)}
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
				Join Sociogram
			</RippleButton>
		</>
	);
};

export default Signup;
