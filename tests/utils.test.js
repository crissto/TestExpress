const utils = require("../utils");

describe("Utils functions", () => {
  it("isPalindrome should check if palindrome", () => {
    expect(utils.isPalindrome("bob")).toEqual(true);
    expect(utils.isPalindrome("fuzz")).toEqual(false);
  });

  it("validateEntry should check if user or word are empty", () => {
    expect(utils.validateEntry({ name: undefined, word: undefined })).toEqual(
      false
    );
    expect(utils.validateEntry({ name: "", word: "" })).toEqual(false);
    expect(utils.validateEntry({ name: "asd", word: "" })).toEqual(false);
    expect(utils.validateEntry({ name: "", word: "asd" })).toEqual(false);
    expect(utils.validateEntry({ name: "asd", word: "asd" })).toEqual(true);
  });
});
