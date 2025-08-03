import React from 'react';
import { Text, View } from 'react-native';
import tabData from '../constants/tabs';
import CommonStyles from './CommonStyles';

const SearchScreen = ({route} : any) => {
	const bgColor = tabData.find(tab => tab.name === route.name)?.bgColor || '#fff';

	return (
		<View style={[CommonStyles.container, {backgroundColor: bgColor}]}>
			<Text style={CommonStyles.text}>검색 화면</Text>
		</View>
	)
};

export default SearchScreen;