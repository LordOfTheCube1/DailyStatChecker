require('dotenv').config();
const { Client, MessageEmbed, Collection } = require("discord.js");
const express = require('express');
const app = express();
const ms = require("ms");
const uniqid = require("uniqid");
const fs = require('fs');
const hypixel = require('hypixel-api-wrapper');
hypixel.setKey(process.env.API_TOKEN);
const Database = require("@replit/database");

app.get("/", (req, res) => {
  res.send("HI");
})


app.listen(3000);

const client = new Client();
client.login(process.env.BOT_TOKEN);
client.API_KEY = process.env.API_TOKEN;
client.db = new Database();
client.cache = new Collection(); // i might make this better at some point

client.prefix = ";";
client.gamemodes = require('./gamemodes.js');

client.dailyChecker = () => {
  client.db.list().then(async keys => {
    for(let i = 0; i < keys.length; i++) {
      setTimeout(async function() {
        console.log("===\nUpdating Stats of User " + i + "\n===\n\n");
      let user = client.cache.get(keys[i]);
      const success = client.cache.delete(keys[i]);
      let stats;
      try {
        stats = await hypixel.player(user.uuid);
      } catch(e) {
        console.log(e);
      }
      user.laststats = {
        time: new Date(),
        Duels: stats.player.stats.Duels,
        Bedwars: stats.player.stats.Bedwars
      };
      client.cache.set(keys[i], user);
      client.db.delete(keys[i]).then(() => {
        client.db.set(keys[i], user);
      });
      console.log("===\nFinished Updating Stats of User " + i + "\n===\n\n");
      }, 600 * i)
      
    }
  })
}

app.get("/" + process.env.UPDATE_KEY, (req, res) => {
  
 try {
   client.dailyChecker();
   res.send("Stats updated");
 } catch(err) {
   console.log("Tried to update stats, but couldn't.");
   console.log("Error:");
   console.log(err);
   res.send("Failed to update");
 }
})

client.on("ready", () => {
  console.log("Ready! Caching database...");
  client.db.list().then(async e => {
    for(let i = 0; i < e.length; i++) {
      client.cache.set(e[i], await client.db.get(e[i]));
    }
  });
  console.info("Database fully cached.");
});



client.on("message", async msg => {
  let args = msg.content.split(" ");
  const cmd = args.shift().slice(client.prefix.length);

      //=================== Command Handler

if(msg.content.startsWith(client.prefix)) {
  try {
      let file;
      try {
        file = require(`./commands/${cmd}`);
      } catch(err) {
        return;
      }
      file.run(client, msg, args);
    } catch(e) {
        const id = uniqid.process("ERR-");
        console.log(`${id} => Error while running ${cmd} command in ${msg.guild.name} (${msg.guild.id})\n${e}`);
        return msg.channel.send(`There was an error while running the ${cmd} command. Please approach the developer with the following id: \`${id}\` `);
    } 
}
})

