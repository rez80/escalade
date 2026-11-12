// =====================================================================
// app.js — App Escalade
// Sections : 1 Réglages · 2 Outils · 3 Liste des séances · 4 Contenu et versions
// 5 Relevé · 6 Avertissements · 7 Écran séance · 8 Actions · 9 Fenêtres
// 10 Minuteur · 11 Son · 12 Écran allumé · 13 Vue semaine · 14 Exercices et réglages
// 15 Export, sauvegarde, calendrier · 16 Mise à jour · 17 Navigation
// =====================================================================

// =====================================================================
// 1. RÉGLAGES DU PROGRAMME (modifiables dans le code)
// =====================================================================
const APP_VERSION = "4.0";
const REPOS_DEFAUT = { Voie: 300, Bloc: 180, Maison: 90 };   // secondes, si la ligne n'indique rien
const COTATIONS = { Voie: ["3","4","4c","5a","5b","5c","6a","6b","6c"], Bloc: ["2","3","4","5","6","7"] };
COTATIONS["Escalade extérieur"] = COTATIONS.Voie;               // se note comme une voie
const ACTIVITES_LIBRES = ["Voie","Bloc","Maison","Course","Escalade extérieur","Autre sport"];
const JOURS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const URL_GUIDE = "https://claude.ai/artifact/1oFtL5gzb5YTDYjYvQ8vdj";   // guide d'utilisation (❓ Aide)
const DUREE_MAX = 240;                                           // minutes : au-delà, l'écran n'est plus maintenu allumé
const DUREES_CALENDRIER = { Voie: 120, Bloc: 120, Maison: 25, Course: 40, "Repos actif": 45 };

// Réglages personnels, modifiables dans l'app (écran Exercices, en bas)
const REGLAGES_DEFAUT = {
  auto: true,            // le repos démarre tout seul après un passage
  releve: true,          // demander le résultat d'une voie en touchant le rond
  son: true, volume: "moyen", silencieux: true,
  bip10: true, bip321: true, bipFin: true, bipFractions: true,
  heures: { Voie: "19:00", Bloc: "10:00", Maison: "19:00", Course: "18:30", "Repos actif": "18:00" },
  avance: 60,            // minutes avant la séance pour le rappel du calendrier
  tVoie: 4, tBloc: 1.5,  // minutes par voie et par bloc (estimation des durées)
  ajuster: true,         // remplacer ces valeurs par ta moyenne réelle après quelques séances
  mode: "programme",     // "programme" : suit le programme ; "libre" : uniquement les séances créées
  dateDebut: ""          // vide = date de début du programme (data.js)
};
let R = { ...REGLAGES_DEFAUT, ...JSON.parse(localStorage.getItem("reglages") || "{}") };
R.heures = { ...REGLAGES_DEFAUT.heures, ...R.heures };
const sauverReglages = () => localStorage.setItem("reglages", JSON.stringify(R));

