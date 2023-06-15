import {
    ActionRowBuilder,
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    EmbedBuilder,
    MessageContextMenuCommandInteraction,
    ModalBuilder,
    PermissionsBitField,
    TextInputBuilder,
    TextInputStyle
} from "discord.js"
import {BotApplicationCommand} from "../types";

export const command: BotApplicationCommand = {
    name: 'Refuser la suggestion',
    data: new ContextMenuCommandBuilder()
        .setName("Refuser la suggestion")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction: ContextMenuCommandInteraction) => {

        const acceptReason = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Raison')
            .setStyle(TextInputStyle.Paragraph);

        const reasonRow = new ActionRowBuilder<TextInputBuilder>().addComponents(acceptReason);

        const denySuggestionModal = new ModalBuilder()
            .setCustomId("denySuggestion")
            .setTitle("Refuser la suggestion")
            .setComponents(reasonRow);

        await interaction.showModal(denySuggestionModal);

        const filter = (interaction) => interaction.customId === 'denySuggestion';

        interaction.awaitModalSubmit({ filter, time: 15_000 })
            .then(async interactionTwo => {
                const message  = (<MessageContextMenuCommandInteraction>interaction).targetMessage;

                if(message.embeds.length === 1){
                    const embed = new EmbedBuilder()
                        .setTitle(`${message.embeds[0].title}`)
                        .setColor("#FF4922")
                        .setAuthor({ name: `${message.embeds[0].author.name}`, iconURL: `${message.embeds[0].author.iconURL}` })
                        .setTimestamp()
                        .setDescription(`${message.embeds[0].description}`)
                        .addFields({ name: `Raison de ${interaction.member.user.username}`, value: `${interactionTwo.fields.getTextInputValue("reason")}` },)

                    await message.edit({embeds: [embed]})

                    await interactionTwo.reply({content: "La suggestion a été approuvée !", ephemeral: true});
                }
            })
            .catch(console.error);
    }
}