import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    PermissionsBitField
} from "discord.js"
import {ApplicationCommand} from "../types";

export const command: ApplicationCommand = {
    name: 'lol',
    data: new ContextMenuCommandBuilder()
        .setName("lol")
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction: ContextMenuCommandInteraction) => {
        await interaction.reply({
            content: `${interaction.client.ws.ping}ms!`
        })
    }
}