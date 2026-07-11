import { prismaClient } from "../prisma";
// import { DateTimeFilter } from "../../../generated/prisma/commonInputTypes";
//
// export interface Economy {
//     username: string;
//     balance: number;
//     firstInteractionTime: number;
//
//     economyActionTimes: EconomyActionTimes;
// }
//
// export interface EconomyActionTimes {
//     username: Economy["username"];
//     lastWorkTime: DateTimeFilter;
// }

export const doesUserExist = async (username: string): Promise<boolean> => {
    const userQuery = await prismaClient.economy.findUnique({
        where: { username },
    });

    return !!userQuery;
};
