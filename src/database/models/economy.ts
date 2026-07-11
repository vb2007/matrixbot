import { prismaClient } from "../prisma";

export interface Economy {
    username: string;
    balance: number;
    firstInteractionTime: Date;
}

export interface EconomyActionTimes {
    username: Economy["username"];
    lastWorkTime: Date;
}

type BalanceUpdateAction = "increment" | "decrement";

export const doesUserExist = async (username: string): Promise<boolean> => {
    const userQuery = await prismaClient.economy.findUnique({
        where: { username },
    });

    return !!userQuery;
};

export const createUser = async (
    username: string,
    balance: number
): Promise<any> => {
    const economyQuery = await prismaClient.economy.create({
        data: {
            username: username,
            balance: balance,
            firstInteractionTime: new Date(),
        },
    });

    const economyActionTimesQuery =
        await prismaClient.economyActionTimes.create({
            data: {
                username: username,
                lastWorkTime: new Date(),
            },
        });
};

export const updateBalance = async (
    username: string,
    balance: number,
    action: BalanceUpdateAction
): Promise<Economy> => {
    return prismaClient.economy.update({
        where: { username },
        data: {
            balance: {
                [action]: balance,
            },
        },
    });
};
