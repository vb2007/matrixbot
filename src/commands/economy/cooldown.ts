import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import {
    doesUserExists,
    getEconomyActionTime,
    getEconomyActionTimes,
} from "../../database/models/economy";
import { PREFIX } from "../../helpers/dotenv";
import { EconomyActionTimes } from "../../../generated/prisma/client";

export const cooldownCommand: Command = {
    name: "cooldown",
    category: CommandCategory.Economy,
    description:
        "Displays the remaining cooldown for all or a specific command.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;

        const userExists: boolean = await doesUserExists(senderUsername);
        if (!userExists) {
            return await client.replyNotice(
                roomId,
                event,
                "You haven't had any transactions yet, thus you have no cooldown on any command."
            );
        }

        let lastActionTime: Date | null = null;
        const contentBody: string = event.content.body;
        const userInput: string = contentBody.split(
            `${PREFIX}${this.name} `
        )[1];

        switch (userInput) {
            case "":
            case undefined:
                //all command cooldown will get returned here, once there are more commands
                const allActionTimes: EconomyActionTimes | null =
                    await getEconomyActionTimes(senderUsername);

                console.log(allActionTimes);
                return await client.replyNotice(
                    roomId,
                    event,
                    "Temporarily unavailable."
                );

            case "work":
                lastActionTime = await getEconomyActionTime(
                    senderUsername,
                    "lastWorkTime"
                );

                break;

            default:
                return await client.replyNotice(
                    roomId,
                    event,
                    "Invalid command parameter: please provide a command's name clearly after this command's name (e.x.: !cooldown work)."
                );
        }

        if (!lastActionTime) {
            return await client.replyNotice(
                roomId,
                event,
                "You haven't used this command yet, thus you have no cooldown on it."
            );
        }

        const diffMs: number = Date.now() - lastActionTime.getTime();
        const twoMinutesMs: number = 2 * 60 * 1000;

        if (diffMs < twoMinutesMs) {
            const remainingMs: number = twoMinutesMs - diffMs;
            const remainingSeconds: number = Math.ceil(remainingMs / 1000);

            const minutes: number = Math.floor(remainingSeconds / 60);
            const seconds: number = Math.floor(remainingSeconds % 60);

            return await client.replyNotice(
                roomId,
                event,
                `The command's cooldown is at ${minutes}m ${seconds}s.`
            );
        }

        return await client.replyNotice(
            roomId,
            event,
            "You don't have an active cooldown on this command."
        );
    },
};
