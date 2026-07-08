import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const randompicCommand: Command = {
    name: "randompic",
    category: CommandCategory.Fun,
    description: "Displays a random picture from picsum.photos.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        const imageUrl = "https://picsum.photos/350";

        const response = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await response.arrayBuffer());
        const mimetype = response.headers.get("content-type") ?? "image/jpeg";

        const mxcUrl = await client.uploadContent(imageBuffer, mimetype, "randompic.jpg");

        await client.sendMessage(roomId, {
            "m.relates_to": {
                "m.in_reply_to": {
                    event_id: event["event_id"],
                },
            },
            msgtype: "m.image",
            body: "random image",
            url: mxcUrl,
            info: {
                mimetype,
                size: imageBuffer.length,
                w: 350,
                h: 350
            },
        });
    },
};
