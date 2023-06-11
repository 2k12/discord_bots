function main() {
    const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
    const juego = require('./juego');
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,

        ]
    });


    const config = require('./config.json');
    require('colors');

    client.on('messageCreate', async (message) => {
        if (message.author.bot || !message.guild || message.channel.type === 'dm') return;
        const prefix = config.prefix;

        if (!message.content.startsWith(prefix)) {
            return;
        } else {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            let dts = [];
            dts = juego.main(command.toString());
            client.color = config.color;
            if (command == 'piedra' || command == 'papel' || command == 'tijera') {
                const embed = new EmbedBuilder()
                    .setTitle(` ${dts[0].toUpperCase()} `)
                    .setDescription(`» ¡ ${dts[1]} GG  🎉\n` + `» \`${client.ws.ping}ms \``)
                    .setColor(client.color)
                    .setThumbnail('https://media3.giphy.com/media/MGbmfJ9RobB3a479SE/giphy.gif?cid=ecf05e474bmm7p5skvxd2wo6bf1fta21aeas600prd1ri22z&ep=v1_stickers_search&rid=giphy.gif&ct=s')
                    .setFooter({ text: 'Psp V 1.0.0', iconURL: 'https://i.postimg.cc/8ctBxmVg/uknown.jpg' });

                message.channel.send({ embeds: [embed] })
            }else{
                const embed = new EmbedBuilder()
                .setTitle(' OPCION DESCONOCIDA ! ')
                .setThumbnail('https://cdn.icon-icons.com/icons2/1808/PNG/64/command-line_115191.png')
                .addFields({ name: '_Lista de Opciones_', value: "» $piedra\n » $papel\n » $tijera", inline: true })
                .setColor('#e7c500')
                .setFooter({ text: 'Psp V 1.0.0', iconURL: 'https://i.postimg.cc/8ctBxmVg/uknown.jpg' });


            message.reply({ embeds: [embed] });

            }

        }



    })

    client.login(config.BOT_TOKEN).then(() => {
        console.log(`El bot ${client.user.username} se ha iniciado!`);

        client.user.setActivity(" PpS / ($piedra)✊ -($papel) ✋ - ($tijera)✌");
    }).catch(err => { console.log(err) });

}

main();