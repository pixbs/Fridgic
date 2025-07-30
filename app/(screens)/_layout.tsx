import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
	color: string;
}) {
	return (
		<MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
	);
}

function FocusedTabIcon(props: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
	color: string;
	focused: boolean;
}) {
	return (
		<View>
			<TabBarIcon name={props.name} color={props.color} />
			{props.focused && (
				<View
					style={{
						width: 80,
						height: 80,
						borderRadius: "100%",
						backgroundColor: "white",
						position: "absolute",
						zIndex: -1,
						top: -23,
						right: -26,
					}}
				/>
			)}
		</View>
	);
}

export default function PageLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "rgba(229, 232, 231, 0.90)",
					backdropFilter: Platform.OS === "web" ? "blur(10px)" : undefined,
					borderTopWidth: 0,
					elevation: 0,
					height: 84,
					paddingTop: Platform.OS === "android" ? 19 : 0,
					flexDirection: "row",
					marginBottom: 32,
					marginHorizontal: Platform.OS === "web" ? "auto" : 64,
					borderRadius: 40,
					position: "absolute",
					overflow: "hidden", // Needed for BlurView to work properly
				},
				headerStyle: {
					elevation: 0,
					borderBottomWidth: 1,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Fridge",
					tabBarIcon: ({ color, focused }) => (
						<FocusedTabIcon name="fridge" color={color} focused={focused} />
					),
				}}
			/>
			<Tabs.Screen
				name="scan"
				options={{
					title: "Scan",
					tabBarIcon: ({ color, focused }) => (
						<FocusedTabIcon
							name="barcode-scan"
							color={color}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<FocusedTabIcon name="account" color={color} focused={focused} />
					),
				}}
			/>
		</Tabs>
	);
}
