import dotenv from "dotenv";
dotenv.config();

const requireEnvironmentVariable = (key: string): string => {
    const value: string | undefined = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const HOMESERVER_URL: string =
    requireEnvironmentVariable("HOMESERVER_URL");
export const ACCESS_TOKEN: string = requireEnvironmentVariable("ACCESS_TOKEN");
export const USERNAME: string = requireEnvironmentVariable("USERNAME");
export const PASSWORD: string = requireEnvironmentVariable("PASSWORD");
