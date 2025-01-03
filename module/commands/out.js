module.exports.config = {
  name: "out",
  version: "1.0.0",
  credit: "Anik",
  description: "Make the bot leave the group",
  permission: 2,  
  prefix: true,
  category: "admin",
};

module.exports.run = async ({ api, event }) => {
api.sendMessage('good by miss you all🥺', event.threadID, event.messageID)
  try {
    await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
    console.log("Bot has left the group.");
  } catch (error) {
    console.error("Error leaving the group:", error);
    api.sendMessage("গ্রুপ থেকে লেফট নেওয়ার সময় সমস্যা হয়েছে।", event.threadID);
  }
};
