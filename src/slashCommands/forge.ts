import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {ApplicationCommand, ForgeVersions} from "../types";

export const command: ApplicationCommand = {
    name: 'forge',
    data: new SlashCommandBuilder()
        .setName('forge')
        .setDescription("Retourne la version la plus récente de Forge pour une version de Minecraft donnée")
        .addStringOption((option) => {
            return option
                .setName("version")
                .setDescription("Version de Minecraft")
                .setRequired(true)
        }),
    async execute(interaction: ChatInputCommandInteraction) {
        const minecraftVersion = interaction.options.get('version').value as string;

        let forgeVersionsJson = await fetch("https://files.minecraftforge.net/maven/net/minecraftforge/forge/promotions_slim.json")
        let forgeVersions = await forgeVersionsJson.json() as ForgeVersions

        let latest = forgeVersions.promos[minecraftVersion + '-latest']
        let recommended = forgeVersions.promos[minecraftVersion + '-recommended']

        if(latest){
            let resultEmbed = new EmbedBuilder()
                .setTitle(`Versions de Forge pour la ${minecraftVersion}`)
                .setColor("#15ff67")

            if(recommended)
                resultEmbed.addFields({name: `Version recommandée`, value: `\`${minecraftVersion} - ${recommended}\``, inline:false})

            resultEmbed.addFields({name: `Version la plus récente`, value: `\`${minecraftVersion} - ${latest}\``, inline:false})

            await interaction.reply({
                embeds: [resultEmbed]
            })
        }else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Cette version n'existe pas ou n'a pas encore été publiée par Forge !")
                        .setColor("#FF4922")
                ]
            })
        }
    }
}