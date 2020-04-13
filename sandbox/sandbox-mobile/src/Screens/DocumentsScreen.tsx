import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { baseUrl } from "../Constants";
import { useNavigation } from "@react-navigation/native";

export interface DocumentEntry {
  id: number;
  title: string;
  description: string;
}

const Item = ({
  item,
  onPress,
}: {
  item: DocumentEntry;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{item.title}</Text>
    <Text numberOfLines={2}>{item.description}</Text>
  </TouchableOpacity>
);

async function fetchDocuments() {
  const res = await fetch(`${baseUrl}/api/documents`);
  const result = await res.json();
  return result.documents;
}

export default function DocumentsScreen() {
  const navigation = useNavigation();
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAndSetState();

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  function wait(timeout: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  function fetchAndSetState() {
    // Reset state
    setDocuments([]);
    setError(undefined);

    setTimeout(() => {
      fetchDocuments()
        .then((docs) => {
          setDocuments(docs);
        })
        .catch((e) => {
          setError(e.toString());
        });
    }, 200);
  }
  useEffect(() => {
    fetchAndSetState();
  }, []);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.buttonWrapper}>
        <Button
          title="Add Document"
          onPress={() => navigation.navigate("DokumentsAdd")}
        />
      </View>
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() =>
              navigation.navigate("DocumentDetails", {
                item,
              })
            }
          ></Item>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  item: {
    backgroundColor: "#ddd",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  link: {
    padding: 20,
    color: "blue",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
});
