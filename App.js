import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    sessionStepCount = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(result.toString());
      },
      (error) => {
        setIsPedometerAvailable(`Could not get isPedometerAvailable: ${error}`);
      }
    );

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        setPastStepCount(result.steps);
      },
      (error) => {
        setPastStepCount(`Could not get stepCount: ${error}`);
      }
    );

    return function resetCurrentSession() {
      sessionStepCount && sessionStepCount.remove();
      sessionStepCount = null;
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text> */}
      {isPedometerAvailable && (
        <Text>Steps taken today: {pastStepCount + currentStepCount}</Text>
      )}
      {/* <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aabbcc",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
