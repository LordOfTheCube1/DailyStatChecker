/*const uniqid = require("uniqid");
class Todo {
  constructor(id, discord, desc) {
    this.id = id;
    this.disc = discord;
    this.desc = desc;
    this.timeSet = Date.now();
  }
}
*/
exports.run = async (client, msg, args) => {
  /*
  if(!args[0]) {
    let userTodos = client.cache.filter(e => e.disc == msg.author.id);
    let toSend = "";
    let h = 0;
    userTodos.each(thing => {
      h++;
      toSend += `${h}. `;
      toSend += thing.desc;
      toSend += "\n";
    })
      
    
    return msg.channel.send(toSend);
  } else if (args[0].toLowerCase() == "add" || args[0].toLowerCase() == "set" || args[0].toLowerCase() == "create" || args[0].toLowerCase() == "a") {
    if(!args[1]) return msg.channel.send("You must provide a description!11111!1!11!!");
    args.shift();
    let nextTodo = new Todo(uniqid.process("T-"), msg.author.id, args.join(" "));
    client.cache.set(nextTodo.id, nextTodo);
    await client.db.set(nextTodo.id, nextTodo);
    return msg.channel.send("I have added `" + nextTodo.desc + "` to your todo list.");
  }
  */
 return msg.channel.send("In Development! (maybe)");
}