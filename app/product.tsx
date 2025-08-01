import { Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

interface Product {
	code: string;
	product?: {
		product_name?: string;
		brands?: string;
		categories?: string;
		ingredients_text?: string;
		nutrition_grades?: string;
		nutriscore_grade?: string;
		image_url?: string;
		quantity?: string;
		packaging?: string;
		stores?: string;
		countries?: string;
		allergens?: string;
		labels?: string;
		nutriments?: {
			energy_100g?: number;
			fat_100g?: number;
			carbohydrates_100g?: number;
			proteins_100g?: number;
			salt_100g?: number;
			sugars_100g?: number;
		};
	};
	status: number;
	status_verbose: string;
}

export default function ProductModal() {
	const { barcode } = useLocalSearchParams<{ barcode: string }>();
	const theme = useTheme();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async (code: string) => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(
					`https://world.openfoodfacts.org/api/v0/product/${code}.json`,
				);
				const data: Product = await response.json();
				setProduct(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch product",
				);
			} finally {
				setLoading(false);
			}
		};

		if (barcode) {
			fetchProduct(barcode);
		}
	}, [barcode]);

	if (loading) {
		return (
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Text>Error: {error}</Text>
			</View>
		);
	}

	if (!product || product.status === 0) {
		return (
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Text>Product not found for barcode: {barcode}</Text>
			</View>
		);
	}

	const productData = product.product;

	return (
		<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
			<ScrollView>
				<Text>Barcode: {barcode}</Text>

				{productData?.product_name && (
					<Text>Product Name: {productData.product_name}</Text>
				)}

				{productData?.brands && <Text>Brands: {productData.brands}</Text>}

				{productData?.quantity && <Text>Quantity: {productData.quantity}</Text>}

				{productData?.categories && (
					<Text>Categories: {productData.categories}</Text>
				)}

				{productData?.packaging && (
					<Text>Packaging: {productData.packaging}</Text>
				)}

				{productData?.stores && <Text>Stores: {productData.stores}</Text>}

				{productData?.countries && (
					<Text>Countries: {productData.countries}</Text>
				)}

				{productData?.nutriscore_grade && (
					<Text>Nutri-Score: {productData.nutriscore_grade.toUpperCase()}</Text>
				)}

				{productData?.labels && <Text>Labels: {productData.labels}</Text>}

				{productData?.allergens && (
					<Text>Allergens: {productData.allergens}</Text>
				)}

				{productData?.ingredients_text && (
					<Text>Ingredients: {productData.ingredients_text}</Text>
				)}

				{productData?.nutriments && (
					<View>
						<Text>Nutrition (per 100g):</Text>
						{productData.nutriments.energy_100g && (
							<Text>Energy: {productData.nutriments.energy_100g} kJ</Text>
						)}
						{productData.nutriments.fat_100g && (
							<Text>Fat: {productData.nutriments.fat_100g}g</Text>
						)}
						{productData.nutriments.carbohydrates_100g && (
							<Text>
								Carbohydrates: {productData.nutriments.carbohydrates_100g}g
							</Text>
						)}
						{productData.nutriments.sugars_100g && (
							<Text>Sugars: {productData.nutriments.sugars_100g}g</Text>
						)}
						{productData.nutriments.proteins_100g && (
							<Text>Proteins: {productData.nutriments.proteins_100g}g</Text>
						)}
						{productData.nutriments.salt_100g && (
							<Text>Salt: {productData.nutriments.salt_100g}g</Text>
						)}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
