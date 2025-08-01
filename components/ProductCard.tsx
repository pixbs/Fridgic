import { Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { Image, Pressable, View } from "react-native";
import type { SavedProduct } from "../constants/Types";

interface ProductCardProps {
	product: SavedProduct;
	onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
	const theme = useTheme();

	return (
		<Pressable
			onPress={onPress}
			style={{
				backgroundColor: theme.colors.card,
				borderRadius: 8,
				padding: 16,
				marginVertical: 8,
				marginHorizontal: 16,
				elevation: 2,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.22,
				shadowRadius: 2.22,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "flex-start" }}>
				{product.image_url && (
					<Image
						source={{ uri: product.image_url }}
						style={{
							width: 80,
							height: 80,
							borderRadius: 8,
							marginRight: 12,
						}}
						resizeMode="contain"
					/>
				)}

				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
						{product.product_name || "Unknown Product"}
					</Text>

					{product.brands && (
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							{product.brands}
						</Text>
					)}

					{product.quantity && (
						<Text
							style={{
								fontSize: 14,
								color: theme.colors.text,
								marginBottom: 2,
							}}
						>
							{product.quantity}
						</Text>
					)}

					{product.nutriscore_grade && (
						<Text
							style={{
								fontSize: 12,
								color: theme.colors.text,
								marginBottom: 4,
							}}
						>
							Nutri-Score: {product.nutriscore_grade.toUpperCase()}
						</Text>
					)}

					<Text
						style={{ fontSize: 12, color: theme.colors.text, opacity: 0.7 }}
					>
						Saved: {product.savedDate} at {product.savedTime}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}
