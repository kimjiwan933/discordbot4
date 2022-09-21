const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "인증",
  execute(message) {
    if (message.channel.type !== "GUILD_TEXT") return;
    const url = "https://api.taejung.xyz/v1/captcha";
    try {
      fetch(url)
        .then((res) => res.json())
        .then(async (json) => {
          const embed = new MessageEmbed()
            .setTitle("아래코드를 입력해주세요 제한시간 : 30초")
            .setImage(json.url)
            .setColor("BLUE");

          const msg = await message.channel.send({ embeds: [embed] });

          try {
            const filter = (m) => {
              if (m.author.bot) return;
              if (m.author !== message.author) return;
              if (m.content === json.key) return true;
              else m.react("😒");
            };

            const response = await msg.channel.awaitMessages({
              filter,
              max: 1,
              time: 30000,
              errors: ["time"],
            });
            if (response) {
              message.member.roles.add("1020991105724063844");
              message.channel.send({ content: "인증에 성공했습니다" });
            }
          } catch (error) {
            message.reply("시간초과");
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
};