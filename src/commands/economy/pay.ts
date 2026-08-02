import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import { PREFIX } from "../../helpers/dotenv";

const MENTION_HREF_REGEX = /https:\/\/matrix\.to\/#\/(@[^"]+)/;

function resolveTargetUsername(
    usernameToken: string,
    senderUsername: string,
    content: any
): string | null {
    const mentionedUserIds: string[] = (
        content["m.mentions"]?.user_ids ?? []
    ).filter((userId: string) => userId !== senderUsername);

    if (mentionedUserIds.length > 0) {
        return mentionedUserIds[0];
    }

    const formattedBodyMatch: RegExpMatchArray | null | undefined =
        content.formatted_body?.match(MENTION_HREF_REGEX);
    if (formattedBodyMatch) {
        return formattedBodyMatch[1];
    }

    if (/^@[^:]+:.+/.test(usernameToken)) {
        return usernameToken;
    }

    return null;
}

export const payCommand: Command = {
    name: "pay",
    category: CommandCategory.Economy,
    description: "Pays a set amount of credits to the specified user",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;
        const content: any = event.content;
        const contentBody: string = content.body;
        const userInput: string = (
            contentBody.split(`${PREFIX}${this.name} `)[1] ?? ""
        ).trim();

        if (!userInput) {
            return await client.replyNotice(
                roomId,
                event,
                `Please specify a user and an amount (e.g.: ${PREFIX}${this.name} @user:server.com 100).`
            );
        }

        const tokens: string[] = userInput.split(/\s+/);
        const amountToken: string = tokens.pop() as string;
        const usernameToken: string = tokens.join(" ");

        const targetUsername: string | null = resolveTargetUsername(
            usernameToken,
            senderUsername,
            content
        );

        if (!targetUsername) {
            return await client.replyNotice(
                roomId,
                event,
                "Couldn't determine who to pay. Mention the user or provide their full Matrix ID (e.g.: @user:server.com)."
            );
        }

        if (targetUsername === senderUsername) {
            return await client.replyNotice(
                roomId,
                event,
                "You can't pay yourself."
            );
        }

        const amount: number = Number(amountToken);
        if (!Number.isInteger(amount) || amount <= 0) {
            return await client.replyNotice(
                roomId,
                event,
                "Please provide a valid, positive whole number as the amount."
            );
        }

        return await client.replyNotice(
            roomId,
            event,
            `You've paid +${amount} credits to ${targetUsername}.`
        );
    },
};
