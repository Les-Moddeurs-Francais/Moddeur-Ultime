import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    EmbedBuilder,
    MessageContextMenuCommandInteraction,
    PermissionsBitField,
    TextInputStyle
} from "discord.js"
import {BotApplicationCommand} from "../types";

export const command: BotApplicationCommand = {
    name: 'Réinitialiser la couleur',
    data: new ContextMenuCommandBuilder()
        .setName("Réinitialiser la couleur")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction: ContextMenuCommandInteraction) => {
        const message  = (<MessageContextMenuCommandInteraction>interaction).targetMessage;

        if(message.embeds.length === 1){
            const embed = new EmbedBuilder()
                .setTitle(`${message.embeds[0].title}`)
                .setAuthor({ name: `${message.embeds[0].author.name}`, iconURL: `${message.embeds[0].author.iconURL}` })
                .setTimestamp(new Date(message.embeds[0].timestamp))
                .setDescription(`${message.embeds[0].description}`)

            await message.edit({embeds: [embed]})

            await interaction.reply({content: "La suggestion a été approuvée !", ephemeral: true});
        }
    }
}