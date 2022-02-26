# Créer un bot discord 07/?? - Découverte des options de slash-commands

Bienvenue dans ce nouveau chapitre dans lequel nous allons parler des options de slash-commands.

_Ce chapitre fait parti d'une série de tutoriels. Bien qu'il soit possible de la suivre sans avoir lu les chapitres précédents, il est conseillé de les lire avant de commencer ce chapitre._

## Les options de slash-commands

Jusqu'ici, nous avons parlé des slash-commands, nous sommes capable de créer des commandes et de répondre à l'utilisateur cependant dans de nombreuses commandes nous aurons besoins de demander des informations à l'utilisateur. Pour cela il est possible d'utiliser des options. Discord fournit une grande variété d'options permettant de demander a un utilisateur de renseigner une chaîne de caractères, un nombre, un fichier, un utilisateur etc.

## Création d'une commande

Nous allons commencer par créer une nouvelle commande sur le modèle présenté dans le chapitre précédent.

```js
const { Command } = require("sheweny");

module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "slash-args",
      type: "SLASH_COMMAND",
      description: "Commande avec des arguments",
      category: "Misc",
    });
  }
  execute(interaction) {
    interaction.reply("Réponse");
  }
};
```

## Structure d'un argument

Les arguments des slash-commands devront toujours être définis dans l'objet de la commmande avant d'être récupérés dans la fonction `execute()`.
Contrairement aux commandes par message, ici les arguments devront être définis dans un objet `options`, en effet pour les slash-commands on ne parle pas d'arguments mais plutôt d'options.
Pour définir des options à nos commandes on utilisera cette structure :

```js
options: [
  {
    type: "TYPE_ARGUMENT",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
    required: true, // Optionnel par défaut sur false
    ...autresParamètresDeLOption,
  },
];
```

Ici contraitrement aux commandes par message, il existe plus de types spécialisés, et de nombreuses options afin de donner des précisions sur les arguments.
Le type, le nom, la description sont des éléments obligatoires. Les autres paramètres sont facultatifs.

## Recevoir un argument

