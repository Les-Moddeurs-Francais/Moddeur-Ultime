import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {BotApplicationCommand, NeoForgeVersions} from "../types";

export const command: BotApplicationCommand = {
    name: 'neoforge',
    data: new SlashCommandBuilder()
        .setName('neoforge')
        .setDescription("Retourne la version la plus récente de NeoForge pour une version de Minecraft donnée")
        .addStringOption((option) => {
            return option
                .setName("version")
                .setDescription("Version de Minecraft")
                .setRequired(true)
        }),
    async execute(interaction: ChatInputCommandInteraction) {
        const minecraftVersion = interaction.options.get('version').value as string;

        let forgeVersionJson = await fetch(`https://maven.neoforged.net/api/maven/latest/version/releases/net%2Fneoforged%2Fforge?filter=${minecraftVersion}`)
        let forgeVersion = await forgeVersionJson.json() as NeoForgeVersions

        let latest = forgeVersion.version

        if(latest){
            let resultEmbed = new EmbedBuilder()
                .setTitle(`Versions de NeoForge pour la ${minecraftVersion}`)
                .setColor("#15ff67")

            resultEmbed.addFields({name: `Version la plus récente`, value: `\`${minecraftVersion} - ${latest}\``, inline:false})

            await interaction.reply({
                embeds: [resultEmbed]
            })
        }else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`La version ${minecraftVersion} n'existe pas ou n'a pas encore été publiée par NeoForge !`)
                        .setColor("#FF4922")
                ]
            })
        }
    }
}