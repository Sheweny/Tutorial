# Créer un bot discord 09/?? - Restrictions d'une commande

Bienvenue dans ce nouveau chapitre dans lequel nous allons parler des restrictions de commandes.

_Ce chapitre fait parti d'une série de tutoriels. Bien qu'il soit possible de la suivre sans avoir lu les chapitres précédents, il est conseillé de les lire avant de commencer ce chapitre._

## Les restrictions de commandes

Actuellement nos commandes sont de plus en plus complètes, grâce aux arguments des commandes message aux options des slash-commandes il est possible de réaliser de nombreuses commandes, cependant dans certains cas nous ne souhaitons pas que tous les utilisateurs puissent utiliser certaines commandes. De plus certaines commandes devraient êtres rendues disponibles uniquement sur un serveur, en effet utiliser une commande de modération en DM par exemple n'aurait pas beaucoup de sens. Pour palier à ce problème le framework Sheweny met à disposition des moyens permettant de restreindre l'usage des commandes.

## Création d'une commande

Nous allons commencer par créer une nouvelle commande comme nous en avons l'habitude.

```js
const { Command } = require("sheweny");

module.exports = class SlashArgsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "slash-restrictions",
      type: "SLASH_COMMAND",
      description: "Description de la commande",
      category: "Misc",
    });
  }
  execute(interaction) {
    interaction.reply("Réponse");
  }
};
```

## Restreindre la portée d'une commande

Pour restreindre la portée d'une commande, (enlever la possibilité de l'utiliser dans les messages privés ou sur un serveur) nous allons utiliser une propriété dans les options de la commande nomée `channel`. Cette propriété peut prendre deux valeurs : `DM` et `GUILD`. Si la valeur est `DM` la commande ne sera disponible que dans les messages privés, si la valeur est `GUILD` la commande ne sera disponible que sur les serveurs.

```js
{
  name: "slash-restrictions",
  type: "SLASH_COMMAND",
  description: "Description de la commande",
  category: "Misc",
  channel: "DM" // Ou channel: "GUILD"
}
```

## Permissions avec les commandes

Il est également possible de définir les permissions requises pour utiliser une commande. Pour cela nous allons utiliser deux propriétées. La première propriété nomée `clientPermissions` va permettre de définir les permissions que le bot doit avoir pour exécuter la commande. Si le bot n'a pas les permissions alors un événement `clientMissingPermissions`sera émit sur la classe CommandsManager. La seconde propriété nomée `userPermissions` va permettre de définir les permissions que l'utilisateur doit avoir pour exécuter la commande. Si l'utilisateur n'a pas les permissions alors un événement `userMissingPermissions` sera émit sur la classe CommandsManager.
Chacune des propriétés est un array de [PermissionResolvable](https://discord.js.org/#/docs/discord.js/stable/typedef/PermissionResolvable).

```js
{
  name: "slash-restrictions",
  type: "SLASH_COMMAND",
  description: "Description de la commande",
  category: "Misc",
  clientPermissions: ["MANAGE_ROLES"],
  userPermissions: ["MANAGE_ROLES"]
}
```

## Restreindre une commande a un administrateur du bot

Enfin il est possible de vouloir restreindre une commande à un administrateur du bot. Ce sera par exemple le cas pour des commandes permettant d'évaluer un code javascript ou bien des commandes liées à la maintenance du bot. Pour cela nous allons utiliser la propriété `ownerOnly`. Si cette propriété est à `true` la commande ne sera disponible que pour les administrateurs du bot.

```js
{
  name: "slash-restrictions",
  type: "SLASH_COMMAND",
  description: "Description de la commande",
  category: "Misc",
  ownerOnly: true
}
```

## Conclusion

Dans ce chapitre nous avons appris à restreindre l'utilisation des commandes avec Sheweny.

Après ce chapitre vous êtes maintenant capables :

- D'exiger des permissions au bot et à l'utilisateur pour utiliser une commande
- D'exiger que l'utilisateur soit un administrateur du bot pour utiliser une commande
- De limiter la portée d'une commande

Si vous avez des questions n'hésitez pas à me contacter sur le [serveur support](https://discord.gg/euCF8bp4cN) ou sur le serveur de G-CA.
