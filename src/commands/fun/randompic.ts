import { Command, CommandContext } from "../../types/command";
import { CommandCategory } from "../../types/commandCategory";
import { PREFIX } from "../../helpers/dotenv";

export const randompicCommand: Command = {
    name: "randompic",
    category: CommandCategory.Fun,
    description: "Displays a random picture from picsum.photos.",
    async execute({ client, roomId, event }: CommandContext): Promise<any> {
        let width: number = 350;
        let height: number = 350;

        const contentBody: string = event.content.body;
        const userInput: string = contentBody.split(
            `${PREFIX}${this.name} `
        )[1];
        console.log(`[randompic] ${userInput}`);

        const paramFormat = /^\d{1,4} \d{1,4}$/;

        if (userInput !== "" && userInput != undefined) {
            if (!paramFormat.test(userInput)) {
                return await client.replyNotice(
                    roomId,
                    event,
                    "If you provide parameters, they both must be numbers in a !randompic width height format."
                );
            }

            const params: string[] = userInput.split(" ");
            const parsedWidth: number = parseInt(params[0], 10);
            const parsedHeight: number = parseInt(params[1], 10);

            if (parsedWidth > 1000 || parsedHeight > 1000) {
                return await client.replyNotice(
                    roomId,
                    event,
                    "Width & height parameter must be less than or equal to 1000."
                );
            }

            width = parsedWidth;
            height = parsedHeight;
        }

        const imageUrl = `https://picsum.photos/${width}/${height}`;

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

        return await client.sendMessage(roomId, {
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
                w: width,
                h: height,
            },
        });
    },
};
