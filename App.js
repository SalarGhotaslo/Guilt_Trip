import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Pedometer } from "expo-sensors";
import { save, getValueFor } from "./src/accessStorage";
import * as SecureStore from "expo-secure-store";
import { updatePopulation } from "./src/updatePopulation";
import { Target, DEFAULT_TARGET } from "./src/Target";
import { Colony, DEFAULT_POPULATION } from "./src/Colony";
import { performStepApi, DAY } from "./src/performStepApi";
import { createColony } from "./src/createColony";
import { render } from "react-dom";

export default class App extends Component {
  state = {
    isPedometerAvailable: "checking",
    appIsReady: false,
    stepCount: 0,
    currentStepCount: 0,
    population: 0,
    lastLogin: 0,
    // yesterdaysCount: 0,
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
      var date = await getValueFor("date");
      var population = await getValueFor("population");
      var colony = await createColony(date, population);
      let today = new Date();
      let todayForStorage = JSON.stringify(today);
      todayForStorage = todayForStorage.substring(1, 11);
      save("date", todayForStorage);
      save("population", String(colony.showPopulation()));
      var steps = await performStepApi();
    } catch (e) {
    } finally {
      this.setState(
        {
          appIsReady: true,
          stepCount: steps,
          population: colony.showPopulation(),
          lastLogin: date,
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
        <Text>{this.state.lastLogin}</Text>
        <Text>Steps taken today: {this.state.stepCount}</Text>
        {/* <Text>Steps taken yesterday: {this.state.yesterdaysCount}</Text> */}
        <Text>Steps while using this app: {this.state.currentStepCount}</Text>
        <Text>
          Steps till target reached: {DEFAULT_TARGET - this.state.stepCount}
        </Text>
        <Text>population = {this.state.population}</Text>
        <CreateSloths slothPopulation={this.state.population} />
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

const CreateSloths = (props) => new Sloth();

class Sloth extends Component {
  // let counter = 0;

  render() {
    return <Text>"helllo!!!!!!"</Text>;
  }

  // for (counter < props.slothPopulation) {
  //   return (
  //     <View>
  //       <Text>Sloth population: {props.slothPopulation}</Text>
  //     </View>
  //   );
  //   counter++;
  // }

  // return (
  //   <View>
  //     <Text>Sloth population: {props.slothPopulation}</Text>
  //     <SlothImage />
  //   </View>
  // );
}

// const SlothImage = () => {
//   return (
//     <View>
//       <Text>Sloth population: 4</Text>
//     </View>
//   );
//   // return (
//   //   <View>
//   //     <Image source={require("./assets/sloth-image.png")} />
//   //   </View>
//   // );
// };
