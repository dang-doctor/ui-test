import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import tabData from '../constants/tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: '#23272f',
				tabBarInactiveTintColor: '#888',
				tabBarStyle: {
				backgroundColor: '#f8f8f8',
				height: 60,
				},
				headerStyle: {
				backgroundColor: '#23272f',
				},
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
			}}
		>
			{
				tabData.map(tab => (
					<Tab.Screen
						key={tab.name}
						name={tab.name}
						component={
							tab.name === 'Home'
							? HomeScreen
							: tab.name === 'Search'
							? SearchScreen
							: tab.name === 'Notification'
							? NotificationScreen
							: ProfileScreen
						}
						options={{tabBarLabel: tab.label}}
					>

					</Tab.Screen>
				))
			}
		</Tab.Navigator>
	);
};

export default TabNavigator;