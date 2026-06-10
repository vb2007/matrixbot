import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    RustSdkCryptoStorageProvider,
} from "@vector-im/matrix-bot-sdk";
import { StoreType } from "@matrix-org/matrix-sdk-crypto-nodejs";

import { ACCESS_TOKEN, HOMESERVER_URL } from "./helpers/dotenv";
import { pingCommand } from "./commands/ping";
import { Command } from "./types/command";

const storageProvider: SimpleFsStorageProvider = new SimpleFsStorageProvider(
    "./src/data/bot-store.json"
);
const cryptoProvider: RustSdkCryptoStorageProvider =
    new RustSdkCryptoStorageProvider(
        "./src/data/crypto-store",
        StoreType.Sqlite
    );

const client: MatrixClient = new MatrixClient(
    HOMESERVER_URL,
    ACCESS_TOKEN,
    storageProvider,
    cryptoProvider
);

// Autojoining is typical of bots to ensure they can be easily added to any room.
AutojoinRoomsMixin.setupOnClient(client);

const allCommands: Command[] = [pingCommand];
export const commandMap = new Map<string, Command>();

for (const command of allCommands) {
    commandMap.set(command.name, command);
}

const PREFIX = "!";

const handleCommand = async (roomId: string, event: any) => {
    // Exclude non-text , redacted, or bot's messages
    if (event["content"]?.["msgtype"] !== "m.text") return;
    if (event["sender"] === (await client.getUserId())) return;

    const body: any = event["content"]["body"];
    if (typeof body !== "string" || !body.startsWith(PREFIX)) return;

    const raw: string = body.slice(PREFIX.length).trim();
    if (!raw) return;

    const [name, ...args] = raw.split(/\s+/);
    const command: Command | undefined = commandMap.get(name.toLowerCase());
    if (!command) return;

    try {
        await command.execute({ client, roomId, event, args });
    } catch (err) {
        console.error(`Command "${name}" failed:`, err);

        await client.replyNotice(
            roomId,
            event,
            "Something went wrong while executing that command."
        );
    }
};

client.on("room.message", handleCommand);

// This will start the sync loop and run until killed.
client.start().then((): void => console.log("Bot started!"));

// Error handling if decryption fails
client.on(
    "room.failed_decryption",
    (roomId: string, event: any, error: Error): void => {
        console.error(`Failed to decrypt event in ${roomId}:`, error);
    }
);
