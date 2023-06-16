import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {BotApplicationCommand, LoaderVersion, MappingsVersion, ModrinthModVersion} from "../types";

export const command: BotApplicationCommand = {
    name: 'quilt',
    data: new SlashCommandBuilder()
        .setName('quilt')
        .setDescription("Retourne les dernières versions des outils de QuiltMC pour une version de Minecraft donnée")
        .addStringOption((option) => {
            return option
                .setName("version")
                .setDescription("Version de Minecraft")
                .setRequired(true)
        }),
    async execute(interaction: ChatInputCommandInteraction) {
        const minecraftVersion = interaction.options.get('version').value as string;

        let quiltMappingsVersionsJson = await fetch(`https://meta.quiltmc.org/v3/versions/quilt-mappings/${minecraftVersion}`)
        let quiltMappingsVersions = await quiltMappingsVersionsJson.json() as MappingsVersion[]

        let quiltLoaderVersionsJson = await fetch(`https://meta.quiltmc.org/v3/versions/loader/${minecraftVersion}`)
        let quiltLoaderVersions = await quiltLoaderVersionsJson.json() as LoaderVersion[]

        let quiltApiVersionsJson = await fetch(`https://api.modrinth.com/v2/project/qsl/version?game_versions=["${minecraftVersion}"]`)
        let quiltApiVersions = await quiltApiVersionsJson.json() as ModrinthModVersion[]

        if(quiltApiVersions.length > 0 || quiltMappingsVersions.length > 0 || quiltLoaderVersions.length > 0){
            let resultEmbed = new EmbedBuilder()
                .setTitle(`QuiltMC ${minecraftVersion}`)
                .setColor("#15ff67")

            if(quiltApiVersions.length > 0)
                resultEmbed.addFields({name: `Dernière version de Quiled Fabric API`, value: `\`${quiltApiVersions[0].version_number}\``, inline:false})

            if(quiltMappingsVersions.length > 0)
                resultEmbed.addFields({name: `Dernière version des mappings`, value: `\`${quiltMappingsVersions[0].version}\``, inline:false})

            if(quiltLoaderVersions.length > 0)
                resultEmbed.addFields({name: `Dernière version du loader`, value: `\`${quiltLoaderVersions[0].loader.version}\``, inline:false})

            await interaction.reply({
                embeds: [resultEmbed]
            })
        }else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Cette version n'existe pas ou n'a pas encore été publiée !`)
                        .setColor("#FF4922")
                ]
            })
        }
    }
}