// =====================================================================
// 2. OUTILS
// =====================================================================
const $ = id => document.getElementById(id);
const debutProgramme = () => R.dateDebut || DATE_DEBUT;
const esc = t => String(t ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const vide = v => v === undefined || v === null || v === "";
const pad = n => String(n).padStart(2, "0");
const jourMois = d => d.toLocaleDateString("fr-BE", { day: "2-digit", month: "2-digit" });
const mmss = s => `${Math.floor(s / 60)}:${pad(s % 60)}`;
const duree = sec => sec >= 60 ? `${String(Math.round(sec / 6) / 10).replace(".", ",")} min` : `${sec} s`;
const sansGuillemets = t => t.replace(/«\s*|\s*»/g, "");
const sansAccents = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function dateSeance(s) {   // date de début + (semaine - 1) × 7 jours + jour
  const d = new Date(debutProgramme() + "T12:00:00");
  d.setDate(d.getDate() + (s.semaine - 1) * 7 + JOURS.indexOf(s.jour));
  return d;
}
const cle = s => s.libre ? `libre-${s.id}` : `seance-${s.semaine}-${s.jour}-${s.activite}`;
const lireCle = k => JSON.parse(localStorage.getItem(k) || "{}");
const lire = s => lireCle(cle(s));
// Chaque modification garde l'état précédent de la séance (20 derniers) pour « Annuler le dernier geste »
function memoriser(k) {
  const avant = localStorage.getItem(k) || "{}";
  const p = JSON.parse(localStorage.getItem("annuler-" + k) || '{"etats":[]}');
  if (p.etats[p.etats.length - 1] !== avant) { p.etats.push(avant); if (p.etats.length > 20) p.etats.shift(); }
  p.t = Date.now(); localStorage.setItem("annuler-" + k, JSON.stringify(p));
}
const ecrireCle = (k, d) => {
  memoriser(k); d.dernierGeste = Date.now();
  const s = LISTE.find(x => cle(x) === k);
  if (s && d.debut) suivreEtape(s, d);                    // temps réel par étape (bilan de temps, moyennes)
  localStorage.setItem(k, JSON.stringify(d));
};
const ecrire = (s, d) => ecrireCle(cle(s), d);
// Nettoyage : on ne garde l'historique d'annulation que 7 jours
Object.keys(localStorage).filter(k => k.startsWith("annuler-")).forEach(k => {
  try { if (Date.now() - JSON.parse(localStorage.getItem(k)).t > 7 * 864e5) localStorage.removeItem(k); } catch { localStorage.removeItem(k); }
});
const lireMesures = sem => JSON.parse(localStorage.getItem("mesures-" + sem) || "{}");
const ecrireMesures = (sem, m) => localStorage.setItem("mesures-" + sem, JSON.stringify(m));
const estVoie = act => act !== "Bloc";
const semaineDe = date => Math.floor((date - new Date(debutProgramme() + "T00:00:00")) / 604800000) + 1;

// =====================================================================
// 3. LISTE DES SÉANCES : programme + séances libres, triées par date
// =====================================================================
let LISTE = [];
const lireLibres = () => JSON.parse(localStorage.getItem("libres") || "[]");
function reconstruire() {
  const libres = lireLibres().map(l => ({ ...l, phase: l.phase || "Séance libre", contenu: l.contenu || "", libre: true }));
  LISTE = [...(R.mode === "libre" ? [] : SEANCES), ...libres].map((s, k) => ({ ...s, ordre: k }))
    .sort((a, b) => dateSeance(a) - dateSeance(b) || a.ordre - b.ordre);
}
reconstruire();
function indexAujourdhui() {   // séance du jour, sinon la prochaine
  const auj = new Date(); auj.setHours(0, 0, 0, 0);
  if (!LISTE.length) return -1;
  const i = LISTE.findIndex(s => dateSeance(s) >= auj);
  return i === -1 ? LISTE.length - 1 : i;
}
let index = indexAujourdhui();
const courant = () => LISTE[index];
const dCourant = () => courant() ? lire(courant()) : {};   // saisies de la séance affichée (vide s'il n'y en a pas)

// =====================================================================
// 4. CONTENU : versions (## Nom) et lignes (voir le Mode d'emploi de l'Excel)
// =====================================================================
function decouper(contenu) {
  const communes = [], versions = [];
  for (const brut of contenu.split("\n")) {
    const l = brut.trim(); if (!l) continue;
    if (l.startsWith("##")) versions.push({ nom: l.slice(2).trim(), lignes: [] });
    else (versions.length ? versions[versions.length - 1].lignes : communes).push(l);
  }
  return { communes, versions };
}
function analyser(lignes) {
  return lignes.map(l => {
    if (l.startsWith(">")) return { type: "routine", nom: l.slice(1).trim() };
    if (l.startsWith("!")) return { type: "info", texte: l.slice(1).trim() };
    let n = 1, repos = null;
    const m = l.match(/^(\d+)\s*[×x]\s*/);
    if (m) { n = Number(m[1]); l = l.slice(m[0].length); }
    let force = null;                                                // « [effort] » ou « [facile] » : type d'étape imposé
    const fm = l.match(/\[(effort|facile)\]/i);
    if (fm) { force = fm[1].toLowerCase(); l = l.replace(fm[0], "").trim(); }
    let dureePrevue = null;                                          // « (durée 15 min) » : durée prévue fixée à la main
    const dp = l.match(/\(durée\s+(\d+)\s*(min|s)\)/);
    if (dp) { dureePrevue = Number(dp[1]) * (dp[2] === "min" ? 60 : 1); l = l.replace(dp[0], "").trim(); }
    const r = l.match(/\(repos\s+(\d+)\s*(min|s)\)/);
    if (r) { repos = Number(r[1]) * (r[2] === "min" ? 60 : 1); l = l.replace(r[0], "").trim(); }
    // Durée de travail : fractions « 2 min course + 2 min marche », ou la dernière durée citée (« 20 s », « 25 min »)
    let intervalle = null, travail = null;
    const iv = l.match(/(\d+)\s*min\s+course\s*\+\s*(\d+)\s*min(?:\s*(\d+))?\s+marche/i);
    if (iv) intervalle = { course: Number(iv[1]) * 60, marche: Number(iv[2]) * 60 + Number(iv[3] || 0) };
    else {
      const tous = [...l.matchAll(/(\d+)\s*(s|min)\b/g)];
      if (tous.length) { const x = tous[tous.length - 1]; travail = Number(x[1]) * (x[2] === "min" ? 60 : 1); }
    }
    const sm = l.match(/(\d+)\s+(blocs|voies)\b/i);                  // « Circuit de 4 blocs » : 4 résultats par série
    return { type: "action", texte: l, n, repos, travail, intervalle, cotes: /par côté/.test(l), serie: sm && Number(sm[1]) > 1 ? Number(sm[1]) : 0, dureePrevue, force };
  });
}
const versionsDe = s => decouper(s.contenu).versions;
const nomVersion = (s, d) => (versionsDe(s)[d.version || 0] || {}).nom || "";
function elementsDe(s, d) {
  const { communes, versions } = decouper(s.contenu);
  const v = versions[d.version || 0];
  const els = analyser([...communes, ...(v ? v.lignes : []), ...(d.ajouts || [])]);   // + exercices ajoutés pendant la séance
  els.forEach((e, i) => {                                                            // + passages faits en plus du programme
    const x = (d.extra || {})[ck(d, i)];
    if (e.type === "action" && x) { e.n += x; e.extra = x; }
  });
  return els;
}
// Clés des compteurs et routines : préfixées par la version (sauf la première)
const ck = (d, i) => (d.version ? `v${d.version}-` : "") + i;
const compte = (d, i) => (d.compteurs || {})[ck(d, i)] || 0;
const routineOk = (d, i) => !!(d.routines || {})[ck(d, i)];
const reposDe = (s, e) => e.repos ?? REPOS_DEFAUT[s.activite] ?? 0;

// =====================================================================
// 4 bis. DURÉES : prévues (écrites ou estimées), temps réel par étape, moyennes qui s'ajustent
// =====================================================================
const lireMoyennes = () => JSON.parse(localStorage.getItem("moyennes") || '{"Voie":[],"Bloc":[]}');
function tempsParPassage(type) {                     // minutes par voie ou par bloc
  const fixe = type === "Voie" ? R.tVoie : R.tBloc, m = lireMoyennes()[type] || [];
  return R.ajuster && m.length >= 3 ? m.reduce((a, b) => a + b, 0) / m.length : fixe;
}
const estEscalade = e => /voie|bloc|essai|projet|circuit/i.test(e.texte);
// Durée prévue d'un élément de séance, en secondes
function dureeElement(s, d, e) {
  if (e.type === "info") return 0;
  if (e.type === "routine") {
    const m = etapesRoutine(e.nom).reduce((t, r) => t + minutesEtape(r), 0);
    return (m || 2) * 60;
  }
  if (e.dureePrevue) return e.dureePrevue;
  const repos = reposDe(s, e), entre = Math.max(0, e.n - 1) * repos;
  if (e.intervalle) return e.n * (e.intervalle.course + e.intervalle.marche);
  if (e.travail) return e.n * (e.travail * (e.cotes ? 2 : 1) + (e.cotes ? 5 : 0)) + entre;
  if (estEscalade(e)) {
    const type = estVoie(actReleve(s, d)) && !/bloc|circuit/i.test(e.texte) ? "Voie" : "Bloc";
    return e.n * tempsParPassage(type) * 60 * Math.max(1, e.serie) + entre;
  }
  return e.n * 120 + entre;                             // autre action : 2 min par passage
}
const etapesDe = els => els.map((e, i) => ({ e, i })).filter(x => x.e.type !== "info");
const dureeTotale = (s, d) => elementsDe(s, d).reduce((t, e) => t + dureeElement(s, d, e), 0);
const hm = sec => { const m = Math.round(sec / 60); return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${pad(m % 60)}`; };

// Temps réel : à chaque changement d'étape, le temps passé est ajouté à l'étape quittée
function suivreEtape(s, d) {
  const maintenant = Date.now(), k = d.fin ? -1 : prochain(s, d);
  const ec = d.etapeEnCours;
  if (ec && ec.i === k && !d.fin) return;
  if (ec && ec.ck !== undefined) {
    d.temps = d.temps || {};
    const ecoule = Math.max(0, Math.min(maintenant, d.fin || maintenant) - ec.depuis);
    d.temps[ec.ck] = (d.temps[ec.ck] || 0) + ecoule;
    noterMoyenne(s, d, ec.i, d.temps[ec.ck]);
  }
  d.etapeEnCours = k >= 0 && !d.fin ? { i: k, ck: ck(d, k), depuis: ec ? maintenant : d.debut } : null;
}
// Moyenne réelle par voie ou par bloc (10 dernières étapes d'escalade terminées)
function noterMoyenne(s, d, i, ms) {
  const e = elementsDe(s, d)[i];
  if (!e || e.type !== "action" || !estEscalade(e) || e.travail || e.intervalle || e.dureePrevue || compte(d, i) < e.n) return;
  const type = estVoie(actReleve(s, d)) && !/bloc|circuit/i.test(e.texte) ? "Voie" : "Bloc";
  const parPassage = (ms / 1000 - Math.max(0, e.n - 1) * reposDe(s, e)) / 60 / (e.n * Math.max(1, e.serie));
  if (!(parPassage >= 0.5 && parPassage <= 20)) return;          // valeur aberrante : ignorée
  const m = lireMoyennes(); m[type] = [...(m[type] || []), Math.round(parPassage * 10) / 10].slice(-10);
  localStorage.setItem("moyennes", JSON.stringify(m));
}
// Temps passé sur l'étape en cours (en secondes)
function tempsEtapeEnCours(d) {
  const ec = d.etapeEnCours; if (!ec) return 0;
  return ((d.temps || {})[ec.ck] || 0) / 1000 + (Date.now() - ec.depuis) / 1000;
}

// Remplace « Nom d'exercice » par un lien vers son explication
function lier(texte, i) {
  return esc(texte).replace(/«\s*(.+?)\s*»/g, (tout, nom) => {
    const k = EXERCICES.findIndex(x => x.nom.toLowerCase() === nom.toLowerCase());
    return k === -1 ? tout : `<button class="exo" data-exo="${k}" data-ligne="${i}">${esc(EXERCICES[k].nom)} ⓘ</button>`;
  });
}

// =====================================================================
// 5. RELEVÉ VOIE PAR VOIE
// =====================================================================
// Une séance de voie en version « Remplacement bloc » se note comme du bloc
const actReleve = (s, d) => s.activite === "Voie" && /bloc/i.test(nomVersion(s, d)) ? "Bloc" : s.activite;
const rang = (act, cot) => (COTATIONS[act] || COTATIONS.Voie).indexOf(String(cot));
const relevable = (s, d, e) => COTATIONS[actReleve(s, d)] && !e.travail && !e.intervalle && /voie|bloc|essai|projet|circuit/i.test(e.texte);
function cotationDe(texte, act) {          // cotation proposée d'après le texte de la ligne
  const liste = COTATIONS[act] || [];
  if (act === "Bloc") { const m = texte.match(/niveau\s*(\d)/i); return m && liste.includes(m[1]) ? m[1] : ""; }
  return (texte.match(/\b\d[abc]?\b/g) || []).find(c => liste.includes(c)) || "";
}
function autoPerf(d, act) {               // voie ou bloc le plus dur réussi
  const ok = (d.voies || []).filter(v => (v.act || act) === act && (v.res === "Enchaînée" || v.res === "Réussi"));
  if (!ok.length) return "";
  ok.sort((a, b) => rang(act, b.cot) - rang(act, a.cot) || (b.profil === "Dévers") - (a.profil === "Dévers"));
  return ok[0].cot + (ok[0].profil === "Dévers" ? " dévers" : "");
}
function autoSec(d) {                     // nb de « sec » sur la voie en dévers la plus dure
  const dev = (d.voies || []).filter(v => estVoie(v.act || "Voie") && v.profil === "Dévers" && (v.res === "Enchaînée" || v.res === "Avec sec"));
  if (!dev.length) return "";
  const max = Math.max(...dev.map(v => rang("Voie", v.cot)));
  return Math.min(...dev.filter(v => rang("Voie", v.cot) === max).map(v => v.res === "Enchaînée" ? 0 : v.sec));
}
const perfFinale = (d, act) => vide(d.perf) ? (COTATIONS[act] ? autoPerf(d, act) : "") : d.perf;
const secFinal = d => vide(d.sec) ? autoSec(d) : d.sec;
const resume = v => `${v.cot} ${v.profil === "Dévers" ? "dévers" : "vertical"} ${v.res === "Avec sec" ? v.sec + " sec" : v.res.toLowerCase()}`;

function autoSemaine(sem) {               // valeurs automatiques de la semaine
  const seances = LISTE.filter(s => s.semaine === sem);
  const entrees = seances.flatMap(s => (lire(s).voies || []).map(v => ({ ...v, act: v.act || s.activite })));
  const meilleur = (act, filtre) => {
    const ok = entrees.filter(filtre);
    if (!ok.length) return "";
    ok.sort((a, b) => rang(act, b.cot) - rang(act, a.cot)); return ok[0].cot + (ok[0].profil === "Dévers" ? " dévers" : "");
  };
  const secs = seances.map(s => autoSec(lire(s))).filter(x => x !== "");
  return { sec: secs.length ? Math.min(...secs) : "",
           voie: meilleur("Voie", v => estVoie(v.act) && v.res === "Enchaînée"),
           bloc: meilleur("Bloc", v => v.act === "Bloc" && v.res === "Réussi") };
}

// =====================================================================
// 6. AVERTISSEMENTS : douleur récente, zone récurrente, effort élevé
// =====================================================================
function avertissements(s) {
  const out = [], date = dateSeance(s), zones = {};
  let derniere = null;
  for (let k = index - 1; k >= 0; k--) {
    const p = LISTE[k];
    if (date - dateSeance(p) > 14 * 864e5) break;
    const d = lire(p);
    if (!derniere && Number(d.douleur) >= 3) derniere = { p, d };
    const evts = (d.douleurs || []).length ? d.douleurs.map(x => x.zone) : (Number(d.douleur) > 0 && d.zone ? [d.zone] : []);
    evts.forEach(z => zones[z] = (zones[z] || 0) + 1);
  }
  if (derniere) out.push(`Douleur signalée le ${esc(derniere.p.jour)} ${jourMois(dateSeance(derniere.p))} (${esc(derniere.p.activite)}) :
    ${esc(derniere.d.zone || "zone non précisée")} ${derniere.d.douleur}/10. Vérifie avant de grimper : échauffement plus long,
    ménage cette zone, et arrête si la douleur revient.`);
  Object.entries(zones).filter(([, n]) => n >= 2).forEach(([z, n]) =>
    out.push(`⚠ ${esc(z)} : ${n} signalements en 14 jours. Allège, et consulte si ça continue.`));
  const efforts = [];
  for (let k = index - 1; k >= 0 && efforts.length < 2; k--) {
    const p = LISTE[k], d = lire(p);
    if (p.activite === s.activite && !vide(d.effort)) efforts.push(Number(d.effort));
  }
  if (efforts.length === 2 && efforts.every(e => e >= 8))
    out.push(`Effort élevé deux fois de suite (${efforts[1]} puis ${efforts[0]}) : fais une version allégée aujourd'hui, avec moins de passages et plus de repos.`);
  return out.map(t => `<div class="avert">${t}</div>`).join("");
}

// =====================================================================
// 7. ÉCRAN SÉANCE
// =====================================================================
let vue = "seance";          // "seance", "semaine", "exercices" ou "reglages"
let semaineVue = 1;
let ouverts = new Set();     // éléments dépliés : explications, détails, cartes repliées
let formVoie = null;         // formulaire « + Voie » manuel
const basculer = k => ouverts.has(k) ? ouverts.delete(k) : ouverts.add(k);

// Prochain élément à faire : routine non cochée ou action pas terminée (-1 = tout est fait)
function prochain(s, d) {
  const els = elementsDe(s, d);
  for (let i = 0; i < els.length; i++) {
    const e = els[i];
    if (e.type === "routine" && !routineOk(d, i)) return i;
    if (e.type === "action" && compte(d, i) < e.n) return i;
  }
  return -1;
}
const etapesRoutine = nom => ROUTINES.filter(r => r.routine === nom);
const minutesEtape = r => { const m = String(r.duree || "").match(/^(\d+) min$/); return m ? Number(m[1]) : 0; };
const routineGuidable = nom => etapesRoutine(nom).some(r => minutesEtape(r) > 0);
const titreAction = e => sansGuillemets(e.texte);
// Type d'une étape, pour sa couleur : échauffement, sécurité, facile, effort, récupération
const TYPES_ETAPE = { echauffement: "Échauffement", securite: "Sécurité", facile: "Facile", effort: "Effort", recup: "Récupération" };
function typeEtape(e) {
  if (e.type === "routine") {
    if (/^Vérif/i.test(e.nom)) return "securite";
    if (/Retour au calme|Mobilité|après/i.test(e.nom)) return "recup";
    if (/Gainage/i.test(e.nom)) return "facile";
    return "echauffement";
  }
  if (e.force) return e.force;
  if (/retour au calme|étirement|récupération/i.test(e.texte)) return "recup";
  if (/projet|essai|au point|dévers|enchaînement|tractions|pinces/i.test(e.texte)) return "effort";
  return "facile";
}

function afficherSeance() {
  const s = courant(), d = lire(s), act = s.activite;
  $("titre-date").textContent = `${s.jour.slice(0, 3)}. ${jourMois(dateSeance(s))} · sem. ${s.semaine}`;
  const versions = versionsDe(s), elements = elementsDe(s, d), k = prochain(s, d);
  const etapes = etapesDe(elements), enCours = d.debut && !d.fin, sautee = d.fait === "Sautée";
  const faite = (e, i) => e.type === "routine" ? routineOk(d, i) : e.type === "action" && compte(d, i) >= e.n;

  // --- Bandeau dans la couleur de l'activité ---
  const sousTitre = d.fin ? `✓ Faite en ${hm((d.fin - d.debut) / 1000)} · prévu ≈ ${hm(dureeTotale(s, d))}`
    : sautee ? "Séance sautée" : `≈ ${hm(dureeTotale(s, d))} · ${etapes.length} étape${etapes.length > 1 ? "s" : ""}`;
  let h = `<div class="bandeau-seance"><h1>${esc(act)}</h1><div class="phase">${esc(s.phase)}</div><div class="sous-titre">${sousTitre}</div></div>`;
  h += carteMaintenant(s, d, elements, k);
  h += avertissements(s);

  // --- Séance terminée : résumé ---
  if (d.fin) {
    const ok = (d.voies || []).filter(v => v.res === "Enchaînée" || v.res === "Réussi").length;
    h += `<div class="carte resume">
      <div class="resume-ligne"><span>Effort</span>${pastilleEchelle(d.effort)}</div>
      <div class="resume-ligne"><span>Douleur</span>${pastilleEchelle(d.douleur, d.zone)}</div>
      ${(d.voies || []).length ? `<div class="resume-ligne"><span>${estVoie(actReleve(s, d)) ? "Voies réussies" : "Blocs réussis"}</span><b>${ok} sur ${d.voies.length}</b></div>` : ""}
      ${d.notes ? `<p class="petit">« ${esc(d.notes)} »</p>` : ""}
      <div class="liens"><button class="lien" data-action="bilan">Modifier le bilan</button> · <button class="lien" data-action="reprendre">Reprendre la séance</button></div></div>`;
  }
  if (sautee) h += `<p class="petit centre">Cette séance est marquée comme sautée · <button class="lien" data-action="desauter">annuler</button></p>`;
  h += ligneDerniereFois(s);

  // --- Version : repliée une fois la séance commencée ---
  if (versions.length > 1 && !d.fin) {
    if (d.debut && !ouverts.has("versions"))
      h += `<p class="petit">Version : <b>${esc(nomVersion(s, d))}</b> · <button class="lien" data-plier="versions">changer</button></p>`;
    else h += `<div class="carte"><h2>Version</h2><div class="choix">${versions.map((v, n) =>
      `<button data-version="${n}" class="${(d.version || 0) === n ? "choisi" : ""}">${esc(v.nom)}</button>`).join("")}</div></div>`;
  }

  // --- Étapes : faites repliées pendant la séance, toutes repliées une fois terminée ---
  const numeros = {}; etapes.forEach((x, n) => numeros[x.i] = n + 1);
  const repliables = d.fin ? etapes.map(x => x.i)
    : enCours && k > 0 ? elements.map((e, i) => i).filter(i => i < k && elements[i].type !== "info" && faite(elements[i], i)) : [];
  h += `<div class="liste-etapes">`;
  if (s.libre && !elements.length) h += `<p class="petit">Séance libre : pas de programme, note simplement ce que tu fais.</p>`;
  if (repliables.length) h += `<button class="ligne-pliee" data-plier="faites">${ouverts.has("faites") ? "▾" : "▸"} ${repliables.length} étape${repliables.length > 1 ? "s" : ""} ${d.fin ? "" : "faite" + (repliables.length > 1 ? "s" : "")}</button>`;
  elements.forEach((e, i) => {
    if (repliables.includes(i) && !ouverts.has("faites")) return;
    if (d.fin && e.type === "info" && !ouverts.has("faites")) return;
    const num = numeros[i] ? { n: numeros[i], etat: i === k && !d.fin ? "▶" : faite(e, i) ? "✓" : "○", duree: dureeElement(s, d, e), type: typeEtape(e) } : null;
    if (e.type === "info") h += `<div class="ligne info">${lier(e.texte, i)}${explication(i)}</div>`;
    if (e.type === "routine") h += ligneRoutine(e, i, d, i === k && !d.fin, num);
    if (e.type === "action") h += ligneAction(s, d, e, i, i === k && !d.fin, num);
  });
  h += `</div>`;

  // --- Avant le démarrage : un seul bouton plein ---
  if (!d.debut && !sautee) h += `<button class="gros go" data-action="demarrer">▶ Commencer</button>
    <p class="petit centre"><button class="lien" data-action="sauter">Séance sautée</button></p>`;
  if (COTATIONS[actReleve(s, d)] && (d.debut || (d.voies || []).length)) h += carteReleve(d, actReleve(s, d));
  if (LISTE.map(x => x.semaine).lastIndexOf(s.semaine) === index)
    h += `<button class="gros contour" data-action="mesures">Mesures de la semaine ${s.semaine} ▸</button>`;
  if (s.libre) h += `<button class="gros contour danger" data-action="supprimer-libre">Supprimer cette séance</button>`;
  $("ecran").innerHTML = h;
}
// Échelle « terre » de 1 à 10 (effort, douleur)
const TERRE = ["#F6EEDC", "#EEDFC0", "#E2CBA0", "#D4B582", "#C29E66", "#AC864E", "#936E3B", "#7A582C", "#61431F", "#4A3219"];
const couleurEchelle = n => TERRE[Math.max(0, Math.min(9, Number(n) - 1))];
const texteEchelle = n => Number(n) >= 6 ? "#ffffff" : "#4A3219";
function pastilleEchelle(n, zone) {
  if (vide(n) || (Number(n) === 0 && !zone)) return `<span class="petit">${Number(n) === 0 ? "aucune" : "—"}</span>`;
  return `<span class="pastille-echelle" style="background:${Number(n) ? couleurEchelle(n) : "transparent"};color:${texteEchelle(n)}">${n}/10${zone ? " · " + esc(zone) : ""}</span>`;
}

// Carte « Maintenant » : l'étape en cours, fixée en haut, avec un gros bouton ✓ Fait
function carteMaintenant(s, d, els, k) {
  if (d.fin || d.fait === "Sautée") return "";
  if (!d.debut) return "";                                          // la carte apparaît au démarrage
  if (k === -1) return `<div class="maintenant"><div class="maintenant-titre">Tout est fait ✓</div>
    <div class="choix"><button class="sur-couleur" data-action="douleur" aria-label="Signaler une douleur">⚠</button>
    <button class="blanc" data-action="terminer">■ Terminer la séance</button></div></div>`;
  const e = els[k], etapes = etapesDe(els), rang = etapes.findIndex(x => x.i === k) + 1;
  const prevu = dureeElement(s, d, e), passe = d.debut ? tempsEtapeEnCours(d) : 0;
  const barre = `<div class="barre-seance">${etapes.map(x => {
    const fait = x.e.type === "routine" ? routineOk(d, x.i) : compte(d, x.i) >= x.e.n;
    return `<span class="${x.i === k ? "encours" : fait ? "fait" : ""}" style="flex-grow:${Math.max(1, dureeElement(s, d, x.e) / 60)}"></span>`;
  }).join("")}</div>`;
  const suivante = etapes.find(x => x.i > k && (x.e.type === "routine" ? !routineOk(d, x.i) : compte(d, x.i) < x.e.n));
  const temps = d.debut ? `<span id="temps-etape" data-prevu="${prevu}" class="${passe > prevu ? "retard" : ""}">${hm(passe)} sur ≈ ${hm(prevu)}</span>` : `≈ ${hm(prevu)}`;
  let titre, sous, boutons = "";
  if (e.type === "routine") {
    titre = e.nom; sous = "Routine";
    if (routineGuidable(e.nom)) boutons += `<button class="sur-couleur" data-guide="${k}">▶ Guidé</button>`;
  } else {
    titre = titreAction(e); sous = `Passage ${compte(d, k) + 1} sur ${e.n}`;
    if (e.intervalle || e.travail) boutons += `<button class="sur-couleur" data-chrono="${k}">▶ Chrono</button>`;
  }
  return `<div class="maintenant ${animer.etape ? "nouvelle" : ""}"><div class="maintenant-haut"><span>Étape ${rang} sur ${etapes.length} · ${esc(sous)}</span><span>${temps}</span></div>${barre}
    <div class="maintenant-titre">${esc(titre)}</div>
    ${suivante ? `<div class="maintenant-suite">Ensuite : ${esc(suivante.e.type === "routine" ? suivante.e.nom : titreAction(suivante.e))}</div>` : ""}
    <div class="choix"><button class="sur-couleur" data-action="douleur" aria-label="Signaler une douleur">⚠</button>${boutons}<button class="blanc" data-fait="${k}">✓ Fait</button></div></div>`;
}

// Numéro, état (✓ ▶ ○) et durée prévue d'une étape
const entete = num => num ? `<div class="num-etape"><span class="etat">${num.etat}</span> <span class="type-nom">${TYPES_ETAPE[num.type]}</span> · ${num.n}.<span class="duree-prevue">≈ ${hm(num.duree)}</span></div>` : "";
function ligneRoutine(e, i, d, actuelle, num) {
  const ok = routineOk(d, i), etapes = etapesRoutine(e.nom);
  const durees = etapes.map(r => r.duree).filter(x => x && x !== "—");
  const total = durees.length && durees.every(x => /^\d+ min$/.test(x)) ? durees.reduce((t, x) => t + parseInt(x), 0) + " min" : durees.join(" + ");
  return `<div class="ligne etape type-${num ? num.type : "facile"} ${ok ? "finie" : ""} ${actuelle ? "actuelle" : ""}" data-el="${i}">
    <button class="case ${ok ? "ok" : ""}" data-routine="${i}">✓</button>
    <div class="txt">${entete(num)}<button class="lien" data-detail="${i}">${esc(e.nom)}${total ? " · " + esc(total) : ""} ▸</button>
    ${routineGuidable(e.nom) && !ok && !actuelle ? `<div class="outils"><button data-guide="${i}">▶ Guidé</button></div>` : ""}
    ${ouverts.has("d" + i) ? `<div class="detail">${etapes.map(r =>
      `<p><b>${esc(r.etape)}</b>${r.duree && r.duree !== "—" ? " (" + esc(r.duree) + ")" : ""} : ${esc(r.quoi)}</p>`).join("")}</div>` : ""}
    </div></div>`;
}

function ligneAction(s, d, e, i, actuelle, num) {
  const c = compte(d, i), repos = reposDe(s, e);
  const marques = (e.n <= 10
    ? Array.from({ length: e.n }, (_, n) => `<button class="rond ${n < c ? "ok" : ""} ${animer.rond === `${i}-${n}` ? "nouveau" : ""} ${n >= e.n - (e.extra || 0) ? "en-plus" : ""}" data-rond="${i}" data-k="${n}">${n < c ? "✓" : ""}</button>`).join("")
    : `<div class="compteur"><button data-cpt="${i}" data-pas="-1">−</button><span>${c}/${e.n}</span><button data-cpt="${i}" data-pas="1">+</button></div>`)
    + (c >= e.n ? `<button class="rond plus" data-plus="${i}" aria-label="Un passage en plus">+</button>` : "");
  const note = (d.notesLignes || {})[ck(d, i)], avant = noteDerniereFois(e);
  let outils = "";
  if (e.intervalle) outils += `<button data-chrono="${i}">▶ ${mmss(e.intervalle.course)} / ${mmss(e.intervalle.marche)}</button>`;
  else if (e.travail) outils += `<button data-chrono="${i}">▶ ${duree(e.travail)}${e.cotes ? " × 2 côtés" : ""}</button>`;
  if (repos) outils += `<button data-repos="${i}">⏱ repos ${duree(repos)}</button>`;
  // Historique et note précédente : affichés seulement au toucher (« Dernière fois ▸ »)
  const hist = historique(e), detailsAvant = hist || (avant && !note);
  const ouvert = ouverts.has("h" + i);
  return `<div class="ligne etape type-${num ? num.type : "facile"} ${c >= e.n ? "finie" : ""} ${actuelle ? "actuelle" : ""}" data-action-ligne="${i}" data-el="${i}">
    <div class="txt">${entete(num)}${lier(e.texte, i)}${e.serie ? ` <span class="petit">(série de ${e.serie})</span>` : ""}${outils ? `<div class="outils">${outils}</div>` : ""}
    ${note ? `<div class="note">📝 ${esc(note)}</div>` : ""}
    ${detailsAvant ? `<button class="lien petit" data-plier="h${i}">Dernière fois ${ouvert ? "▾" : "▸"}</button>` : ""}
    ${detailsAvant && ouvert ? `${hist}${avant && !note ? `<div class="note ancienne">📝 ${esc(avant)}</div>` : ""}` : ""}${explication(i)}</div>
    <div class="ronds">${marques}</div></div>`;
}

const minutes = debut => Math.round((Date.now() - debut) / 60000);
// Contenu d'une fiche : but, étapes numérotées, erreurs fréquentes, version plus facile, sécurité
function corpsFiche(x, complet = true) {
  const etapes = String(x.comment || "").split("\n").map(t => t.trim()).filter(Boolean);
  return `${x.but ? `<p><b>But :</b> ${esc(x.but)}</p>` : ""}
    ${etapes.length > 1 ? `<ol class="etapes">${etapes.map(t => `<li>${esc(t)}</li>`).join("")}</ol>` : `<p>${esc(x.comment)}</p>`}
    ${complet && x.erreurs ? `<p><b>Erreurs fréquentes :</b> ${esc(x.erreurs)}</p>` : ""}
    ${x.facile ? `<p><b>Plus facile :</b> ${esc(x.facile)}</p>` : ""}
    ${x.cle ? `<p class="petit"><b>Sécurité :</b> ${esc(x.cle)}</p>` : ""}`;
}
// Note laissée sur la même ligne lors d'une séance précédente
function noteDerniereFois(e) {
  const t = sansGuillemets(e.texte);
  for (let k = index - 1; k >= 0; k--) {
    const p = LISTE[k], d = lire(p);
    if (!d.notesLignes) continue;
    const lignes = elementsDe(p, d);
    for (let i = 0; i < lignes.length; i++)
      if (lignes[i].type === "action" && sansGuillemets(lignes[i].texte) === t && d.notesLignes[ck(d, i)]) return d.notesLignes[ck(d, i)];
  }
  return "";
}
function explication(i) {
  const k = [...ouverts].find(o => o.startsWith(`e${i}-`));
  if (!k) return "";
  const x = EXERCICES[Number(k.split("-")[1])];
  return `<div class="explic"><b>${esc(x.nom)}</b>${corpsFiche(x, false)}</div>`;
}

// « La dernière fois » : une ligne repliée, le détail au toucher
function ligneDerniereFois(s) {
  for (let k = index - 1; k >= 0; k--) {
    const p = LISTE[k], d = lire(p);
    if (p.activite !== s.activite || !(d.fait || (d.voies || []).length)) continue;
    const court = [d.fait === "Oui" ? (d.duree ? d.duree + " min" : "faite") : esc(d.fait),
      !vide(d.effort) ? `effort ${d.effort}` : "", Number(d.douleur) > 0 ? `douleur ${d.douleur}` : ""].filter(Boolean).join(" · ");
    let h = `<button class="ligne-pliee" data-plier="derniere">La dernière fois (${esc(p.jour)} ${jourMois(dateSeance(p))}) : ${court} ${ouverts.has("derniere") ? "▾" : "▸"}</button>`;
    if (ouverts.has("derniere")) h += `<div class="carte">
      ${nomVersion(p, d) ? `<p class="petit">Version ${esc(nomVersion(p, d))}${d.zone ? " · zone " + esc(d.zone) : ""}</p>` : ""}
      ${(d.voies || []).length ? `<p class="petit">${d.voies.map(resume).map(esc).join(" · ")}</p>` : ""}
      ${d.notes ? `<p class="petit">« ${esc(d.notes)} »</p>` : ""}</div>`;
    return h;
  }
  return "";
}
// Historique d'un exercice : dernière séance où une ligne citait le même « exercice »
function historique(e) {
  const nom = (e.texte.match(/«\s*(.+?)\s*»/) || [])[1];
  if (!nom) return "";
  for (let k = index - 1; k >= 0; k--) {
    const p = LISTE[k], d = lire(p), lignes = elementsDe(p, d);
    for (let i = 0; i < lignes.length; i++) {
      const x = lignes[i], c = compte(d, i);
      if (x.type === "action" && c > 0 && x.texte.includes("« " + nom + " »"))
        return `<div class="petit">Dernière fois (sem. ${p.semaine}) : ${esc(sansGuillemets(x.texte))} · ${c}/${x.n}</div>`;
    }
  }
  return "";
}

// Relevé replié : « 3 voies notées ▸ » + bouton + Voie
function carteReleve(d, act) {
  const voie = estVoie(act);
  const liste = (d.voies || []).map((v, k) => ({ v, k })).filter(x => (x.v.act || act) === act);
  const mot = voie ? (liste.length > 1 ? "voies notées" : "voie notée") : (liste.length > 1 ? "blocs notés" : "bloc noté");
  let h = `<div class="carte"><div class="entete-pliee">
    <button class="lien" data-plier="releve">${liste.length} ${mot} ${ouverts.has("releve") ? "▾" : "▸"}</button>
    <button class="petit-bouton" data-form="ouvrir">+ ${voie ? "Voie" : "Bloc"}</button></div>`;
  if (ouverts.has("releve")) liste.forEach(({ v, k }) => {
    const res = v.res === "Avec sec" ? `${v.sec} « sec »` : v.res;
    h += `<div class="voie"><button class="lien" data-editer="${k}"><b>${esc(v.cot)}</b> · ${v.profil} · ${res} ✎</button><button data-suppr="${k}">✕</button></div>`;
  });
  if (ouverts.has("releve") && liste.length) h += `<p class="petit">Touche un résultat pour le corriger.</p>`;
  if (formVoie) h += formulaireResultat(formVoie, act, "form") + `<div class="actions"><button data-form="annuler">Annuler</button>
    <button data-form="ajouter" class="principal" ${formVoie.cot && formVoie.res ? "" : "disabled"}>Ajouter</button></div>`;
  return h + `</div>`;
}
// Formulaire commun : cotation, profil, résultat (et nombre de « sec »)
function formulaireResultat(f, act, attr) {
  const choix = (champ, liste) => `<div class="choix">${liste.map(v =>
    `<button data-${attr}="${champ}" data-valeur="${v}" class="${String(f[champ]) === String(v) ? "choisi" : ""}">${v}</button>`).join("")}</div>`;
  const segment = (champ, liste) => `<div class="segment">${liste.map(v =>
    `<button data-${attr}="${champ}" data-valeur="${v}" class="${String(f[champ]) === String(v) ? "choisi" : ""}">${v}</button>`).join("")}</div>`;
  const CLASSE = { "Enchaînée": "res-ok", "Réussi": "res-ok", "Avec sec": "res-sec", "Pas finie": "res-non", "Pas réussi": "res-non" };
  const resultats = `<div class="resultats">${(estVoie(act) ? ["Enchaînée", "Avec sec", "Pas finie"] : ["Réussi", "Pas réussi"]).map(v =>
    `<button data-${attr}="res" data-valeur="${v}" class="${CLASSE[v]} ${f.res === v ? "choisi" : ""}">${v === "Enchaînée" || v === "Réussi" ? "✓ " : ""}${v === "Avec sec" ? "Avec « sec »" : v}</button>`).join("")}</div>`;
  return `<label class="champ">Cotation</label>${choix("cot", COTATIONS[act])}
    <label class="champ">Profil</label>${segment("profil", ["Vertical", "Dévers"])}
    <label class="champ">Résultat</label>${resultats}
    ${f.res === "Avec sec" ? `<label class="champ">Nombre de « sec »</label><div class="compteur">
      <button data-${attr}="sec" data-pas="-1">−</button><span>${f.sec}</span><button data-${attr}="sec" data-pas="1">+</button></div>` : ""}`;
}

const CHAMPS_MESURES = [["planche","Planche (s)","number"],["course","Course continue la plus longue (min)","number"],
  ["sec","Nb de « sec » dans la voie en dévers suivie","number"],["voie","Voie la plus dure réussie sans « sec »","text"],
  ["bloc","Bloc le plus dur réussi","text"],["tractions","Tractions (nb, assistées ou non)","text"],["notes","Notes de la semaine","text"]];

// Défilement automatique vers la prochaine étape
function allerAuSuivant() {
  setTimeout(() => {
    const s = courant(); if (!s || vue !== "seance") return;
    const el = document.querySelector(`[data-el="${prochain(s, lire(s))}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 120);
}

// =====================================================================
// 8. ACTIONS SUR L'ÉCRAN SÉANCE (un seul écouteur pour tous les boutons)
// =====================================================================
function modifier(fn) { const s = courant(), d = lire(s); fn(d); ecrire(s, d); afficher(false); }
// La séance démarre toute seule au premier passage
function demarrerSiBesoin(d) { if (!d.debut && !d.fin) { d.debut = Date.now(); if (d.fait === "Sautée") delete d.fait; return true; } return false; }

$("ecran").addEventListener("click", e => {
  if (vue !== "seance") return;
  if (appuiLong) { appuiLong = false; return; }                  // un appui long ne compte pas comme un passage
  const b = e.target.closest("button"), t = b ? b.dataset : {};
  if (b && t.action === "menu") return ouvrirModal({ type: "menu" });
  if (b && t.action === "douleur") return ouvrirModal({ type: "douleur" });
  if (b && t.plus !== undefined) {                                // un passage en plus du programme
    const i = Number(t.plus), s = courant(), d = lire(s);
    d.extra = d.extra || {}; d.extra[ck(d, i)] = (d.extra[ck(d, i)] || 0) + 1; ecrire(s, d);
    return compter(i, compte(lire(s), i) + 1);
  }
  if (b && t.editer !== undefined) return ouvrirResultat(null, Number(t.editer));
  if (b && t.exo !== undefined) {                          // explication : 1 appui ouvre, 2e ferme
    const k = `e${t.ligne}-${t.exo}`, etaitOuvert = ouverts.has(k);
    [...ouverts].filter(o => o.startsWith(`e${t.ligne}-`)).forEach(o => ouverts.delete(o));
    if (!etaitOuvert) ouverts.add(k);
    return afficher(false);
  }
  if (b && t.plier) { basculer(t.plier); return afficher(false); }
  if (b && t.detail !== undefined) { basculer("d" + t.detail); return afficher(false); }
  if (b && t.routine !== undefined) return cocherRoutine(Number(t.routine));
  if (b && t.fait !== undefined) return passageFait(Number(t.fait));
  if (b && t.version !== undefined) { ouverts = new Set(); return modifier(d => { d.version = Number(t.version); }); }
  if (b && t.rond !== undefined) { const c = compte(lire(courant()), t.rond); return compter(Number(t.rond), Number(t.k) < c ? Number(t.k) : Number(t.k) + 1); }
  if (b && t.cpt !== undefined) return compter(Number(t.cpt), compte(lire(courant()), t.cpt) + Number(t.pas));
  if (b && t.chrono !== undefined) return lancerChrono(Number(t.chrono));
  if (b && t.guide !== undefined) return lancerGuide(Number(t.guide));
  if (b && t.repos !== undefined) return lancerRepos(Number(t.repos));
  if (b && t.action === "demarrer") { modifier(d => { d.debut = Date.now(); delete d.fin; delete d.fait; }); garderEcran(); return allerAuSuivant(); }
  if (b && t.action === "sauter") return modifier(d => { d.fait = "Sautée"; });
  if (b && t.action === "desauter") return modifier(d => { delete d.fait; });
  if (b && t.action === "terminer") return terminer();
  if (b && t.action === "bilan") return ouvrirBilan("Bilan de la séance");
  if (b && t.action === "mesures") return ouvrirModal({ type: "mesures", sem: courant().semaine });
  if (b && t.action === "reprendre") { modifier(d => { delete d.fin; }); return garderEcran(); }
  if (b && t.action === "supprimer-libre") {
    if (!confirm("Supprimer cette séance et ses saisies ?")) return;
    const s = courant();
    localStorage.setItem("libres", JSON.stringify(lireLibres().filter(l => l.id !== s.id)));
    localStorage.removeItem(cle(s));
    reconstruire(); return ouvrirSemaine(s.semaine);
  }
  if (b && t.form) return actionFormVoie(t);
  if (b && t.suppr !== undefined) { if (confirm("Supprimer cette ligne ?")) modifier(d => d.voies.splice(Number(t.suppr), 1)); return; }
  // Appui n'importe où sur une ligne d'action = un passage de plus
  const ligne = e.target.closest("[data-action-ligne]");
  if (ligne && !b) { const i = Number(ligne.dataset.actionLigne); compter(i, compte(lire(courant()), i) + 1); }
});

// ✓ Fait (carte « Maintenant » ou minuteur) : coche la routine ou compte un passage
function passageFait(i) {
  const s = courant(), e = elementsDe(s, lire(s))[i];
  if (!e) return;
  if (e.type === "routine") return cocherRoutine(i, true);
  compter(i, compte(lire(s), i) + 1);
}
function cocherRoutine(i, forcer = false) {
  const s = courant(), d = lire(s), k = ck(d, i);
  d.routines = d.routines || {};
  d.routines[k] = forcer ? true : !d.routines[k];
  const demarre = d.routines[k] && demarrerSiBesoin(d);
  ecrire(s, d); afficher(false);
  if (demarre) garderEcran();
  if (d.routines[k]) allerAuSuivant();
}

// Compte un passage. Si c'est une voie ou un bloc, propose de noter le résultat, puis lance le repos.
let derniereAction = null, minuterieToast = null;
let animer = {};                                   // ce qui vient de changer (pour une petite animation)
function compter(i, nouveau) {
  const s = courant(), d = lire(s), e = elementsDe(s, d)[i], avant = compte(d, i);
  nouveau = Math.max(0, Math.min(e.n, nouveau));
  const demarre = nouveau > avant && demarrerSiBesoin(d);
  d.compteurs = d.compteurs || {}; d.compteurs[ck(d, i)] = nouveau;
  animer = nouveau > avant ? { rond: `${i}-${nouveau - 1}`, etape: true } : {};
  ecrire(s, d); afficher(false); animer = {};
  if (demarre) garderEcran();
  if (nouveau <= avant) return;
  derniereAction = { cle: cle(s), ck: ck(d, i), i, avant, voie: false, repos: false };
  if (R.releve && relevable(s, d, e)) return e.serie ? ouvrirCircuit(i) : ouvrirResultat(i);   // « Annuler » viendra à la fermeture
  montrerToast();
  apresPassage(i);
}
function apresPassage(i) {
  const s = courant(), e = elementsDe(s, lire(s))[i];
  if (R.auto && reposDe(s, e) > 0) { lancerRepos(i); if (derniereAction && derniereAction.i === i) derniereAction.repos = true; }
  allerAuSuivant();
}

// Bandeau « Passage noté · Annuler » pendant 5 secondes
// Place le bandeau juste au-dessus du minuteur (ou en haut quand le minuteur est en plein écran)
function placerToast() {
  const t = $("toast"), m = $("minuteur");
  if (t.style.display !== "flex") return;
  if (m.classList.contains("plein")) { t.style.top = "calc(20px + env(safe-area-inset-top))"; t.style.bottom = "auto"; return; }
  const h = m.style.display === "flex" ? m.offsetHeight + 8 : 0;
  t.style.top = "auto"; t.style.bottom = `calc(${80 + h}px + env(safe-area-inset-bottom))`;
}
function montrerToast() {
  $("toast").style.display = "flex"; placerToast();
  clearTimeout(minuterieToast);
  minuterieToast = setTimeout(() => { $("toast").style.display = "none"; derniereAction = null; }, 5000);
}
$("toast-annuler").onclick = () => {
  const a = derniereAction; if (!a) return;
  const d = lireCle(a.cle);
  d.compteurs = d.compteurs || {}; d.compteurs[a.ck] = a.avant;
  for (let n = 0; n < (a.voie || 0) && d.voies; n++) { const k = d.voies.map(v => v.ligne).lastIndexOf(a.i); if (k >= 0) d.voies.splice(k, 1); }
  localStorage.setItem(a.cle, JSON.stringify(d));
  if (T && T.cle === a.cle && T.ck === a.ck) { T = null; sauverT(); majMinuteur(); }
  if (M && M.type === "resultat") fermerModal();
  $("toast").style.display = "none"; derniereAction = null;
  afficher(false);
};

function actionFormVoie(t) {
  const s = courant(), d = lire(s), act = actReleve(s, d);
  if (t.form === "ouvrir") { const der = (d.voies || []).filter(v => (v.act || act) === act).slice(-1)[0];
    formVoie = { cot: der ? der.cot : "", profil: der ? der.profil : "Vertical", res: "", sec: 1 }; ouverts.add("releve"); }
  else if (t.form === "annuler") formVoie = null;
  else if (t.form === "sec") formVoie.sec = Math.max(1, formVoie.sec + Number(t.pas));
  else if (t.form === "ajouter") {
    const v = { ...formVoie, act }; if (v.res !== "Avec sec") delete v.sec;
    formVoie = null; return modifier(d => { d.voies = d.voies || []; d.voies.push(v); });
  } else formVoie[t.form] = t.valeur;
  afficher(false);
}

function terminer() {
  modifier(d => { d.fin = Date.now(); d.duree = Math.min(DUREE_MAX, Math.max(1, Math.round((d.fin - d.debut) / 60000))); d.fait = "Oui"; });
  libererEcran();
  ouvrirBilan("Séance terminée");
}
function ouvrirBilan(titre) {
  const d = lire(courant());
  ouvrirModal({ type: "fin", titre, effort: d.effort, douleur: d.douleur, zone: d.zone, duree: d.duree, notes: d.notes || "" });
}

// =====================================================================
// 9. FENÊTRES : bilan, résultat d'un passage, douleur, mesures de la semaine
// =====================================================================
let M = null;   // fenêtre ouverte
function ouvrirModal(etat) { M = etat; afficherModal(); $("fond-modal").style.display = "flex"; }
function fermerModal() { M = null; $("fond-modal").style.display = "none"; }

// Résultat : cotation et profil repris du passage précédent (même ligne, sinon texte de la ligne, sinon dernier noté)
function ouvrirResultat(i, edit) {
  if (edit !== undefined) {                                      // corriger un résultat déjà noté
    const v = lire(courant()).voies[edit];
    return ouvrirModal({ type: "resultat", edit, ligne: v.ligne, act: v.act || actReleve(courant(), lire(courant())), cot: v.cot, profil: v.profil, res: v.res, sec: v.sec || 1 });
  }
  const s = courant(), d = lire(s), act = actReleve(s, d), e = elementsDe(s, d)[i];
  const notes = (d.voies || []).filter(v => (v.act || act) === act);
  const memeLigne = notes.filter(v => v.ligne === i).slice(-1)[0], dernier = notes.slice(-1)[0];
  const cot = memeLigne ? memeLigne.cot : cotationDe(e.texte, act) || (dernier ? dernier.cot : "");
  const profil = memeLigne ? memeLigne.profil : /dévers/i.test(e.texte) ? "Dévers" : (dernier ? dernier.profil : "Vertical");
  ouvrirModal({ type: "resultat", ligne: i, act, cot, profil, res: "", sec: 1 });
}
function enregistrerResultat() {
  const etat = M; fermerModal();
  const v = { cot: etat.cot, profil: etat.profil, res: etat.res, act: etat.act, ligne: etat.ligne };
  if (etat.res === "Avec sec") v.sec = etat.sec;
  if (etat.edit !== undefined) return modifier(d => { d.voies[etat.edit] = v; });   // correction : rien d'autre
  modifier(d => { d.voies = d.voies || []; d.voies.push(v); });
  if (derniereAction && derniereAction.i === etat.ligne) { derniereAction.voie = 1; montrerToast(); }
  apresPassage(etat.ligne);
}

// Circuit : un résultat par bloc de la série
function ouvrirCircuit(i) {
  const s = courant(), d = lire(s), act = actReleve(s, d), e = elementsDe(s, d)[i];
  const notes = (d.voies || []).filter(v => (v.act || act) === act), memeLigne = notes.filter(v => v.ligne === i).slice(-1)[0], dernier = notes.slice(-1)[0];
  const cot = memeLigne ? memeLigne.cot : cotationDe(e.texte, act) || (dernier ? dernier.cot : COTATIONS[act][1]);
  const profil = memeLigne ? memeLigne.profil : /dévers/i.test(e.texte) ? "Dévers" : "Vertical";
  ouvrirModal({ type: "circuit", ligne: i, act, profil, serie: compte(d, i), n: e.n,
                items: Array.from({ length: e.serie }, () => ({ cot, ok: true })) });
}
function enregistrerCircuit() {
  const etat = M; fermerModal();
  const voie = estVoie(etat.act);
  modifier(d => { d.voies = d.voies || [];
    etat.items.forEach(it => d.voies.push({ cot: it.cot, profil: etat.profil, act: etat.act, ligne: etat.ligne,
      res: it.ok ? (voie ? "Enchaînée" : "Réussi") : (voie ? "Pas finie" : "Pas réussi") })); });
  if (derniereAction && derniereAction.i === etat.ligne) { derniereAction.voie = etat.items.length; montrerToast(); }
  apresPassage(etat.ligne);
}
// Liste d'exercices rangée par discipline (création de séance et ajout en cours de séance)
function optionsExercices(choisi) {
  let cat = "";
  return EXERCICES.map(x => { let o = ""; const g = `${x.discipline} · ${x.categorie}`;
    if (g !== cat) { o += (cat ? "</optgroup>" : "") + `<optgroup label="${esc(g)}">`; cat = g; }
    return o + `<option ${choisi === x.nom ? "selected" : ""}>${esc(x.nom)}</option>`; }).join("") + "</optgroup>";
}
// Séance restée ouverte depuis un jour précédent
function verifierSeanceOuverte() {
  const auj = new Date(); auj.setHours(0, 0, 0, 0);
  const k = LISTE.findIndex(s => { const d = lire(s); return d.debut && !d.fin && d.debut < auj.getTime(); });
  if (k < 0) return;
  const d = lire(LISTE[k]);
  const dureeMin = Math.max(1, Math.min(DUREE_MAX, d.dernierGeste && d.dernierGeste > d.debut ? Math.round((d.dernierGeste - d.debut) / 60000) + 10 : 90));
  ouvrirModal({ type: "hier", k, duree: dureeMin });
}

// Bilan de temps : durée réelle de la séance et de chaque étape, comparée au prévu
function bilanTemps() {
  const s = courant(), d = lire(s); if (!d.debut || !d.fin) return "";
  const els = elementsDe(s, d), lignes = etapesDe(els).filter(x => (d.temps || {})[ck(d, x.i)]);
  return `<details class="bilan-temps"><summary>Séance faite en ${hm((d.fin - d.debut) / 1000)} (prévu ≈ ${hm(dureeTotale(s, d))}) ▸</summary>
    ${lignes.map((x, n) => `<div class="voie"><span>${esc(x.e.type === "routine" ? x.e.nom : titreAction(x.e))}</span>
      <span class="petit">${hm(d.temps[ck(d, x.i)] / 1000)} / ≈ ${hm(dureeElement(s, d, x.e))}</span></div>`).join("")}</details>`;
}

function afficherModal() {
  const choix = (champ, liste) => `<div class="choix">${liste.map(v =>
    `<button data-m="${champ}" data-valeur="${v}" class="${String(M[champ]) === String(v) ? "choisi" : ""}">${v}</button>`).join("")}</div>`;
  const serie = (a, b) => Array.from({ length: b - a + 1 }, (_, n) => a + n);
  const zones = ZONES.filter(z => z !== "Aucune");
  // Échelle « terre » : toutes les valeurs visibles, atténuées ; la valeur choisie en pleine couleur
  const echelle = (champ, a) => `<div class="echelle">${serie(a, 10).map(v => {
    const ch = String(M[champ]) === String(v);
    return `<button data-m="${champ}" data-valeur="${v}" class="${ch ? "choisi" : ""}" style="background:${v ? couleurEchelle(v) : "var(--carte)"};color:${v ? texteEchelle(v) : "var(--texte)"}">${v}</button>`;
  }).join("")}</div>`;
  let h = "";
  if (M.type === "fin") h = `<h2>${esc(M.titre)}</h2>${bilanTemps()}
      <label class="champ">Effort (1 à 10)</label>${echelle("effort", 1)}
      <label class="champ">Douleur max (0 à 10)</label>${echelle("douleur", 0)}
      ${M.douleur > 0 ? `<label class="champ">Zone</label>${choix("zone", zones)}` : ""}
      ${M.douleur >= 5 ? `<div class="alerte">5 ou plus : repos, glace, et consulte si ça dure.</div>` : ""}
      <label class="champ">Durée (min)</label><input type="number" inputmode="numeric" id="m-duree" value="${esc(M.duree)}">
      <label class="champ">Notes (facultatif)</label><textarea id="m-notes" placeholder="Le micro du clavier permet de dicter">${esc(M.notes)}</textarea>
      <div class="actions"><button data-m="fermer">Plus tard</button><button data-m="ok" class="principal">Enregistrer</button></div>`;
  if (M.type === "resultat") h = `<h2>${M.edit !== undefined ? "Corriger ce résultat" : "Résultat de ce passage"}</h2>` + formulaireResultat(M, M.act, "m") +
      `<p class="petit">Touche le résultat pour l'enregistrer directement.</p>
       <div class="actions"><button data-m="fermer">Passer</button>
       ${M.res === "Avec sec" || !M.cot ? `<button data-m="ok" class="principal" ${M.cot && M.res ? "" : "disabled"}>Enregistrer</button>` : ""}</div>`;
  if (M.type === "douleur") h = `<h2>Signaler une douleur</h2><p class="petit">Séance : ${esc(courant().jour)} ${esc(courant().activite)}</p>
      <label class="champ">Zone</label>${choix("zone", zones)}
      <label class="champ">Niveau</label>${echelle("niv", 1)}
      ${M.niv >= 5 ? `<div class="alerte">5 ou plus : arrête l'exercice maintenant.</div>` : ""}
      <div class="actions"><button data-m="fermer">Annuler</button>
      <button data-m="ok" class="principal" ${M.zone && M.niv ? "" : "disabled"}>Enregistrer</button></div>`;
  if (M.type === "menu") {
    const k = cle(courant()), pile = JSON.parse(localStorage.getItem("annuler-" + k) || '{"etats":[]}').etats;
    const d = lire(courant()), ligne = (m, icone, texte, sous = "", cl = "") =>
      `<button class="ligne-menu ${cl}" data-m="${m}"><span class="icone">${icone}</span><span><span class="titre-menu">${texte}</span>${sous ? `<span class="sous-menu">${sous}</span>` : ""}</span></button>`;
    h = `<h2>Séance</h2><div class="menu-liste">
      ${d.debut && !d.fin ? ligne("terminer", "■", "Terminer la séance", "même si toutes les étapes ne sont pas faites") : ""}
      ${pile.length ? ligne("annuler", "↶", "Annuler le dernier geste", `${pile.length} possible${pile.length > 1 ? "s" : ""}`) : ""}
      ${ligne("exos", "📖", "Exercices de cette séance")}
      ${ligne("ajout", "+", "Ajouter un exercice à cette séance")}
      ${ligne("note-etape", "📝", "Note sur l'étape en cours", "ou appui long sur une ligne")}
      ${ligne("douleur", "⚠", "Signaler une douleur")}
      <div class="separateur"></div>
      ${ligne("reinit", "⟲", "Réinitialiser la séance", "", "danger")}</div>
      <div class="actions"><button data-m="fermer">Fermer</button></div>`;
  }
  if (M.type === "circuit") {
    const res = estVoie(M.act) ? ["Enchaînée", "Pas finie"] : ["Réussi", "Raté"];
    h = `<h2>Série ${M.serie} sur ${M.n} · ${M.items.length} ${estVoie(M.act) ? "voies" : "blocs"}</h2>
      <label class="champ">Profil</label>${choix("profil", ["Vertical", "Dévers"])}
      ${M.items.map((it, j) => `<div class="circuit-ligne"><b>${estVoie(M.act) ? "Voie" : "Bloc"} ${j + 1}</b>
        <div class="choix compact">${COTATIONS[M.act].map(c => `<button data-m="ccot" data-j="${j}" data-valeur="${c}" class="${String(it.cot) === c ? "choisi" : ""}">${c}</button>`).join("")}</div>
        <div class="choix compact">${res.map((r, n) => `<button data-m="cok" data-j="${j}" data-valeur="${n === 0}" class="${n === 0 ? "res-ok" : "res-non"} ${it.ok === (n === 0) ? "choisi" : ""}">${n === 0 ? "✓ " : "✗ "}${r}</button>`).join("")}</div></div>`).join("")}
      <div class="actions"><button data-m="fermer">Passer</button><button data-m="tout">Tout réussi</button><button data-m="ok" class="principal">Enregistrer</button></div>`;
  }
  if (M.type === "ajout") {
    h = `<h2>Ajouter un exercice à cette séance</h2>
      <select id="m-exo"><option value="">Choisir un exercice…</option>${optionsExercices(M.exo)}</select>
      <label class="champ">Séries ou passages</label>
      <div class="compteur"><button data-m="series" data-pas="-1">−</button><span>${M.series}</span><button data-m="series" data-pas="1">+</button></div>
      <label class="champ">Détail (facultatif)</label><input type="text" id="m-detail" value="${esc(M.detail)}" placeholder="ex. 30 s · 8 · 3 min">
      <label class="champ">Repos</label>${choix("repos", [0, 30, 60, 90, 180, 300])}
      <label class="champ">Durée prévue (min)</label>${choix("dureeAj", [0, 5, 10, 15, 20, 30])}
      <p class="petit">0 = repos par défaut de la séance, ou durée estimée automatiquement. L'exercice s'ajoute à la fin de la séance du jour.</p>
      <div class="actions"><button data-m="fermer">Annuler</button><button data-m="ok" class="principal" ${M.exo ? "" : "disabled"}>Ajouter</button></div>`;
  }
  if (M.type === "note") {
    const e = elementsDe(courant(), lire(courant()))[M.ligne];
    h = `<h2>Note sur cette ligne</h2><p class="petit">${esc(e ? (e.type === "routine" ? e.nom : sansGuillemets(e.texte)) : "")}</p>
      <textarea id="m-note" placeholder="ex. prise rouge glissante · méthode : pied gauche haut">${esc(M.texte)}</textarea>
      <p class="petit">La note réapparaîtra sur la même ligne la prochaine fois. Laisse vide pour l'effacer.</p>
      <div class="actions"><button data-m="fermer">Annuler</button><button data-m="ok" class="principal">Enregistrer</button></div>`;
  }
  if (M.type === "hier") {
    const s = LISTE[M.k], d = lire(s);
    h = `<h2>Séance restée ouverte</h2>
      <p>La séance <b>${esc(s.activite)}</b> du ${esc(s.jour)} ${jourMois(dateSeance(s))} a été démarrée à
      ${new Date(d.debut).toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" })} mais jamais terminée.</p>
      <label class="champ">Durée réelle (min)</label><input type="number" inputmode="numeric" id="m-duree-hier" value="${M.duree}">
      <p class="petit">Durée estimée d'après ta dernière saisie. Corrige-la si besoin.</p>
      <div class="actions"><button data-m="fermer">Plus tard</button><button data-m="ok" class="principal">Terminer cette séance</button></div>`;
  }
  if (M.type === "mesures") {
    const m = lireMesures(M.sem), a = autoSemaine(M.sem);
    h = `<h2>Mesures de la semaine ${M.sem}</h2>` + CHAMPS_MESURES.map(([c, lab, type]) =>
      `<label class="champ">${lab}</label><input type="${type}" ${type === "number" ? 'inputmode="numeric"' : ""}
        data-mesure="${c}" value="${esc(m[c])}" placeholder="${!vide(a[c]) ? "Auto : " + esc(a[c]) : ""}">`).join("") +
      `<p class="petit">Les valeurs « Auto » viennent de ton relevé ; ce que tu tapes a la priorité.</p>
       <div class="actions"><button data-m="fermer" class="principal">Fermer</button></div>`;
  }
  $("modal").innerHTML = h;
}
$("modal").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b || !M) return;
  const t = b.dataset, type = M.type;
  if (type === "menu" && t.m && t.m !== "fermer") return actionMenu(t.m);
  if (type === "circuit" && ["ccot", "cok", "tout"].includes(t.m)) {
    if (t.m === "ccot") M.items[Number(t.j)].cot = t.valeur;
    if (t.m === "cok") M.items[Number(t.j)].ok = t.valeur === "true";
    if (t.m === "tout") { M.items.forEach(it => it.ok = true); return enregistrerCircuit(); }
    return afficherModal();
  }
  if (t.m === "fermer") {
    const i = M.ligne, edit = M.edit; fermerModal();
    if ((type === "resultat" && edit === undefined) || type === "circuit") { if (derniereAction && derniereAction.i === i) montrerToast(); apresPassage(i); }
    if (type === "mesures") afficher(false);
    return;
  }
  if (t.m === "ok") {
    if (type === "resultat") return enregistrerResultat();
    if (type === "circuit") return enregistrerCircuit();
    if (type === "ajout") {
      const etat = M; fermerModal();
      const ligne = `${etat.series}× « ${etat.exo} »${etat.detail.trim() ? " · " + etat.detail.trim() : ""}${etat.repos ? ` (repos ${etat.repos} s)` : ""}${etat.dureeAj ? ` (durée ${etat.dureeAj} min)` : ""}`;
      modifier(d => { d.ajouts = d.ajouts || []; d.ajouts.push(ligne); });
      return allerAuSuivant();
    }
    if (type === "note") {
      const etat = M; fermerModal();
      return modifier(d => { d.notesLignes = d.notesLignes || {}; const k = ck(d, etat.ligne);
        if (etat.texte.trim()) d.notesLignes[k] = etat.texte.trim(); else delete d.notesLignes[k]; });
    }
    if (type === "hier") {
      const etat = M; fermerModal();
      const s = LISTE[etat.k], d = lire(s), duree = Math.max(1, Math.min(DUREE_MAX, Number(etat.duree) || 90));
      d.fin = d.debut + duree * 60000; d.duree = duree; d.fait = "Oui"; ecrire(s, d);
      libererEcran(); changer(etat.k);
      return ouvrirBilan("Bilan de la séance");
    }
    const etat = M; fermerModal();
    if (type === "fin") return modifier(d => {
      d.effort = etat.effort ?? d.effort; d.douleur = etat.douleur ?? d.douleur;
      if (etat.zone) d.zone = etat.zone;
      if (!vide(etat.duree)) d.duree = Number(etat.duree);
      d.notes = etat.notes; d.fait = "Oui";
    });
    if (type === "douleur") return modifier(d => {
      d.douleurs = d.douleurs || [];
      d.douleurs.push({ zone: etat.zone, niv: etat.niv, heure: new Date().toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" }) });
      if (etat.niv >= (Number(d.douleur) || 0)) { d.douleur = etat.niv; d.zone = etat.zone; }   // garde la plus forte
      else if (!d.zone) d.zone = etat.zone;
    });
  }
  if (t.m === "series") { M.series = Math.max(1, Math.min(20, M.series + Number(t.pas))); return afficherModal(); }
  if (t.m === "repos") { M.repos = Number(t.valeur); return afficherModal(); }
  if (t.m === "dureeAj") { M.dureeAj = Number(t.valeur); return afficherModal(); }
  if (t.m === "sec") M.sec = Math.max(1, M.sec + Number(t.pas));
  else if (t.m) M[t.m] = ["effort", "douleur", "niv"].includes(t.m) ? Number(t.valeur) : t.valeur;   // les cotations restent du texte
  // Résultat en deux appuis : toucher un résultat (sauf « Avec sec ») enregistre directement
  if (type === "resultat" && t.m === "res" && M.res !== "Avec sec" && M.cot) return enregistrerResultat();
  afficherModal();
});
$("modal").addEventListener("input", e => {             // champs texte des fenêtres (sans réafficher)
  if (!M) return;
  if (e.target.id === "m-duree") M.duree = e.target.value;
  if (e.target.id === "m-notes") M.notes = e.target.value;
  if (e.target.id === "m-note") M.texte = e.target.value;
  if (e.target.id === "m-detail") M.detail = e.target.value;
  if (e.target.id === "m-duree-hier") M.duree = e.target.value;
  if (e.target.dataset.mesure) {
    const m = lireMesures(M.sem), v = e.target.value;
    m[e.target.dataset.mesure] = e.target.type === "number" && v !== "" ? Number(v) : v; ecrireMesures(M.sem, m);
  }
});
$("modal").addEventListener("change", e => {
  if (M && M.type === "ajout" && e.target.id === "m-exo") { M.exo = e.target.value; afficherModal(); }
});
// Actions du menu ⋯
function actionMenu(a) {
  const s = courant(), k = cle(s);
  if (a === "annuler") {
    const p = JSON.parse(localStorage.getItem("annuler-" + k) || '{"etats":[]}');
    const prec = p.etats.pop(); if (prec === undefined) return;
    localStorage.setItem(k, prec); p.t = Date.now(); localStorage.setItem("annuler-" + k, JSON.stringify(p));
    if (T && T.cle === k) { T = null; sauverT(); majMinuteur(); }
    derniereAction = null; $("toast").style.display = "none";
    afficher(false); return afficherModal();                       // le menu reste ouvert pour annuler encore
  }
  if (a === "reinit") {
    if (!confirm("Réinitialiser cette séance ? Passages, résultats, douleurs et bilan seront effacés (tu pourras encore annuler).")) return;
    memoriser(k); localStorage.setItem(k, "{}");
    if (T && T.cle === k) { T = null; sauverT(); majMinuteur(); }
    derniereAction = null; $("toast").style.display = "none"; libererEcran();
    fermerModal(); ouverts = new Set(); return afficher();
  }
  if (a === "terminer") { fermerModal(); return terminer(); }
  if (a === "douleur") return ouvrirModal({ type: "douleur" });
  if (a === "exos") { fermerModal(); return ouvrirBiblio({ ecran: "liste", filtre: "seance" }); }
  if (a === "ajout") return ouvrirModal({ type: "ajout", exo: "", series: 3, detail: "", repos: 0, dureeAj: 0 });
  if (a === "note-etape") {
    const d = lire(s), i = prochain(s, d), els = elementsDe(s, d);
    const ligne = i >= 0 ? i : els.length - 1;
    return ouvrirModal({ type: "note", ligne, texte: (d.notesLignes || {})[ck(d, ligne)] || "" });
  }
}
// Appui long sur une ligne : note
let appuiLong = false, minuterieAppui = null, departAppui = null;
$("ecran").addEventListener("pointerdown", e => {
  if (vue !== "seance") return;
  const el = e.target.closest("[data-el]"); if (!el || e.target.closest(".exo, .outils, .rond")) return;
  departAppui = { x: e.clientX, y: e.clientY };
  minuterieAppui = setTimeout(() => {
    appuiLong = true; const i = Number(el.dataset.el), d = lire(courant());
    ouvrirModal({ type: "note", ligne: i, texte: (d.notesLignes || {})[ck(d, i)] || "" });
  }, 600);
});
["pointerup", "pointercancel", "pointerleave"].forEach(ev => $("ecran").addEventListener(ev, () => clearTimeout(minuterieAppui)));
$("ecran").addEventListener("pointermove", e => {
  if (departAppui && Math.hypot(e.clientX - departAppui.x, e.clientY - departAppui.y) > 10) clearTimeout(minuterieAppui);
});


// =====================================================================
// 10. MINUTEUR : repos, exercices en durée, fractions de course, échauffement guidé
// État enregistré, pour reprendre si l'app est fermée ou l'iPhone verrouillé.
// =====================================================================
let T = JSON.parse(localStorage.getItem("minuteur") || "null");
let tic = null, bipsFaits = new Set();
const sauverT = () => localStorage.setItem("minuteur", JSON.stringify(T));

// Texte « ensuite : … » : la prochaine action non terminée
function suivantApres(s, d, i) {
  const els = elementsDe(s, d);
  for (let k = i; k < els.length; k++) {
    const e = els[k]; if (e.type !== "action") continue;
    const c = compte(d, k) + (k === i ? 1 : 0);
    if (c < e.n) return `Ensuite : ${sansGuillemets(e.texte)} (${c + 1}/${e.n})`;
  }
  return "Ensuite : fin du programme";
}
function demarrer(phases, i, suivant) {
  const s = courant(), d = lire(s);
  if (demarrerSiBesoin(d)) { ecrire(s, d); garderEcran(); afficher(false); }
  T = { cle: cle(s), ck: ck(d, i), n: elementsDe(s, d)[i].n || 1, phases, k: 0,
        fin: Date.now() + phases[0].dur * 1000, pause: null, suivant };
  bipsFaits = new Set(); sauverT(); boucle();
}
function lancerRepos(i) {
  const s = courant(), d = lire(s), e = elementsDe(s, d)[i];
  demarrer([{ type: "repos", dur: reposDe(s, e) || 60, label: "Repos" }], i, suivantApres(s, d, i));
}
function lancerChrono(i) {
  const s = courant(), d = lire(s), e = elementsDe(s, d)[i], c = compte(d, i);
  const nom = sansGuillemets(e.texte).split(" · ")[0];
  let phases = [];
  if (e.intervalle) {
    for (let k = c; k < e.n; k++) {
      phases.push({ type: "travail", dur: e.intervalle.course, label: `Course ${k + 1}/${e.n}` });
      phases.push({ type: "repos", dur: e.intervalle.marche, label: `Marche ${k + 1}/${e.n}`, coche: true });
    }
    if (!phases.length) return;
  } else {
    phases = e.cotes
      ? [{ type: "travail", dur: e.travail, label: `${nom} · côté 1` }, { type: "transition", dur: 5, label: "Change de côté" },
         { type: "travail", dur: e.travail, label: `${nom} · côté 2`, coche: true }]
      : [{ type: "travail", dur: e.travail, label: nom, coche: true }];
    if (reposDe(s, e) > 0 && c + 1 < e.n) phases.push({ type: "repos", dur: reposDe(s, e), label: "Repos" });
  }
  demarrer(phases, i, suivantApres(s, d, i));
}
// Échauffement guidé : chaque étape de la routine avec sa durée, puis la routine se coche
function lancerGuide(i) {
  const s = courant(), d = lire(s), e = elementsDe(s, d)[i];
  const etapes = etapesRoutine(e.nom).filter(r => minutesEtape(r) > 0);
  if (!etapes.length) return;
  const phases = etapes.map((r, n) => ({ type: "travail", dur: minutesEtape(r) * 60, label: r.etape, detail: r.quoi, routine: n === etapes.length - 1 }));
  demarrer(phases, i, suivantApres(s, d, i));
}
function boucle() { clearInterval(tic); tic = setInterval(majMinuteur, 200); majMinuteur(); }

// Prochaine étape à valider depuis le minuteur (pendant un repos ou à la fin)
function etapeAValider() {
  if (!T || vue !== "seance" || !courant() || cle(courant()) !== T.cle) return -1;
  const ph = T.phases[T.k];
  if (!T.fini && ph.type !== "repos") return -1;
  return prochain(courant(), lire(courant()));
}

function majMinuteur() {
  const m = $("minuteur");
  if (!T) { m.style.display = "none"; m.classList.remove("plein", "fini", "bientot"); clearInterval(tic); return; }
  m.style.display = "flex";
  $("mn-son").textContent = R.son ? "🔊" : "🔇";
  // Bouton « ✓ Fait : … » (valider le prochain passage sans quitter le minuteur)
  const k = etapeAValider(), bt = $("mn-fait");
  if (k >= 0) {
    const e = elementsDe(courant(), lire(courant()))[k];
    const txt = "✓ Fait : " + (e.type === "routine" ? e.nom : `${titreAction(e)} (${compte(lire(courant()), k) + 1}/${e.n})`);
    if (bt.textContent !== txt) bt.textContent = txt;
    bt.dataset.i = k; bt.style.display = "block";
  } else bt.style.display = "none";
  m.classList.toggle("phase-repos", !T.fini && T.phases[T.k].type !== "travail");   // bleu pendant le repos, couleur de l'activité pendant l'effort
  if (T.fini) { m.classList.add("fini"); m.classList.remove("bientot");
    $("mn-temps").textContent = "Terminé ✓"; $("mn-label").textContent = ""; $("mn-suivant").textContent = T.suivant || ""; return; }
  const ph = T.phases[T.k], ms = T.pause !== null ? T.pause : T.fin - Date.now();
  if (ms <= 0 && T.pause === null) return finPhase(ms < -5000);   // plus de 5 s de retard : l'app était fermée
  const sec = Math.ceil(ms / 1000);
  if (T.pause === null) {
    if (sec === 10 && ph.dur > 15 && R.bip10) bipUnique(`10-${T.k}`, "court");
    if (sec <= 3 && R.bip321) bipUnique(`${sec}-${T.k}`, "court");
  }
  m.classList.remove("fini"); m.classList.toggle("bientot", sec <= 10);
  $("mn-temps").textContent = mmss(sec) + (T.pause !== null ? " ❚❚" : "");
  $("mn-label").textContent = ph.label + (T.phases.length > 1 ? ` · étape ${T.k + 1}/${T.phases.length}` : "");
  $("mn-suivant").textContent = ph.detail || T.suivant || "";
  $("mn-pause").textContent = T.pause !== null ? "▶" : "❚❚";
  const circ = 2 * Math.PI * 27, arc = $("mn-arc");
  arc.style.strokeDasharray = circ; arc.style.strokeDashoffset = circ * (1 - Math.max(0, ms) / (ph.dur * 1000));
  placerToast();
}
function bipUnique(id, type) { if (!bipsFaits.has(id)) { bipsFaits.add(id); bip(type); } }

function finPhase(silencieux = false) {
  const ph = T.phases[T.k];
  if (ph.coche || ph.routine) {                  // la fin de l'exercice coche le passage (ou la routine)
    const d = lireCle(T.cle);
    if (ph.routine) { d.routines = d.routines || {}; d.routines[T.ck] = true; }
    else { d.compteurs = d.compteurs || {}; d.compteurs[T.ck] = Math.min(T.n, (d.compteurs[T.ck] || 0) + 1); }
    ecrireCle(T.cle, d);
  }
  const etaitRepos = ph.type === "repos";
  if (T.k < T.phases.length - 1) {
    T.k++; T.fin = (silencieux ? T.fin : Date.now()) + T.phases[T.k].dur * 1000;
    bipsFaits = new Set();
    if (!silencieux && R.bipFractions) bip("double");
  } else {
    T.fini = true;
    if (!silencieux) { if (R.bipFin) bip("fin"); document.body.classList.add("flash"); setTimeout(() => document.body.classList.remove("flash"), 1600); }
    setTimeout(() => { if (T && T.fini) { T = null; sauverT(); majMinuteur(); } }, silencieux ? 0 : 8000);
  }
  sauverT();
  if (vue === "seance" && courant() && cle(courant()) === T?.cle) { afficher(false); if (etaitRepos || ph.coche || ph.routine) allerAuSuivant(); }
  majMinuteur();
}

// Boutons du minuteur ; toucher le temps = plein écran
$("minuteur").addEventListener("click", e => {           // boutons du minuteur (rangée et coins)
  const b = e.target.closest("button[data-mn]"); if (!b || !T) return;
  const a = b.dataset.mn, enPause = T.pause !== null;
  if (a === "moins") enPause ? T.pause = Math.max(1000, T.pause - 30000) : T.fin = Math.max(Date.now() + 1000, T.fin - 30000);
  if (a === "plus") { if (T.fini) { T.fini = false; T.k = T.phases.length - 1; T.fin = Date.now(); }
                      enPause ? T.pause += 30000 : T.fin += 30000; }
  if (a === "pause" && !T.fini) { if (enPause) { T.fin = Date.now() + T.pause; T.pause = null; } else T.pause = Math.max(0, T.fin - Date.now()); }
  if (a === "passer" && !T.fini) { T.pause = null; return finPhase(); }
  if (a === "son") { R.son = !R.son; sauverReglages(); }
  if (a === "stop") { T = null; $("minuteur").classList.remove("plein"); }
  sauverT(); majMinuteur();
});
$("mn-haut").onclick = () => $("minuteur").classList.toggle("plein");
// « ✓ Fait » depuis le minuteur : arrête le repos et valide la prochaine étape
$("mn-fait").onclick = () => {
  const i = Number($("mn-fait").dataset.i);
  T = null; sauverT(); $("minuteur").classList.remove("plein"); majMinuteur();
  passageFait(i);
};

// =====================================================================
// 11. SON (réglable dans l'écran Réglages)
// =====================================================================
let audio = null;
function initAudio() {
  try { if (navigator.audioSession) navigator.audioSession.type = R.silencieux ? "playback" : "auto"; } catch {}
  if (!audio) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch {} }
  if (audio && audio.state === "suspended") audio.resume();
}
document.addEventListener("pointerdown", initAudio, true);   // l'iPhone n'autorise le son qu'après un appui
function bip(type) {
  if (!R.son || !audio) return;
  initAudio();
  const vol = { faible: .12, moyen: .3, fort: .7 }[R.volume] || .3;
  const notes = { court: [[0, 880, .12]], double: [[0, 660, .14], [.22, 880, .14]],
                  fin: [[0, 880, .16], [.25, 880, .16], [.5, 1175, .7]] }[type];
  notes.forEach(([t, f, d]) => {
    const o = audio.createOscillator(), g = audio.createGain(), t0 = audio.currentTime + t;
    o.frequency.value = f; o.connect(g); g.connect(audio.destination);
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + d);
    o.start(t0); o.stop(t0 + d + .02);
  });
}

// =====================================================================
// 12. ÉCRAN ALLUMÉ pendant une séance démarrée (au plus DUREE_MAX minutes)
// =====================================================================
let verrou = null;
const seanceEnCours = d => d.debut && !d.fin && (Date.now() - d.debut) < DUREE_MAX * 60000;
async function garderEcran() { if (!seanceEnCours(dCourant())) return; try { verrou = await navigator.wakeLock.request("screen"); } catch {} }
function libererEcran() { if (verrou) verrou.release(); verrou = null; }
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  if (seanceEnCours(dCourant())) garderEcran();
  if (T) majMinuteur();
});
setInterval(() => {
  const d = dCourant(), c = $("chrono");
  if (c && d.debut) c.textContent = minutes(d.debut) + " min";
  majInfosSeance();
  if (verrou && !seanceEnCours(d)) libererEcran();
}, 20000);

// =====================================================================
// 13. VUE SEMAINE et CRÉATION DE SÉANCES
// =====================================================================
// Modèles de « + Créer une séance ». Chaque réglage est un nombre (nb) ou un choix (ch).
// Pour ajouter un modèle : copie un bloc, change le nom, les réglages et les lignes produites.
const nb = (cle, label, val, min, max, pas = 1, unite = "") => ({ cle, label, val, min, max, pas, unite });
const ch = (cle, label, val, choix) => ({ cle, label, val, choix });
const si = (cond, ligne) => cond ? [ligne] : [];
const ECH = val => ch("ech", "Échauffement", val, ["A (classique)", "B (traversée)", "C (hanches)"]);
const GAINAGE = ch("gainage", "Gainage express", "Non", ["Non", "Oui"]);
const CONSIGNES = ["Pieds silencieux", "Pied qui plane", "Bras tendus", "Trois points d'appui", "Silence total",
                   "Arrêt sur image", "Face puis profil", "Pieds imposés", "Main qui plane", "Grimpe au ralenti"];
const VERIFS = ["> Vérifications croisées", "! À refaire avant chaque voie, pour toi et ton partenaire."];
const MODELES = [
  { type: "Escalade", nom: "Bloc technique léger", activite: "Bloc",
    reglages: [ECH("B (traversée)"), nb("blocs", "Blocs faciles", 6, 0, 15), ch("niv", "Niveau", "3", COTATIONS.Bloc),
               nb("devers", "Dévers", 15, 0, 45, 5, " min"), ch("ndev", "Niveau en dévers", "3", COTATIONS.Bloc),
               nb("trav", "Traversées basses", 2, 0, 5), GAINAGE],
    lignes: p => [`> Échauffement salle ${p.ech}`, "! Séance légère : effort visé 5 à 6 sur 10, aucun projet dur.",
      ...si(p.blocs, `${p.blocs}× Bloc facile niveau ${p.niv} (repos 2 min)`),
      ...si(p.devers, `1× ${p.devers} min en dévers niveau ${p.ndev} · « Hanches collées » · « Profil alterné »`),
      ...si(p.trav, `${p.trav}× « Traversée basse » · 3 min sans poser pied (repos 3 min)`),
      ...si(p.gainage === "Oui", "> Gainage express"), "> Retour au calme salle"] },
  { type: "Escalade", nom: "Bloc projets", activite: "Bloc",
    reglages: [ECH("A (classique)"), nb("blocs", "Blocs faciles", 6, 0, 15), ch("niv", "Niveau", "3", COTATIONS.Bloc),
               nb("devers", "Dévers", 20, 0, 45, 5, " min"), ch("ndev", "Niveau en dévers", "4", COTATIONS.Bloc),
               nb("essais", "Essais sur projet", 4, 0, 10), ch("nproj", "Niveau du projet", "5", COTATIONS.Bloc), GAINAGE],
    lignes: p => [`> Échauffement salle ${p.ech}`,
      ...si(p.blocs, `${p.blocs}× Bloc facile niveau ${p.niv} (repos 2 min)`),
      ...si(p.devers, `1× ${p.devers} min en dévers niveau ${p.ndev} · « Hanches collées » · « Profil alterné »`),
      ...si(p.essais, `${p.essais}× Essai sur projet niveau ${p.nproj} (repos 4 min)`),
      "! 3 essais maximum par mouvement. Arrête dès que la qualité baisse.",
      ...si(p.gainage === "Oui", "> Gainage express"), "> Retour au calme salle"] },
  { type: "Escalade", nom: "Bloc endurance", activite: "Bloc",
    reglages: [ECH("B (traversée)"), nb("circuits", "Circuits de 4 blocs enchaînés", 3, 1, 6), nb("trav", "Traversées basses", 2, 0, 5), GAINAGE],
    lignes: p => [`> Échauffement salle ${p.ech}`,
      `${p.circuits}× Circuit de 4 blocs faciles enchaînés · endurance (repos 5 min)`,
      ...si(p.trav, `${p.trav}× « Traversée basse » · 3 min sans poser pied (repos 3 min)`),
      ...si(p.gainage === "Oui", "> Gainage express"), "> Retour au calme salle"] },
  { type: "Escalade", nom: "Voie volume", activite: "Voie",
    reglages: [ECH("A (classique)"), nb("faciles", "Voies faciles", 4, 0, 10), ch("cf", "Cotation des voies faciles", "5a", COTATIONS.Voie),
               ch("consigne", "Consigne technique", "Pieds silencieux", CONSIGNES),
               nb("point", "Voies au point", 2, 0, 5), ch("cp", "Cotation au point", "5b", COTATIONS.Voie), GAINAGE],
    lignes: p => [`> Échauffement salle ${p.ech}`, ...VERIFS,
      ...si(p.faciles, `${p.faciles}× Voie en ${p.cf} · « ${p.consigne} »`),
      ...si(p.point, `${p.point}× Voie en ${p.cp} · « Travail au point »`),
      "! Repos au moins 5 min entre les voies.", ...si(p.gainage === "Oui", "> Gainage express"), "> Retour au calme salle"] },
  { type: "Escalade", nom: "Voie projets", activite: "Voie",
    reglages: [ECH("A (classique)"), nb("faciles", "Voies faciles", 2, 0, 6), ch("cf", "Cotation des voies faciles", "5a", COTATIONS.Voie),
               nb("essais", "Essais d'enchaînement", 3, 1, 5), ch("ce", "Cotation à enchaîner", "5b", COTATIONS.Voie),
               nb("point", "Voies au point", 1, 0, 3), ch("cp", "Cotation au point", "5c", COTATIONS.Voie), GAINAGE],
    lignes: p => [`> Échauffement salle ${p.ech}`, ...VERIFS,
      ...si(p.faciles, `${p.faciles}× Voie en ${p.cf}, grimpée proprement`),
      `${p.essais}× Essai d'enchaînement ${p.ce} (repos 10 min)`,
      ...si(p.point, `${p.point}× Voie en ${p.cp} · « Travail au point »`),
      "! Arrête dès que la qualité baisse.", ...si(p.gainage === "Oui", "> Gainage express"), "> Retour au calme salle"] },
  { type: "Course", nom: "Fractionné", activite: "Course",
    reglages: [nb("n", "Fractions", 6, 1, 15), nb("course", "Course", 2, 1, 20, 1, " min"), nb("marche", "Marche", 2, 0, 10, 1, " min"),
               nb("sec", "Marche, secondes en plus", 0, 0, 30, 30, " s")],
    lignes: p => ["> Course · avant", `${p.n}× ${p.course} min course + ${p.marche} min${p.sec ? " " + p.sec : ""} marche`,
      "! Allure conversation : si tu ne peux pas parler, ralentis ou marche.", "> Course · après"] },
  { type: "Course", nom: "Course continue", activite: "Course",
    reglages: [nb("min", "Durée", 25, 5, 90, 5, " min")],
    lignes: p => ["> Course · avant", `1× ${p.min} min de course continue`,
      "! Allure conversation : si tu ne peux pas parler, ralentis ou marche.", "> Course · après"] },
  { type: "Course", nom: "Marche rapide", activite: "Course",
    reglages: [nb("min", "Durée", 30, 10, 120, 5, " min")],
    lignes: p => [`1× ${p.min} min de marche rapide`, "! Allure soutenue : tu sens ton souffle, sans être essoufflé."] },
  { type: "Course", nom: "Vélo", activite: "Course",
    reglages: [nb("min", "Durée", 40, 10, 180, 5, " min")],
    lignes: p => [`1× ${p.min} min de vélo tranquille`, "! Allure facile, terrain plat de préférence."] },
  { type: "Muscu", nom: "Muscu complète", activite: "Maison",
    reglages: [nb("s", "Séries", 3, 1, 5), nb("planche", "Planche", 30, 10, 90, 5, " s")],
    lignes: p => ["> Échauffement maison", `${p.s}× « Planche » · ${p.planche} s`, "2× « Planche latérale » · 20 s par côté",
      `${p.s}× « Dead bug » · 8 par côté`, `${p.s}× « Pompes » · 8`, `${p.s}× « Rowing inversé » · 8`,
      `${p.s}× « Suspension active » · 6, pieds sur une chaise`, "2× « Rotations externes à l'élastique » · 12 par bras",
      "2× « Extensions des doigts » · 15 (repos 30 s)", "! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup.", "> Mobilité"] },
  { type: "Muscu", nom: "Muscu courte", activite: "Maison",
    reglages: [nb("s", "Séries", 2, 1, 4), nb("planche", "Planche", 30, 10, 90, 5, " s")],
    lignes: p => ["> Échauffement maison", `${p.s}× « Planche » · ${p.planche} s`, `${p.s}× « Dead bug » · 8 par côté`,
      `${p.s}× « Pompes » · 8`, `${p.s}× « Rowing inversé » · 8`, "1× « Extensions des doigts » · 15",
      "! Mouvements lents : 2 s aller, 2 s retour, aucun à-coup."] },
  { type: "Muscu", nom: "Muscu express", activite: "Maison",
    reglages: [nb("planche", "Planche", 30, 10, 90, 5, " s")],
    lignes: p => [`2× « Planche » · ${p.planche} s (repos 45 s)`, "1× « Extensions des doigts » · 15", "1× « Rotations externes à l'élastique » · 12 par bras"] },
  { type: "Muscu", nom: "Gainage express", activite: "Maison", reglages: [], lignes: () => ["> Gainage express"] },
  { type: "Libre", nom: "Séance libre (sans programme)", activite: p => p.act,
    reglages: [ch("act", "Activité", "Bloc", ACTIVITES_LIBRES)], lignes: () => [] },
];
const TYPES = ["Escalade", "Course", "Muscu", "Libre"];

let F = null;   // formulaire « + Créer une séance »
function nouveauFormulaire(type = "Escalade", modele) {
  const m = modele ?? MODELES.findIndex(x => x.type === type);
  const p = {}; MODELES[m].reglages.forEach(r => p[r.cle] = r.val);
  return { etape: F ? F.etape : 1, date: F ? F.date : isoDate(new Date()), type, modele: m, p, ajouts: F ? F.ajouts : [],
           exo: "", series: 3, detail: "", repos: 0 };
}
function lignesCreees() {      // lignes du modèle + exercices ajoutés (avant la routine de fin)
  const m = MODELES[F.modele], l = m.lignes(F.p);
  const ajouts = F.ajouts.map(a => `${a.series}× « ${a.exo} »${a.detail ? " · " + a.detail : ""}${a.repos ? ` (repos ${a.repos} s)` : ""}${a.duree ? ` (durée ${a.duree} min)` : ""}`);
  const fin = l.length > 1 && l[l.length - 1].startsWith(">") ? l.length - 1 : l.length;
  return [...l.slice(0, fin), ...ajouts, ...l.slice(fin)];
}

// Description courte de chaque modèle (cartes de la création de séance)
const DESC_MODELES = {
  "Bloc technique léger": "Technique sans forcer, effort 5 à 6",
  "Bloc projets": "Blocs plus durs, avec du dévers",
  "Bloc endurance": "Circuits de blocs faciles enchaînés",
  "Voie volume": "Beaucoup de voies faciles avec une consigne",
  "Voie projets": "Essais d'enchaînement sur une voie dure",
  "Fractionné": "Alternance course et marche",
  "Course continue": "Une durée de course à allure conversation",
  "Marche rapide": "Endurance douce, sans courir",
  "Vélo": "Endurance douce, sans impact",
  "Muscu complète": "Gainage et haut du corps, 25 min",
  "Muscu courte": "L'essentiel en 12 min",
  "Muscu express": "Planche et doigts, 6 min",
  "Gainage express": "4 minutes de gainage",
  "Séance libre (sans programme)": "Une séance vide : tu notes ce que tu fais",
};
const ACT_TYPE = { Escalade: "Voie", Course: "Course", Muscu: "Maison", Libre: "" };   // couleur des tuiles
const activiteModele = (m, p) => typeof m.activite === "function" ? m.activite(p) : m.activite;
function dureeModele(m, p, lignes) {          // durée estimée d'un modèle (secondes)
  const s = { activite: activiteModele(m, p), contenu: (lignes || m.lignes(p)).join("\n"), semaine: 1, jour: "Lundi" };
  return dureeTotale(s, {});
}

// ---------- Onglet Semaine ----------
function ouvrirSemaine(sem) { vue = "semaine"; semaineVue = Math.max(1, sem); afficher(); }
function bornesSemaine(sem) {
  const lundi = new Date(debutProgramme() + "T12:00:00"); lundi.setDate(lundi.getDate() + (sem - 1) * 7);
  const dimanche = new Date(lundi); dimanche.setDate(lundi.getDate() + 6);
  const mois = d => d.toLocaleDateString("fr-BE", { month: "short" });
  return lundi.getMonth() === dimanche.getMonth() ? `${lundi.getDate()}-${dimanche.getDate()} ${mois(dimanche)}`
    : `${lundi.getDate()} ${mois(lundi)} - ${dimanche.getDate()} ${mois(dimanche)}`;
}
function afficherSemaine() {
  $("titre-date").textContent = `Semaine ${semaineVue} · ${bornesSemaine(semaineVue)}`;
  const items = LISTE.map((s, k) => ({ s, k, d: lire(s) })).filter(x => x.s.semaine === semaineVue);
  const prevues = items.filter(x => !/facultati/i.test(x.s.contenu) || x.d.fait === "Oui");
  const faites = items.filter(x => x.d.fait === "Oui");
  const minutesFaites = faites.reduce((t, x) => t + (x.d.fin && x.d.debut ? (x.d.fin - x.d.debut) / 1000 : (Number(x.d.duree) || 0) * 60), 0);
  let h = `<div class="bilan-semaine">${faites.length} séance${faites.length > 1 ? "s" : ""} faite${faites.length > 1 ? "s" : ""} sur ${prevues.length}${minutesFaites ? " · " + hm(minutesFaites) : ""}</div>`;
  if (!items.length) h += `<p class="petit centre">Aucune séance cette semaine.</p>`;
  const auj = isoDate(new Date());
  items.forEach(({ s, k, d }) => {
    const estAuj = isoDate(dateSeance(s)) === auj, v = nomVersion(s, d);
    const titre = s.libre && s.phase !== "Séance libre" ? s.phase.replace("Séance créée · ", "") : s.activite;
    const etat = d.fait === "Oui" ? `<span class="etat-seance fait">✓</span>` : d.fait === "Sautée" || d.fait === "Non" ? `<span class="etat-seance saute">✗</span>`
      : d.debut && !d.fin ? `<span class="etat-seance encours">●</span>` : `<span class="etat-seance">○</span>`;
    const duree = d.fait === "Oui" ? `Faite en ${hm(d.fin && d.debut ? (d.fin - d.debut) / 1000 : (Number(d.duree) || 0) * 60)}`
      : d.fait === "Sautée" ? "Sautée" : `≈ ${hm(dureeTotale(s, d))}${/facultati/i.test(s.contenu) ? " · facultative" : ""}`;
    h += `<button class="carte-seance ${estAuj ? "aujourdhui" : ""}" data-act="${esc(s.activite)}" data-ouvrir="${k}">
      <div class="cs-texte">${estAuj ? `<span class="petit-etiquette">Aujourd'hui</span>` : ""}
        <div class="cs-jour">${esc(s.jour)} ${jourMois(dateSeance(s))}</div>
        <div class="cs-titre">${esc(titre)}${s.libre ? ` <span class="petit">· créée</span>` : ""}${v && d.fait === "Oui" ? ` <span class="petit">· ${esc(v)}</span>` : ""}</div>
        <div class="cs-duree">${duree}</div></div>${etat}</button>`;
  });
  h += `<button class="gros go" data-cree="ouvrir">+ Créer une séance</button>`;
  $("ecran").innerHTML = h;
}
$("ecran").addEventListener("click", e => {
  if (vue !== "semaine") return;
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.ouvrir !== undefined) return changer(Number(b.dataset.ouvrir));
  if (b.dataset.cree === "ouvrir") return ouvrirCreation();
});

// ---------- Création de séance (plein écran, 3 étapes) ----------
function ouvrirCreation(ajouts) {
  F = null; F = nouveauFormulaire(); if (ajouts) F.ajouts = ajouts;
  vue = "creation"; afficher();
}
function apercuLignes(lignes, act) {          // aperçu présenté comme une séance
  const s = { activite: act, contenu: lignes.join("\n"), semaine: 1, jour: "Lundi" }, els = analyser(lignes);
  let n = 0;
  return els.map(e => {
    if (e.type === "info") return `<div class="ligne info">${esc(sansGuillemets(e.texte))}</div>`;
    const t = typeEtape(e); n++;
    return `<div class="ligne etape type-${t}"><div class="txt"><div class="num-etape"><span class="type-nom">${TYPES_ETAPE[t]}</span> · ${n}.<span class="duree-prevue">≈ ${hm(dureeElement(s, {}, e))}</span></div>
      ${esc(e.type === "routine" ? e.nom : (e.n > 1 ? e.n + "× " : "") + sansGuillemets(e.texte))}</div></div>`;
  }).join("") || `<p class="petit">Séance vide : tu noteras simplement ce que tu fais.</p>`;
}
function afficherCreation() {
  $("titre-date").textContent = "Nouvelle séance";
  const m = MODELES[F.modele], act = activiteModele(m, F.p), lignes = lignesCreees();
  const puces = (attr, liste, actuel) => `<div class="choix">${liste.map(([v, t]) =>
    `<button ${attr} data-valeur="${esc(v)}" class="${String(actuel) === String(v) ? "choisi" : ""}">${esc(t)}</button>`).join("")}</div>`;
  let h = `<div class="etapes-creation">${[1, 2, 3].map(n => `<span class="${n <= F.etape ? "fait" : ""}"></span>`).join("")}</div>`;
  if (F.etape === 1) {
    h += `<label class="champ">Date</label><input type="date" id="cree-date" value="${F.date}">
      <label class="champ">Type de séance</label>
      <div class="tuiles">${TYPES.map(t => `<button class="tuile ${F.type === t ? "choisi" : ""}" data-act="${ACT_TYPE[t]}" data-cree="type" data-valeur="${t}">
        <span class="tuile-ic">${{ Escalade: "▲", Course: "➜", Muscu: "◆", Libre: "○" }[t]}</span>${t}</button>`).join("")}</div>
      <label class="champ">Modèle</label>
      ${MODELES.map((x, k) => [x, k]).filter(([x]) => x.type === F.type).map(([x, k]) => {
        const p = {}; x.reglages.forEach(r => p[r.cle] = r.val);
        return `<button class="carte-modele ${F.modele === k ? "choisi" : ""}" data-act="${esc(activiteModele(x, p))}" data-cree="modele" data-valeur="${k}">
          <span class="cm-nom">${esc(x.nom)}</span><span class="cm-desc">${esc(DESC_MODELES[x.nom] || "")}</span>
          ${x.type !== "Libre" ? `<span class="cm-duree">≈ ${hm(dureeModele(x, p))}</span>` : ""}</button>`; }).join("")}`;
  } else if (F.etape === 2) {
    h += `<h2>${esc(m.nom)}</h2>` + (m.reglages.map(r => `<label class="champ">${esc(r.label)}</label>` + (r.choix
      ? puces(`data-reg="${r.cle}"`, r.choix.map(c => [c, c]), F.p[r.cle])
      : `<div class="compteur"><button data-reg="${r.cle}" data-pas="-1">−</button><span>${F.p[r.cle]}${esc(r.unite)}</span>
         <button data-reg="${r.cle}" data-pas="1">+</button></div>`)).join("") || `<p class="petit">Ce modèle n'a pas de réglage.</p>`)
      + `<div class="total-creation">Durée totale ≈ ${hm(dureeModele(m, F.p, lignes))}</div>`;
  } else {
    h += `<h2>${esc(m.nom)} · ≈ ${hm(dureeModele(m, F.p, lignes))}</h2>
      <div class="liste-etapes">${apercuLignes(lignes, act)}</div>
      <details class="ajout-exo" ${F.exo ? "open" : ""}><summary>+ Ajouter un exercice (facultatif)</summary>
      <select id="cree-exo"><option value="">Choisir un exercice…</option>${optionsExercices(F.exo)}</select>
      <label class="champ">Séries ou passages</label>
      <div class="compteur"><button data-cree="series" data-pas="-1">−</button><span>${F.series}</span><button data-cree="series" data-pas="1">+</button></div>
      <label class="champ">Détail (facultatif)</label><input type="text" id="cree-detail" value="${esc(F.detail)}" placeholder="ex. 30 s · 8 · 15 par côté">
      <label class="champ">Repos</label>${puces('data-cree="repos"', [[0, "Par défaut"], [30, "30 s"], [60, "1 min"], [90, "1 min 30"], [180, "3 min"], [300, "5 min"]], F.repos)}
      <label class="champ">Durée prévue</label>${puces('data-cree="duree"', [[0, "Estimée"], [5, "5 min"], [10, "10 min"], [15, "15 min"], [20, "20 min"], [30, "30 min"]], F.dureeAj || 0)}
      <p></p><button class="gros contour" data-cree="ajouter" ${F.exo ? "" : "disabled"}>+ Ajouter cet exercice</button></details>
      ${F.ajouts.map((a, k) => `<div class="voie"><span>${a.series}× ${esc(a.exo)}${a.detail ? " · " + esc(a.detail) : ""}</span><button data-cree="retirer" data-valeur="${k}">✕</button></div>`).join("")}`;
  }
  const gauche = F.etape === 1 ? `<button data-cree="annuler">Annuler</button>` : `<button data-cree="retour">‹ Retour</button>`;
  const droite = F.etape < 3 ? `<button class="principal" data-cree="suivant">Suivant ›</button>` : `<button class="principal" data-cree="creer">Créer la séance</button>`;
  $("ecran").innerHTML = h + `<div class="actions">${gauche}${droite}</div>`;
}
$("ecran").addEventListener("click", e => {
  if (vue !== "creation") return;
  const b = e.target.closest("button"); if (!b) return;
  const t = b.dataset;
  if (t.cree === "annuler") { F = null; return ouvrirSemaine(semaineVue); }
  if (t.cree === "suivant") F.etape = Math.min(3, F.etape + 1);
  else if (t.cree === "retour") F.etape = Math.max(1, F.etape - 1);
  else if (t.cree === "type") { F = nouveauFormulaire(t.valeur); }
  else if (t.cree === "modele") { F = nouveauFormulaire(F.type, Number(t.valeur)); }
  else if (t.cree === "series") F.series = Math.max(1, Math.min(20, F.series + Number(t.pas)));
  else if (t.cree === "repos") F.repos = Number(t.valeur);
  else if (t.cree === "duree") F.dureeAj = Number(t.valeur);
  else if (t.cree === "ajouter" && F.exo) { F.ajouts.push({ exo: F.exo, series: F.series, detail: F.detail.trim(), repos: F.repos, duree: F.dureeAj || 0 }); F.exo = ""; F.detail = ""; F.dureeAj = 0; }
  else if (t.cree === "retirer") F.ajouts.splice(Number(t.valeur), 1);
  else if (t.reg) {
    const r = MODELES[F.modele].reglages.find(x => x.cle === t.reg);
    F.p[t.reg] = r.choix ? t.valeur : Math.max(r.min, Math.min(r.max, F.p[t.reg] + Number(t.pas) * r.pas));
  }
  else if (t.cree === "creer") {
    const date = new Date(F.date + "T12:00:00"), m = MODELES[F.modele];
    const semaine = semaineDe(date), jour = JOURS[(date.getDay() + 6) % 7];
    if (semaine < 1) { alert("Cette date est avant la date de début du programme (Plus → Réglages → Programme)."); return; }
    const libre = { id: Date.now(), semaine, jour, activite: activiteModele(m, F.p),
      phase: m.type === "Libre" ? "Séance libre" : "Séance créée · " + m.nom, contenu: lignesCreees().join("\n") };
    localStorage.setItem("libres", JSON.stringify([...lireLibres(), libre]));
    F = null; reconstruire();
    return changer(LISTE.findIndex(s => s.libre && s.id === libre.id));
  }
  const y = window.scrollY; afficherCreation(); window.scrollTo(0, t.cree === "suivant" || t.cree === "retour" ? 0 : y);
});
$("ecran").addEventListener("input", e => {          // champs du formulaire, sans réafficher (garde le clavier)
  if (vue !== "creation" || !F) return;
  if (e.target.id === "cree-date") F.date = e.target.value || F.date;
  if (e.target.id === "cree-detail") F.detail = e.target.value;
});
$("ecran").addEventListener("change", e => {
  if (vue !== "creation" || !F || e.target.id !== "cree-exo") return;
  F.exo = e.target.value; const y = window.scrollY; afficherCreation(); window.scrollTo(0, y);
});

// =====================================================================
// 14. ONGLET PLUS : bibliothèque d'exercices, exporter, sauvegarde, réglages, aide
// =====================================================================
const DISCIPLINES = ["Voie et bloc", "Voie", "Bloc", "Méthodes", "Muscu", "Course", "Mobilité"];
const ACT_DISCIPLINE = { Voie: "Voie", Bloc: "Bloc", Course: "Course", Muscu: "Maison" };   // tuiles colorées
const lireFavoris = () => JSON.parse(localStorage.getItem("favoris") || "[]");
const estFavori = nom => lireFavoris().includes(nom);
const nomsCites = contenu => [...contenu.matchAll(/«\s*(.+?)\s*»/g)].map(m => m[1].toLowerCase());
const semaineActuelle = () => Math.max(1, semaineDe(new Date()));
const groupeRoutine = nom => /^Échauffement/.test(nom) ? "Échauffements" : /^Vérifications/.test(nom) ? "Sécurité"
  : /^Course/.test(nom) ? "Course" : /^Gainage/.test(nom) ? "Gainage" : "Retour au calme";
const ABREG = { Lundi: "lun.", Mardi: "mar.", Mercredi: "mer.", Jeudi: "jeu.", Vendredi: "ven.", Samedi: "sam.", Dimanche: "dim." };

// Où l'exercice apparaît dans le programme
let usageCache = null;
function usage(nom) {
  if (!usageCache) {
    usageCache = {};
    SEANCES.forEach(s => new Set(nomsCites(s.contenu)).forEach(n => (usageCache[n] = usageCache[n] || []).push(s)));
  }
  return usageCache[nom.toLowerCase()] || [];
}
// Dernière fois que l'exercice a été fait (jusqu'à aujourd'hui)
function derniereFoisExo(nom) {
  const auj = new Date(); auj.setHours(23, 59, 0, 0);
  for (let k = LISTE.length - 1; k >= 0; k--) {
    const p = LISTE[k]; if (dateSeance(p) > auj) continue;
    const d = lire(p), lignes = elementsDe(p, d);
    for (let i = 0; i < lignes.length; i++) {
      const x = lignes[i], c = compte(d, i);
      if (x.type === "action" && c > 0 && x.texte.includes("« " + nom + " »"))
        return `${p.jour} ${jourMois(dateSeance(p))} (sem. ${p.semaine}) : ${c}/${x.n} ${c > 1 ? "passages" : "passage"}`;
    }
  }
  return "";
}

// ---------- Bibliothèque : tuiles → liste → fiche ----------
let B = { ecran: "tuiles" };          // écran de la bibliothèque
let toutAfficher = false;              // false : les exercices prévus plus tard sont grisés
function ouvrirBiblio(etat) { vue = "biblio"; B = { ecran: "tuiles", q: "", ...etat }; afficher(); }
const TITRES_FILTRE = { favoris: "★ Favoris", seance: "Exercices de cette séance", routines: "Routines", recherche: "Recherche" };
function exercicesFiltres() {
  if (B.filtre === "favoris") return EXERCICES.filter(x => estFavori(x.nom));
  if (B.filtre === "seance") { const n = new Set(courant() ? nomsCites(courant().contenu) : []); return EXERCICES.filter(x => n.has(x.nom.toLowerCase())); }
  if (B.filtre === "recherche") { const m = sansAccents(B.q.trim());
    return EXERCICES.filter(x => sansAccents([x.discipline, x.categorie, x.nom, x.but, x.comment, x.erreurs, x.facile, x.cle].join(" ")).includes(m)); }
  return EXERCICES.filter(x => x.discipline === B.filtre);
}
function afficherBiblio() {
  const recherche = `<input type="search" id="recherche" placeholder="Rechercher un exercice…" value="${esc(B.q || "")}">`;
  if (B.ecran === "tuiles") {
    $("titre-date").textContent = "Exercices et méthodes";
    const tuile = (filtre, titre, n, act = "") => `<button class="tuile" data-act="${act}" data-filtre="${esc(filtre)}"><span class="tuile-nom">${esc(titre)}</span><span class="tuile-n">${n}</span></button>`;
    $("ecran").innerHTML = `<button class="retour" data-b="plus">‹ Plus</button>${recherche}
      <div class="tuiles">${tuile("favoris", "★ Favoris", lireFavoris().length)}
      ${DISCIPLINES.map(d => tuile(d, d, EXERCICES.filter(x => x.discipline === d).length, ACT_DISCIPLINE[d] || "")).join("")}
      ${tuile("routines", "Routines", new Set(ROUTINES.map(r => r.routine)).size)}</div>`;
  } else if (B.ecran === "liste") {
    $("titre-date").textContent = TITRES_FILTRE[B.filtre] || B.filtre;
    let h = `<button class="retour" data-b="tuiles">‹ Exercices</button>${recherche}`;
    if (B.filtre === "routines") {
      const g = {};
      [...new Set(ROUTINES.map(r => r.routine))].forEach(nom => (g[groupeRoutine(nom)] = g[groupeRoutine(nom)] || []).push(nom));
      h += Object.entries(g).map(([t, noms]) => `<h3 class="sous-cat">${esc(t)}</h3>` + noms.map(nom =>
        `<button class="ligne-exo" data-routine-fiche="${esc(nom)}"><span>${esc(nom)}</span><span class="petit">${etapesRoutine(nom).length} étapes ›</span></button>`).join("")).join("");
    } else {
      const liste = exercicesFiltres(), groupes = {};
      liste.forEach(x => { const t = B.filtre === "recherche" || B.filtre === "favoris" || B.filtre === "seance" ? `${x.discipline} · ${x.categorie}` : x.categorie; (groupes[t] = groupes[t] || []).push(x); });
      h += Object.entries(groupes).map(([t, xs]) => `<h3 class="sous-cat">${esc(t)}</h3>` + xs.map(x => {
        const plusTard = !toutAfficher && x.semaine > semaineActuelle();
        const prevu = x.semaine >= 999 ? x.depuis.toLowerCase() : "à partir de : " + x.depuis.toLowerCase();
        return `<button class="ligne-exo ${plusTard ? "verrou" : ""}" data-fiche="${EXERCICES.indexOf(x)}">
          <span>${estFavori(x.nom) ? "★ " : ""}${plusTard ? "🔒 " : ""}${esc(x.nom)}${plusTard ? `<span class="petit"> · ${esc(prevu)}</span>` : ""}</span>
          <span class="badge">${esc(x.niveau || "")}</span></button>`; }).join("")).join("")
        || `<p class="petit centre">${B.filtre === "favoris" ? "Aucun favori. Ouvre un exercice et touche « ☆ Favori »." : B.filtre === "seance" ? "Aucun exercice cité dans cette séance." : "Aucun exercice trouvé."}</p>`;
      if (!["favoris", "seance"].includes(B.filtre)) h += `<label class="interrupteur"><input type="checkbox" id="tout-afficher" ${toutAfficher ? "checked" : ""}> Afficher normalement les exercices prévus plus tard</label>`;
    }
    $("ecran").innerHTML = h;
    if ($("tout-afficher")) $("tout-afficher").onchange = e => { toutAfficher = e.target.checked; afficherBiblio(); };
  } else if (B.ecran === "fiche" && B.routine) {
    $("titre-date").textContent = "Routine";
    $("ecran").innerHTML = `<button class="retour" data-b="liste">‹ Routines</button><h2 class="titre-fiche">${esc(B.routine)}</h2>
      <ol class="etapes">${etapesRoutine(B.routine).map(r => `<li><b>${esc(r.etape)}</b>${r.duree && r.duree !== "—" ? " (" + esc(r.duree) + ")" : ""} : ${esc(r.quoi)}</li>`).join("")}</ol>`;
  } else {
    const x = EXERCICES[B.fiche], u = usage(x.nom), df = derniereFoisExo(x.nom);
    const plusTard = x.semaine > semaineActuelle();
    $("titre-date").textContent = "Fiche";
    $("ecran").innerHTML = `<button class="retour" data-b="liste">‹ ${esc(TITRES_FILTRE[B.filtre] || B.filtre)}</button>
      <h2 class="titre-fiche">${esc(x.nom)}</h2>
      <p><span class="badge">${esc(x.niveau || "—")}</span> <span class="petit">${esc(x.discipline)} · ${esc(x.categorie)}${x.depuis ? " · " + esc(x.semaine >= 999 ? x.depuis : "à partir de : " + x.depuis.toLowerCase()) : ""}</span></p>
      ${plusTard ? `<div class="avert">Prévu plus tard dans ta progression. Attends ce stade, ou demande conseil à un moniteur avant de l'essayer.</div>` : ""}
      ${u.length ? `<p class="petit"><b>Dans ton programme :</b> ${esc(u.slice(0, 6).map(s => `sem. ${s.semaine} (${ABREG[s.jour] || s.jour})`).join(", ") + (u.length > 6 ? ` et ${u.length - 6} autres` : ""))}</p>` : ""}
      <div class="carte fiche">${corpsFiche(x)}</div>
      <p class="petit"><b>Dernière fois :</b> ${df ? esc(df) : "pas encore fait"}</p>
      <div class="actions"><button data-favori="${B.fiche}">${estFavori(x.nom) ? "★ Retirer" : "☆ Favori"}</button>
        <button class="principal" data-ajouter-exo="${B.fiche}">+ Ajouter à une séance</button></div>`;
  }
  if ($("recherche")) $("recherche").addEventListener("input", () => {     // recherche : réaffiche sans perdre le clavier
    const pos = $("recherche").selectionStart; B.q = $("recherche").value;
    if (B.q.trim()) { B.ecran = "liste"; B.filtre = "recherche"; } else if (B.filtre === "recherche") B.ecran = "tuiles";
    afficherBiblio(); const c = $("recherche"); c.focus(); c.setSelectionRange(pos, pos);
  });
}
$("ecran").addEventListener("click", e => {
  if (vue !== "biblio") return;
  const b = e.target.closest("button"); if (!b) return;
  const t = b.dataset;
  if (t.b === "plus") return ouvrirPlus();
  if (t.b === "tuiles") { B = { ecran: "tuiles", q: "" }; return afficherBiblio(); }
  if (t.b === "liste") { B.ecran = "liste"; delete B.routine; return afficherBiblio(); }
  if (t.filtre) { B = { ecran: "liste", filtre: t.filtre, q: "" }; window.scrollTo(0, 0); return afficherBiblio(); }
  if (t.fiche !== undefined) { B.ecran = "fiche"; B.fiche = Number(t.fiche); window.scrollTo(0, 0); return afficherBiblio(); }
  if (t.routineFiche) { B.ecran = "fiche"; B.routine = t.routineFiche; window.scrollTo(0, 0); return afficherBiblio(); }
  if (t.favori !== undefined) {
    const nom = EXERCICES[Number(t.favori)].nom, f = lireFavoris();
    localStorage.setItem("favoris", JSON.stringify(f.includes(nom) ? f.filter(n => n !== nom) : [...f, nom]));
    return afficherBiblio();
  }
  if (t.ajouterExo !== undefined) {                     // création de séance avec cet exercice déjà ajouté
    const x = EXERCICES[Number(t.ajouterExo)];
    semaineVue = semaineActuelle();
    return ouvrirCreation([{ exo: x.nom, series: 3, detail: "", repos: 0, duree: 0 }]);
  }
});

// ---------- Onglet Plus ----------
function ouvrirPlus() { vue = "plus"; afficher(); }
function texteExport() {
  const t = Number(localStorage.getItem("dernier-export"));
  const saisies = Object.keys(localStorage).some(k => k.startsWith("seance-") || k.startsWith("libre-"));
  const jours = t ? Math.floor((Date.now() - t) / 86400000) : null;
  return { texte: t ? `Dernier export : ${jours === 0 ? "aujourd'hui" : `il y a ${jours} jour${jours > 1 ? "s" : ""}`}` : saisies ? "Jamais exporté" : "Rien à exporter pour l'instant",
           retard: saisies && (!t || jours > 7) };
}
function afficherPlus() {
  $("titre-date").textContent = "Plus";
  const ex = texteExport(), vp = typeof VERSION_PROGRAMME === "undefined" ? "?" : VERSION_PROGRAMME;
  const ligne = (a, icone, titre, sous, cl = "") => `<button class="ligne-menu grande ${cl}" data-plus="${a}"><span class="icone">${icone}</span>
    <span><span class="titre-menu">${titre}</span><span class="sous-menu">${sous}</span></span><span class="chevron">›</span></button>`;
  $("ecran").innerHTML = `<div class="menu-liste">
    ${ligne("biblio", "📖", "Exercices et méthodes", `${EXERCICES.length} fiches · favoris · recherche`)}
    ${ligne("exporter", "⬆", "Exporter", ex.texte, ex.retard ? "en-retard" : "")}
    ${ligne("sauvegarde", "💾", "Sauvegarde", "Restaurer tes saisies")}
    ${ligne("reglages", "⚙", "Réglages", "Programme, minuteur, son, rappels")}
    ${ligne("aide", "❓", "Aide", "Le guide d'utilisation (connexion requise)")}
    </div><p class="petit centre version">App ${APP_VERSION} · programme du ${esc(vp)}</p>`;
}
function afficherSauvegarde() {
  $("titre-date").textContent = "Sauvegarde";
  const ex = texteExport();
  $("ecran").innerHTML = `<button class="retour" data-plus="retour">‹ Plus</button>
    <div class="carte"><h2>Exporter</h2><p class="petit ${ex.retard ? "retard" : ""}">${ex.texte}</p>
    <p class="petit">Crée la sauvegarde (.json) et le fichier pour l'Excel (.csv). Exporte au moins une fois par semaine.</p>
    <button class="gros contour" data-plus="exporter">⬆ Exporter maintenant</button></div>
    <div class="carte"><h2>Restaurer</h2>
    <p class="petit">Nouveau téléphone ou app réinstallée : choisis le fichier <b>sauvegarde-escalade-….json</b> le plus récent.</p>
    <button class="gros contour" data-plus="restaurer">Restaurer une sauvegarde</button>
    <input type="file" id="fichier" accept=".json,application/json" hidden></div>`;
  $("fichier").onchange = restaurer;
}
$("ecran").addEventListener("click", e => {
  if (!["plus", "sauvegarde"].includes(vue)) return;
  const b = e.target.closest("button"); if (!b) return;
  const a = b.dataset.plus;
  if (a === "retour") return ouvrirPlus();
  if (a === "biblio") return ouvrirBiblio();
  if (a === "exporter") { exporter(); return afficher(false); }
  if (a === "sauvegarde") { vue = "sauvegarde"; return afficher(); }
  if (a === "restaurer") return $("fichier").click();
  if (a === "reglages") { vue = "reglages"; return afficher(); }
  if (a === "aide") return window.open(URL_GUIDE, "_blank");
});

// ---------- Réglages (Plus → Réglages) ----------
let panneau = null;   // panneau de réglages ouvert
function afficherReglages() {
  $("titre-date").textContent = "Réglages";
  const bascule = (cle_, texte) => `<button data-bascule="${cle_}" class="${R[cle_] ? "choisi" : ""}">${texte}</button>`;
  const choix = (cle_, valeurs) => `<div class="choix">${valeurs.map(([v, t]) =>
    `<button data-reglage="${cle_}" data-valeur="${v}" class="${String(R[cle_]) === String(v) ? "choisi" : ""}">${t}</button>`).join("")}</div>`;
  const vp = typeof VERSION_PROGRAMME === "undefined" ? "?" : VERSION_PROGRAMME;
  const panneaux = [
    ["programme", "📋 Programme", `
      <label class="champ">Séances affichées</label>${choix("mode", [["programme", "Le programme + mes séances"], ["libre", "Uniquement mes séances créées"]])}
      <label class="champ">Date de début du programme (un lundi)</label>
      <input type="date" id="date-debut" value="${esc(debutProgramme())}">
      <p class="petit">À régler une seule fois, le jour où tu commences : tes saisies sont rangées par numéro de semaine.</p>`],
    ["minuteur", "⏱ Minuteur", `
      <label class="champ">Repos après un passage</label>${choix("auto", [[true, "Automatique"], [false, "Manuel (bouton ⏱)"]])}
      <label class="champ">Noter le résultat d'une voie ou d'un bloc</label>${choix("releve", [[true, "Oui, à chaque passage"], [false, "Non"]])}
      <label class="champ">Temps moyen par voie (pour les durées prévues)</label>
      <div class="compteur"><button data-tps="tVoie" data-pas="-0.5">−</button><span>${String(R.tVoie).replace(".", ",")} min</span><button data-tps="tVoie" data-pas="0.5">+</button></div>
      <label class="champ">Temps moyen par bloc</label>
      <div class="compteur"><button data-tps="tBloc" data-pas="-0.5">−</button><span>${String(R.tBloc).replace(".", ",")} min</span><button data-tps="tBloc" data-pas="0.5">+</button></div>
      <label class="champ">Ajuster à ma moyenne réelle</label>${choix("ajuster", [[true, "Oui"], [false, "Non, garder ces valeurs"]])}
      <p class="petit">${(() => { const m = lireMoyennes(), f = (t, l) => l.length >= 3 ? `${t} : ${String(Math.round(tempsParPassage(t === "Voie" ? "Voie" : "Bloc") * 10) / 10).replace(".", ",")} min (sur ${l.length} étapes)` : `${t} : pas encore assez de séances (${l.length}/3)`;
        return `Ta moyenne réelle — ${f("Voie", m.Voie || [])} · ${f("Bloc", m.Bloc || [])}`; })()}</p>`],
    ["son", "🔊 Son", `
      <label class="champ">Son</label>${choix("son", [[true, "Activé"], [false, "Coupé"]])}
      <label class="champ">Volume</label>${choix("volume", [["faible", "Faible"], ["moyen", "Moyen"], ["fort", "Fort"]])}
      <label class="champ">Bips</label><div class="choix">${bascule("bip10", "10 s avant")}${bascule("bip321", "3-2-1")}${bascule("bipFin", "Fin")}${bascule("bipFractions", "Changements")}</div>
      <label class="champ">Sonner même en mode silencieux</label>${choix("silencieux", [[true, "Oui"], [false, "Non"]])}
      <p class="petit">Fonctionne sur les iPhone récents (iOS 17 ou plus).</p>
      <button class="gros" data-test="son">Tester le son</button>`],
    ["rappels", "📅 Rappels calendrier", `
      <p class="petit">Crée un fichier avec toutes les séances à venir et un rappel pour chacune. Ouvre-le et choisis « Ajouter tout », de préférence dans un calendrier « Escalade » dédié.</p>
      ${Object.keys(R.heures).map(a => `<label class="champ">Heure : ${esc(a)}</label><input type="time" data-heure="${esc(a)}" value="${R.heures[a]}">`).join("")}
      <label class="champ">Rappel</label>${choix("avance", [[15, "15 min avant"], [30, "30 min"], [60, "1 h"], [120, "2 h"]])}
      <p></p><button class="gros" data-test="calendrier">Créer le fichier calendrier</button>`]];
  $("ecran").innerHTML = `<button class="retour" data-plus="retour">‹ Plus</button>` + panneaux.map(([id, titre, corps]) =>
    `<button class="gros panneau-titre ${panneau === id ? "ouvert" : ""}" data-panneau="${id}">${titre} <span>${panneau === id ? "▾" : "▸"}</span></button>
     ${panneau === id ? `<div class="carte">${corps}</div>` : `<p></p>`}`).join("") +
    `<p class="petit centre">App ${APP_VERSION} · programme du ${esc(vp)}</p>`;
}
$("ecran").addEventListener("click", e => {
  if (vue !== "reglages") return;
  const b = e.target.closest("button"); if (!b) return;
  const t = b.dataset, y = window.scrollY;
  if (t.plus === "retour") return ouvrirPlus();
  if (t.panneau) { panneau = panneau === t.panneau ? null : t.panneau; return afficherReglages(); }
  if (t.test === "son") { initAudio(); const s = R.son; R.son = true; bip("fin"); R.son = s; return; }
  if (t.test === "calendrier") return calendrier();
  if (t.tps) { R[t.tps] = Math.max(0.5, Math.min(15, R[t.tps] + Number(t.pas))); sauverReglages(); afficherReglages(); return window.scrollTo(0, y); }
  if (t.bascule) R[t.bascule] = !R[t.bascule];
  if (t.reglage) { const v = t.valeur; R[t.reglage] = v === "true" ? true : v === "false" ? false : isNaN(v) ? v : Number(v); }
  if (t.reglage === "mode") { sauverReglages(); reconstruire(); index = indexAujourdhui(); }
  if (t.bascule || t.reglage) { sauverReglages(); afficherReglages(); window.scrollTo(0, y); }
});
$("ecran").addEventListener("change", e => {
  if (vue !== "reglages") return;
  if (e.target.id === "date-debut" && e.target.value) {
    const d = new Date(e.target.value + "T12:00:00");
    if (d.getDay() !== 1 && !confirm("Ce n'est pas un lundi. Le programme commence normalement un lundi. Garder cette date ?")) { e.target.value = debutProgramme(); return; }
    R.dateDebut = e.target.value; sauverReglages(); reconstruire(); index = indexAujourdhui(); return;
  }
  if (e.target.dataset.heure) { R.heures[e.target.dataset.heure] = e.target.value; sauverReglages(); }
});

// =====================================================================
// 15. EXPORT, SAUVEGARDE, CALENDRIER
// =====================================================================
function partager(fichiers) {
  if (navigator.canShare && navigator.canShare({ files: fichiers })) navigator.share({ files: fichiers }).catch(() => {});
  else fichiers.forEach(f => { const a = document.createElement("a"); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); });
}
const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Un seul fichier CSV à coller tel quel dans l'onglet Import de l'Excel.
// Colonne Type : Séance, Séance libre, Mesure, Voie, Douleur. Colonnes C1 à C8 selon le type.
function exporter() {
  const champ = v => typeof v === "number" ? v : `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lignes = [["Type","Semaine","Jour","Activité","Date","C1","C2","C3","C4","C5","C6","C7","C8"]];
  LISTE.forEach(s => {
    const d = lire(s), base = [s.semaine, s.jour, s.activite, isoDate(dateSeance(s))], act = actReleve(s, d);
    const notes = [s.libre && s.phase !== "Séance libre" ? s.phase : "",
      nomVersion(s, d) && (d.fait || d.debut) ? "Version : " + nomVersion(s, d) : "", d.notes,
      (d.voies || []).length ? "Relevé : " + d.voies.map(resume).join(", ") : "",
      (d.douleurs || []).length ? "Douleurs : " + d.douleurs.map(x => `${x.zone} ${x.niv} (${x.heure})`).join(", ") : "",
      d.debut && d.fin ? `Temps : ${hm((d.fin - d.debut) / 1000)} (prévu ${hm(dureeTotale(s, d))})` + (d.temps ? " — " + etapesDe(elementsDe(s, d))
        .filter(x => d.temps[ck(d, x.i)]).map((x, n) => `${n + 1}. ${Math.round(d.temps[ck(d, x.i)] / 60000)}/${Math.round(dureeElement(s, d, x.e) / 60)} min`).join(", ") : "") : ""
    ].filter(Boolean).join(" | ");
    lignes.push([s.libre ? "Séance libre" : "Séance", ...base, d.fait, d.duree, d.effort, d.douleur, d.zone,
                 perfFinale(d, act), secFinal(d), notes]);
    (d.voies || []).forEach(v => { const a = v.act || s.activite;
      lignes.push(["Voie", s.semaine, s.jour, a, base[3], v.cot, v.profil, v.res,
        v.res === "Enchaînée" ? 0 : v.res === "Avec sec" ? v.sec : "", rang(a, v.cot) + 1]); });
    (d.douleurs || []).forEach(x => lignes.push(["Douleur", ...base, x.zone, x.niv, x.heure]));
  });
  const derniere = Math.max(...LISTE.map(s => s.semaine));
  for (let sem = 1; sem <= derniere; sem++) {
    const m = lireMesures(sem), a = autoSemaine(sem);
    lignes.push(["Mesure", sem, "", "", "", ...CHAMPS_MESURES.map(([c]) => vide(m[c]) ? (a[c] ?? "") : m[c])]);
  }
  const csv = "\uFEFF" + lignes.map(l => l.map(champ).join(";")).join("\r\n");
  const sauvegarde = {};
  Object.keys(localStorage).filter(k => /^(seance-|mesures-|libre-|libres$|reglages$|favoris$)/.test(k)).forEach(k => sauvegarde[k] = localStorage.getItem(k));
  const jour = isoDate(new Date());
  partager([new File([csv], `export-escalade-${jour}.csv`, { type: "text/csv" }),
            new File([JSON.stringify(sauvegarde)], `sauvegarde-escalade-${jour}.json`, { type: "application/json" })]);
  localStorage.setItem("dernier-export", Date.now());
  infoExport();
}

function restaurer(e) {
  const f = e.target.files[0]; if (!f) return;
  f.text().then(t => {
    const donnees = JSON.parse(t);
    if (!confirm(`Restaurer ${Object.keys(donnees).length} éléments ? Les saisies actuelles de ces séances seront remplacées.`)) return;
    Object.entries(donnees).forEach(([k, v]) => localStorage.setItem(k, v));
    R = { ...REGLAGES_DEFAUT, ...JSON.parse(localStorage.getItem("reglages") || "{}") };
    reconstruire(); alert("Sauvegarde restaurée."); vue = "seance"; afficher();
  }).catch(() => alert("Ce fichier n'est pas une sauvegarde valide."));
}

// Fichier calendrier (.ics) : toutes les séances à venir, avec un rappel
function calendrier() {
  const auj = new Date(); auj.setHours(0, 0, 0, 0);
  const f = x => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
  const txt = t => String(t).replace(/[,;\\]/g, m => "\\" + m);
  const l = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Escalade//FR", "CALSCALE:GREGORIAN"];
  const futures = LISTE.filter(s => !s.libre && dateSeance(s) >= auj);
  futures.forEach(s => {
    const [hh, mm] = (R.heures[s.activite] || "18:00").split(":").map(Number);
    const debut = dateSeance(s); debut.setHours(hh, mm, 0, 0);
    const fin = new Date(debut.getTime() + (DUREES_CALENDRIER[s.activite] || 60) * 60000);
    l.push("BEGIN:VEVENT", `UID:${cle(s)}@escalade`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTSTART:${f(debut)}`, `DTEND:${f(fin)}`, `SUMMARY:${txt("Escalade · " + s.activite)}`,
      `DESCRIPTION:${txt("Semaine " + s.semaine + " · " + s.phase)}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${txt("Séance : " + s.activite)}`, `TRIGGER:-PT${R.avance}M`, "END:VALARM", "END:VEVENT");
  });
  l.push("END:VCALENDAR");
  if (!futures.length) return alert("Aucune séance à venir dans le programme.");
  partager([new File([l.join("\r\n")], "seances-escalade.ics", { type: "text/calendar" })]);
}

// Rappel : depuis quand le dernier export ?
function infoExport() {       // pastille orange sur l'onglet Plus si le dernier export date de plus de 7 jours
  $("pastille-plus").style.display = texteExport().retard ? "block" : "none";
}

// =====================================================================
// 16. MISE À JOUR : bandeau quand une nouvelle version est prête
// =====================================================================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(reg => {
    const proposer = w => { if (!w) return;
      $("bandeau").style.display = "block"; $("bandeau").onclick = () => w.postMessage("mettre-a-jour"); };
    if (reg.waiting && navigator.serviceWorker.controller) proposer(reg.waiting);
    reg.addEventListener("updatefound", () => {
      const w = reg.installing;
      w.addEventListener("statechange", () => { if (w.state === "installed" && navigator.serviceWorker.controller) proposer(w); });
    });
    reg.update().catch(() => {});
  }).catch(() => {});
  let recharge = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (!recharge) { recharge = true; location.reload(); } });
}

// =====================================================================
// 17. NAVIGATION
// =====================================================================
// Ligne sous l'en-tête : « ⏱ 0:47 · ≈ 1 h 50 prévu · fin vers 20:35 »
function majInfosSeance() {
  const el = $("infos-seance"), s = vue === "seance" ? courant() : null;
  if (!s) { el.style.display = "none"; document.documentElement.style.setProperty("--haut-entete", "63px"); return; }
  const d = lire(s), total = dureeTotale(s, d);
  let t = `≈ ${hm(total)} prévu`;
  if (d.debut && !d.fin) {
    const ecoule = (Date.now() - d.debut) / 1000, els = elementsDe(s, d), k = prochain(s, d);
    const reste = els.reduce((r, e, i) => i < k || k < 0 || (e.type === "routine" ? routineOk(d, i) : e.type === "action" && compte(d, i) >= e.n) ? r : r + dureeElement(s, d, e), 0)
                  - (k >= 0 ? Math.min(tempsEtapeEnCours(d), dureeElement(s, d, els[k])) : 0);
    const fin = new Date(Date.now() + Math.max(0, reste) * 1000);
    t = `⏱ ${Math.floor(ecoule / 3600)}:${pad(Math.floor(ecoule / 60) % 60)} · ≈ ${hm(total)} · fin ${fin.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" })}`;
  } else if (d.fin) t = `Séance faite en ${hm((d.fin - d.debut) / 1000)} · ${t}`;
  el.textContent = t; el.style.display = "block";
  const te = $("temps-etape");                                    // temps passé sur l'étape en cours, mis à jour en continu
  if (te && d.debut && !d.fin) { const passe = tempsEtapeEnCours(d), prevu = Number(te.dataset.prevu);
    te.textContent = `${hm(passe)} sur ≈ ${hm(prevu)}`; te.classList.toggle("retard", passe > prevu); }
  document.documentElement.style.setProperty("--haut-entete", document.querySelector("header").offsetHeight + "px");
  $("mn-ecoule").textContent = d.debut && !d.fin ? t.split(" · ")[0] + " écoulé" : "";
}
function afficher(enHaut = true) {
  if (vue === "seance" && !courant()) { vue = "semaine"; semaineVue = Math.max(1, semaineDe(new Date())); }
  ({ seance: afficherSeance, semaine: afficherSemaine, creation: afficherCreation, plus: afficherPlus,
     biblio: afficherBiblio, reglages: afficherReglages, sauvegarde: afficherSauvegarde })[vue]();
  // Onglet actif, flèches, menu ⋯ et ligne de temps selon l'écran
  const onglet = { seance: "seance", semaine: "semaine", creation: "semaine" }[vue] || "plus";
  document.querySelectorAll("#onglets button").forEach(b => b.classList.toggle("actif", b.dataset.onglet === onglet));
  const fleches = vue === "seance" || vue === "semaine";
  ["prec", "suiv"].forEach(id => $(id).style.visibility = fleches ? "visible" : "hidden");
  $("btn-menu").style.display = vue === "seance" && courant() ? "" : "none";
  document.body.dataset.activite = vue === "seance" && courant() ? (actReleve(courant(), lire(courant())) === "Bloc" ? "Bloc" : courant().activite) : "";
  infoExport(); majInfosSeance();
  if (enHaut) window.scrollTo(0, 0);
}
function changer(i) { vue = "seance"; index = i; ouverts = new Set(); formVoie = null; afficher(); }
const precedent = () => vue === "semaine" ? ouvrirSemaine(semaineVue - 1) : vue === "seance" && LISTE.length && changer(Math.max(0, index - 1));
const suivant = () => vue === "semaine" ? ouvrirSemaine(semaineVue + 1) : vue === "seance" && LISTE.length && changer(Math.min(LISTE.length - 1, index + 1));
$("prec").onclick = precedent;
$("suiv").onclick = suivant;
$("btn-menu").onclick = () => courant() && ouvrirModal({ type: "menu" });
// Onglets du bas
document.querySelectorAll("#onglets button").forEach(b => b.onclick = () => {
  const o = b.dataset.onglet;
  if (o === "seance") { vue = "seance"; if (index < 0 || !courant()) index = indexAujourdhui(); afficher(); }
  if (o === "semaine") ouvrirSemaine(vue === "seance" && courant() ? courant().semaine : semaineVue > 1 ? semaineVue : semaineActuelle());
  if (o === "plus") ouvrirPlus();
});
// Balayage gauche/droite sur l'en-tête : séance (ou semaine) précédente / suivante
let departBalayage = null;
document.querySelector("header").addEventListener("touchstart", e => { departBalayage = e.touches[0].clientX; }, { passive: true });
document.querySelector("header").addEventListener("touchend", e => {
  if (departBalayage === null) return;
  const dx = e.changedTouches[0].clientX - departBalayage; departBalayage = null;
  if (Math.abs(dx) > 60) dx > 0 ? precedent() : suivant();
});

afficher();
if (T) { if (T.fini) { T = null; sauverT(); } else boucle(); }   // reprend un minuteur en cours
if (seanceEnCours(dCourant())) garderEcran();
verifierSeanceOuverte();                                          // séance d'un jour précédent restée ouverte
