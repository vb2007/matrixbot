import { pingCommand } from "../../commands/utility/ping";
import { echoCommand } from "../../commands/utility/echo";
import { Command } from "../../types/command";
import { randompicCommand } from "../../commands/fun/randompic";
import { workCommand } from "../../commands/economy/work";

const allCommands: Command[] = [
    pingCommand,
    echoCommand,
    randompicCommand,
    workCommand,
];
export const commandMap = new Map<string, Command>();

for (const command of allCommands) {
    commandMap.set(command.name, command);
}
