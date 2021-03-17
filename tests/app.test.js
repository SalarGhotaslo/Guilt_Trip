import React from "react";
import renderer from "react-test-renderer";

import App from "../App";

describe("<App />", () => {
  it("has 1 child", () => {
    expect(sum(2, 2)).toBe(4);
  });
});

const sum = (a, b) => a + b;
