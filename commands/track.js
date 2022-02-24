class User {
  constructor(uuid, name) {
    this.discord = null;
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
  if(client.cache.has(profile.id)) return msg.channel.send("This user is already being tracked.");
  const user = new User(profile.id, profile.name);
  client.db.set(user.uuid, user).then(() => {
    client.cache.set(user.uuid, user); 
  });
  
  return msg.channel.send(`${user.name} will now be tracked.`);

}