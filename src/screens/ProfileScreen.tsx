import React from 'react';
import tabData from '../constants/tabs';
import CommonStyles from './CommonStyles';
import { Text, View } from 'react-native';

const ProfileScreen = ({route} : any) => {
	const bgColor = tabData.find(tab => tab.name === route.name)?.bgColor || '#fff';

	return (
		<View style={[CommonStyles.container, {backgroundColor: bgColor}]}>
			<Text style={CommonStyles.text}>프로필 화면</Text>
		</View>
	);
};

export default ProfileScreen;