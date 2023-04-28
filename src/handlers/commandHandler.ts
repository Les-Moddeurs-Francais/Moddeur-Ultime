import {Client, REST, Routes} from "discord.js";
import {readdirSync} from "fs";
import {join} from "path";
import {SlashCommand} from "../types";
import {GUILD_ID} from "../utils/id";

module.exports = async (client: Client) => {
    const slashCommandsDir = join(__dirname, "../slashCommands");
    const body = [];

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js")) return;

        const command: SlashCommand = require(`${slashCommandsDir}/${file}`).command;

        client.slashCommands.set(command.name, command);
        body.push(command.data.toJSON());
    });

    const bodyRules = [];

    bodyRules.push({
        enabled: true,
        form_fields: [
            {
                field_type: "TERMS",
                label: "Read and agree to the server rules",
                values: [
                    "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.",
                    "No spam or self-promotion (server invites, advertisements, etc) without permission from a staff member. This includes DMing fellow members."
                ],
                required: true
            }
        ],
        description: "Test Server"
    });

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, GUILD_ID), { body: body });
        await rest.patch(`/guilds/${GUILD_ID}/member-verification`, { body: bodyRules });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}