import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import {
    doesUserExists,
    getEconomyActionTime,
} from "../../database/models/economy";

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

        const lastActionTime: Date | null = await getEconomyActionTime(
            senderUsername,
            "lastWorkTime"
        );
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
            "You don't have an active cooldown on this command.."
        );
    },
};
