import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Inter: require("../assets/fonts/InterVariable.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(screens)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
				<Stack.Screen
					name="product"
					options={{
						presentation: "modal",
						headerShown: true,
						headerTitle: "Product Details",
					}}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
