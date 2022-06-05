const { Client, Intents } = require('discord.js');

const { token } = require('./config.json');
const { readdirSync } = require('fs')
const client = new Client({
    ws: { properties: { $browser: "Discord iOS" } },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
})


client.login(token);





const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    console.log(`[EVENT]: ${file} loaded`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}