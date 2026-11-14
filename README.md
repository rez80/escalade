# App Escalade — mode d'emploi technique (version 6.2)

Ce fichier s'adresse à toi, pour faire vivre l'app et le rapport. Le guide d'utilisation, lisible par tout le monde, est `aide.html` (bouton **Plus → ❓ Aide** dans l'app, ou l'adresse `…/aide.html`).

## Les fichiers

| Fichier | Rôle | Tu le modifies ? |
| --- | --- | --- |
| `index.html`, `style.css`, `app.js` | L'app | Non (sauf pour changer l'app) |
| `aide.html` | Le guide d'utilisation, hors connexion et partageable | Pour mettre à jour l'aide |
| `icone-180.png`, `icone-512.png` | L'icône de l'app | Non |
| `sw.js` | Fonctionnement hors connexion | Non (version mise à jour par `escalade.py`) |
| `data.js` | Le programme, les exercices, les routines, les paramètres pour l'app | Non : **généré** par `escalade.py` |
| **`Programme.xlsx`** | **Ce que tu écris** : programme, exercices, routines, paramètres, conseils | **Oui** |
| **`escalade.py`** | **L'outil unique** : génère `data.js`, fusionne les exports, produit le rapport | Non |
| `Suivi.xlsx` | Le rapport : **régénéré** à chaque lancement, aucune formule | Non (ne rien y saisir) |
| `exports/` | Ton archive : chaque export de l'app, jamais supprimé | Tu y ranges chaque export |
| `exports/programme-1/` | Les exports de l'ancien programme (onglet Historique du rapport) | Non |

Dans le dossier `archive` (à côté) : l'ancien classeur `Journal_escalade_v4.xlsx` et les anciens scripts, pour mémoire.

## La routine, une fois par semaine

