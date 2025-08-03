import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import CurvedTabBar from './src/navigations/CurvedTabBar';

const bgColors : Record<string, string> = {
	"camera": "#A5F3FC",
	"medkit": "#FDE68A",
	// "home": "#C4B5FD",
	"restaurant": "#BBF7D0",
	"chart": "#FBCFE8",
};

function App() {
	const [activeKey, setActiveKey] = useState("camera");

	console.log("App 렌더링!");

  	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: bgColors[activeKey] ?? "#fff" }}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 36, color: "#333" }}>{activeKey} 화면</Text>
			</View>
			<CurvedTabBar activeKey={activeKey} onTabPress={setActiveKey} />
		</SafeAreaView>
  	);
};



export default App;
