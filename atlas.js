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
  console.log("Bot Token: " + config.bToken)
  console.log("Client ID: " + config.clientId)
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
    info.setColor("#00FBFF")
    info.setDescription("I'm a Discord bot that handles a variety of tasks to make <@122805215043780609>'s life easier!")
    info.setThumbnail(atlas.user.avatarURL)
    info.addField("Commands", "For a list of commands please type `" + config.prefix + "help`", true)
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
    info.setColor("#00FBFF")
    info.setDescription("Debug Information about Atlas.")
    info.setThumbnail(atlas.user.avatarURL)
    info.addField("Uptime", hrs + ":" + mins + ":" + secs, true)
    msg.channel.sendEmbed(info)
  }
}

commands.whoami = {
  name: "whoami",
  desc: "Fetches information about you.",
  exec: function(msg, args) {
    var info = new discord.RichEmbed()
    info.setAuthor(`Hey ${msg.author.username}!`)
    info.setColor("#00FBFF")
    info.setDescription("This is what I've found about you.")
    info.setThumbnail(msg.author.avatarURL)
    info.addField("User ID", msg.author.id, true)
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
    msg.reply("This has been deprecated in favor of `" + config.prefix + "purge`.")
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

atlas.on("message", msg => {
  if(msg.content.startsWith(config.prefix)) {
    let cmd = msg.content.toLowerCase().split(" ")[0].substring(1),
        args = msg.content.substring(cmd.length + 2)
    if(commands[cmd] !== undefined) {
      if(commands[cmd].adminOnly == false) {
        commands[cmd].exec(msg, args)
      } else {
        if(msg.author.id === '122805215043780609') {
          commands[cmd].exec(msg, args)
        } else {
          msg.reply("You don't have the power to control me!")
        }
      }
    }
  }
})

atlas.login(config.bToken).then(() => {
  console.log("Atlas Molecular Structure Complete")
})
