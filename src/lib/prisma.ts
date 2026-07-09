import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { DATABASE_URL } from "./dotenv";

const connectionString: string = DATABASE_URL;

const adapter: PrismaPg = new PrismaPg({ connectionString });
export const prismaClient: PrismaClient = new PrismaClient({ adapter });
