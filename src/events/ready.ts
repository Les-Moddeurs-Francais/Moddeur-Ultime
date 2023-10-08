import {ActivityType, Client, EmbedBuilder, Events} from "discord.js";
import {BotEvent} from "../types";
import {rules} from "../utils/rules";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log((`💪 Logged in as ${client.user?.tag}`))

        client.user.setActivity('activity', { type: ActivityType.Custom });

        let rulesEmbed = new EmbedBuilder()
            .setTitle(rules.title)
            .setColor("#15ff67");

        for (let i = 0; i < rules.rules.length; i++){
            rulesEmbed.addFields({name: `Règle ${i + 1} - ${rules.rules[i].title}`, value: rules.rules[i].text, inline: false})
        }

        client.guilds.cache.get(process.env.GUILD_ID).rulesChannel.messages.fetch(process.env.RULES_MESSAGE)
            .then(message => {
                if((rulesEmbed.toJSON().title !== message.embeds[0].title) || (rulesEmbed.toJSON().description !== message.embeds[0].description) || (JSON.stringify(rulesEmbed.toJSON().fields) !== JSON.stringify(message.embeds[0].fields)))
                    message.edit({content: "", embeds: [rulesEmbed]});
            });
    },
}

export default event;