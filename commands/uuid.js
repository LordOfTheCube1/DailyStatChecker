

const api = require('../api.js');

exports.run = async(client, msg, args) => {
  let result = await api.mojang(args[0]);
  return msg.channel.send(result.id);
}