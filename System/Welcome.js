const {checkWelcome}= require('./MongoDB/MongoDb_Core');

module.exports = async (Atlas, anu) => {
  try {
    let metadata = await Atlas.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "No Description";

    for (let num of participants) {
      try {
        ppuser = await Atlas.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Joined/Got Added in: ${
            metadata.subject
          }\n`
        );
        Atlastext = `
𝐇𝐞𝐥𝐥𝐨 @${WAuserName.split("@")[0]} 𝐒𝐞𝐧𝐩𝐚𝐢, 𝐈'𝐦 𝐇𝐢𝐧𝐚𝐭𝐚 𝐇𝐲𝐮𝐠𝐚✨

╔════════ ≪ °❈° ≫ ═══════╗

                  〄 *𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐢𝐧* 〄
            *${metadata.subject}*

╚════════ ≪ °❈° ≫ ═══════╝

🀄 *Ｇ𝚁𝙾𝚄𝙿 Ｄ𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽* 🀄

${desc}

〘 ʜᴏᴘᴇ ʏᴏᴜ'ʟʟ 𝙵ᴏʟʟᴏᴡ ʀᴜʟᴇs ᴀɴᴅ ᴇɴᴊᴏʏ ʏᴏᴜʀ sᴛᴀʏ 〙

*➢ @${WAuserName.split("@")[0]}*
  `;
        if (WELstatus) {
          await Atlas.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Atlastext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Left/Got Removed from: ${
            metadata.subject
          }\n`
        );
        Atlastext = `
  @${WAuserName.split("@")[0]} *V𝚒𝚛𝚐𝚒𝚗* 𝙻𝚎𝚏𝚝  𝚃𝚑𝚎 *${metadata.subject}*.

  *_I𝙵  T𝙷𝙴  S𝚃𝙰𝚁𝚂  W𝙷𝙴𝚁𝙴  T𝙾  F𝙰𝙻𝙻  F𝚁𝙾𝙼  H𝙴𝙰𝚅𝙴𝙽  T𝙾  D𝙴𝚂𝙲𝚁𝙸𝙱𝙴  Y𝙾𝚄𝚁  B𝙴𝙰𝚄𝚃𝚈✨_*
*_N𝙾  S𝚃𝙰𝚁  W𝙾𝚄𝙻𝙳  L𝙴𝙵𝚃  T𝙷𝙴  H𝙴𝙰𝚅𝙴𝙽  T𝙷𝙰𝚃  D𝙰𝚈....✨✨🗿_*

╭━━╮
┃╭╮┃
┃╰╯╰┳╮╱╭┳━━╮
┃╭━╮┃┃╱┃┃┃━┫
┃╰━╯┃╰━╯┃┃━┫
╰━━━┻━╮╭┻━━╯
╱╱╱╱╭━╯┃
╱╱╱╱╰━━╯
  `;
        if (WELstatus) {
          await Atlas.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Atlastext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
