const { Command } = require("sheweny");
// Demo of all the different types of options available for a slash command
module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "slash-args",
      type: "SLASH_COMMAND",
      description: "Commande du chapitre 7",
      category: "Misc",
      options: [
        {
          name: "arg1",
          description: "Argument 1",
          type: "STRING",
        },
      ],
    });
  }
  execute(interaction) {
    interaction.reply(interaction.options.getString("arg1"));
  }
};
