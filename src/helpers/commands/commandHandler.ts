import { commandMap } from "./commandLoader";
import { Command } from "../../types/command";
import { MatrixClient } from "@vector-im/matrix-bot-sdk";
import { PREFIX } from "../dotenv";

export const handleCommand = async (
    client: MatrixClient,
    roomId: string,
    event: any
): Promise<void> => {
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
