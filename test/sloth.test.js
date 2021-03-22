import { Sloth } from "../src/Sloth";

describe("Sloth", () => {
  test("has a name at birth", () => {
    let sloth = new Sloth("Pete")
    expect(sloth.name).toEqual("Pete")
  });

  test("has a personality at birth", () => {
    let sloth = new Sloth("Ollie", "Happy")
    expect(sloth.personality).toEqual("Happy")
  })

  test("has something it likes", () => {
    let sloth = new Sloth("Jimmy", "joyful", "javascript")
    expect(sloth.passion).toEqual("javascript")
  });
});
