import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js"
import {BotApplicationCommand} from "../types";

export const command: BotApplicationCommand = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retourne la latence du bot"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply({
            content: `${interaction.client.ws.ping}ms!`
        })
    }
}