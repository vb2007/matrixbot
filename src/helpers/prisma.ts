import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { DATABASE_URL } from "./dotenv";

const connectionString: string = DATABASE_URL;

const prismaPgAdapter = new PrismaPg({ connectionString });

export const prismaClient = new PrismaClient({ prismaPgAdapter });
