import {BotEvent} from "../types";
import {EmbedBuilder, Events, Message, TextChannel} from "discord.js";
import {rules} from "../utils/rules";
import {REPORT_PING_CHANNEL} from "../utils/id";

const event: BotEvent = {
    name: Events.MessageCreate,
    once: true,
    execute(message: Message) {

        if((message.mentions.users.find(user => user.id === '569959711164727306') || message.mentions.users.find(user => user.id === '188763699778027521')) && !message.author.bot && !message.member.roles.cache.find(r => r.name === 'Dev Master' || r.name === 'Modérateur')){

            const reportMentionChannel = message.client.channels.cache.get(REPORT_PING_CHANNEL) as TextChannel;
            const rulesEmbed = new EmbedBuilder()
                .setColor("#15ff67")
                .setTitle(`Règle 3 - ` + rules.rules[2].title)
                .setDescription(rules.rules[2].text);
            message.channel.send({embeds: [rulesEmbed]});

            message.member.timeout(24 * 60 * 60 * 1000, 'Mention admin');

            //Embed qui report la mention dans un salon uniquement accessible aux admins
            const reportPingEmbed = new EmbedBuilder()
                .setColor("#15ff67")
                .setTitle(`Message contenant la mention`)
                .setDescription(message.content);
            reportMentionChannel.send({ content : `${message.author} a mentionné l'un d'entre vous !`,embeds: [reportPingEmbed] })
        }
    },
}

export default event;