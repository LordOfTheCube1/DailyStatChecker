const { Collection, MessageEmbed } = require('discord.js');

  let gamemodes = new Collection();
  try {

  } catch(err) {
    console.log(err);
  }
  gamemodes.set("bridge", (user, stats) => {
    let bridge_duel_wins = !stats.Duels.bridge_duel_wins ? 0 : stats.Duels.bridge_duel_wins;
    let bridge_duel_losses = !stats.Duels.bridge_duel_losses ? 0 : stats.Duels.bridge_duel_losses;
    let bridge_doubles_wins = !stats.Duels.bridge_doubles_wins ? 0 : stats.Duels.bridge_doubles_wins;
    let bridge_doubles_losses = !stats.Duels.bridge_doubles_losses ? 0 : stats.Duels.bridge_doubles_losses;
    let capture_threes_wins = !stats.Duels.capture_threes_wins ? 0 : stats.Duels.capture_threes_wins;
    let capture_threes_losses = !stats.Duels.capture_threes_losses ? 0 : stats.Duels.capture_threes_losses;
    let embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(user.name)
        .addField(`Bridge Duelㅤ`,`Wins: \`${
      bridge_duel_wins
      }\`\nLosses: \`${
      bridge_duel_losses
      }\`\nW/L: \`${
        bridge_duel_losses == 0 ? bridge_duel_wins :(bridge_duel_wins / 
        bridge_duel_losses).toFixed(2)
      }\`` , true)
      .addField(`Bridge Doublesㅤ`, `Wins: \`${
        bridge_doubles_wins
      }\`\nLosses: \`${
        bridge_doubles_losses
      }\`\nW/L: \`${
        bridge_doubles_losses == 0 ? bridge_doubles_wins :( bridge_doubles_wins / 
        bridge_doubles_losses).toFixed(2)
      }\``, true)
      .addField(`Bridge CTF`, `Wins: \`${
        capture_threes_wins
      }\`\nLosses: \`${
        capture_threes_losses
      }\`\nW/L: \`${
        (!capture_threes_losses ? capture_threes_wins  :( capture_threes_wins / 
        capture_threes_losses).toFixed(2))
      }\``, true)
      return embed;
  });

  gamemodes.set("bw", (user, stats) => {
    let embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(user.name)
    .setDescription(`Overall Wins: ${
      stats.Bedwars.wins_bedwars
      }\nOverall Losses: ${
      stats.Bedwars.losses_bedwars
      }\nOverall W/L: ${
        (stats.Bedwars.wins_bedwars / 
        stats.Bedwars.losses_bedwars).toFixed(2)
      }\n\n\nOverall Final Kills: ${
        stats.Bedwars.final_kills_bedwars
      }\nOverall Final Deaths: ${
        stats.Bedwars.final_deaths_bedwars
      }\nOverall FK/DR: ${
        (stats.Bedwars.final_kills_bedwars / 
        stats.Bedwars.final_deaths_bedwars).toFixed(2)
      } `);
      return embed;
  });
  gamemodes.set("dailybridge", (user, stats) => {
    let embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(user.name)
    .setFooter("Since")
    .setTimestamp(user.laststats.time)
      .addField(`Current Bridge Duel`, `Wins: \`${
      stats.Duels.bridge_duel_wins
      }\`\nLosses: \`${
      stats.Duels.bridge_duel_losses
      }\`\nW/L: \`${
        (stats.Duels.bridge_duel_wins / 
        stats.Duels.bridge_duel_losses).toFixed(2)
      }\` `, true)
      .addField(`Previous Bridge Duel`, `Wins: \`${
        user.laststats.Duels.bridge_duel_wins
      }\`\nLosses: \`${
        user.laststats.Duels.bridge_duel_losses
      }\`\nW/L: \`${
        (user.laststats.Duels.bridge_duel_wins / 
        user.laststats.Duels.bridge_duel_losses).toFixed(2)
      }\``, true)
      .addField(`Daily Bridge Duel`, `Wins: \`${
        stats.Duels.bridge_duel_wins - user.laststats.Duels.bridge_duel_wins 
      }\`\nLosses: \`${
        stats.Duels.bridge_duel_losses - user.laststats.Duels.bridge_duel_losses
      }\`\nW/L: \`${
        (((stats.Duels.bridge_duel_losses - user.laststats.Duels.bridge_duel_losses) == 0) ? (stats.Duels.bridge_duel_wins - user.laststats.Duels.bridge_duel_wins) : (stats.Duels.bridge_duel_wins - user.laststats.Duels.bridge_duel_wins)/(stats.Duels.bridge_duel_losses - user.laststats.Duels.bridge_duel_losses)).toFixed(2) // pain (checking if losses is 0 so it doesn't divide by 0 and give NaN)
      }\``, true)
      .addField(`Current Bridge Doubles`, `Wins: \`${
        stats.Duels.bridge_doubles_wins
      }\`\nLosses: \`${
        stats.Duels.bridge_doubles_losses
      }\`\nW/L: \`${
        (stats.Duels.bridge_doubles_wins / 
        stats.Duels.bridge_doubles_losses).toFixed(2)
      }\``, true)
      .addField(`Previous Bridge Doubles`, `Wins: \`${
        user.laststats.Duels.bridge_doubles_wins
      }\`\nLosses: \`${
        user.laststats.Duels.bridge_doubles_losses
      }\`\nW/L: \`${
        (user.laststats.Duels.bridge_doubles_wins / 
        user.laststats.Duels.bridge_doubles_losses).toFixed(2)
      }\``, true)
      .addField(`Daily Bridge Doubles`, `Wins: \`${
        stats.Duels.bridge_doubles_wins - user.laststats.Duels.bridge_doubles_wins 
      }\`\nLosses: \`${
        stats.Duels.bridge_doubles_losses - user.laststats.Duels.bridge_doubles_losses
      }\`\nWLR: \`${
        (((stats.Duels.bridge_doubles_losses - user.laststats.Duels.bridge_doubles_losses) == 0) ? (stats.Duels.bridge_doubles_wins - user.laststats.Duels.bridge_doubles_wins) : (stats.Duels.bridge_doubles_wins - user.laststats.Duels.bridge_doubles_wins)/(stats.Duels.bridge_doubles_losses - user.laststats.Duels.bridge_doubles_losses)).toFixed(2) // even more pain
      }\``, true)
      .addField(`Current Bridge Fours`, `Wins: \`${
        stats.Duels.bridge_four_wins
      }\`\nLosses: \`${
        stats.Duels.bridge_four_losses
      }\`\nW/L: \`${
        (stats.Duels.bridge_four_wins / 
        stats.Duels.bridge_four_losses).toFixed(2)
      }\``, true)
      .addField(`Previous Bridge Fours`, `Wins: \`${
        user.laststats.Duels.bridge_four_wins
      }\`\nLosses: \`${
        user.laststats.Duels.bridge_four_losses
      }\`\nW/L: \`${
        (user.laststats.Duels.bridge_four_wins / 
        user.laststats.Duels.bridge_four_losses).toFixed(2)
      }\``, true)
      .addField(`Daily Bridge Fours`, `Wins: \`${
        stats.Duels.bridge_four_wins - user.laststats.Duels.bridge_four_wins 
      }\`\nLosses: \`${
        stats.Duels.bridge_four_losses - user.laststats.Duels.bridge_four_losses
      }\`\nWLR: \`${
        (((stats.Duels.bridge_four_losses - user.laststats.Duels.bridge_four_losses) == 0) ? (stats.Duels.bridge_four_wins - user.laststats.Duels.bridge_four_wins) : (stats.Duels.bridge_four_wins - user.laststats.Duels.bridge_four_wins)/(stats.Duels.bridge_four_losses - user.laststats.Duels.bridge_four_losses)).toFixed(2) // even more pain
      }\``, true);
      return embed;
  });

  gamemodes.set("dailysumo", (user, stats) => {
    let embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(user.name)
    .setFooter("Since")
    .setTimestamp(user.laststats.time)
      .addField(`Current Sumo Duel`, `Wins: \`${
      stats.Duels.sumo_duel_wins
      }\`\nLosses: \`${
      stats.Duels.sumo_duel_losses
      }\`\nW/L: \`${
        (stats.Duels.sumo_duel_wins / 
        stats.Duels.sumo_duel_losses).toFixed(2)
      }\` `, true)
      .addField(`Previous Sumo Duel`, `Wins: \`${
        user.laststats.Duels.sumo_duel_wins
      }\`\nLosses: \`${
        user.laststats.Duels.sumo_duel_losses
      }\`\nW/L: \`${
        (user.laststats.Duels.sumo_duel_wins / 
        user.laststats.Duels.sumo_duel_losses).toFixed(2)
      }\``, true)
      .addField(`Daily Sumo Duel`, `Wins: \`${
        stats.Duels.sumo_duel_wins - user.laststats.Duels.sumo_duel_wins 
      }\`\nLosses: \`${
        stats.Duels.sumo_duel_losses - user.laststats.Duels.sumo_duel_losses
      }\`\nW/L: \`${
        (((stats.Duels.sumo_duel_losses - user.laststats.Duels.sumo_duel_losses) == 0) ? (stats.Duels.sumo_duel_wins - user.laststats.Duels.sumo_duel_wins) : (stats.Duels.sumo_duel_wins - user.laststats.Duels.sumo_duel_wins)/(stats.Duels.sumo_duel_losses - user.laststats.Duels.sumo_duel_losses)).toFixed(2) // pain (checking if losses is 0 so it doesn't divide by 0 and give NaN)
      }\``, true);
      return embed;
  })

  module.exports = gamemodes;
