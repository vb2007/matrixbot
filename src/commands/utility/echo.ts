import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const echoCommand: Command = {
    name: "echo",
    category: CommandCategory.Utility,
    description: "Echoes back your input.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        const contentBody: string = event.content.body;
        const userInput: string = contentBody.split(`!${this.name} `)[1];

        await client.replyNotice(roomId, event, userInput);
    },
};
