import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const randompicCommand: Command = {
    name: "randompic",
    category: CommandCategory.Fun,
    description: "Displays a random picture from picsum.photos.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {},
};
