import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import { PREFIX } from "../../helpers/dotenv";

export const echoCommand: Command = {
    name: "echo",
    category: CommandCategory.Utility,
    description: "Echoes back your input.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        const contentBody: string = event.content.body;
        const userInput: string = contentBody.split(
            `${PREFIX}${this.name} `
        )[1];

        let response: string =
            "Nothing to echo back. Enter some content after the command.";
        if (userInput !== "" && userInput != undefined) {
            response = userInput;
        }

        await client.replyNotice(roomId, event, response);
    },
};
