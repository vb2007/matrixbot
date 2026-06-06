import dotenv from "dotenv";
dotenv.config();

const requireEnvironmentVariable = (key: string): string => {
    const value: string | undefined = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const ACCESS_TOKEN: string | undefined =
    requireEnvironmentVariable("ACCESS_TOKEN");
export const USERNAME: string | undefined =
    requireEnvironmentVariable("USERNAME");
export const PASSWORD: string | undefined =
    requireEnvironmentVariable("PASSWORD");
