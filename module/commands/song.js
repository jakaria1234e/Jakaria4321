const fs = require('fs');
const path = require('path');
const ytdl = require('@distube/ytdl-core');
const youtube = require('youtube-search-api');

module.exports.config = {
    name: "song",
    description: "Downloads and sends a song from YouTube",
    permission: 0,
    credit: "Anik",
    prefix: true,
    cooldown: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const filePath = path.join(__dirname, 'output.mp3');

    if (!args || args.length === 0) {
        return api.sendMessage("অনুগ্রহ করে একটি গানের নাম লিখুন।", event.threadID, event.messageID);
    }

    try {
        const info = await youtube.GetListByKeyword(args.join(" song"), false, 2);
        if (!info.items || info.items.length === 0) {
            return api.sendMessage("কোনো গান খুঁজে পাওয়া যায়নি।", event.threadID, event.messageID);
        }

        const rndmp = Math.floor(Math.random() * info.items.length);
        const songInfo = info.items[rndmp];
        const title = songInfo.title;
        const link = "https://www.youtube.com/watch?v=" + songInfo.id;

        console.log(`Downloading... Link: ${link} | Title: ${title}`);
        const stream = ytdl(link, {
            quality: 'lowestaudio', 
        });

        stream.pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
                console.log('Download complete!');
                api.sendMessage({
                    body: `গান ডাউনলোড সম্পন্ন হয়েছে: ${title}`,
                    attachment: fs.createReadStream(filePath),
                }, event.threadID, () => {
                    fs.unlinkSync(filePath); // ফাইল মুছে ফেলে
                });
            })
            .on('error', (err) => {
                console.error('Write stream error:', err);
                api.sendMessage("ডাউনলোড করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
            });
    } catch (err) {
        console.error('Error:', err);
        api.sendMessage("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};
