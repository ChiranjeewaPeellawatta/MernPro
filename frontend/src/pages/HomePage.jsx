import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetchProducts();
			} catch (err) {
				setError("Failed to load products");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [fetchProducts]);

	// Handle loading and error states
	if (loading) {
		return (
			<Container maxW="container.xl" py={12}>
				<VStack spacing={8} justify="center">
					<Spinner size="xl" />
					<Text>Loading products...</Text>
				</VStack>
			</Container>
		);
	}

	if (error) {
		return (
			<Container maxW="container.xl" py={12}>
				<VStack spacing={8} justify="center">
					<Text color="red.500" fontSize="lg" fontWeight="bold">
						{error}
					</Text>
				</VStack>
			</Container>
		);
	}

	return (
		<Container maxW="container.xl" py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;
