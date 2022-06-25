import Head from "next/head";
import React from "react";
import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

export default function Home() {
	return (
		<React.Fragment>
			<Head>
				<title>RebelCrop</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box
				sx={{
					background: `url(${"/images/background.jpg"})`,
					backgroundColor: "secondary.main",
					backgroundBlendMode: "multiply",
					backgroundSize: "cover",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: "100%",
					minHeight: "100vh",
				}}
			>
				<Navbar />
				<Upload />
				<Box />
			</Box>
		</React.Fragment>
	);
}