# Créer un bot discord 02/?? - Structure du projet et modules

Bienvenue dans ce nouveau chapitre sur la structure de notre projet et l'installation des modules.

_Ce chapitre fait parti d'une série de tutoriels. Bien qu'il soit possible de la suivre sans avoir lu les chapitres précédents, il est conseillé de les lire avant de commencer ce chapitre._

## Structure du projet

Nous allons commencer par créer un dossier qui contiendra l'ensemble du code de notre bot. Une fois le dossier créé nous pouvons ouvrir notre IDE dedans.
Si vous utilisez Visual Studio Code vous pouvez ouvrir le dossier avec le raccourci clavier `Ctrl K Ctrl O` ou bien en faisant Fichier => Ouvrir un dossier.

### Initialisation de npm

Une fois dans notre projet nous allons commencer par initialiser npm. Npm signifie "_Node Package Manager_". Cet outil en ligne de commande va nous permettre de télécharger des modules et de les installer. Pour initialiser npm il suffit de faire `npm init` dans un terminal (Terminal => Nouveau terminal ou `Ctrl + Shift + ù` ).
Ensuite on répond aux différentes questions posées. Le résultat devrait être la création d'un fichier `package.json` qui contient les informations nécessaires à l'installation de notre projet.

Pour ma part le fichier ressemble a ceci:

```json
{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "A cool bot for a tutorial",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Smaug6739",
  "license": "ISC"
}
```

Astuce : utiliser `npm init -y` pour ne pas avoir à répondre à toutes les questions.

### Création des dossiers

Bien qu'il soit possible de faire un bot dans un seul fichier, ce n'est pas vraiment recommandé. En effet cela peut être très lourd à gérer et difficile à maintenir. Ainsi nous allons découper le code source de notre bot en plusieurs dossiers et fichiers. Nous allons créer un dossier `src` qui contiendra tout le code du bot. Une fois dans ce dossier nous allons créer les sous dossiers suivants :

- `client` Qui contiendra le code du client
- `commands` Qui contiendra les commandes du bot
- `events` Qui contiendra les évènements du bot
- `interactions` Qui contiendra les interactions du bot (boutons, select-menus, etc...)
- `utils` Qui contiendra les fonctions utiles au bot

Si vous n'avez pas tout compris la vue suivante devrait vous éclairer:

![dir_structure](./assets/images/dir_structure.png)

### Création des fichiers

Nous allons commencer par créer quelques fichiers dans le dossier `src`.

- `index.js` dans le dossier `src` Il s'agit du fichier principal du bot, nous lancerons notre bot depuis ce fichier.

- `client.js` dans le dossier `client`. Ce fichier contiendra le code du client.

- `config.js` dans le dossier `src`. Ce fichier contiendra les informations de configuration du bot.

### Fichier de configuration

Vous vous souvenez nous avions parlé du token dans le chapitre précédent ? C'est ici que nous allons stocker le stocker. Pour cela retournez sur [discord.dev](https://discord.com/developers/applications) et copiez le token de votre application. Une fois le token copié vous pouvez le coller dans le fichier `config.js` en remplacant `VOTRE_TOKEN` par le token que vous avez copié.

```js
module.exports = {
  // Le token de notre bot (https://discord.dev)
  token: "VOTRE_TOKEN",
};
```

## Installation des modules

Pour notre bot nous allons utiliser des modules pour nous simplifier la tâche, en effet la création d'un bot sans module est très compliquée, il faut gérer un websocket, des requetes http, le cache, le rate-limite etc. Heureusement il existe des librairies très bien faites qui nous simplifieront la tâche. Nous allons donc installer discord.js et Sheweny. Discord.js permettra de faire toutes les intéractions avec l'api de discord. Et Sheweny vous simplifiera l'utilisation de discord.js, Sheweny va en fait s'occuper de charger vos différents fichiers et de gérer les événements importants, les commandes, événements etc. Pour installer discord.js et Sheweny il suffit de faire `npm install discord.js sheweny` dans un terminal.

## Structure finale

Vous pouvez retrouver le code complet du bot sur [github](https://github.com/Sheweny/Tutorial)

_Structure_

```txt
bot
   │  config.js
   │  package-lock.json
   │  package.json
   │
   ├───node_modules
   └───src
       │  index.js
       │
       ├───commands
       ├───events
       ├───interactions
       └───client
           └─── client.js
```

## Conclusion

Dans ce chapitre nous avons vu :

- Comment créer une structure propre pour notre bot
- Comment créer notre fichier de config
- Comment initialiser `npm`
- Enfin comment installer les modules nécessaires

Dans le prochain chapitre nous allons voir comment créer notre client et mettre notre bot en ligne.

Si vous avez des questions n'hésitez pas à me contacter sur le [serveur support](https://discord.gg/euCF8bp4cN) ou via des issues sur le repo.

Passez un bon moment en codant avec Sheweny !
