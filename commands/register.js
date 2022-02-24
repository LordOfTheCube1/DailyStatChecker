class User {
  constructor(discord, uuid, name) {
    this.discord = discord;
    this.uuid = uuid;
    this.name = name;
    this.laststats = null;
    }
}
const { mojang } = require('../api.js');
exports.run = async(client, msg, args) => {

  if(!args[0]) return msg.channel.send("You need to provide a username lol");

  const profile = await mojang(args[0]);
  if(profile.invalid) return msg.channel.send("Please provide a **valid** username.");
  if(client.cache.has(msg.author.id)) {
    client.db.delete(msg.author.id).then(() => {
      client.cache.delete(msg.author.id);
    });
  }
  const user = new User(msg.author.id, profile.id, profile.name);
  client.db.set(user.discord, user).then(() => {
    client.cache.set(user.discord, user); 
  });
  
  return msg.channel.send(`You have been registered as ${user.name}.`);

}