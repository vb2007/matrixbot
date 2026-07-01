import { Command, CommandContext } from "../types/command";

export const pingCommand: Command = {
    name: "ping",
    description: "Pong!",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        await client.replyNotice(roomId, event, "Pong!");
    },
};
