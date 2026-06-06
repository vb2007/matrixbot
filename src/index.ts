import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
} from "@vector-im/matrix-bot-sdk";

// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).
const homeserverUrl: string = "https://example.org";

// Use the access token you got from login or registration above.
const accessToken: string = "ACQUIRED_FROM_ABOVE";

// In order to make sure the bot doesn't lose its state between restarts, we'll give it a place to cache
// any information it needs to. You can implement your own storage provider if you like, but a JSON file
// will work fine for this example.
const storage: SimpleFsStorageProvider = new SimpleFsStorageProvider(
    "hello-bot.json"
);

// Finally, let's create the client and set it to autojoin rooms. Autojoining is typical of bots to ensure
// they can be easily added to any room.
const client: MatrixClient = new MatrixClient(
    homeserverUrl,
    accessToken,
    storage
);
AutojoinRoomsMixin.setupOnClient(client);

// This is the command handler we registered a few lines up
const handleCommand = async (roomId: string, event: any) => {
    // Don't handle unhelpful events (ones that aren't text messages, are redacted, or sent by us)
    if (event["content"]?.["msgtype"] !== "m.text") return;
    if (event["sender"] === (await client.getUserId())) return;

    // Check to ensure that the `!hello` command is being run
    const body: any = event["content"]["body"];
    if (!body?.startsWith("!hello")) return;

    // Now that we've passed all the checks, we can actually act upon the command
    await client.replyNotice(roomId, event, "Hello world!");
};

// Before we start the bot, register our command handler
client.on("room.message", handleCommand);

// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then((): void => console.log("Bot started!"));
