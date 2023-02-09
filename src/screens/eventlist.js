import React from "react";
import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { Eventfinderstyle } from "../utils/Eventfinderstyle";
import { eventlistStyle } from "../utils/eventlistStyle";

export const EventlistScreen = () => {
  return (
    <SafeAreaView style={eventlistStyle.content}>
      <Text style={eventlistStyle.details}>
        All events and details based on filter will display here, Under
        Construction
      </Text>
    </SafeAreaView>
  );
};

export default EventlistScreen;
