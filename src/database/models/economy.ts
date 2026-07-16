import { prismaClient } from "../prisma";
import { Economy, EconomyActionTimes } from "../../../generated/prisma/client";

type BalanceUpdateActions = "increment" | "decrement";
type EconomyActionTypes = "lastWorkTime";

export const doesUserExists = async (username: string): Promise<boolean> => {
    const userQuery: Economy | null = await prismaClient.economy.findUnique({
        where: { username },
    });

    return !!userQuery;
};

export const getEconomyActionTime = async (
    username: string,
    actionType: EconomyActionTypes
): Promise<Date | null> => {
    const result = await prismaClient.economyActionTimes.findFirst({
        where: { username },
        select: { [actionType]: true },
    });

    return result ? (result[actionType] as Date | null) : null;
};

export const getEconomyActionTimes = async (
    username: string
): Promise<EconomyActionTimes | null> => {
    return prismaClient.economyActionTimes.findFirst({
        where: { username },
    });
};

export const createUser = async (
    username: string,
    balance: number,
    actionType: EconomyActionTypes
): Promise<void> => {
    try {
        await prismaClient.economy.create({
            data: {
                username: username,
                balance: balance,
                firstInteractionTime: new Date(),
            },
        });

        await prismaClient.economyActionTimes.create({
            data: {
                username: username,
                [actionType]: new Date(),
            },
        });
    } catch (ex) {
        console.error(ex);

        throw new Error("Unable to create user");
    }
};

export const updateBalance = async (
    username: string,
    balance: number,
    action: BalanceUpdateActions,
    actionType: EconomyActionTypes
): Promise<any> => {
    try {
        await prismaClient.economy.update({
            where: { username },
            data: {
                balance: {
                    [action]: balance,
                },
            },
        });

        return prismaClient.economyActionTimes.update({
            where: { username },
            data: {
                [actionType]: new Date(),
            },
        });
    } catch (ex) {
        console.error(ex);

        throw new Error("Unable to update balance");
    }
};
