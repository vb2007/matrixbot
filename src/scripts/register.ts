import { MatrixAuth, MatrixClient } from "@vector-im/matrix-bot-sdk";
import { USERNAME, PASSWORD, HOMESERVER_URL } from "../helpers/dotenv";

const auth: MatrixAuth = new MatrixAuth(HOMESERVER_URL);
const client: MatrixClient = await auth.passwordRegister(USERNAME, PASSWORD);

console.log(
    "Copy this access token to your bot's config: ",
    client.accessToken
);
