import { Button, ChakraProvider } from "@chakra-ui/react";
import { SignOut } from "@phosphor-icons/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
	return (
		<>
			<ChakraProvider>
				<Link to={"/"}>
					<Button colorScheme="orange" margin={2}>
						<SignOut weight="bold" size={20} />
					</Button>
				</Link>
				<Link to={"/admin"}>
					<Button colorScheme="blue" margin={2}>
						Товари
					</Button>
				</Link>
				<Link to={"/admin/orders"}>
					<Button colorScheme="blue" margin={2}>
						Замовлення
					</Button>
				</Link>
				<Outlet />
			</ChakraProvider>
		</>
	);
}

export default AdminLayout;
