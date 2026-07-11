import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import {
    createUser,
    doesUserExist,
    updateBalance,
} from "../../database/models/economy";

export const workCommand: Command = {
    name: "work",
    category: CommandCategory.Economy,
    description: "Lets you work for a random amount of money.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        const senderUsername: string = event.sender;

        const amount: number = Math.floor(Math.random() * 100);

        const isInDB: boolean = await doesUserExist(senderUsername);
        if (!isInDB) {
            await createUser(senderUsername, amount);
        }

        await updateBalance(senderUsername, amount, "increment");

        return await client.replyNotice(roomId, event, `Worked, +${amount}`);
    },
};
