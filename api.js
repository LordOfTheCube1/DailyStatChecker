const fetch = require('node-fetch');
exports.mojang = async name => {
  let response = await fetch(`http://api.mojang.com/users/profiles/minecraft/${name}`);
  let result = await response.text();
  console.log(result);
  try {
    result = JSON.parse(result);
  } catch(err) {
    result = {
      id: "That user doesn't exist!",
      invalid: true,
    };
    console.log(err);
  }
  return result;
}