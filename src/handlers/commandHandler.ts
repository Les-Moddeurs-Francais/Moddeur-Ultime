import {Client, REST, Routes} from "discord.js";
import {readdirSync} from "fs";
import {join} from "path";
import {BotApplicationCommand} from "../types";
import {GUILD_ID} from "../utils/id";

module.exports = async (client: Client) => {
    const slashCommandsDir = join(__dirname, "../slashCommands");
    const body = [];

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js")) return;

        const command: BotApplicationCommand = require(`${slashCommandsDir}/${file}`).command;

        client.applicationCommands.set(command.name, command);
        body.push(command.data.toJSON());
    });


    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, GUILD_ID), { body: body });
        console.log('🌠 Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}