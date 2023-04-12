const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('another-test')
        .setDescription('Another test command! Cool!'),
    async execute(interaction) {
        await interaction.reply('aaaaaaa!');
    },
}