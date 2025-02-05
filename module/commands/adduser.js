module.exports.config = {
  name: "add",
  version: "1.0.0",
  prefix: true,
  permission: 0,
  credits: "Anik",
  description: "গ্রুপে নতুন ইউজার এড করার জন্য",
  category: "group",
  usages: "/add userId",
  cooldowns: 5
};

module.exports.run = ({ args, api, event }) => {
  if (!args[0]) {
    return api.sendMessage("দয়া করে এড করার জন্য একটি User ID প্রদান করুন।", event.threadID);
  }

  let userID = args[0];

  api.addUserToGroup(userID, event.threadID, (error, info) => {
    if (error) {
      api.sendMessage(
        `"${userID}" \n এড করতে পারলাম না, সম্ভবত ব্লক করে রেখেছে। 😒🫤`,
        event.threadID
      );
    } else {
      api.sendMessage(`"${userID}" কে সফলভাবে গ্রুপে যোগ করা হয়েছে!`, event.threadID);
    }
  });
};
