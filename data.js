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
  "contenu": "! Avant de démarrer course et renforcement, un bilan simple chez ton médecin traitant est une bonne précaution.\n> Course · avant\n6× 2 min course + 2 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 ou 5a · « Pieds silencieux »\n2× Voie en 4 ou 5a · « Bras tendus »\n2× Voie en 5b · « Travail au point »\n! 5b verticale si possible, sinon en dévers. Note tes « sec » avec le bouton + Voie.\n! Repos au moins 5 min entre les voies.\n> Retour au calme salle"
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 20 s\n2× « Planche latérale » · 15 s par côté\n3× « Dead bug » · 6 par côté\n3× « Pompes » · 6, mains sur une table\n3× « Rowing inversé » · 5, genoux pliés\n3× « Suspension active » · 5, pieds sur une chaise (si barre)\n2× « Rotations externes à l'élastique » · 12 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n5× 2 min course + 2 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 1,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n10× Bloc vertical niveau 3-4, 2 fois chacun (repos 1 min)\n1× 20 min en dévers niveau 3 · « Hanches collées »\n2× Bloc vertical niveau 5 · 2 essais maximum\n! « Désescalade » plutôt que sauter.\n> Retour au calme salle"
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n6× 2 min course + 2 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 ou 5a · « Pieds silencieux »\n2× Voie en 4 ou 5a · « Bras tendus »\n2× Voie en 5b · « Travail au point »\n! 5b verticale si possible, sinon en dévers. Note tes « sec » avec le bouton + Voie.\n! Repos au moins 5 min entre les voies.\n> Retour au calme salle"
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 20 s\n2× « Planche latérale » · 15 s par côté\n3× « Dead bug » · 6 par côté\n3× « Pompes » · 6, mains sur une table\n3× « Rowing inversé » · 5, genoux pliés\n3× « Suspension active » · 5, pieds sur une chaise (si barre)\n2× « Rotations externes à l'élastique » · 12 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n5× 2 min course + 2 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 2,
  "phase": "C1 · Pieds précis, bras tendus",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n10× Bloc vertical niveau 3-4, 2 fois chacun (repos 1 min)\n1× 20 min en dévers niveau 3 · « Hanches collées »\n2× Bloc vertical niveau 5 · 2 essais maximum\n! « Désescalade » plutôt que sauter.\n> Retour au calme salle"
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n5× 3 min course + 1 min 30 marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n1× Voie en 5a · « Main qui plane »\n1× Voie en 5a · « Grimpe au ralenti »\n2× Voie en 5b en dévers · « Travail au point » · « Profil alterné »\n! Repère les endroits où tu prends « sec ».\n1× Voie en 5b verticale · essai d'enchaînement, sans pression\n! Pense à réserver une séance avec un moniteur pour la semaine suivante.\n> Retour au calme salle"
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 30 s\n2× « Planche latérale » · 20 s par côté\n3× « Dead bug » · 8 par côté\n3× « Hollow body » · 15 s, genoux pliés\n3× « Pompes » · 8, mains sur une table\n3× « Rowing inversé » · 8, genoux pliés\n3× « Suspension active » · 6, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 12 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n4× 3 min course + 1 min 30 marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 3,
  "phase": "C1 · Profil et drop knee",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n4× Bloc niveau 3 (repos 1 min)\n3× Bloc niveau 4 (repos 2 min)\n2× Bloc niveau 5\n1× 25 min en dévers niveau 3-4 · « Profil alterné » · « Drop knee »\n5× « Désescalade » d'un bloc facile (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n5× 3 min course + 1 min 30 marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n1× Séance avec un moniteur, si réservée : hanches, pieds, dévers\n1× Voie en 5a · « Main qui plane »\n1× Voie en 5a · « Grimpe au ralenti »\n2× Voie en 5b en dévers · « Travail au point » · « Profil alterné »\n! Repère les endroits où tu prends « sec ».\n1× Voie en 5b verticale · essai d'enchaînement, sans pression\n> Retour au calme salle"
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 30 s\n2× « Planche latérale » · 20 s par côté\n3× « Dead bug » · 8 par côté\n3× « Hollow body » · 15 s, genoux pliés\n3× « Pompes » · 8, mains sur une table\n3× « Rowing inversé » · 8, genoux pliés\n3× « Suspension active » · 6, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 12 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n4× 3 min course + 1 min 30 marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 4,
  "phase": "C1 · Profil et drop knee",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n4× Bloc niveau 3 (repos 1 min)\n3× Bloc niveau 4 (repos 2 min)\n2× Bloc niveau 5\n1× 25 min en dévers niveau 3-4 · « Profil alterné » · « Drop knee »\n5× « Désescalade » d'un bloc facile (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n4× 5 min course + 1 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 puis 5a enchaînées · endurance (repos 10 min)\n2× Voie en 5b en dévers · « Pieds qui tirent » · « Bras tendus »\n! Objectif : moins de « sec » que la fois précédente.\n1× Voie en 5c · « Travail au point »\n> Retour au calme salle"
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 40 s\n2× « Planche latérale » · 30 s par côté\n3× « Dead bug » · 10 par côté\n3× « Hollow body » · 25 s, genoux pliés\n3× « Pompes » · 8, au sol sur les genoux\n3× « Rowing inversé » · 10, genoux pliés\n3× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n3× 5 min course + 1 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 5,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n3× Série de 3 blocs faciles enchaînés (repos 4 min)\n1× 30 min en dévers niveau 4 · « Ne jamais lâcher les pieds » · « Crochet de pointe »\n3× Essai sur un bloc projet niveau 5 (repos 4 min)\n! 3 essais maximum par mouvement.\n> Retour au calme salle"
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n4× 5 min course + 1 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 puis 5a enchaînées · endurance (repos 10 min)\n2× Voie en 5b en dévers · « Pieds qui tirent » · « Bras tendus »\n! Objectif : moins de « sec » que la fois précédente.\n1× Voie en 5c · « Travail au point »\n> Retour au calme salle"
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 40 s\n2× « Planche latérale » · 30 s par côté\n3× « Dead bug » · 10 par côté\n3× « Hollow body » · 25 s, genoux pliés\n3× « Pompes » · 8, au sol sur les genoux\n3× « Rowing inversé » · 10, genoux pliés\n3× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n3× 5 min course + 1 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 6,
  "phase": "C1 · Gainage et pieds actifs",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n3× Série de 3 blocs faciles enchaînés (repos 4 min)\n1× 30 min en dévers niveau 4 · « Ne jamais lâcher les pieds » · « Crochet de pointe »\n3× Essai sur un bloc projet niveau 5 (repos 4 min)\n! 3 essais maximum par mouvement.\n> Retour au calme salle"
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n2× 10 min course + 2 min marche\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai d'enchaînement 5b en dévers (repos 10 min)\n1× Voie en 5c · « Travail au point »\n3× Voie en 4 ou 5a, grimpée proprement\n! Arrête dès que la qualité baisse.\n> Retour au calme salle"
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 40 s\n2× « Planche latérale » · 30 s par côté\n3× « Dead bug » · 10 par côté\n3× « Hollow body » · 25 s, genoux pliés\n3× « Pompes » · 8, au sol sur les genoux\n3× « Rowing inversé » · 10, genoux pliés\n3× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 20 min de course continue très lente\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 7,
  "phase": "C1 · Projets",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n4× Essai sur projet vertical niveau 5 (repos 4 min)\n4× Essai sur projet en dévers niveau 4 (repos 4 min)\n! Arrête dès que la qualité baisse.\n> Retour au calme salle"
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 20 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Voie en 5b en dévers des semaines 1-2 · compte les « sec »\n2× Voie en 4 ou 5a, tranquille\n! Remplis le Bilan (semaine 8) dans l'Excel.\n> Retour au calme salle"
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n2× « Planche » · 30 s\n2× « Planche latérale » · 20 s par côté\n2× « Dead bug » · 8 par côté\n2× « Hollow body » · 15 s\n2× « Pompes » · 8\n2× « Rowing inversé » · 8\n2× « Suspension active » · 5\n2× « Rotations externes à l'élastique » · 12 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 8,
  "phase": "C1 · Allègement et bilan",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs en dévers des semaines 1-2\n6× Bloc facile niveau 3-4 (repos 1 min)\n! Remplis le Bilan (semaine 8) dans l'Excel.\n> Retour au calme salle"
 },
 {
  "semaine": 9,
  "phase": "Repos actif entre cycles",
  "jour": "Mardi",
  "activite": "Repos actif",
  "contenu": "1× 30 à 45 min de marche, vélo tranquille ou étirements doux\n! Semaine sans escalade ni renforcement : les tendons se consolident."
 },
 {
  "semaine": 9,
  "phase": "Repos actif entre cycles",
  "jour": "Samedi",
  "activite": "Repos actif",
  "contenu": "1× 30 à 45 min de marche, vélo tranquille ou étirements doux\n! Semaine sans escalade ni renforcement : les tendons se consolident.\n! Pense à réserver une séance avec un moniteur pour la semaine suivante."
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n1× Séance avec un moniteur, si réservée : hanches, pieds, dévers\n1× Voie en 4 · « Pieds silencieux »\n1× Voie en 5a · « Bras tendus »\n1× Voie en 5b verticale, sans chercher l'enchaînement\n1× Voie en 5b en dévers, sans chercher l'enchaînement\n! Pas de projet dur cette semaine.\n1× Technique du mois : « Crochet de talon », en douceur\n> Retour au calme salle"
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 45 s\n3× « Hollow body » · 25 s, genoux pliés\n3× « Pompes » · 5 complètes\n3× « Rowing inversé » · 10, genoux pliés\n3× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 15 à 20 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 10,
  "phase": "C2 · Mois 3, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n8× Bloc facile niveau 3-4 (repos 1 min)\n1× 20 min en dévers niveau 4\n! Pas de projet dur cette semaine.\n1× Technique du mois : « Crochet de talon », en douceur\n> Retour au calme salle"
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 ou 5a · « Main qui plane »\n2× Essai d'enchaînement sur une 5b, vertical puis dévers\n2× Voie en 5c · « Travail au point »\n2× Voie en 5a puis 5b enchaînées · endurance (repos 10 min)\n1× Technique du mois : « Crochet de talon », en douceur\n> Retour au calme salle"
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 45 s\n3× « Hollow body » · 25 s, genoux pliés\n3× « Pompes » · 5 complètes\n3× « Rowing inversé » · 10, genoux pliés\n3× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 15 à 20 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 11,
  "phase": "C2 · Mois 3, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n1× 30 à 40 min en dévers niveau 4\n3× Bloc projet niveau 5, dont un en dévers\n3× Série de 3 blocs faciles enchaînés (repos 4 min)\n1× Technique du mois : « Crochet de talon », en douceur\n> Retour au calme salle"
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai sur ton projet du mois, 5b en dévers ou 5c verticale (repos 10 min)\n1× Voie en 5c · « Travail au point »\n2× Voie en 4 ou 5a, grimpée proprement\n! Arrête dès que la qualité baisse.\n1× Technique du mois : « Crochet de talon », en douceur\n> Retour au calme salle"
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 45 s\n3× « Hollow body » · 25 s, genoux pliés\n3× « Pompes » · 5 complètes\n3× « Rowing inversé » · 10, genoux pliés\n3× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 15 à 20 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 12,
  "phase": "C2 · Mois 3, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n6× Essai sur projet niveau 5, dont un en dévers (repos 4 min)\n! 3 essais maximum par mouvement.\n1× Technique du mois : « Crochet de talon », en douceur\n> Retour au calme salle"
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 15 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire ta voie en dévers suivie · compte les « sec »\n2× Voie du mois, tranquille\n> Retour au calme salle"
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n! Semaine d'allègement : 2 séries au lieu de 3.\n2× « Planche » · 45 s\n2× « Hollow body » · 25 s, genoux pliés\n2× « Pompes » · 5 complètes\n2× « Rowing inversé » · 10, genoux pliés\n2× « Suspension active » · 8, pieds sur une chaise\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 13,
  "phase": "C2 · Mois 3, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs du mois\n6× Bloc facile niveau 3-4 (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n1× Voie en 4 · « Pieds silencieux »\n1× Voie en 5a · « Bras tendus »\n1× Voie en 5b verticale, sans chercher l'enchaînement\n1× Voie en 5b en dévers, sans chercher l'enchaînement\n! Pas de projet dur cette semaine.\n1× Technique du mois : « Changement de pied » et « Opposition »\n> Retour au calme salle"
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 50 s\n3× « Hollow body » · 20 s, jambes tendues\n3× « Pompes » · 8 complètes\n3× « Rowing inversé » · 8, jambes tendues\n3× « Suspension active » · 5, pieds libres\n3× « Tractions assistées » · 3 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions assistées seulement si la suspension active ne gêne ni les coudes ni les épaules.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 20 à 25 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 14,
  "phase": "C2 · Mois 4, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n8× Bloc facile niveau 3-4 (repos 1 min)\n1× 20 min en dévers niveau 4\n! Pas de projet dur cette semaine.\n1× Technique du mois : « Changement de pied » et « Opposition »\n> Retour au calme salle"
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 ou 5a · « Main qui plane »\n2× Essai d'enchaînement sur une 5b, vertical puis dévers\n2× Voie en 5c en dévers · « Travail au point »\n2× Voie en 5a puis 5b enchaînées · endurance (repos 10 min)\n! Option : cours de grimpe en tête si la salle en propose. Sinon, moulinette.\n1× Technique du mois : « Changement de pied » et « Opposition »\n> Retour au calme salle"
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 50 s\n3× « Hollow body » · 20 s, jambes tendues\n3× « Pompes » · 8 complètes\n3× « Rowing inversé » · 8, jambes tendues\n3× « Suspension active » · 5, pieds libres\n3× « Tractions assistées » · 3 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions assistées seulement si la suspension active ne gêne ni les coudes ni les épaules.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 20 à 25 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 15,
  "phase": "C2 · Mois 4, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n1× 30 à 40 min en dévers niveau 4\n3× Bloc projet niveau 5, dont un en dévers\n3× Série de 3 blocs faciles enchaînés (repos 4 min)\n1× Technique du mois : « Changement de pied » et « Opposition »\n> Retour au calme salle"
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai sur ton projet du mois, 5b en dévers ou 5c verticale (repos 10 min)\n1× Voie en 5c · « Travail au point »\n2× Voie en 4 ou 5a, grimpée proprement\n! Arrête dès que la qualité baisse.\n1× Technique du mois : « Changement de pied » et « Opposition »\n> Retour au calme salle"
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 50 s\n3× « Hollow body » · 20 s, jambes tendues\n3× « Pompes » · 8 complètes\n3× « Rowing inversé » · 8, jambes tendues\n3× « Suspension active » · 5, pieds libres\n3× « Tractions assistées » · 3 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions assistées seulement si la suspension active ne gêne ni les coudes ni les épaules.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 20 à 25 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 16,
  "phase": "C2 · Mois 4, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n6× Essai sur projet niveau 5, dont un en dévers (repos 4 min)\n! 3 essais maximum par mouvement.\n1× Technique du mois : « Changement de pied » et « Opposition »\n> Retour au calme salle"
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 20 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire ta voie en dévers suivie · compte les « sec »\n2× Voie du mois, tranquille\n> Retour au calme salle"
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n! Semaine d'allègement : 2 séries au lieu de 3.\n2× « Planche » · 50 s\n2× « Hollow body » · 20 s, jambes tendues\n2× « Pompes » · 8 complètes\n2× « Rowing inversé » · 8, jambes tendues\n2× « Suspension active » · 5, pieds libres\n2× « Tractions assistées » · 3 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions assistées seulement si la suspension active ne gêne ni les coudes ni les épaules.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 17,
  "phase": "C2 · Mois 4, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs du mois\n6× Bloc facile niveau 3-4 (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n1× Voie en 4 · « Pieds silencieux »\n1× Voie en 5a · « Bras tendus »\n1× Voie en 5b verticale, sans chercher l'enchaînement\n1× Voie en 5b en dévers, sans chercher l'enchaînement\n! Pas de projet dur cette semaine.\n1× Technique du mois : « Repos bras tendu » dans une voie\n> Retour au calme salle"
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s, jambes tendues\n3× « Pompes » · 10 complètes\n3× « Rowing inversé » · 10, jambes tendues\n3× « Suspension active » · 8, pieds libres\n3× « Tractions assistées » · 5 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 à 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 18,
  "phase": "C2 · Mois 5, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n8× Bloc facile niveau 3-4 (repos 1 min)\n1× 20 min en dévers niveau 4\n! Pas de projet dur cette semaine.\n1× Technique du mois : « Repos bras tendu » dans une voie\n> Retour au calme salle"
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 4 ou 5a · « Main qui plane »\n2× Essai d'enchaînement sur une 5b, vertical puis dévers\n2× Voie en 5c en dévers · « Travail au point »\n2× Voie en 5a puis 5b enchaînées · endurance (repos 10 min)\n! Option : cours de grimpe en tête si la salle en propose. Sinon, moulinette.\n1× Technique du mois : « Repos bras tendu » dans une voie\n> Retour au calme salle"
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s, jambes tendues\n3× « Pompes » · 10 complètes\n3× « Rowing inversé » · 10, jambes tendues\n3× « Suspension active » · 8, pieds libres\n3× « Tractions assistées » · 5 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 à 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 19,
  "phase": "C2 · Mois 5, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n1× 30 à 40 min en dévers niveau 4\n3× Bloc projet niveau 5, dont un en dévers\n3× Série de 3 blocs faciles enchaînés (repos 4 min)\n1× Technique du mois : « Repos bras tendu » dans une voie\n> Retour au calme salle"
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course continue\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai sur ton projet du mois, 5b en dévers ou 5c verticale (repos 10 min)\n1× Voie en 5c · « Travail au point »\n2× Voie en 4 ou 5a, grimpée proprement\n! Arrête dès que la qualité baisse.\n1× Technique du mois : « Repos bras tendu » dans une voie\n> Retour au calme salle"
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s, jambes tendues\n3× « Pompes » · 10 complètes\n3× « Rowing inversé » · 10, jambes tendues\n3× « Suspension active » · 8, pieds libres\n3× « Tractions assistées » · 5 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 à 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 20,
  "phase": "C2 · Mois 5, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n6× Essai sur projet niveau 5, dont un en dévers (repos 4 min)\n! 3 essais maximum par mouvement.\n1× Technique du mois : « Repos bras tendu » dans une voie\n> Retour au calme salle"
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire ta voie en dévers suivie · compte les « sec »\n2× Voie du mois, tranquille\n> Retour au calme salle"
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n! Semaine d'allègement : 2 séries au lieu de 3.\n2× « Planche » · 60 s\n2× « Hollow body » · 30 s, jambes tendues\n2× « Pompes » · 10 complètes\n2× « Rowing inversé » · 10, jambes tendues\n2× « Suspension active » · 8, pieds libres\n2× « Tractions assistées » · 5 lentes\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 21,
  "phase": "C2 · Mois 5, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs du mois\n6× Bloc facile niveau 3-4 (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 22,
  "phase": "Repos actif entre cycles",
  "jour": "Mardi",
  "activite": "Repos actif",
  "contenu": "1× 30 à 45 min de marche, vélo tranquille ou étirements doux\n! Semaine sans escalade ni renforcement : les tendons se consolident."
 },
 {
  "semaine": 22,
  "phase": "Repos actif entre cycles",
  "jour": "Samedi",
  "activite": "Repos actif",
  "contenu": "1× 30 à 45 min de marche, vélo tranquille ou étirements doux\n! Semaine sans escalade ni renforcement : les tendons se consolident."
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Voie en 5b, en volume\n1× Voie en 5c en dévers, sans pression\n1× Technique du mois : « Crochet de talon en dévers »\n> Retour au calme salle"
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5 (si barre et épaules à l'aise)\n3× « Tractions assistées » · 5 lentes\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 à 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 23,
  "phase": "C3 · Mois 6, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n8× Bloc niveau 4 (repos 2 min)\n1× 25 min en dévers niveau 4\n1× Technique du mois : « Crochet de talon en dévers »\n> Retour au calme salle"
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 5b, en volume\n3× Essai d'enchaînement 5c en dévers (repos 10 min)\n2× Voie en 6a · « Travail au point »\n! Si cours de tête fait : tête uniquement dans les 4 et 5a, avec un assureur expérimenté.\n1× Technique du mois : « Crochet de talon en dévers »\n> Retour au calme salle"
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5 (si barre et épaules à l'aise)\n3× « Tractions assistées » · 5 lentes\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 à 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 24,
  "phase": "C3 · Mois 6, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n1× 40 min en dévers niveau 4-5\n4× Essai sur projet niveau 5 en dévers (repos 4 min)\n1× « Déplacement dynamique contrôlé » sur blocs faciles\n! Pieds toujours au mur, jamais de jeté.\n1× Technique du mois : « Crochet de talon en dévers »\n> Retour au calme salle"
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 35 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai sur ton projet 5c en dévers (repos 10 min)\n1× Voie en 6a · « Travail au point »\n1× Technique du mois : « Crochet de talon en dévers »\n> Retour au calme salle"
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5 (si barre et épaules à l'aise)\n3× « Tractions assistées » · 5 lentes\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 à 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 25,
  "phase": "C3 · Mois 6, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n6× Essai sur projet niveau 5 en dévers (repos 4 min)\n1× Technique du mois : « Crochet de talon en dévers »\n> Retour au calme salle"
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire ta 5c en dévers · compte les « sec »\n2× Voie en 5b, tranquille\n> Retour au calme salle"
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n! Semaine d'allègement : 2 séries au lieu de 3.\n2× « Planche » · 60 s\n2× « Hollow body » · 30 s\n2× « Relevés de genoux suspendu » · 5 (si barre et épaules à l'aise)\n2× « Tractions assistées » · 5 lentes\n2× « Pompes » · 10\n2× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 26,
  "phase": "C3 · Mois 6, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs du mois\n6× Bloc facile (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Voie en 5b, en volume\n1× Voie en 5c en dévers, sans pression\n1× Technique du mois : enchaîner plusieurs mouvements en gardant le gainage\n> Retour au calme salle"
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5\n3× « Tractions complètes lentes » · 2\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions complètes seulement si 3×5 assistées sont faciles et sans douleur. Sinon, reste en assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 27,
  "phase": "C3 · Mois 7, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n8× Bloc niveau 4 (repos 2 min)\n1× 25 min en dévers niveau 4\n1× Technique du mois : enchaîner plusieurs mouvements en gardant le gainage\n> Retour au calme salle"
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 5b, en volume\n3× Essai d'enchaînement 5c en dévers (repos 10 min)\n2× Voie en 6a · « Travail au point »\n! Si cours de tête fait : tête uniquement dans les 4 et 5a, avec un assureur expérimenté.\n1× Technique du mois : enchaîner plusieurs mouvements en gardant le gainage\n> Retour au calme salle"
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5\n3× « Tractions complètes lentes » · 2\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions complètes seulement si 3×5 assistées sont faciles et sans douleur. Sinon, reste en assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 28,
  "phase": "C3 · Mois 7, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n1× 40 min en dévers niveau 4-5\n4× Essai sur projet niveau 5 en dévers (repos 4 min)\n1× « Déplacement dynamique contrôlé » sur blocs faciles\n! Pieds toujours au mur, jamais de jeté.\n1× Technique du mois : enchaîner plusieurs mouvements en gardant le gainage\n> Retour au calme salle"
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai sur ton projet 5c en dévers (repos 10 min)\n1× Voie en 6a · « Travail au point »\n1× Technique du mois : enchaîner plusieurs mouvements en gardant le gainage\n> Retour au calme salle"
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5\n3× « Tractions complètes lentes » · 2\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions complètes seulement si 3×5 assistées sont faciles et sans douleur. Sinon, reste en assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 29,
  "phase": "C3 · Mois 7, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n6× Essai sur projet niveau 5 en dévers (repos 4 min)\n1× Technique du mois : enchaîner plusieurs mouvements en gardant le gainage\n> Retour au calme salle"
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire ta 5c en dévers · compte les « sec »\n2× Voie en 5b, tranquille\n> Retour au calme salle"
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n! Semaine d'allègement : 2 séries au lieu de 3.\n2× « Planche » · 60 s\n2× « Hollow body » · 30 s\n2× « Relevés de genoux suspendu » · 5\n2× « Tractions complètes lentes » · 2\n2× « Pompes » · 10\n2× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Tractions complètes seulement si 3×5 assistées sont faciles et sans douleur. Sinon, reste en assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 30,
  "phase": "C3 · Mois 7, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs du mois\n6× Bloc facile (repos 1 min)\n> Retour au calme salle"
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Voie en 5b, en volume\n1× Voie en 5c en dévers, sans pression\n1× Technique du mois : « Lecture avant de grimper » de toute la voie, repos compris\n> Retour au calme salle"
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5\n3× « Tractions complètes lentes » · 3\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Si les tractions complètes ne passent pas sans douleur, garde les assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 31,
  "phase": "C3 · Mois 8, semaine 1 (reprise)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n8× Bloc niveau 4 (repos 2 min)\n1× 25 min en dévers niveau 4\n1× Technique du mois : « Lecture avant de grimper » de toute la voie, repos compris\n> Retour au calme salle"
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n2× Voie en 5b, en volume\n3× Essai d'enchaînement 5c en dévers (repos 10 min)\n2× Voie en 6a · « Travail au point »\n! Si cours de tête fait : tête uniquement dans les 4 et 5a, avec un assureur expérimenté.\n1× Technique du mois : « Lecture avant de grimper » de toute la voie, repos compris\n> Retour au calme salle"
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5\n3× « Tractions complètes lentes » · 3\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Si les tractions complètes ne passent pas sans douleur, garde les assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 32,
  "phase": "C3 · Mois 8, semaine 2 (progression)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n1× 40 min en dévers niveau 4-5\n4× Essai sur projet niveau 5 en dévers (repos 4 min)\n1× « Déplacement dynamique contrôlé » sur blocs faciles\n! Pieds toujours au mur, jamais de jeté.\n1× Technique du mois : « Lecture avant de grimper » de toute la voie, repos compris\n> Retour au calme salle"
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 40 min de course continue (ou vélo / natation si les articulations le demandent)\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n3× Essai sur ton projet 5c en dévers (repos 10 min)\n1× Voie en 6a · « Travail au point »\n1× Technique du mois : « Lecture avant de grimper » de toute la voie, repos compris\n> Retour au calme salle"
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n3× « Planche » · 60 s\n3× « Hollow body » · 30 s\n3× « Relevés de genoux suspendu » · 5\n3× « Tractions complètes lentes » · 3\n3× « Pompes » · 10\n3× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Si les tractions complètes ne passent pas sans douleur, garde les assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 30 min de course continue, très facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 33,
  "phase": "C3 · Mois 8, semaine 3 (pic)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n6× Essai sur projet niveau 5 en dévers (repos 4 min)\n1× Technique du mois : « Lecture avant de grimper » de toute la voie, repos compris\n> Retour au calme salle"
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Mardi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× 25 min de course continue facile\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Mercredi",
  "activite": "Voie",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire ta 5c en dévers · compte les « sec »\n2× Voie en 5b, tranquille\n> Retour au calme salle"
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Vendredi",
  "activite": "Maison",
  "contenu": "> Échauffement maison\n! Semaine d'allègement : 2 séries au lieu de 3.\n2× « Planche » · 60 s\n2× « Hollow body » · 30 s\n2× « Relevés de genoux suspendu » · 5\n2× « Tractions complètes lentes » · 3\n2× « Pompes » · 10\n2× « Rowing inversé » · 10\n2× « Rotations externes à l'élastique » · 15 par bras\n2× « Extensions des doigts » · 15 (repos 30 s)\n! Si les tractions complètes ne passent pas sans douleur, garde les assistées 3×5.\n! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.\n> Mobilité"
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Samedi",
  "activite": "Course",
  "contenu": "> Course · avant\n1× Facultatif : 30 min de marche rapide\n! Allure conversation : si tu ne peux pas parler, ralentis ou marche.\n! Douleur au talon ou au tibia : reviens au palier précédent.\n> Course · après"
 },
 {
  "semaine": 34,
  "phase": "C3 · Mois 8, semaine 4 (allègement)",
  "jour": "Dimanche",
  "activite": "Bloc",
  "contenu": "> Échauffement salle\n! Semaine d'allègement : volume réduit d'un tiers.\n1× Refaire les blocs du mois\n6× Bloc facile (repos 1 min)\n> Retour au calme salle"
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
  "nom": "Travail au point",
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
  "nom": "Extensions des doigts",
  "comment": "Un élastique léger autour des doigts tendus (au niveau des bouts). Ouvre lentement la main contre la résistance, puis referme.",
  "cle": "Équilibre les muscles qui ferment la main, très sollicités en escalade. Prévention classique des douleurs de coude.",
  "depuis": "Semaine 1"
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

