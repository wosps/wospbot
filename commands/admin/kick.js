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
            .setColor('#f86c68')
            .setTitle('Error!')
            .setDescription(`You can't kick ${user.tag}!`)
            .setFooter({
                text: 'wospbot',
                iconURL: 'https://i.imgur.com/zSpOI13.png'
            })

        if (member.roles.highest.position >= interaction.member.roles.highest.position) 
            return interaction.reply({ embeds: [errEmbed], ephemeral: true});
        
        await member.kick(reason);
        
        const successEmbed = new EmbedBuilder()
            .setColor('#f86c68')
            .setTitle(user.tag + ' was kicked!')
            .setDescription('Reason: ' + reason)  
            .setFooter({
                text: 'wospbot',
                iconURL: 'https://i.imgur.com/zSpOI13.png'
            })

        await interaction.reply({ embeds: [kickEmbed]});
    },
}