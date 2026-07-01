import { Command, CommandContext } from "../types/command";

export const echoCommand: Command = {
    name: "echo",
    description: "Echoes back your input.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        const input: string = "";
    },
};
