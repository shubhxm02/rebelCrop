import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
				{/* The rest of your application */}
			</ThemeProvider>
		</React.Fragment>
	);
}

export default MyApp;
