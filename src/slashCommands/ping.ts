import {SlashCommandBuilder} from "discord.js"
import {SlashCommand} from "../types";

export const command: SlashCommand = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retourne la latence du bot"),
    execute: async (interaction) => {
        await interaction.reply({
            content: `${interaction.client.ws.ping}ms!`
        })
    }
}