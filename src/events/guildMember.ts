import {BotEvent} from "../types";
import {Events, GuildMember, TextChannel} from "discord.js";

const event: BotEvent = {
    name: Events.GuildMemberUpdate,
    once: false,
    execute(oldMember: GuildMember, newMember: GuildMember) {
        if(newMember.pending === false && oldMember.pending === true){
            const npe = newMember.guild.roles.cache.get(process.env.NPE_ROLE);
            const channel = oldMember.client.channels.cache.get(process.env.APPROBATION_RULES_CHANNEL) as TextChannel;
            newMember.roles.add(npe);
            channel.send(`<@${newMember.id}> a accepté les règles et en assumera les conséquences !`);
        }
    },
}

export default event;