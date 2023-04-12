const fs = require('fs')
const path = require('node:path')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const foldersPath = path.join(__dirname, '..', '..', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

let helpList = []

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
		const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            helpList.push({name: '/' + command.data.name, value: command.data.description})
        } else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
    }
}

const helpEmbed = new EmbedBuilder()
    .setColor(0x00AE86)
    .setTitle('Help')
    .setDescription('List of commands and their descriptions.') 
	.addFields(helpList)    
    .setFooter({
        text: 'wospbot',
        iconURL: 'https://i.imgur.com/zSpOI13.png'
    })

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of commands and their descriptions.'),
    async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed]});
    },
}