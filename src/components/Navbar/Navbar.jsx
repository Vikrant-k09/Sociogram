import { Button, Container, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SociogramLogo } from "../../assets/constants";

const Navbar = () => {
	return (
		<Container maxW={"container.lg"} my={4}>
			<Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
				<Box display={{ base: "none", sm: "block" }} cursor={"pointer"}>
					<SociogramLogo />
				</Box>
				<Flex gap={4}>
					<Link to='/auth'>
						<Button colorScheme={"blue"} size={"sm"}>
							Login
						</Button>
					</Link>
					<Link to='/auth'>
						<Button variant={"outline"} size={"sm"}>
							Signup
						</Button>
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;
