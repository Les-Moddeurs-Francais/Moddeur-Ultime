import {BotEvent} from "../types";
import {ButtonInteraction, EmbedBuilder, Events, GuildMember, Interaction, Role, TextChannel} from "discord.js";
import {DISCORD_ROLE, DOC_ROLE, FORGE_ROLE, MU_ROLE, SUGGESTION_CHANNEL} from "../utils/id";
import {rules} from "../utils/rules";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (interaction.isChatInputCommand()){
            const command = interaction.client.slashCommands.get(interaction.commandName);

            if (!command) return;

            await command.execute(interaction);
        }

        if(interaction.isModalSubmit()){
            const userName = interaction.user.username
            const userAvatarUrl = interaction.user.displayAvatarURL()
            const suggestionChannel = interaction.client.channels.cache.get(SUGGESTION_CHANNEL) as TextChannel;
            const suggestionTitle = interaction.fields.getTextInputValue("suggestion_title");
            const suggestionDescription = interaction.fields.getTextInputValue("suggestion_description");
            const embed = new EmbedBuilder()
                .setTitle(`${suggestionTitle}`)
                .setColor("#15ff67")
                .setAuthor({ name: `${userName}`, iconURL: `${userAvatarUrl}` })
                .setTimestamp()
                .setDescription(`${suggestionDescription}`)
            await suggestionChannel.send({embeds: [embed]})
                .then(msg => {
                    msg.react("✅")
                    msg.react("❎")
                    msg.startThread({
                        name: `${suggestionTitle}`,
                        autoArchiveDuration: 60 * 24 * 7,
                    });
                })


            await interaction.reply({ content: "Votre suggestion a bien été prise en compte", ephemeral: true });

        }

        if(interaction.isButton()){
            let buttonId:string = interaction.customId;
            let member = interaction.member as GuildMember;

            switch (buttonId){
                case "documenation": {
                    await modifyNotifRole(DOC_ROLE, "la documentation", member, interaction)
                    break;
                }
                case "moddeur_ultime": {
                    await modifyNotifRole(MU_ROLE, "le bot **Moddeur Ultime**", member, interaction)
                    break;
                }
                case "forge": {
                    await modifyNotifRole(FORGE_ROLE, "Minecraft Forge", member, interaction)
                    break;
                }
                case "discord": {
                    await modifyNotifRole(DISCORD_ROLE, "le serveur Discord **Les Moddeurs Français**", member, interaction)
                    break;
                }
                default:
                    interaction.reply({content: "Aucun rôle n'a été modifié" , ephemeral: true})
            }
        }

        if(interaction.isAutocomplete()){
            if(interaction.commandName == "rules"){
                const focusedValue = interaction.options.getFocused();
                const filtered = rules.rules.filter(rule => rule.title.toString().includes(focusedValue));
                await interaction.respond(
                    filtered.map(rule => ({ name: "Règle " + getIndexOf(rules.rules, rule.title) + " - " + rule.title, value: getIndexOf(rules.rules, rule.title) })),
                );
            }
        }
    },
}

function getIndexOf(data, title){
    let index = data.findIndex(function(item, i){
        return item.title === title
    });
    return index + 1
}

async function modifyNotifRole(roleId: string, middleMessage: string, member: GuildMember, interaction:ButtonInteraction) {
    const role:Role = member.guild.roles.cache.get(roleId);
    if (member.roles.cache.find(r => r.id === roleId)) {
        await member.roles.remove(role)
        await interaction.reply({
            content: `Le rôle pour les notifications concernant ${middleMessage}, vous a été retiré !`,
            ephemeral: true
        });
    } else {
        await member.roles.add(role)
        await interaction.reply({
            content: `Le rôle pour les notifications concernant ${middleMessage}, vous a été ajouté !`,
            ephemeral: true
        })
    }
}

export default event;