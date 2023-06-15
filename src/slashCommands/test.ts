import {
    ActionRowBuilder,
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    ModalBuilder,
    PermissionsBitField,
    TextInputBuilder,
    TextInputStyle
} from "discord.js"
import {BotApplicationCommand} from "../types";

export const command: BotApplicationCommand = {
    name: 'Accepter la suggestion',
    data: new ContextMenuCommandBuilder()
        .setName("Accepter la suggestion")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction: ContextMenuCommandInteraction) => {

        const acceptReason = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Raison')
            .setStyle(TextInputStyle.Paragraph);

        const reasonRow = new ActionRowBuilder<TextInputBuilder>().addComponents(acceptReason);

        const acceptSuggestionModal = new ModalBuilder()
            .setCustomId("acceptSuggestion")
            .setTitle("Accepter la suggestion")
            .setComponents(reasonRow);

        await interaction.showModal(acceptSuggestionModal);

        const filter = (interaction) => interaction.customId === 'acceptSuggestion';

        interaction.awaitModalSubmit({ filter, time: 15_000 })
            .then(async interaction => {
                await interaction.reply({content: "La suggestion a été approuvée !", ephemeral: true});
            })
            .catch(console.error);
    }
}