const { commands } = require("./commands");

const prefix = "--";
const delimiter = "=";

const validateArgument = (arg) => {
  const [param, argValue] = arg.split(delimiter);
  const commandName = Object.keys(commands).find(
    (k) => `${prefix}${k}` === param
  );
  const commandOptions = commands[commandName];
  if (!commandOptions) {
    throw Error(`Unknown argument ${param}`);
  }
  if (commandOptions.requiresValue && !argValue) {
    throw Error(`Expected ${param}=<value>`);
  }
  return [commandOptions.executor, argValue];
};

module.exports = {
  validateArgument,
};
