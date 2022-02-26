const { MessageEmbed } = require("discord.js");
const { Command } = require("sheweny");
const cities = require("../../../assets/fr_cities.json");
module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "autocomplete-city",
      type: "SLASH_COMMAND",
      description: "Get informations about a city",
      category: "Misc",
      options: [
        {
          name: "city",
          description: "The city you want to get informations about",
          type: "STRING", // String
          autocomplete: true, // Indispensable pour que la fonction onAutocomplete soit appelée
        },
      ],
    });
  }

  execute(interaction) {
    const cityName = interaction.options.getString("city");
    const city = cities.find((city) => city.city === cityName);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Informations about ${cityName}`)
      .setDescription(`Voici quelques informations sur la ville de ${cityName}`)
      .addField("Nom", city.city, true)
      .addField("Latitude", city.lat, true)
      .addField("Longitude", city.lng, true)
      .addField("Pays", city.country, true)
      .addField("Région", city.admin_name, true)
      .addField("Population", city.population_proper, true);
    interaction.reply({ embeds: [embed] });
  }

  async onAutocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true); // On récupère l'option qui est sélectionnée

    const filtered = cities.filter((choice) =>
      choice.city.startsWith(focusedOption.value)
    ); // On filtre les choix en fonction de ce que l'utilisateur à tapé

    /* On ne répond que 15 options maximum pour une meilleur expérience utilisateur */
    const filteredLimit = filtered.slice(0, 15);
    await interaction.respond(
      filteredLimit.map((choice) => ({ name: choice.city, value: choice.city }))
    ); // On répond avec les choix filtrés
  }
};
