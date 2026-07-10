import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const workCommand: Command = {
    name: "work",
    category: CommandCategory.Economy,
    description: "Lets you work for a random amount of money.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {},
};
