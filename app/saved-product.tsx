import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import type { SavedProduct } from "../constants/Types";

export default function SavedProductModal() {
	const { barcode } = useLocalSearchParams<{ barcode: string }>();
	const theme = useTheme();
	const [product, setProduct] = useState<SavedProduct | null>(null);
	const [loading, setLoading] = useState(true);
	const [removing, setRemoving] = useState(false);

	const loadSavedProduct = useCallback(async () => {
		try {
			setLoading(true);
			const existingProducts = await AsyncStorage.getItem("savedProducts");
			const savedProducts: SavedProduct[] = existingProducts
				? JSON.parse(existingProducts)
				: [];

			const foundProduct = savedProducts.find((p) => p.barcode === barcode);
			setProduct(foundProduct || null);
		} catch (error) {
			console.error("Error loading saved product:", error);
		} finally {
			setLoading(false);
		}
	}, [barcode]);

	const removeProduct = async () => {
		if (!product) return;

		Alert.alert(
			"Remove Product",
			"Are you sure you want to remove this product from your fridge?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Remove",
					style: "destructive",
					onPress: async () => {
						try {
							setRemoving(true);
							const existingProducts =
								await AsyncStorage.getItem("savedProducts");
							const savedProducts: SavedProduct[] = existingProducts
								? JSON.parse(existingProducts)
								: [];

							const updatedProducts = savedProducts.filter(
								(p) => p.barcode !== barcode,
							);

							await AsyncStorage.setItem(
								"savedProducts",
								JSON.stringify(updatedProducts),
							);

							// Navigate back to fridge screen
							router.back();
						} catch (error) {
							console.error("Error removing product:", error);
							Alert.alert(
								"Remove Failed",
								"Failed to remove the product. Please try again.",
								[{ text: "OK" }],
							);
						} finally {
							setRemoving(false);
						}
					},
				},
			],
		);
	};

	useEffect(() => {
		loadSavedProduct();
	}, [loadSavedProduct]);

	if (loading) {
		return (
			<View
				style={{
					backgroundColor: theme.colors.background,
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Stack.Screen
					options={{
						title: "Product Details",
						presentation: "modal",
					}}
				/>
				<Text>Loading product...</Text>
			</View>
		);
	}

	if (!product) {
		return (
			<View
				style={{
					backgroundColor: theme.colors.background,
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Stack.Screen
					options={{
						title: "Product Not Found",
						presentation: "modal",
					}}
				/>
				<Text>Product not found in your fridge.</Text>
			</View>
		);
	}

	return (
		<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
			<Stack.Screen
				options={{
					title: "Product Details",
					presentation: "modal",
					headerRight: () => (
						<Pressable
							onPress={removeProduct}
							disabled={removing}
							style={{
								paddingHorizontal: 16,
								paddingVertical: 8,
							}}
						>
							<Text
								style={{
									color: removing ? theme.colors.text + "80" : "#FF3B30",
									fontWeight: "600",
								}}
							>
								{removing ? "Removing..." : "Remove"}
							</Text>
						</Pressable>
					),
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
					Barcode: {product.barcode}
				</Text>

				{product.image_url && (
					<View style={{ alignItems: "center", marginBottom: 20 }}>
						<Image
							source={{ uri: product.image_url }}
							style={{
								width: 200,
								height: 200,
								borderRadius: 8,
							}}
							resizeMode="contain"
						/>
					</View>
				)}

				{product.product_name && (
					<View style={{ marginBottom: 16 }}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								color: theme.colors.text,
								marginBottom: 4,
							}}
						>
							{product.product_name}
						</Text>
					</View>
				)}

				{product.brands && (
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
							{product.brands}
						</Text>
					</View>
				)}

				{product.quantity && (
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
							{product.quantity}
						</Text>
					</View>
				)}

				{product.categories && (
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
							{product.categories}
						</Text>
					</View>
				)}

				{product.packaging && (
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
							{product.packaging}
						</Text>
					</View>
				)}

				{product.stores && (
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
							{product.stores}
						</Text>
					</View>
				)}

				{product.countries && (
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
							{product.countries}
						</Text>
					</View>
				)}

				{product.nutriscore_grade && (
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
							{product.nutriscore_grade.toUpperCase()}
						</Text>
					</View>
				)}

				{product.labels && (
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
							{product.labels}
						</Text>
					</View>
				)}

				{product.allergens && (
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
							{product.allergens}
						</Text>
					</View>
				)}

				{product.ingredients_text && (
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
							{product.ingredients_text}
						</Text>
					</View>
				)}

				{product.nutriments && (
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
						{product.nutriments.energy_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Energy: {product.nutriments.energy_100g} kJ
							</Text>
						)}
						{product.nutriments.fat_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Fat: {product.nutriments.fat_100g}g
							</Text>
						)}
						{product.nutriments.carbohydrates_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Carbohydrates: {product.nutriments.carbohydrates_100g}g
							</Text>
						)}
						{product.nutriments.sugars_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Sugars: {product.nutriments.sugars_100g}g
							</Text>
						)}
						{product.nutriments.proteins_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Proteins: {product.nutriments.proteins_100g}g
							</Text>
						)}
						{product.nutriments.salt_100g && (
							<Text
								style={{
									fontSize: 14,
									color: theme.colors.text,
									opacity: 0.8,
									marginBottom: 2,
								}}
							>
								Salt: {product.nutriments.salt_100g}g
							</Text>
						)}
					</View>
				)}

				<View style={{ marginBottom: 20 }}>
					<Text
						style={{
							fontSize: 12,
							color: theme.colors.text,
							opacity: 0.5,
							textAlign: "center",
						}}
					>
						Saved on {product.savedDate} at {product.savedTime}
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}
