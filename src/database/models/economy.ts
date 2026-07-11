import { prismaClient } from "../prisma";
import { Economy, EconomyActionTimes } from "../../../generated/prisma/client";

type BalanceUpdateAction = "increment" | "decrement";

export const doesUserExists = async (username: string): Promise<boolean> => {
    const userQuery: Economy | null = await prismaClient.economy.findUnique({
        where: { username },
    });

    return !!userQuery;
};

export const createUser = async (
    username: string,
    balance: number
): Promise<any> => {
    const economyQuery: Economy | null = await prismaClient.economy.create({
        data: {
            username: username,
            balance: balance,
            firstInteractionTime: new Date(),
        },
    });

    const economyActionTimesQuery: EconomyActionTimes =
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
