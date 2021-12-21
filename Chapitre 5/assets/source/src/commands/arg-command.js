const { Command } = require("sheweny");

module.exports = class PingUserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "arg-command",
      description: "Teste des commandes message avec des arguments",
      category: "Misc",
      args: [
        {
          name: "arg1",
          type: "STRING",
        },
        {
          name: "arg2",
          type: "NUMBER",
          default: 0,
        },
        {
          name: "arg3",
          type: "BOOLEAN",
          default: true,
        },
        {
          name: "arg4",
          type: "GUILD",
        },
        {
          name: "arg5",
          type: "CHANNEL",
        },
        {
          name: "arg6",
          type: "MEMBER",
        },
        {
          name: "arg7",
          type: "GUILD_EMOJI",
        },
        {
          name: "arg8",
          type: "ROLE",
        },
        {
          name: "arg9",
          type: "USER",
        },
        {
          name: "arg10",
          type: "REST",
          default: "Test de défaut",
        },
      ],
    });
  }

  execute(message, args) {
    console.log(args);
    message.reply({
      content: `Réponse de la commande`,
    });
  }
};
