import { MatrixAuth, MatrixClient } from "@vector-im/matrix-bot-sdk";

// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).
const homeserverUrl: string = "https://example.org";

const auth: MatrixAuth = new MatrixAuth(homeserverUrl);
const client: MatrixClient = await auth.passwordRegister(
    "username",
    "password"
);

console.log(
    "Copy this access token to your bot's config: ",
    client.accessToken
);
