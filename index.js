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
        .setApplicationId('1023269983922442373') // Replace '123' with your actual Application ID
        .setType('WATCHING')
        .setURL('https://www.twitch.tv/zensware') // Must be a valid YouTube or Twitch URL
        .setState(null)
        .setName('zensware')
        .setDetails('zensware') // Details without time
        .setStartTimestamp(Date.now())
        .setAssetsLargeImage('https://media.discordapp.net/attachments/1206955445940658287/1277834158152093696/200w.gif?ex=66d13e4c&is=66cfeccc&hm=87ebbdc2e7504ed039106ce9d97663328902a13b5f389f99a5bed24fa7f65ecb&=&width=150&height=150') // Large image link
        .setAssetsLargeText(null) // Text when you hover over the large image
        .setAssetsSmallImage(null) // Small image link
        .setAssetsSmallText(null) // Text when you hover over the small image
        .addButton('My portfolio', 'https://www.zensware.com/'); // Button with URL

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
