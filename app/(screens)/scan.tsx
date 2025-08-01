import { useIsFocused } from "@react-navigation/native";
import {
	type BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { Alert, View } from "react-native";

export default function Scan() {
	const [permissions, requestPermission] = useCameraPermissions();
	const isFocused = useIsFocused();

	const handleBarcodeScanned = (result: BarcodeScanningResult) => {
		router.push({
			pathname: "/product",
			params: { barcode: result.data },
		});
	};

	if (!permissions?.granted) {
		Alert.alert(
			"Camera Permission Required",
			"We need your permission to show the camera.",
			[
				{
					text: "Grant Permission",
					onPress: requestPermission,
				},
			]
		);
		return null;
	}

	// Only render camera when screen is focused
	if (!isFocused) {
		return <View />;
	}

	return (
		<CameraView
			style={{ flex: 1 }}
			facing="back"
			barcodeScannerSettings={{
				barcodeTypes: [
					"ean13", // European Article Number, standard in Europe
					"ean8", // Shorter EAN format for smaller packages
					"upc_a", // Universal Product Code, standard in US/Canada
					"upc_e", // Condensed UPC format for smaller packages
					"code128", // Used for logistics and additional product data
				],
			}}
			onBarcodeScanned={handleBarcodeScanned}
		></CameraView>
	);
}
