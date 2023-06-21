import * as dotenv from 'dotenv';
import {after, describe, test} from 'node:test';
import {Client, GatewayIntentBits} from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

dotenv.config();

describe("general bot test suite", function() {
    test("test login", async () => {
        await client.login(process.env.DISCORD_TOKEN);
    });
    after(() => client.destroy());
});