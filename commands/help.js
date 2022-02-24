const { MessageEmbed } = require("discord.js");
exports.run = async (client, msg, args) => {
  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription("Welcome to Daily Stat Checker. In order to check your daily stats, you will have to register using \`;register <ign>\`. This ign will be linked to your account, and you can change which ign you want to register with by running the same command. \n\nYou will then have to wait for your stats to be cached in the database, this will normally happen every 12 hours.Then, run the command \`;daily <gamemode>\`, and you will be able to see your stats for that gamemode since the stats were last updated. Currently only bridge and sumo are supported, bedwars will be soon.\n\nIf you just want to check your stats, you can do \`;mystats <gamemode\` (bridge and bedwars supported), and if you want to check someone else's stats, you can do \`;stats <ign> <gamemode>\`. You can also do \`;track <ign>\` so that you can see other people's daily stats.")
  .setTitle("Daily Stat Checker Help");
  return msg.channel.send(embed);
}