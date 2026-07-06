import { pingCommand } from "../../commands/utility/ping";
import { echoCommand } from "../../commands/utility/echo";
import { Command } from "../../types/command";

const allCommands: Command[] = [pingCommand, echoCommand];
export const commandMap = new Map<string, Command>();

for (const command of allCommands) {
    commandMap.set(command.name, command);
}
