import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-navigation/elements";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import type { SavedProduct } from "../../constants/Types";

export default function HomeScreen() {
	const theme = useTheme();
	const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadSavedProducts = useCallback(async () => {
		try {
			const existingProducts = await AsyncStorage.getItem("savedProducts");
			const products: SavedProduct[] = existingProducts
				? JSON.parse(existingProducts)
				: [];
			// Sort by saved date (most recent first)
			products.sort(
				(a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
			);
			setSavedProducts(products);
		} catch (error) {
			console.error("Error loading saved products:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	const onRefresh = async () => {
		setRefreshing(true);
		await loadSavedProducts();
		setRefreshing(false);
	};

	const handleProductPress = (product: SavedProduct) => {
		// Navigate to saved product detail with the barcode
		router.push(`/saved-product?barcode=${product.barcode}`);
	};

	// Load products when screen comes into focus
	useFocusEffect(
		useCallback(() => {
			loadSavedProducts();
		}, [loadSavedProducts]),
	);

	useEffect(() => {
		loadSavedProducts();
	}, [loadSavedProducts]);

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
				<Text>Loading your fridge...</Text>
			</View>
		);
	}

	if (savedProducts.length === 0) {
		return (
			<View
				style={{
					backgroundColor: theme.colors.background,
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8 }}>
					Your fridge is empty!
				</Text>
				<Text
					style={{
						textAlign: "center",
						color: theme.colors.text,
						opacity: 0.7,
					}}
				>
					Start scanning products to add them to your collection.
				</Text>
			</View>
		);
	}

	return (
		<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
			<FlatList
				data={savedProducts}
				keyExtractor={(item) => item.barcode}
				renderItem={({ item }) => (
					<ProductCard
						product={item}
						onPress={() => handleProductPress(item)}
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				contentContainerStyle={{ paddingVertical: 8 }}
			/>
		</View>
	);
}
