const { Command } = require("sheweny");

module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "autocomplete-fête",
      type: "SLASH_COMMAND",
      description: "Commande du chapitre 7",
      category: "Misc",
      options: [
        {
          name: "fête",
          description: "Récupère une fête américaine",
          type: "STRING", // String
          autocomplete: true, // Indispensable pour que la fonction onAutocomplete soit appelée
        },
      ],
    });
  }

  execute(interaction) {
    interaction.reply(
      "La fete séléctionnée est : " + interaction.options.getString("fête")
    );
  }

  async onAutocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true); // On récupère l'option qui est sélectionnée
    const choices = [
      "Halloween",
      "Thanksgiving",
      "New Year’s Day",
      "Martin Luther King Day",
      "Valentine’s Day",
      "Presidents’ Day",
      "Take Ours Daughters and Sons to Work Day",
      "Easter",
      "Mother’s Day",
      "Memorial Day",
      "Father’s Day",
      "Independence Day",
      "Labor Day",
      "Columbus Day",
      "Veterans Day",
      "Federal Holidays",
    ];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedOption.value)
    ); // On filtre les choix en fonction de ce que l'utilisateur à tapé
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    ); // On répond avec les choix filtrés
  }
};
