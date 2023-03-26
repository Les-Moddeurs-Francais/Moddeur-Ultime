import {ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle} from "discord.js"
import { SlashCommand } from "../types";

export const command: SlashCommand = {
    name: 'suggestion',
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("Permet de nous faire part de vos suggestions grace à une interface"),
    execute: async (interaction) => {
        const suggestionTitle = new TextInputBuilder()
            .setCustomId("suggestion_title")
            .setLabel("Titre de la suggestion")
            .setStyle(TextInputStyle.Short);

        const suggestionDescription = new TextInputBuilder()
            .setCustomId('suggestion_description')
            .setLabel('Description')
            .setStyle(TextInputStyle.Paragraph);

        const titleRow = new ActionRowBuilder<TextInputBuilder>().addComponents(suggestionTitle);
        const descriptionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(suggestionDescription);

        const suggestionModal = new ModalBuilder()
            .setCustomId("suggestion")
            .setTitle("Suggestion")
            .setComponents(titleRow, descriptionRow);

        await interaction.showModal(suggestionModal);
    }
}