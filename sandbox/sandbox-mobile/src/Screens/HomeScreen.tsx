import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Blue } from '../Constants';

export function HomeScreen() {
    // Keep reference to animation object
    const rotationAnimation = useRef(new Animated.Value(0)).current;

    // Create animation in useEffect() to prevent leaked animation instances
    React.useEffect(() => {
        Animated.loop(
            Animated.timing(rotationAnimation, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
            })
        ).start();
    }, []);

    const rotateData = rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.screen}>
            <Text style={styles.textTitle}>
                <Text>Welcome to </Text>
                <Text style={styles.textBlue}>Visikon</Text>
                <Text> Sandbox</Text>
            </Text>

            <View style={styles.centerContainer}>
                <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
                    <Ionicons name='ios-infinite' size={120} color={Blue} />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 20,
    },
    textBlue: {
        color: Blue,
    },
});
