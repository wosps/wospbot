const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge a numbe of messages from the channel. Cannot purge mesages older than 14 days.')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to purge.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES),

    async execute(interaction, user) {
        const numMessages = interaction.options.getNumber('amount');

        if (numMessages > 100) {
            await interaction.reply({ content: 'Due to Discord limitations, you can only purge up to 100 messages at a time.', ephemeral: true });
            return;
        }

        await interaction.channel.bulkDelete(numMessages, true);
        await interaction.reply({content: 'Purged ' + numMessages + ' messages.', ephemeral: true});
    },
}