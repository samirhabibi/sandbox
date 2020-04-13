import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ListRenderItemInfo, Image, FlatList, Button } from "react-native";
import { baseUrl, Blue } from '../Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export interface ImageEntry {
    id: number;
    title: string;
    description: string;
    source: string;
}

const Item = ({ item, onPress }: { item: ImageEntry, onPress: () => void }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Image source={{ uri: `${baseUrl}/${item.source}` }} style={styles.img} />
    </TouchableOpacity>
);

async function fetchImages() {
    const res = await fetch(`${baseUrl}/api/images/`)
    const result = await res.json();
    return result.images;
}

export function ImagesScreen() {
    const navigation = useNavigation();
    const [ images, setImages ] = useState<ImageEntry[]>([]);
    const [ error, setError ] = useState<string | undefined>(undefined);

    function fetchAndSetState() {
        // Reset state
        setImages([])
        setError(undefined);

        setTimeout(() => {
            fetchImages().then(imgs => {
                setImages(imgs);
            }).catch(e => {
                setError(e.toString());
            });
        }, 200);
    }

    // Load images when screen loads
    useEffect(() => {
        fetchAndSetState();
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.buttonWrapper}>
                <Button
                    title="Reload images"
                    color={Blue}
                    onPress={() => {
                        setTimeout(() => {
                            fetchAndSetState();
                        }, 200); // Small delay
                    }}
                />
            </View>
            {error && (
                <Text>Error: {error}</Text>
            )}
            <FlatList
                data={images}
                renderItem={({ item }) => <Item item={item} onPress={() => navigation.navigate("ImageDetails", { item })} />}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
    },
    item: {
        alignItems: "center",
        backgroundColor: "#ddd",
        borderRadius: 2,
        paddingTop: 10,
        paddingBottom: 20,
        marginVertical: 8,
    },
    itemTitle: {
        fontSize: 24
    },
    img: {
        width: 220,
        height: 124,
        borderColor: "#bbb",
        borderWidth: 1,
        borderRadius: 2,
    },
});
