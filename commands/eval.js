/* 
 COPYRIGHT (C) 2021 LordOfTheCube and Komali
 Licensed under GNU General Public License v3.0 (more details in "LICENSE" file)
*/

const beautify = require('beautify');
const { MessageEmbed } = require('discord.js');
String.prototype.replaceAll = function(old, to) {
  if(!(typeof to === "string")) throw new Error("Expected second parameter to be a string, got " + typeof to);
  if(!(typeof old === "string")) throw new Error("Expected first parameter to be string, got " + typeof old);

  let str = this.toString();
  str = str.split(old).join(to);
  return str;
}
String.prototype.parseCodeBlock = function() {
   /* var str = this.toString()
    if (str.includes("\n")) {
        str = str.split(/\n/g)
        if (str.length == 1) {
            return str.join()
        } else {
            str.shift()
            if (str[0].includes("```")) {
              
                    str[0] = str[0].replace("```", "")
                if(str.length != 1){ str[0] = str[0].split(" ").shift().join(" ")}
            }
            if (str[str.length - 1].includes("```")) {
                str[str.length - 1] = str[str.length - 1].substring(0, str[str.length - 1].length - 4)
            }
            return str.join("\n")
        }
    } else {
        return str
    } ---- old code, is better implementation but hard to get working*/

    // =====

    // bad implementation, takes every instance of "```" and removes it rather than just the ones at the beginning and end, meaning that certain things might not be able to be evaluated in code blocks, but whatever i'm tired and not bothered to write something complicated rn
    let str = this.toString();
    if(str.startsWith("\n")) str = str.replace("\n", "");
    if(str.includes("```")) str = str.replaceAll("```", "");
    return str;
}
exports.run = async (client, msg, args) => {
    let message = msg;
    if (!msg.author.id === '439172671922503699') {
        const notOwner = await msg.channel.send('e')
        return notOwner.delete({
            timeout: 15000,
            reason: 'User of evaluation command not owner'
        });
    }
    if (!args[0]) {
        const runNothing = await msg.channel.send('yes because running nothing is possible');
        return runNothing.delete({
            timeout: 20000,
            reason: 'No code provided in evaluation command'
        });
    }
    let toEval = args.join(" ");
    try {
        if (toEval.toLowerCase().includes('token')) {
            return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                .setFooter("Contains keyword 'token'.")
                .setColor(0xFF0000));
        }
        if (toEval.toLowerCase().includes('config')) {
            return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                .setFooter("Contains keyword 'config'")
                .setColor(0xFF0000));
        }
        if (toEval.toLowerCase().includes('.env')) {
            return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                .setFooter("Contains keyword '.env'")
                .setColor(0xFF0000));
        }
        toEval = toEval.parseCodeBlock()
        console.log(toEval);
        var evaluated = eval(toEval);
        const type = (typeof evaluated)

        if (type == "object" && JSON.stringify(evaluated, null, 4).length <= 500) {
            evaluated = "```json\n" + JSON.stringify(evaluated, null, 4) + "```"


        }
        let embed = new MessageEmbed()
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTitle('Eval')
            .addField('Ran:', `\`\`\`js\n${beautify(args.join(" ").parseCodeBlock(), {format: 'js'})}\n\`\`\``)
            .addField('Returned:', evaluated)
            .addField("Type of:", type);
        msg.channel.send(embed);


    } catch (e) {

        let embed = new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle('\:x: Error!')
            .setTimestamp()
            .setDescription(e.stack)
            .setFooter(client.user.username, client.user.displayAvatarURL);
        return msg.channel.send(embed);


    }
}

// e