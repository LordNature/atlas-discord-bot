/* Atlas Init Script
 * Below initializes the bot.
 */
var fs = require('fs'),
    discord = require('discord.js'),
    atlas = new discord.Client(),
    config = require("./config.json"),
    commands = {}

atlas.on("ready", function() {
  console.log("Atlas Molecular Structure Initiated...")
  console.log("Discord.js Version: " + discord.version)
  console.log("Bot Token: " + config.bToken)
  console.log("Client ID: " + config.clientId)
  console.log("Atlas Molecular Structure Complete")
  atlas.user.setStatus("online")
  atlas.user.setGame("in space")
})

// Command Section - For now
commands.ping = {
	name: "ping",
	desc: "Pong!",
	exec: function(msg, args) {
    msg.channel.sendMessage("Pong!")
	}
}

atlas.on("message", msg => {
	if(msg.content.startsWith(config.prefix)) {
		let cmd = msg.content.toLowerCase().split(" ")[0].substring(1),
        args = msg.content.substring(cmd.length + 2)
    if (commands[cmd] && commands[cmd].adminOnly == false) {
      commands[cmd].exec(msg, args)
    } else {
      if(msg.author.id === '122805215043780609') {
        commands[cmd].exec(msg, args)
      } else {
        msg.reply("You don't have the power to control me!")
      }
    }
	}
})

//test stuff
atlas.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong! '+ msg.author.id)
  }
})

atlas.login(config.bToken);
