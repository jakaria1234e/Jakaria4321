const axios = require('axios');

module.exports.config = {
    name: "trans",
    prefix: true,
    permission: 0,
    version: "1.0.0",
    credits: "Anik"
};

module.exports.run = async ({ api, event, args }) => {
    try {
        let textToTranslate;


        if (event.type === "message_reply" && event.messageReply.body) {
            textToTranslate = event.messageReply.body; 
        } else if (args.length > 0) {
            textToTranslate = args.join(" "); 
        } else {
            return api.sendMessage("অনুগ্রহ করে ট্রান্সলেট করার জন্য একটি মেসেজ রিপ্লাই করুন অথবা `/trans` এর পর কিছু লিখুন।", event.threadID, event.messageID);
        }


        const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
            params: {
                client: "gtx",
                sl: "auto", 
                tl: "bn", 
                dt: "t",
                q: textToTranslate 
            }
        });

        
        const translatedText = response.data[0][0][0];
        return api.sendMessage(`অনুবাদ: ${translatedText}`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage("ট্রান্সলেশন করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
    }
};
