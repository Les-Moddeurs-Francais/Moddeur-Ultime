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
            .then(async interactionTwo => {
                const message  = (<MessageContextMenuCommandInteraction>interaction).targetMessage;

                if(message.embeds.length === 1){
                    const embed = new EmbedBuilder()
                        .setTitle(`${message.embeds[0].title}`)
                        .setColor("#15ff67")
                        .setAuthor({ name: `${message.embeds[0].author.name}`, iconURL: `${message.embeds[0].author.iconURL}` })
                        .setTimestamp()
                        .setDescription(`${message.embeds[0].description}`)
                        .addFields({ name: `Raison de ${interaction.member.user.username}`, value: `${interactionTwo.fields.getTextInputValue("reason")}` },)

                    await message.edit({embeds: [embed]})

                    if(message.hasThread)
                        await message.thread.setArchived(true)

                    await interactionTwo.reply({content: "La suggestion a été approuvée !", ephemeral: true});
                }
            })
            .catch(console.error);
    }
}