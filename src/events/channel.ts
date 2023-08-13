import {Events, ThreadChannel} from "discord.js";
import {BotEvent} from "../types";
import {FORGE_CHANNELS} from "../utils/id";

const event: BotEvent = {
    name: Events.ThreadUpdate,
    once: true,
    execute(oldThread: ThreadChannel, newThread: ThreadChannel) {
        if(FORGE_CHANNELS.includes(newThread.id)){

        }
    },
}

export default event;