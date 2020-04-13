import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../Constants";

class DocumentsAddScreen extends Component<any> {
  state = {
    title: "",
    description: "",
  };

  handleName = (text: any, field: any) => {
    if (field == "title") {
      this.setState({
        title: text,
      });
    } else if (field == "description") {
      this.setState({
        description: text,
      });
    }
  };

  async postData() {
    const data = {
      title: this.state.title,
      description: this.state.description,
    };

    fetch(`${baseUrl}/api/documents/add`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
      }),
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView>
        <Text style={styles.title}>Add a Document</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={this.state.title}
          onChangeText={(text) => this.handleName(text, "title")}
        />

        <TextInput
          style={styles.descInput}
          placeholder="Description"
          multiline={true}
          value={this.state.description}
          onChangeText={(text) => this.handleName(text, "description")}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (this.state.title == "" && this.state.description == "") {
              console.log("you need to fill the text field");
            } else {
              this.postData();
              navigation.navigate("Documents");
            }
          }}
        >
          <Text> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            navigation.navigate("Documents");
          }}
        >
          <Text> Cancel </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default function (props: any) {
  const navigation = useNavigation();

  return <DocumentsAddScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },

  titleInput: {
    margin: 15,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
  },
  descInput: {
    margin: 15,
    height: 200,
    borderColor: "#000",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#03a1fc",
    padding: 10,
    margin: 15,
    height: 40,
  },
  cancelButton: {
    backgroundColor: "#fc033d",
    padding: 10,
    margin: 15,
    height: 40,
  },
});
