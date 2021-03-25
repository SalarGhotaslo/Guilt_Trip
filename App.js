import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Pedometer } from "expo-sensors";
import { save, getValueFor } from "./src/accessStorage";
import { Target } from "./src/Target";
import { Colony } from "./src/Colony";
import { performStepApi } from "./src/performStepApi";
import { createColony } from "./src/createColony";
import {
  slothSpeech,
  setXPosition,
  setYPosition,
  windowWidth,
} from "./src/slothSpeech";
import { alertsFunction } from "./src/alerts";
import TreeTop from "./assets/svgs/TreeTop";
import TreeBottom from "./assets/svgs/TreeBottom";
import { arrayOfClassics, arrayOfRares } from "./src/svgLoader";
import * as Font from "expo-font";

let customFonts = {
  Patrick: require("./assets/fonts/PatrickHand-Regular.ttf"),
  Karla: require("./assets/fonts/Karla-VariableFont_wght.ttf"),
  Josefin: require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
};

export default class App extends Component {
  state = {
    isPedometerAvailable: "checking",
    appIsReady: false,
    stepCount: 0,
    currentStepCount: 0,
    population: 0,
    lastLogin: 0,
    previousPopulation: null,
    speech: false,
    showInfo: false,
  };

  async componentDidMount() {
    try {
      await Font.loadAsync(customFonts);
      // await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this._subscribe();
    this.prepareResources();
    this.interval = setInterval(() => {
      // console.log("interval is ticking");
      if (this.state.speech) {
        var slothPosition = Math.floor(
          Math.random() * this.state.slothCollection.length
        );
        var speaker = this.state.slothCollection[slothPosition];
        var slothPositionY =
          (slothPosition - (this.state.slothCollection.length - 1)) * -1;
        // console.log("NEW SPEAKER");
        // console.log(speaker);
        this.setState({
          slothWords: slothSpeech(speaker),
          xPosition: setXPosition(slothPosition),
          yPosition: setYPosition(slothPositionY),
          speech: false,
          speechBackground: "#F7648B",
        });
      } else {
        this.setState({
          slothWords: "",
          speech: true,
          speechBackground: "transparent",
        });
      }
    }, 5000);
  }

  componentWillUnmount() {
    this._unsubscribe();
    clearInterval(this.interval);
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
      // NEW GAME:
      // save("date", "0");
      // save("population", "0");
      // save("sloths", "0");

      // CUSTOM GAME:
      // var colony3 = new Colony(61);
      // save("date", "2021-03-24");
      // save("population", String(colony3.showPopulation()));
      // save("sloths", JSON.stringify(colony3.sloths));
      var date = await getValueFor("date");
      var population = await getValueFor("population");
      var previousPopulation = population;
      var sloths = await getValueFor("sloths");
      var colony = await createColony(date, population, JSON.parse(sloths));
      save("date", JSON.stringify(new Date()).substring(1, 11));
      save("population", String(colony.showPopulation()));
      save("sloths", JSON.stringify(colony.sloths));
      var steps = await performStepApi();
      var target = new Target();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState(
        {
          appIsReady: true,
          stepCount: steps,
          population: colony.showPopulation(),
          lastLogin: date,
          previousPopulation: previousPopulation,
          slothCollection: colony.sloths,
          speech: false,
          speechBackround: "transparent",
          slothWords: "",
          yPosition: 800,
          xPosition: 220,
          dynamicTarget: target.dynamicTarget(colony.showPopulation()),
          showInfo: false,
        },
        async () => {
          //  await SplashScreen.hideAsync();
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
        maximumZoomScale={3}
        minimumZoomScale={1}
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
            this.state.dynamicTarget -
            this.state.stepCount -
            this.state.currentStepCount
          }
          target={this.state.dynamicTarget}
        />

        <TouchableNativeFeedback
          style={{ backgroundColor: "#ffffff" }}
          onPress={() => {
            this.setState({ showInfo: true });
          }}
        >
          <Image
            style={{
              position: "absolute",
              bottom: 60,
              right: 10,
              width: 150,
              height: 180,
              flex: 1,
            }}
            source={require("./assets/infoSloth.png")}
          />
        </TouchableNativeFeedback>

        <Modal transparent={true} visible={this.state.showInfo}>
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View
              style={{
                backgroundColor: "#ffffff",
                margin: 50,
                padding: 40,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 30, fontFamily: "Karla" }}>
                Welcome to Sloth
              </Text>
              <Text />
              <Text style={{ fontSize: 15, fontFamily: "Karla" }}>
                As we all know, sloth is one of the seven deadly sins. In this
                case, it's deadly for your sloths!
              </Text>
              <Text />
              <Text style={{ fontFamily: "Karla" }}>
                Beat your step target for the day to add to your snuggle of
                sloths.
              </Text>
              <Text />
              <Text style={{ fontFamily: "Karla" }}>
                As your tree grows, step targets will become higher and rarer
                sloths will be unlocked.
              </Text>
              <Text />
              <Text style={{ fontFamily: "Karla" }}>
                But, slackers beware, if you don’t hit your target, sloths will
                die and you WILL feel guilty.
              </Text>
              <Text />
              <Text style={{ fontFamily: "Karla" }}>
                Click on each sloth to learn about their passions, hopes and
                dreams.
              </Text>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
                source={require("./assets/splash.png")}
              />
              <Button
                title="Hide"
                onPress={() => {
                  this.setState({ showInfo: false });
                }}
              />
            </View>
          </View>
        </Modal>
        <SpeechBubble
          xPosition={this.state.xPosition}
          yPosition={this.state.yPosition}
          speechBackground={this.state.speechBackground}
          slothWords={this.state.slothWords}
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

function returnSloth(i) {
  if (i % 5 === 0) {
    let x = ((i / 5) % arrayOfRares.length) - 1;
    if (x < 0) {
      x = arrayOfRares.length - 1;
    }
    return arrayOfRares[x];
  } else {
    let x = ((i % 10) % arrayOfClassics.length) - 1;
    if (x < 0) {
      x = 0;
    }
    return arrayOfClassics[x];
  }
}

const DisplaySloths = (props) => {
  let slothImages = [];
  for (let i = 1; i <= props.slothPopulation; i++) {
    slothImages.push(
      <View key={i}>
        <TouchableWithoutFeedback
          onPress={() =>
            Alert.alert(
              `Hi!`,
              `I'm ${
                props.slothCollection[i - 1].name
              }. I'm ${props.slothCollection[
                i - 1
              ].personality.toLowerCase()} and I love ${props.slothCollection[
                i - 1
              ].passion.toLowerCase()}`
            )
          }
        >
          {returnSloth(i)}
        </TouchableWithoutFeedback>
      </View>
    );
  }
  return <View>{slothImages.reverse()}</View>;
};

const SpeechBubble = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        borderRadius: 10,
        top: props.yPosition,
        left: props.xPosition,
        right: 0,
        bottom: 0,
        width: 0.35 * windowWidth,
        height: 70,
        backgroundColor: props.speechBackground,
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        padding: 6,
      }}
    >
      <Text
        style={{
          alignItems: "center",
          fontSize: 0.032 * windowWidth,
          fontFamily: "Karla",
        }}
      >
        {props.slothWords}
      </Text>
    </View>
  );
};
