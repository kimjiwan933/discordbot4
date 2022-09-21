const {MessageEmbed} = require('discord.js') 

module.exports = {
    name:"bmi", 
    execute(message,args){ 
        if(!args[0] || !args[1]) return message.reply("사용법 : .bmi (키) (몸무게)") 
        if(isNaN(args[0]) || isNaN(args[1])) return message.reply("올바른 값을 입력해주세요") 
        const bmi  = (args[1] / ((args[0] * args[0])/ 10000)).toFixed(1) 
        let tkdxo  
        if(bmi < 18.5) tkdxo = "저체중" 
        if(bmi > 24.9) tkdxo = "과체중" 
        if(bmi > 30) tkdxo = "비만"
        if(bmi < 24.9 && bmi > 18.5) tkdxo = "정상"

        const embed = new MessageEmbed() 
        .setTitle(`${message.author.username}님의 BMI정보`) 
        .addFields({name : "🧍 키" , value : args[0]}) 
        .addFields({name : "💪몸무게",value : args[1]})
        .addFields({name : "🗜️ BMI 지수",value : bmi})
        .addFields({name : "🗓️ 상태" , value : tkdxo})
        .setColor("GREEN")
        .setTimestamp()

        message.channel.send({embeds : [embed]})
    }
}