import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import {
    createUser,
    doesUserExists,
    getEconomyActionTime,
    updateBalance,
} from "../../database/models/economy";

export const workCommand: Command = {
    name: "work",
    category: CommandCategory.Economy,
    description: "Lets you work for a random amount of money.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;
        const amount: number = Math.floor(Math.random() * 100);

        const userExists: boolean = await doesUserExists(senderUsername);
        if (!userExists) {
            try {
                await createUser(senderUsername, amount, "lastWorkTime");
            } catch (ex) {
                return await client.replyNotice(
                    roomId,
                    event,
                    `There was an error during your first transaction.`
                );
            }

            return await client.replyNotice(
                roomId,
                event,
                `For your first shift, you've earned +${amount} credits for stirring cement.`
            );
        }

        const lastActionTime: Date | null = await getEconomyActionTime(
            senderUsername,
            "lastWorkTime"
        );
        if (lastActionTime) {
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
                    `You need to take a rest for ${minutes}m ${seconds}s.`
                );
            }
        }

        try {
            await updateBalance(
                senderUsername,
                amount,
                "increment",
                "lastWorkTime"
            );
        } catch (ex) {
            return await client.replyNotice(
                roomId,
                event,
                `There was an error during your balance update.`
            );
        }

        return await client.replyNotice(
            roomId,
            event,
            `You've earned +${amount} credits for stirring cement.`
        );
    },
};
