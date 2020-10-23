const data = require("../../data.json");
const patternFilter = require("./patternFilter");
const countChildren = require("./countChildren");

const commands = {
  filter: {
    requiresValue: true,
    executor: patternFilter,
  },
  count: {
    executor: countChildren,
  },
};

let previousCommandResult;

const execCommands = (parsedCommands) => {
  parsedCommands.forEach(([executor, argValue]) => {
    previousCommandResult = executor(previousCommandResult || data, argValue);
  });
  return previousCommandResult;
};

const printCommandsResult = (result) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, null, 2));
};

module.exports = {
  commands,
  execCommands,
  printCommandsResult,
};
