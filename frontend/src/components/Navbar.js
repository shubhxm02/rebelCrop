import Image from "next/image";
import { AppBar, Container, Box } from "@mui/material";

export default function Navbar() {
	return (
		<AppBar position="relative" color="primary">
			<Container maxWidth="lg">
				<Box py={2} sx={{ display: "block", maxWidth: "300px", flexDirection: "row" }}>
					<Image src={"/images/logo.png"} width={750} height={150} alt="logo" layout="responsive" />
				</Box>
			</Container>
		</AppBar>
	);
}
