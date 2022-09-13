const { Client, Intents } = require('discord.js');
const { joinVoiceChannel } = require("@discordjs/voice");
const config  = require('./config.json');
const client = new Client({
    ws: { properties: { $browser: "Discord iOS" } },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
})



client.on('ready', () => {
    function ejdeha() {
        let dragon = [
            `YOUR STATUS`, //enter your status
            `🏓 Ping : ${client.ws.ping}ms` //bot ping
        ]
        let Power = Math.floor(Math.random() * dragon.length);
        client.user.setActivity(dragon[Power], { type: "LISTENING" });
    }; setInterval(ejdeha, 10000)
    console.log(`${client.user.tag} is Online ! `)

    let Channel = client.channels.cache.get(config.idchannel);
    console.log("[CONNECTION] Connected.");
    if (!Channel) return console.error(red("[CONNECTION] The channel does not exist!"))
    setInterval(() => {
        if (Channel.guild.members.cache.get(client.user.id).voice?.channelId)
            return;
        console.log("[CONNECTION] reconnected.");
        const connection = joinVoiceChannel({
            channelId: Channel.id,
            guildId: Channel.guild.id,
            adapterCreator: Channel.guild.voiceAdapterCreator,
        })
    }, 5000);

});




client.login(config.token);
