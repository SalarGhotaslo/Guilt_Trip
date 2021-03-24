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
import TreeSegmentTom from "./assets/svgs/TreeSegmentTom";
import TreeSegmentSarah from "./assets/svgs/TreeSegmentSarah";
import TreeBottom from "./assets/svgs/TreeBottom";

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
        <InfoPopUp />
        <TreeBottom
          slothPopulation={this.state.population}
          count={this.state.stepCount}
          remaining={DEFAULT_TARGET - this.state.stepCount}
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
  slothImage: {
    width: "100%",
    position: "relative",
  },
  footerText: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    bottom: 0,
  },
  treeTip: {
    width: "100%",
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

function isOdd(n) {
  return n % 2 === 1;
}

const DisplaySloths = (props) => {
  console.log("slothCollection");
  console.log(props.slothCollection);
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  let slothImages = [];
  let s = 0;
  for (let i = 0, j = 0; i < props.slothPopulation; i++, j++) {
    if (isOdd(j)) {
      slothImages.push(
        <View key={j}>
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
            <TreeSegmentTom />
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      slothImages.push(
        <View key={j}>
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
            <TreeSegmentSarah />
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }
  console.log(slothImages);
  return <View>{slothImages}</View>;
};

const InfoPopUp = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View>
      <TouchableOpacity
        onPress={toggleAlert}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <Text>Info</Text>
      </TouchableOpacity>

      <FancyAlert
        visible={visible}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text>🦥 </Text>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>
          Welcome to Guilt Trip{"\n"}
          {"\n"}
          This is a page to give the user important information about our app
          and how they can use it.{"\n"}
          {"\n"}
          Beat your step target for the day to add to your sloth count.{"\n"}
          {"\n"}
          As your tree grows, step targets will become bigger and rarer sloths
          will be unlocked.{"\n"}
          {"\n"}
          But, slackers beware, if you don't hit your target, sloths will die
          and you WILL feel guilty.{"\n"}
          {"\n"}
          Make sure to click on your sloths to learn about them!
        </Text>
        <TouchableOpacity onPress={toggleAlert}>
          <Text>Click here and get walking!</Text>
        </TouchableOpacity>
      </FancyAlert>
    </View>
  );
};
