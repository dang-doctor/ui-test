import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import TABS from '../constants/curveTabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions, StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from "react-native-vector-icons/FontAwesome";


type Props = {
	activeKey: string;
	onTabPress: (key: string) => void;
}

const { width } = Dimensions.get("window");
const tabHeight = 62;
const floatingBtnSize = 45;
const curveWidth = floatingBtnSize * 2.0;
const curveHeight = floatingBtnSize * 0.8;
const sidePadding = 24;

const CurvedTabBar = ({ activeKey, onTabPress } : any) => {
    const activeIdx = TABS.findIndex(tab => tab.key === activeKey);
    const tabCount = TABS.length;
    const tabAreaWidth = width - sidePadding * 2;
    const tabWidth = tabAreaWidth / tabCount;

    // 곡선 중심점 계산
    const curveCenterX = sidePadding + tabWidth * activeIdx + tabWidth / 2;
    const left = curveCenterX - curveWidth / 2;
    const right = curveCenterX + curveWidth / 2;

    // btn animation
    const FLOAT_HEIGHT = 30;
    const floatingAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        floatingAnim.setValue(0); // 초기화
        Animated.spring(floatingAnim, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true,
        }).start();
    }, [activeKey]);

    const translateY = floatingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [FLOAT_HEIGHT, 0],
    });

    // SVG Path
    const path = `
        M0 0
        H${left}
        C${left + curveWidth * 0.15} 0, ${curveCenterX - curveWidth * 0.27} ${curveHeight}, ${curveCenterX} ${curveHeight}
        C${curveCenterX + curveWidth * 0.27} ${curveHeight}, ${right - curveWidth * 0.15} 0, ${right} 0
        H${width}
        V${tabHeight}
        H0
        Z
    `;

    return (
        <View style={styles.root}>
            {/* 1. NavBar Background (곡선 SVG) */}
            <View style={styles.navBarBg}>
                <Svg width={width} height={tabHeight} style={{ position: "absolute", bottom: 0 }}>
                    <Path fill="#fff" d={path} />
                </Svg>
            </View>
            {/* 2. 버튼 컨테이너 */}
            <View style={[styles.btnContainer, { width: tabAreaWidth, left: sidePadding }]}>
                {TABS.map((tab, i) => {
                    const focused = tab.key === activeKey;
                    // 각 버튼의 중앙 x좌표
                    const x = tabWidth * i + tabWidth / 2 - floatingBtnSize / 2;
                    if (focused) {
                        // 플로팅 버튼 (곡선 파임 위)
                        return (
                            <Animated.View
                                key={tab.key}
                                style={[
                                    styles.floatingBtn,
                                    {
                                        left: x,
                                        bottom: tabHeight - curveHeight - floatingBtnSize / 2 + 30,
                                        transform: [{translateY}],
                                    }
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.fab}
                                    onPress={() => onTabPress(tab.key)}
                                    activeOpacity={0.85}
                                >
                                    <Ionicons name={tab.icon} size={32} color="#7C88FF" />
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    }
                    // 일반 버튼
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={[
                                styles.flatBtn,
                                {
                                    left: x,
                                    bottom: 10, // 네비 바 위쪽에 띄우기
                                }
                            ]}
                            onPress={() => onTabPress(tab.key)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name={tab.icon} size={26} color="#888" />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: tabHeight + 36,
        width: "100%",
        zIndex: 10,
        pointerEvents: "box-none",
    },
    navBarBg: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: tabHeight,
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 1,
        overflow: "visible",
        pointerEvents: "none",
    },
    btnContainer: {
        position: "absolute",
        left: sidePadding,
        bottom: 0,
        height: tabHeight + 32,
        flexDirection: "row",
        zIndex: 2,
        pointerEvents: "box-none",
    },
    floatingBtn: {
        position: "absolute",
        width: floatingBtnSize,
        height: floatingBtnSize,
        borderRadius: floatingBtnSize / 2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "transparent",
        elevation: 0,
        zIndex: 3,
        overflow: "visible",
    },
    fab: {
        width: floatingBtnSize,
        height: floatingBtnSize,
        borderRadius: floatingBtnSize / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    flatBtn: {
        position: "absolute",
        width: floatingBtnSize,
        height: floatingBtnSize,
        borderRadius: floatingBtnSize / 2,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        overflow: "visible",
    },
});

export default CurvedTabBar;