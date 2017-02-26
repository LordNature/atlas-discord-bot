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

// to do make modular
atlas.on("message", msg => {
  if(msg.content.startsWith(config.prefix + "help")) {
    msg.channel.sendMessage("```List of commands:\n }help -- All commands\n }ping -- Responds pong and ms response time```")
    //console.log("* [DEBUG_MSG]: " + msg.author.username + " has executed " + prefix + "help")
  }
  if(msg.content.startsWith(config.prefix + "debug")) {
    var ping = Date.now()
    msg.channel.sendMessage("```Debug Response:\n Status - " + atlas.status + "```")
    var pong = Date.now()
    var ms = pong - ping
    msg.channel.sendMessage("```Response Time: " + ms +  "```")
  }
})

//test stuff
atlas.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong! '+ msg.author.id)
  }
})


atlas.login(config.bToken);
