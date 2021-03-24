import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import {
  StyleSheet,
  Modal,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  ImageBackground,
  ImageBackgroundComponent,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableHighlightBase,
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
import { alertsFunction } from "./src/alerts";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import TreeTop from "./assets/svgs/TreeTop";
import TreeSegmentTom from "./assets/svgs/segments/TreeSegmentTom";
import TreeSegmentSarah from "./assets/svgs/segments/TreeSegmentSarah";
import TreeSegmentYPatrick from "./assets/svgs/segments/TreeSegmentYPatrick";
import TreeSegmentHiddenSteve from "./assets/svgs/segments/TreeSegmentHiddenSteve";
import TreeBottom from "./assets/svgs/TreeBottom";
import Svg from "react-native-svg";

export default class App extends Component {
  state = {
    isPedometerAvailable: "checking",
    appIsReady: false,
    stepCount: 0,
    currentStepCount: 0,
    population: 0,
    lastLogin: 0,
    previousPopulation: null,
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
      var previousPopulation = population;
      var sloths = await getValueFor("sloths");
      console.log(JSON.parse(sloths));
      var colony = await createColony(date, population, JSON.parse(sloths));
      save("date", JSON.stringify(new Date()).substring(1, 11));
      save("population", String(colony.showPopulation()));
      save("sloths", JSON.stringify(colony.sloths));
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
          previousPopulation: previousPopulation,
          slothCollection: colony.sloths,
        },
        async () => {
          await SplashScreen.hideAsync();
          alertsFunction(
            this.state.lastLogin,
            new Date(),
            this.state.previousPopulation,
            this.state.population
          );
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
      <ScrollView
        style={styles.container}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        <TreeTop />
        <DisplaySloths
          slothPopulation={this.state.population}
          slothCollection={this.state.slothCollection}
        />
        <TreeBottom
          slothPopulation={this.state.population}
          count={this.state.stepCount + this.state.currentStepCount}
          remaining={
            DEFAULT_TARGET - this.state.stepCount - this.state.currentStepCount
          }
          target={DEFAULT_TARGET}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    paddingTop: "10%",
  },
});

function isOdd(n) {
  return n % 2 === 1;
}

const arrayOfSegments = [
  <TreeSegmentYPatrick />,
  <TreeSegmentTom />,
  <TreeSegmentSarah />,
  <TreeSegmentHiddenSteve />,
  <TreeSegmentTom />,
];

function returnSloth(i) {
  return arrayOfSegments[i];
}

const DisplaySloths = (props) => {
  let slothImages = [];
  for (let i = 0; i < props.slothPopulation; i++) {
    if (isOdd(i)) {
      slothImages.push(
        <View key={i}>
          <TouchableWithoutFeedback
            onPress={() =>
              Alert.alert(
                `Hi!`,
                `I'm ${
                  props.slothCollection[i].name
                }. I'm ${props.slothCollection[
                  i
                ].personality.toLowerCase()} and I love ${props.slothCollection[
                  i
                ].passion.toLowerCase()}`
              )
            }
          >
            {returnSloth(i)}
          </TouchableWithoutFeedback>
        </View>
      );
    } else if (!isOdd(i)) {
      slothImages.push(
        <View key={i}>
          <TouchableWithoutFeedback
            onPress={() =>
              Alert.alert(
                `Hi!`,
                `I'm ${
                  props.slothCollection[i].name
                }. I'm ${props.slothCollection[
                  i
                ].personality.toLowerCase()} and I love ${props.slothCollection[
                  i
                ].passion.toLowerCase()}`
              )
            }
          >
            {returnSloth(i)}
          </TouchableWithoutFeedback>
        </View>
      );
    } else if (i % 5 === 0 && i != 0) {
      slothImages.push(
        <View key={i}>
          <TouchableWithoutFeedback
            onPress={() =>
              Alert.alert(
                `Hi!`,
                `I'm ${
                  props.slothCollection[i].name
                }. I'm ${props.slothCollection[
                  i
                ].personality.toLowerCase()} and I love ${props.slothCollection[
                  i
                ].passion.toLowerCase()}`
              )
            }
          >
            {returnSloth(i)}
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }
  return <View>{slothImages.reverse()}</View>;
};
