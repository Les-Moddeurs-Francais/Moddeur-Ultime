import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js"
import {AlgoliaHit, BotApplicationCommand} from "../types";
import algoliasearch from "algoliasearch";

export const command: BotApplicationCommand = {
    name: 'doc',
    data: new SlashCommandBuilder()
        .setName('doc')
        .setDescription("Retourne une ou plusieurs pages de la documentation selon des mots clés")
        .addStringOption((option) => {
            return option
                .setName("search")
                .setDescription("Mots clé")
                .setRequired(true)
        })
        .addStringOption((option) => {
            return option
                .setName("version")
                .setDescription("Version de Minecraft")
        }),
    async execute(interaction: ChatInputCommandInteraction) {
        let search = interaction.options.get('search').value as string;
        let minecraftVersion = interaction.options.getString("version")

        if(minecraftVersion)
            minecraftVersion = minecraftVersion.split('.')[0] + "." + minecraftVersion.split('.')[1];

        let versionsJson = await fetch("https://raw.githubusercontent.com/Les-Moddeurs-Francais/Documentation-Forge/master/versions.json").then(res => res.json());
        let versions = await versionsJson as string[];

        const versionL = "1." + (parseInt(versions[0].replace("1.", '').replace(".x", ''), 10) + 1);

        const algoliaClient = algoliasearch("BR2QYUV5GS", "9f64b631b5fe2ec0a5b57cfdb1fd5e3c");

        const algoliaIndex = algoliaClient.initIndex('forge-lesmoddeursfrancais');

        algoliaIndex.search<AlgoliaHit>(search,{
            hitsPerPage: 25,
            facetFilters: [
                minecraftVersion ? minecraftVersion === versionL ? "version:current" : "version:" + minecraftVersion + ".x" : ""
            ],
            attributesToRetrieve: [
                'version',
                'url',
                'hierarchy'
            ]
        }).then(async ({hits}) => {

            if (hits === undefined || hits.length === 0) {
                let embed = minecraftVersion ?
                    new EmbedBuilder()
                        .setTitle(`Aucun résultat ne correspond à votre recherche pour la version ${minecraftVersion}`)
                        .setColor("#FF4922")
                    :
                    new EmbedBuilder()
                        .setTitle("Aucun résultat ne correspond à votre recherche")
                        .setColor("#FF4922")

                await interaction.reply({
                    embeds: [embed]
                })
            }else {
                const pages = hits.filter(pages => {
                    return !pages.url.includes("#")
                });

                if(pages.length > 0){
                    let resultEmbed = new EmbedBuilder()
                        .setTitle("Liste des pages disponibles")
                        .setColor("#15ff67");

                    for (let i = 0; i < pages.length; i++){
                        let pageVersion = pages[i].version[0] === 'current' ? `${versionL}.x` : pages[i].version[0]

                        resultEmbed.addFields({name: `[${pageVersion}] ${pages[i].hierarchy.lvl1}`, value: `${pages[i].url}`, inline: false})
                    }

                    await interaction.reply({
                        embeds: [resultEmbed]
                    })
                }else {
                    let embed = minecraftVersion ?
                        new EmbedBuilder({
                            title: "Aucun résultat ne correspond à votre recherche pour la version " + minecraftVersion,
                            color: 0xFF4922
                        }) :
                        new EmbedBuilder({
                            title: "Aucun résultat ne correspond à votre recherche",
                            color: 0xFF4922
                        })

                    await interaction.reply({embeds: [embed]});
                }
            }
        });
    }
}