1. Dans l'app : **Plus → ⬆ Exporter**. Envoie les deux fichiers vers ton PC (AirDrop de préférence : ils contiennent tes douleurs).
2. Range `export-escalade-….csv` dans `exports/` (ne supprime jamais un ancien export) ; garde le `.json` à part (restauration de l'app).
3. Dans le dossier de l'app : `python escalade.py`
4. Ouvre `Suivi.xlsx` (LibreOffice ou Excel).

Première fois : `pip install openpyxl` (seule dépendance).

## La commande `escalade.py`

| Commande | Effet |
| --- | --- |
| `python escalade.py` | Tout : `data.js` + `sw.js` pour l'app, et le rapport `Suivi.xlsx` |
| `python escalade.py --app` | Seulement `data.js` (après une modification de `Programme.xlsx`) |
| `python escalade.py --rapport` | Seulement `Suivi.xlsx` (après un nouvel export) ; si l'export contient des modifications du programme, elles sont reportées dans `Programme.xlsx` et `data.js` est régénéré |
| `python escalade.py --date 2026-12-01` | Le rapport « comme si » on était à cette date |

La console affiche un résumé : séances faites, voies notées, verdict de l'import, forme du jour, signaux de vigilance, et les **alertes** sur `Programme.xlsx` (routine ou exercice cité mais inexistant).

**Fusion des exports** : pour chaque jour, la version la plus récente qui contient des données est gardée ; un jour absent du dernier export (app effacée) est repris d'un export plus ancien et signalé dans l'onglet Contrôle.

## Le rapport `Suivi.xlsx`

| Onglet | Contenu |
| --- | --- |
| Accueil | Forme du jour, Vigilance, semaine en cours, niveaux consolidés (voie/bloc × vertical/dévers), points faibles et exercices conseillés, feux verts, verdict de l'import |
| Séances | Une ligne par séance : durée, effort, charge, forme, récupération, douleurs avant/pendant/après |
| Tentatives | Une ligne par voie ou bloc : cotation, profil, style, couleur, nom, résultat, cause d'échec, salle, secteur, cotation de la salle |
| Salles | Projets en cours, et l'inventaire de chaque salle avec l'historique de chaque voie (essais, réussites, première réussite) |
| Douleurs | Les **épisodes** (une zone, début, fin, durée, niveau max, en cours ou terminé) et tous les signalements |
| Charge | Par semaine : séances, minutes par activité, charge, rapports sur 4 semaines (indicatifs) + graphiques |
| Progression | Meilleure cotation réussie par semaine et par domaine + graphique |
| Pyramides | Pyramides voie et bloc, réussite par profil, détail du niveau consolidé |
| Feux verts | Chaque critère, sa valeur et son objectif |
| Compétences | Les bilans de fin de bloc (8 notes) + graphique d'évolution |
| Mesures | Les mesures hebdomadaires et les tests de mobilité |
| Historique | L'ancien programme (exports de `exports/programme-1`) |
| Contrôle | Exports lus, doublons, valeurs hors plage, jours repris, alertes sur le programme |

**Règles de calcul** (seuils dans `Programme.xlsx → Paramètres`) :
- **Forme du jour** : rouge si une note de récupération ≤ 2 ou douleur avant > 2 ; verte si toutes les notes ≥ 4 et aucune douleur ; orange sinon.
- **Niveau consolidé** : la cotation la plus haute réussie à au moins 70 % sur au moins 5 essais, par domaine. Profil regroupé : Dalle et Vertical → Vertical ; Léger dévers, Dévers et Toit → Dévers.
- **Épisode de douleur** : signalements d'une même zone ; il se termine après 7 jours sans signalement.
- **Points faibles** : sur les 8 dernières semaines, le profil au plus faible taux de réussite (au moins 5 essais) et la cause d'échec la plus fréquente ; les exercices conseillés viennent de l'onglet **Conseils**.
- **Vigilance** : forme orange ou rouge, douleur en hausse sur 3 séances, zone touchée au moins 2 fois en 14 jours, épisode en cours, charge des 4 dernières semaines > 1,3 × les 4 précédentes, deux séances de suite à un effort ≥ 8, feux verts atteints.

## `Programme.xlsx`

| Onglet | Contenu |
| --- | --- |
| Lisez-moi | Rappel de l'utilisation |
| Programme | Une ligne par séance : Semaine, Phase, Jour, Activité, Contenu. Ajoute chaque nouveau bloc à la suite |
| Exercices | Une ligne par fiche (nom identique à celui écrit entre « » dans le programme) |
| Routines | Une ligne par étape (nom identique à celui écrit après `>`) |
| Paramètres | Date de début, seuils (feux verts, forme, consolidé, épisodes, points faibles, charge), temps moyens |
| Conseils | Exercices conseillés selon la cause d'échec ou le profil |
| Listes | Valeurs des listes déroulantes (jours, activités, zones, phases, cotations, disciplines, niveaux) |

Après une modification : `python escalade.py --app`, puis envoie `data.js` et `sw.js` sur GitHub.

## Mettre à jour l'app sur GitHub

1. Dans ton dépôt, **Add file → Upload files** : `index.html`, `style.css`, `app.js`, `data.js`, `sw.js`, `aide.html`, `icone-180.png`, puis **Commit changes**.
2. Sur l'iPhone, ouvre l'app avec connexion et touche le bandeau « Nouvelle version disponible ».

`Programme.xlsx`, `escalade.py`, `Suivi.xlsx` et le dossier `exports` restent sur ton ordinateur : **ne les mets pas sur GitHub** (le rapport et les exports contiennent tes données de santé).

## Installation (première fois)

1. Crée un compte gratuit sur github.com. Active la **double authentification** (Settings → Password and authentication).
2. **New repository**, par exemple `escalade`, en **Public**, puis **Create repository**.
3. **uploading an existing file** : glisse les 6 fichiers ci-dessus, puis **Commit changes**.
4. **Settings → Pages** : Branch `main`, `/ (root)`, **Save**. Attends 1 à 2 minutes.
5. Sur l'iPhone, ouvre l'adresse dans **Safari** (ou Firefox à jour), puis **Partager → Sur l'écran d'accueil**.
6. Ouvre l'app une fois avec connexion. Ensuite, elle fonctionne en mode avion.

## Changer de programme

1. Dans `Programme.xlsx` : la nouvelle **date de début** (Paramètres) et le nouveau contenu (Programme). `python escalade.py --app`, puis GitHub.
2. L'app détecte le nouveau programme (`PROGRAMME_ID`) et propose : **Exporter**, puis **Démarrer** (les séances de l'ancien programme sont effacées ; réglages, favoris et moyennes gardés).
3. Range cet export dans un dossier d'archive (par exemple `exports/programme-2/`) ; pour l'afficher dans l'onglet Historique, remplace le contenu de `exports/programme-1/` ou adapte la constante `HISTO` dans `escalade.py`.

