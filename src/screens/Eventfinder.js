import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
//import { View, Text } from 'react-native'
import { Button, Card, TextInput } from "react-native-paper";
import { Eventfinderstyle } from "../utils/Eventfinderstyle";
import DatePicker from "react-native-neat-date-picker";
import { Formik } from "formik";
import { eventlistForm } from "../utils/eventlist.form";

export const EventfinderScreen = ({ navigation }) => {
  const search = () => navigation.navigate("Search");
  const toMap = () => navigation.navigate("Map");

  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [showDatePickerRange, setShowDatePickerRange] = useState(false);

  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const openDatePickerSingle = () => setShowDatePickerSingle(true);
  const openDatePickerRange = () => setShowDatePickerRange(true);

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false);
  };

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false);

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    //   console.log(output)
    setDate(output.dateString);
  };

  const onCancelRange = () => {
    setShowDatePickerRange(false);
  };

  const onConfirmRange = (output) => {
    setShowDatePickerRange(false);
    setStartDate(output.startDateString);
    setEndDate(output.endDateString);
  };

  return (
    <SafeAreaView style={Eventfinderstyle.content}>
      <View style={Eventfinderstyle.view}>
        <Card>
          <Card.Content>
            <Formik
              initialValues={{
                distance: 0,
                keyword: "",
                minPrice: 0,
                maxPrice: 0,
              }}
              onSubmit={toMap}
              validationSchema={eventlistForm}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                values,
              }) => (
                <>
                  <Button mode="elevated" onPress={openDatePickerRange}>
                    <Text style={Eventfinderstyle.displayTxt}>
                      ENTER A DATE
                    </Text>
                  </Button>
                  <DatePicker
                    isVisible={showDatePickerRange}
                    mode={"range"}
                    onCancel={onCancelRange}
                    onConfirm={onConfirmRange}
                  />
                  <Text
                    style={{ fontSize: 18, color: "blue", textAlign: "center" }}
                  >
                    {startDate && `${startDate}   ~   ${endDate}`}
                  </Text>

                  <TextInput
                    label="Distance in miles"
                    onChangeText={handleChange("distance")}
                    onFocus={() => setFieldTouched("distance")}
                    testID="distance"
                  ></TextInput>
                  {touched.distance && errors.distance ? (
                    <Text testID="error-distance" style={{ color: "black" }}>
                      {errors.distance}
                    </Text>
                  ) : null}
                  <TextInput
                    label="Event keyword"
                    onChangeText={handleChange("keyword")}
                    onFocus={() => setFieldTouched("keyword")}
                    testID="keyword"
                  ></TextInput>
                  {touched.keyword && errors.keyword ? (
                    <Text testID="error-keyword" style={{ color: "black" }}>
                      {errors.keyword}
                    </Text>
                  ) : null}
                  <TextInput
                    label="Minimum price in USD"
                    onChangeText={handleChange("minPrice")}
                    onFocus={() => setFieldTouched("minPrice")}
                    testID="keyword"
                  ></TextInput>
                  {touched.minPrice && errors.minPrice ? (
                    <Text testID="error-minPrice" style={{ color: "black" }}>
                      {errors.minPrice}
                    </Text>
                  ) : null}
                  <TextInput
                    label="Maximum price in USD"
                    onChangeText={handleChange("maxPrice")}
                    onFocus={() => setFieldTouched("maxPrice")}
                    testID="keyword"
                  ></TextInput>
                  {touched.maxPrice && errors.maxPrice ? (
                    <Text testID="error-maxPrice" style={{ color: "black" }}>
                      {errors.maxPrice}
                    </Text>
                  ) : null}

                  <Text></Text>
                  <Text></Text>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    testID="submitButton"
                    disabled={
                      values.distance == 0 ||
                      errors.distance ||
                      errors.keyword ||
                      errors.minPrice ||
                      errors.maxPrice ||
                      values.minPrice > values.maxPrice
                        ? true
                        : false
                    }
                  >
                    Submit
                  </Button>
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default EventfinderScreen;
