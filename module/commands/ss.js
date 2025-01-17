const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "ss",
    prefix: true,
    permission: 0,
    version: "1.0.0",
    credits: "Anik"
};

module.exports.run = async ({ api, event, args }) => {
    try {
        const url = args[0];
        if (!url || !url.startsWith("http")) {
            return api.sendMessage("দয়া করে একটি সঠিক URL দিন।", event.threadID, event.messageID);
        }

        // Puppeteer দিয়ে স্ক্রিনশট নেয়া
        const browser = await puppeteer.launch({
            headless: true, // ব্রাউজার খুলবে না, শুধু রেন্ডার হবে
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        // স্ক্রিনশট সংরক্ষণ
        const screenshotPath = path.resolve(__dirname, 'screenshot.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // ব্রাউজার বন্ধ করা
        await browser.close();

        // স্ক্রিনশট পাঠানো
        return api.sendMessage({
            body: `স্ক্রিনশট নেয়া হয়েছে: ${url}`,
            attachment: fs.createReadStream(screenshotPath),
        }, event.threadID, () => fs.unlinkSync(screenshotPath), event.messageID);

    } catch (error) {
        console.error(error);
        return api.sendMessage("স্ক্রিনশট নিতে সমস্যা হয়েছে।", event.threadID, event.messageID);
    }
};
