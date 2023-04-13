const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to be kicked.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking the user.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('Error!')
            .setDescription(`You can't kick ${user.tag}!`)
            .setTimestamp()
            .setFooter({
                text: interaction.member.user.tag,
                iconURL: interaction.member.user.avatarURL()
            })

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            console.log('Target of Kick:' + member.roles.highest.position)
            console.log('Sender of Kick:' + interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true});
        }
        
        await member.kick('Kicked by ' + interaction.member.tag + '. Reason: ' + reason);
        
        const successEmbed = new EmbedBuilder()
            .setColor('#2ecc71')
            .setTitle(user.tag + ' was kicked!')
            .setDescription('Reason: ' + reason)  
            .setTimestamp()
            .setFooter({
                text: interaction.member.user.tag,
                iconURL: interaction.member.user.avatarURL()
            })

        await interaction.reply({ embeds: [successEmbed], ephemeral: true});
    },
}