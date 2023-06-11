const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function main () {

    app.use(express.static('src/public'));

    app.all('/', (req, res) => {
        res.sendFile(__dirname + '/src/public/index.html');
    });
    bot();

    app.listen(port);
    // console.log(`Aplicativo corriendo en el puerto: ${port}`);
        
}

function bot(){
    const config = require("./config.json");
    const { Client, GatewayIntentBits, EmbedBuilder, ModalBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputBuilder, TextInputStyle, Events, InteractionType } = require('discord.js');

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });



    client.on('messageCreate', async (message) => {
        const channel = message.channel;
        const messages = await channel.messages.fetch();
        const files = messages.map((msg) => msg.attachments.first());

        const prefix = "!";
        if (message.content.startsWith(prefix)) {
            if (message.content === '!bDocs') {
                // * saber si hay archivos o no
                let aux = 0;
                files.forEach(file => {
                    if (file === undefined) {
                        aux = aux;
                    }
                    else {
                        aux = 1;
                    }
                });
                // * si no hay archivos
                if (aux === 0) {
                    // message.reply('No se encontraron archivos en este canal.');

                    const embed = new EmbedBuilder()
                        .setTitle(' Doc Finder ')
                        .setDescription('No se encontraron archivos en el canal. ')
                        .setColor('#ff0534')
                        .setThumbnail('https://icons.iconseeker.com/png/128/vista-elements/error-circle.png')
                        .setFooter({ text: `${client.user.username} V1.0.0`, iconURL: 'https://cdn.icon-icons.com/icons2/570/PNG/512/document_9_icon-icons.com_54619.png' });

                    message.reply({ embeds: [embed] });


                }
                else {
                    const embed = new EmbedBuilder()
                        // .spliceFields(1,6)
                        .setTitle(' Doc Finder ')
                        .setDescription('Archivos encontrados en el canal: ')
                        .setThumbnail('https://cdn.icon-icons.com/icons2/1508/PNG/512/anydo_104098.png')
                        .setColor('#72cb10')
                        .setFooter({ text: `${client.user.username} V1.0.0`, iconURL: 'https://cdn.icon-icons.com/icons2/570/PNG/512/document_9_icon-icons.com_54619.png' });


                    files.forEach((file) => {
                        if (file !== undefined) {
                            try {
                                embed.addFields({ name: `📄 _${file.name}_ `, value: `[**Descargar ⬇**](${file.url})`, inline: false });
                            } catch (error) {
                                if (error instanceof Error) {
                                    console.log(error);
                                }
                            }
                        }
                    });
                    message.reply({ embeds: [embed] });
                }

            } else if (message.content === '!bpDocs') {
                let button = new ActionRowBuilder();
                button.addComponents(
                    new ButtonBuilder()
                        .setCustomId('verification-button')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Busqueda Personalizada 🔎'),
                );
                message.reply({
                    components: [button],
                });
            } else if (message.content !== "!bDocs" || message.content !== "!bpDocs") {

                const embed = new EmbedBuilder()
                    .setTitle('Comando No Encontrado (404)')
                    .setThumbnail('https://cdn.icon-icons.com/icons2/1808/PNG/64/command-line_115191.png')
                    .addFields({ name: '_Lista de Comandos_', value: "» !bDocs → (Buscar Todos los Documentos)\n » !bpDocs → (Busqueda Personalizada)\n", inline: true })
                    .setColor('#e7c500')
                    .setFooter({ text: `${client.user.username} V1.0.0`, iconURL: 'https://cdn.icon-icons.com/icons2/570/PNG/512/document_9_icon-icons.com_54619.png' });

                message.reply({ embeds: [embed] });
                return;
            } else {

            }

        } else {

        }

    });


    client.on(Events.InteractionCreate, async (interaction) => {
        const channel = interaction.channel;
        const messages = await channel.messages.fetch();
        const files = messages.map((msg) => msg.attachments.first());


        if (interaction.isButton()) {
            if (interaction.customId === 'verification-button') {
                const modal = new ModalBuilder()
                    .setCustomId('verification-modal')
                    .setTitle('Busqueda Personalizada')
                    .addComponents([
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('command-input')
                                .setLabel('Archivo')
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(3)
                                .setMaxLength(12)
                                .setPlaceholder('Ingrese el nombre del archivo a buscar ! ')
                                .setRequired(true),
                        ),
                    ]);

                await interaction.showModal(modal);
            }
        }

        if (interaction.type === InteractionType.ModalSubmit) {
            if (interaction.customId === 'verification-modal') {
                const response = interaction.fields.getTextInputValue('command-input');


                const embed = new EmbedBuilder()
                    // .spliceFields(1,6)
                    .setTitle(' Doc Finder - Busqueda Personalizada')
                    .setDescription('Archivo encontrado: ')
                    .setThumbnail('https://cdn.icon-icons.com/icons2/1508/PNG/512/anydo_104098.png')
                    .setColor('#72cb10')
                    .setFooter({ text: `${client.user.username} V1.0.0`, iconURL: 'https://cdn.icon-icons.com/icons2/570/PNG/512/document_9_icon-icons.com_54619.png' });

                // console.log(files);
                let auxiliar_si_no = 0;
                files.forEach(file => {
                    try {
                        if (file !==undefined) {
                            let nombse =file.name.split('.');
                            let nse = nombse[0];
                            // console.log(file.name);
                            if(response == nse){
                                auxiliar_si_no= 1;
                                embed.addFields({ name: `📄 _${file.name}_ `, value: `[**Descargar ⬇**](${file.url})`, inline: false });
                            }
                            else{
                                auxiliar_si_no = auxiliar_si_no;
                            }
                        }                       
                    } catch (error) {
                        if (error instanceof Error) {
                            console.log(error);
                        }
                    }                    
                });
                                
                if (auxiliar_si_no ==1){
                    interaction.reply({ embeds: [embed] });
                }else{
                    interaction.reply(`El Archivo \"${response}\" no existe!`);
                }

            }
        }
    });


    client.login(config.BOT_TOKEN).then(() => {
        console.log(`El bot ${client.user.username} se ha iniciado!`);

        client.user.setActivity(`${client.user.username} 🔎`);
    }).catch(err => { console.log(err) });

}

main();

