const Discord = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const presenceConfigPath = path.join(__dirname, 'presence-config.json');
const presenceConfig = JSON.parse(fs.readFileSync(presenceConfigPath, 'utf-8'));

/**
 * 
 * 
 * @param {Object} config
 * @returns {Discord.Client}
 */
const initializeDiscordClient = (config) => {
  const client = new Discord.Client({
    readyStatus: false,
    checkUpdate: false,
  });

  client.once('ready', async () => {
    console.clear();
    console.log(`Connected to Discord Client: ${client.user.tag}`);

    updateRichPresence(client);

    setInterval(() => updateRichPresence(client), 30000);
  });


  client.login(config.Authorization_Token).catch(console.error);

  return client;
};

/**
 * 
 * 
 * @param {Discord.Client} client
 */
const updateRichPresence = (client) => {
  try {
    const richPresence = new Discord.RichPresence()
      .setApplicationId(presenceConfig.1298676906941743197
)
      .setType(presenceConfig.WATCHING)
      .setURL(presenceConfig."https://www.twitch.tv/mrprocrastinatorsensei")
      .setState(presenceConfig."Serving Lord Rimuru.."
)
      .setName(presenceConfig."Forest of Jura"
)
      .setDetails(presenceConfig."Nation of Tempest"
)
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage(presenceConfig."https://media.discordapp.net/attachments/1181461047736029206/1298685483546841088/tumblr_ddfd0c1510a5918a845f37d667721de6_0975f652_400.webp?ex=672d945b&is=672c42db&hm=90f12124aba9d5a33a5dc6ed3808ffb6fa444ca8287f8e82dd78a7117f8b1bff&animated=true&")
      .setAssetsLargeText(presenceConfig."Diablo" 
)
      .setAssetsSmallImage(presenceConfig."https://media.discordapp.net/attachments/1181461047736029206/1298685367519543326/tensura-rimuru.gif?ex=672d9440&is=672c42c0&hm=9b33f9509346ef840e1256f7134c7e7c9050c0daa0dcc79297da24a1638e7e09&=&width=800&height=450")
      .setAssetsSmallText(presenceConfig."Rimuru Tempest"
);

    if (presenceConfig.buttons && presenceConfig.buttons.length > 0) {
      presenceConfig.buttons.forEach(button => {
        richPresence.addButton(button.Carrd, button."https://mrprocrastinatorsensei.carrd.co/");
      });
    }

    client.user.setActivity(richPresence);
    client.user.setPresence({ status: "idle" });

    console.log('Rich Presence updated successfully!');
  } catch (error) {
    console.error('Error updating Rich Presence:', error.message);
  }
};

module.exports = initializeDiscordClient;
