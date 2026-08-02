import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import { PREFIX } from "../../helpers/dotenv";

export const payCommand: Command = {
    name: "pay",
    category: CommandCategory.Economy,
    description: "Pays a set amount of credits to the specified user",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;
        const content: string = event.content;
        const contentBody: string = event.content.body;
        const userInput: string = contentBody.split(
            `${PREFIX}${this.name} `
        )[1];

        console.log(content);
        console.log(senderUsername);
        console.log(contentBody);

        return await client.replyNotice(
            roomId,
            event,
            `You've paid +${userInput} credits to xy.`
        );
    },
};
