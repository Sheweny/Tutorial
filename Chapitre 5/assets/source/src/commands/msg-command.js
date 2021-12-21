const { Command } = require("sheweny");

module.exports = class PingUserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "msg-command",
      description: "Teste des commandes message",
      category: "Misc",
    });
  }

  execute(message) {
    message.reply({
      content: `Voici une commande message !`,
    });
  }
};
