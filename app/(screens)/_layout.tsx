import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
	color: string;
}) {
	return <MaterialCommunityIcons size={28} {...props} />;
}

export default function PageLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Fridge",
					tabBarIcon: ({ color }) => <TabBarIcon name="fridge" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="scan"
				options={{
					title: "Scan",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="barcode-scan" color={color} />
					),
				}}
			/>
			{/* <Tabs.Screen
				name="settings"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="account" color={color} />
					),
				}}
			/> */}
		</Tabs>
	);
}