Une séance peut avoir des versions (`## Voie (avec partenaire)`, `## Remplacement bloc (pas de partenaire)`) : l'app propose le choix dans le bandeau ; une version dont le nom contient « bloc » note des blocs.

Pour un nouveau **bloc** du même programme, il suffit d'ajouter ses lignes à la suite dans l'onglet Programme (sans changer la date) : rien n'est effacé.

## Salles et temps saisis (version 5.2)

- **Salles** (`localStorage` clé `salles`, incluse dans la sauvegarde) : nom, type, échelles de cotation (cotation de la salle → équivalent dans l'app), secteurs (profil par défaut, date de mise à jour), inventaire. Une tentative garde `cot` (échelle de l'app, utilisée par toutes les analyses), `cotSalle`, `salle` et `voieId`. Une tentative notée avec une couleur ou un nom crée la voie dans l'inventaire si elle n'existe pas (`finaliserTentative`).
- **Voies « différentes »** (feux verts) : par identifiant de voie quand il existe, sinon cotation + couleur + nom.
- **Temps saisis** : `d.tempsManuel` (minutes par étape) et `d.heuresSaisies` ; prioritaires sur les mesures (`tempsReel`), marqués « saisi » dans l'export.

## Version 6.2 (couleurs, salle, programme, navigation)

- **Couleurs** : couleur pleine = activité (séance faite), adoucie = à venir (`color-mix` sur `--act`) ; pastel = type de phase. Tuiles de voies : `styleTuile(couleur)` met la couleur de la prise en fond et choisit le texte (`texteSur`, noir sur les couleurs claires).
- **Boutons** : `.lien`, `.lien-blanc` et `.exo` ont fond et bordure ; le simple texte n'en a jamais.
- **Séance** : titre court = ce qui précède le premier « · » (`teteReste`, `titreAction`) ; la suite est dans l'étape dépliée (`panneauEtape` : contenu à gauche, actions en colonne). Carte Maintenant : une ligne « Phase · temps » qui se déplie (`ouverts` « mn »). Récupération en un appui (`ressenti` : bien 5/5/5, moyen 3/3/4, mal 2/2/3 + douleur).
- **Salle** : onglets Mur et Réglages ; fiche de voie (`voie2`) et réglages du secteur (`secteur2`) dans une fenêtre du bas. Ordre des voies : `v.ordre` (mode Ranger, `deplacerVoie`), repris dans la liste en séance.
- **Programme** : vues Programme et Progrès. La semaine dépliée (`detailSemaine`) : bande des 7 jours, encadré « À faire », séances. Outils de la semaine dans ⋯ (semaine dépliée en dernier = `semaineVue`). Feux verts dans Progrès.
- **Navigation** : « ‹ Programme » quand une séance est ouverte depuis le programme (`origine`, `progY`) ; chaque onglet se rouvre là où on l'a laissé (`memoriserOnglet`) ; le toucher à nouveau ramène à son début ; « ? » ouvre l'aide à la bonne section (`ANCRES_AIDE`) et le retour reprend le même écran (`sessionStorage`, 10 minutes au plus). Onglet Plus en trois groupes ; fichier calendrier sous « Fonctions avancées » (`R.avancees`).

## Version 6.1 (corrections après audit)

