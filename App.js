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
  TouchableOpacity,
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
      <View style={styles.container}>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({ animated: true })
          }
        >
          <Image
            source={require("./assets/treeTop.png")}
            style={styles.treeTip}
          />
          <DisplaySloths slothPopulation={this.state.population} />
          <Image
            source={require("./assets/treeBottom.png")}
            style={styles.treeTip}
          />
          <View style={styles.footerText}>
            <Text>Steps taken today: {this.state.stepCount}</Text>
            <Text>
              Steps till target reached: {DEFAULT_TARGET - this.state.stepCount}
            </Text>
            <Text>Step target: {DEFAULT_TARGET}</Text>
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
});

function isOdd(n) {
  return n % 2 === 1;
}

const DisplaySloths = (props) => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  let sloths = [];
  for (let i = 0; i < props.slothPopulation; i++) {
    if (isOdd(i)) {
      sloths.push(
        <View key={i}>
          <TouchableOpacity onPress={toggleAlert}>
            <Image
              source={require("./assets/rightSloth.png")}
              style={styles.slothImage}
              key={i}
            />
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
                <Text>🤓</Text>
              </View>
            }
            style={{ backgroundColor: "white" }}
          >
            <Text style={{ marginTop: -16, marginBottom: 32 }}>
              Hello there
            </Text>
            <TouchableOpacity onPress={toggleAlert}>
              <Text>Tap me</Text>
            </TouchableOpacity>
          </FancyAlert>
        </View>
      );
    } else {
      sloths.push(
        <View key={i}>
          <TouchableOpacity onPress={toggleAlert}>
            <Image
              source={require("./assets/leftSloth.png")}
              style={styles.slothImage}
              key={i}
            />
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
                <Text>🤓</Text>
              </View>
            }
            style={{ backgroundColor: "white" }}
          >
            <Text style={{ marginTop: -16, marginBottom: 32 }}>
              Hello there
            </Text>
            <TouchableOpacity onPress={toggleAlert}>
              <Text>Tap me</Text>
            </TouchableOpacity>
          </FancyAlert>
        </View>
      );
    }
  }
  return sloths;
};
