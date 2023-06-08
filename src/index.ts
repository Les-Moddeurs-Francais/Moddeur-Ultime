import * as dotenv from 'dotenv';
import {Client, Collection, GatewayIntentBits, Partials} from 'discord.js';
import {join} from 'path';
import {readdirSync} from 'fs';
import {ApplicationCommand} from "./types";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
      Partials.Channel
  ]
});

client.applicationCommands = new Collection<string, ApplicationCommand>();

const handlersDir = join(__dirname, "./handlers");

readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);