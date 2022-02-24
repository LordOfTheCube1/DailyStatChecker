require('dotenv').config();
const hypixel = require("hypixel-api-wrapper");
hypixel.setKey(process.env.API_TOKEN);
const { mojang } = require('../api.js');
const { MessageEmbed } = require('discord.js');

exports.run = async(client, msg, args) => {
  try {
 if(!args[0]) return msg.channel.send("You need to specifiy a player lol");



  let user = await mojang(args[0]);

 

  if(user.invalid) return msg.channel.send("Please provide a valid user");


  let stats = await hypixel.player(user.id);
  let gamemode = args[1].toLowerCase();
  
  if(client.gamemodes.has(gamemode)) {
    let embed = client.gamemodes.get(args[1].toLowerCase());
    let response = embed(user, stats.player.stats);
    return msg.channel.send(response);
  }
  } catch(err) {
    console.log(err);
  }
 
}