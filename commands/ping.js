

exports.run = async (client, msg, args) => {
  console.log(client.ws.ping + "ms");
  return msg.channel.send(`Websocket ping: ${client.ws.ping}ms `);
}