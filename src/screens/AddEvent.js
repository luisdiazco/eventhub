import React, { Component, useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Linking,
  ViewStyle,
  TextStyle,
  TextInputProps,
  state,
} from "react-native";

import { Button, Card } from "react-native-paper";
import { addEventStyle } from "./addEvent.style";
import email from "react-native-email";

export const AddEventScreen = ({ navigation }) => {
  const [events, updateEvents] = useState({
    eventName: "",
    eventDay: "",
    eventMonth: "",
    eventYear: "",
    eventOrganizerName: "",
    eventOrganizerEmail: "",
  });

  const [eventName, updateEventName] = useState("");
  const [eventDay, updateEventDay] = useState("");
  const [eventMonth, updateEventMonth] = useState("");
  const [eventYear, updateEventYear] = useState("");
  const [eventOrganizerName, updateEventOrganizerName] = useState("");
  const [eventOrganizerEmail, updateEventOrganizerEmail] = useState("");

  const handleEmail = () => {

    // ----------------------------
    // event name input checking
    if (!eventName.trim()) 
    {
      alert('Please Enter an Event Name');
      return;
    }

    if (/[^a-zA-Z\s]/.test(eventName) ) 
    {
      alert("No symbols allowed in Event Name")
      return;
    }

    // ----------------------------
    // event day checking
    if (!eventDay.trim()) 
    {
      alert('Please Enter a Day');
      return;
    }
    if(eventDay < 0 || eventDay > 31)
    {
      alert('Please Enter a valid Day');
      return;
    }
    

    // ----------------------------
    // event month checking
    if (!eventMonth.trim()) 
    {
      alert('Please Enter a Month');
      return;
    }
    if(eventMonth < 1 || eventMonth > 12)
    {
      alert("Please Enter a valid Month")
      return;
    }

    // ----------------------------
    // event year checking 
    if (!eventYear.trim()) {
      alert('Please Enter a Year');
      return;
    }


    // ----------------------------
    // event organizer name checking
    if (!eventOrganizerName.trim()) {
      alert('Please Enter Organizers Name');
      return;
    }
    if (/[^a-zA-Z\s]/.test(eventOrganizerName) ) 
    {
      alert("No symbols allowed in Event Organizer Name")
      return;
    }

    // ----------------------------
    // event organizer email checking
    if (!eventOrganizerEmail.trim()) {
      alert('Please Enter Organizers Email');
      return;
    }



    const to = ["gps.addevent@gmail.com"];
    email(to, {
      subject: "[New Event Request]",
      body:
        "Event Name: " +
        JSON.stringify(eventName).slice(1, -1) +
        "\n\n" +
        "Event Date: " +
        JSON.stringify(eventDay).slice(1, -1) +
        "/" +
        JSON.stringify(eventMonth).slice(1, -1) +
        "/" +
        JSON.stringify(eventYear).slice(1, -1) +
        "\n\n" +
        "Organizer Name: " +
        JSON.stringify(eventOrganizerName).slice(1, -1) +
        "\n\n" +
        "Organizer Email: " +
        JSON.stringify(eventOrganizerEmail).slice(1, -1),

      checkCanOpen: false,
    }).catch(console.error);
  };

  return (
    <SafeAreaView style={addEventStyle.content}>
      <View style={addEventStyle.view}>
        <Card>
          <Card.Title
            title="Add Event"
            titleStyle={addEventStyle.cardTitle}
          ></Card.Title>
          <Card.Content>
            {/* input for event Name */}
            <TextInput
              placeholder="Event Name"
              keyboardType="default"
              onChangeText={(newText) => updateEventName(newText)}
              defaultValue={eventName}
            />

            {/* input for event day */}
            <TextInput
              placeholder="Event Day"
              keyboardType="numeric"
              onChangeText={(newText) => updateEventDay(newText)}
              defaultValue={eventDay}
            />

            <TextInput
              placeholder="Event Month"
              keyboardType="numeric"
              onChangeText={(newText) => updateEventMonth(newText)}
              defaultValue={eventMonth}
              maxLength={2}
            />

            <TextInput
              placeholder="Event Year"
              keyboardType="numeric"
              onChangeText={(newText) => updateEventYear(newText)}
              defaultValue={eventYear}
              maxLength={4}
            />

            <TextInput
              placeholder="Event Organizer Name"
              keyboardType="default"
              onChangeText={(newText) => updateEventOrganizerName(newText)}
              defaultValue={eventOrganizerName}
            />

            <TextInput
              placeholder="Event Organizer Email"
              keyboardType="email"
              onChangeText={(newText) => updateEventOrganizerEmail(newText)}
              defaultValue={eventOrganizerEmail}
            />

            {/* output text in json format. */}
            {/* <Text>{formData}</Text> */}

            <Button onPress={handleEmail}>Send Email</Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default AddEventScreen;
