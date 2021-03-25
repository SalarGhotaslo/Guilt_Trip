import React from "react";
import { Text } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default () => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Text style={{ fontFamily: "Inter_900Black" }}>Inter Black</Text>;
};
