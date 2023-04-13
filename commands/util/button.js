const fs = require('fs')
const path = require('node:path')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Button test idk')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message to send.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('button')
                .setDescription('Button to send.')
                .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        const button = interaction.options.getString('button');
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel(button)
                    .setStyle(ButtonStyle.Success),
            );

        await interaction.reply({ content: message, components: [row] });
    },
}