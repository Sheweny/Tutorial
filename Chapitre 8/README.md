# Créer un bot discord 07/?? - Utilisation des autocomplete

Bienvenue dans ce nouveau chapitre dans lequel nous allons parler des autocomplete de slash-commands.

_Ce chapitre fait parti d'une série de tutoriels. Bien qu'il soit possible de la suivre sans avoir lu les chapitres précédents, il est conseillé de les lire avant de commencer ce chapitre._

## Les autocomplete

Dans le chapitre précédent nous avons vu comment demander des informations à l'utilisateur avec des options (=arguments). Nous avons vu qu'il existait la possibilité pour certains arguments de choisir une liste de valeurs à proposer à l'utilisateur. Cependant cette méthode est limitée. Imaginez que vous demandiez à un utilisateur de choisir une ville en France. Plusieurs problèmes peuvent survenir, en effet le paramètre `choices` est limité à 25 valeurs. Il serait donc impossible de choisir une ville en France.
De plus dans certains cas, on ne connait pas les valeurs à l'avance, dans certains cas on utilisera une API, une base de donnée ou tout autre service.
Pour simplifier les choses dans ce chapitre j'utiliserai un fichier JSON avec l'ensemble des villes de France.

## Création d'une commande

Nous allons commencer par créer une nouvelle commande sur le modèle présenté dans le chapitre précédent.

```js
const { Command } = require("sheweny");

module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "slash-args",
      type: "SLASH_COMMAND",
      description: "Commande du chapitre 7",
      category: "Misc",
      options: [
        {
          name : "city"
          description: "Récupérer des informations sur une ville",
          type: "STRING", // String
        }
      ]
    });
  }
  execute(interaction) {
    interaction.reply("Réponse");
  }
};
```

## Fonctionnement des autocomplete

Lorsqu'une option possède une key (=un champ) `autocomplete: true` alors, à chaque fois que l'utilisateur tape une lettre, une fonction `onAutocomplete` sera appelée. Dans cette fonction nous pourrons récupérer ce que l'utilisateur à déja tapé et répondre avec une liste de possibilités. Plus l'utilisateur écrit plus il est possible d'affiner la recherche.

## Dans le code

### L'objet commande

Pour l'objet d'option il nous suffit d'ajouter la propriété `autocomplete: true` :

```js
options: [
  {
    name: "city",
    description: "Récupérer des informations sur une ville",
    type: "STRING", // String
    autocomplete: true,
  },
];
```

### La fonction onAutocomplete

La fonction onAutoComplete qui sera appelée à chaque caractère tapé par l'utilisateur va nous permettre de répondre à l'utilisateur.
Cette fonction prend en paramètre une `interaction` de type [AutocompleteInteraction](https://discord.js.org/#/docs/discord.js/stable/class/AutocompleteInteraction)
Il est ensuite possible de répondre avec la fonction `respond()` qui prend en paramètre un Array de [ApplicationCommandOptionChoice](https://discord.js.org/#/docs/discord.js/stable/typedef/ApplicationCommandOptionChoice), exactement comme la key `choices` du chapitre précédent.

Exemple :

```js
module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "autocomplete-fête",
      type: "SLASH_COMMAND",
      description: "Récupère une fête américaine",
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

  onAutocomplete() {
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
```

Nous voilà donc avec un exemple qui permet de récupérer une fête américaine.

## TP : Récupérer une ville en france

Pour s'entrainer à utiliser les autocomplete, nous allons créer une commande qui récupère les villes de France.
Sous forme de mini-TP, vous devrez créer une slash-command avec une option `ville` permettant de choisir une ville en France.
Si possible vous afficherez quelques informations si elles sont disponibles (population, localisation, région etc.).

### Aide 1

Vous pouvez utiliser une API externe pour récupérer les informations ou bien un fichier JSON.
Je vous recommande le fichier JSON car le code sera plus simple et vous permettra de vous concentrer plainement sur les autocomplete.
_Si vous utilisez un fichier JSON :_ Récupérez un array des villes, il vous sera ensuite très facile de le filtrer et le découper comme nous l'avons vu ci-dessus.

### Corrigé complet

```js
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
```

Si vous avez réussi, félicitations ! :) Sinon prenez le temps de regarder la proposition de correction et si vous avez des questions n'hésitez pas à les poser sur le serveur discord de Game Creator Area ou bien sur le serveur support de Sheweny.

## Conclusion

Dans ce chapitre nous avons appris a nous servir des autocomplete avec Sheweny.

Après ce chapitre vous êtes maintenant capables :

- De demander des informations complexes a un utilisateur
- De renvoyer des suggestions de façon dynamique
- De mettre en place une commande complète

Si vous avez des questions n'hésitez pas à me contacter sur le [serveur support](https://discord.gg/euCF8bp4cN).

Passez un bon moment en codant avec Sheweny !
