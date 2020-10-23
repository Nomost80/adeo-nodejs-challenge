const { validateArgument } = require("../src/args");
const patternFilter = require("../src/commands/patternFilter");
const countChildren = require("../src/commands/countChildren");

describe("user arguments validation", () => {
  it("should raise an error when an unknown argument is specfied", () => {
    const specifyUnknownArgument = () => {
      validateArgument("--wrongArg");
    };
    expect(specifyUnknownArgument).toThrowError("Unknown argument --wrongArg");
  });

  it("should raise an error when a requires-value argument is not respected", () => {
    const doNotSpecifyArgumentValue = () => {
      validateArgument("--filter");
    };
    expect(doNotSpecifyArgumentValue).toThrowError("Expected --filter=<value>");
  });

  it("should return a executor,argValue tuple when a valid argument (filter) is specified", () => {
    const result = validateArgument("--filter=wi");
    expect(result).toEqual([patternFilter, "wi"]);
  });

  it("should return a executor,argValue tuple when a valid argument (count) is specified", () => {
    const result = validateArgument("--count");
    expect(result).toEqual([countChildren, undefined]);
  });
});
