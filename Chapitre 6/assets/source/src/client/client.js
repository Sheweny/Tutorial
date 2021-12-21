const { ShewenyClient } = require("sheweny");
const { Intents } = require("discord.js");

const client = new ShewenyClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
  presence: {
    status: "online",
    activities: [
      {
        name: "Tutorial Bot",
        type: "WATCHING",
      },
    ],
  },
  managers: {
    commands: {
      directory: "./commands",
      guildId: ["921728751434362901"],
      autoRegisterApplicationCommands: true,
      loadAll: true,
      prefix: "!",
    },
    events: {
      directory: "./events",
      loadAll: true,
    },
  },
});

module.exports = client;
