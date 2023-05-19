import {MessageFlags, PermissionsBitField, SlashCommandBuilder} from "discord.js"
import {SlashCommand} from "../types";

export const command: SlashCommand = {
    name: 'message',
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Envoie un message avec un contenu spécifique")
        .addStringOption((option) => {
            return option
                .setName("contenu")
                .setDescription("Contenu du message à envoyer")
                .setRequired(true)
        })
        .addBooleanOption((option) => {
            return option
                .setName("silencieux")
                .setDescription("Définit si le message est silencieux")
        })
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction) => {
        const content = interaction.options.getString("contenu")
        const isSilent = interaction.options.getBoolean("silencieux")

        await interaction.channel.send({ content: `${content}`, flags: isSilent ? [MessageFlags.SuppressNotifications] : [] });
        await interaction.reply({
            content: `Le message a été envoyé !`,
            ephemeral: true
        })
    }
}