- **Temps app fermée** : `d.pauseTotale` est retiré du temps affiché et de la durée enregistrée (sauf si les heures du bilan rapide sont modifiées à la main : elles font foi).
- **Un seul chemin pour finir une séance** : ■ Fin, « Terminer », « Modifier le bilan » et les séances à compléter ouvrent tous le bilan rapide (`terminer` et `ouvrirBilan` y renvoient). L'ancien bilan détaillé, la fenêtre « Séance restée ouverte » et « Saisir après coup » sont supprimés.
- **Bilan rapide rouvert** : la grille et les voies précises reviennent préremplies depuis les tentatives `approx` ; à l'enregistrement, elles sont **remplacées** (plus de doublons). `d.approx` n'est posé qu'en suivi léger ou pour une séance non suivie en direct.
- **Voies « différentes »** (feux verts, app et rapport) : identité = voie de la salle (`voieId`), sinon couleur + nom ; une réussite anonyme du bilan rapide ne compte pas. Export : colonne C14 des lignes Voie = « Approx ».
- **Modifier une séance commencée** : `remapperSaisies` fait suivre à chaque saisie (passages, coches, passées, notes, résultats, étape choisie) sa ligne, d'après son texte.
- **Restauration** : une sauvegarde d'un autre programme (`programme-actif` différent) est signalée ; on peut ne restaurer que réglages, salles et favoris (`CLES_SAISIES` exclues).
- **Fluidité** : bandeau réduit pendant la séance, pas de glissement vers une autre séance pendant une séance en cours, toucher un nom d'exercice déplie aussi l'étape, texte complet et fiches dans l'étape dépliée en suivi léger, zones tactiles de 44 px, case visible en mode sombre, noms de couleurs échappés.

## Version 6.0

