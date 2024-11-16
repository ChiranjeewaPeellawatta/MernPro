import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

// Fallback for invalid routes
const NotFoundPage = () => (
	<Center h="100vh">
		<Box textAlign="center">
			<h1>Page Not Found</h1>
		</Box>
	</Center>
);

function App() {
	return (
		<BrowserRouter>
			<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/create' element={<CreatePage />} />
					{/* Fallback route for invalid paths */}
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
