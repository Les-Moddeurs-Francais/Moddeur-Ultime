import {BotEvent} from "../types";
import {EmbedBuilder, Events, Interaction, TextChannel} from "discord.js";
import {SUGGESTION_CHANNEL} from "../utils/id";
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

export default event;