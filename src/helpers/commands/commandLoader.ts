import { Command } from "../../types/command";
import { pingCommand } from "../../commands/utility/ping";
import { echoCommand } from "../../commands/utility/echo";
import { randompicCommand } from "../../commands/fun/randompic";
import { workCommand } from "../../commands/economy/work";
import { cooldownCommand } from "../../commands/economy/cooldown";
import { payCommand } from "../../commands/economy/pay";

const allCommands: Command[] = [
    pingCommand,
    echoCommand,
    randompicCommand,
    workCommand,
    cooldownCommand,
    payCommand,
];
export const commandMap = new Map<string, Command>();

for (const command of allCommands) {
    commandMap.set(command.name, command);
}
