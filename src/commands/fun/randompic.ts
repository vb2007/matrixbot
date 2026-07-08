import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const randompicCommand: Command = {
    name: "randompic",
    category: CommandCategory.Fun,
    description: "Displays a random picture from picsum.photos.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        const imageUrl = "https://picsum.photos/350";

        const response: Response = await fetch(imageUrl);
        const imageBuffer: Buffer<ArrayBuffer> = Buffer.from(
            await response.arrayBuffer()
        );
        const mimetype: string =
            response.headers.get("content-type") ?? "image/jpeg";

        const mxcUrl: string = await client.uploadContent(
            imageBuffer,
            mimetype,
            "randompic.jpg"
        );

        await client.sendMessage(roomId, {
            "m.relates_to": {
                "m.in_reply_to": {
                    event_id: event["event_id"],
                },
            },
            msgtype: "m.image",
            //body: "buffer",
            url: mxcUrl,
            info: {
                mimetype,
                size: imageBuffer.length,
                w: 350,
                h: 350,
            },
        });
    },
};
