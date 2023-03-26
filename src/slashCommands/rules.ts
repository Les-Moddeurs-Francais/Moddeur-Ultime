import {EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {SlashCommand} from "../types";
import {rules} from "../utils/rules";

export const command: SlashCommand = {
    name: 'rules',
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription("Permet d'obtenir et d'afficher une règle spécifique selon son numéro")
        .addIntegerOption((option) => {
            return option
                .setName("numéro")
                .setDescription("Numéro de la règle")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(rules.rules.length)
                .setAutocomplete(true)
        }),
    async execute(interaction) {
        const ruleNumber = interaction.options.get('numéro').value as number;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Règle ${ruleNumber} - ${rules.rules[ruleNumber - 1].title}`)
                    .setDescription(rules.rules[ruleNumber - 1].text)
                    .setColor("#15ff67")
            ]
        })
    }
}