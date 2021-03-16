import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export default class App extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount((result) => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      (error) => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    console.log(start);
    console.log(end);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        this.setState({ pastStepCount: result.steps });
      },
      (error) => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text> */}
        <Text>
          Steps taken today:{" "}
          {this.state.pastStepCount + this.state.currentStepCount}
        </Text>
        {/* <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text> */}
      </View>
    );
  }
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
