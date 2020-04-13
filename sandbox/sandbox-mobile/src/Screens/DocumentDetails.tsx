import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { ScreenParamList } from "../App";
import { baseUrl } from "../Constants";

export function DocumentDetails() {
  const route = useRoute<RouteProp<ScreenParamList, "DocumentDetails">>();
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.text}>{item.description}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    color: "grey",
    lineHeight: 20,
  },
});
