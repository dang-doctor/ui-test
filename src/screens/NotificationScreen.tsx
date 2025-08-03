import React from 'react';
import tabData from '../constants/tabs';
import { Text, View } from 'react-native';
import CommonStyles from './CommonStyles';

const NotificationScreen = ({route} : any) => {
	const bgColor = tabData.find(tab => tab.name === route.name)?.bgColor || '#fff';

	return (
		<View style={[CommonStyles.container, {backgroundColor: bgColor}]}>
			<Text style={CommonStyles.text}>알림 화면</Text>
		</View>
	);
};

export default NotificationScreen;