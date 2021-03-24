import React, { Component } from "react";
import TreeSegmentTom from "../assets/svgs/segments/regular/BigBallsTom";
import TreeSegmentSarah from "../assets/svgs/segments/regular/Sarah";
import TreeSegmentYPatrick from "../assets/svgs/segments/regular/YPatrick";
import TreeSegmentHiddenSteve from "../assets/svgs/segments/regular/HiddenSteve";

export const arrayOfClassics = [
  <TreeSegmentYPatrick style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentTom />,
  <TreeSegmentSarah style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentTom style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentYPatrick style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentTom />,
  <TreeSegmentSarah style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentTom style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentYPatrick style={[{ transform: [{ scaleX: -1 }] }]} />,
  <TreeSegmentTom />,
];

export const arrayOfRares = [<TreeSegmentHiddenSteve />];
