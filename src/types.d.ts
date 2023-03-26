import {ChatInputCommandInteraction, Collection, SlashCommandBuilder} from "discord.js"

export interface BotEvent {
    name: string,
    once?: boolean | false,
    async execute: (...args?) => void
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder | any,
    async execute: (interaction : ChatInputCommandInteraction) => Promise<void>,
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
        slashCommands: Collection<string, SlashCommand>
    }
}

export interface ForgeVersions {
    promos:   { [key: string]: string };
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
