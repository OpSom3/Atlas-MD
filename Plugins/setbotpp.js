
const fs = require("fs");
const Jimp = require("jimp");

module.exports = {
  name: "setbotpp",
  alias: ["setselfpp", "setselfpp"],
  desc: "Ban a member",
  category: "core",
  usage: "setbotpp <mention image>",
  react: "🎀",
  start: async (
    Miku,
    m,
    {
      text,
      prefix,
      isBotAdmin,
      isAdmin,
      mentionByTag,
      pushName,
      isCreator,
      modStatus,
      botNumber,
      mime,
      quoted,
    }
  ) => {
    if (modStatus == "false" && !isCreator)
      return m.reply("Sorry, only my *Devs* and *Mods* can use this command !");

    if (/image/.test(mime)) {
      let quotedimage = await Miku.downloadAndSaveMediaMessage(quoted);
    var { preview } = await generatePP(quotedimage);

    await Miku.query({
      tag: "iq",
      attrs: {
        to: botNumber,
        type: "set",
        xmlns: "w:profile:picture",
      },
      content: [
        {
          tag: "picture",
          attrs: { type: "image" },
          content: preview,
        },
      ],
    });
    fs.unlinkSync(quotedimage);


      //await Miku.updateProfilePicture(botNumber, { url: mediaMess }).catch((err) =>
        //fs.unlinkSync(media)
     // );
      m.reply("Successfully changed bot profile picture.");
    } else {
      m.reply(
        "Please mention an *image* and type *${prefix}setbotppc* to change bot profile picture."
      );
    }
  },
};

async function generatePP(buffer) {
    const jimp = await Jimp.read(buffer);
    const min = jimp.getWidth();
    const max = jimp.getHeight();
    const cropped = jimp.crop(0, 0, min, max);
    return {
      img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
      preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
    };
  }
