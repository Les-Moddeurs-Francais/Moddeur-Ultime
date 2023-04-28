import {PermissionsBitField, SlashCommandBuilder} from "discord.js"
import {SlashCommand} from "../types";

export const command: SlashCommand = {
    name: 'message',
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Retourne la latence du bot")
        .addStringOption((option) => {
            return option
                .setName("contenu")
                .setDescription("Contenu du message à envoyer")
                .setRequired(true)
        })
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction) => {
        await interaction.channel.send({
            content: `${interaction.options.getString("contenu")}`
        })
        await interaction.reply({
            content: `Le message a été envoyé !`,
            ephemeral: true
        })
    }
}