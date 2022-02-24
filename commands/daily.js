require('dotenv').config();
const hypixel = require("hypixel-api-wrapper");
hypixel.setKey(process.env.API_TOKEN);
const { mojang } = require('../api.js');
const { MessageEmbed } = require('discord.js');

exports.run = async(client, msg, args) => {
  if(args.length == 1) {
      try {
  let user = client.cache.get(msg.author.id);
  if(!user) return msg.channel.send("You need to register first! You can do this by typing \`register <ign>\`");
  let stats = await hypixel.player(user.uuid);
  let gamemode = args[0].toLowerCase();
  
  if(client.gamemodes.has("daily" + gamemode)) {
    let embed = client.gamemodes.get("daily" + args[0].toLowerCase());
    let response = embed(user, stats.player.stats);
    return msg.channel.send(response);
  } else {
    return msg.channel.send("Please provide a valid gamemode.");
  }
  } catch(err) {
    console.log(err);
  }
  } else {
    try {
  let profile = await mojang(args[0]);
  if(profile.invalid) return msg.channel.send("This user is invalid!");
  let user = client.cache.get(profile.id);
  if(!user) return msg.channel.send("This user is not in our database. You can add them to the database by typing \`;track <ign>\`");
  let stats = await hypixel.player(user.uuid);
  let gamemode = args[1].toLowerCase();
  
  if(client.gamemodes.has("daily" + gamemode)) {
    let embed = client.gamemodes.get("daily" + args[1].toLowerCase());
    let response = embed(user, stats.player.stats);
    return msg.channel.send(response);
  } else {
    return msg.channel.send("Please provide a valid gamemode.");
  }
  } catch(err) {
    console.log(err);
  }
  }
  
 
}