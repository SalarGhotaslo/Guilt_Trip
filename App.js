import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  ImageBackground,
  ImageBackgroundComponent,
  Alert,
} from "react-native";
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
      console.log("can i see this");
      var date = await getValueFor("date");
      var population = await getValueFor("population");
      console.log("after 70");
      var colony = await createColony(date, population);
      let today = new Date();
      let todayForStorage = JSON.stringify(today);
      todayForStorage = todayForStorage.substring(1, 11);
      save("date", todayForStorage);
      save("population", String(colony.showPopulation()));
      var steps = await performStepApi();
    } catch (e) {
      console.log(e);
    } finally {
      console.log(colony);
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
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Image
            source={require("./assets/treeTop.png")}
            style={styles.slothImage}
          />
          <DisplaySloths slothPopulation={this.state.population} />
          <Image
            source={require("./assets/treeBottom.png")}
            style={styles.slothImage}
          />
          <View style={styles.footerText}>
            <Text>Hello! welcome to Guilt Trip.</Text>
            <Text>{this.state.lastLogin}</Text>
            <Text>Steps taken today: {this.state.stepCount}</Text>
            <Text>Steps taken yesterday: {this.state.yesterdaysCount}</Text>
            <Text>
              Steps while using this app: {this.state.currentStepCount}
            </Text>
            <Text>
              Steps till target reached: {DEFAULT_TARGET - this.state.stepCount}
            </Text>
            <Text>population = {this.state.population}</Text>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00ffff",
  },
  slothImage: {
    // width: ,
    // height: "",
  },
  scrollView: {
    flex: 1,
  },
  trunkImage: {
    width: 0,
    height: 0,
  },
  footerText: {
    position: "relative",
    backgroundColor: "#20fc00",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

const DisplaySloths = (props) => {
  let sloths = [];
  for (let i = 0; i < props.slothPopulation; i++) {
    if (isOdd(i)) {
      sloths.push(
        <Image
          source={require("./assets/rightSloth.png")}
          style={styles.slothImage}
          key={i}
        />
      );
    } else {
      sloths.push(
        <Image
          source={require("./assets/leftSloth.png")}
          style={styles.slothImage}
          key={i}
        />
      );
    }
  }
  return <View>{sloths}</View>;
};

function isOdd(n) {
  return n % 2 === 1;
}

// let imagePaths = [
//   "./assets/sloth.png",
//   "./assets/sloth1.png",
//   "./assets/sloth2.png",
// ];
