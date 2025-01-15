const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "x",
  description: "বাংলা টেক্সট থেকে ভয়েসে রূপান্তর",
  permission: 0,
  prefix: true,
  credits: "Anik",
  cooldown: 5,
};

module.exports.run = async function ({ args, api, event }) {
  if (args.length === 0) {
    return api.sendMessage("দয়া করে কিছু টেক্সট দিন। উদাহরণ: /x <আপনার টেক্সট>", event.threadID);
  }

  const text = args.join(" ");
  const outputFile = path.join(__dirname, "output.mp3");
  const pitch = 80; 
  const speed = 140; 


  exec(`espeak -v bn+male1 -p ${pitch} -s ${speed} "${text}" --stdout > ${outputFile}`, (err) => {
    if (err) {
      console.error("ভয়েস তৈরিতে সমস্যা:", err);
      return api.sendMessage("দুঃখিত, ভয়েস তৈরি করা সম্ভব হয়নি।", event.threadID);
    }


    api.sendMessage(
      {
        body: "ভয়েস তৈরি হয়েছে। এটি শুনুন।",
        attachment: fs.createReadStream(outputFile),
      },
      event.threadID,
      (error) => {
        if (error) {
          console.error("মেসেজ পাঠাতে সমস্যা:", error);
        } else {
          console.log("ভয়েস পাঠানো হয়েছে।");


          fs.unlink(outputFile, (err) => {
            if (err) {
              console.error("ফাইল ডিলিট করতে সমস্যা:", err);
            } else {
              console.log("ফাইল সফলভাবে ডিলিট করা হয়েছে।");
            }
          });
        }
      }
    );
  });
};
