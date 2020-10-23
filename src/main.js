const { validateArgument } = require("./args");
const { execCommands, printCommandsResult } = require("./commands");

const args = process.argv.slice(2);

try {
  const parsedCommands = args.map(validateArgument);
  const commandsResult = execCommands(parsedCommands);
  printCommandsResult(commandsResult);
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
}
