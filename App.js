import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


import {
  StyleSheet,
  Button,
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
import { slothSpeech, setXPosition, setYPosition } from "./src/slothSpeech";
import { render } from "react-dom";
import { alertsFunction } from "./src/alerts";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import TreeTop from "./assets/svgs/TreeTop";
import TreeBottom from "./assets/svgs/TreeBottom";
import Svg from "react-native-svg";
import { arrayOfClassics, arrayOfRares } from "./src/svgLoader";

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
    // yesterdaysCount: 0,
    showInfo:false,
  };


  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this._subscribe();
    this.prepareResources();
    this.interval = setInterval(() => {
      console.log("interval is ticking");
      if (this.state.speech) {
        var slothPosition = Math.floor(
          Math.random() * this.state.slothCollection.length
        );
        var speaker = this.state.slothCollection[slothPosition];
        var slothPositionY =
          (slothPosition - (this.state.slothCollection.length - 1)) * -1;
        console.log("NEW SPEAKER");
        console.log(speaker);
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
      // var colony2 = new Colony(50);
      // save("population", String(colony2.showPopulation()));
      // save("sloths", JSON.stringify(colony2.sloths));
      var date = await getValueFor("date");
      var population = await getValueFor("population");
      var previousPopulation = population;
      var sloths = await getValueFor("sloths");
      var colony = await createColony(date, population, JSON.parse(sloths));
      save("date", JSON.stringify(new Date()).substring(1, 11));
      save("population", String(colony.showPopulation()));
      save("sloths", JSON.stringify(colony.sloths));
      var steps = await performStepApi();
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
          showInfo:false,
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
          showInfo={this.state.showInfo}
        />
        <View
        style={{
          position: "absolute",
          borderRadius: 10,
          bottom: 10,
          right: 10,
          width: 150,
          height: 70,
          backgroundColor: "#000000",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
          padding: 12,
        }}>
          <Button 
          title="info" onPress={() => {this.setState({showInfo:true})}}
          />
          </View>



        <Modal 
        transparent={true}
        visible={this.state.showInfo}
        >
          <View style ={{backgroundColor:"#000000aa", flex:1}}>
            <View style = {{backgroundColor:"#ffffff", margin:50, padding:40, borderRadius:10, flex:1}}>
              <Text 
              style = {{fontSize:80}}
            >
              Modal Text</Text>
              <Button title="hide" onPress={() => {this.setState({showInfo:false})}}/>
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

function isOdd(n) {
  return n % 2 === 1;
}

function returnSloth(i) {
  if (i % 5 === 0) {
    let x = ((i / 5) % arrayOfRares.length) - 1;
    if (x < 0) {
      x = 0;
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
  return(
  <View
    style={{
      position: "absolute",
      borderRadius: 10,
      top: props.yPosition,
      left: props.xPosition,
      right: 0,
      bottom: 0,
      width: 150,
      height: 70,
      backgroundColor: props.speechBackground,
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
      padding: 12,
    }}
  >
    <Text style={{ alignItems: "center", fontSize: 12, }}>{props.slothWords}</Text>
  </View>
  )
}
