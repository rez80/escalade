# App Escalade — mode d'emploi (version 3.1)

## Les fichiers

| Fichier | Rôle | À modifier ? |
| --- | --- | --- |
| `index.html` | La structure de la page (en-tête, minuteur, barre du bas) | Rarement |
| `style.css` | L'apparence : couleurs en haut du fichier, puis une section par zone de l'écran | Oui, pour l'apparence |
| `app.js` | Tout le fonctionnement, en 17 sections numérotées et commentées | Oui, voir la carte ci-dessous |
| `data.js` | Le programme, les routines et les exercices | Généré par `generer_app.py` |
| `sw.js` | Fonctionnement hors connexion | Non (version mise à jour par le script) |
| `generer_app.py` | Crée `data.js` depuis `Journal_escalade.xlsx` | Seulement si la structure de l'Excel change |

## Carte du code (`app.js`)

| Pour changer… | Regarde la section |
| --- | --- |
| Les repos par défaut, les cotations, la durée maximale d'une séance | 1. Réglages du programme |
| Les réglages par défaut (son, bips, heures des rappels…) | 1, objet `REGLAGES_DEFAUT` |
| La façon de lire les lignes d'une séance (`>`, `!`, `3×`, `## version`, durées) | 4. Contenu |
| Le relevé des voies et les valeurs « Auto » | 5. Relevé |
| Les messages d'avertissement (douleur, effort) | 6. Avertissements |
| L'affichage d'une séance | 7. Écran séance |
| Ce qui se passe quand on touche un bouton | 8. Actions |
| Les fenêtres (fin de séance, résultat, douleur) | 9. Fenêtres |
| Le minuteur et les chronos | 10. Minuteur |
| Les sons | 11. Son |
| La vue Semaine, la création de séances et ses **modèles** (`MODELES`) | 13. Vue semaine |
| L'écran Exercices, la recherche et les réglages | 14. Exercices et réglages |
| L'export, la sauvegarde, le fichier calendrier | 15. Export |

## Mettre à jour l'app sur GitHub

1. Dans ton dépôt, **Add file → Upload files**, glisse `index.html`, `style.css`, `app.js`, `data.js` et `sw.js`, puis **Commit changes**.
2. Sur l'iPhone, ouvre l'app avec connexion, ferme-la complètement et rouvre-la.

À partir de cette version, un **bandeau « Nouvelle version disponible »** apparaît en haut de l'app quand une mise à jour est prête : touche-le pour l'installer. La version de l'app et la date du programme sont affichées tout en bas de l'écran Exercices.

## Installation (première fois)

1. Crée un compte gratuit sur github.com. Active la **double authentification** (Settings → Password and authentication).
2. **New repository**, par exemple `escalade`, en **Public**, puis **Create repository**.
3. **uploading an existing file** : glisse les 5 fichiers ci-dessus, puis **Commit changes**.
4. **Settings → Pages** : Branch `main`, `/ (root)`, **Save**. Attends 1 à 2 minutes.
5. Sur l'iPhone, ouvre l'adresse dans **Safari** (ou Firefox à jour), puis **Partager → Sur l'écran d'accueil**.
6. Ouvre l'app une fois avec connexion. Ensuite, elle fonctionne en mode avion.

## Pendant la séance

- L'app s'ouvre sur la séance du jour. ◀ ▶ pour changer de séance, **📅** (ou la date) pour la vue Semaine.
- **Version** : en haut de certaines séances, choisis la version du jour.
  - Voie : *Voie*, ou *Remplacement bloc* si tu n'as pas de partenaire.
  - Maison : *Complète* (25 min), *Courte* (12 min) ou *Express* (6 min). Règle : au moins la courte.
  - Course : *Course*, *Marche rapide* ou *Vélo*. La sortie du samedi est facultative.
- **▶ Démarrer / ■ Terminer** : « Terminer » calcule la durée (4 h au maximum, modifiable) et ouvre une fenêtre rapide pour l'effort et la douleur.
- **Routines** (échauffement A, B ou C selon la semaine, vérifications croisées, retour au calme) : la case pour cocher, le nom pour voir les étapes.
- **Actions** : un rond par passage. Touche la ligne ou le rond suivant pour ajouter un passage ; un rond déjà rempli pour revenir en arrière.
  - Sur une voie ou un bloc, l'app te propose de noter le résultat (cotation préremplie, profil, « sec »). « Passer » si tu ne veux pas.
  - **▶ 30 s** ou **▶ 3:00 / 1:30** : lance le chrono de l'exercice ou des fractions de course. La fin coche le passage toute seule.
  - **⏱ repos** : lance le repos toi-même.
- **Avertissements** en haut de la séance : douleur signalée récemment, zone touchée plusieurs fois en 14 jours, ou deux séances de suite à un effort de 8 ou plus.
- **⚠** : signale une douleur à tout moment.
- **Nom souligné ⓘ** : un appui affiche l'explication de l'exercice, un second la referme.

## Créer une séance

