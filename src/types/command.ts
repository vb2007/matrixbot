import { MatrixClient } from "@vector-im/matrix-bot-sdk";

export interface CommandContext {
    client: MatrixClient;
    roomId: string;
    event: any;
    args: string[];
}

export interface Command {
    name: string;
    description: string;
    execute: (context: CommandContext) => Promise<any>;
}
