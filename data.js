// Fichier généré par generer_app.py — tu peux aussi le modifier à la main.

const DATE_DEBUT = "2026-10-26";

const ZONES = [
 "Aucune",
 "Doigts",
 "Poignet",
 "Coude",
 "Épaule",
 "Dos",
 "Genou",
 "Cheville / pied",
 "Mollet / Achille",
 "Autre"
];

const SEANCES = [
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "6 × (2 min course + 2 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • 2 passages sur les voies en 4 et 5a avec « pieds silencieux », puis 2 passages avec « bras tendus ». • 1 à 2 voies en 5b (verticale si possible, sinon en dévers) travaillées au point : autant de « sec » que nécessaire, le but est d'arriver en haut. • Repos entre les voies : au minimum 5 min (le temps d'assurer). • Note le nb de « sec » dans la 5b en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×20 s • planche latérale 2×15 s/côté • dead bug 3×6/côté • pompes mains sur une table 3×6 • rowing inversé genoux pliés 3×5 • suspension active pieds sur une chaise 3×5 (si barre) • rotations externes élastique 2×12/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "5 × (2 min course + 2 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • Circuit de 10 blocs verticaux de niveau 3 et 4, chacun 2 fois (la 2e fois plus calmement). • 20 min en dévers sur des blocs de niveau 3 avec « hanches collées ». • 2 essais au maximum sur 2 blocs verticaux de niveau 5. • Désescalade dès que possible plutôt que sauter. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "6 × (2 min course + 2 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • 2 passages sur les voies en 4 et 5a avec « pieds silencieux », puis 2 passages avec « bras tendus ». • 1 à 2 voies en 5b (verticale si possible, sinon en dévers) travaillées au point : autant de « sec » que nécessaire, le but est d'arriver en haut. • Repos entre les voies : au minimum 5 min (le temps d'assurer). • Note le nb de « sec » dans la 5b en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×20 s • planche latérale 2×15 s/côté • dead bug 3×6/côté • pompes mains sur une table 3×6 • rowing inversé genoux pliés 3×5 • suspension active pieds sur une chaise 3×5 (si barre) • rotations externes élastique 2×12/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "5 × (2 min course + 2 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • Circuit de 10 blocs verticaux de niveau 3 et 4, chacun 2 fois (la 2e fois plus calmement). • 20 min en dévers sur des blocs de niveau 3 avec « hanches collées ». • 2 essais au maximum sur 2 blocs verticaux de niveau 5. • Désescalade dès que possible plutôt que sauter. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "5 × (3 min course + 1 min 30 marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • 2 passages sur les 5a avec « main qui plane » puis « grimpe au ralenti ». • 2 passages au point sur la même 5b en dévers avec « profil alterné » ; repère les endroits où tu prends « sec ». • 1 essai d'enchaînement sur une 5b verticale, en moulinette, sans pression. • Note le nb de « sec ». Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×30 s • planche latérale 2×20 s/côté • dead bug 3×8/côté • hollow body genoux pliés 3×15 s • pompes mains sur une table 3×8 • rowing inversé genoux pliés 3×8 • suspension active pieds sur une chaise 3×6 • rotations externes 2×12/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "4 × (3 min course + 1 min 30 marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • Pyramide verticale : 4 blocs de niveau 3, 3 de niveau 4, 2 de niveau 5. • 25 min en dévers sur des blocs de niveau 3-4 : « profil alterné » et premiers « drop knee », en douceur. • « Désescalade » sur au moins 5 blocs. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "5 × (3 min course + 1 min 30 marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • 2 passages sur les 5a avec « main qui plane » puis « grimpe au ralenti ». • 2 passages au point sur la même 5b en dévers avec « profil alterné » ; repère les endroits où tu prends « sec ». • 1 essai d'enchaînement sur une 5b verticale, en moulinette, sans pression. • Note le nb de « sec ». Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×30 s • planche latérale 2×20 s/côté • dead bug 3×8/côté • hollow body genoux pliés 3×15 s • pompes mains sur une table 3×8 • rowing inversé genoux pliés 3×8 • suspension active pieds sur une chaise 3×6 • rotations externes 2×12/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "4 × (3 min course + 1 min 30 marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • Pyramide verticale : 4 blocs de niveau 3, 3 de niveau 4, 2 de niveau 5. • 25 min en dévers sur des blocs de niveau 3-4 : « profil alterné » et premiers « drop knee », en douceur. • « Désescalade » sur au moins 5 blocs. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "4 × (5 min course + 1 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • Endurance : une 4 puis une 5a enchaînées avec quelques secondes de repos en bas, 2 fois (10 min de repos entre les deux). • 2 passages sur ta 5b en dévers avec « pieds qui tirent » et « bras tendus » : objectif, moins de « sec » que la fois précédente. • 1 passage au point sur une 5c pour découvrir les mouvements. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×40 s • planche latérale 2×30 s/côté • dead bug 3×10/côté • hollow body genoux pliés 3×25 s • pompes au sol sur les genoux 3×8 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "3 × (5 min course + 1 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • 3 séries de 3 blocs faciles (niveau 3-4) enchaînés, 4 min de repos entre les séries. • 30 min en dévers sur des blocs de niveau 4 avec « ne jamais lâcher les pieds » ; premiers « crochets de pointe ». • 1 bloc projet de niveau 5, au maximum 3 essais par mouvement. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "4 × (5 min course + 1 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • Endurance : une 4 puis une 5a enchaînées avec quelques secondes de repos en bas, 2 fois (10 min de repos entre les deux). • 2 passages sur ta 5b en dévers avec « pieds qui tirent » et « bras tendus » : objectif, moins de « sec » que la fois précédente. • 1 passage au point sur une 5c pour découvrir les mouvements. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×40 s • planche latérale 2×30 s/côté • dead bug 3×10/côté • hollow body genoux pliés 3×25 s • pompes au sol sur les genoux 3×8 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "3 × (5 min course + 1 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • 3 séries de 3 blocs faciles (niveau 3-4) enchaînés, 4 min de repos entre les séries. • 30 min en dévers sur des blocs de niveau 4 avec « ne jamais lâcher les pieds » ; premiers « crochets de pointe ». • 1 bloc projet de niveau 5, au maximum 3 essais par mouvement. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "2 × (10 min course + 2 min marche) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. • 2 à 3 essais d'enchaînement sur ta 5b en dévers, au moins 10 min de repos entre les essais. • 1 passage au point sur ta 5c. • Le reste de la séance en 4 et 5a, grimpées proprement. • Arrête dès que la qualité baisse. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×40 s • planche latérale 2×30 s/côté • dead bug 3×10/côté • hollow body genoux pliés 3×25 s • pompes au sol sur les genoux 3×8 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "20 min de course continue très lente (ou la séance du mardi) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). • 1 bloc projet vertical de niveau 5 et 1 bloc projet en dévers de niveau 4. • 3 à 4 min de repos entre deux essais. • Arrête dès que la qualité baisse. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "20 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers. • Refais la 5b en dévers des semaines 1-2 et compare le nb de « sec » avec ta première fois. • Remplis l'onglet Bilan (colonne Semaine 8). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : planche 2×30 s • planche latérale 2×20 s/côté • dead bug 2×8/côté • hollow body 2×15 s • pompes 2×8 • rowing 2×8 • suspension active 2×5 • rotations externes 2×12/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers. • Refais les blocs en dévers des semaines 1-2 et note la différence. • Remplis l'onglet Bilan (colonne Semaine 8). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 9,
  "phase": "Repos actif entre cycles",
  "jour": "Mardi",
  "activite": "Repos actif",
  "contenu": "Semaine sans escalade ni renforcement : 30 à 45 min de marche, de vélo tranquille ou d'étirements doux. Les tendons se consolident."
 },
 {
  "semaine": 9,
  "phase": "Repos actif entre cycles",
  "jour": "Samedi",
  "activite": "Repos actif",
  "contenu": "Semaine sans escalade ni renforcement : 30 à 45 min de marche, de vélo tranquille ou d'étirements doux. Les tendons se consolident."
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "25 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Reprise : • volume sur les 4 et 5a avec une consigne technique différente à chaque passage • 2 passages sur des 5b (1 verticale, 1 en dévers), sans chercher l'enchaînement • pas de projet dur. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×45 s • hollow body genoux pliés 3×25 s • pompes complètes au sol 3×5 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "15 à 20 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Reprise : • circuit de blocs faciles (niveau 3-4) • 20 min en dévers sur des blocs de niveau 4 • pas de projet dur. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "25 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Progression : • volume sur les 4 et 5a avec une consigne technique • 2 essais d'enchaînement sur des 5b (alterne vertical et dévers) • 1 à 2 passages au point sur une 5c • endurance : une 5a puis une 5b enchaînées, 2 fois. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×45 s • hollow body genoux pliés 3×25 s • pompes complètes au sol 3×5 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "15 à 20 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Progression : • 30 à 40 min en dévers sur des blocs de niveau 4 • 2 à 3 blocs projets de niveau 5, dont un en dévers • circuit : 3 blocs faciles enchaînés, 3 fois. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "25 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Pic : • 2 à 3 essais d'enchaînement sur ton projet du mois (5b en dévers ou 5c verticale), 10 min de repos entre les essais • 1 passage au point sur une 5c • le reste en voies faciles propres. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×45 s • hollow body genoux pliés 3×25 s • pompes complètes au sol 3×5 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "15 à 20 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Pic : • projets de niveau 5 (dont un en dévers) • 3 à 4 min de repos entre deux essais, 3 essais maximum par mouvement. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "Allègement : 15 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers • refais les voies du mois et note le nb de « sec » dans ta voie en dévers suivie. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : 2 séries au lieu de 3. Planche 3×45 s • hollow body genoux pliés 3×25 s • pompes complètes au sol 3×5 • rowing inversé genoux pliés 3×10 • suspension active pieds sur une chaise 3×8 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers • refais les blocs du mois. Technique du mois : crochet de talon, en douceur, sans forcer sur le genou. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "30 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Reprise : • volume sur les 4 et 5a avec une consigne technique différente à chaque passage • 2 passages sur des 5b (1 verticale, 1 en dévers), sans chercher l'enchaînement • pas de projet dur. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×50 s • hollow body jambes tendues 3×20 s • pompes complètes 3×8 • rowing inversé jambes tendues 3×8 • suspension active pieds libres 3×5 • tractions assistées (pieds sur chaise ou élastique) 3×3 lentes, seulement si la suspension ne gêne pas les coudes ni les épaules • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "20 à 25 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Reprise : • circuit de blocs faciles (niveau 3-4) • 20 min en dévers sur des blocs de niveau 4 • pas de projet dur. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "30 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Progression : • volume sur les 4 et 5a avec une consigne technique • 2 essais d'enchaînement sur des 5b (alterne vertical et dévers) • 1 à 2 passages au point sur une 5c en dévers • endurance : une 5a puis une 5b enchaînées, 2 fois. Option : cours de grimpe en tête si la salle en propose (sinon, moulinette). Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×50 s • hollow body jambes tendues 3×20 s • pompes complètes 3×8 • rowing inversé jambes tendues 3×8 • suspension active pieds libres 3×5 • tractions assistées (pieds sur chaise ou élastique) 3×3 lentes, seulement si la suspension ne gêne pas les coudes ni les épaules • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "20 à 25 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Progression : • 30 à 40 min en dévers sur des blocs de niveau 4 • 2 à 3 blocs projets de niveau 5, dont un en dévers • circuit : 3 blocs faciles enchaînés, 3 fois. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "30 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Pic : • 2 à 3 essais d'enchaînement sur ton projet du mois (5b en dévers ou 5c verticale), 10 min de repos entre les essais • 1 passage au point sur une 5c • le reste en voies faciles propres. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×50 s • hollow body jambes tendues 3×20 s • pompes complètes 3×8 • rowing inversé jambes tendues 3×8 • suspension active pieds libres 3×5 • tractions assistées (pieds sur chaise ou élastique) 3×3 lentes, seulement si la suspension ne gêne pas les coudes ni les épaules • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "20 à 25 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Pic : • projets de niveau 5 (dont un en dévers) • 3 à 4 min de repos entre deux essais, 3 essais maximum par mouvement. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "Allègement : 20 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers • refais les voies du mois et note le nb de « sec » dans ta voie en dévers suivie. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : 2 séries au lieu de 3. Planche 3×50 s • hollow body jambes tendues 3×20 s • pompes complètes 3×8 • rowing inversé jambes tendues 3×8 • suspension active pieds libres 3×5 • tractions assistées (pieds sur chaise ou élastique) 3×3 lentes, seulement si la suspension ne gêne pas les coudes ni les épaules • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers • refais les blocs du mois. Technique du mois : changement de pied sur une même prise et opposition (pousser d'un côté, tirer de l'autre). Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "35 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Reprise : • volume sur les 4 et 5a avec une consigne technique différente à chaque passage • 2 passages sur des 5b (1 verticale, 1 en dévers), sans chercher l'enchaînement • pas de projet dur. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body jambes tendues 3×30 s • pompes complètes 3×10 • rowing inversé jambes tendues 3×10 • suspension active pieds libres 3×8 • tractions assistées 3×5 lentes • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "25 à 30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Reprise : • circuit de blocs faciles (niveau 3-4) • 20 min en dévers sur des blocs de niveau 4 • pas de projet dur. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "35 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Progression : • volume sur les 4 et 5a avec une consigne technique • 2 essais d'enchaînement sur des 5b (alterne vertical et dévers) • 1 à 2 passages au point sur une 5c en dévers • endurance : une 5a puis une 5b enchaînées, 2 fois. Option : cours de grimpe en tête si la salle en propose (sinon, moulinette). Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body jambes tendues 3×30 s • pompes complètes 3×10 • rowing inversé jambes tendues 3×10 • suspension active pieds libres 3×8 • tractions assistées 3×5 lentes • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "25 à 30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Progression : • 30 à 40 min en dévers sur des blocs de niveau 4 • 2 à 3 blocs projets de niveau 5, dont un en dévers • circuit : 3 blocs faciles enchaînés, 3 fois. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "35 min de course continue • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Pic : • 2 à 3 essais d'enchaînement sur ton projet du mois (5b en dévers ou 5c verticale), 10 min de repos entre les essais • 1 passage au point sur une 5c • le reste en voies faciles propres. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body jambes tendues 3×30 s • pompes complètes 3×10 • rowing inversé jambes tendues 3×10 • suspension active pieds libres 3×8 • tractions assistées 3×5 lentes • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "25 à 30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Pic : • projets de niveau 5 (dont un en dévers) • 3 à 4 min de repos entre deux essais, 3 essais maximum par mouvement. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "Allègement : 25 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers • refais les voies du mois et note le nb de « sec » dans ta voie en dévers suivie. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : 2 séries au lieu de 3. Planche 3×60 s • hollow body jambes tendues 3×30 s • pompes complètes 3×10 • rowing inversé jambes tendues 3×10 • suspension active pieds libres 3×8 • tractions assistées 3×5 lentes • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers • refais les blocs du mois. Technique du mois : repos en voie bras tendu en secouant l'autre bras. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 22,
  "phase": "Repos actif entre cycles",
  "jour": "Mardi",
  "activite": "Repos actif",
  "contenu": "Semaine sans escalade ni renforcement : 30 à 45 min de marche, de vélo tranquille ou d'étirements doux. Les tendons se consolident."
 },
 {
  "semaine": 22,
  "phase": "Repos actif entre cycles",
  "jour": "Samedi",
  "activite": "Repos actif",
  "contenu": "Semaine sans escalade ni renforcement : 30 à 45 min de marche, de vélo tranquille ou d'étirements doux. Les tendons se consolident."
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "35 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Reprise : • 5b en volume (elles deviennent ton échauffement avancé) • 1 passage sur une 5c en dévers, sans pression. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux suspendu 3×5 (si barre et épaules à l'aise) • tractions assistées 3×5 lentes • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "25 à 30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Reprise : • circuit de blocs de niveau 4 • 25 min en dévers niveau 4. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "35 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Progression : • 5b en volume • 2 à 3 essais d'enchaînement sur une 5c en dévers • 1 à 2 passages au point sur une 6a. • Si cours de tête fait : tête uniquement dans les 4 et 5a avec un assureur expérimenté. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux suspendu 3×5 (si barre et épaules à l'aise) • tractions assistées 3×5 lentes • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "25 à 30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Progression : • 40 min en dévers sur des blocs de niveau 4 et 5 • projets de niveau 5 en dévers • petits déplacements dynamiques contrôlés, pieds toujours sur le mur (jamais de jeté). Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "35 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Pic : • essais d'enchaînement sur ton projet (5c en dévers), 10 min de repos entre les essais • 1 passage au point sur une 6a. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux suspendu 3×5 (si barre et épaules à l'aise) • tractions assistées 3×5 lentes • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "25 à 30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Pic : • projets de niveau 5 en dévers, 3 à 4 min de repos entre les essais. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "Allègement : 25 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers • refais les voies du mois, note le nb de « sec » dans ta 5c en dévers. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : 2 séries au lieu de 3. Planche 3×60 s • hollow body 3×30 s • relevés de genoux suspendu 3×5 (si barre et épaules à l'aise) • tractions assistées 3×5 lentes • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers • refais les blocs du mois. Technique du mois : crochet de talon en dévers. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "40 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Reprise : • 5b en volume (elles deviennent ton échauffement avancé) • 1 passage sur une 5c en dévers, sans pression. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×2, UNIQUEMENT si 3×5 assistées sont faciles et sans douleur (sinon reste en assistées) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Reprise : • circuit de blocs de niveau 4 • 25 min en dévers niveau 4. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "40 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Progression : • 5b en volume • 2 à 3 essais d'enchaînement sur une 5c en dévers • 1 à 2 passages au point sur une 6a. • Si cours de tête fait : tête uniquement dans les 4 et 5a avec un assureur expérimenté. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×2, UNIQUEMENT si 3×5 assistées sont faciles et sans douleur (sinon reste en assistées) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Progression : • 40 min en dévers sur des blocs de niveau 4 et 5 • projets de niveau 5 en dévers • petits déplacements dynamiques contrôlés, pieds toujours sur le mur (jamais de jeté). Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "40 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Pic : • essais d'enchaînement sur ton projet (5c en dévers), 10 min de repos entre les essais • 1 passage au point sur une 6a. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×2, UNIQUEMENT si 3×5 assistées sont faciles et sans douleur (sinon reste en assistées) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Pic : • projets de niveau 5 en dévers, 3 à 4 min de repos entre les essais. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "Allègement : 25 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers • refais les voies du mois, note le nb de « sec » dans ta 5c en dévers. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : 2 séries au lieu de 3. Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×2, UNIQUEMENT si 3×5 assistées sont faciles et sans douleur (sinon reste en assistées) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers • refais les blocs du mois. Technique du mois : enchaîner plusieurs mouvements en gardant le gainage. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "40 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Reprise : • 5b en volume (elles deviennent ton échauffement avancé) • 1 passage sur une 5c en dévers, sans pression. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×3 (ou assistées 3×5) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Reprise : • circuit de blocs de niveau 4 • 25 min en dévers niveau 4. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "40 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Progression : • 5b en volume • 2 à 3 essais d'enchaînement sur une 5c en dévers • 1 à 2 passages au point sur une 6a. • Si cours de tête fait : tête uniquement dans les 4 et 5a avec un assureur expérimenté. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×3 (ou assistées 3×5) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Progression : • 40 min en dévers sur des blocs de niveau 4 et 5 • projets de niveau 5 en dévers • petits déplacements dynamiques contrôlés, pieds toujours sur le mur (jamais de jeté). Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "40 min de course continue (ou vélo / natation si les articulations le demandent) • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Pic : • essais d'enchaînement sur ton projet (5c en dévers), 10 min de repos entre les essais • 1 passage au point sur une 6a. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×3 (ou assistées 3×5) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "30 min de course continue, très facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Pic : • projets de niveau 5 en dévers, 3 à 4 min de repos entre les essais. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "Allègement : 25 min de course continue facile • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "Échauffement salle 20 min (onglet Routines), voies faciles : la 3 et une 4. Allègement : volume réduit d'un tiers • refais les voies du mois, note le nb de « sec » dans ta 5c en dévers. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "25 min. Échauffement 4 min (cercles poignets/épaules/bassin, 20 « Y »). Allègement : 2 séries au lieu de 3. Planche 3×60 s • hollow body 3×30 s • relevés de genoux 3×5 • tractions complètes lentes 3×3 (ou assistées 3×5) • pompes 3×10 • rowing 3×10 • rotations externes 2×15/bras Repos 60-90 s entre séries, mouvements lents (2 s aller, 2 s retour). Mobilité 3 min (grenouille, fente basse, pectoraux). Détails : onglet Exercices."
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "Facultatif : 30 min de marche rapide • Avant : 5 min de marche rapide. Après : 5 min de marche + étirements doux (mollets, quadriceps, ischios). Allure conversation : si tu ne peux pas parler, ralentis ou marche. Douleur au talon ou au tibia = palier précédent."
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "Échauffement salle 20 min (onglet Routines). Allègement : volume réduit d'un tiers • refais les blocs du mois. Technique du mois : lire la voie entière avant de grimper, repos prévus compris. Retour au calme 10 min (onglet Routines)."
 }
];

const ROUTINES = [
 {
  "routine": "Échauffement salle",
  "etape": "1. Mise en température",
  "duree": "3 min",
  "quoi": "Marche rapide, montées de genoux, petits sautillements sur place sans impact."
 },
 {
  "routine": "Échauffement salle",
  "etape": "2. Mobilisation",
  "duree": "5 min",
  "quoi": "10 cercles de poignets dans chaque sens, 10 ouvertures/fermetures de mains, 10 cercles de bras lents avant et arrière, 10 rotations de bassin, 10 balancers de jambes de chaque côté."
 },
 {
  "routine": "Échauffement salle",
  "etape": "3. Épaules",
  "duree": "2 min",
  "quoi": "10 rotations externes à l'élastique léger, sinon 10 « Y » bras levés en serrant les omoplates."
 },
 {
  "routine": "Échauffement salle",
  "etape": "4. Grimpe progressive",
  "duree": "10 min",
  "quoi": "Voie : la 3 et une 4, grimpées lentement, mains ouvertes. Bloc : 6 à 8 blocs de niveau 2-3, puis 2 blocs de niveau 4."
 },
 {
  "routine": "Retour au calme salle",
  "etape": "1. Grimpe douce",
  "duree": "5 min",
  "quoi": "1 voie ou 2 blocs très faciles, tranquillement."
 },
 {
  "routine": "Retour au calme salle",
  "etape": "2. Étirements doux",
  "duree": "5 min",
  "quoi": "30 s chacun, sans forcer : avant-bras (paume vers l'avant puis vers l'arrière), pectoraux contre un mur, dos (position de l'enfant), hanches (fente basse), ischio-jambiers."
 },
 {
  "routine": "Séance maison",
  "etape": "1. Échauffement",
  "duree": "4 min",
  "quoi": "Cercles de poignets, d'épaules et de bassin, 20 « Y » bras levés en serrant les omoplates."
 },
 {
  "routine": "Séance maison",
  "etape": "2. Gainage",
  "duree": "8 min",
  "quoi": "Exercices de gainage du jour (voir Journal), 60-90 s de repos entre séries."
 },
 {
  "routine": "Séance maison",
  "etape": "3. Haut du corps",
  "duree": "10 min",
  "quoi": "Exercices du jour, chaque répétition lente : 2 s aller, 2 s retour. Aucun à-coup."
 },
 {
  "routine": "Séance maison",
  "etape": "4. Mobilité",
  "duree": "3 min",
  "quoi": "Grenouille, fente basse, étirement des pectoraux contre un mur."
 },
 {
  "routine": "Course",
  "etape": "Avant",
  "duree": "5 min",
  "quoi": "Marche rapide."
 },
 {
  "routine": "Course",
  "etape": "Pendant",
  "duree": "—",
  "quoi": "Allure conversation : tu dois pouvoir parler en phrases complètes. Sinon, ralentis ou marche. Terrain plat et souple de préférence."
 },
 {
  "routine": "Course",
  "etape": "Après",
  "duree": "5 min + étirements",
  "quoi": "Marche, puis étirements doux des mollets, quadriceps et ischio-jambiers."
 }
];

const EXERCICES = [
 {
  "categorie": "Technique",
  "nom": "Pieds silencieux",
  "comment": "Chaque pied se pose sans aucun bruit sur la prise.",
  "cle": "Oblige à regarder la prise et à viser précisément.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Technique",
  "nom": "Regarder le pied jusqu'à la pose",
  "comment": "Tes yeux suivent le pied jusqu'à ce qu'il soit posé ; seulement ensuite tu cherches la prise de main suivante.",
  "cle": "Base de la précision.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Technique",
  "nom": "Pieds collés",
  "comment": "Une fois un pied posé, interdiction de le réajuster.",
  "cle": "Apprend à placer le pied du premier coup.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Technique",
  "nom": "Bras tendus",
  "comment": "Grimper en gardant les bras le plus tendus possible et monter en poussant sur les jambes.",
  "cle": "Le poids repose sur le squelette, pas sur les biceps : tu tiens plus longtemps.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Technique",
  "nom": "Main qui plane",
  "comment": "Avant de saisir une prise, la main reste 2 s au-dessus d'elle.",
  "cle": "Si impossible : améliore la position des pieds et des hanches.",
  "depuis": "Semaine 3"
 },
 {
  "categorie": "Technique",
  "nom": "Grimpe au ralenti",
  "comment": "Grimper une voie facile deux fois plus lentement que d'habitude.",
  "cle": "Trouver l'équilibre à chaque position.",
  "depuis": "Semaine 3"
 },
 {
  "categorie": "Technique",
  "nom": "Désescalade",
  "comment": "En bloc, redescendre en grimpant au lieu de sauter.",
  "cle": "Lecture, contrôle des pieds, et protège les genoux.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Technique",
  "nom": "Lecture avant de grimper",
  "comment": "Depuis le sol, mimer la séquence mains et pieds ; après, comparer avec ce que tu as fait.",
  "cle": "Habitude à garder toute ta vie de grimpeur.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Voie",
  "nom": "Travail « au point »",
  "comment": "Quand tu bloques, dis « sec » à ton assureur, repose-toi assis dans la corde, puis réessaie le mouvement.",
  "cle": "Le but est de comprendre chaque passage, pas d'enchaîner. Compte tes « sec » : c'est ta mesure de progrès.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Dévers",
  "nom": "Hanches collées",
  "comment": "À chaque mouvement, vérifie que ta hanche est contre le mur.",
  "cle": "Poitrine face au mur et fesses en arrière = mauvaise position.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Dévers",
  "nom": "Profil alterné",
  "comment": "Pour attraper une prise main droite, tourne la hanche droite contre le mur sur la carre extérieure du pied droit, et inversement.",
  "cle": "Mouvement de base du dévers.",
  "depuis": "Semaine 3"
 },
 {
  "categorie": "Dévers",
  "nom": "Drop knee",
  "comment": "Version plus marquée du profil, genou tourné vers le bas.",
  "cle": "Entre lentement dans la position ; ressors-en à la moindre torsion du genou.",
  "depuis": "Semaine 3"
 },
 {
  "categorie": "Dévers",
  "nom": "Pieds qui tirent",
  "comment": "Les pieds poussent vers le bas ET tirent la prise vers toi avec les orteils.",
  "cle": "Garde le bassin près du mur.",
  "depuis": "Semaine 5"
 },
 {
  "categorie": "Dévers",
  "nom": "Ne jamais lâcher les pieds",
  "comment": "Sur un bloc facile en dévers, les pieds ne quittent jamais le mur sans que tu le décides.",
  "cle": "S'ils partent, ton gainage a lâché.",
  "depuis": "Semaine 5"
 },
 {
  "categorie": "Dévers",
  "nom": "Crochet de pointe",
  "comment": "Le dessus du chausson accroché sous une prise, pour empêcher le corps de pivoter.",
  "cle": "Toujours en douceur, jamais en force.",
  "depuis": "Semaine 5"
 },
 {
  "categorie": "Technique avancée",
  "nom": "Crochet de talon",
  "comment": "Le talon posé sur une prise, la jambe tire pour rapprocher le corps.",
  "cle": "En douceur, sans forcer sur le genou ni sur l'arrière de la cuisse.",
  "depuis": "Mois 3"
 },
 {
  "categorie": "Technique avancée",
  "nom": "Changement de pied",
  "comment": "Remplacer un pied par l'autre sur la même prise : libère la place en glissant ou en sautillant très légèrement.",
  "cle": "Mouvement contrôlé, mains bien tenues.",
  "depuis": "Mois 4"
 },
 {
  "categorie": "Technique avancée",
  "nom": "Opposition",
  "comment": "Pousser d'un côté et tirer de l'autre (mains ou pieds) pour tenir une position sans bonne prise.",
  "cle": "Utile dans les dièdres et les fissures.",
  "depuis": "Mois 4"
 },
 {
  "categorie": "Technique avancée",
  "nom": "Repos bras tendu",
  "comment": "En voie, sur une bonne prise, pendre bras tendu et secouer l'autre bras, puis changer.",
  "cle": "À prévoir dans la lecture de voie.",
  "depuis": "Mois 5"
 },
 {
  "categorie": "Technique avancée",
  "nom": "Crochet de talon en dévers",
  "comment": "Même geste que le crochet de talon, mais pour garder le corps collé au mur en dévers.",
  "cle": "Toujours sans à-coup.",
  "depuis": "Mois 6"
 },
 {
  "categorie": "Technique avancée",
  "nom": "Déplacement dynamique contrôlé",
  "comment": "Petite poussée de jambes pour atteindre une prise juste hors de portée, pieds qui restent sur le mur.",
  "cle": "Jamais de jeté (les deux mains et les pieds qui lâchent).",
  "depuis": "Mois 6"
 },
 {
  "categorie": "Renforcement",
  "nom": "Planche",
  "comment": "Sur les avant-bras et la pointe des pieds, corps aligné, fesses ni hautes ni basses.",
  "cle": "Arrête si le bas du dos se creuse.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Renforcement",
  "nom": "Planche latérale",
  "comment": "Sur un avant-bras, corps aligné de profil, bassin haut.",
  "cle": "Version facile : genoux au sol.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Renforcement",
  "nom": "Dead bug",
  "comment": "Sur le dos, bras vers le plafond, genoux à 90°. Tends lentement un bras et la jambe opposée sans décoller le bas du dos.",
  "cle": "Le bas du dos reste plaqué au sol.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Renforcement",
  "nom": "Hollow body",
  "comment": "Sur le dos, bas du dos plaqué, épaules et jambes décollées (genoux pliés au début).",
  "cle": "Jambes tendues seulement au mois 4.",
  "depuis": "Semaine 3"
 },
 {
  "categorie": "Renforcement",
  "nom": "Pompes",
  "comment": "Mains sur une table, puis au sol sur les genoux, puis complètes. Corps gainé.",
  "cle": "Pour équilibrer les épaules (antagonistes).",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Renforcement",
  "nom": "Rowing inversé",
  "comment": "Sous une table lourde et stable, mains au bord, tirer la poitrine vers la table. Genoux pliés au début.",
  "cle": "Vérifie la stabilité de la table. Alternative : élastique à une poignée de porte fermée.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Renforcement",
  "nom": "Suspension active",
  "comment": "Suspendu à la barre bras tendus, abaisser et rapprocher les omoplates sans plier les bras.",
  "cle": "Pieds sur une chaise au début. Teste la barre de porte avant.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Renforcement",
  "nom": "Tractions assistées",
  "comment": "Traction lente avec les pieds sur une chaise ou un élastique pour soulager.",
  "cle": "Seulement si la suspension active ne gêne ni coudes ni épaules.",
  "depuis": "Mois 4"
 },
 {
  "categorie": "Renforcement",
  "nom": "Tractions complètes lentes",
  "comment": "Traction sans aide, 2 s montée, 2 s descente.",
  "cle": "Seulement si 3×5 assistées sont faciles et sans douleur.",
  "depuis": "Mois 7"
 },
 {
  "categorie": "Renforcement",
  "nom": "Relevés de genoux suspendu",
  "comment": "Suspendu, monter lentement les genoux vers la poitrine sans balancer.",
  "cle": "Si la barre et les épaules le permettent.",
  "depuis": "Mois 6"
 },
 {
  "categorie": "Renforcement",
  "nom": "Rotations externes à l'élastique",
  "comment": "Coude au corps à 90°, écarter l'avant-bras vers l'extérieur contre l'élastique.",
  "cle": "Protège les épaules. Élastique léger.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Mobilité",
  "nom": "Grenouille",
  "comment": "À quatre pattes, genoux écartés, reculer doucement le bassin.",
  "cle": "Améliore l'ouverture de hanches utile en escalade.",
  "depuis": "Semaine 1"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Adhérence (pied à plat)",
  "comment": "Pose le pied à plat sur le mur ou sur une grosse prise ronde, talon bas, et charge-le franchement. Commence sur une dalle facile.",
  "cle": "La confiance vient en chargeant le pied : un pied timide glisse. Talon bas pour plus de surface de gomme.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Grimpe en dalle",
  "comment": "Voies ou blocs légèrement couchés : poids au-dessus des pieds, bassin éloigné du mur, petits pas.",
  "cle": "Excellent pour l'équilibre et la confiance dans les pieds. Désescalade plutôt que sauter.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Carre intérieure / extérieure",
  "comment": "Sur une prise, choisis volontairement la carre intérieure (gros orteil) ou extérieure (petit orteil) selon la position du corps.",
  "cle": "Carre extérieure = profil, carre intérieure = face au mur. Annonce-toi la carre avant de poser le pied.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Pied haut / pied-main",
  "comment": "Monter le pied très haut, parfois à hauteur de la main, puis transférer le poids dessus en poussant sur la jambe.",
  "cle": "Demande de la souplesse de hanche : travaille la grenouille. Monte sans à-coup.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Rétablissement",
  "comment": "Arriver au-dessus d'une prise en passant d'une traction à un appui paume, puis monter le pied à côté de la main.",
  "cle": "Fréquent en sortie de bloc. Coude et poignet alignés, sans à-coup.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Inversées",
  "comment": "Prise tenue paume vers le haut : monte les pieds haut et tire vers le haut avec le bas du corps éloigné.",
  "cle": "Plus les pieds sont hauts, plus l'inversée est facile.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Plats (aplats)",
  "comment": "Main ouverte sur une prise ronde : bras tendu, corps sous la prise, poids bas.",
  "cle": "Main ouverte = moins de stress pour les poulies. On perd un plat quand le corps est trop haut.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Pinces",
  "comment": "Prise tenue entre le pouce et les doigts : serrer avec toute la main, poignet neutre.",
  "cle": "Commence sur de grosses pinces.",
  "depuis": "Mois 10"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Dülfer (traction latérale)",
  "comment": "Sur une arête ou une prise verticale, tire latéralement avec les mains et pousse avec les pieds en opposition.",
  "cle": "Variante de l'opposition, très utile sur les dièdres et les arêtes.",
  "depuis": "Mois 10"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Gaston",
  "comment": "Prise devant le visage tenue pouce vers le bas : tu pousses vers l'extérieur comme pour ouvrir une porte coulissante.",
  "cle": "Sollicite l'épaule : sans à-coup, et pas si l'épaule est sensible.",
  "depuis": "Mois 12"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Écart en dièdre",
  "comment": "Dans un angle, un pied sur chaque paroi : pousse pour soulager les bras et te reposer.",
  "cle": "Souvent une position de repos cachée.",
  "depuis": "Mois 10"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Traversée basse",
  "comment": "Traverser le mur horizontalement à moins de 1 m du sol, 3 à 5 min sans poser pied à terre.",
  "cle": "Endurance et précision des pieds à faible risque. Changer de sens chaque passage.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Désescalade en voie",
  "comment": "Arrivé en haut d'une voie facile, redescends-la en grimpant au lieu de te faire descendre.",
  "cle": "Double le volume et oblige à regarder les pieds. Prévenir ton assureur.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Mains ouvertes uniquement",
  "comment": "Grimpe une voie facile en tenant toutes les prises main ouverte ou semi-arquée.",
  "cle": "Protège les poulies et habitue les doigts à la position la plus sûre.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Trois façons de faire",
  "comment": "Réussis le même bloc facile de 2 ou 3 façons différentes (autre pied, profil, ordre des mains).",
  "cle": "Enrichit ton répertoire de mouvements.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Grimpe fluide",
  "comment": "Sur une voie facile, ne t'arrête jamais plus de 3 s, sauf sur les repos que tu as choisis.",
  "cle": "Améliore le rythme et l'économie d'effort.",
  "depuis": "Mois 10"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Respiration",
  "comment": "Expire pendant les mouvements difficiles, respire lentement sur les repos.",
  "cle": "Retenir sa respiration crispe les bras.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "À vue (lecture complète)",
  "comment": "Choisis une voie inconnue, lis-la entièrement depuis le sol (mouvements, repos), puis tente-la sans « sec ».",
  "cle": "Mesure ta capacité de lecture. Choisis une voie un niveau sous ton maximum.",
  "depuis": "Mois 10"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Se filmer",
  "comment": "Fais-toi filmer sur une voie ou un bloc, puis regarde : hanches, pieds, bras pliés inutilement.",
  "cle": "Compare avec la vidéo d'un grimpeur plus fort sur la même voie.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Copier un grimpeur plus fort",
  "comment": "Observe la méthode d'un grimpeur expérimenté sur un bloc, puis essaie de la reproduire.",
  "cle": "Demande conseil : la plupart des grimpeurs aiment expliquer.",
  "depuis": "Mois 9"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Point mort (deadpoint)",
  "comment": "Petit mouvement dynamique : tu attrapes la prise au sommet de la trajectoire, quand le corps ne monte plus et ne descend pas encore. Pieds au mur.",
  "cle": "Seulement après 1 an, sur grosses prises, sans à-coup sur un bras tendu.",
  "depuis": "Année 2"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Mousquetonnage efficace (tête)",
  "comment": "Mousquetonne depuis une position stable, bras tendu sur la prise, dégaine à hauteur de taille ou de poitrine.",
  "cle": "Uniquement après un cours de tête. Ne mousquetonne pas bras au-dessus de la tête si tu peux monter un pied avant.",
  "depuis": "Après cours de tête"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Apprentissage de la chute en tête",
  "comment": "Chutes courtes et progressives, encadrées par un moniteur, avec un assureur expérimenté.",
  "cle": "Indispensable pour grimper en tête sereinement. Jamais seul, jamais au-dessus d'un relief.",
  "depuis": "Après cours de tête"
 },
 {
  "categorie": "Technique (après 8 mois)",
  "nom": "Falaise école",
  "comment": "Première sortie en extérieur avec un club ou un guide : lecture du rocher, prises naturelles.",
  "cle": "Le rocher se lit autrement que la résine. Toujours encadré au début.",
  "depuis": "Mois 12"
 }
];

