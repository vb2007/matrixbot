import { Command } from "../types/command";

export const pingCommand: Command = {
    name: "ping",
    description: "Pong!",
    async execute({ client, roomId, event }) {
        await client.replyNotice(roomId, event, "Pong!");
    },
};
