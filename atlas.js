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
})

commands.ping = {
}

atlas.on("message", msg => {
})
