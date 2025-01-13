const fs = require('fs');

module.exports.config = {
  name: "0prefix",
  prefix: false,
  permission: 0,
  eventType: ["event"],
  version: "1.0.0",
  credits: "Anik",
  description: ""
};

module.exports.handleEvent = async ({ api, event }) => {
  try {

    if (event.body && event.body.toLowerCase() === 'prefix') {
      const msg = {
        body: `Hyy I'm ${global.config.BOTNAME}\nMy prefix: ${global.config.PREFIX}`,
        attachment: fs.createReadStream(`${__dirname}/cache/bot-prefix-prefix.gif`)
      };


      return api.sendMessage(msg, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error in 0prefix event handler:", error);
  }
};
