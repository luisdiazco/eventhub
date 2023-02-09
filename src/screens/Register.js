import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { registerStyle } from "../utils/registerStyle";

export const RegisterScreen = ({ navigation }) => {
  const register = () => navigation.navigate("Map");

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={registerStyle.content}>
          <TextInput label="Name" />
          <TextInput label="Email" keyboardType="email-address" />
          <TextInput
            label="Password"
            secureTextEntry={true}
            right={
              <TextInput.Icon
                icon="eye-off-outline"
                color={registerStyle.icon.color}
              />
            }
          />
          <TextInput
            label="Confirm Password"
            secureTextEntry={true}
            right={
              <TextInput.Icon
                icon="eye-off-outline"
                color={registerStyle.icon.color}
              />
            }
          />
          <TextInput label="Phone Number" keyboardType="phone-pad" />
          <Button
            onPress={register}
            mode="contained"
            style={registerStyle.button}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
