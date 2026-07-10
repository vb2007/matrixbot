import { prismaClient } from "../prisma";

export const doesUserExist = async (username: string): Promise<boolean> => {
    const userQuery = await prismaClient.economy.findUnique({
        where: { username },
    });

    return !!userQuery;
};
