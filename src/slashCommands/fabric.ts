import {EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {LoaderVersion, MappingsVersion, ModrinthModVersion, SlashCommand} from "../types";

export const command: SlashCommand = {
    name: 'fabric',
    data: new SlashCommandBuilder()
        .setName('fabric')
        .setDescription("Retourne les dernières versions des outils de Fabric pour une version de Minecraft donnée")
        .addStringOption((option) => {
            return option
                .setName("version")
                .setDescription("Version de Minecraft")
                .setRequired(true)
        }),
    async execute(interaction) {
        const minecraftVersion = interaction.options.get('version').value as string;

        let fabricYarnVersionsJson = await fetch(`https://meta.fabricmc.net/v2/versions/yarn/${minecraftVersion}`)
        let fabricYarnVersions = await fabricYarnVersionsJson.json() as MappingsVersion[]

        let fabricLoaderVersionsJson = await fetch(`https://meta.fabricmc.net/v2/versions/loader/${minecraftVersion}`)
        let fabricLoaderVersions = await fabricLoaderVersionsJson.json() as LoaderVersion[]

        let fabricApiVersionsJson = await fetch(`https://api.modrinth.com/v2/project/fabric-api/version?game_versions=["${minecraftVersion}"]`)
        let fabricApiVersions = await fabricApiVersionsJson.json() as ModrinthModVersion[]

        if(fabricApiVersions.length > 0 || fabricYarnVersions.length > 0 || fabricLoaderVersions.length > 0){
            let resultEmbed = new EmbedBuilder()
                .setTitle(`Fabric  ${minecraftVersion}`)
                .setColor("#15ff67")

            if(fabricApiVersions.length > 0)
                resultEmbed.addFields({name: `Dernière version de l'api`, value: `\`${fabricApiVersions[0].version_number}\``, inline:false})

            if(fabricYarnVersions.length > 0)
                resultEmbed.addFields({name: `Dernière version des mappings`, value: `\`${fabricYarnVersions[0].version}\``, inline:false})

            if(fabricLoaderVersions.length > 0)
                resultEmbed.addFields({name: `Dernière version du loader`, value: `\`${fabricLoaderVersions[0].loader.version}\``, inline:false})

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