Pour recevoir un argument, discord.js met à notre disposition des méthodes pour chaque type d'arguments disponibles via `interaction.options.getX("NOM_ARGUMENT")`.
_Note: on remplacera `getX()` par les méthodes présentés ci-dessous._ La liste complète est disponible sur la [documentation de discord.js](https://discord.js.org/#/docs/main/stable/class/CommandInteractionOptionResolver).

## Les différents types d'options

### Le type `STRING`

Le type `STRING` permet à l'utilisateur de spécifier une chaîne de caractères comme argument.
Dans la commande, il faudra récupérer cet argument à l'aide de `interaction.options.getString("NOM_ARGUMENT")`.
Il faut noter que actuellement discord ne prend en charge les chaînes de caractères seulement sur une seule ligne. Ils travaillent actuellement à un argument multi-lignes.

```js
options: [
  {
    type: "STRING",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

Pour le type string il est possible de donner une liste de choix à l'utilisateur. Plutôt que de taper entièrement la chaîne de caractères, l'utilisateur pourra choisir parmi une liste de valeurs définies.
On utilisera un Array d'objets de type [ApplicationCommandOptionChoice](https://discord.js.org/#/docs/discord.js/stable/typedef/ApplicationCommandOptionChoice) dans une key `choices` pour cela.

```js
options: [
  {
    type: "STRING",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
    choices:  [
      {
        name: "CHOIX_1",
        value: "VALUE_1",
      },
       {
        name: "CHOIX_2",
        value: "VALUE_2",
      }
    ]
  },
  }
]
```

Cependant cette méthode présente des limites comme le nombre d'options disponibles (25). Cette possibilité convient donc bien si l'utilisateur doit choisir entre quelques valeurs mais si vous souhaitez demander à l'utilisateur de choisir entre beaucoup d'options ou bien si vous souhaitez avoir une plus grande liberté dans le système nous verrons dans le chapitre suivant les auto-complete.

### Le type `INTEGER`

Le type `INTEGER` permet à l'utilisateur de spécifier un nombre comme argument. Les nombres sont des nombres entiers.
Dans la commande il faudra récupérer cet argument à l'aide de `interaction.options.getInteger("NOM_ARGUMENT")`.
Il existe également une option `choices` qui permet de définir une liste de choix pour l'utilisateur. Cette option est un array de [ApplicationCommandOptionChoice](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionChoice).
Il existe également une option `minValue` et `maxValue` pour définir une valeur maximale et minimale.

```js
options: [
  {
    type: "INTEGER",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

### Le type `NUMBER`

Le type `NUMBER` permet a l'utilisateur de spécifier un nombre comme argument. Les nombres sont des nombres entiers ou des nombres décimaux.
Dans la commande, il faudra récupérer cet argument à l'aide de `interaction.options.getNumber("NOM_ARGUMENT")`.
Il existe également une option `choices` qui permet de définir une liste de choix pour l'utilisateur. Cette option est un array de [ApplicationCommandOptionChoice](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionChoice).
Il existe également une option `minValue` et `maxValue` pour définir une valeur maximale et minimale.

```js
options: [
  {
    type: "NUMBER",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

### Le type `BOOLEAN`

Le type `BOOLEAN` permet à l'utilisateur de spécifier un booléen comme argument. Les valeurs de retour seront `true` ou `false`.
Dans la commande, il faudra récupérer cet argument à l'aide de `interaction.options.getBoolean("NOM_ARGUMENT")`.

```js
options: [
  {
    type: "BOOLEAN",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

### Le type `USER`

Le type `USER` permet à l'utilisateur de spécifier un utilisateur comme argument. Il faut noter que cet argument ne prend en compte que les utilisateurs du serveur.
Dans la commande, il faudra récupérer cet argument à l'aide de `interaction.options.getUser("NOM_ARGUMENT")`.

```js
options: [
  {
    type: "USER",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

### Le type `CHANNEL`

Le type `CHANNEL` permet à l'utilisateur de spécifier un salon comme argument. Il faut noter que cet argument ne prend en compte que les salons du serveur.
Dans la commande, il faudra récupérer cet argument à l'aide de `interaction.options.getChannel("NOM_ARGUMENT")`.
Il existe également une option `channelTypes` qui permet de définir un ou plusieurs types de salons. Cette option est un array de [ChannelType](https://discord.js.org/#/docs/main/stable/typedef/ChannelType).

```js
options: [
  {
    type: "CHANNEL",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

### Le type `ROLE`

Le type `ROLE` permet à l'utilisateur de spécifier un rôle comme argument. Il faut noter que cet argument ne prend en compte que les rôles du serveur.
Dans la commande, il faudra récupérer cet argument à l'aide de `interaction.options.getRole("NOM_ARGUMENT")`.

```js
options: [
  {
    type: "ROLE",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

### Le type `MENTIONABLE`

Le type `MENTIONABLE` permet à l'utilisateur de spécifier un utilisateur, channel, rôle mentionnable comme argument. Il faut noter que cet argument ne prend en compte que les données mentionnables du serveur.

```js
options: [
  {
    type: "MENTIONABLE",
    name: "NOM_ARGUMENT",
    description: "DESCRIPTION_ARGUMENT",
  },
  }
]
```

## Sous-commandes et groupes de sous-commandes

On vient d'évoquer plusieurs types d'options pour les slash-commands. Ces types nous permettent de demander à l'utilisateur des informations. Nous allons maintenant parler de deux nouvelles options qui vont nous permettres d'organiser nos commandes. En effet discord nous permet d'organiser nos commandes en sous-commandes et groupes de sous-commandes.
Pour bien comprendre ce que sont les sous-commandes et groupes de sous-commandes, voici deux exemples pour chacun des types :

### Sous-commandes

![sub_command](./assets/images/sub_commands.png)

### Groupes de sous-commandes

![sub_command_group](./assets/images/sub_commands_group.png)

Pour définir des sous-commandes qui ne sont pas dans un groupe, il suffit de placer une options avec le nom, la description de la sous-commande et le type `SUB_COMMAND`. Il est ensuite possible de remettre un array d'options pour les éventuels options de la commande.
Pour définir des sous-commandes dans un groupe il faut définir une option avec le nom, la description de la sous-commande et le type `SUB_COMMAND_GROUP`. Ensuite placer un array d'options avec un nom, une description et le type `SUB_COMMAND`. Il est à ce moment possible de remettre un 3ème array d'options pour les éventuels options de la sous-commande.

Exemple de sous commande seulement :

```js
options: [
  {
    type: "SUB_COMMAND",
    name: "sub_command",
    description: "Description de la sous-commande",
    options: [
      {
        type: "STRING",
        name: "string",
        description: "Description de l'argument string",
      },
      {
        type: "INTEGER",
        name: "integer",
        description: "Description de l'argument integer",
      },
    ],
  },
];
```

Exemple des sous-commandes dans un groupe :

```js
options: [
  {
    type: "SUB_COMMAND_GROUP",
    name: "sub_command_group",
    description: "Description du groupe de sous-commandes",
    options: [
      {
        type: "SUB_COMMAND",
        name: "sub_command",
        description: "Description de la sous-commande",
        options: [
          {
            type: "STRING",
            name: "string",
            description: "Description de l'argument string",
          },
          {
            type: "INTEGER",
            name: "integer",
            description: "Description de l'argument integer",
          },
        ],
      },
    ],
  },
];
```

### Recevoir des sous-commandes ou groupes de sous-commandes

Il est possible de savoir de quelle sous-commande ou groupe de sous-commandes il s'agit grace à la méthode `interaction.options.getSubCommand()` ou `interaction.options.getSubCommandGroup()`.

_Tip: Je recommande d'utiliser ces méthodes avec une instruction `switch` plutôt qu'une série de `if..else` pour garder un code propre._

## Conclusion

Nous venons dans ce chapitre de parler des options pour les slash-commands, comme vous l'avez remarqué, ce chapitre aborde beaucoup de notions car ces types sont très complets.

Il existe d'autres options comme les autocomplete mais nous en parlerons dans un chapitre dédié.

Après ce chapitre vous êtes maintenant capables :

- De demander des informations à un utilisateur avec des options précises
- De définir des options pour les slash-commands
- De récupérer les valeurs de ces options
- D'organiser les commandes en sous-commandes et groupes de sous-commandes

Si vous avez des questions n'hésitez pas à me contacter sur le [serveur support](https://discord.gg/euCF8bp4cN).

Passez un bon moment en codant avec Sheweny !
