require('dotenv').config();
const hypixel = require("hypixel-api-wrapper");
hypixel.setKey(process.env.API_TOKEN);
const { mojang } = require('../api.js');
const { MessageEmbed } = require('discord.js');

exports.run = async(client, msg, args) => {
  try {
 



  let user = client.cache.get(msg.author.id);
  if(!user) return msg.channel.send("You need to register first! You can do this by typing \`register <ign>\`");

console.log(user);
  let stats = await hypixel.player(user.uuid);
  console.log(stats);
  let gamemode = args[0].toLowerCase();
  
  if(client.gamemodes.has(gamemode)) {
    let embed = client.gamemodes.get(args[0].toLowerCase());
    let response = embed(user, stats.player.stats);
    return msg.channel.send(response);
  } else {
    return msg.channel.send("Please provide a valid gamemode.");
  }
  } catch(err) {
    console.log(err);
  }
 
}