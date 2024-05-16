require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js');
const { getPlayersOnServer } = require('./battlemetrics_check');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});



const serverId = '9594602';

let intervalId; 

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log("Bot online and ready to go");
});

/*client.on('messageCreate', async msg => {
    if (msg.content === "ping") {
        try {
            const data = await getPlayersOnServer(serverId, authToken);

            console.log(data);
            if (data) {
                console.log('Players on server:', data);
                msg.reply('Players on server: ' + JSON.stringify(data));
            } else {
                console.log('No player data found.');
                msg.reply('No player data found.');
            }
        } catch (error) {
            console.error('Error:', error);
            msg.reply('An error occurred while fetching players.');
        }
    }
});*/

async function checkOnline(msg, huntedPlayer) {
    // Check if the requirement is met
    const playerData = await getPlayersOnServer(serverId, process.env.authToken);
        if (playerData && playerData.included && playerData.included.length > 0) {
            const playerNames = playerData.included.map(player => player.attributes.name);
            if (!searchPlayer(huntedPlayer, playerNames)){
                console.log(`HUNT_PLAy_VAR`, huntedPlayer);
                console.log(`HUNT_PLAy_Names`, playerNames);
        // Requirement is met, stop the interval
        clearInterval(intervalId);
        msg.reply(` ${huntedPlayer} is offline currently `)}
    } else {
        // Requirement not met, continue checking
        console.log("Requirement not met, checking again...");
    }
}



function searchPlayer(playerName, playerNames) {
    return playerNames.includes(playerName);
}

let huntedPlayer = '';

client.on('messageCreate', async msg => {
    if (msg.content.startsWith('hunt')) {
        const args = msg.content.split(' ');
        huntedPlayer = args.slice(1).join(' ');

        const playerData = await getPlayersOnServer(serverId, process.env.authToken);
        if (playerData && playerData.included && playerData.included.length > 0) {
            const playerNames = playerData.included.map(player => player.attributes.name);
            if (searchPlayer(huntedPlayer, playerNames)) {
                msg.reply(`Watching: ${huntedPlayer}`);
                intervalId = setInterval(() => checkOnline(msg, huntedPlayer), 10000);
            } else {
                msg.reply(`Player either offline or wrong name entered`);
            }
        } else {
            console.log('No player data found.');
            msg.reply("No player data found.");
        }
    } else if (msg.content === "ping") {
        const playerData = await getPlayersOnServer(serverId, process.env.authToken);
        if (playerData && playerData.included && playerData.included.length > 0) {
            const playerNames = playerData.included.map(player => player.attributes.name);
            console.log('Players:', playerNames);
            msg.reply(`Players on server: ${playerNames.join(', ')}`);
        } else {
            console.log('No player data found.');
            msg.reply("No player data found.");
        }
    } else if (msg.content === "LFG") {
        msg.reply("HELL YEAH!");
    }
});



client.on('messageCreate', async msg => {
    if (msg.content === "ping") {
        const playerData = await getPlayersOnServer(serverId, process.env.authToken);
        if (playerData && playerData.included && playerData.included.length > 0) {
            const playerNames = playerData.included.map(player => player.attributes.name);
            console.log('Players:', playerNames);
            msg.reply(`Players on server: ${playerNames.join(', ')}`);
        } else {
            console.log('No player data found.');
            msg.reply("No player data found.");
        }
    }
});


client.on('messageCreate', msg => {
    if (msg.content === "LFG") {
        msg.reply("HELL YEAH!");
    }
});
