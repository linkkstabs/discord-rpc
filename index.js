const express = require('express');
const Discord = require('discord.js-selfbot-v13');

const client = new Discord.Client({
  readyStatus: false, // Disables ready status messages
  checkUpdate: false  // Disables automatic updates checks
});

const app = express();
const port = process.env.PORT || 3000;

const Authorization_Token = process.env.Authorization_Token;
const Webhook_ID = process.env.Webhook_ID;
const Webhook_Token = process.env.Webhook_Token;

let Webhook_Support = true;

client.on('ready', async () => {
  console.clear();
  console.log(`zensware.rpc has connected to Discord Client: ${client.user.tag}`);


  const sendWebhookMessage = () => {
    if (Webhook_Support) {
      const embed = new Discord.MessageEmbed()
        .setColor('#545759')
        .setTitle('zensware.rpc | Webhook Logs')
        .setDescription('Our recent update has included "Render.com" hosting with our old functionalities.')
        .addFields(
          { name: 'Discord Client:', value: client.user.tag, inline: true },
          { name: 'Client Uptime:', value: calculateUptime(), inline: true }
        )
        .setThumbnail("https://media.discordapp.net/attachments/1206955445940658287/1223021688971591770/zenith-grey.png?ex=661856b5&is=6605e1b5&hm=0c0699c469634dda8ce20ceb6d31d5cfd8e62005aafe78acae73edae47a3b530&=&format=webp&quality=lossless&width=600&height=450")
        .setFooter({ text: '・Developer: zensware', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

      const webhookClient = new Discord.WebhookClient({ id: Webhook_ID, token: Webhook_Token });
      webhookClient.send({ embeds: [embed] })
        .then(() => console.log('Embed sent successfully!'))
        .catch(console.error);
    }
  };

  const calculateUptime = () => {
    const currentTime = Date.now();
    const uptime = currentTime - client.readyAt;
    const formattedUptime = formatMilliseconds(uptime);
    return formattedUptime;
  };

  const formatMilliseconds = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const updateRichPresence = () => {
    try {
      // Create a new Rich Presence object
      const r = new Discord.RichPresence()
        .setApplicationId('1298676906941743197') // Replace '123' with your actual Application ID
        .setType('STREAMING')
        .setURL('https://www.twitch.tv/mrprocrastinatorsensei') // Must be a valid YouTube or Twitch URL
        .setState('Serving Lord Rimuru..')
        .setName('Forest of Jura')
        .setDetails('Nation of Tempest') // Details without time
        .setStartTimestamp(Date.now())
        .setAssetsLargeImage('https://media.discordapp.net/attachments/1181461047736029206/1298685483546841088/tumblr_ddfd0c1510a5918a845f37d667721de6_0975f652_400.webp?ex=671a769b&is=6719251b&hm=3a5a1690b732cab48ebdb4502094c604af0c5478032cc8fa0d3ed0d16ec55d2c&=&animated=true') // Large image link
        .setAssetsLargeText('Diablo (Primordial Black)') // Text when you hover over the large image
        .setAssetsSmallImage('https://media.discordapp.net/attachments/1181461047736029206/1298685367519543326/tensura-rimuru.gif?ex=671a7680&is=67192500&hm=a83e112383f4fe7ef6ffc01f98ea523d6888bf956b1c783ce95e538813e0b6ba&=') // Small image link
        .setAssetsSmallText('Rimuru Tempest (Demon Lord)') // Text when you hover over the small image
        .addButton('Carrd', 'https://mrprocrastinatorsensei.carrd.co'); // Button with URL

      client.user.setActivity(r);
      client.user.setPresence({ status: "idle" }); // Set user status to 'Do Not Disturb'

      console.log('Rich Presence updated successfully!');
    } catch (error) {
      console.error('Error updating Rich Presence:', error.message);
    }
  };

  updateRichPresence();

  setInterval(updateRichPresence, 30000); // Update every 30 seconds
});

client.login(Authorization_Token).catch(console.error);

app.get('/', (req, res) => {
  res.send('zensware.rpc is running!');
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
