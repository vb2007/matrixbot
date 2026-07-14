import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import { doesUserExists } from "../../database/models/economy";

export const cooldownCommand: Command = {
    name: "cooldown",
    category: CommandCategory.Economy,
    description:
        "Displays the remaining cooldown for all or a specific command.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;

        const userExists: boolean = await doesUserExists(senderUsername);
        if (!userExists)
    },
};
