const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "help",
    description: "Displays all available commands and events",
    permission: 0,
    "credit": "Anik",
    prefix: true,
    cooldown: 5,
};

module.exports.run = async ({ api, event, permissions }) => {
    const commandsAndEvents = {
        commands: [],
        events: [],
    };

    const loadFolderContent = (folderPath, type) => {
        fs.readdirSync(folderPath).forEach((file) => {
            if (file.endsWith(".js")) {
                try {
                    const module = require(path.join(folderPath, file));
                    if (module.config) {
                        if (type === "command") {
                            commandsAndEvents.commands.push(module.config);
                        } else if (type === "event") {
                            commandsAndEvents.events.push(module.config);
                        }
                    }
                } catch (error) {
                    console.error(`Error loading file ${file}:`, error);
                }
            }
        });
    };

    const commandPath = path.join(__dirname, "../../module/commands");
    loadFolderContent(commandPath, "command");

    const eventPath = path.join(__dirname, "../../module/events");
    loadFolderContent(eventPath, "event");

    const totalCommands = commandsAndEvents.commands.length;
    const totalEvents = commandsAndEvents.events.length;

    let message = `╭━〔 🌐 COMMAND INFO 〕━╮\n`;
    message += `┣ 💥 Total Commands: ${totalCommands}\n`;
    message += `┣ 🎉 Total Events: ${totalEvents}\n`;
    message += `╰━━━━━━━━━━━━━━━━━━━╯\n\n`;

    message += `✨ Here are all available commands and events: ✨\n\n`;

    const formatModuleInfo = (module, type) => {
        const permissionLevel =
            module.permission === 0
                ? "All Users"
                : module.permission === 3
                ? "Admins Only"
                : "Others";
        const prefixRequired = module.prefix === false ? "No" : "Yes";

        return `╭━〔  ${module.name} (${type}):〕━╮\n` +
               `┣ 🔑 Permission: ${permissionLevel}\n` +
               `┣ ⏱️ Prefix Required: ${prefixRequired}\n` +
               `╰━━━━━━━━━━━━━━━━━━━╯\n\n`;
    };

    commandsAndEvents.commands.forEach((module) => {
        if (module.permission === 0 || permissions >= module.permission) {
            message += formatModuleInfo(module, "Command");
        }
    });

    commandsAndEvents.events.forEach((module) => {
        if (module.permission === 0 || permissions >= module.permission) {
            message += formatModuleInfo(module, "Event");
        }
    });

    message += `🌟 **Hey There! Feel Free To Reach Out If You Have Any Problems!** 🌟\n`;
    message += `📩 **Contact me on Facebook:** https://www.facebook.com/LostFragmentX`;

    api.sendMessage(message, event.threadID);
};
