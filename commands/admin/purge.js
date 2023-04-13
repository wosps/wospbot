const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge a numbe of messages from the channel. Cannot purge mesages older than 14 days.')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to purge.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction, user) {
        const numMessages = interaction.options.getNumber('amount');

        const errEmbed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('Error!')
            .setDescription(`Due to Discord limitations, you can only purge up to 100 messages at a time.`)
            .setTimestamp()
            .setFooter({
                text: interaction.member.user.tag,
                iconURL: interaction.member.user.avatarURL()
            })

        if (numMessages > 100)
            return interaction.reply({embeds: [errEmbed], ephemeral: true});

        await interaction.channel.bulkDelete(numMessages, true);

        const successEmbed = new EmbedBuilder()
        .setColor('#2ecc71')
        .setTitle('Purged ' + numMessages + ' messages!')
        .setTimestamp()
        .setFooter({
            text: interaction.member.user.tag,
            iconURL: interaction.member.user.avatarURL()
        })

        await interaction.reply({ embeds: [successEmbed], ephemeral: true});
    },
}