- **Phases** : la durée d'une phase vient de `(durée X min)` si elle est écrite, sinon passages × durée indicative (`temps_voie`, `temps_bloc` dans Paramètres) + repos. Plus de temps mesuré par voie ni de moyennes (`noterMoyenne` ne fait plus rien). Ligne du temps : `friseSeance`. Une pause : `1× Pause récupération (durée 10 min)`.
- **Fermeture de l'app** (`visibilitychange`) : minuteur arrêté, écran libéré, `d.pause` posé sur la séance en cours ; `verifierReprise` à la réouverture (moins de 15 min : reprise ; plus : Reprendre / Terminer ; séance d'un autre jour : rien, elle reste à compléter). Aucun minuteur ne reprend au démarrage.
- **Salles** : secteur `type` (Bloc/Voie, deviné pour les salles existantes), `profil` habituel unique, ordre = ordre de la liste ; voie `repere` ; `identite(v, sa)` ; `dernierSecteur` mémorisé par salle et discipline. Export Inventaire : colonne repère en C12.
- **Interface** : glissement sur tout l'écran, étapes teintées, vrais boutons, en-tête et onglets à la couleur de l'app, « Exporter et sauvegarder » unique (date d'export enregistrée seulement si le partage a lieu), vue Progrès, bilan de la semaine, grand affichage (`R.grand`).

## Réorganisation (version 5.5)

- **Une action, un seul endroit** : bandeau (version, Commencer, Sautée, Déjà faite ?) ; carte Maintenant (✓, ⏭ Suivante, ■ Fin ; puis ⚠, ⏱ Repos / ▶, mode) ; menu ⋯ (Bilan rapide, Modifier, Copier vers…, Déplacer, Sautée ; Annuler, Réinitialiser). « Saisir après coup » est remplacé par le bilan rapide ; l'appui long et le menu du titre d'étape sont supprimés.
- **Étapes dépliables** (`panneauEtape`, clé `ouverts` « e » + index) : toucher la ligne déplie ; la case ou les ronds cochent.
- **Couleurs** : `COULEURS` (19) + `salle.couleurs` ({nom, hex}) via `couleursDe(sid)` et `COULEUR_HEX`.
- **Secteurs** : page dédiée (`afficherSecteur`), profils multiples (`secteur.profils`, `profilsSecteur`), le premier recopié dans `secteur.profil` pour compatibilité.

## Suivi léger et bilan rapide (version 5.4)

- **Mode de suivi** par séance (`d.mode` : `leger` ou `detaille`), mémorisé par activité (`R.modes`), modifiable à tout moment. En léger : pas de fenêtre de résultat ni de repos après un passage, liste compacte.
- **Étapes** : terminée (`etapeFinie` : tous les passages, ou `d.finies` après « Étape suivante »), passée (`d.passees`), choisie (`d.focus`, « Aller à cette étape ») ; `prochain()` en tient compte.
- **Bilan rapide** (`ouvrirBilanRapide`) : heures, état de chaque étape, grille par cotation (tentatives marquées `approx`), voies de la salle, effort, douleur, notes. La séance est marquée `d.approx` en suivi léger : « Suivi léger (approximatif) » dans les notes de l'export (colonne Suivi du rapport).
- **Repos manuel par défaut** (`R.auto = false`, appliqué une fois aux réglages existants) ; le chrono du passage a été supprimé.

## Modifier le programme dans l'app (version 5.3)

Les modifications (éditeur de séance, copier une séance ou une semaine, répéter, pause, bloc suivant) sont des **opérations** (`localStorage` clé `modifs-programme`) appliquées dans l'ordre par-dessus `SEANCES` (`programmeEffectif`) :
- `set` : remplace le contenu (et la phase) d'une séance, ou l'ajoute ;
- `del` : supprime une séance ;
- `pause` : décale de `n` semaines toutes les séances à partir de `depuis`.

Elles partent dans l'export (lignes `Programme`). `python escalade.py` les applique **une seule fois** à `Programme.xlsx` (onglet masqué « Modifs appliquées »), régénère `data.js`, qui contient `MODIFS_APPLIQUEES` : l'app ignore alors ces opérations, déjà intégrées au programme. Pense à envoyer `data.js` et `sw.js` sur GitHub après une synchronisation.

Une semaine contenant des séances commencées n'est jamais écrasée par une copie, et une pause est refusée si une séance à décaler est déjà commencée.

## Carte du code (`app.js`)

| Pour changer… | Regarde |
| --- | --- |
| Les repos par défaut, les cotations, profils, styles, causes, couleurs des prises | Section 1 (constantes `PROFILS`, `STYLES`, `CAUSES`, `COULEURS`) |
| Les paramètres venant de `Programme.xlsx` | `PA(nom, défaut)` lit `PARAMS` de `data.js` |
| L'annulation sur plusieurs niveaux | Section 2 (`memoriser`) |
| La lecture des lignes d'une séance | Section 4 (`analyser`) |
| Les durées prévues et le temps réel | Section 4 bis |
| Les feux verts, la forme du jour, le bilan de compétences | Section « Feux verts » (`feuxVerts`, `formeDuJour`, `carteCompetences`) |
| L'écran séance (bandeau avec version et ▶ Commencer), la carte Maintenant, les types d'étape | Section 7 |
| Les fenêtres (résultat, circuit, récupération, compétences, séance sautée, déplacer, menu ⋯…) | Section 9 |
| Le minuteur (`placerMinuteur` : dans la carte Maintenant ou en pastille), le chrono du passage | Section 10 |
| L'onglet Programme (`afficherProgramme`, `detailSemaine`), Progrès, l'écran Repos, la création de séance | Section 13 |
| L'onglet Plus, la bibliothèque, les réglages | Section 14 |
| L'export, la sauvegarde, le calendrier | Section 15 |
| Les onglets, l'en-tête, le balayage | Section 17 |

Les couleurs se changent en haut de `style.css`.

## Syntaxe du contenu d'une séance (Programme.xlsx)

Dans `Programme.xlsx`, onglet Programme, colonne Contenu : une ligne par élément (Alt+Entrée pour passer à la ligne) :

| Ligne | Effet dans l'app |
| --- | --- |
| `> Échauffement salle A (classique)` | Routine à cocher (nom identique à l'onglet Routines) |
| `! Repos au moins 5 min` | Consigne grise, sans case |
| `3× Voie en 5a` | Action avec 3 ronds (sans nombre : 1 rond) |
| `… (repos 4 min)` ou `(repos 90 s)` | Durée du repos (sinon : 5 min voie, 3 min bloc, 90 s maison, rien en course) |
| `… (durée 15 min)` | Durée prévue de l'étape (sinon estimée automatiquement) |
| `… · 30 s` ou `… 25 min …` | Ajoute un bouton ▶ chrono de cette durée |
| `6× 2 min course + 2 min marche` | Ajoute un minuteur de fractions |
| `« Bras tendus »` | Lien vers l'explication (nom identique à l'onglet Exercices, méthodes comprises : `« Circuit »`, `« Projet »`…) |
| `3× « Circuit » de 4 blocs` | « N blocs » ou « N voies » dans une ligne : un résultat par bloc à chaque série |
| `## Courte (12 min)` | Début d'une version ; les lignes avant le premier `##` sont communes |
| `… [effort]` ou `… [facile]` | Impose le type de l'étape (couleur de la bande) ; sinon déduit du texte |
| `… (6 si feu vert)` | Affiche le rappel du feu vert correspondant (5c, 6a ou bloc 6) |

Attention : toute durée écrite dans une action (« 3 min », « 30 s ») ajoute un chrono. Pour une consigne de repos, utilise `(repos 2 min)` ou une ligne `!`.

Puis lance `python escalade.py --app` (il signale les noms introuvables) et remets `data.js` et `sw.js` sur GitHub.

## Format de l'export (`export-escalade-….csv`)

Séparateur `;`, en-têtes `Type;Semaine;Jour;Activité;Date;C1…C15`. `Jour` est le jour **prévu** (clé de la séance) ; `Date` est la date **réelle** (une séance déplacée garde son jour prévu et prend la date du nouveau jour).

| Type | C1 à C14 |
| --- | --- |
| Séance / Séance libre | Fait, durée, effort, douleur après, zone, meilleure perf, nb « sec », notes (dont « Raison : … » si sautée), récup doigts/coudes/épaules, énergie, motivation, douleur avant, zone avant, douleur pendant (max), salle |
| Voie | Cotation (échelle de l'app), profil, résultat, nb « sec », rang, style, couleur, nom, cause d'échec, cotation de la salle, salle, secteur, identifiant de la voie |
| Programme | Modification du programme faite dans l'app : opération (set, del, pause), contenu, phase, identifiant, semaine de départ et décalage (pause) |
| Inventaire | Salle, secteur, couleur, cotation salle, cotation app, profil, nom, statut, date de démontage, identifiant, notes (colonne Activité = Voie ou Bloc, Date = ouverture) |
| Douleur | Zone, niveau, heure |
| Mesure | Planche, course, nb « sec », voie, bloc, tractions, notes, genou contre le mur, 90/90, squat profond, mains derrière le dos |
| Compétences | Pieds, lecture, dévers, gainage, endurance, repos, profil, confiance, bloc |

## Donner l'app à quelqu'un d'autre

**Même adresse que toi** : la personne installe l'app depuis ton adresse, puis **Plus → Réglages → Programme** : « Uniquement mes séances créées ». Envoie-lui le lien de l'aide : `…/aide.html`.

**Son propre programme** : un nouveau dépôt GitHub (Fork) avec Pages activé ; une copie de `Programme.xlsx` avec sa date et son contenu ; `python escalade.py --app` ; envoie `data.js` et `sw.js` dans *son* dépôt.

## Sauvegarde

Si tu supprimes l'app de l'écran d'accueil ou changes d'iPhone, tout ce qui n'a pas été exporté est perdu. Exporte au moins chaque dimanche ; une pastille orange apparaît sur l'onglet Plus quand le dernier export date de plus de 7 jours.
