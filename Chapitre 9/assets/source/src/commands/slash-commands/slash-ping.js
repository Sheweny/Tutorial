const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      type: "SLASH_COMMAND",
      description: "Ping the bot",
      category: "Misc",
    });
  }
  execute(interaction) {
    const start = Date.now();
    interaction.reply({ content: "Pong !" }).then(() => {
      const end = Date.now();
      const time = end - start;
      interaction.editReply({ content: `Pong : ${time}ms` });
    });
  }
};
