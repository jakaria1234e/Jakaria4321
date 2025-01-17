const axios = require('axios');
module.exports.config = {
	name: "talkk",
	version: "1.0.0",
	permission: 0,
	eventType: ["event"],
	credits: "Anik",
	prefix: true,
	description: "",
	category: "",
	cooldowns: 5
};

module.exports.handleEvent = async ({api, event}) => {
const botID = api.getCurrentUserID(); 
const repliedMessage = event.messageReply;
const errmsg = '~~ওহ্, baby! এটা আমাকে শিখানো হয় নাই🥺।~~\n\n এইটা আমাকে শিখাও এইভাবে\n\n /teach কি করো = তোমার কথা ভাবতাছি জান \n\n /teach khaico = tumi khele amar khawa hoy jay🥰'


if(event.body) {

if (event.body.toLowerCase() === 'bot' || event.body.toLowerCase() === 'anik' || event.body === 'বট') {
            const tl = [
                "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
                "উফ্স বেবী একটা কিস দেও 🥵",
                "এতো ডাকো কেন প্রেম করবা নাকি 😌",
                "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
                "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋",
                "উফ্ বেবি তোমার কচি কচি ঠোঁটে ummmmmmmmmmmmmmmmmmmmmah 💋💋🙈",
                "I love you",
                "মেয়েরা প্রেম করলে মেসেজ দেও 👉😁  m.me/100001453534533",
                "I love you janu🥰",
                "Bot বলে অসম্মান করছি,😰😿",
                "Bot না , জানু বল জানু 😘",
                "বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋",
                "বলো কি করতে পারি তোমার জন্য",
                "আমি তো অন্ধ কিছু দেখি না🐸 😎",
                "হুম জান তোমার ওই খানে উম্মহ😑😘",
                "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
                "I love you jan 💝🙈",
                "হুম জান তোমার অইখানে উম্মমাহ😷😘",
                "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰",
                "আমি এখন ANIK বস আর সাথে বিজি আছি",
                "what are you asking me to do?",
                "Hmm jan ummah😘😘",
                "jang hanga korba 🙂🖤",
                "iss ato dako keno lojja lage to 🫦🙈"
            ];

            const randomMessage = tl[Math.floor(Math.random() * tl.length)];
            await api.sendMessage(randomMessage, event.threadID, event.messageID);
        } else if(event.body.toLowerCase().startsWith("bot")) {



var rcv = event.body.slice(4);
try {
const res = await axios.get(`${global.anikApi.talk}/get?key=${rcv}`);
api.sendMessage(res.data.reply, event.threadID, event.messageID);
} catch (error) {
    console.error("Error:", error.message);
    api.sendMessage(errmsg, event.threadID, event.messageID); 
}


    }else if(event.body.toLowerCase().startsWith("anik")) {



var rcv = event.body.slice(5);
try {
const res = await axios.get(`${global.anikApi.talk}/get?key=${rcv}`);
api.sendMessage(res.data.reply, event.threadID, event.messageID);
} catch (error) {
    console.error("Error:", error.message);
    api.sendMessage(errmsg, event.threadID, event.messageID); 
}


    }else {
    
    try{
    
    if (repliedMessage && repliedMessage.senderID === botID) {
    
    
 const msg = event.body.toLowerCase().trim();
 
        const response = await axios.get(`${global.anikApi.talk}/get?key=${encodeURIComponent(msg)}`);
        
        
    api.sendMessage(response.data.reply, event.threadID, event.messageID);
        
        
    }
        
    } catch(error) {
    
    console.log(error)
      api.sendMessage(errmsg, event.threadID, event.messageID); 
        
    }
    
   
    
}







    
}}
