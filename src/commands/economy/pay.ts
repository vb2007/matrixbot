import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const payCommand: Command = {
    name: "pay",
    category: CommandCategory.Economy,
    description: "Pays a set amount of credits to the specified user",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;
        const contentBody: string = event.content.body;
    },
};
