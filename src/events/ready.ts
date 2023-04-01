import {BotEvent} from "../types";
import {ButtonStyle, Client, EmbedBuilder, Events, TextChannel} from "discord.js";
import {rules} from "../utils/rules";
import {RULES_CHANNEL, RULES_MESSAGE} from "../utils/id";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log((`💪 Logged in as ${client.user?.tag}`))

        const rulesChannel = client.channels.cache.get(RULES_CHANNEL) as TextChannel;

        let rulesEmbed = new EmbedBuilder()
            .setTitle(rules.title)
            .setColor("#15ff67");

        for (let i = 0; i < rules.rules.length; i++){
            rulesEmbed.addFields({name: `Règle ${i + 1} - ${rules.rules[i].title}`, value: rules.rules[i].text, inline: false})
        }

        rulesChannel.messages.fetch(RULES_MESSAGE)
            .then(message => {
                if((rulesEmbed.toJSON().title !== message.embeds[0].title) || (JSON.stringify(rulesEmbed.toJSON().fields) !== JSON.stringify(message.embeds[0].fields)))
                    message.edit({content: "", embeds: [rulesEmbed]});
            });
    },
}

export default event;