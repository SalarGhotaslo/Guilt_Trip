import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import performStepAPI from "./src/stepApi";
import * as SplashScreen from "expo-splash-screen";
import { Pedometer } from "expo-sensors";
import { AppLogic } from "./src/AppLogic";
import { save, getValueFor } from "./src/accessStorage";
import * as SecureStore from 'expo-secure-store';
const Target = require("./src/Target");
const { Colony } = require("./src/colony");

export default class App extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    appIsReady: false,
    stepCount: 0,
    currentStepCount: 0,
    population: 0,
    testValue: 0,
  };

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this._subscribe();
    this.prepareResources();
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
  };

  prepareResources = async () => {
    try {
      var steps = await performStepAPI(),
        target = new Target(),
        colony = new Colony();
      AppLogic(target, colony, steps);
      // save("key", "something differet")
      var test = await getValueFor("key")
    } catch (e) {
    } finally {
      console.log(test)
      this.setState(
        {
          appIsReady: true,
          stepCount: steps,
          population: colony.showPopulation(),
          testValue: test,
        },
        async () => {
          await SplashScreen.hideAsync();
        }
      );
    }
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    if (!this.state.appIsReady) {
      return null;
    }
    return (
      <SafeAreaView style={styles.container}>
        <Text>Hello! welcome to Guilt Trip.</Text>
        <Text>
          {this.state.testValue}
          stepCount: 'Steps taken today': {this.state.stepCount}, app is:{" "}
          {String(this.state.appIsReady)}, currentStepCount:{" "}
          {this.state.currentStepCount}
        </Text>
        <Text>population = {this.state.population}</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#145DA0",
    alignItems: "center",
    justifyContent: "center",
  },
});
