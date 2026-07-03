import { MatrixClient } from "@vector-im/matrix-bot-sdk";

export interface Command {
    name: string;
    description: string;
    category: CommandCategory;
    execute: (context: CommandContext) => Promise<any>;
}

export interface CommandContext {
    client: MatrixClient;
    roomId: string;
    event: any;
    args: string[];
}

export const CommandCategory = {
    Administration: "Administraton",
    Economy: "Economy",
    Fun: "Fun",
    Moderation: "Moderation",
    Utility: "Utility",
} as const;

type CommandCategory =
    (typeof CommandCategory)[keyof typeof CommandCategory];