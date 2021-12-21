# Créer un bot discord 05/?? - Les options dans les commandes message

Bienvenue dans ce nouveau chapitre dans le quel nous allons utiliser des arguments dans nos commandes message pour permettre aux utilisateurs de fournir des informations.

_Ce chapitre fait parti d'une série de tutoriels. Bien qu'il soit possible de la suivre sans avoir lu les chapitres précédents, il est conseillé de les lire avant de commencer ce chapitre._

## Création de la commande

Pour cette partie du tutoriel nous allons créer une autre commande en suivant le modèle présenté dans le chapitre précédent.

```js
const { Command } = require("sheweny");

module.exports = class PingUserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "arg-command",
      description: "Teste des commandes message avec des arguments",
      category: "Misc",
    });
  }

  execute(message) {
    message.reply({
      content: `Réponse de la commande`,
    });
  }
};
```

Cette commande est semblable a la précédente, mais nous allons ajouter des arguments dans la commande.

## Structure des arguments

### Définition d'un argument

Pour ajouter un argument a une commande il faut utiliser la key `args` qui prend pour valeur un tableau d'objets d'arguments :

```js
args: [
  {
    name: "<nom de l'argument>",
    type: "<type de l'argument>",
    default: "<valeur par défaut>",
  },
];
```

Ici le nom de l'argument doit etre une clé d'objet valide (sans espaces, commencant par une lettre, sans caractères spéciaux a part les underscore).
Le type de l'argument doit etre un des arguments cités ci-dessous.
Enfin la valeur par défaut doit etre une valeur valide pour le type de l'argument.

### Récéption d'un argument

Les arguments sont recus dans la méthode `execute` de la commande. C'est le 2eme et dernier argument de la méthode `execute`.
Cet argument contient un objet des arguments, il doit etre utilisé de la facon suivanete :

```js
execute(message, args) {
  console.log(args.nomDeLArgument);
  // ...
}
```

## Les différents types d'arguments

Nous allons maintenant voir les différents types d'arguments que nous pouvons utiliser.

### Type `STRING`

Le type string permet de recevoir une chaine de caractères composée de 1 seul mot. Si vous voulez recevoir une chaine de caractères composée de plusieurs mots, vous devez utiliser le type `REST`.
Sa valeur par défaut doit etre une chaine de caractères.

```js
{
  name: "arg1",
  type: "STRING",
  default: "default",
},
```

### Type `NUMBER`

Le type number permet de recevoir un nombre entier ou décimal (avec un point pour la virgule). Le nombre doit etre sans espace et etre un nombre javascript valide.
Sa valeur par défaut doit etre un nombre.

```js
{
  name: "arg2",
  type: "NUMBER",
  default: 1,
},
```

### Type `BOOLEAN`

Le type boolean permet de recevoir un booléen, les valeurs possibles sont true/false ou 1/0. Ce type peut etre utilisé pour savoir si il faut activer quelque chose par exemple.
Sa valeur par défaut doit etre un booléen.

```js
{
  name: "arg3",
  type: "NUMBER",
  default: 1,
},
```

### Type `GUILD`

Le type guild renvoie une classe Guild. La valeur possible doit etre un id de la guild (nécéssite discord en mode développeur pour copier l'id).

```js
{
  name: "arg4",
  type: "NUMBER",
},
```

### Type `CHANNEL`

Le type channel renvoie une classe DMChannel, GuildChannel, CategoryChannel, TextChannel, ThreadChannel, StoreChannel, VoiceChannel ou StageChannel. La valeur peut etre une mention, un id, un nom, le début d'un nom.

```js
{
  name: "arg5",
  type: "CHANNEL",
},
```

### Type `MEMBER`

Le type member renvoie une classe GuildMember. La valeur peut etre une mention, un id, un nom, le début d'un nom, un nickname, un username, un username + tag.

```js
{
  name: "arg6",
  type: "MEMBER",
},
```

### Type `GUILD_EMOJI`

Le type guild emoji renvoie une classe GuildEmoji. La valeur peut etre une mention, un id, un nom, le début d'un nom.

```js
{
  name: "arg7",
  type: "GUILD_EMOJI",
},
```

### Type `ROLE`

Le type role renvoie une classe GuildRole. La valeur peut etre une mention, un id, un nom, le début d'un nom.

```js
{
  name: "arg8",
  type: "ROLE",
},
```

### Type `USER`

Le type user renvoie une classe `User`. La valeur peut etre une mention, un id, un nom, le début d'un nom.

```js
{
  name: "arg9",
  type: "USER",
},
```

### Type `REST`

Le type rest renvoie une chaîne de caractères. La chaîne comprendra tous les mots de la commande a l'exeption des arguments précédents.

```js
{
  name: "arg10",
  type: "REST",
},
```

Voilà, vous savez maintenant comment ajouter des arguments a une commande de type message.

## Code source final

Vous pouvez retrouver le code complet du bot sur [github](https://github.com/Sheweny/Tutorial)

_arg-command.js_

```js
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
```

### Conclusion

Dans ce chapitre nous avons appris :

- Comment ajouter des arguments a une commande de type message.
- Comment utiliser les différents types d'arguments.
- Comment utiliser les différents types d'arguments avec des valeurs par défaut.
- Comment exploiter les arguments avec la fontion `execute()`.

Après ces deux chapitres sur les commandes message, nous allons laisser un peu de coter ce type de commandes pour nous concentrer sur les intéractions.

Si vous avez des questions n'hésitez pas à me contacter sur le serveur de GCA ou via des issues sur le repo.

Passez un bon moment en codant avec Sheweny !
