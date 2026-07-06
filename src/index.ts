import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    RustSdkCryptoStorageProvider,
} from "@vector-im/matrix-bot-sdk";
import { StoreType } from "@matrix-org/matrix-sdk-crypto-nodejs";

import { ACCESS_TOKEN, HOMESERVER_URL } from "./helpers/dotenv";

import { handleCommand } from "./helpers/commands/commandHandler";

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

client.on("room.message", (roomId: string, event: any): Promise<void> =>
    handleCommand(client, roomId, event)
);

// This will start the sync loop and run until killed.
client.start().then((): void => console.log("Bot started!"));

// Error handling if decryption fails
client.on(
    "room.failed_decryption",
    (roomId: string, event: any, error: Error): void => {
        console.error(
            `Failed to decrypt event.\n\tRoom ID: ${roomId}\n\tEvent: ${event}\n\tError: ${error.message}`
        );
    }
);
