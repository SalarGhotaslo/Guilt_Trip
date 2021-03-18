import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Pedometer } from "expo-sensors";
import { updatePopulation } from "./src/updatePopulation";
import { Target } from "./src/Target";
import { Colony } from "./src/Colony";
import { performStepApi, DAY } from "./src/performStepApi";

export default class App extends Component {
  state = {
    isPedometerAvailable: "checking",
    appIsReady: false,
    stepCount: 0,
    currentStepCount: 0,
    population: 0,
    yesterdaysCount: 0,
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
      var endTime = new Date();
      endTime.setHours(0, 0, 0, 0);
      var startTime = new Date(endTime - DAY),
        yesterdaysSteps = await performStepApi(startTime, endTime),
        target = new Target(),
        colony = new Colony();
      updatePopulation(target, colony, yesterdaysSteps);
      var steps = await performStepApi();
    } catch (e) {
    } finally {
      this.setState(
        {
          appIsReady: true,
          stepCount: steps,
          population: colony.showPopulation(),
          yesterdaysCount: yesterdaysSteps,
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
        <Text>Steps taken today: {this.state.stepCount}</Text>
        <Text>Steps taken yesterday: {this.state.yesterdaysCount}</Text>
        <Text>Steps while using this app: {this.state.currentStepCount}</Text>
        <Text>Steps till target reached: {5000 - this.state.stepCount}</Text>
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
