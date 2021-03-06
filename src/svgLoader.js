import React, { Component } from "react";
// Regular Sloths

import Simon from "../assets/svgs/segments/regular/Simon";
import Sarah from "../assets/svgs/segments/regular/Sarah";
import YPatrick from "../assets/svgs/segments/regular/YPatrick";
import HiddenSteve from "../assets/svgs/segments/regular/HiddenSteve";
import Patrick from "../assets/svgs/segments/regular/Patrick";
import Steve from "../assets/svgs/segments/regular/Steve";
import LipSteve from "../assets/svgs/segments/regular/LipSteve";
import VerticalSarah from "../assets/svgs/segments/regular/VerticalSarah";

export const arrayOfClassics = [
  <YPatrick />,
  <Steve style={[{ transform: [{ scaleX: -1 }] }]} />,
  <Sarah />,
  <HiddenSteve style={[{ transform: [{ scaleX: -1 }] }]} />,
  "Placeholder",
  <Simon style={[{ transform: [{ scaleX: -1 }] }]} />,
  <VerticalSarah />,
  <LipSteve style={[{ transform: [{ scaleX: -1 }] }]} />,
  <Patrick />,
  "Placeholder",
];

//Legendary Sloths

import Ash from "../assets/svgs/segments/legendary/Ash";
import Aviator from "../assets/svgs/segments/legendary/Aviator";
import BeerGlass from "../assets/svgs/segments/legendary/BeerGlass";
import BeerHat from "../assets/svgs/segments/legendary/BeerHat";
import Devil from "../assets/svgs/segments/legendary/Devil";
import Flowers from "../assets/svgs/segments/legendary/Flowers";
import HairRibbon from "../assets/svgs/segments/legendary/HairRibbon";
import HeadPhones from "../assets/svgs/segments/legendary/HeadPhones";
import Jason from "../assets/svgs/segments/legendary/Jason";
import Shark from "../assets/svgs/segments/legendary/Shark";
import ThugLife from "../assets/svgs/segments/legendary/ThugLife";
import Witch from "../assets/svgs/segments/legendary/Witch";

export const arrayOfRares = [
  <Ash />,
  <Witch style={[{ transform: [{ scaleX: -1 }] }]} />,
  <HairRibbon />,
  <Aviator style={[{ transform: [{ scaleX: -1 }] }]} />,
  <Jason />,
  <HeadPhones style={[{ transform: [{ scaleX: -1 }] }]} />,
  <BeerGlass />,
  <Flowers style={[{ transform: [{ scaleX: -1 }] }]} />,
  <ThugLife />,
  <Shark style={[{ transform: [{ scaleX: -1 }] }]} />,
  <BeerHat />,
  <Devil style={[{ transform: [{ scaleX: -1 }] }]} />,
];
