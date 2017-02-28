/* Atlas Init Script
 * Below initializes the bot.
 */
var fs = require('fs'),
    discord = require('discord.js'),
    atlas = new discord.Client(),
    config = require("./config.json"),
    commands = []

atlas.on("ready", function() {
  console.log("Atlas Molecular Structure Initiated...")
  console.log("Discord.js Version: " + discord.version)
  console.log("Bot Token: " + config.token)
  console.log("Client ID: " + config.clientID)
  atlas.user.setStatus("online")
  atlas.user.setGame("in space")
})

// Command Section - For now
commands.help = {
  name: "help",
  desc: "Parses the information you are seeing.",
  exec: function(msg, args) {
    msg.reply("In development.")
  }
}

commands.atlas = {
  name: "atlas",
  desc: "Fetches information about Atlas.",
  adminOnly: true,
  exec: function(msg, args) {
    var info = new discord.RichEmbed()
    info.setAuthor("Atlas")
        .setColor("#00FBFF")
        .setDescription("I'm a Discord bot that handles a variety of tasks to make <@122805215043780609>'s life easier!")
        .setThumbnail(atlas.user.avatarURL)
        .addField("Commands", "For a list of commands please type `" + config.prefix + "help`", true)
    msg.channel.sendEmbed(info)
  }
}

commands.status = {
  name: "status",
  desc: "Fetches status of Atlas.",
  adminOnly: true,
  exec: function(msg, args) {
    // Please don't yell at my order of operations.
    var secs = Math.round(atlas.uptime / 1000) % 60,
        mins = Math.round(secs / 60),
        hrs = Math.round(mins / 60),
        info = new discord.RichEmbed()
    info.setAuthor("Atlas")
        .setColor("#00FBFF")
        .setDescription("Debug Information about Atlas.")
        .setThumbnail(atlas.user.avatarURL)
        .addField("Node Version", process.version, true)
        .addField("Uptime", hrs + ":" + mins + ":" + secs, true)
        .addField("Dependencies", `**Discord.js:** v${discord.version}`)
        .addField("RAM", Math.round(process.memoryUsage().rss / 1024 / 1000) + "MB", true)
    msg.channel.sendEmbed(info)
  }
}

commands.reboot = {
  name: "reboot",
  desc: "Reboots Atlas.",
  adminOnly: true,
  exec: function(msg, args) {
    msg.channel.sendMessage(`Atlas will be rebooting in ${args} seconds`)
    setTimeout(function() {
      console.log("Atlas Exit")
      process.exit()
    }, args * 1000)
  }
}

commands.whoami = {
  name: "whoami",
  desc: "Fetches information about you.",
  exec: function(msg, args) {
    var info = new discord.RichEmbed()
    info.setAuthor(`Hey ${msg.author.username}!`)
        .setColor("#00FBFF")
        .setDescription("This is what I've found about you.")
        .setThumbnail(msg.author.avatarURL)
        .addField("User ID", msg.author.id, true)
        .addField("Created", "Your account was created on " + msg.author.createdTimestamp, true)
    msg.channel.sendEmbed(info, `${msg.author}`)
  }
}

commands.ping = {
  name: "ping",
  desc: "Pong!",
  exec: function(msg, args) {
    msg.channel.sendMessage(":ping_pong:")
  }
}

commands.purge = {
  name: "purge",
  desc: "Removes all messages.",
  adminOnly: true,
  exec: function(msg, args) {
    msg.reply("This has been deprecated in favor of `" + config.prefix + "prune`.")
  }
}

commands.prune = {
  name: "prune",
  desc: "Removes messages in channel. Limit: 200.",
  adminOnly: true,
  exec: function(msg, args) {
    if(args == "") {
      msg.reply("Missing arguments.")
      return;
    }
    if(args > 200) {
      msg.reply("The limit for pruning is 200 messages.")
      return
    }
    msg.channel.fetchMessages({limit: args}).then(msgs => {
      msg.channel.bulkDelete(msgs).then(res => {
        msg.channel.sendMessage("Deleted " + res.array().length + " messages.")
      })
    })
  }
}

commands.setavatar = {
  name: "setavatar",
  desc: "Sets Atlas's avatar.",
  adminOnly: true,
  exec: function(msg, args) {
    atlas.user.setAvatar(args)
  }
}

commands.setstatus = {
  name: "setstatus",
  desc: "Sets Atlas's status.",
  adminOnly: true,
  exec: function(msg, args) {
    atlas.user.setStatus(args)
  }
}

commands.setgame = {
  name: "setgame",
  desc: "Sets Atlas's game.",
  adminOnly: true,
  exec: function(msg, args) {
    atlas.user.setGame(args)
  }
}

commands.m = {
  name: "Music",
  desc: "Changes different things for music. E.g.: play, stop, pause, etcetera.",
  adminOnly: true,
  exec: function(msg, args) {
    if(args == "join") {
      voiceChannel = atlas.channels.get(msg.member.voiceChannelID)
      voiceChannel.join()
      return
    }
    if(args == "leave" || args == "stfu" || args == "stop") {
      voiceChannel.leave()
      return
    }
    msg.reply("That's not a valid argument!")
  }
}

commands.cena = {
  name: "JOHN CENA",
  desc: "Plays the John Cena mp3.",
  exec: function(msg, args) {
    voiceChannel = atlas.channels.get(msg.member.voiceChannelID)
    voiceChannel.join().then(connection => {
      const dispatcher = connection.playFile("./sounds/cena.mp3").setVolume("0.1")
    }).catch(console.error)
    voiceChannel.leave()
  }
}

commands.kappa = {
  exec: function(msg) {
    msg.channel.sendFile("https://i.imgur.com/1l5tbGp.png")
  }
}

atlas.on("message", msg => {
  if(msg.content.startsWith(config.prefix)) {
    var cmd = msg.content.toLowerCase().split(" ")[0].substring(1),
        args = msg.content.substring(cmd.length + 2)
    if(commands[cmd] !== undefined) {
      if(commands[cmd].adminOnly !== true) {
        commands[cmd].exec(msg, args)
      } else {
        if(msg.author.id === config.ownerID) {
          commands[cmd].exec(msg, args)
        } else {
          msg.reply("You don't have the power to control me!")
        }
      }
    }
  }
})

atlas.login(config.token).then(() => {
  console.log("Atlas Molecular Structure Complete")
})
