import { Sloth } from "../src/Sloth";

describe("Sloth", () => {
  test("has a name at birth", () => {
    let sloth = new Sloth("Pete")
    expect(sloth.name).toEqual("Pete")
  });
});