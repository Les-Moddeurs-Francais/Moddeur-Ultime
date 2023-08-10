import {
    ChatInputCommandInteraction,
    Collection,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    SlashCommandBuilder
} from "discord.js"

export interface BotEvent {
    name: string,
    once?: boolean | false,
    async execute: (...args?) => void
}

export interface BotApplicationCommand {
    name: string,
    data: SlashCommandBuilder | ContextMenuCommandBuilder | any,
    async execute: (interaction : ChatInputCommandInteraction | ContextMenuCommandInteraction) => Promise<void>,
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string
            TOKEN: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        applicationCommands: Collection<string, BotApplicationCommand>
    }
}

export interface NeoForgeVersions {
    isSnapshot: boolean;
    version: string;
}

export interface MappingsVersion {
    version: string;
}

export interface LoaderVersion {
    loader: {
        version: string;
    };
}

export interface ModrinthModVersion {
    version_number: string;
}

export type AlgoliaHit = {
    url: string;
    version: string;
};
