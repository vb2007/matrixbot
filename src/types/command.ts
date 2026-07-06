import { MatrixClient } from "@vector-im/matrix-bot-sdk";
import { CommandCategory } from "./commandCategory";

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
