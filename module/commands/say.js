const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "say",
    prefix: true,
    permission: 0,
    version: "1.0.0",
    credits: "Anik"
};

module.exports.run = async ({ api, event, args }) => {
    try {
        if (!args || args.length === 0) {
            return api.sendMessage("অনুগ্রহ করে বলার  জন্য কিছু লিখুন।", event.threadID, event.messageID);
        }

        const text = args.join(" ");
        const language = "bn"; 
        const filePath = path.resolve(__dirname, `cache/${event.threadID}_${event.senderID}.mp3`);


        const response = await axios({
            method: "GET",
            url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${language}&client=tw-ob`,
            responseType: "stream"
        });


        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
            api.sendMessage(
                { attachment: fs.createReadStream(filePath) },
                event.threadID,
                () => fs.unlinkSync(filePath), 
                event.messageID
            );
        });

        writer.on("error", (err) => {
            console.error(err);
            api.sendMessage("অডিও তৈরি করতে সমস্যা হচ্ছে।", event.threadID, event.messageID);
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("কিছু ভুল হয়েছে।", event.threadID, event.messageID);
    }
};
