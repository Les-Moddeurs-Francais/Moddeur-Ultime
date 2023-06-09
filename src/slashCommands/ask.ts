import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {BotApplicationCommand} from "../types";

export const command: BotApplicationCommand = {
    name: 'ask',
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription("Try and see ^^ !"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Don't ask to ask, just ask !")
                    .setURL("https://dontasktoask.com/")
                    .setThumbnail("https://dontasktoask.com/favicon.png")
            ]
        })
    }
}