import React from "react";

import { Text, View, SafeAreaView, Image } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { BookmarksStyle } from "../utils/BookmarksStyle";

export const BookmarksScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={BookmarksStyle.content}>
      <View>
        <Card>
          <Card.Content>
            <Image
              source={
                require("../assets/eventhub_logo.png")
              }
              style={{
                width: 300,
                height: 150,
                alignSelf: "center",
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
          </Card.Content>
        </Card>
        
      </View>
    </SafeAreaView>
  );
};

export default BookmarksScreen;
