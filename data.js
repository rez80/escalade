// Fichier généré par escalade.py à partir de Programme.xlsx — ne pas modifier à la main.

const VERSION_PROGRAMME = "13/11/2026 00:35";

const DATE_DEBUT = "2026-11-09";

const PROGRAMME_ID = "2026-11-09";

const PARAMS = {
 "temps_voie": 4,
 "temps_bloc": 1.5,
 "consolide_essais": 5,
 "consolide_taux": 0.7,
 "feu_5c_voies": 10,
 "feu_5c_taux": 0.7,
 "feu_6a_voies": 3,
 "feu_bloc6_taux": 0.8,
 "feu_bloc6_blocs": 15,
 "feu_bloc6_seances": 4,
 "feu_devers": 3,
 "feu_volume_douleur": 2,
 "feu_volume_jours": 28,
 "forme_vert": 4,
 "forme_rouge": 2,
 "forme_douleur": 2,
 "episode_ecart": 7,
 "faible_semaines": 8,
 "faible_essais": 5,
 "charge_hausse": 1.3
};

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
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 1,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Thème de la semaine : pieds silencieux.\n2× Voie en 5a · « Pieds silencieux » · « Regarder le pied jusqu'à la pose » (repos 3 min)\n2× Voie en 5b · « Aucun repositionnement » (repos 4 min)\n3× Voie en 5b en dévers · « Travail au point » · 3 essais max (repos 5 min)\n! Après chaque essai, note la cause d'échec : pieds, placement ou énergie.\n2× Voie facile en 4 ou 5a · montée lente · « Grimpe fluide » (repos 2 min)\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n5× Bloc niveau 4 · « Pieds silencieux » · « Regarder le pied jusqu'à la pose » (repos 2 min)\n4× Bloc niveau 5 · « Aucun repositionnement » (repos 3 min)\n4× Bloc 4 ou 5 en dévers · même méthode que le « Travail au point » : décompose, repose-toi, réessaie [effort] (repos 3 min)\n1× « Traversée basse » · 5 min sans poser pied, pour la continuité [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 1,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi\n! Cette semaine : tests de mobilité de référence (« Tests de mobilité »), à noter dans les mesures de dimanche."
 },
 {
  "semaine": 1,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n5× Bloc niveau 4 · tous réussis, aucune précipitation (repos 2 min)\n6× Essai sur « Projet » : bloc 5 vertical (6 si feu vert) · 6 essais max (repos 4 min)\n! Quand le mouvement devient aléatoire : arrêt du projet.\n2× Bloc dévers facile · montée, « Désescalade », remontée · « Hanches collées » (repos 2 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 1,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 25 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 1,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Thème technique : « Pieds silencieux ».\n5× Bloc niveau 4 · « Pieds silencieux » (repos 2 min)\n4× Bloc niveau 5 · sans pression (repos 3 min)\n2× Bloc difficile · 2 essais puis arrêt [effort] (repos 3 min)\n> Coudes après la séance"
 },
 {
  "semaine": 2,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 2,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Thème de la semaine : regarder chaque pied jusqu'à la pose.\n2× Voie en 5a · « Pieds silencieux » · « Regarder le pied jusqu'à la pose » (repos 3 min)\n2× Voie en 5b · « Aucun repositionnement » (repos 4 min)\n3× Voie en 5b en dévers · « Travail au point » · 3 essais max (repos 5 min)\n! Après chaque essai, note la cause d'échec : pieds, placement ou énergie.\n2× Voie facile en 4 ou 5a · montée lente · « Grimpe fluide » (repos 2 min)\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n5× Bloc niveau 4 · « Pieds silencieux » · « Regarder le pied jusqu'à la pose » (repos 2 min)\n4× Bloc niveau 5 · « Aucun repositionnement » (repos 3 min)\n4× Bloc 4 ou 5 en dévers · même méthode que le « Travail au point » : décompose, repose-toi, réessaie [effort] (repos 3 min)\n1× « Traversée basse » · 5 min sans poser pied, pour la continuité [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 2,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi"
 },
 {
  "semaine": 2,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n5× Bloc niveau 4 · tous réussis, aucune précipitation (repos 2 min)\n6× Essai sur « Projet » : bloc 5 vertical (6 si feu vert) · 6 essais max (repos 4 min)\n! Quand le mouvement devient aléatoire : arrêt du projet.\n2× Bloc dévers facile · montée, « Désescalade », remontée · « Hanches collées » (repos 2 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 2,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 25 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 2,
  "phase": "B1 · S1-2 Consolider le 5b",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Thème technique : « Bras tendus ».\n5× Bloc niveau 4 · « Bras tendus » (repos 2 min)\n4× Bloc niveau 5 · sans pression (repos 3 min)\n2× Bloc difficile · 2 essais puis arrêt [effort] (repos 3 min)\n> Coudes après la séance"
 },
 {
  "semaine": 3,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 3,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Objectif : le dévers. Bassin collé au mur, bras tendus.\n3× Voie en 5a en dévers · « Hanches collées » (repos 3 min)\n2× Voie en 5b en dévers · « Profil alterné » (repos 4 min)\n3× Essai sur « Projet » : voie 5b en dévers (5c si feu vert) · 3 essais max (repos 10 min)\n1× Voie facile en 4 · « Grimpe fluide » [facile]\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n! Objectif : le dévers. Bassin collé au mur, bras tendus.\n4× Bloc niveau 4 en dévers · « Hanches collées » · « Profil alterné » (repos 2 min)\n5× Essai sur « Projet » : bloc 5 en dévers · 5 essais max (repos 4 min)\n2× « Traversée dévers aller-retour » (repos 3 min)\n> Coudes après la séance"
 },
 {
  "semaine": 3,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi"
 },
 {
  "semaine": 3,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n4× Bloc niveau 4 (repos 2 min)\n5× Essai sur « Projet » : bloc 5 en dévers · 5 essais max (repos 4 min)\n3× Essai sur « Projet » : bloc 5 vertical (6 si feu vert) (repos 4 min)\n2× « Traversée dévers aller-retour » (repos 3 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 3,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 25 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 3,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Thème : lecture. Avant chaque bloc, annonce mains, pieds et positions de repos.\n6× Bloc niveau 4 · « Lecture à voix haute » (repos 2 min)\n4× Bloc niveau 5 · « Les trois prises » (repos 3 min)\n> Coudes après la séance"
 },
 {
  "semaine": 4,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 4,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Objectif : le dévers. Bassin collé au mur, bras tendus.\n3× Voie en 5a en dévers · « Hanches collées » (repos 3 min)\n2× Voie en 5b en dévers · « Profil alterné » (repos 4 min)\n3× Essai sur « Projet » : voie 5b en dévers (5c si feu vert) · 3 essais max (repos 10 min)\n1× Voie facile en 4 · « Grimpe fluide » [facile]\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n! Objectif : le dévers. Bassin collé au mur, bras tendus.\n4× Bloc niveau 4 en dévers · « Hanches collées » · « Profil alterné » (repos 2 min)\n5× Essai sur « Projet » : bloc 5 en dévers · 5 essais max (repos 4 min)\n2× « Traversée dévers aller-retour » (repos 3 min)\n> Coudes après la séance"
 },
 {
  "semaine": 4,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi"
 },
 {
  "semaine": 4,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n4× Bloc niveau 4 (repos 2 min)\n5× Essai sur « Projet » : bloc 5 en dévers · 5 essais max (repos 4 min)\n3× Essai sur « Projet » : bloc 5 vertical (6 si feu vert) (repos 4 min)\n2× « Traversée dévers aller-retour » (repos 3 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 4,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 25 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 4,
  "phase": "B1 · S3-4 Dévers",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Thème : lecture. Avant chaque bloc, annonce mains, pieds et positions de repos.\n6× Bloc niveau 4 · « Lecture à voix haute » (repos 2 min)\n4× Bloc niveau 5 · « Les trois prises » (repos 3 min)\n> Coudes après la séance"
 },
 {
  "semaine": 5,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 5,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Objectif : endurance spécifique. Accumuler de la fatigue sans s'épuiser.\n! Circuit : enchaîne les 4 voies avec seulement le temps de t'encorder entre elles (environ 2 minutes).\n1× « Circuit » de 4 voies : 5a, 5b, 5a, 5b [effort] (repos 5 min)\n1× Voie en 5b (5c si feu vert) · « Repos bras tendu » [effort] (repos 5 min)\n! Pendant la voie, cherche des positions de repos debout.\n1× Voie facile en 4 · « Grimpe fluide » [facile]\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n! Objectif : endurance. Enchaîne les blocs d'un circuit sans pause.\n3× « Circuit » de 4 blocs faciles, niveau 3 ou 4 [effort] (repos 4 min)\n1× « ARC » · 10 min en continu, intensité 4/10 [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 5,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi"
 },
 {
  "semaine": 5,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n4× Bloc niveau 4 (repos 2 min)\n4× Bloc niveau 5 (repos 3 min)\n6× Essai sur « Projet » : bloc 5 en dévers, ou bloc 6 si feu vert · 6 essais max (repos 4 min)\n2× « Traversée dévers aller-retour » (repos 3 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 5,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 30 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 5,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Volume sans chercher la performance (« Volume »).\n7× Bloc niveau 4 · « Aucun repositionnement » (repos 2 min)\n4× Bloc niveau 5 (repos 3 min)\n1× « ARC » · 10 min en continu, intensité 4/10 [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 6,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 6,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Objectif : endurance spécifique. Accumuler de la fatigue sans s'épuiser.\n! Circuit : enchaîne les 4 voies avec seulement le temps de t'encorder entre elles (environ 2 minutes).\n1× « Circuit » de 4 voies : 5a, 5b, 5a, 5b [effort] (repos 5 min)\n1× Voie en 5b (5c si feu vert) · « Repos bras tendu » [effort] (repos 5 min)\n! Pendant la voie, cherche des positions de repos debout.\n1× Voie facile en 4 · « Grimpe fluide » [facile]\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n! Objectif : endurance. Enchaîne les blocs d'un circuit sans pause.\n3× « Circuit » de 4 blocs faciles, niveau 3 ou 4 [effort] (repos 4 min)\n1× « ARC » · 10 min en continu, intensité 4/10 [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 6,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi"
 },
 {
  "semaine": 6,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n4× Bloc niveau 4 (repos 2 min)\n4× Bloc niveau 5 (repos 3 min)\n6× Essai sur « Projet » : bloc 5 en dévers, ou bloc 6 si feu vert · 6 essais max (repos 4 min)\n2× « Traversée dévers aller-retour » (repos 3 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 6,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 30 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 6,
  "phase": "B1 · S5-6 Endurance",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Volume sans chercher la performance (« Volume »).\n7× Bloc niveau 4 · « Aucun repositionnement » (repos 2 min)\n4× Bloc niveau 5 (repos 3 min)\n1× « ARC » · 10 min en continu, intensité 4/10 [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 7,
  "phase": "B1 · S7 Réalisation",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 45 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 7,
  "phase": "B1 · S7 Réalisation",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Objectif : réalisation. Teste tes meilleures voies, frais.\n2× Voie en 5b · proprement (repos 5 min)\n4× « Essai d'enchaînement » : voie 5c (6a si feu vert) · 4 essais max (repos 10 min)\n1× Voie facile en 4 · « Grimpe fluide » [facile]\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n! Objectif : réalisation. Tes meilleurs blocs, frais.\n4× Bloc niveau 5 · proprement (repos 3 min)\n6× Essai sur « Projet » : ton meilleur niveau · 6 essais max (repos 4 min)\n> Coudes après la séance"
 },
 {
  "semaine": 7,
  "phase": "B1 · S7 Réalisation",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi"
 },
 {
  "semaine": 7,
  "phase": "B1 · S7 Réalisation",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n4× Bloc niveau 4 (repos 2 min)\n8× Essai sur « Projet » : ton meilleur niveau, proprement (6 si feu vert) · 8 essais max (repos 4 min)\n! Les projets s'arrêtent dès que le mouvement devient aléatoire.\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 7,
  "phase": "B1 · S7 Réalisation",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 30 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 7,
  "phase": "B1 · S7 Réalisation",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Très léger : aucune fatigue.\n5× Bloc niveau 3 ou 4 · plaisir (repos 2 min)\n> Coudes après la séance"
 },
 {
  "semaine": 8,
  "phase": "B1 · S8 Décharge",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course · « Allure conversation » · « Foulée courte et légère »\n! Tu dois pouvoir parler en phrases complètes. Essoufflé : ralentis ou marche.\n> Course · après"
 },
 {
  "semaine": 8,
  "phase": "B1 · S8 Décharge",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "## Voie (avec partenaire)\n> Échauffement voie\n> Vérifications croisées\n! Semaine d'allègement (« Séance allégée ») : volume divisé par deux, pas de 5c, pas de projet.\n3× Voie en 4 ou 5a · « Grimpe fluide » (repos 3 min)\n1× Voie en 5b déjà réussie, proprement (repos 5 min)\n> Coudes après la séance\n## Remplacement bloc (pas de partenaire)\n> Échauffement bloc\n! Pas de partenaire : séance en bloc avec le même objectif que la voie de la semaine.\n! Semaine d'allègement : blocs faciles uniquement, aucun projet.\n6× Bloc niveau 3 ou 4 (repos 2 min)\n1× « Traversée basse » · 3 min sans poser pied [facile]\n> Coudes après la séance"
 },
 {
  "semaine": 8,
  "phase": "B1 · S8 Décharge",
  "jour": "Jeudi",
  "activite": "Maison",
  "contenu": "> Routine du jeudi\n! Semaine d'allègement : la routine reste la même, elle fait partie de la récupération."
 },
 {
  "semaine": 8,
  "phase": "B1 · S8 Décharge",
  "jour": "Vendredi",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Semaine d'allègement : blocs 4 et 5 faciles uniquement, aucun projet.\n6× Bloc niveau 4 (repos 2 min)\n3× Bloc niveau 5 facile (repos 3 min)\n1× « Traversée basse » · 3 min sans poser pied · retour au calme [facile]\n> Pieds après le vendredi\n> Coudes après la séance"
 },
 {
  "semaine": 8,
  "phase": "B1 · S8 Décharge",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "! Séance facultative : footing très facile ou randonnée, selon l'envie.\n1× 30 min de course très facile · « Allure conversation »\n> Course · après"
 },
 {
  "semaine": 8,
  "phase": "B1 · S8 Décharge",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement bloc\n! Séance plaisir : aucune tentative maximale. Cette séance protège les doigts.\n! Semaine d'allègement : plaisir uniquement.\n6× Bloc niveau 3 ou 4 (repos 2 min)\n> Coudes après la séance"
 }
];

const ROUTINES = [
 {
  "routine": "Échauffement salle A (classique)",
  "etape": "1. Mise en température",
  "duree": "3 min",
  "quoi": "Marche rapide, montées de genoux, petits sautillements sur place sans impact."
 },
 {
  "routine": "Échauffement salle A (classique)",
  "etape": "2. Mobilisation",
  "duree": "5 min",
  "quoi": "10 cercles de poignets dans chaque sens, 10 ouvertures/fermetures de mains, 10 cercles de bras lents avant et arrière, 10 rotations de bassin, 10 balancers de jambes de chaque côté."
 },
 {
  "routine": "Échauffement salle A (classique)",
  "etape": "3. Épaules",
  "duree": "2 min",
  "quoi": "10 rotations externes à l'élastique léger, sinon 10 « Y » bras levés en serrant les omoplates."
 },
 {
  "routine": "Échauffement salle A (classique)",
  "etape": "4. Grimpe progressive",
  "duree": "10 min",
  "quoi": "Voie : la 3 et une 4, grimpées lentement, mains ouvertes. Bloc : 6 à 8 blocs de niveau 2-3, puis 2 blocs de niveau 4."
 },
 {
  "routine": "Échauffement salle B (traversée)",
  "etape": "1. Mise en température",
  "duree": "3 min",
  "quoi": "Marche rapide, montées de genoux, petits sautillements sur place sans impact."
 },
 {
  "routine": "Échauffement salle B (traversée)",
  "etape": "2. Mobilisation",
  "duree": "5 min",
  "quoi": "10 cercles de poignets dans chaque sens, 10 ouvertures/fermetures de mains, 10 cercles de bras lents avant et arrière, 10 rotations de bassin, 10 balancers de jambes de chaque côté."
 },
 {
  "routine": "Échauffement salle B (traversée)",
  "etape": "3. Épaules",
  "duree": "2 min",
  "quoi": "10 rotations externes à l'élastique léger, sinon 10 « Y » bras levés en serrant les omoplates."
 },
 {
  "routine": "Échauffement salle B (traversée)",
  "etape": "4. Traversée basse",
  "duree": "10 min",
  "quoi": "2 × 3 min de traversée très facile près du sol, 2 min de repos entre les deux, mains ouvertes, pieds précis. Puis 1 voie ou 2 blocs très faciles."
 },
 {
  "routine": "Échauffement salle C (hanches)",
  "etape": "1. Mise en température",
  "duree": "3 min",
  "quoi": "Marche rapide, montées de genoux, petits sautillements sur place sans impact."
 },
 {
  "routine": "Échauffement salle C (hanches)",
  "etape": "2. Mobilisation des hanches",
  "duree": "6 min",
  "quoi": "90/90 des hanches (5 bascules de chaque côté), fente basse 30 s par côté, grenouille 30 s, puis 10 cercles de bras et de poignets."
 },
 {
  "routine": "Échauffement salle C (hanches)",
  "etape": "3. Épaules",
  "duree": "2 min",
  "quoi": "10 rotations externes à l'élastique léger, sinon 10 « Y » bras levés en serrant les omoplates."
 },
 {
  "routine": "Échauffement salle C (hanches)",
  "etape": "4. Montée et désescalade",
  "duree": "9 min",
  "quoi": "3 à 4 blocs (ou 1 voie) très faciles, montés puis désescaladés lentement."
 },
 {
  "routine": "Vérifications croisées",
  "etape": "1. Baudrier",
  "duree": "—",
  "quoi": "Bien ajusté, boucles et sangles vérifiées, rien de vrillé."
 },
 {
  "routine": "Vérifications croisées",
  "etape": "2. Nœud",
  "duree": "—",
  "quoi": "Huit tressé complet, passé dans les deux points d'encordement, queue suffisante."
 },
 {
  "routine": "Vérifications croisées",
  "etape": "3. Système d'assurage",
  "duree": "—",
  "quoi": "Corde montée dans le bon sens, mousqueton à vis verrouillé, test de blocage."
 },
 {
  "routine": "Vérifications croisées",
  "etape": "4. Corde",
  "duree": "—",
  "quoi": "Nœud en bout de corde, corde assez longue pour redescendre, pas de nœuds."
 },
 {
  "routine": "Vérifications croisées",
  "etape": "5. Communication",
  "duree": "—",
  "quoi": "Se mettre d'accord sur les mots (« sec », « avale », « du mou ») avant de partir."
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
  "routine": "Échauffement maison",
  "etape": "Échauffement",
  "duree": "4 min",
  "quoi": "Cercles de poignets, d'épaules et de bassin, puis 20 « Y » bras levés en serrant les omoplates."
 },
 {
  "routine": "Mobilité",
  "etape": "Étirements de fin",
  "duree": "3 min",
  "quoi": "Grenouille, fente basse, étirement des pectoraux contre un mur. Sans forcer."
 },
 {
  "routine": "Course · avant",
  "etape": "Marche",
  "duree": "5 min",
  "quoi": "Marche rapide pour monter en température."
 },
 {
  "routine": "Course · pendant",
  "etape": "Allure",
  "duree": "—",
  "quoi": "Allure conversation : tu dois pouvoir parler en phrases complètes. Sinon, ralentis ou marche. Terrain plat et souple de préférence."
 },
 {
  "routine": "Course · après",
  "etape": "Retour au calme",
  "duree": "5 min + étirements",
  "quoi": "Marche, puis étirements doux des mollets, quadriceps et ischio-jambiers."
 },
 {
  "routine": "Gainage express",
  "etape": "1. Planche",
  "duree": "1 min",
  "quoi": "2 × 30 s, 15 s de repos entre les deux. Corps aligné, bas du dos neutre."
 },
 {
  "routine": "Gainage express",
  "etape": "2. Dead bug",
  "duree": "2 min",
  "quoi": "2 × 6 par côté, lentement, bas du dos plaqué au sol."
 },
 {
  "routine": "Gainage express",
  "etape": "3. Planche latérale",
  "duree": "1 min",
  "quoi": "20 s par côté, bassin haut (genoux au sol si besoin)."
 },
 {
  "routine": "Contrôle des doigts",
  "etape": "1. Poing fermé",
  "duree": "—",
  "quoi": "Ferme le poing complètement et serre 3 secondes, une main puis l'autre."
 },
 {
  "routine": "Contrôle des doigts",
  "etape": "2. Main ouverte",
  "duree": "—",
  "quoi": "Ouvre la main, doigts tendus, puis pousse-les doucement en arrière avec l'autre main."
 },
 {
  "routine": "Contrôle des doigts",
  "etape": "3. Verdict",
  "duree": "—",
  "quoi": "Aucune gêne : feu vert. Petite douleur localisée : pas de projet aujourd'hui, volume et technique seulement. Douleur nette : pas d'escalade dure."
 },
 {
  "routine": "Échauffement voie",
  "etape": "1. Mobilité articulaire",
  "duree": "5 min",
  "quoi": "Rotations des épaules × 20, des poignets × 20, des chevilles × 20, sans forcer."
 },
 {
  "routine": "Échauffement voie",
  "etape": "2. Voie en 3",
  "duree": "4 min",
  "quoi": "Montée lente et calme, en respirant. Puis 2 min de repos."
 },
 {
  "routine": "Échauffement voie",
  "etape": "3. Voie en 4",
  "duree": "5 min",
  "quoi": "Toujours facile, pieds précis. Puis 2 min de repos."
 },
 {
  "routine": "Échauffement voie",
  "etape": "4. Voie en 5a",
  "duree": "6 min",
  "quoi": "Fluide, sans forcer. Tu dois finir frais."
 },
 {
  "routine": "Échauffement bloc",
  "etape": "1. Mobilité articulaire",
  "duree": "5 min",
  "quoi": "Rotations des épaules × 20, des poignets × 20, des chevilles × 20, sans forcer."
 },
 {
  "routine": "Échauffement bloc",
  "etape": "2. Deux blocs niveau 3",
  "duree": "7 min",
  "quoi": "Montée et désescalade, en douceur."
 },
 {
  "routine": "Échauffement bloc",
  "etape": "3. Deux blocs niveau 4",
  "duree": "8 min",
  "quoi": "Pieds précis, aucune précipitation."
 },
 {
  "routine": "Coudes après la séance",
  "etape": "1. Extensions des doigts",
  "duree": "2 min",
  "quoi": "Élastique autour des doigts : 3 × 20 ouvertures lentes."
 },
 {
  "routine": "Coudes après la séance",
  "etape": "2. Extension du poignet",
  "duree": "2 min",
  "quoi": "Haltère de 2 à 4 kg, avant-bras posé, paume vers le bas : 2 × 15 lentes."
 },
 {
  "routine": "Coudes après la séance",
  "etape": "3. Flexion du poignet",
  "duree": "1 min",
  "quoi": "Même position, paume vers le haut : 2 × 15 lentes."
 },
 {
  "routine": "Pieds après le vendredi",
  "etape": "1. Étirement des mollets",
  "duree": "2 min",
  "quoi": "Mains au mur, jambe tendue derrière, talon au sol : 2 × 45 s par côté."
 },
 {
  "routine": "Pieds après le vendredi",
  "etape": "2. Mobilisation des orteils",
  "duree": "1 min",
  "quoi": "Écarte, plie et étire les orteils, pieds nus."
 },
 {
  "routine": "Pieds après le vendredi",
  "etape": "3. Balle sous la voûte plantaire",
  "duree": "2 min",
  "quoi": "Fais rouler une balle de tennis sous chaque pied, 1 min par pied."
 },
 {
  "routine": "Routine du jeudi",
  "etape": "1. Rotation externe à l'élastique",
  "duree": "3 min",
  "quoi": "Coude au corps, plié à 90° : 3 × 15 lentes."
 },
 {
  "routine": "Routine du jeudi",
  "etape": "2. Face pull",
  "duree": "3 min",
  "quoi": "Élastique à hauteur de visage, tire vers le front en écartant les coudes : 3 × 15."
 },
 {
  "routine": "Routine du jeudi",
  "etape": "3. Poignets",
  "duree": "3 min",
  "quoi": "Extension puis flexion du poignet avec l'haltère : 2 × 15 chacune."
 },
 {
  "routine": "Routine du jeudi",
  "etape": "4. 90/90 des hanches",
  "duree": "4 min",
  "quoi": "2 min par côté, dos droit."
 },
 {
  "routine": "Routine du jeudi",
  "etape": "5. Couch stretch",
  "duree": "2 min",
  "quoi": "Genou contre un mur derrière toi, 1 min par côté."
 },
 {
  "routine": "Routine du jeudi",
  "etape": "6. Genou contre le mur",
  "duree": "2 min",
  "quoi": "2 × 10 par côté, talon au sol."
 }
];

const EXERCICES = [
 {
  "categorie": "Pieds",
  "nom": "Pieds silencieux",
  "comment": "Regarde la prise de pied avant de bouger le pied.\nApproche le pied lentement, la pointe vers la prise.\nPose-le sans aucun bruit, puis charge-le progressivement.\nSi tu entends un « tac », recommence ce mouvement plus lentement.",
  "cle": "Aucun risque particulier : c'est un exercice de précision.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Poser les pieds avec précision, pour qu'ils tiennent du premier coup.",
  "erreurs": "Regarder la prise de main suivante au lieu du pied ; poser le pied en le traînant contre le mur.",
  "facile": "Sur une voie ou un bloc très facile, un seul pied à la fois en t'arrêtant après chaque pose."
 },
 {
  "categorie": "Pieds",
  "nom": "Regarder le pied jusqu'à la pose",
  "comment": "Avant chaque mouvement de pied, fixe la prise visée.\nGarde les yeux dessus jusqu'à ce que le pied soit posé et chargé.\nSeulement ensuite, lève les yeux vers la prise de main suivante.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Ne plus rater ses pieds en grimpant trop vite.",
  "erreurs": "Lever les yeux trop tôt, dès que le pied « touche » la prise.",
  "facile": "Annonce à voix basse « pied » au moment où il est posé, avant de chercher la main."
 },
 {
  "categorie": "Pieds",
  "nom": "Pieds collés",
  "comment": "Choisis ta prise de pied et l'endroit exact où poser le chausson.\nPose le pied.\nInterdiction de le réajuster ensuite : tu grimpes avec ce placement.\nSi le placement était mauvais, note-le et fais mieux au mouvement suivant.",
  "cle": "Sur des voies faciles uniquement : un pied mal placé peut glisser.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Placer chaque pied correctement du premier coup.",
  "erreurs": "Tricher en glissant le pied après la pose.",
  "facile": "Autorise un seul réajustement par pied au début."
 },
 {
  "categorie": "Pieds",
  "nom": "Pied qui plane",
  "comment": "Décolle le pied et amène-le au-dessus de la prise visée.\nGarde-le 2 secondes en l'air, juste au-dessus, sans toucher.\nPose-le sans bruit et charge-le.",
  "cle": "Si tu n'arrives pas à tenir, rapproche les hanches du mur plutôt que de serrer les mains.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Gagner en équilibre en apprenant à tenir sur une seule jambe.",
  "erreurs": "Se tirer sur les bras pour tenir les 2 secondes : c'est le corps qui doit être bien placé.",
  "facile": "1 seconde au lieu de 2, sur des prises de pied larges."
 },
 {
  "categorie": "Pieds",
  "nom": "Pieds imposés",
  "comment": "Repère la couleur de la voie ou du bloc.\nN'utilise que les prises de pied de cette couleur.\nAvant chaque mouvement, cherche d'abord où ira le pied.",
  "cle": "Choisis une voie ou un bloc nettement sous ton niveau.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Apprendre à chercher et viser de petites prises de pied, comme dans les voies plus dures.",
  "erreurs": "Prendre une prise d'une autre couleur « sans faire exprès ».",
  "facile": "Autorise les prises de pied d'une autre couleur seulement si elles sont très proches."
 },
 {
  "categorie": "Pieds",
  "nom": "Adhérence (pied à plat)",
  "comment": "Choisis un endroit lisse du mur, sur une dalle facile.\nPose le pied à plat, talon bas, avec le plus de gomme possible contre le mur.\nPousse franchement sur ce pied en gardant le corps éloigné du mur.\nMonte l'autre pied ou la main pendant que le pied tient.",
  "cle": "Sur dalle facile et près du sol au début.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Tenir sur un pied sans prise, grâce au frottement du chausson.",
  "erreurs": "Rester timide sur le pied : un pied peu chargé glisse.",
  "facile": "Commence avec les mains sur de bonnes prises, pour tester le pied sans risque."
 },
 {
  "categorie": "Pieds",
  "nom": "Carre intérieure / extérieure",
  "comment": "Face au mur, pose le pied sur la carre intérieure (côté gros orteil).\nDe profil, hanche contre le mur, pose-le sur la carre extérieure (côté petit orteil).\nAvant de poser le pied, dis-toi « intérieur » ou « extérieur ».",
  "cle": "Aucun risque particulier.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Choisir le bon côté du chausson selon la position du corps.",
  "erreurs": "Toujours poser la pointe au milieu, quelle que soit la position.",
  "facile": "Commence par la carre intérieure seule pendant une séance, puis l'extérieure."
 },
 {
  "categorie": "Pieds",
  "nom": "Pied haut / pied-main",
  "comment": "Monte le pied très haut, parfois jusqu'à la hauteur de la main.\nPlace la hanche au-dessus de ce pied.\nPousse sur la jambe pour te lever, sans à-coup.",
  "cle": "Demande de la souplesse de hanche : échauffe les hanches avant, et monte en douceur.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Monter très haut le pied pour éviter de tirer sur les bras.",
  "erreurs": "Tirer sur les bras au lieu de pousser sur la jambe.",
  "facile": "Pied moins haut, à hauteur de hanche seulement."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Bras tendus",
  "comment": "Tiens les prises bras tendus, comme suspendu.\nPlie les jambes pour descendre le bassin, puis pousse sur les jambes pour monter.\nNe plie les bras qu'au dernier moment, pour attraper la prise suivante.",
  "cle": "Bras tendus ne veut pas dire épaules relâchées : garde les omoplates légèrement basses.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Économiser les bras : le poids repose sur le squelette, pas sur les biceps.",
  "erreurs": "Grimper bras pliés « en traction » : les avant-bras durcissent vite.",
  "facile": "Sur une voie très facile, compte les fois où tes bras se plient et essaie d'en faire moins."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Main qui plane",
  "comment": "Avant de saisir une prise, garde la main 2 secondes juste au-dessus.\nSi tu tiens sans difficulté, ton corps est bien placé : prends la prise.\nSi tu bascules, replace les pieds ou les hanches, puis réessaie.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Vérifier que ton équilibre vient des pieds et des hanches, pas des bras.",
  "erreurs": "Plaquer la main sur le mur pour tenir les 2 secondes.",
  "facile": "Sur dalle ou mur vertical facile uniquement."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Grimpe au ralenti",
  "comment": "Choisis une voie ou un bloc facile.\nGrimpe-le deux fois plus lentement que d'habitude.\nMarque une petite pause à chaque nouvelle position avant de bouger.",
  "cle": "Plus lent signifie plus long : choisis bien plus facile que ton niveau.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Trouver l'équilibre à chaque position au lieu de « passer en force ».",
  "erreurs": "Accélérer dans les passages un peu plus durs.",
  "facile": "Ralentis seulement sur la moitié de la voie."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Silence total",
  "comment": "Grimpe sans aucun bruit : ni les pieds ni les mains ne claquent les prises.\nPose chaque main doucement, puis serre.\nRecommence un mouvement s'il a fait du bruit.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Contrôler chaque mouvement jusqu'au bout.",
  "erreurs": "Faire attention aux pieds seulement, et oublier les mains.",
  "facile": "Silence des pieds seulement, puis ajoute les mains."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Trois points d'appui",
  "comment": "Garde toujours trois appuis (deux pieds et une main, ou deux mains et un pied).\nNe bouge qu'un seul membre à la fois.\nAttends d'être stable avant de bouger le suivant.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Grimper calme et stable, en économisant l'énergie.",
  "erreurs": "Bouger une main et un pied en même temps.",
  "facile": "Fais-le seulement sur la première moitié de la voie."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Arrêt sur image",
  "comment": "Au milieu d'un mouvement, arrête-toi 3 secondes.\nSens si tu tiens facilement ou si tu forces.\nSi tu forces, corrige la position (pieds, hanches) et refais le mouvement.",
  "cle": "Arrête l'exercice si les avant-bras durcissent.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Trouver les positions instables, celles qui fatiguent.",
  "erreurs": "Choisir le moment de l'arrêt là où c'est confortable.",
  "facile": "Arrêt de 1 seconde."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Mains ouvertes uniquement",
  "comment": "Sur une voie facile, tiens chaque prise main ouverte ou semi-arquée.\nN'arque jamais complètement les doigts (pouce par-dessus l'index).\nSi une prise ne tient pas main ouverte, passe-la ou change de voie.",
  "cle": "C'est un exercice de prévention : il protège les poulies des doigts.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Habituer les doigts à la position la plus sûre pour les poulies.",
  "erreurs": "Arquer « juste un peu » sur une petite prise.",
  "facile": "Choisis une voie à grosses prises."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Respiration",
  "comment": "Expire pendant les mouvements difficiles.\nSur une bonne prise, respire lentement 2 ou 3 fois avant de repartir.\nSi tu t'aperçois que tu bloques ta respiration, souffle tout l'air.",
  "cle": "Aucun risque particulier.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Ne plus se crisper en retenant sa respiration.",
  "erreurs": "Retenir son souffle dans le passage dur.",
  "facile": "Expire seulement sur les 3 mouvements les plus durs."
 },
 {
  "categorie": "Corps et équilibre",
  "nom": "Grimpe en dalle",
  "comment": "Choisis une voie ou un bloc sur un mur légèrement couché.\nGarde le poids au-dessus des pieds et le bassin éloigné du mur.\nFais de petits pas et pousse sur les jambes.",
  "cle": "Désescalade plutôt que sauter : les chutes en dalle frottent le mur.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Travailler l'équilibre et la confiance dans les pieds.",
  "erreurs": "Coller le ventre au mur : les pieds glissent.",
  "facile": "Une dalle très facile, avec de grosses prises de pied."
 },
 {
  "categorie": "Dévers",
  "nom": "Hanches collées",
  "comment": "À chaque mouvement en dévers, vérifie que ta hanche touche presque le mur.\nSi ta poitrine est face au mur et tes fesses en arrière, rapproche le bassin.\nPousse avec les pieds pour garder le bassin proche.",
  "cle": "Arrête dès que les avant-bras sont durs.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Économiser les bras en dévers en gardant le bassin près du mur.",
  "erreurs": "Rester les fesses en arrière : tout le poids passe dans les bras.",
  "facile": "Dévers léger, sur de grosses prises."
 },
 {
  "categorie": "Dévers",
  "nom": "Profil alterné",
  "comment": "Pour attraper une prise avec la main droite, tourne la hanche droite contre le mur.\nPose le pied droit sur sa carre extérieure.\nTends le bras droit vers la prise, en restant bras gauche tendu.\nPour la main gauche, fais l'inverse.",
  "cle": "Mouvement contrôlé, sans à-coup sur l'épaule.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Le geste de base du dévers : tourner la hanche pour gagner de l'allonge.",
  "erreurs": "Tourner les épaules mais pas les hanches.",
  "facile": "Sur un mur vertical d'abord, puis en léger dévers."
 },
 {
  "categorie": "Dévers",
  "nom": "Drop knee",
  "comment": "Pose le pied sur une prise, carre extérieure.\nTourne lentement le genou vers le bas et vers l'intérieur.\nLa hanche se colle au mur : tends le bras vers la prise.\nRessors de la position doucement.",
  "cle": "Ressors immédiatement à la moindre gêne ou torsion du genou.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Une version plus marquée du profil, pour aller loin sans les bras.",
  "erreurs": "Forcer la rotation du genou.",
  "facile": "Une petite rotation seulement, sans descendre le genou complètement."
 },
 {
  "categorie": "Dévers",
  "nom": "Pieds qui tirent",
  "comment": "Pose le pied sur la prise.\nEn plus de pousser vers le bas, tire la prise vers toi avec les orteils.\nSens le bassin se rapprocher du mur.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 5",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 5,
  "but": "Garder le bassin près du mur en dévers grâce aux pieds.",
  "erreurs": "Seulement poser le pied, sans action.",
  "facile": "Sur de grosses prises de pied, en léger dévers."
 },
 {
  "categorie": "Dévers",
  "nom": "Ne jamais lâcher les pieds",
  "comment": "Sur un bloc facile en dévers, les pieds ne quittent jamais le mur sans que tu le décides.\nSi un pied part, note où, puis recommence en serrant le ventre.",
  "cle": "Si les pieds partent souvent, c'est trop dur : prends plus facile.",
  "depuis": "Semaine 5",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 5,
  "but": "Garder le gainage en dévers.",
  "erreurs": "Accepter que les pieds partent « parce que c'est du dévers ».",
  "facile": "Dévers léger et très grosses prises de pied."
 },
 {
  "categorie": "Dévers",
  "nom": "Crochet de pointe",
  "comment": "Passe le dessus du chausson sous une prise.\nTire légèrement avec le pied pour te stabiliser.\nBouge la main pendant que le crochet tient.",
  "cle": "Toujours en douceur, jamais en force.",
  "depuis": "Semaine 5",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 5,
  "but": "Empêcher le corps de pivoter en dévers.",
  "erreurs": "Tirer très fort sur le crochet.",
  "facile": "Un crochet sur une grosse prise, près du sol."
 },
 {
  "categorie": "Dévers",
  "nom": "Crochet de talon",
  "comment": "Pose le talon sur une prise, au niveau des hanches ou plus haut.\nPlie la jambe pour tirer le corps vers la prise.\nBouge la main pendant que le talon tient.",
  "cle": "En douceur, sans forcer sur le genou ni l'arrière de la cuisse.",
  "depuis": "Mois 3",
  "discipline": "Voie et bloc",
  "niveau": "Intermédiaire",
  "semaine": 10,
  "but": "Utiliser la jambe comme un troisième bras pour rapprocher le corps.",
  "erreurs": "Tirer d'un coup sec avec l'arrière de la cuisse.",
  "facile": "Talon sur une grosse prise basse."
 },
 {
  "categorie": "Dévers",
  "nom": "Crochet de talon en dévers",
  "comment": "En dévers, pose le talon sur une prise à côté des mains ou au-dessus des hanches.\nTire avec le talon pour garder le corps près du mur.\nAvance la main.",
  "cle": "Toujours sans à-coup ; arrête à la moindre gêne au genou.",
  "depuis": "Mois 6",
  "discipline": "Voie et bloc",
  "niveau": "Intermédiaire",
  "semaine": 23,
  "but": "Rester collé au mur en dévers grâce au talon.",
  "erreurs": "S'en servir avant de maîtriser le crochet de talon sur le vertical.",
  "facile": "Le faire d'abord en léger dévers."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Changement de pied",
  "comment": "Pose le second pied juste au-dessus du premier, sur la même prise.\nLibère la place en glissant le premier pied vers l'extérieur.\nPose le second pied à sa place.",
  "cle": "Mouvement contrôlé, mains solides.",
  "depuis": "Mois 4",
  "discipline": "Voie et bloc",
  "niveau": "Intermédiaire",
  "semaine": 14,
  "but": "Libérer une prise de pied pour y mettre l'autre pied.",
  "erreurs": "Sauter brusquement d'un pied sur l'autre.",
  "facile": "Sur une très grosse prise, mains bien tenues."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Opposition",
  "comment": "Trouve deux appuis qui se font face (main et pied, ou deux pieds).\nPousse sur l'un, tire ou pousse sur l'autre dans le sens opposé.\nGarde la tension pour rester en place.",
  "cle": "Aucun risque particulier.",
  "depuis": "Mois 4",
  "discipline": "Voie et bloc",
  "niveau": "Intermédiaire",
  "semaine": 14,
  "but": "Tenir une position sans bonne prise, en poussant d'un côté et tirant de l'autre.",
  "erreurs": "Relâcher la poussée en bougeant.",
  "facile": "Dans un angle (dièdre), avec les pieds."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Inversées",
  "comment": "Prends la prise paume vers le haut.\nMonte les pieds haut.\nTire vers le haut en éloignant un peu le bas du corps.",
  "cle": "Sans à-coup sur le biceps.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Tenir une prise tournée vers le bas.",
  "erreurs": "Garder les pieds bas : l'inversée ne tient pas.",
  "facile": "Une grosse inversée près d'une bonne prise de pied."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Plats (aplats)",
  "comment": "Pose la main ouverte sur la prise.\nGarde le bras tendu et le corps sous la prise.\nReste bas : un plat tient mieux quand on pèse en dessous.",
  "cle": "Main ouverte : peu de stress pour les poulies.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Tenir une prise ronde sans bord.",
  "erreurs": "Monter le corps trop haut au-dessus du plat.",
  "facile": "Un gros plat bien adhérent."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Pinces",
  "comment": "Pince la prise avec toute la main, pouce d'un côté, doigts de l'autre.\nGarde le poignet dans l'axe.\nSerre juste assez pour tenir.",
  "cle": "Arrête si le pouce ou le poignet fait mal.",
  "depuis": "Mois 10",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 39,
  "but": "Tenir une prise entre le pouce et les doigts.",
  "erreurs": "Serrer au maximum en permanence.",
  "facile": "De grosses pinces larges."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Dülfer (traction latérale)",
  "comment": "Tire latéralement sur l'arête avec les deux mains.\nPousse avec les pieds sur le mur, dans le sens opposé.\nAvance mains et pieds à petits pas, en gardant la tension.",
  "cle": "Aucun risque particulier.",
  "depuis": "Mois 10",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 39,
  "but": "Monter le long d'une arête ou d'une prise verticale.",
  "erreurs": "Relâcher l'opposition en bougeant.",
  "facile": "Une arête bien marquée et des pieds sur prises."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Écart en dièdre",
  "comment": "Dans un angle, pose un pied sur chaque paroi.\nPousse sur les deux jambes pour soulager les bras.\nSecoue un bras puis l'autre.",
  "cle": "Aucun risque particulier.",
  "depuis": "Mois 10",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 39,
  "but": "Trouver une position de repos dans un angle.",
  "erreurs": "Ne pas penser à utiliser l'angle pour se reposer.",
  "facile": "Un dièdre bien ouvert, avec des prises de pied."
 },
 {
  "categorie": "Prises et positions",
  "nom": "Gaston",
  "comment": "Prends la prise pouce vers le bas, coude levé.\nPousse vers l'extérieur, comme pour ouvrir une porte coulissante.\nMonte les pieds pour soulager le bras.",
  "cle": "Sollicite l'épaule : sans à-coup, et à éviter si l'épaule est sensible.",
  "depuis": "Mois 12",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 47,
  "but": "Tenir une prise devant le visage en poussant vers l'extérieur.",
  "erreurs": "Tirer brusquement, coude très haut.",
  "facile": "Un gaston bas et proche du corps."
 },
 {
  "categorie": "Apprendre",
  "nom": "Lecture avant de grimper",
  "comment": "Avant de grimper, repère les prises de main dans l'ordre.\nMime la séquence des mains avec les bras.\nRepère les principales prises de pied et les endroits pour te reposer.\nAprès la voie, compare avec ce que tu as vraiment fait.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Prévoir les mouvements pour ne pas improviser dans le passage dur.",
  "erreurs": "Ne lire que les mains.",
  "facile": "Lis seulement les 5 premiers mouvements."
 },
 {
  "categorie": "Apprendre",
  "nom": "Aucun repositionnement",
  "comment": "Avant de saisir une prise, choisis l'endroit exact où poser les doigts.\nUne fois la prise tenue, interdiction de la replacer.\nSi la prise est mal tenue, continue quand même ou redescends.\nCompte mentalement les repositionnements qui t'échappent.",
  "cle": "Sur des voies ou blocs faciles uniquement.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Prendre les prises juste du premier coup, pour économiser les avant-bras.",
  "erreurs": "Tâtonner sur la prise ; regarder la prise trop tard.",
  "facile": "Autorise un repositionnement par voie au début."
 },
 {
  "categorie": "Apprendre",
  "nom": "Les trois prises",
  "comment": "Arrêté sur une bonne position, repère les 3 prochaines prises de main.\nRepère aussi les 3 prochaines prises de pied.\nSeulement ensuite, enchaîne les mouvements prévus.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Planifier avant de bouger, comme en voie.",
  "erreurs": "Partir avant d'avoir repéré les pieds.",
  "facile": "Deux prises au lieu de trois."
 },
 {
  "categorie": "Apprendre",
  "nom": "Lecture à voix haute",
  "comment": "Avant un bloc, annonce à voix haute la séquence des mains.\nAnnonce ensuite les pieds importants et les positions de repos.\nGrimpe, puis compare avec ce que tu avais annoncé.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Apprendre à lire un passage avant de le grimper.",
  "erreurs": "Annoncer seulement les mains.",
  "facile": "Annonce seulement les 4 premiers mouvements."
 },
 {
  "categorie": "Apprendre",
  "nom": "Sans regarder les mains",
  "comment": "Sur un bloc ou une voie facile, regarde uniquement tes pieds et la section suivante.\nNe regarde jamais la prise que ta main va saisir : trouve-la au toucher.",
  "cle": "Seulement sur de grosses prises faciles.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Forcer la précision des pieds et la mémoire des prises.",
  "erreurs": "Jeter un coup d'œil « juste une fois ».",
  "facile": "Autorise un regard sur les prises difficiles."
 },
 {
  "categorie": "Apprendre",
  "nom": "Sans certaines couleurs",
  "comment": "Choisis un bloc facile.\nInterdis-toi une couleur de prise (par exemple toutes les bleues).\nTrouve une autre solution pour monter.",
  "cle": "Reste sur des blocs faciles : la solution doit rester raisonnable.",
  "depuis": "Semaine 3",
  "discipline": "Voie et bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Développer la créativité et la lecture.",
  "erreurs": "Choisir un bloc trop dur.",
  "facile": "Interdis seulement une prise précise."
 },
 {
  "categorie": "Apprendre",
  "nom": "Se filmer",
  "comment": "Fais-toi filmer sur une voie ou un bloc.\nRegarde la vidéo en t'attachant à trois points : hanches, pieds, bras pliés inutilement.\nNote une seule chose à corriger la prochaine fois.",
  "cle": "Demande l'accord des personnes qui apparaissent à l'image.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Voir ce que l'on ne sent pas en grimpant.",
  "erreurs": "Vouloir tout corriger en même temps.",
  "facile": "Filme seulement le passage qui te pose problème."
 },
 {
  "categorie": "Apprendre",
  "nom": "Copier un grimpeur plus fort",
  "comment": "Observe un grimpeur plus expérimenté sur un bloc ou une voie que tu connais.\nRepère sa méthode (pieds, hanches, ordre des mains).\nEssaie de la reproduire.",
  "cle": "Ne copie pas les jetés ou les mouvements explosifs.",
  "depuis": "Mois 9",
  "discipline": "Voie et bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Découvrir de nouvelles façons de bouger.",
  "erreurs": "Copier un mouvement trop dur ou trop dynamique pour toi.",
  "facile": "Demande-lui simplement de t'expliquer sa méthode."
 },
 {
  "categorie": "Endurance",
  "nom": "ARC",
  "comment": "Grimpe en continu sur des prises faciles : monte, traverse, redescends, remonte.\nNe descends pas au sol.\nIntensité 4/10 : tu pourrais parler en grimpant.\n10 min les premières fois, puis 15, puis 20 min sur plusieurs semaines.",
  "cle": "Les avant-bras peuvent être légèrement chargés, jamais « explosés ». Arrête si une douleur apparaît.",
  "depuis": "Semaine 5",
  "discipline": "Voie et bloc",
  "niveau": "Intermédiaire",
  "semaine": 5,
  "but": "Développer l'endurance des avant-bras sans les épuiser.",
  "erreurs": "Monter l'intensité : ça devient de la résistance.",
  "facile": "5 min, puis repos, deux fois."
 },
 {
  "categorie": "Méthode",
  "nom": "Face puis profil",
  "comment": "Grimpe une voie facile face au mur, hanches parallèles au mur.\nRedescends, repose-toi.\nGrimpe la même voie de profil, en tournant la hanche vers chaque prise.\nCompare la fatigue des bras.",
  "cle": "Repos complet entre les deux montées.",
  "depuis": "Semaine 3",
  "discipline": "Voie",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Sentir l'économie que procure le profil.",
  "erreurs": "Faire la deuxième montée trop vite après la première.",
  "facile": "Fais seulement la moitié de la voie à chaque fois."
 },
 {
  "categorie": "Méthode",
  "nom": "Changement de main",
  "comment": "Sur une bonne prise, décale la première main sur un côté.\nPose les doigts de l'autre main un par un sur la place libérée.\nLâche la première main.",
  "cle": "À faire d'abord sur de grosses prises.",
  "depuis": "Semaine 3",
  "discipline": "Voie",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Libérer une prise pour y placer l'autre main.",
  "erreurs": "Le faire sur une petite prise.",
  "facile": "Sur une très grosse prise uniquement."
 },
 {
  "categorie": "Méthode",
  "nom": "Repos bras tendu",
  "comment": "Sur une bonne prise, pends bras tendu, pieds bien posés.\nSecoue l'autre bras le long du corps quelques secondes.\nChange de bras.\nRepars quand les avant-bras sont moins durs.",
  "cle": "Prévois tes repos pendant la lecture de la voie.",
  "depuis": "Semaine 5",
  "discipline": "Voie",
  "niveau": "Débutant",
  "semaine": 5,
  "but": "Récupérer en cours de voie.",
  "erreurs": "Se reposer bras plié.",
  "facile": "Repose-toi sur la plus grosse prise de la voie."
 },
 {
  "categorie": "Méthode",
  "nom": "À vue (lecture complète)",
  "comment": "Choisis une voie inconnue, un niveau sous ton maximum.\nLis-la entièrement depuis le sol (mouvements et repos).\nGrimpe-la sans « sec ».",
  "cle": "Aucun risque particulier en moulinette.",
  "depuis": "Mois 10",
  "discipline": "Voie",
  "niveau": "Avancé",
  "semaine": 39,
  "but": "Réussir une voie inconnue du premier coup.",
  "erreurs": "Choisir une voie trop dure.",
  "facile": "Une voie deux niveaux sous ton maximum."
 },
 {
  "categorie": "Endurance",
  "nom": "Désescalade en voie",
  "comment": "Arrivé en haut d'une voie facile, préviens ton assureur.\nRedescends en grimpant au lieu de te faire descendre.\nRegarde chaque pied en descendant.",
  "cle": "L'assureur doit savoir que tu désescalades pour bien gérer la corde.",
  "depuis": "Mois 9",
  "discipline": "Voie",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Doubler le volume et travailler les pieds.",
  "erreurs": "Oublier de prévenir l'assureur.",
  "facile": "Redescends seulement la moitié de la voie."
 },
 {
  "categorie": "Endurance",
  "nom": "Grimpe fluide",
  "comment": "Sur une voie facile, ne t'arrête jamais plus de 3 secondes.\nNe t'arrête que sur les repos que tu as prévus.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Voie",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Améliorer le rythme et économiser l'énergie.",
  "erreurs": "Confondre fluide et rapide.",
  "facile": "Fais-le sur une voie que tu connais déjà."
 },
 {
  "categorie": "En tête et falaise",
  "nom": "Falaise école",
  "comment": "Fais ta première sortie avec un club ou un guide.\nApprends à lire le rocher (prises naturelles, adhérence).\nCommence bien sous ton niveau de salle.",
  "cle": "Toujours encadré au début ; le matériel et l'assurage diffèrent de la salle.",
  "depuis": "Mois 12",
  "discipline": "Voie",
  "niveau": "Avancé",
  "semaine": 47,
  "but": "Découvrir l'escalade en extérieur.",
  "erreurs": "Croire que les cotations sont les mêmes qu'en salle.",
  "facile": "Une falaise école très fréquentée, avec des voies courtes."
 },
 {
  "categorie": "En tête et falaise",
  "nom": "Mousquetonnage efficace (tête)",
  "comment": "Arrête-toi sur une position stable, bras tendu sur une bonne prise.\nMousquetonne quand la dégaine est à hauteur de taille ou de poitrine.\nSi elle est trop haute, monte d'abord un pied.",
  "cle": "Uniquement après un cours de grimpe en tête.",
  "depuis": "Après cours de tête",
  "discipline": "Voie",
  "niveau": "Avancé",
  "semaine": 999,
  "but": "Mousquetonner sans se fatiguer, en sécurité.",
  "erreurs": "Mousquetonner bras au-dessus de la tête, dans une position instable.",
  "facile": "Entraîne-toi au sol sur une dégaine accrochée au mur."
 },
 {
  "categorie": "En tête et falaise",
  "nom": "Apprentissage de la chute en tête",
  "comment": "Avec un moniteur, commence par des chutes très courtes, dégaine à hauteur du baudrier.\nAugmente progressivement la hauteur.\nGarde les bras devant toi et les pieds face au mur.",
  "cle": "Jamais seul, jamais au-dessus d'un relief, avec un assureur expérimenté.",
  "depuis": "Après cours de tête",
  "discipline": "Voie",
  "niveau": "Avancé",
  "semaine": 999,
  "but": "Grimper en tête sereinement.",
  "erreurs": "Le faire seul, sans encadrement.",
  "facile": "Des chutes en moulinette d'abord."
 },
 {
  "categorie": "Méthode",
  "nom": "Désescalade",
  "comment": "Arrivé en haut d'un bloc, redescends en grimpant.\nRegarde chaque pied en descendant.\nSaute seulement depuis une faible hauteur, genoux fléchis.",
  "cle": "Les réceptions sont la principale cause de blessure en bloc.",
  "depuis": "Semaine 1",
  "discipline": "Bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Travailler la lecture, le contrôle des pieds, et protéger les genoux.",
  "erreurs": "Sauter du haut du bloc par habitude.",
  "facile": "Désescalade par un bloc plus facile à côté."
 },
 {
  "categorie": "Méthode",
  "nom": "Trois façons de faire",
  "comment": "Réussis un bloc facile.\nRefais-le en changeant quelque chose : autre pied, profil, ordre des mains.\nTrouve une troisième façon.",
  "cle": "Aucun risque particulier.",
  "depuis": "Mois 9",
  "discipline": "Bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Enrichir ton répertoire de mouvements.",
  "erreurs": "Changer seulement un détail minuscule.",
  "facile": "Deux façons seulement."
 },
 {
  "categorie": "Méthode",
  "nom": "Rétablissement",
  "comment": "Tire sur la prise jusqu'à ce qu'elle soit à hauteur de poitrine.\nRetourne la main pour appuyer paume vers le bas.\nMonte un pied à côté de la main, puis lève-toi sur ce pied.",
  "cle": "Coude et poignet alignés, sans à-coup.",
  "depuis": "Mois 9",
  "discipline": "Bloc",
  "niveau": "Avancé",
  "semaine": 35,
  "but": "Sortir en haut d'un bloc ou passer au-dessus d'une prise.",
  "erreurs": "Essayer de monter le genou sur la prise.",
  "facile": "Sur une prise basse, avec de bons pieds."
 },
 {
  "categorie": "Jeux et endurance",
  "nom": "Traversée basse",
  "comment": "Traverse le mur horizontalement, à moins d'un mètre du sol.\nTiens 3 à 5 minutes sans poser pied à terre.\nChange de sens à chaque passage.",
  "cle": "Peu de risque : idéal en échauffement ou en fin de séance.",
  "depuis": "Semaine 1",
  "discipline": "Bloc",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Endurance et précision des pieds, avec peu de risque.",
  "erreurs": "Monter trop haut au fil de la traversée.",
  "facile": "1 à 2 minutes, sur de grosses prises."
 },
 {
  "categorie": "Jeux et endurance",
  "nom": "Jeu des mouvements ajoutés",
  "comment": "À deux, sur une traversée basse.\nLe premier fait 2 mouvements.\nLe suivant les refait et en ajoute un.\nContinuez à tour de rôle jusqu'à ce que quelqu'un se trompe.",
  "cle": "Restez près du sol.",
  "depuis": "Semaine 3",
  "discipline": "Bloc",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Mémoire, lecture et endurance, en jouant.",
  "erreurs": "Ajouter des mouvements trop durs.",
  "facile": "Seules les prises de main comptent, pieds libres."
 },
 {
  "categorie": "Jeux et endurance",
  "nom": "Traversée dévers aller-retour",
  "comment": "Sur un mur légèrement déversant, choisis environ 10 prises de main faciles.\nFais l'aller-retour sans descendre.\nRepos 3 min, puis recommence (2 à 4 séries).\nConcentre-toi sur le bassin collé au mur, pas sur les bras.",
  "cle": "Uniquement en léger dévers et sur grosses prises. Arrête dès que tu tires bras pliés en permanence.",
  "depuis": "Semaine 3",
  "discipline": "Bloc",
  "niveau": "Intermédiaire",
  "semaine": 3,
  "but": "Tenir le bassin et les pieds en dévers sur la durée.",
  "erreurs": "Laisser partir les pieds ; tirer avec les bras.",
  "facile": "Aller simple, 2 séries."
 },
 {
  "categorie": "Jeux et endurance",
  "nom": "Circuit 100 mouvements",
  "comment": "Crée une traversée facile.\nVise 40 mouvements sans tomber, puis 60, 80 et enfin 100 au fil des semaines.\nPas de pause longue.",
  "cle": "Prises faciles uniquement. Arrête si la qualité des mouvements baisse.",
  "depuis": "Semaine 9",
  "discipline": "Bloc",
  "niveau": "Intermédiaire",
  "semaine": 9,
  "but": "Préparer la continuité des voies longues.",
  "erreurs": "Augmenter trop vite le nombre de mouvements.",
  "facile": "Commence à 30 mouvements."
 },
 {
  "categorie": "Dynamique",
  "nom": "Déplacement dynamique contrôlé",
  "comment": "Pousse sur les jambes pour donner un petit élan vers le haut.\nGarde les pieds sur le mur.\nAttrape la prise au moment où le corps monte.",
  "cle": "Jamais de jeté ; arrête si l'épaule tire.",
  "depuis": "Mois 6",
  "discipline": "Bloc",
  "niveau": "Intermédiaire",
  "semaine": 23,
  "but": "Atteindre une prise juste hors de portée.",
  "erreurs": "Lâcher les pieds : ça devient un jeté.",
  "facile": "Une prise à peine hors de portée, très grosse."
 },
 {
  "categorie": "Dynamique",
  "nom": "Point mort (deadpoint)",
  "comment": "Prends un petit élan avec les jambes.\nAttrape la prise au sommet de la trajectoire, quand le corps ne monte plus et ne descend pas encore.\nGarde les pieds au mur.",
  "cle": "Seulement après un an de pratique ; jamais sur un bras tendu en choc.",
  "depuis": "Année 2",
  "discipline": "Bloc",
  "niveau": "Avancé",
  "semaine": 53,
  "but": "Attraper une prise sans à-coup grâce au bon timing.",
  "erreurs": "Attraper trop tôt ou trop tard, avec un choc sur le bras.",
  "facile": "Sur de grosses prises, distance courte."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Travail au point",
  "comment": "Grimpe la voie.\nQuand tu bloques, dis « sec » : ton assureur te tient.\nRepose-toi assis dans la corde, puis réessaie le mouvement.\nCompte tes « sec » : c'est ta mesure de progrès.",
  "cle": "Préviens ton assureur que tu travailles au point.",
  "depuis": "Semaine 1",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Comprendre une voie difficile sans s'épuiser.",
  "erreurs": "Vouloir absolument enchaîner dès le premier essai.",
  "facile": "Une voie seulement un niveau au-dessus de tes voies faciles."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Circuit",
  "comment": "Choisis le nombre de blocs indiqué (par exemple 4), tous faciles.\nEnchaîne-les sans t'arrêter : c'est une série.\nRepose-toi le temps indiqué, puis recommence.\nNote chaque bloc : réussi ou raté.",
  "cle": "Arrête la série si les avant-bras sont très durs.",
  "depuis": "Semaine 1",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Travailler l'endurance en enchaînant plusieurs blocs faciles.",
  "erreurs": "Choisir des blocs trop durs : le circuit devient une série de projets.",
  "facile": "3 blocs au lieu de 4, ou un repos plus long."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Projet",
  "comment": "Choisis un bloc ou une voie un niveau au-dessus de ton maximum.\nTravaille-le mouvement par mouvement.\nNote les méthodes qui marchent (note sur la ligne).\nReviens-y les séances suivantes jusqu'à le réussir.",
  "cle": "3 essais maximum par mouvement ; arrête dès que la qualité baisse.",
  "depuis": "Semaine 1",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Progresser sur une voie ou un bloc un peu au-dessus de ton niveau, en plusieurs séances.",
  "erreurs": "Choisir un projet beaucoup trop dur.",
  "facile": "Un projet seulement un demi-niveau au-dessus."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Volume",
  "comment": "Choisis des voies nettement sous ton niveau.\nGrimpe-les proprement, avec la consigne technique de la semaine.\nRepose-toi juste le temps d'assurer ton partenaire.",
  "cle": "Le volume doit rester facile : effort visé 5 à 6 sur 10.",
  "depuis": "Semaine 1",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Grimper beaucoup de voies faciles pour automatiser les bons gestes.",
  "erreurs": "Grimper le volume trop dur et finir épuisé.",
  "facile": "Moins de voies, mais toutes propres."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Séance allégée",
  "comment": "Réduis le volume d'environ un tiers.\nPas de projet dur.\nRefais des voies ou blocs connus, proprement.",
  "cle": "C'est pendant ces séances que le corps consolide les progrès.",
  "depuis": "Semaine 1",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Laisser le corps et les tendons récupérer, sans arrêter de grimper.",
  "erreurs": "En profiter pour essayer plus dur.",
  "facile": "Ne fais que la moitié de la séance."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Repos entre essais",
  "comment": "En voie : au moins 5 minutes entre deux voies (le temps d'assurer).\nEn bloc : 3 à 4 minutes entre deux essais durs.\nSur un projet ou un essai d'enchaînement : 10 minutes.\nLe minuteur de l'app lance ces repos tout seul.",
  "cle": "Un repos trop court augmente le risque de blessure aux doigts.",
  "depuis": "Semaine 1",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Revenir frais sur l'essai suivant.",
  "erreurs": "Repartir dès que les mains ne brûlent plus.",
  "facile": "Allonge le repos si tu es fatigué."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Pyramide",
  "comment": "Commence par plusieurs blocs ou voies faciles.\nPuis quelques-uns d'un niveau au-dessus.\nTermine par un ou deux du niveau le plus dur.",
  "cle": "Respecte l'ordre : le plus dur arrive quand tu es échauffé.",
  "depuis": "Semaine 3",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Monter progressivement en difficulté pendant la séance.",
  "erreurs": "Commencer directement par le plus dur.",
  "facile": "Moins de niveaux : facile puis moyen."
 },
 {
  "categorie": "Méthodes de séance",
  "nom": "Essai d'enchaînement",
  "comment": "Lis la voie depuis le sol.\nGrimpe-la en essayant de ne jamais demander « sec ».\nSi tu bloques, prends « sec », repose-toi et termine la voie au point.\nRepose-toi 10 minutes avant l'essai suivant.",
  "cle": "3 essais maximum par séance sur la même voie.",
  "depuis": "Semaine 7",
  "discipline": "Méthodes",
  "niveau": "Débutant",
  "semaine": 7,
  "but": "Tenter de grimper une voie du bas jusqu'en haut sans « sec » ni chute.",
  "erreurs": "Enchaîner les essais sans repos.",
  "facile": "Choisis une voie que tu as déjà travaillée au point."
 },
 {
  "categorie": "Gainage",
  "nom": "Planche",
  "comment": "Appuie-toi sur les avant-bras, coudes sous les épaules.\nTends les jambes, appui sur la pointe des pieds.\nAligne tête, dos et bassin, en serrant le ventre et les fessiers.\nTiens la durée indiquée en respirant normalement.",
  "cle": "Arrête si le bas du dos se creuse ou fait mal.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Renforcer le gainage, indispensable pour garder les pieds au mur en dévers.",
  "erreurs": "Fesses trop hautes, ou bas du dos qui se creuse.",
  "facile": "Genoux au sol."
 },
 {
  "categorie": "Gainage",
  "nom": "Planche latérale",
  "comment": "Allonge-toi sur le côté, appui sur un avant-bras, coude sous l'épaule.\nSoulève le bassin pour aligner tête, bassin et pieds.\nTiens la durée indiquée, puis change de côté.",
  "cle": "Arrête si l'épaule d'appui fait mal.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Renforcer les côtés du tronc, pour éviter de pivoter au mur.",
  "erreurs": "Laisser tomber le bassin.",
  "facile": "Genoux pliés au sol."
 },
 {
  "categorie": "Gainage",
  "nom": "Dead bug",
  "comment": "Allongé sur le dos, bras tendus vers le plafond, genoux pliés à 90°.\nPlaque le bas du dos au sol.\nTends lentement un bras derrière toi et la jambe opposée vers l'avant.\nReviens, puis change de côté.",
  "cle": "Mouvement lent : le dos doit rester plaqué.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Gainer le ventre en gardant le dos protégé.",
  "erreurs": "Le bas du dos qui décolle du sol.",
  "facile": "Ne bouge que les jambes, bras immobiles."
 },
 {
  "categorie": "Gainage",
  "nom": "Hollow body",
  "comment": "Allongé sur le dos, plaque le bas du dos au sol.\nDécolle les épaules et les jambes, bras le long du corps ou au-dessus de la tête.\nTiens la position en respirant.",
  "cle": "Jambes tendues seulement quand la version genoux pliés est facile.",
  "depuis": "Semaine 3",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 3,
  "but": "Gainage complet, très proche de la tension du corps en dévers.",
  "erreurs": "Le bas du dos qui se creuse.",
  "facile": "Genoux pliés, bras le long du corps."
 },
 {
  "categorie": "Gainage",
  "nom": "Relevés de genoux suspendu",
  "comment": "Suspends-toi à une barre, bras tendus, omoplates basses.\nMonte lentement les genoux vers la poitrine.\nRedescends sans te balancer.",
  "cle": "Seulement si la barre est solide et les épaules à l'aise.",
  "depuis": "Mois 6",
  "discipline": "Muscu",
  "niveau": "Intermédiaire",
  "semaine": 23,
  "but": "Gainage du bas du ventre, en suspension comme au mur.",
  "erreurs": "Se balancer pour monter les genoux.",
  "facile": "Pieds au sol sur une chaise, ou genoux à hauteur de hanches seulement."
 },
 {
  "categorie": "Haut du corps",
  "nom": "Pompes",
  "comment": "Mains un peu plus larges que les épaules, corps gainé.\nDescends lentement la poitrine vers le sol (ou la table).\nRemonte en poussant.",
  "cle": "Arrête si les poignets ou les épaules font mal.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Équilibrer les épaules en renforçant les muscles qui poussent.",
  "erreurs": "Le bassin qui s'affaisse ; les coudes très écartés.",
  "facile": "Mains sur une table ou un mur, puis au sol sur les genoux."
 },
 {
  "categorie": "Haut du corps",
  "nom": "Rowing inversé",
  "comment": "Allonge-toi sous une table lourde et stable, mains au bord.\nGarde le corps gainé, genoux pliés.\nTire la poitrine vers la table, puis redescends lentement.",
  "cle": "Vérifie que la table ne peut pas basculer.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Renforcer le dos, les muscles qui tirent.",
  "erreurs": "Tirer avec les bras seulement, sans serrer les omoplates.",
  "facile": "Genoux plus pliés, ou élastique attaché à une porte fermée."
 },
 {
  "categorie": "Haut du corps",
  "nom": "Suspension active",
  "comment": "Suspends-toi bras tendus à une barre (pieds sur une chaise au début).\nAbaisse et rapproche les omoplates sans plier les bras.\nRelâche doucement, puis recommence.",
  "cle": "Teste d'abord la barre de porte en y mettant ton poids progressivement.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Préparer les épaules à la suspension et aux tractions.",
  "erreurs": "Plier les bras : ce n'est pas une traction.",
  "facile": "Garde une partie du poids sur la chaise."
 },
 {
  "categorie": "Haut du corps",
  "nom": "Tractions assistées",
  "comment": "Suspends-toi à la barre, pieds sur une chaise ou dans un élastique.\nTire lentement (2 secondes) jusqu'au menton au niveau de la barre.\nRedescends lentement (2 secondes).",
  "cle": "Seulement si la suspension active ne gêne ni coudes ni épaules.",
  "depuis": "Mois 4",
  "discipline": "Muscu",
  "niveau": "Intermédiaire",
  "semaine": 14,
  "but": "Apprendre la traction sans surcharger coudes et épaules.",
  "erreurs": "Tirer d'un coup sec ; redescendre en se laissant tomber.",
  "facile": "Plus d'aide des pieds."
 },
 {
  "categorie": "Haut du corps",
  "nom": "Tractions complètes lentes",
  "comment": "Suspends-toi bras tendus, omoplates basses.\nTire lentement jusqu'au menton au niveau de la barre.\nRedescends lentement jusqu'aux bras tendus.",
  "cle": "Seulement si 3 séries de 5 tractions assistées sont faciles et sans douleur.",
  "depuis": "Mois 7",
  "discipline": "Muscu",
  "niveau": "Intermédiaire",
  "semaine": 27,
  "but": "Force de traction, sans à-coup.",
  "erreurs": "Se balancer ; ne pas redescendre complètement.",
  "facile": "Reviens aux tractions assistées."
 },
 {
  "categorie": "Prévention",
  "nom": "Extensions des doigts",
  "comment": "Passe un élastique léger autour du bout des doigts tendus.\nOuvre lentement la main contre la résistance.\nReferme lentement.",
  "cle": "Prévention classique des douleurs de coude.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Équilibrer les muscles qui ferment la main, très sollicités en escalade.",
  "erreurs": "Un élastique trop dur.",
  "facile": "Écarte simplement les doigts sans élastique."
 },
 {
  "categorie": "Prévention",
  "nom": "Rotations externes à l'élastique",
  "comment": "Coude au corps, plié à 90°, élastique tenu dans la main.\nÉcarte lentement l'avant-bras vers l'extérieur.\nReviens lentement.",
  "cle": "Élastique léger, mouvement lent.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Protéger les épaules.",
  "erreurs": "Décoller le coude du corps.",
  "facile": "Sans élastique, juste le mouvement."
 },
 {
  "categorie": "Prévention",
  "nom": "Face pull",
  "comment": "Attache un élastique à hauteur de visage.\nTire les mains vers le front en écartant les coudes.\nRapproche les omoplates, puis reviens lentement.",
  "cle": "Élastique léger, mouvement lent, sans douleur à l'épaule.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Renforcer l'arrière des épaules, souvent faible chez les grimpeurs.",
  "erreurs": "Hausser les épaules ; tirer avec le dos cambré.",
  "facile": "Élastique plus léger, 2 × 10."
 },
 {
  "categorie": "Prévention",
  "nom": "Scapular push-up",
  "comment": "En position de pompe (ou sur les genoux), bras tendus.\nLaisse descendre la poitrine entre les omoplates sans plier les bras.\nPuis pousse le sol pour écarter les omoplates.",
  "cle": "Arrête si l'épaule fait mal.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Contrôler les omoplates, base d'une épaule stable.",
  "erreurs": "Plier les coudes : ce n'est pas une pompe.",
  "facile": "Mains contre un mur."
 },
 {
  "categorie": "Prévention",
  "nom": "Extension du poignet",
  "comment": "Avant-bras posé sur la cuisse, paume vers le bas, haltère de 2 à 4 kg.\nMonte le dos de la main lentement.\nRedescends en 3 secondes.",
  "cle": "Charge légère : c'est de la prévention, pas de la force.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Protéger le coude (épicondyle) en renforçant les extenseurs.",
  "erreurs": "Charge trop lourde ; mouvement rapide.",
  "facile": "Sans haltère, ou bouteille d'eau."
 },
 {
  "categorie": "Prévention",
  "nom": "Flexion du poignet",
  "comment": "Avant-bras posé sur la cuisse, paume vers le haut, haltère de 2 à 4 kg.\nMonte le poignet lentement.\nRedescends en 3 secondes.",
  "cle": "Charge légère, sans douleur.",
  "depuis": "Semaine 1",
  "discipline": "Muscu",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Équilibrer les muscles de l'avant-bras et protéger le coude.",
  "erreurs": "Bouger tout l'avant-bras.",
  "facile": "Sans haltère."
 },
 {
  "categorie": "Allure et technique",
  "nom": "Allure conversation",
  "comment": "Cours assez lentement pour pouvoir parler en phrases complètes.\nSi tu es essoufflé, ralentis ou marche.\nGarde cette allure toute la sortie.",
  "cle": "C'est l'allure de toutes les sorties du programme.",
  "depuis": "Semaine 1",
  "discipline": "Course",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Construire l'endurance sans fatiguer les tendons.",
  "erreurs": "Partir trop vite les premières minutes.",
  "facile": "Alterne course et marche."
 },
 {
  "categorie": "Allure et technique",
  "nom": "Foulée courte et légère",
  "comment": "Fais de petits pas rapides.\nPose le pied sous le bassin, sans attaquer du talon devant toi.\nGarde les épaules et les bras détendus.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Course",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Réduire les chocs sur les genoux et les tibias.",
  "erreurs": "De grandes enjambées, talon en premier.",
  "facile": "Concentre-toi sur la foulée seulement 1 minute sur 5."
 },
 {
  "categorie": "Allure et technique",
  "nom": "Marche active",
  "comment": "Pendant les fractions de marche, marche vite.\nBalance les bras.\nNe t'arrête pas.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Course",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Garder le cœur actif entre deux fractions de course.",
  "erreurs": "S'arrêter complètement entre les fractions.",
  "facile": "Marche normale pour les premières fractions."
 },
 {
  "categorie": "Récupération",
  "nom": "Étirement des mollets et du tendon d'Achille",
  "comment": "Mains contre un mur, une jambe tendue derrière, talon au sol : 30 secondes.\nPlie légèrement le genou arrière, talon toujours au sol : 30 secondes.\nChange de côté.",
  "cle": "Après la course seulement, sans forcer. Une douleur au talon signale qu'il faut revenir au palier précédent.",
  "depuis": "Semaine 1",
  "discipline": "Course",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Détendre les mollets après la course.",
  "erreurs": "Rebondir pendant l'étirement.",
  "facile": "Écarte moins les pieds."
 },
 {
  "categorie": "Récupération",
  "nom": "Retour au calme en marchant",
  "comment": "Marche 5 minutes après la course.\nContinue jusqu'à ce que la respiration redevienne calme.",
  "cle": "Aucun risque particulier.",
  "depuis": "Semaine 1",
  "discipline": "Course",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Éviter l'arrêt brutal après la course.",
  "erreurs": "S'asseoir tout de suite.",
  "facile": "Marche plus lentement."
 },
 {
  "categorie": "Hanches",
  "nom": "Grenouille",
  "comment": "À quatre pattes, écarte les genoux le plus possible, pieds en dehors.\nRecule doucement le bassin vers les talons.\nTiens 30 secondes en respirant.",
  "cle": "Arrête si les genoux font mal.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Ouvrir les hanches pour le profil et les pieds hauts.",
  "erreurs": "Forcer en rebondissant.",
  "facile": "Écarte moins les genoux."
 },
 {
  "categorie": "Hanches",
  "nom": "90/90 des hanches",
  "comment": "Assis, une jambe pliée devant à 90°, l'autre pliée sur le côté à 90°.\nBascule lentement les genoux de l'autre côté.\nFais 5 bascules de chaque côté.",
  "cle": "Sans forcer.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Mobilité des hanches dans les deux sens de rotation.",
  "erreurs": "S'aider des mains en forçant.",
  "facile": "Mains au sol derrière toi pour t'aider."
 },
 {
  "categorie": "Hanches",
  "nom": "Genou contre le mur",
  "comment": "Face au mur, pied à quelques centimètres.\nAvance le genou jusqu'au mur sans décoller le talon.\nRecule le pied petit à petit.",
  "cle": "Sans forcer sur le tendon d'Achille.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Gagner de la souplesse de cheville, utile pour les petits pieds et les pieds hauts.",
  "erreurs": "Décoller le talon.",
  "facile": "Pied plus proche du mur."
 },
 {
  "categorie": "Hanches",
  "nom": "Cossack squat",
  "comment": "Pieds très écartés.\nDescends sur une jambe en gardant l'autre tendue, pointe vers le haut.\nReviens au centre, puis change de côté.",
  "cle": "Descends seulement jusqu'où le genou reste confortable.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Ouvrir les adducteurs pour les écarts et les pieds hauts.",
  "erreurs": "Décoller le talon de la jambe pliée.",
  "facile": "Mains sur une chaise, amplitude réduite."
 },
 {
  "categorie": "Hanches",
  "nom": "Couch stretch",
  "comment": "Genou au sol contre un mur, pied remonté contre le mur derrière toi.\nAutre pied devant, buste droit.\nTiens 1 min par côté en respirant.",
  "cle": "Coussin sous le genou. Sans douleur dans le genou.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Assouplir l'avant de la hanche pour coller le bassin au mur.",
  "erreurs": "Cambrer le bas du dos.",
  "facile": "Genou plus loin du mur."
 },
 {
  "categorie": "Hanches",
  "nom": "Balle sous la voûte plantaire",
  "comment": "Assis ou debout, pose le pied sur une balle de tennis.\nFais-la rouler du talon aux orteils, 1 min par pied.",
  "cle": "Pression agréable, jamais douloureuse.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Détendre les pieds après de longues heures en chaussons.",
  "erreurs": "Appuyer trop fort.",
  "facile": "Assis, pression légère."
 },
 {
  "categorie": "Épaules et dos",
  "nom": "Open book",
  "comment": "Allongé sur le côté, genoux pliés, bras tendus devant toi.\nOuvre le bras du dessus vers l'arrière en suivant la main des yeux.\nReviens lentement.",
  "cle": "Mouvement doux, sans forcer.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Mobiliser le haut du dos.",
  "erreurs": "Laisser les genoux se séparer.",
  "facile": "Amplitude réduite."
 },
 {
  "categorie": "Épaules et dos",
  "nom": "Band dislocations",
  "comment": "Tiens un élastique très écarté, bras tendus devant toi.\nPasse-le au-dessus de la tête jusque derrière toi, puis reviens.",
  "cle": "Écarte suffisamment les mains : aucune douleur à l'épaule. À éviter si l'épaule est sensible.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Entretenir la mobilité des épaules.",
  "erreurs": "Mains trop rapprochées ; plier les coudes.",
  "facile": "Bâton ou serviette, mains très écartées."
 },
 {
  "categorie": "Épaules et dos",
  "nom": "Extension passive des poignets",
  "comment": "Bras tendu, paume vers l'avant.\nAvec l'autre main, tire doucement les doigts vers toi.\nTiens 30 s, puis change de côté.",
  "cle": "Étirement doux, jamais douloureux.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Détendre les fléchisseurs de l'avant-bras après la grimpe.",
  "erreurs": "Tirer trop fort.",
  "facile": "15 s seulement."
 },
 {
  "categorie": "Tests",
  "nom": "Tests de mobilité",
  "comment": "Tous les 3 mois, note dans les mesures :\nGenou contre le mur : distance du pied au mur (objectif 12 cm, talon au sol).\n90/90 : tenue en secondes par côté (objectif 90 s).\nSquat profond : tenue en secondes, talons au sol (objectif 30 s).\nMains derrière le dos : aucune gêne, ou gêne.",
  "cle": "Sans forcer : on mesure, on ne cherche pas à battre un record.",
  "depuis": "Semaine 1",
  "discipline": "Mobilité",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Suivre ta mobilité dans le temps.",
  "erreurs": "Faire les tests à froid : échauffe-toi 5 min avant.",
  "facile": "Fais seulement les tests confortables."
 },
 {
  "categorie": "Peau",
  "nom": "Soin des durillons",
  "comment": "Après la séance : lave les mains à l'eau tiède et au savon doux, puis sèche bien les plis.\nLe soir des séances : crème (jamais dans les 2 à 3 h avant de grimper).\nLe dimanche soir : inspecte tes mains et lime seulement les bosses et les surépaisseurs, après une douche chaude.\nUne fissure : crème le soir, pansement la nuit.",
  "cle": "Ne jamais creuser, tout enlever ou faire saigner. Fissure profonde, zone chaude ou rouge, début d'arrachement : réduis ou arrête la séance et protège la zone.",
  "depuis": "Semaine 1",
  "discipline": "Soins",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Garder des durillons fins, plats et souples, qui ne s'arrachent pas.",
  "erreurs": "Laisser épaissir la corne ; trop de magnésie ; crème juste avant de grimper.",
  "facile": "Seulement la crème du soir."
 },
 {
  "categorie": "Peau",
  "nom": "Bons et mauvais durillons",
  "comment": "Bons durillons : plats, souples, peu épais, répartis, non douloureux. À garder.\nMauvais durillons : épais, bombés, fissurés, blanchâtres, qui accrochent les prises. À limer doucement.\nUne grosse corne est souvent plus fragile qu'un durillon fin.",
  "cle": "Une douleur à la fermeture de la main ou une zone chaude persistante n'est pas un problème de peau : signale-la.",
  "depuis": "Semaine 1",
  "discipline": "Soins",
  "niveau": "Débutant",
  "semaine": 1,
  "but": "Savoir reconnaître ce qu'il faut entretenir.",
  "erreurs": "Vouloir des mains lisses : un peu de corne protège.",
  "facile": "Commence par observer, sans limer."
 }
];

