exports.run = async (client, msg, args) => {
if(!msg.guild.id === '728493944182145035' && !msg.author.id == "439172671922503699") return;
if(!args[0]) return;
let user = client.cache.get(args[0]);
let response = `**USER ${args[0]}**\n\n${JSON.stringify(user)} `.slice(0, 500) + " and so on";
return msg.channel.send(response);
}