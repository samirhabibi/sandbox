import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ImageDetails } from './ImageDetails';
import { ImagesScreen } from './ImagesScreen';

// Images have multiple screens - create a stack
const ImageStack = createStackNavigator();
export function ImageStackScreen() {
    return (
        <ImageStack.Navigator>
            <ImageStack.Screen name="Images" component={ImagesScreen} />
            <ImageStack.Screen name="ImageDetails" component={ImageDetails} />
        </ImageStack.Navigator>
    );
}