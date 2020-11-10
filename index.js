const Discord = require("discord.js");
const config = require("./config.json");
const ytdl = require("ytdl-core");
const { randomInt } = require("crypto");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const client = new Discord.Client();

const prefix = "~";

var songs = ["https://www.youtube.com/watch?v=CdXesX6mYUE", "https://www.youtube.com/watch?v=SmM0653YvXU", "https://www.youtube.com/watch?v=hHUbLv4ThOo", "https://www.youtube.com/watch?v=t4H_Zoh7G5A", "https://www.youtube.com/watch?v=EPo5wWmKEaI", "https://www.youtube.com/watch?v=2up_Eq6r6Ko", "https://www.youtube.com/watch?v=0S3foICf5uI", "https://www.youtube.com/watch?v=i0vFid2tKbI", "https://www.youtube.com/watch?v=1hr3Inwbdfc", "https://www.youtube.com/watch?v=HMqgVXSvwGo", "https://www.youtube.com/watch?v=5jlI4uzZGjU", "https://www.youtube.com/watch?v=zaSZE194D4I", "https://www.youtube.com/watch?v=wVz4JbMlD90", "https://www.youtube.com/watch?v=Ejdx6_hYTiY", "https://www.youtube.com/watch?v=cYw-oyJ7AEY", "https://www.youtube.com/watch?v=QECUFmEPbU0", "https://www.youtube.com/watch?v=R7xbhKIiw4Y", "https://www.youtube.com/watch?v=S0vGsyprO54", "https://www.youtube.com/watch?v=AmuKdoe8MvI", "https://www.youtube.com/watch?v=EAyzpLGBI1E", "https://www.youtube.com/watch?v=fnsjjIY3WL8", "https://www.youtube.com/watch?v=omeG3d5cHsI", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=QpAGSi8fd88", "https://www.youtube.com/watch?v=aAu51I1wYcU", "https://www.youtube.com/watch?v=FUak2C_KEeU", "https://www.youtube.com/watch?v=TGtWWb9emYI"];
const ww = "https://www.youtube.com/watch?v=FGFrTFakGJo"
const channels = ["#Wizard101", "#Nether", "#Overworld", "#Aether"]
const channelID = ["190835797782560769", "212507466842243072", "703234535910801428", "251700656866459658"]

const dumb = new Map();
var waiting = 5000

// while(true) {
//     setTimeout(() => { 
//         var chan = "0"
//         for(var i = 0; i < channelID.length; i++) {
//             chan = client.channels.cache.get(channelID[i])
//             if(chan.members.size != 0) {
//                 break
//             }
//             chan = "0"
//         }

//         if(chan === "0") {surprise()}

//         var connect;

//         //const chan = client.channels.cache.get(channelID[Math.floor(Math.random() * (channelID.length - 1))])
//         // print channel
//         chan.join().then((connect) => {
//             // message.reply("I have established connection").catch((err) => {
//             //     console.error(err);
//             // })
//             const contra = {
//                 textChannel: "faggot",
//                 voiceChannel: "faggot",
//                 connection: null,
//                 song: [],
//                 volume: 1,
//                 playing: true,
//             }
//             dumb.set("190809392084549632", contra);
//             contra.connection = connect
//             prank(chan, client, connect)
//             // .catch((err) => {
//             //     console.error(err);
//             // });
//             waiting = Math.random()*20000 + 60000
//             //console.log(waiting)
//             surprise();
//         }).catch((err) => {
//             console.log(err);
//             chan.leave();
//             return;
//         }) }, waiting)
// }

function surprise() {
    setTimeout(() => { 
        var chan = "0"
        for(var i = 0; i < channelID.length; i++) {
            chan = client.channels.cache.get(channelID[i])
            if(chan.members.size != 0) {
                break
            }
            chan = "0"
        }

        if(chan === "0") {
            surprise()
            return
        }

        var connect;

        //const chan = client.channels.cache.get(channelID[Math.floor(Math.random() * (channelID.length - 1))])
        // print channel
        chan.join().then((connect) => {
            // message.reply("I have established connection").catch((err) => {
            //     console.error(err);
            // })
            const contra = {
                textChannel: "faggot",
                voiceChannel: "faggot",
                connection: null,
                song: [],
                volume: 1,
                playing: true,
            }
            dumb.set("190809392084549632", contra);
            contra.connection = connect
            prank(chan, client, connect)
            // .catch((err) => {
            //     console.error(err);
            // });
            waiting = Math.random()*3600000 + 1800000
            //console.log(waiting)
            surprise();
        }).catch((err) => {
            console.log(err);
            chan.leave();
            return;
        }) }, waiting)
}

surprise()

client.on('voiceStateUpdate', (oldState, newState) => {
    // check if someone connects or disconnects
    if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
    // check if the bot is disconnecting
    if (newState.id !== client.user.id) return;
    // clear the queue
    return dumb.delete(oldState.guild.id);    
});

client.on("message", async message => { 
    if (message.author.bot) return;   
    if (!message.content.startsWith(prefix)) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    const serverQueue = dumb.get(message.guild.id);
    //console.log(serverQueue)

    if (command === "ping") {
        var past = Date.now()
        const timeTaken = past - message.createdTimestamp;
        const sq = message.guild.id;
        message.reply(`Your fucking latency is ${timeTaken}ms.`);
        // if(args[0] === "while(true)") {
        //     while(true) {
        //         var past2 = past
        //         past = Date.now()
        //         var time2 = past - past2
        //         message.reply(`Ping fuck ${timeTaken}ms.`);
        //     }
        // }
    }

    else if (command === "rap") {
        execute(message, serverQueue, args[0]);
        return;
    }

    else if (command === "worldwide") {
        execute(message, serverQueue, command);
        return;
    }
    else if (command === "donotusethiscommand") {
        execute(message, serverQueue, command);
        return;
    }
    else if (command === "shitbull") {
        dumb.delete(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        voiceChannel.leave()

    }
    else {
        message.reply("rap, ping, worldwide, shitbull, donotusethiscommand");
    }

})

async function execute(message, serverQueue, arg) {

    var song_link;
    if(arg === "worldwide") {
        song_link = ww
    }
    else if (arg === "donotusethiscommand") {
        song_link = "https://www.youtube.com/watch?v=hIrJmQoRssM"
    }
    else {
        song_link = songs[Math.floor(Math.random() * (songs.length - 1))];
    }
    //message.reply(`${song_link}`);
    
    const voiceChannel = message.member.voice.channel;
    //message.reply(`${message.member.voice.channel}`);
    if (!voiceChannel) return message.channel.send("¿Dónde está?")

    // let songInfo = ytdl.getInfo(song_link);

    // let info = await ytdl.getInfo(song_link);

    // setTimeout(() => {console.log(info)}, 9000);
    ytdl.getInfo(song_link).then((songInfo) => {
        // await ytdl.getInfo(song_link).then('info', (info) => {
        //     songInfo = info;
        // })
        // message.reply(`${songInfo.videoDetails.video_url}`);
        
        const current_song = {
            // title: songInfo.title,
            url: songInfo.videoDetails.video_url
        };

        //console.log(current_song.url)

        if(serverQueue) {
            message.reply("¿Por qué lo pides cuando sigo rapeando?");
            return;
        }

        const contract = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            song: [],
            volume: 1,
            playing: true,
        }

        dumb.set(message.guild.id, contract);

        contract.song.push(current_song);


        var connection;
        voiceChannel.join().then((connection) => {
            contract.connection = connection;
            // message.reply("I have established connection").catch((err) => {
            //     console.error(err);
            // })
            player(message, contract, voiceChannel)
            // .catch((err) => {
            //     console.error(err);
            // });
        }).catch((err) => {
            console.log(err);
            message.reply("Estoy muerto");
            voiceChannel.leave();
            return message.channel.send(err);
        }) 

        // var connection = voiceChannel.join()
        // client.on("voiceStateUpdate", function() {
        //     contract.connection = connection;
        //     // message.reply("I have established connection").catch((err) => {
        //     player(message, contract.song[0]).catch((err) => {
        //         console.error(err);
        //     });
        // })
        // .catch((err) => {
        //     console.log(err);
        //     message.reply("Estoy muerto");
        //     voiceChannel.leave();
        //     return message.channel.send(err);
        // })
    })
}

function player(message, contract, voiceChannel) {
    const serverQueue = dumb.get(message.guild.id)
    // message.reply("I have entered play function");
    if (!contract.song[0]) {
        voiceChannel.leave();
      return;
    }
    // message.reply("!song check passed");
    const dispatcher = serverQueue.connection.play(ytdl(contract.song[0].url, {filter: "audioonly"})).on("finish", () => {
        voiceChannel.leave();
        contract.song.shift();
    })
    // .catch((err) => {
    //     console.error(err)
    // })
    // message.reply("Dispatch works");
}

function prank(chan, client) {
    const serverQueue = dumb.get("190809392084549632")
    const dispatcher = serverQueue.connection.play(ytdl(ww, {filter: "audioonly"})).on("finish", () => {
        chan.leave();
    })
}

client.login(config.BOT_TOKEN);
