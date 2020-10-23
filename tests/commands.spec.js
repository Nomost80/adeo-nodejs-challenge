const { execCommands } = require("../src/commands");
const patternFilter = require("../src/commands/patternFilter");
const { filterAnimal } = require("../src/commands/patternFilter");
const countChildren = require("../src/commands/countChildren");

const getCountPropertyRegex = (length) =>
  new RegExp(`[\\w\\s]+\\[${length}\\]`);

const testPatternFilterCommand = (pattern, commandResult) => {
  commandResult.forEach((country) => {
    country.people.forEach((person) => {
      person.animals.forEach((animal) => {
        expect(filterAnimal(animal, pattern)).toStrictEqual(true);
      });
    });
  });
};

const testCountChildrenCommand = (commandResult) => {
  commandResult.forEach((country) => {
    const countryNameValid = getCountPropertyRegex(country.people.length).test(
      country.name
    );
    expect(countryNameValid).toStrictEqual(true);
    country.people.forEach((person) => {
      const personNameValid = getCountPropertyRegex(person.animals.length).test(
        person.name
      );
      expect(personNameValid).toStrictEqual(true);
    });
  });
};

it("should filter an animal with a given name (insensitive case)", () => {
  expect(filterAnimal({ name: "Gamakichi" }, "ki")).toStrictEqual(true);
  expect(filterAnimal({ name: "Gamakichi" }, "Ki")).toStrictEqual(true);
  expect(filterAnimal({ name: "Gamakichi" }, "Qi")).toStrictEqual(false);
});

describe("commands ouputs", () => {
  it("should return animals matching the pattern when filter is used", () => {
    const pattern = "Wi";
    const commandResult = execCommands([[patternFilter, "Wi"]]);
    testPatternFilterCommand(pattern, commandResult);
  });

  it("should have the children count in 'name' properties when count is used", () => {
    const commandResult = execCommands([[countChildren]]);
    testCountChildrenCommand(commandResult);
  });

  it("should apply filter and count behaviors when both are used", () => {
    const pattern = "do";
    const commandResult = execCommands([
      [patternFilter, pattern],
      [countChildren],
    ]);
    testPatternFilterCommand(pattern, commandResult);
    testCountChildrenCommand(commandResult);
  });
});