Dans la vue Semaine (📅), **+ Créer une séance** :
1. Choisis la date et le type : *Escalade*, *Course*, *Muscu* ou *Libre* (séance vide, tu notes juste ce que tu fais).
2. Choisis un modèle : bloc technique léger, bloc projets, bloc endurance, voie volume, voie projets, fractionné, course continue, marche rapide, vélo, muscu complète, courte ou express, gainage express.
3. Ajuste les réglages avec − et + (nombre de blocs, minutes de dévers, cotations, fractions…).
4. Ajoute si tu veux des exercices de la liste (séries, détail comme « 30 s », repos).
5. Vérifie l'aperçu, puis **Créer la séance**. Elle fonctionne comme une séance du programme (ronds, chronos, minuteur, relevé) et arrive dans l'onglet Séances libres de l'Excel.

Pour ajouter un modèle à l'app : section 13 de `app.js`, liste `MODELES`, copie un bloc existant et adapte-le.
Pour planifier dans l'Excel : l'onglet **Modèles** produit le texte d'une séance à coller dans la colonne G du Journal.

## Le minuteur

- L'anneau se vide, le fond passe à l'orange dans les 10 dernières secondes, puis clignote en jaune à la fin.
- **Touche le temps** pour passer en plein écran, et encore une fois pour revenir.
- Boutons : **−30**, **pause**, **+30**, **Passer**, **🔊 / 🔇** (son), **✕** (arrêter).
- Il reprend où il en était si tu fermes l'app ou si l'iPhone se verrouille.

## Réglages (en bas de l'écran Exercices)

- **Programme** : « Le programme + mes séances » ou « Uniquement mes séances créées », et la **date de début du programme** (un lundi, à régler une seule fois : les saisies sont rangées par numéro de semaine).
- Repos automatique ou manuel, résultat demandé ou non en touchant le rond.
- Son activé ou coupé, volume, choix des bips (10 s avant, 3-2-1, fin, changements), son en mode silencieux, **Tester le son**.
- **Rappels dans le calendrier** : choisis l'heure de chaque activité et le délai du rappel, puis **Créer le fichier calendrier**. Ouvre le fichier sur l'iPhone et choisis « Ajouter tout », de préférence dans un calendrier « Escalade » dédié (pour pouvoir tout supprimer d'un coup si le programme change).
- **Restaurer une sauvegarde**.

## Exporter vers l'Excel

1. Dans l'app, **Exporter** : deux fichiers. Envoie-les vers ton PC, de préférence par AirDrop (ils contiennent tes douleurs).
2. Ouvre `export-escalade-….csv` dans Excel, **Ctrl+A**, **Ctrl+C**.
3. Dans Journal_escalade.xlsx, onglet **Import** : coin en haut à gauche de la grille, **Suppr**, puis **A1** et **Ctrl+V**.

Tous les onglets se mettent à jour. Garde `sauvegarde-escalade-….json` : il sert à restaurer l'app.
Les onglets calculés sont protégés (sans mot de passe) pour éviter d'écraser une formule : **Révision → Ôter la protection** si nécessaire.

## Écrire ou modifier une séance

Dans l'Excel, colonne G du Journal, une ligne par élément (Alt+Entrée pour passer à la ligne) :

| Ligne | Effet dans l'app |
| --- | --- |
| `> Échauffement salle A (classique)` | Routine à cocher (nom identique à l'onglet Routines) |
| `! Repos au moins 5 min` | Consigne grise, sans case |
| `3× Voie en 5a` | Action avec 3 ronds (sans nombre : 1 rond) |
| `… (repos 4 min)` ou `(repos 90 s)` | Durée du repos (sinon : 5 min voie, 3 min bloc, 90 s maison, rien en course) |
| `… · 30 s` ou `… 25 min …` | Ajoute un bouton ▶ chrono de cette durée |
| `6× 2 min course + 2 min marche` | Ajoute un minuteur de fractions |
| `« Bras tendus »` | Lien vers l'explication (nom identique à l'onglet Exercices) |
| `## Courte (12 min)` | Début d'une version ; les lignes avant le premier `##` sont communes |

Puis lance `python generer_app.py` (il signale les noms introuvables) et remets `data.js` et `sw.js` sur GitHub.

## Donner l'app à quelqu'un d'autre

**Solution simple (même adresse que toi)** : la personne installe l'app depuis ton adresse GitHub, puis dans **Exercices → Programme** choisit « Uniquement mes séances créées » et règle sa date de début. Ses données restent sur son téléphone. Attention : si elle choisit de suivre le programme, c'est **ton** programme, et chacune de tes modifications arrivera aussi chez elle.

**Solution séparée (son propre programme)** :
1. Sur GitHub, ouvre ton dépôt, bouton **Fork** (ou crée un nouveau dépôt et envoie-y les 5 fichiers).
2. Active **Settings → Pages** sur ce nouveau dépôt : il a sa propre adresse.
3. Prépare son programme dans une copie de Journal_escalade.xlsx (sa date de début dans Mode d'emploi B3, son contenu dans la colonne G), lance `python generer_app.py` et envoie `data.js` et `sw.js` dans *son* dépôt.
4. Elle installe l'app depuis cette nouvelle adresse.

## Après une mise à jour du programme

Le calendrier importé n'est pas mis à jour tout seul. Supprime le calendrier « Escalade » sur l'iPhone, puis recrée le fichier dans **Exercices → Rappels dans le calendrier** et importe-le à nouveau.

## Sauvegarde

Si tu supprimes l'app de l'écran d'accueil ou changes d'iPhone, tout ce qui n'a pas été exporté est perdu. Exporte au moins chaque dimanche ; sous le bouton Exporter, la date du dernier export passe en orange après 7 jours.
