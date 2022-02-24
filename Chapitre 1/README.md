# Créer un bot discord 01/?? - Début de la série

Bienvenue dans ce tutoriel sur le développement d'un bot discord !

Nous allons voir tout au long de ce tutoriel comment créer un bot discord, Pour cela le tutoriel sera divisé en plusieurs chapitres qui sortiront régulièrement.

Dans ce premier chapitre nous allons déjà mettre en place notre environnement de développement, nous allons installer les outils nécessaires pour développer notre bot Ainsi que le créer et l'inviter sur notre serveur.

## Avant de commencer

_Ce tutoriel s'adresse à toutes les personnes qui ont déjà quelques bases avec le javascript._

Tout au long de ce tutoriel, je vais vous montrer des exemples de code, vous pourrez les retrouver sur le [github](https://github.com/Sheweny/Tutorial) de ce tutoriel.
Le github contient dans chaque dossier le code source de chaque chapitre, alors si vous ne comprenez pas quelque chose n'hésitez pas à aller y faire un tour.

En cas de question ou de problème n'hésitez pas à me contacter, pour cela vous pouvez [ouvrir une issue sur github](https://github.com/Sheweny/Tutorial/issues/new), ou bien envoyer un message sur le [serveur support](https://discord.gg/euCF8bp4cN) .

## Mise en place de l'environnement

### Installation de l'IDE

L'ide est un logiciel qui va nous permettre d'écrire des lignes de code. Il en existe différents et il faut choisir celui qui vous convient le mieux.
Certains sont payants mais dans ce tutoriel j'utiliserai [Visual Studio Code](https://code.visualstudio.com/). Vous allez donc pouvoir installer le logiciel depuis le site web [code.visualstudio.com](https://code.visualstudio.com/). Le bouton d'installation se situe en haut a droite de l'écran.
Ensuite c'est une installation classique, une fois finie vous pouvez le lancer pour vérifier que tous c'est bien passé puis passer a l'étape suivante.

### Installation de Nodejs

Nodejs est ce que l'on appelle un [runtime](https://fr.wikipedia.org/wiki/Environnement_d%27ex%C3%A9cution), c'est lui qui va traduire votre code en un langage que la machine pourra comprendre. Vous allez donc pouvoir installer node depuis leur site web officiel [nodejs.org](https://nodejs.org/fr/). Au milieu de l'écran vous pourrez voir 2 boutons d'installation. Choisissez la version LTS (Long Term Support) qui correspond à la version stable du logiciel (assurez-vous que c'est au moins 16.6.x). Ensuite vous procéderez a l'installation, cela peut prendre quelques minutes, si vous apercevez des fenêtres apparaître ne les fermez pas à la main. Attendez qu'elles se ferment toute seules. Une fois l'installation finie, vérifiez que tout c'est bien passé en ouvrant un terminal (si vous ne savez pas ce que c'est tapez "powershell" dans la recherche des applications) et tapez "node -v" dans le terminal. Vous devriez voir la version de Nodejs que vous avez installé. Si vous avez une erreur, assurez-vous de bien fermer le terminal puis de le réouvrir.

## Création du bot

Nous allons commencer par créer notre bot sur le site des développeurs discord. Pour cela ouvrez le lien vers [le portail des développeurs](https://discord.com/developers/applications) directement dans le navigateur, si nécessaire connectez vous avec votre compte discord. Vous devriz arriver sur une page comme celle-ci :

![discord_dev_portal](https://cdn.discordapp.com/attachments/921734488533401642/921734810836287498/discord_dev_portal.png)

Une fois sur cette page vous allez voir un bouton "Nouvelle Application" en haut a droite qui vous permettra de créer votre bot.
Choisissez un nom qui vous plait et appuyez sur le bouton "Créer". Vous devriez arriver sur une page comme celle-ci :

![discord_dev_app](https://cdn.discordapp.com/attachments/921734488533401642/921734810634973244/discord_dev_app.png)

Une fois sur cette page vous allez pouvoir changer l'avatar, la description et le nom du bot. Vous pouvez également ajouter des "tags" mais nous aurons l'occasions d'en reparler plus tard.
Une fois vos modifications faites, sur le côté gauche allez dans l'onglet "Bot" et cliquez sur le bouton "Créer le bot". Vous devriez voir apparaître une page comme celle-ci :

![add_bot_warning](https://cdn.discordapp.com/attachments/921734488533401642/921734810374897704/add_bot_warning.png)

Cliquez sur "Oui" pour confirmer la création de votre bot (avant nous étions sur l'application et une application n'est pas forcément un bot). Vous devriez voir apparaître une page comme celle-ci :

![bot_created](https://cdn.discordapp.com/attachments/921734488533401642/921734810135842836/bot_created.png)

En descendant un peu, vous pouvez apercevoir le titre "Intentions de passerelle privilégiée" ("Privileged Gateway Intents" en anglais) avec 3 sous-titres en dessous ("PRESENCE INTENT", "SERVER MEMBERS INTENT", "MESSAGE CONTENT INTENT") en dessous vous trouverez des boutons a cocher, il faut tous les activer. Je ne vais pas expliquer ici ce que sont les "gateway intents" car nous aurons l'occasion d'en parler dans les prochains chapitres. À côté de l'avatar de votre bot vous pouvez voir le token avec un bouton "Copier". Gardez bien ça en tête nous en aurons besoins dans le prochain chapitre.

Et voilà ! Notre bot vient d'être créé avec toutes les options nécessaires.

## Invitation du bot

Dans cette section je pars du principe que vous avez déjà créé votre serveur discord. Si vous ne savez pas comment faire je vous laisse consulter [ce lien](https://support.discord.com/hc/fr/articles/204849977-Comment-cr%C3%A9er-un-serveur-).

Sur la page du panel de gstion de votre bot sur [discord.dev](https://discord.com/developers/applications) vous pouvez voir sur le côté un onglet "Oauth2", une fois dessus allez dans le sous menu "URL Generator". Vous devriez voir apparaître une page comme celle-ci :

![discord_dev_portal_oauth2](https://cdn.discordapp.com/attachments/921734488533401642/921734809875779594/discord_dev_portal_oauth2.png)

Sur le tableau "Scopes" il faut sélectionner "bot" et "application.commands" comme ci-dessous :

![discord_dev_portal_oauth2_scopes](https://cdn.discordapp.com/attachments/921734488533401642/921734809531871232/discord_dev_portal_oauth2_scopes.png)

Notez que a ce moment vous pouvez également sélectionner les permissions qui seront demandées lors de l'invitation du bot. Même si ce n'est pas une bonne chose pour les besoins du tutoriel je vais demander la permission "Administrateur" comme ca nous n'aurons jamais de problème avec les permissions.

Tout en bas de la page vous verrez un lien qui vient d'être généré. Il vous suffira de le copier dans un navigateur pour inviter votre bot. Sur la page d'invitation vous pouvez choisir votre serveur (_notez qu'il vous faut la permission "Manage Guild" pour pouvoir inviter un bot dans un serveur_) puis accorder les permissions demandées. Vous serez invité à valider un captcha puis le bot sera sur votre serveur. Une fois cela fait le bot devrait apparaître dans la liste des membres du serveur avec le statut "offline". Comme sur l'image ci-dessous :

![bot_invited](https://cdn.discordapp.com/attachments/921734488533401642/921734809250836500/bot_invited.png)

## Conclusion

Dans ce chapitre nous avons vu :

- Comment mettre en place notre environnement de développement
- Comment créer un bot sur discord
- Comment inviter un bot sur discord

Dans le prochain chapitre nous allons voir comment mettre en place la structure de notre bot et le fichier de configuration.

Si vous avez des questions n'hésitez pas à me contacter sur le [serveur support](https://discord.gg/euCF8bp4cN) ou via des issues sur le repo.

Passez un bon moment en codant avec Sheweny !
