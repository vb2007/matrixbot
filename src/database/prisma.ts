import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { DATABASE_URL } from "../helpers/dotenv";

const connectionString: string = DATABASE_URL;

const adapter: PrismaPg = new PrismaPg({ connectionString });
export const prismaClient: PrismaClient = new PrismaClient({ adapter });
