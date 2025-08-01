import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, View } from "react-native";
import type { Product, SavedProduct } from "../constants/Types";

export default function ProductModal() {
	const { barcode } = useLocalSearchParams<{ barcode: string }>();
	const theme = useTheme();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);

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

	const saveProduct = async () => {
		if (!product || !product.product) return;

		try {
			setSaving(true);

			// Create the product data with timestamp
			const productToSave: SavedProduct = {
				...product.product,
				barcode: barcode,
				savedAt: new Date().toISOString(),
				savedDate: new Date().toLocaleDateString(),
				savedTime: new Date().toLocaleTimeString(),
			};

			// Get existing saved products
			const existingProducts = await AsyncStorage.getItem("savedProducts");
			const savedProducts: SavedProduct[] = existingProducts
				? JSON.parse(existingProducts)
				: [];

			// Check if product already exists (by barcode)
			const existingIndex = savedProducts.findIndex(
				(p: SavedProduct) => p.barcode === barcode,
			);

			if (existingIndex !== -1) {
				// Update existing product
				savedProducts[existingIndex] = productToSave;
			} else {
				// Add new product
				savedProducts.push(productToSave);
			}

			// Save back to AsyncStorage
			await AsyncStorage.setItem(
				"savedProducts",
				JSON.stringify(savedProducts),
			);

			console.log("Product saved to AsyncStorage:", productToSave);

			// Navigate directly to the fridge screen
			router.push("/(screens)");
		} catch (error) {
			console.error("Error saving product:", error);
			Alert.alert(
				"Save Failed",
				"Failed to save the product. Please try again.",
				[{ text: "OK" }],
			);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Stack.Screen
					options={{
						title: "Product Scanner",
						presentation: "modal",
					}}
				/>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Stack.Screen
					options={{
						title: "Product Scanner",
						presentation: "modal",
					}}
				/>
				<Text>{`Error: ${error}`}</Text>
			</View>
		);
	}

	if (!product || product.status === 0) {
		return (
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Stack.Screen
					options={{
						title: "Product Scanner",
						presentation: "modal",
					}}
				/>
				<Text>{`Product not found for barcode: ${barcode}`}</Text>
			</View>
		);
	}

	const productData = product.product;

	return (
		<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
			<Stack.Screen
				options={{
					title: "Add Product",
					presentation: "modal",
				}}
			/>
			<ScrollView style={{ padding: 16 }}>
				<Text
					style={{
						fontSize: 12,
						color: theme.colors.text,
						opacity: 0.7,
						marginBottom: 16,
					}}
				>
					Barcode: {barcode}
				</Text>

				{productData?.image_url && (
					<View style={{ alignItems: "center", marginBottom: 20 }}>
						<Image
							source={{ uri: productData.image_url }}
							style={{
								width: 200,
								height: 200,
								borderRadius: 8,
							}}
							resizeMode="contain"
						/>
					</View>
				)}

				{productData?.product_name && (
					<View style={{ marginBottom: 16 }}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								color: theme.colors.text,
								marginBottom: 4,
							}}
						>
							{productData.product_name}
						</Text>
					</View>
				)}

				{productData?.brands && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Brands
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.brands}
						</Text>
					</View>
				)}

				{productData?.quantity && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Quantity
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.quantity}
						</Text>
					</View>
				)}

				{productData?.categories && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Categories
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.categories}
						</Text>
					</View>
				)}

				{productData?.packaging && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Packaging
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.packaging}
						</Text>
					</View>
				)}

				{productData?.stores && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Stores
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.stores}
						</Text>
					</View>
				)}

				{productData?.countries && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Countries
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.countries}
						</Text>
					</View>
				)}

				{productData?.nutriscore_grade && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Nutri-Score
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.nutriscore_grade.toUpperCase()}
						</Text>
					</View>
				)}

				{productData?.labels && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Labels
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.labels}
						</Text>
					</View>
				)}

				{productData?.allergens && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Allergens
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
							}}
						>
							{productData.allergens}
						</Text>
					</View>
				)}

				{productData?.ingredients_text && (
					<View style={{ marginBottom: 12 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							Ingredients
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								opacity: 0.8,
								lineHeight: 20,
							}}
						>
							{productData.ingredients_text}
						</Text>
					</View>
				)}

				{productData?.nutriments && (
					<View style={{ marginBottom: 20 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "600",
								color: theme.colors.text,
								marginBottom: 8,
							}}
						>
							Nutrition (per 100g)
						</Text>
						{productData.nutriments.energy_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Energy: {productData.nutriments.energy_100g} kJ
							</Text>
						)}
						{productData.nutriments.fat_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Fat: {productData.nutriments.fat_100g}g
							</Text>
						)}
						{productData.nutriments.carbohydrates_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Carbohydrates: {productData.nutriments.carbohydrates_100g}g
							</Text>
						)}
						{productData.nutriments.sugars_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Sugars: {productData.nutriments.sugars_100g}g
							</Text>
						)}
						{productData.nutriments.proteins_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Proteins: {productData.nutriments.proteins_100g}g
							</Text>
						)}
						{productData.nutriments.salt_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Salt: {productData.nutriments.salt_100g}g
							</Text>
						)}
					</View>
				)}

				<View style={{ marginTop: 20, marginBottom: 20 }}>
					<Button
						title={saving ? "Saving..." : "Add to Fridge"}
						onPress={saveProduct}
						disabled={saving}
					/>
				</View>
			</ScrollView>
		</View>
	);
}
