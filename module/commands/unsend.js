module.exports.config = {
    name: "unsend",
    description: "Unsend the bot's message that you replied to.",
    permission: 0, 
    prefix: true,
    cooldown: 5
};

module.exports.run = async ({ api, event }) => {
    try {
        
        if (!event.messageReply) {
            return api.sendMessage("Please reply to the bot's message to unsent it.", event.threadID, event.messageID);
        }

       
        const replyMessageID = event.messageReply.messageID;

        
        await api.unsendMessage(replyMessageID);
       
    } catch (err) {
        console.error(err);
        api.sendMessage("Unable to unsent the message. Please try again later.", event.threadID, event.messageID);
    }
};
