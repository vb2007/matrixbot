import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";

export const randompicCommand: Command = {
    name: "randompic",
    category: CommandCategory.Fun,
    description: "Displays a random picture from picsum.photos.",
    async execute({ client, roomId, event }: CommandContext): Promise<void> {
        const image = "https://picsum.photos/350";

        await client.sendMessage(roomId, {
            "m.relates.to": {
                "m.in_reply_to": {
                    event_id: event["event_id"],
                },
            },
            msgtype: "m.image",
            body: "random image",
            url: "mxcUrl",
            info: {
                mimetype: "image/png",
                imageBuffer.length,
                w: 350,
                h: 350
            },
        });
    },
};
