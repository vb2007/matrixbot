import { Command, CommandCategory, CommandContext } from "../../types/command";

export const pingCommand: Command = {
    name: "ping",
    description: "Pong!",
    category: CommandCategory.Utility,
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        await client.replyNotice(roomId, event, "Pong!");
    },
};
