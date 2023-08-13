import {Client, EmbedBuilder, Events, ForumChannel, TextChannel} from "discord.js";
import {BotEvent} from "../types";
import {APPROBATION_RULES_CHANNEL, GUILD_ID, RULES_MESSAGE} from "../utils/id";
import {rules} from "../utils/rules";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log((`💪 Logged in as ${client.user?.tag}`))

        let rulesEmbed = new EmbedBuilder()
            .setTitle(rules.title)
            .setDescription(rules.description)
            .setColor("#15ff67");

        for (let i = 0; i < rules.rules.length; i++){
            rulesEmbed.addFields({name: `Règle ${i + 1} - ${rules.rules[i].title}`, value: rules.rules[i].text, inline: false})
        }

        client.guilds.cache.get(GUILD_ID).rulesChannel.messages.fetch(RULES_MESSAGE)
            .then(message => {
                if((rulesEmbed.toJSON().title !== message.embeds[0].title) || (rulesEmbed.toJSON().description !== message.embeds[0].description) || (JSON.stringify(rulesEmbed.toJSON().fields) !== JSON.stringify(message.embeds[0].fields)))
                    message.edit({content: "", embeds: [rulesEmbed]});
            });

        const channelIds = ["1050427271133012049", "1019644671976296488", "1030059794637266964"]
        const channelNames = ["Neo Forge 1.20.x", "Forge 1.19.x", "Forge 1.18.x"]

        for(let i = 0; i < channelIds.length; i++){
            const forumChannel = client.channels.cache.get(channelIds[i]) as ForumChannel;
            const notifChannel = client.channels.cache.get(APPROBATION_RULES_CHANNEL) as TextChannel;
            const tagId = forumChannel.availableTags.find(tag => tag.name === "Résolu").id

            notifChannel.send(`${channelNames[i]} : ${tagId}`)
        }
    },
}

export default event;