import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import { PREFIX } from "../../helpers/dotenv";

export const echoCommand: Command = {
    name: "echo",
    category: CommandCategory.Utility,
    description: "Echoes back your input.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const contentBody: string = event.content.body;
        const userInput: string = contentBody.split(
            `${PREFIX}${this.name} `
        )[1];

        if (userInput === "" || userInput == undefined) {
            return await client.replyNotice(
                roomId,
                event,
                "Nothing to echo back. Enter some content after the command."
            );
        }

        return await client.replyNotice(roomId, event, userInput);
    },
};
