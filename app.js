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
const APP_VERSION = "5.5";
const REPOS_DEFAUT = { Voie: 300, Bloc: 180, Maison: 90 };   // secondes, si la ligne n'indique rien
const COTATIONS = { Voie: ["3","4","4c","5a","5b","5c","6a","6b","6c"], Bloc: ["2","3","4","5","6","7"] };
COTATIONS["Escalade extérieur"] = COTATIONS.Voie;               // se note comme une voie
const ACTIVITES_LIBRES = ["Voie","Bloc","Maison","Course","Escalade extérieur","Autre sport"];
const JOURS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const PROFILS = ["Dalle", "Vertical", "Léger dévers", "Dévers", "Toit"];
const STYLES = ["À vue", "Flash", "Après travail"];
const CAUSES = ["Lecture", "Pieds", "Placement ou gainage", "Force", "Endurance", "Peur"];
const COULEURS = [["Rouge", "#D93636"], ["Rose", "#F48FB1"], ["Fuchsia", "#D81B60"], ["Orange", "#F28C28"], ["Jaune", "#F2D34B"], ["Vert clair", "#9CCC65"],
                  ["Vert", "#3FA066"], ["Vert foncé", "#1B5E20"], ["Turquoise", "#26A69A"], ["Bleu clair", "#4FC3F7"], ["Bleu", "#2E6FB7"], ["Bleu foncé", "#0D2B6B"],
                  ["Violet", "#7B5EA7"], ["Mauve", "#C3A6E0"], ["Marron", "#8B5A2B"], ["Beige", "#E8D5B5"], ["Gris", "#9AA5AD"], ["Noir", "#222222"], ["Blanc", "#F5F5F5"]];
// Couleurs d'une salle : la palette commune + celles ajoutées dans la salle (Réglages)
const couleursDe = sid => [...COULEURS, ...(((sid && salleDe(sid)) || {}).couleurs || []).map(x => [x.nom, x.hex])];
const ESCALADE = ["Voie", "Bloc", "Escalade extérieur"];
const enDevers = p => ["Léger dévers", "Dévers", "Toit"].includes(p);
const reussi = v => v.res === "Enchaînée" || v.res === "Réussi";
const URL_GUIDE = "aide.html";                     // guide d'utilisation (❓ Aide), dans le dossier de l'app
// Paramètres réglables dans Programme.xlsx (onglet Paramètres), transmis par data.js
const PA = (nom, defaut) => typeof PARAMS !== "undefined" && PARAMS[nom] !== undefined ? PARAMS[nom] : defaut;
const DUREE_MAX = 240;                                           // minutes : au-delà, l'écran n'est plus maintenu allumé
const DUREES_CALENDRIER = { Voie: 120, Bloc: 120, Maison: 25, Course: 40, "Repos actif": 45 };

// Réglages personnels, modifiables dans l'app (écran Exercices, en bas)
const REGLAGES_DEFAUT = {
  auto: false,           // repos manuel par défaut (bouton « ⏱ Repos ») ; true : il démarre tout seul après un passage
  releve: true,          // demander le résultat d'une voie en touchant le rond
  son: true, volume: "moyen", silencieux: true,
  bip10: true, bip321: true, bipFin: true, bipFractions: true,
  heures: { Voie: "19:00", Bloc: "10:00", Maison: "19:00", Course: "18:30", "Repos actif": "18:00" },
  avance: 60,            // minutes avant la séance pour le rappel du calendrier
  tVoie: PA("temps_voie", 4), tBloc: PA("temps_bloc", 1.5),  // minutes par voie et par bloc (estimation des durées)
  ajuster: true,         // remplacer ces valeurs par ta moyenne réelle après quelques séances
  mode: "programme",     // "programme" : suit le programme ; "libre" : uniquement les séances créées
  dateDebut: ""          // vide = date de début du programme (data.js)
};
let R = { ...REGLAGES_DEFAUT, ...JSON.parse(localStorage.getItem("reglages") || "{}") };
if (!localStorage.getItem("migration-v54")) { R.auto = false; localStorage.setItem("reglages", JSON.stringify(R)); localStorage.setItem("migration-v54", "1"); }   // repos manuel par défaut
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
  d.setDate(d.getDate() + (s.semaine - 1) * 7 + JOURS.indexOf(s.deplace || s.jour));
  return d;
}
const cle = s => s.libre ? `libre-${s.id}` : `seance-${s.semaine}-${s.jour}-${s.activite}`;
const jourDe = s => s.deplace || s.jour;                    // jour réel (après un éventuel déplacement)
const lireDeplacements = () => JSON.parse(localStorage.getItem("deplacements") || "{}");
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
  memoriser(k); d.dernierGeste = Date.now(); cacheFeux = null;
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
// =====================================================================
// MODIFIER LE PROGRAMME DANS L'APP : opérations appliquées par-dessus le programme fourni,
// reportées dans Programme.xlsx par escalade.py (puis oubliées par l'app, voir MODIFS_APPLIQUEES)
// =====================================================================
const lireOps = () => { const appl = typeof MODIFS_APPLIQUEES !== "undefined" ? MODIFS_APPLIQUEES : [];
  return JSON.parse(localStorage.getItem("modifs-programme") || "[]").filter(o => !appl.includes(o.id)); };
function ajouterOps(ops) {
  const l = lireOps(); ops.forEach(o => l.push({ id: "m" + Date.now() + Math.floor(Math.random() * 1e6), ...o }));
  localStorage.setItem("modifs-programme", JSON.stringify(l)); reconstruire(); cacheFeux = null;
}
function programmeEffectif() {
  let P = SEANCES.map(s => ({ ...s }));
  lireOps().forEach(o => {
    const meme = s => s.semaine === o.semaine && s.jour === o.jour && s.activite === o.activite;
    if (o.op === "pause") P.forEach(s => { if (s.semaine >= o.depuis) s.semaine += o.n; });
    else if (o.op === "del") P = P.filter(s => !meme(s));
    else if (o.op === "set") { const x = P.find(meme);
      if (x) { x.contenu = o.contenu; if (o.phase) x.phase = o.phase; x.modifie = true; }
      else P.push({ semaine: o.semaine, jour: o.jour, activite: o.activite, phase: o.phase || "", contenu: o.contenu, modifie: true }); }
  });
  return P;
}
const aDesSaisies = s => { const d = lire(s); return !!(d.debut || d.fait || (d.voies || []).length || Object.keys(d.compteurs || {}).length); };
const seancesSemaine = w => LISTE.filter(s => s.semaine === w && !s.libre);

// ---------- Copier une séance ----------
function htmlCopier() {
  const s = courant(), dest = LISTE.filter(x => x.semaine === M.semaine && x.jour === M.jour && !x.libre);
  const occupe = dest.some(aDesSaisies);
  return `<h2>Copier la séance</h2><p class="petit">${esc(s.activite)} · semaine ${s.semaine}, ${esc(s.jour.toLowerCase())}. Vers :</p>
    <label class="champ">Semaine</label><div class="compteur"><button data-m="cp-sem" data-pas="-1">−</button><span>${M.semaine}</span><button data-m="cp-sem" data-pas="1">+</button></div>
    <label class="champ">Jour</label><div class="choix">${JOURS.map(j => `<button data-m="cp-jour" data-valeur="${j}" class="${M.jour === j ? "choisi" : ""}">${j.slice(0, 3)}</button>`).join("")}</div>
    <p class="petit">${dest.length ? `Ce jour-là : ${dest.map(x => esc(x.activite)).join(", ")}${occupe ? " (déjà commencée : on ne peut que l'ajouter à côté)" : ""}.` : "Aucune séance ce jour-là."}</p>
    <div class="actions"><button data-m="fermer">Annuler</button>
      ${dest.length && !occupe ? `<button data-m="cp-ok" data-valeur="remplacer">Remplacer</button>` : ""}
      <button data-m="cp-ok" data-valeur="ajouter" class="principal">${dest.length ? "Ajouter à côté" : "Copier"}</button></div>`;
}
function copierSeance(mode) {
  const s = courant(), etat = M;
  if (s.libre) {            // séance créée : on en crée une autre
    const libre = { id: Date.now(), semaine: etat.semaine, jour: etat.jour, activite: s.activite, phase: s.phase, contenu: s.contenu };
    localStorage.setItem("libres", JSON.stringify([...lireLibres(), libre])); reconstruire();
  } else {
    const ops = [];
    if (mode === "remplacer") LISTE.filter(x => x.semaine === etat.semaine && x.jour === etat.jour && !x.libre).forEach(x => ops.push({ op: "del", semaine: x.semaine, jour: x.jour, activite: x.activite }));
    ops.push({ op: "set", semaine: etat.semaine, jour: etat.jour, activite: s.activite, phase: s.phase, contenu: s.contenu });
    ajouterOps(ops);
  }
  fermerModal(); montrerAnnulation("Séance copiée", annulerDernieresOps(mode === "remplacer" ? 2 : 1, s.libre));
  afficher(false);
}
const annulerDernieresOps = (n, libre) => () => {
  if (libre) { const l = lireLibres(); l.pop(); localStorage.setItem("libres", JSON.stringify(l)); }
  else { const l = lireOps(); l.splice(-n); localStorage.setItem("modifs-programme", JSON.stringify(l)); }
  reconstruire(); afficher(false);
};

// ---------- Outils de la semaine : copier, répéter, pause ----------
function htmlOutilsSemaine() {
  const w = M.semaine;
  return `<h2>Semaine ${w}</h2>
    <div class="outil"><b>Copier cette semaine</b><p class="petit">Remplace les séances de la semaine choisie (sauf si elles sont déjà commencées).</p>
      <div class="ligne-outil"><span>vers la semaine</span><div class="compteur"><button data-m="os-dest" data-pas="-1">−</button><span>${M.dest}</span><button data-m="os-dest" data-pas="1">+</button></div>
      <button class="principal" data-m="os-copier">Copier</button></div></div>
    <div class="outil"><b>Répéter cette semaine</b><p class="petit">Copie la semaine sur les semaines qui suivent.</p>
      <div class="ligne-outil"><span>sur</span><div class="compteur"><button data-m="os-rep" data-pas="-1">−</button><span>${M.rep}</span><button data-m="os-rep" data-pas="1">+</button></div><span>semaine${M.rep > 1 ? "s" : ""}</span>
      <button class="principal" data-m="os-repeter">Répéter</button></div></div>
    <div class="outil"><b>Mettre en pause</b><p class="petit">Vacances, maladie ? Les semaines ${w} et suivantes sont décalées ; les semaines passées ne bougent pas.</p>
      <div class="ligne-outil"><span>décaler de</span><div class="compteur"><button data-m="os-pause-n" data-pas="-1">−</button><span>${M.pause}</span><button data-m="os-pause-n" data-pas="1">+</button></div><span>semaine${M.pause > 1 ? "s" : ""}</span>
      <button class="principal" data-m="os-pause">Décaler</button></div></div>
    <div class="actions"><button data-m="fermer">Fermer</button></div>`;
}
function copierSemaine(src, dests) {
  const ops = [], refus = [];
  dests.forEach(w => {
    const cible = seancesSemaine(w);
    if (cible.some(aDesSaisies)) { refus.push(w); return; }
    cible.forEach(x => ops.push({ op: "del", semaine: w, jour: x.jour, activite: x.activite }));
    seancesSemaine(src).forEach(x => ops.push({ op: "set", semaine: w, jour: x.jour, activite: x.activite, phase: x.phase, contenu: x.contenu }));
  });
  if (ops.length) { ajouterOps(ops); montrerAnnulation(`Semaine copiée${dests.length > 1 ? ` sur ${dests.length - refus.length} semaines` : ""}`, annulerDernieresOps(ops.length)); }
  if (refus.length) alert(`Non copiée sur la semaine ${refus.join(", ")} : elle contient déjà des séances commencées.`);
}
function mettreEnPause(depuis, n) {
  if (LISTE.some(s => !s.libre && s.semaine >= depuis && aDesSaisies(s))) return alert(`Impossible : des séances de la semaine ${depuis} ou après sont déjà commencées.`);
  ajouterOps([{ op: "pause", depuis, n }]); montrerAnnulation(`Programme décalé de ${n} semaine${n > 1 ? "s" : ""}`, annulerDernieresOps(1));
}

// ---------- Éditeur de séance ----------
const DECOMP = l => {
  const m = l.match(/^(\d+)\s*×\s*(.*)$/); if (!m) return null;
  let corps = m[2]; const x = { n: Number(m[1]) };
  const r = corps.match(/\(repos\s+(\d+)\s*(min|s)\)/); if (r) { x.repos = r[2] === "min" ? Number(r[1]) : Math.round(Number(r[1]) / 60 * 10) / 10; corps = corps.replace(r[0], ""); }
  const d = corps.match(/\(durée\s+(\d+)\s*(min|s)\)/); if (d) { x.duree = Number(d[1]); corps = corps.replace(d[0], ""); }
  const t = corps.match(/\[(effort|facile)\]/i); if (t) { x.tag = t[1].toLowerCase(); corps = corps.replace(t[0], ""); }
  x.corps = corps.replace(/\s+/g, " ").trim(); return x;
};
const RECOMP = x => `${x.n}× ${x.corps}${x.tag ? ` [${x.tag}]` : ""}${x.duree ? ` (durée ${x.duree} min)` : ""}${x.repos ? ` (repos ${x.repos} min)` : ""}`;
function ouvrirEditeur() {
  const s = courant();
  ouvrirModal({ type: "editeur", lignes: s.contenu.split("\n").map(l => l.trim()).filter(Boolean), texte: false, ajout: "" });
}
function htmlEditeur() {
  const s = courant(), avertir = aDesSaisies(s);
  const routines = [...new Set(ROUTINES.map(r => r.routine))];
  let h = `<h2>Modifier la séance</h2><p class="petit">${esc(s.activite)} · semaine ${s.semaine}, ${esc(s.jour.toLowerCase())}</p>
    ${avertir ? `<div class="avert">Cette séance est déjà commencée : changer l'ordre ou le nombre de lignes peut décaler les passages notés.</div>` : ""}
    <div class="segment"><button data-m="ed-mode" data-valeur="0" class="${!M.texte ? "choisi" : ""}">Lignes</button><button data-m="ed-mode" data-valeur="1" class="${M.texte ? "choisi" : ""}">Texte</button></div>`;
  if (M.texte) h += `<textarea id="ed-texte" class="ed-texte">${esc(M.lignes.join("\n"))}</textarea>
    <p class="petit">Syntaxe : <code>&gt; Routine</code> · <code>! Consigne</code> · <code>3× Voie en 5b · « Exercice » (repos 4 min)</code> · <code>## Version</code></p>`;
  else h += M.lignes.map((l, k) => {
    const fl = `<span class="ed-fleches"><button data-m="ed-haut" data-k="${k}" aria-label="Monter">↑</button><button data-m="ed-bas" data-k="${k}" aria-label="Descendre">↓</button><button data-m="ed-suppr" data-k="${k}" aria-label="Supprimer">✕</button></span>`;
    if (l.startsWith("##")) return `<div class="ed-ligne ed-version"><b>Version : ${esc(l.slice(2).trim())}</b>${fl}</div>`;
    if (l.startsWith(">")) return `<div class="ed-ligne"><span>▸ ${esc(l.slice(1).trim())} <span class="petit">(routine)</span></span>${fl}</div>`;
    if (l.startsWith("!")) return `<div class="ed-ligne"><span class="petit">${esc(sansGuillemets(l.slice(1).trim()))}</span>${fl}</div>`;
    const x = DECOMP(l); if (!x) return `<div class="ed-ligne"><span>${esc(l)}</span>${fl}</div>`;
    return `<div class="ed-ligne ed-action"><div class="ed-haut"><span>${esc(sansGuillemets(x.corps))}</span>${fl}</div>
      <div class="ed-reglages"><span class="compteur"><button data-m="ed-n" data-k="${k}" data-pas="-1">−</button><span>${x.n}×</span><button data-m="ed-n" data-k="${k}" data-pas="1">+</button></span>
        <select data-ed-repos="${k}"><option value="">repos auto</option>${[1, 2, 3, 4, 5, 10].map(r => `<option value="${r}" ${x.repos === r ? "selected" : ""}>repos ${r} min</option>`).join("")}</select>
        <select data-ed-tag="${k}"><option value="">type auto</option><option value="facile" ${x.tag === "facile" ? "selected" : ""}>facile</option><option value="effort" ${x.tag === "effort" ? "selected" : ""}>effort</option></select></div></div>`;
  }).join("") + `<div class="ed-ajouts">
      <button class="lien" data-m="ed-exos">📖 Voir les exercices de cette séance</button>
      <select id="ed-exo"><option value="">+ Exercice…</option>${optionsExercices("")}</select>
      <select id="ed-routine"><option value="">+ Routine…</option>${routines.map(r => `<option>${esc(r)}</option>`).join("")}</select>
      <div class="ajout-secteur"><input type="text" id="ed-consigne" placeholder="+ Consigne"><button data-m="ed-consigne">Ajouter</button></div></div>`;
  return h + `<div class="actions"><button data-m="fermer">Annuler</button><button data-m="ed-ok" class="principal">Enregistrer</button></div>`;
}
function enregistrerEditeur() {
  if (M.texte) M.lignes = ($("ed-texte").value || "").split("\n").map(l => l.trim()).filter(Boolean);
  const s = courant(), contenu = M.lignes.join("\n");
  fermerModal();
  if (s.libre) { const l = lireLibres(), x = l.find(y => y.id === s.id); x.contenu = contenu; localStorage.setItem("libres", JSON.stringify(l)); reconstruire(); }
  else ajouterOps([{ op: "set", semaine: s.semaine, jour: s.jour, activite: s.activite, phase: s.phase, contenu }]);
  const k = LISTE.findIndex(x => cle(x) === cle(s)); if (k >= 0) index = k;
  afficher(false);
}

// ---------- Préparer le bloc suivant ----------
function pointsFaiblesApp() {
  const limite = Date.now() - 8 * 7 * 864e5, T = toutesVoies().filter(v => { const s = LISTE.find(x => cle(x) === v.seance); return s && dateSeance(s).getTime() >= limite; });
  const profils = PROFILS.map(p => { const l = T.filter(v => v.profil === p); return { p, n: l.length, taux: l.length ? l.filter(reussi).length / l.length : 1 }; })
    .filter(x => x.n >= PA("faible_essais", 5)).sort((a, b) => a.taux - b.taux);
  const causes = {}; T.forEach(v => { if (v.cause) causes[v.cause] = (causes[v.cause] || 0) + 1; });
  const cause = Object.entries(causes).sort((a, b) => b[1] - a[1])[0];
  return { profil: profils[0] && profils[0].taux < 1 ? profils[0].p : null, cause: cause ? cause[0] : null };
}
function brouillonBlocSuivant() {
  const prog = LISTE.filter(s => !s.libre), wmax = Math.max(...prog.map(s => s.semaine)), debut = wmax - 7;
  const bloc = Math.ceil((wmax + 1) / 8), F = feuxVerts(), ok = id => (F.find(f => f.id === id) || {}).ok;
  const niv = id => ((F.find(f => f.id === id) || {}).titre || "").split("le ").pop();
  const pf = pointsFaiblesApp(), conseils = typeof CONSEILS !== "undefined" ? CONSEILS : [];
  const conseil = pf.cause ? conseils.find(c => c.type === "Cause" && c.valeur === pf.cause) : pf.profil ? conseils.find(c => c.type === "Profil" && c.valeur === pf.profil) : null;
  const changements = new Set();
  const seances = prog.filter(s => s.semaine >= debut).map(s => {
    let c = s.contenu;
    const avant = c;
    c = c.replace(/(\d+) min de course/g, (m, n) => { const v = Math.min(60, Number(n) + 5); if (v !== Number(n)) changements.add("Course : +5 minutes par sortie"); return `${v} min de course`; });
    if (ok("voie5c")) c = c.replace(/voie 5b([^(\n]*)\(5c si feu vert\)/g, (m, x) => { changements.add("Projets en voie : 5b → 5c (feu vert atteint)"); return `voie 5c${x}(6a si feu vert)`; });
    if (ok("voie6a")) c = c.replace(/voie 5c([^(\n]*)\(6a si feu vert\)/g, (m, x) => { changements.add("Essais : 5c → 6a (feu vert atteint)"); return `voie 6a${x.trimEnd()}`; });
    if (ok("bloc6")) c = c.replace(/bloc 5 vertical \(6 si feu vert\)/g, () => { changements.add("Projets en bloc : 5 → 6 (feu vert atteint)"); return "bloc 6 vertical"; });
    const nv = niv("deversVoie"); if (["5b", "5c", "6a"].includes(nv)) c = c.replace(/5a en dévers/g, () => { changements.add(`Voies en dévers : niveau ${nv}`); return `${nv} en dévers`; });
    const nb = niv("deversBloc"); if (["5", "6"].includes(nb)) c = c.replace(/Bloc niveau 4 en dévers/g, () => { changements.add(`Blocs en dévers : niveau ${nb}`); return `Bloc niveau ${nb} en dévers`; });
    const rel = s.semaine - debut + 1;
    if (conseil && (rel === 3 || rel === 4) && ESCALADE.includes(s.activite)) {
      const lignes = c.split("\n"), k = lignes.findIndex(l => !l.startsWith(">") && !l.startsWith("##"));
      lignes.splice(k < 0 ? lignes.length : k, 0, `! Point faible du bloc précédent : ${(pf.cause || pf.profil).toLowerCase()}. Travaille ${conseil.exercices}.`);
      c = lignes.join("\n"); changements.add(`Semaines ${debut + 2 + 8} et ${debut + 3 + 8} : travail du point faible (${(pf.cause || pf.profil).toLowerCase()})`);
    }
    return { semaine: s.semaine + 8, jour: s.jour, activite: s.activite, phase: (s.phase || "").replace(/^B\d+/, "B" + bloc), contenu: c };
  });
  return { debut: debut + 8, fin: wmax + 8, bloc, seances, changements: [...changements] };
}
function htmlBlocSuivant() {
  const b = M.brouillon;
  return `<h2>Bloc ${b.bloc} · semaines ${b.debut} à ${b.fin}</h2>
    <p class="petit">Brouillon construit à partir du bloc ${b.bloc - 1} et de tes résultats (${b.seances.length} séances). Rien n'est appliqué avant ta validation ; tu pourras ensuite modifier chaque séance.</p>
    <div class="carte"><b>Ajustements proposés</b>${b.changements.length ? `<ul>${b.changements.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : `<p class="petit">Aucun : le bloc est recopié tel quel (pas encore de feu vert atteint ni de point faible détecté).</p>`}</div>
    <div class="actions"><button data-m="fermer">Annuler</button><button data-m="bs-ok" class="principal">Créer le bloc ${b.bloc}</button></div>`;
}

function reconstruire() {
  const libres = lireLibres().map(l => ({ ...l, phase: l.phase || "Séance libre", contenu: l.contenu || "", libre: true }));
  const dep = lireDeplacements();
  LISTE = [...(R.mode === "libre" ? [] : programmeEffectif()), ...libres].map((s, k) => ({ ...s, ordre: k, ...(dep[cle(s)] ? { deplace: dep[cle(s)] } : {}) }))
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
    const type = estVoie(actReleve(s, d)) && !/bloc/i.test(e.texte) ? "Voie" : "Bloc";
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
  if (d.approx) return;                                        // bilan rapide : temps approximatifs, hors moyennes
  const e = elementsDe(s, d)[i];
  if (!e || e.type !== "action" || !estEscalade(e) || e.travail || e.intervalle || e.dureePrevue || compte(d, i) < e.n) return;
  const type = estVoie(actReleve(s, d)) && !/bloc/i.test(e.texte) ? "Voie" : "Bloc";
  const parPassage = (ms / 1000 - Math.max(0, e.n - 1) * reposDe(s, e)) / 60 / (e.n * Math.max(1, e.serie));
  if (!(parPassage >= 0.5 && parPassage <= 20)) return;          // valeur aberrante : ignorée
  const m = lireMoyennes(); m[type] = [...(m[type] || []), Math.round(parPassage * 10) / 10].slice(-10);
  localStorage.setItem("moyennes", JSON.stringify(m));
}
// Temps réel d'une étape (ms) : la saisie manuelle est prioritaire sur la mesure
const tempsReel = (d, k) => d.tempsManuel && d.tempsManuel[k] != null ? d.tempsManuel[k] * 60000 : (d.temps || {})[k];
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
  ok.sort((a, b) => rang(act, b.cot) - rang(act, a.cot) || enDevers(b.profil) - enDevers(a.profil));
  return ok[0].cot + (enDevers(ok[0].profil) ? " dévers" : "");
}
function autoSec(d) {                     // nb de « sec » sur la voie en dévers la plus dure
  const dev = (d.voies || []).filter(v => estVoie(v.act || "Voie") && enDevers(v.profil) && (v.res === "Enchaînée" || v.res === "Avec sec"));
  if (!dev.length) return "";
  const max = Math.max(...dev.map(v => rang("Voie", v.cot)));
  return Math.min(...dev.filter(v => rang("Voie", v.cot) === max).map(v => v.res === "Enchaînée" ? 0 : v.sec));
}
const perfFinale = (d, act) => vide(d.perf) ? (COTATIONS[act] ? autoPerf(d, act) : "") : d.perf;
const secFinal = d => vide(d.sec) ? autoSec(d) : d.sec;
const resume = v => `${v.cot} ${(v.profil || "Vertical").toLowerCase()}${v.couleur ? " " + v.couleur.toLowerCase() : ""} ${v.res === "Avec sec" ? v.sec + " sec" : v.res.toLowerCase()}`;

function autoSemaine(sem) {               // valeurs automatiques de la semaine
  const seances = LISTE.filter(s => s.semaine === sem);
  const entrees = seances.flatMap(s => (lire(s).voies || []).map(v => ({ ...v, act: v.act || s.activite })));
  const meilleur = (act, filtre) => {
    const ok = entrees.filter(filtre);
    if (!ok.length) return "";
    ok.sort((a, b) => rang(act, b.cot) - rang(act, a.cot)); return ok[0].cot + (enDevers(ok[0].profil) ? " dévers" : "");
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
// Une étape est terminée (tous ses passages, ou « étape suivante »), ou passée (sautée volontairement)
const etapeFinie = (d, i, e) => e.type === "routine" ? routineOk(d, i) : e.type === "action" && (compte(d, i) >= e.n || !!(d.finies || {})[ck(d, i)]);
const etapePassee = (d, i) => !!(d.passees || {})[ck(d, i)];
const etapeReglee = (d, i, e) => etapeFinie(d, i, e) || etapePassee(d, i);
// Mode de suivi : « leger » (accompagné : on remplit après) ou « detaille » (passage par passage)
const modeDe = (s, d) => d.mode || (R.modes || {})[s.activite] || "leger";
function prochain(s, d) {
  const els = elementsDe(s, d);
  if (d.focus !== undefined && els[d.focus] && els[d.focus].type !== "info" && !etapeReglee(d, d.focus, els[d.focus])) return d.focus;   // étape choisie
  for (let i = 0; i < els.length; i++) {
    const e = els[i];
    if ((e.type === "routine" || e.type === "action") && !etapeReglee(d, i, e)) return i;
  }
  return -1;
}
// Marquer une étape terminée (ou la rouvrir)
function basculerEtape(i, forcer) {
  const s = courant(), d = lire(s), e = elementsDe(s, d)[i], k = ck(d, i);
  const faite = forcer !== undefined ? !forcer : etapeFinie(d, i, e);
  demarrerSiBesoin(d);
  if (e.type === "routine") { d.routines = d.routines || {}; if (faite) delete d.routines[k]; else d.routines[k] = true; }
  else { d.compteurs = d.compteurs || {}; d.finies = d.finies || {};
    if (faite) { d.compteurs[k] = 0; delete d.finies[k]; } else { d.compteurs[k] = e.n; } }
  if (d.passees) delete d.passees[k];
  if (d.focus === i) delete d.focus;
  ecrire(s, d); garderEcran(); afficher(false); if (!faite) allerAuSuivant();
}
const etapesRoutine = nom => ROUTINES.filter(r => r.routine === nom);
const minutesEtape = r => { const m = String(r.duree || "").match(/^(\d+) min$/); return m ? Number(m[1]) : 0; };
const routineGuidable = nom => etapesRoutine(nom).some(r => minutesEtape(r) > 0);
const titreAction = e => sansGuillemets(e.texte);
// Type d'une étape, pour sa couleur : échauffement, sécurité, facile, effort, récupération
const TYPES_ETAPE = { echauffement: "Échauffement", securite: "Sécurité", facile: "Facile", effort: "Effort", recup: "Récupération" };
function typeEtape(e) {
  if (e.type === "routine") {
    if (/^Vérif|^Contrôle/i.test(e.nom)) return "securite";
    if (/jeudi/i.test(e.nom)) return "recup";
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
  $("titre-date").textContent = `${jourDe(s).slice(0, 3)}. ${jourMois(dateSeance(s))} · sem. ${s.semaine}`;
  const versions = versionsDe(s), elements = elementsDe(s, d), k = prochain(s, d);
  const etapes = etapesDe(elements), enCours = d.debut && !d.fin, sautee = d.fait === "Sautée";
  const faite = (e, i) => etapeReglee(d, i, e);

  // --- Bandeau dans la couleur de l'activité ---
  const sousTitre = d.fin ? `✓ Faite en ${hm((d.fin - d.debut) / 1000)} · prévu ≈ ${hm(dureeTotale(s, d))}`
    : sautee ? "Séance sautée" : `≈ ${hm(dureeTotale(s, d))} · ${etapes.length} étape${etapes.length > 1 ? "s" : ""}`;
  const avant = !d.debut && !sautee && !d.fin;
  let h = `<div class="bandeau-seance"><h1>${esc(act)}</h1><div class="phase">${esc(s.phase)}${s.modifie ? " · modifiée" : ""}</div><div class="sous-titre">${sousTitre}</div>
    ${avant && versions.length > 1 ? `<div class="segment segment-bandeau">${versions.map((v, n) =>
      `<button data-version="${n}" class="${(d.version || 0) === n ? "choisi" : ""}">${esc(v.nom.replace(/\s*\(.*\)\s*$/, ""))}</button>`).join("")}</div>` : ""}
    ${avant ? `<button class="blanc commencer" data-action="demarrer">▶ Commencer</button>
      <div class="liens-bandeau"><button class="lien-blanc" data-action="sauter">Séance sautée</button><button class="lien-blanc" data-action="bilan-rapide">Déjà faite ? Bilan rapide</button></div>` : ""}</div>`;
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
  if (sautee) h += `<p class="petit centre">Cette séance est marquée comme sautée${d.raison ? ` (${esc(d.raison.toLowerCase())})` : ""} · <button class="lien" data-action="desauter">annuler</button></p>`;
  h += ligneDerniereFois(s);

  // --- Version : repliée une fois la séance commencée ---
  if (versions.length > 1 && !d.fin && d.debut) {
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
  if (modeDe(s, d) === "leger" && !d.fin && elements.some(e => e.type === "info"))
    h += `<button class="ligne-pliee" data-plier="consignes">${ouverts.has("consignes") ? "▾" : "▸"} Consignes de la séance</button>`;
  if (repliables.length && !(modeDe(s, d) === "leger" && !d.fin)) h += `<button class="ligne-pliee" data-plier="faites">${ouverts.has("faites") ? "▾" : "▸"} ${repliables.length} étape${repliables.length > 1 ? "s" : ""} ${d.fin ? "" : "faite" + (repliables.length > 1 ? "s" : "")}</button>`;
  elements.forEach((e, i) => {
    if (repliables.includes(i) && !ouverts.has("faites") && !(modeDe(s, d) === "leger" && !d.fin)) return;   // en suivi léger, toute la séance reste visible
    if (d.fin && e.type === "info" && !ouverts.has("faites")) return;
    const num = numeros[i] ? { n: numeros[i], etat: i === k && !d.fin ? "▶" : faite(e, i) ? "✓" : "○", duree: dureeElement(s, d, e), type: typeEtape(e) } : null;
    if (modeDe(s, d) === "leger" && !d.fin) {                         // suivi léger : une ligne par étape, consignes repliées
      if (e.type === "info") { if (ouverts.has("consignes")) h += `<div class="ligne info">${lier(e.texte, i)}</div>`; return; }
      const fin = etapeFinie(d, i, e), passee = etapePassee(d, i);
      h += `<div class="ligne etape compacte type-${num.type} ${fin || passee ? "finie" : ""} ${i === k ? "actuelle" : ""}" data-el="${i}">
        <div class="txt">${entete(num)}<span class="titre-compact">${esc(e.type === "routine" ? e.nom : titreAction(e))}${passee ? " <span class=\"petit\">(passée)</span>" : ""} <span class="petit">${depliee(i) ? "▾" : "▸"}</span></span>${depliee(i) ? panneauEtape(s, d, e, i) : ""}</div>
        <button class="case ${fin ? "ok" : ""}" data-compact="${i}" aria-label="Étape faite">✓</button></div>`;
      return;
    }
    if (e.type === "info") h += `<div class="ligne info">${lier(e.texte, i)}${explication(i)}</div>`;
    if (e.type === "routine") h += ligneRoutine(e, i, d, i === k && !d.fin, num);
    if (e.type === "action") h += ligneAction(s, d, e, i, i === k && !d.fin, num);
  });
  h += `</div>`;

  // --- Avant le démarrage : un seul bouton plein ---

  if (COTATIONS[actReleve(s, d)] && (d.debut || (d.voies || []).length)) h += carteReleve(d, actReleve(s, d));

  if (s.libre) h += `<button class="gros contour danger" data-action="supprimer-libre">Supprimer cette séance</button>`;
  $("ecran").innerHTML = h;
}
// =====================================================================
// FEUX VERTS : critères de progression calculés à partir de tes résultats
// =====================================================================
let cacheFeux = null;
function toutesVoies() {
  return LISTE.flatMap(s => (lire(s).voies || []).map(v => ({ ...v, act: v.act || s.activite, seance: cle(s) })));
}
function feuxVerts() {
  if (cacheFeux) return cacheFeux;
  const vs = toutesVoies();
  let n = 0;
  const id = v => v.couleur || v.nom ? `${v.act}|${v.cot}|${v.couleur || ""}|${v.nom || ""}` : "#" + (n++);
  const differentes = l => new Set(l.map(id)).size;
  const de = (act, cot, filtre = () => true) => vs.filter(v => v.act === act && String(v.cot) === cot && filtre(v));
  const taux = l => l.length ? l.filter(reussi).length / l.length : 0;
  const crit = (t, val, cible, pct = false) => ({ t, val, cible, pct, ok: val >= cible });
  const v5b = de("Voie", "5b"), b5 = de("Bloc", "5");
  // Douleur max sur 28 jours (avant, pendant, après)
  const limite = Date.now() - PA("feu_volume_jours", 28) * 864e5;
  let dmax = 0;
  LISTE.forEach(s => { if (dateSeance(s).getTime() < limite || dateSeance(s) > new Date()) return;
    const d = lire(s); dmax = Math.max(dmax, Number(d.douleur) || 0, Number((d.recup || {}).douleurAvant) || 0, ...(d.douleurs || []).map(x => Number(x.niv) || 0)); });
  const ancien = (Date.now() - new Date(debutProgramme() + "T00:00:00").getTime()) / 864e5;
  const niveau = (act, cots) => { let niv = cots[0];
    for (let k = 0; k < cots.length - 1; k++) if (differentes(de(act, cots[k], v => enDevers(v.profil) && reussi(v))) >= PA("feu_devers", 3)) niv = cots[k + 1]; return niv; };
  const nivVoie = niveau("Voie", ["5a", "5b", "5c", "6a"]), nivBloc = niveau("Bloc", ["4", "5", "6"]);
  const prochain = (act, niv) => differentes(de(act, niv === "6a" || niv === "6" ? niv : niv, v => enDevers(v.profil) && reussi(v)));
  cacheFeux = [
    { id: "voie5c", titre: "Projet en voie 5c", criteres: [crit("Voies 5b différentes réussies sans « sec »", differentes(v5b.filter(v => v.res === "Enchaînée")), PA("feu_5c_voies", 10)),
                                                           crit("Réussite en 5b", Math.round(taux(v5b) * 100), Math.round(PA("feu_5c_taux", 0.7) * 100), true)] },
    { id: "voie6a", titre: "Premier essai en 6a", criteres: [crit("Voies 5c différentes réussies", differentes(de("Voie", "5c", reussi)), PA("feu_6a_voies", 3))] },
    { id: "bloc6", titre: "Projet de bloc 6", criteres: [crit("Réussite en bloc 5", Math.round(taux(b5) * 100), Math.round(PA("feu_bloc6_taux", 0.8) * 100), true),
                                                        crit("Blocs 5 différents réussis", differentes(b5.filter(reussi)), PA("feu_bloc6_blocs", 15)),
                                                        crit("Séances avec un bloc 5 réussi", new Set(b5.filter(reussi).map(v => v.seance)).size, PA("feu_bloc6_seances", 4))] },
    { id: "deversVoie", titre: `Voie en dévers : travailler le ${nivVoie}`, info: true,
      criteres: nivVoie === "6a" ? [] : [crit(`Voies ${nivVoie} différentes réussies en dévers`, prochain("Voie", nivVoie), PA("feu_devers", 3))] },
    { id: "deversBloc", titre: `Bloc en dévers : travailler le ${nivBloc}`, info: true,
      criteres: nivBloc === "6" ? [] : [crit(`Blocs ${nivBloc} différents réussis en dévers`, prochain("Bloc", nivBloc), PA("feu_devers", 3))] },
    { id: "volume", titre: "Plus de volume", criteres: [crit(`Douleur max sur ${PA("feu_volume_jours", 28)} jours (≤ ${PA("feu_volume_douleur", 2)})`, dmax <= PA("feu_volume_douleur", 2) ? 1 : 0, 1), crit("Jours de programme", Math.max(0, Math.floor(ancien)), PA("feu_volume_jours", 28))] },
  ].map(f => ({ ...f, ok: f.criteres.every(c => c.ok) }));
  return cacheFeux;
}
// Bilan de compétences : 8 notes de 1 à 10 à la fin de chaque bloc de 8 semaines
const COMPETENCES = ["Pieds", "Lecture", "Dévers", "Gainage", "Endurance", "Repos", "Profil", "Confiance"];
const AIDE_COMPETENCES = ["Précision et silence des pieds", "Prévoir les mouvements avant de grimper", "Rester collé au mur en dévers", "Tenir le bassin, ne pas laisser partir les pieds",
  "Tenir la durée d'une voie ou d'un circuit", "Trouver et utiliser les positions de repos", "Utiliser profil et drop knee", "Oser, rester calme en hauteur"];
const lireBilan = bloc => JSON.parse(localStorage.getItem("competences-" + bloc) || "null");
function carteCompetences(sem) {
  const bloc = Math.ceil(sem / 8);
  // fin du bloc (semaine 8), ou première semaine du bloc suivant si le bilan n'a pas été fait
  const cible = sem % 8 === 0 ? bloc : sem % 8 === 1 && bloc > 1 && !lireBilan(bloc - 1) ? bloc - 1 : null;
  if (!cible) return "";
  const b = lireBilan(cible);
  if (b) return `<div class="carte competences"><b>Bilan du bloc ${cible}</b> <span class="petit">fait le ${jourMois(new Date(b.date))} · moyenne ${(b.notes.reduce((a, n) => a + n, 0) / b.notes.length).toFixed(1).replace(".", ",")}</span>
    · <button class="lien" data-bilan-bloc="${cible}">modifier</button></div>`;
  return `<div class="carte competences"><b>Fin du bloc ${cible} : ton bilan de compétences</b><p class="petit">8 notes de 1 à 10, en 1 minute. Elles servent à construire le bloc suivant.</p>
    <button class="gros contour" data-bilan-bloc="${cible}">Faire le bilan du bloc ${cible}</button></div>`;
}
// Carte « Feux verts » (onglet Semaine)
function carteFeux() {
  const F = feuxVerts(), atteints = F.filter(f => f.ok && !f.info).length, total = F.filter(f => !f.info).length;
  return `<details class="carte feux ${atteints ? "avec-vert" : ""}" ${ouverts.has("feux") ? "open" : ""}>
    <summary><span class="feu-pastille ${atteints ? "vert" : ""}"></span><b>Feux verts</b> <span class="petit">· ${atteints} sur ${total} atteint${atteints > 1 ? "s" : ""}</span></summary>
    ${F.map(f => `<div class="feu-ligne ${f.info ? "info" : f.ok ? "ok" : ""}"><div class="feu-titre"><span class="feu-pastille ${f.info ? "info" : f.ok ? "vert" : ""}"></span>${esc(f.titre)}${f.ok && !f.info ? ` <span class="feu-badge">Feu vert</span>` : ""}</div>
      ${f.criteres.map(c => `<div class="feu-critere"><span>${esc(c.t)}</span><span class="${c.ok ? "feu-ok" : ""}">${c.t.startsWith("Douleur") ? (c.ok ? "✓" : "trop haute") : c.val + (c.pct ? " %" : "") + " / " + c.cible + (c.pct ? " %" : "")}</span></div>
        <div class="feu-barre ${f.info ? "info" : ""}"><span class="${c.ok ? "ok" : ""}" style="width:${Math.min(100, c.cible ? c.val / c.cible * 100 : 0)}%"></span></div>`).join("")}</div>`).join("")}</details>`;
}
// Rappel dans la séance, sur les lignes « … si feu vert »
function rappelFeu(e) {
  if (e.type !== "action" || !/si feu vert/i.test(e.texte)) return "";
  const id = /6a si feu vert/i.test(e.texte) ? "voie6a" : /5c si feu vert/i.test(e.texte) ? "voie5c" : /6 si feu vert|bloc 6/i.test(e.texte) ? "bloc6" : null;
  const f = id && feuxVerts().find(x => x.id === id); if (!f) return "";
  const c = f.criteres.find(x => !x.ok) || f.criteres[0];
  return `<div class="feu-rappel ${f.ok ? "ok" : ""}">${f.ok ? "🟢 Feu vert atteint : tu peux viser plus haut" : `⚪ ${esc(f.titre)} : ${esc(c.t)} ${c.val}${c.pct ? " %" : ""} / ${c.cible}${c.pct ? " %" : ""}`}</div>`;
}
// Récupération : une réponse ≤ 2 = pas de projet aujourd'hui
function formeDuJour(r) {                         // r = { corps, energie, motivation, douleurAvant }
  if (!r || !r.corps || !r.energie || !r.motivation) return null;
  const mini = Math.min(r.corps, r.energie, r.motivation), dav = Number(r.douleurAvant) || 0;
  if (mini <= PA("forme_rouge", 2) || dav > PA("forme_douleur", 2)) return "rouge";
  if (mini >= PA("forme_vert", 4) && dav === 0) return "vert";
  return "orange";
}
const TEXTE_FORME = { vert: "Forme verte : projet autorisé.", orange: "Forme orange : intensité normale, projets prudents.", rouge: "Forme rouge : pas de projet aujourd'hui, technique uniquement." };
const alerteRecup = d => formeDuJour(d.recup) === "rouge";
const estProjet = e => e.type === "action" && /projet|essai/i.test(e.texte);
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
  if (k === -1) return `<div class="maintenant"><div class="maintenant-temps" id="temps-seance"></div><div class="maintenant-titre">Tout est fait ✓</div>
    <div class="choix"><button class="sur-couleur" data-action="douleur" aria-label="Signaler une douleur">⚠</button>
    <button class="blanc" data-action="fin">■ Terminer la séance</button></div></div>`;
  const e = els[k], etapes = etapesDe(els), rang = etapes.findIndex(x => x.i === k) + 1, leger = modeDe(s, d) === "leger";
  const prevu = dureeElement(s, d, e), passe = d.debut ? tempsEtapeEnCours(d) : 0;
  const barre = `<div class="barre-seance">${etapes.map(x => {
    const fait = etapeReglee(d, x.i, x.e);
    return `<span class="${x.i === k ? "encours" : fait ? "fait" : ""}" style="flex-grow:${Math.max(1, dureeElement(s, d, x.e) / 60)}"></span>`;
  }).join("")}</div>`;
  const suivante = etapes.find(x => x.i !== k && !etapeReglee(d, x.i, x.e) && (x.i > k || d.focus === k));
  const temps = d.debut ? `<span id="temps-etape" data-prevu="${prevu}" class="${passe > prevu ? "retard" : ""}">${hm(passe)} sur ≈ ${hm(prevu)}</span>` : `≈ ${hm(prevu)}`;
  let titre, sous, boutons = "";
  if (e.type === "routine") {
    titre = e.nom; sous = "Routine";
    if (routineGuidable(e.nom)) boutons += `<button data-guide="${k}">▶ Guidé</button>`;
  } else {
    titre = titreAction(e); sous = `Passage ${compte(d, k) + 1} sur ${e.n}`;
    if (e.intervalle || e.travail) boutons += `<button data-chrono="${k}">▶ ${e.travail ? duree(e.travail * (e.cotes ? 2 : 1)) : "Fractions"}</button>`;
    else if (reposDe(s, e) > 0) boutons += `<button data-repos="${k}">⏱ Repos</button>`;
  }
  const fo = formeDuJour(d.recup);
  const bandeauRecup = fo ? `<div class="forme forme-${fo}">${TEXTE_FORME[fo]}</div>`
    : ESCALADE.includes(s.activite) && !d.recup ? `<button class="lien-blanc" data-action="recup">Noter la récupération ▸</button>` : "";
  return `<div class="maintenant ${animer.etape ? "nouvelle" : ""}"><div class="maintenant-temps" id="temps-seance"></div>${bandeauRecup}
    <div class="maintenant-haut"><span>Étape ${rang} sur ${etapes.length} · ${esc(sous)}</span><span>${temps}</span></div>${barre}
    <div class="maintenant-titre">${esc(titre)}</div>
    ${suivante ? `<div class="maintenant-suite">Ensuite : ${esc(suivante.e.type === "routine" ? suivante.e.nom : titreAction(suivante.e))}</div>` : ""}
    <div class="mn-slot"></div>
    <div class="choix choix-carte">${leger ? `<button class="blanc principal-carte" data-etape-faite="${k}">✓ Faite</button>` : `<button class="blanc principal-carte" data-fait="${k}">✓ Fait</button>`}
      <button class="sur-couleur" data-action="etape-suivante">⏭ Suivante</button><button class="sur-couleur" data-action="fin">■ Fin</button></div>
    <div class="petits-boutons"><button data-action="douleur">⚠ Douleur</button>${boutons}<button data-action="mode">Suivi ${leger ? "léger" : "détaillé"} ⇄</button></div></div>`;
}

// Une étape dépliée : consigne, actions, passages, note, dernière fois
function panneauEtape(s, d, e, i) {
  const fin = etapeFinie(d, i, e), passee = etapePassee(d, i), note = (d.notesLignes || {})[ck(d, i)];
  let h = `<div class="panneau-etape">`;
  if (e.type === "routine") h += etapesRoutine(e.nom).map(r => `<p><b>${esc(r.etape)}</b>${r.duree && r.duree !== "—" ? " (" + esc(r.duree) + ")" : ""} : ${esc(r.quoi)}</p>`).join("")
    + (routineGuidable(e.nom) ? `<div class="outils"><button data-guide="${i}">▶ Guidé</button></div>` : "");
  else {
    const repos = reposDe(s, e);
    if (e.intervalle) h += `<div class="outils"><button data-chrono="${i}">▶ ${mmss(e.intervalle.course)} / ${mmss(e.intervalle.marche)}</button></div>`;
    else if (e.travail) h += `<div class="outils"><button data-chrono="${i}">▶ ${duree(e.travail)}${e.cotes ? " × 2 côtés" : ""}</button></div>`;
    if (repos) h += `<p class="petit">Repos prévu : ${duree(repos)}${e.serie ? ` · série de ${e.serie}` : ""}</p>`;
  }
  h += `<div class="choix compact"><button data-et="faite" data-i="${i}" class="${fin ? "choisi" : ""}">${fin ? "✓ Faite" : "✓ Marquer faite"}</button>
    <button data-et="passer" data-i="${i}" class="${passee ? "choisi" : ""}">${passee ? "Passée" : "Passer"}</button><button data-et="aller" data-i="${i}">Aller ici</button></div>`;
  if (e.type === "action") h += `<div class="ligne-outil"><span>Passages</span><div class="compteur"><button data-pp="-1" data-i="${i}">−</button><span>${compte(d, i)}/${e.n}</span><button data-pp="1" data-i="${i}">+</button></div></div>`;
  h += `${note ? `<div class="note">📝 ${esc(note)}</div>` : ""}<button class="lien" data-note-et="${i}">📝 ${note ? "Modifier la note" : "Ajouter une note"}</button>`;
  if (e.type === "action") { const hist = historique(e), avant = noteDerniereFois(e);
    if (hist || avant) h += `<div class="petit"><b>Dernière fois</b></div>${hist}${avant ? `<div class="note ancienne">📝 ${esc(avant)}</div>` : ""}`; }
  return h + `</div>`;
}
const depliee = i => ouverts.has("e" + i);
// Numéro, état (✓ ▶ ○) et durée prévue d'une étape
const entete = num => num ? `<div class="num-etape"><span class="etat">${num.etat}</span> <span class="type-nom">${TYPES_ETAPE[num.type]}</span> · ${num.n}.<span class="duree-prevue">≈ ${hm(num.duree)}</span></div>` : "";
function ligneRoutine(e, i, d, actuelle, num) {
  const ok = routineOk(d, i), etapes = etapesRoutine(e.nom);
  const durees = etapes.map(r => r.duree).filter(x => x && x !== "—");
  const total = durees.length && durees.every(x => /^\d+ min$/.test(x)) ? durees.reduce((t, x) => t + parseInt(x), 0) + " min" : durees.join(" + ");
  return `<div class="ligne etape type-${num ? num.type : "facile"} ${ok ? "finie" : ""} ${actuelle ? "actuelle" : ""}" data-el="${i}">
    <button class="case ${ok ? "ok" : ""}" data-routine="${i}">✓</button>
    <div class="txt">${entete(num)}<span class="titre-etape">${esc(e.nom)}${total ? " · " + esc(total) : ""} ${depliee(i) ? "▾" : "▸"}</span>
    ${depliee(i) ? panneauEtape(courant(), d, e, i) : ""}</div></div>`;
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
  if (repos) outils += `<span class="repos-ligne">repos ${duree(repos)}</span>`;
  // Historique et note précédente : affichés seulement au toucher (« Dernière fois ▸ »)
  const hist = historique(e), detailsAvant = hist || (avant && !note);
  const eviter = alerteRecup(d) && estProjet(e) && c < e.n;
  const ouvert = ouverts.has("h" + i);
  return `<div class="ligne etape type-${num ? num.type : "facile"} ${c >= e.n ? "finie" : ""} ${actuelle ? "actuelle" : ""}" data-action-ligne="${i}" data-el="${i}">
    <div class="txt">${entete(num)}${eviter ? `<span class="a-eviter">À éviter aujourd'hui</span> ` : ""}${lier(e.texte, i)} <span class="petit">${depliee(i) ? "▾" : "▸"}</span>${rappelFeu(e)}${rappelProjets(s, d, e)}${note && !depliee(i) ? `<div class="note">📝 ${esc(note)}</div>` : ""}
    ${explication(i)}${depliee(i) ? panneauEtape(s, d, e, i) : ""}</div>
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
  const pastilles = `<div class="pastilles">${couleursDe(f.salle).map(([n, c]) =>
    `<button data-${attr}="couleur" data-valeur="${n}" class="pastille ${f.couleur === n ? "choisi" : ""}" style="background:${c}" aria-label="${n}"></button>`).join("")}</div>`;
  const echec = f.res && !reussi(f);
  return `${f.salle ? choixVoiesSalle(f, act, attr) : ""}<label class="champ">Cotation${f.salle ? ` <span class="petit">(échelle de la salle)</span>` : ""}</label>${choix("cot", f.salle ? gradesSalle(f.salle, act) : COTATIONS[act])}
    <details class="plus-details" ${f.details ? "open" : ""}><summary>Plus de détails ▸ <span class="petit">${esc(f.profil || "")} · ${esc(f.style || "")}${f.couleur ? " · " + esc(f.couleur) : ""}</span></summary>
    <label class="champ">Profil</label>${segment("profil", PROFILS)}
    <label class="champ">Style</label>${segment("style", STYLES)}
    <label class="champ">Couleur et nom <span class="petit">(facultatif)</span></label>${pastilles}
    <input type="text" id="${attr}-nom" value="${esc(f.nom || "")}" placeholder="Nom ou numéro (facultatif)"></details>
    <label class="champ">Résultat</label>${resultats}
    ${f.res === "Avec sec" ? `<label class="champ">Nombre de « sec »</label><div class="compteur">
      <button data-${attr}="sec" data-pas="-1">−</button><span>${f.sec}</span><button data-${attr}="sec" data-pas="1">+</button></div>` : ""}
    ${echec && attr === "m" ? `<label class="champ">Cause principale <span class="petit">(facultatif${f.res === "Avec sec" ? "" : " : un appui enregistre"})</span></label>
      <div class="choix">${CAUSES.map(c => `<button data-m="cause" data-valeur="${c}" class="${f.cause === c ? "choisi" : ""}">${c}</button>`).join("")}
      ${f.res === "Avec sec" ? "" : `<button data-m="cause" data-valeur="">Sans préciser</button>`}</div>` : ""}`;
}
// =====================================================================
// SALLES : échelles de cotation, secteurs, inventaire des voies et blocs
// =====================================================================
const discDe = act => estVoie(act) ? "Voie" : "Bloc";
function salleParDefaut() {
  const bloc = COTATIONS.Bloc || ["2", "3", "4", "5", "6", "7"], min = Number(bloc[0]), max = Number(bloc[bloc.length - 1]);
  return { id: "s" + Date.now(), nom: "Ma salle", type: "Bloc et voie", secteurs: [], voies: [],
           echelles: { Bloc: ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(g => ({ salle: g, app: String(Math.min(max, Math.max(min, Number(g)))) })),
                       Voie: (COTATIONS.Voie || []).map(c => ({ salle: c, app: c })) } };
}
const profilsSecteur = x => x ? (x.profils && x.profils.length ? x.profils : [x.profil || "Vertical"]) : ["Vertical"];
function lireSalles() {
  let x = JSON.parse(localStorage.getItem("salles") || "null");
  if (x) x.liste.forEach(sa => sa.secteurs.forEach(z => { if (!z.profils) z.profils = [z.profil || "Vertical"]; z.profil = z.profils[0]; }));
  if (!x) { x = { liste: [salleParDefaut()], derniere: {} }; localStorage.setItem("salles", JSON.stringify(x)); }
  return x;
}
const ecrireSalles = x => { localStorage.setItem("salles", JSON.stringify(x)); cacheFeux = null; };
const salleDe = id => lireSalles().liste.find(x => x.id === id) || null;
const salleParDefautPour = act => { const x = lireSalles(); return x.derniere[discDe(act)] || x.derniere.tout || (x.liste[0] || {}).id; };
const gradesSalle = (sid, act) => { const sa = salleDe(sid); return sa && sa.echelles[discDe(act)] && sa.echelles[discDe(act)].length ? sa.echelles[discDe(act)].map(x => x.salle) : COTATIONS[act]; };
const versApp = (sid, act, g) => { const sa = salleDe(sid), e = sa && (sa.echelles[discDe(act)] || []).find(x => x.salle === String(g)); return e ? e.app : String(g); };
const versSalle = (sid, act, g) => { const sa = salleDe(sid), e = sa && (sa.echelles[discDe(act)] || []).find(x => x.app === String(g)); return e ? e.salle : String(g); };
const nomSecteur = (sa, id) => ((sa && sa.secteurs.find(x => x.id === id)) || {}).nom || "";
// Historique d'une voie de l'inventaire (toutes séances)
const essaisVoie = id => toutesVoies().filter(v => v.voieId === id);
// Projets en cours : voies en place essayées, jamais réussies
function projetsEnCours(sid, disc) {
  const sa = salleDe(sid); if (!sa) return [];
  return sa.voies.filter(v => v.statut !== "Démontée" && (!disc || v.discipline === disc)).map(v => ({ v, essais: essaisVoie(v.id) }))
    .filter(x => x.essais.length && !x.essais.some(reussi)).sort((a, b) => b.essais.length - a.essais.length);
}
// Résultat → tentative : cotation de l'app + cotation de la salle, salle, voie ; l'inventaire se complète tout seul
function finaliserTentative(etat, act) {
  const sid = etat.salle, grade = String(etat.cot);
  const v = { cot: sid ? versApp(sid, act, grade) : grade, profil: etat.profil, res: etat.res, act, ligne: etat.ligne, style: etat.style || "À vue" };
  if (sid) { v.salle = sid; v.cotSalle = grade; }
  if (etat.res === "Avec sec") v.sec = etat.sec;
  if (etat.couleur) v.couleur = etat.couleur;
  if ((etat.nom || "").trim()) v.nom = etat.nom.trim();
  if (etat.cause && !reussi(v)) v.cause = etat.cause;
  if (sid && (etat.voieId || etat.nouvelle || v.couleur || v.nom)) {
    const x = lireSalles(), sa = x.liste.find(y => y.id === sid), disc = discDe(act);
    let voie = etat.voieId && sa.voies.find(y => y.id === etat.voieId);
    if (!voie) voie = sa.voies.find(y => y.statut !== "Démontée" && y.discipline === disc && y.cot === grade && (y.couleur || "") === (v.couleur || "") && (y.nom || "") === (v.nom || ""));
    if (!voie) { voie = { id: "v" + Date.now() + Math.floor(Math.random() * 1000), discipline: disc, secteur: etat.secteurNouvelle || "", couleur: v.couleur || "",
                          cot: grade, profil: v.profil, nom: v.nom || "", ouverture: isoDate(new Date()), statut: "En place", notes: "" };
                 sa.voies.push(voie); }
    if (reussi(v) && voie.etoile) voie.etoile = "";
    v.voieId = voie.id; x.derniere[disc] = sid; ecrireSalles(x);
  }
  return v;
}
// Liste des voies de la salle dans la fenêtre de résultat
function choixVoiesSalle(f, act, attr) {
  const sa = salleDe(f.salle); if (!sa) return "";
  const disc = discDe(act), secteurs = sa.secteurs;
  const voies = sa.voies.filter(v => v.statut !== "Démontée" && v.discipline === disc && (!f.filtreSecteur || v.secteur === f.filtreSecteur))
    .sort((a, b) => (etoileAujourdhui(b) ? 1 : 0) - (etoileAujourdhui(a) ? 1 : 0));
  const coul = COULEUR_HEX;
  return `<label class="champ">${disc === "Voie" ? "Voie" : "Bloc"} de la salle <span class="petit">· ${esc(sa.nom)}</span></label>
    ${secteurs.length ? `<div class="choix compact"><button data-${attr}="filtreSecteur" data-valeur="" class="${!f.filtreSecteur ? "choisi" : ""}">Tous</button>${secteurs.map(x =>
      `<button data-${attr}="filtreSecteur" data-valeur="${x.id}" class="${f.filtreSecteur === x.id ? "choisi" : ""}">${esc(x.nom)}</button>`).join("")}</div>` : ""}
    <div class="voies-salle">${voies.map(v => { const n = essaisVoie(v.id);
      return `<button data-${attr}="voie" data-valeur="${v.id}" class="voie-salle ${f.voieId === v.id ? "choisi" : ""}">${etoileAujourdhui(v) ? "★ " : ""}<span class="pastille-mini" style="background:${coul(v.couleur)}"></span>
        <b>${esc(v.cot)}</b> ${esc(v.nom || v.couleur || "")}<span class="petit"> ${esc(nomSecteur(sa, v.secteur))}${n.length ? ` · ${n.length} essai${n.length > 1 ? "s" : ""}${n.some(reussi) ? " ✓" : ""}` : ""}</span></button>`; }).join("")
      || `<p class="petit">Aucune ${disc === "Voie" ? "voie" : "bloc"} encore : note la couleur ci-dessous, elle s'ajoutera à la salle.</p>`}
    <button data-${attr}="nouvelle" class="voie-salle nouvelle ${f.nouvelle ? "choisi" : ""}">+ Nouvelle</button></div>
    ${f.nouvelle && secteurs.length ? `<div class="choix compact">${secteurs.map(x => `<button data-${attr}="secteurNouvelle" data-valeur="${x.id}" class="${f.secteurNouvelle === x.id ? "choisi" : ""}">${esc(x.nom)}</button>`).join("")}</div>` : ""}`;
}
// Choisir une voie de la liste : tout se remplit
function choisirVoie(f, id, act) {
  const sa = salleDe(f.salle), v = sa && sa.voies.find(x => x.id === id); if (!v) return;
  if (f.voieId === id) { f.voieId = ""; return; }
  Object.assign(f, { voieId: id, nouvelle: false, cot: v.cot, couleur: v.couleur, nom: v.nom,
    profil: v.profil || ((sa.secteurs.find(x => x.id === v.secteur) || {}).profil) || f.profil,
    style: essaisVoie(id).length ? "Après travail" : "À vue" });
}
// Rappel des projets en cours sur les lignes de projet
function rappelProjets(s, d, e) {
  if (!estProjet(e) || !ESCALADE.includes(s.activite)) return "";
  const act = actReleve(s, d), sid = d.salle || salleParDefautPour(act), p = projetsEnCours(sid, discDe(act)).slice(0, 2);
  if (!p.length) return "";
  const sa = salleDe(sid);
  return `<div class="feu-rappel">🎯 Projets en cours : ${p.map(x => `${esc(x.v.couleur || "")} ${esc(x.v.cot)}${x.v.nom ? " « " + esc(x.v.nom) + " »" : ""}${nomSecteur(sa, x.v.secteur) ? " (" + esc(nomSecteur(sa, x.v.secteur)) + ")" : ""}, ${x.essais.length} essai${x.essais.length > 1 ? "s" : ""}`).join(" · ")}</div>`;
}

// Style proposé : « Après travail » si la même voie (cotation + couleur + nom) a déjà été notée
function stylePropose(act, cot, couleur, nom) {
  if (!couleur && !nom) return "À vue";
  const deja = LISTE.some(s => (lire(s).voies || []).some(v => (v.act || s.activite) === act && String(v.cot) === String(cot)
    && (v.couleur || "") === (couleur || "") && (v.nom || "") === (nom || "")));
  return deja ? "Après travail" : "À vue";
}

const CHAMPS_MESURES = [["planche","Planche (s)","number"],["course","Course continue la plus longue (min)","number"],
  ["sec","Nb de « sec » dans la voie en dévers suivie","number"],["voie","Voie la plus dure réussie sans « sec »","text"],
  ["bloc","Bloc le plus dur réussi","text"],["tractions","Tractions (nb, assistées ou non)","text"],["notes","Notes de la semaine","text"],
  ["cheville","Tous les 3 mois · genou contre le mur (cm)","number"],["h9090","Tous les 3 mois · 90/90 (s par côté)","number"],
  ["squat","Tous les 3 mois · squat profond (s)","number"],["epaules","Tous les 3 mois · mains derrière le dos (aucune gêne / gêne)","text"]];

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
  const b = e.target.closest("button"), t = b ? b.dataset : {};
  if (b && t.action === "menu") return ouvrirModal({ type: "menu" });
  if (b && t.action === "douleur") return ouvrirModal({ type: "douleur" });
  if (b && t.et) { const i = Number(t.i);
    if (t.et === "faite") return basculerEtape(i);
    if (t.et === "passer") return modifier(d => { d.passees = d.passees || {}; const k = ck(d, i); if (d.passees[k]) delete d.passees[k]; else d.passees[k] = true; if (d.focus === i) delete d.focus; });
    if (t.et === "aller") { ouverts.delete("e" + i); return modifier(d => { d.focus = i; if (d.passees) delete d.passees[ck(d, i)]; if (d.finies) delete d.finies[ck(d, i)]; demarrerSiBesoin(d); }); } }
  if (b && t.pp) { const i = Number(t.i); return compter(i, compte(lire(courant()), i) + Number(t.pp)); }
  if (b && t.noteEt !== undefined) { const i = Number(t.noteEt), d = lire(courant()); return ouvrirModal({ type: "note", ligne: i, texte: (d.notesLignes || {})[ck(d, i)] || "" }); }
  if (b && t.etapeFaite !== undefined) return basculerEtape(Number(t.etapeFaite), true);
  if (b && t.compact !== undefined) return basculerEtape(Number(t.compact));
  if (b && t.action === "etape-suivante") {
    const s = courant(), d = lire(s), k = prochain(s, d); if (k < 0) return;
    const e = elementsDe(s, d)[k]; demarrerSiBesoin(d);
    if (e.type === "routine") { d.routines = d.routines || {}; d.routines[ck(d, k)] = true; } else { d.finies = d.finies || {}; d.finies[ck(d, k)] = true; }
    if (d.focus === k) delete d.focus;
    if (T && T.cle === cle(s)) { T = null; sauverT(); majMinuteur(); }
    ecrire(s, d); garderEcran(); afficher(false); return allerAuSuivant();
  }
  if (b && t.action === "bilan-rapide") return ouvrirBilanRapide();
  if (b && t.action === "fin") return modeDe(courant(), lire(courant())) === "leger" ? ouvrirBilanRapide() : terminer();
  if (b && t.action === "mode") return modifier(d => { const m = modeDe(courant(), d) === "leger" ? "detaille" : "leger"; d.mode = m; R.modes = { ...(R.modes || {}), [courant().activite]: m }; sauverReglages(); });

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
  if (b && t.action === "demarrer") {
    if (ESCALADE.includes(courant().activite) && !lire(courant()).recup) return ouvrirModal({ type: "recup", dAvant: null, nAvant: 3, zAvant: "", salle: salleParDefautPour(actReleve(courant(), lire(courant()))), modeSuivi: modeDe(courant(), lire(courant())) });
    modifier(d => { d.debut = Date.now(); delete d.fin; delete d.fait; d.mode = modeDe(courant(), d); }); garderEcran(); return allerAuSuivant();
  }
  if (b && t.action === "recup") return ouvrirModal({ type: "recup", apres: true, dAvant: null, nAvant: 3, zAvant: "", salle: lire(courant()).salle || salleParDefautPour(actReleve(courant(), lire(courant()))) });
  if (b && t.action === "sauter") return ouvrirModal({ type: "sauter" });
  if (b && t.action === "desauter") return modifier(d => { delete d.fait; delete d.raison; });
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
  // Toucher une ligne d'étape la déplie (la case ou les ronds à droite cochent)
  const ligne = e.target.closest("[data-el]");
  if (ligne && !b && !e.target.closest("a, input, textarea, select")) { const k = "e" + ligne.dataset.el; ouverts.has(k) ? ouverts.delete(k) : ouverts.add(k); return afficher(false); }
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
  d.compteurs = d.compteurs || {}; d.compteurs[ck(d, i)] = nouveau; if (nouveau > avant) d.dernierPassage = Date.now();
  animer = nouveau > avant ? { rond: `${i}-${nouveau - 1}`, etape: true } : {};
  ecrire(s, d); afficher(false); animer = {};
  if (demarre) garderEcran();
  if (nouveau <= avant) return;
  derniereAction = { cle: cle(s), ck: ck(d, i), i, avant, voie: false, repos: false };
  if (modeDe(s, d) === "leger") return montrerToast();                 // suivi léger : on remplira dans le bilan rapide
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
  const h = m.style.display === "flex" && m.classList.contains("mini") ? m.offsetHeight + 8 : 0;
  t.style.top = "auto"; t.style.bottom = `calc(${80 + h}px + env(safe-area-inset-bottom))`;
}
let annulationGenerique = null;
function montrerAnnulation(texte, fn) {             // bandeau « Annuler » pour une action autre qu'un passage
  annulationGenerique = fn; derniereAction = null;
  $("toast").querySelector("span").textContent = texte; $("toast").style.display = "flex"; placerToast();
  clearTimeout(minuterieToast);
  minuterieToast = setTimeout(() => { $("toast").style.display = "none"; annulationGenerique = null; }, 6000);
}
function montrerToast() {
  annulationGenerique = null; $("toast").querySelector("span").textContent = "Passage noté";
  $("toast").style.display = "flex"; placerToast();
  clearTimeout(minuterieToast);
  minuterieToast = setTimeout(() => { $("toast").style.display = "none"; derniereAction = null; }, 5000);
}
$("toast-annuler").onclick = () => {
  if (annulationGenerique) { const f = annulationGenerique; annulationGenerique = null; clearTimeout(minuterieToast); $("toast").style.display = "none"; return f(); }
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
    const salle = d.salle || salleParDefautPour(act);
    formVoie = { cot: der ? (der.cotSalle || versSalle(salle, act, der.cot)) : "", profil: der ? der.profil : "Vertical", res: "", sec: 1, style: "À vue", couleur: "", nom: "", salle }; ouverts.add("releve"); }
  else if (t.form === "annuler") formVoie = null;
  else if (t.form === "sec") formVoie.sec = Math.max(1, formVoie.sec + Number(t.pas));
  else if (t.form === "ajouter") {
    const v = finaliserTentative({ ...formVoie, ligne: undefined }, act);
    formVoie = null; return modifier(d => { d.voies = d.voies || []; d.voies.push(v); });
  } else if (t.form === "voie") choisirVoie(formVoie, t.valeur, act);
  else if (t.form === "nouvelle") { formVoie.nouvelle = !formVoie.nouvelle; formVoie.voieId = ""; }
  else if (t.form === "couleur") formVoie.couleur = formVoie.couleur === t.valeur ? "" : t.valeur;
  else formVoie[t.form] = t.valeur;
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
    return ouvrirModal({ type: "resultat", edit, ligne: v.ligne, act: v.act || actReleve(courant(), lire(courant())), cot: v.cotSalle || v.cot, profil: v.profil, res: v.res, sec: v.sec || 1,
                         style: v.style || "À vue", couleur: v.couleur || "", nom: v.nom || "", cause: v.cause || "", salle: v.salle || "", voieId: v.voieId || "" });
  }
  const s = courant(), d = lire(s), act = actReleve(s, d), e = elementsDe(s, d)[i];
  const notes = (d.voies || []).filter(v => (v.act || act) === act);
  const memeLigne = notes.filter(v => v.ligne === i).slice(-1)[0], dernier = notes.slice(-1)[0];
  const cot = memeLigne ? memeLigne.cot : cotationDe(e.texte, act) || (dernier ? dernier.cot : "");
  const profil = memeLigne ? memeLigne.profil : /léger dévers/i.test(e.texte) ? "Léger dévers" : /dévers/i.test(e.texte) ? "Dévers" : /dalle/i.test(e.texte) ? "Dalle" : /toit/i.test(e.texte) ? "Toit" : "Vertical";
  // Projet ou essai : on retente la même voie (couleur, nom, « Après travail ») ; sinon chaque passage est une voie différente
  const meme = memeLigne && (estProjet(e) || /au point/i.test(e.texte));
  const couleur = meme ? memeLigne.couleur || "" : "", nom = meme ? memeLigne.nom || "" : "";
  const salle = d.salle || salleParDefautPour(act);
  ouvrirModal({ type: "resultat", ligne: i, act, cot: memeLigne && memeLigne.cotSalle ? memeLigne.cotSalle : versSalle(salle, act, cot), profil, res: "", sec: 1, couleur, nom, cause: "",
                salle, voieId: meme ? memeLigne.voieId || "" : "", style: meme ? "Après travail" : stylePropose(act, cot, couleur, nom) });
}
function enregistrerResultat() {
  const etat = M; fermerModal();
  const v = finaliserTentative(etat, etat.act);
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
  // Cotations écrites dans la ligne (« 5a, 5b, 5a, 5b »), dans l'ordre ; sinon la cotation proposée
  const ecrites = (e.texte.split(":")[1] || "").match(/\b[3-8][abc]\+?/g) || [];
  const salle = d.salle || salleParDefautPour(act);
  ouvrirModal({ type: "circuit", ligne: i, act, profil, serie: compte(d, i), n: e.n, salle,
                items: Array.from({ length: e.serie }, (_, j) => ({ cot: versSalle(salle, act, ecrites.length ? ecrites[j % ecrites.length] : cot), ok: true })) });
}
function enregistrerCircuit() {
  const etat = M; fermerModal();
  const voie = estVoie(etat.act);
  modifier(d => { d.voies = d.voies || [];
    etat.items.forEach(it => d.voies.push({ cot: etat.salle ? versApp(etat.salle, etat.act, it.cot) : it.cot, ...(etat.salle ? { salle: etat.salle, cotSalle: it.cot } : {}), profil: etat.profil, act: etat.act, ligne: etat.ligne, style: "À vue",
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
// Nouveau programme : les séances de l'ancien sont effacées (après export), réglages, favoris et moyennes gardés
function verifierProgramme() {
  if (typeof PROGRAMME_ID === "undefined" || localStorage.getItem("programme-actif") === PROGRAMME_ID) return false;
  const saisies = Object.keys(localStorage).some(k => /^(seance-|libre-|mesures-)/.test(k) || k === "libres");
  if (!saisies) { localStorage.setItem("programme-actif", PROGRAMME_ID); return false; }
  ouvrirModal({ type: "programme" }); return true;
}
function demarrerNouveauProgramme() {
  Object.keys(localStorage).filter(k => /^(seance-|libre-|mesures-|annuler-|competences-)/.test(k) || ["libres", "minuteur", "deplacements"].includes(k)).forEach(k => localStorage.removeItem(k));
  delete R.dateDebut; sauverReglages();
  localStorage.setItem("programme-actif", PROGRAMME_ID);
  T = null; cacheFeux = null; reconstruire(); index = indexAujourdhui(); vue = "seance"; fermerModal(); afficher();
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
  const els = elementsDe(s, d), lignes = etapesDe(els).filter(x => tempsReel(d, ck(d, x.i)));
  return `<details class="bilan-temps"><summary>Séance faite en ${hm((d.fin - d.debut) / 1000)} (prévu ≈ ${hm(dureeTotale(s, d))}) ▸</summary>
    ${lignes.map((x, n) => `<div class="voie"><span>${esc(x.e.type === "routine" ? x.e.nom : titreAction(x.e))}</span>
      <span class="petit">${hm(tempsReel(d, ck(d, x.i)) / 1000)}${d.tempsManuel && d.tempsManuel[ck(d, x.i)] != null ? " (saisi)" : ""} / ≈ ${hm(dureeElement(s, d, x.e))}</span></div>`).join("")}</details>`;
}

// Bilan : heure de début et de fin, et temps de chaque étape, modifiables (prioritaires sur la mesure)
const heure = ms => { const x = new Date(ms); return `${pad(x.getHours())}:${pad(x.getMinutes())}`; };
function sectionTempsReels() {
  const s = courant(), d = lire(s); if (!d.debut) return "";
  const els = elementsDe(s, d), fin = d.fin || Date.now();
  if (!M.temps) M.temps = Object.fromEntries(etapesDe(els).map(x => [ck(d, x.i), tempsReel(d, ck(d, x.i)) ? Math.round(tempsReel(d, ck(d, x.i)) / 60000) : ""]));
  if (M.hdeb === undefined) { M.hdeb = heure(d.debut); M.hfin = heure(fin); }
  return `<details class="temps-reels" ${M.ouvrirTemps ? "open" : ""}><summary>Temps réels (modifiables) ▸</summary>
    <p class="petit">Corrige si tu n'as pas suivi la séance en direct : tes valeurs passent avant les mesures automatiques.</p>
    <div class="heures"><label>Début <input type="time" id="m-hdeb" value="${M.hdeb}"></label><label>Fin <input type="time" id="m-hfin" value="${M.hfin}"></label></div>
    ${etapesDe(els).map((x, n) => `<div class="temps-etape"><span>${n + 1}. ${esc(x.e.type === "routine" ? x.e.nom : titreAction(x.e))}</span>
      <input type="number" inputmode="numeric" min="0" data-temps-etape="${ck(d, x.i)}" value="${M.temps[ck(d, x.i)]}" placeholder="min"></div>`).join("")}</details>`;
}
function appliquerTempsReels(d, etat, s) {
  if (!etat.temps) return;
  const jour = new Date(dateSeance(s)), aMs = h => { const [hh, mm] = h.split(":").map(Number); const x = new Date(jour); x.setHours(hh, mm, 0, 0); return x.getTime(); };
  if (etat.hdeb && etat.hfin && (etat.hdeb !== heure(d.debut) || etat.hfin !== heure(d.fin || Date.now()))) {
    d.debut = aMs(etat.hdeb); d.fin = aMs(etat.hfin); if (d.fin <= d.debut) d.fin += 864e5;
    d.heuresSaisies = true;
    if (!etat.dureeTouchee) { d.duree = Math.round((d.fin - d.debut) / 60000); etat.duree = d.duree; }   // les heures priment, sauf durée modifiée à la main
  }
  const avant = d.tempsManuel || {}; d.tempsManuel = {};
  Object.entries(etat.temps).forEach(([k, v]) => {
    const mesure = (d.temps || {})[k] ? Math.round(d.temps[k] / 60000) : "";
    if (v !== "" && v !== null && (Number(v) !== mesure || avant[k] != null)) d.tempsManuel[k] = Number(v);
  });
  // Moyennes par voie et par bloc : les temps saisis comptent
  const els = elementsDe(s, d);
  Object.keys(d.tempsManuel).forEach(k => { const i = els.findIndex((e, n) => ck(d, n) === k); if (i >= 0 && avant[k] == null) noterMoyenne(s, d, i, d.tempsManuel[k] * 60000); });
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
  if (M.type === "fin") h = `<h2>${esc(M.titre)}</h2>${bilanTemps()}${sectionTempsReels()}${ESCALADE.includes(courant().activite) ? `<p class="rappel-peau">🧴 Ce soir : crème sur les mains${courant().jour === "Dimanche" ? ", puis inspection des durillons (limer seulement les bosses)" : ""}.</p>` : ""}
      <label class="champ">Effort (1 à 10)</label>${echelle("effort", 1)}
      <label class="champ">Douleur après la séance (0 à 10)</label>${echelle("douleur", 0)}
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
  if (M.type === "recup") {
    const note = (champ, titre, aide) => `<label class="champ">${titre}</label><p class="petit">${aide}</p>
      <div class="segment">${[1, 2, 3, 4, 5].map(v => `<button data-m="${champ}" data-valeur="${v}" class="${M[champ] === v ? "choisi" : ""}">${v}</button>`).join("")}</div>`;
    const complet = M.corps && M.energie && M.motivation && M.dAvant !== null && (M.dAvant === 0 || M.zAvant);
    const x = lireSalles(), s0 = courant(), d0 = lire(s0), els0 = elementsDe(s0, d0), proj = projetsEnCours(M.salle, discDe(actReleve(s0, d0))).slice(0, 3);
    h = `<h2>Avant de commencer</h2>
      <label class="champ">Suivi pendant la séance</label><div class="segment"><button data-m="modeSuivi" data-valeur="leger" class="${M.modeSuivi === "leger" ? "choisi" : ""}">Léger (accompagné)</button>
        <button data-m="modeSuivi" data-valeur="detaille" class="${M.modeSuivi === "detaille" ? "choisi" : ""}">Détaillé</button></div>
      <details class="plus-details"><summary>Au programme : ${etapesDe(els0).length} étapes · ≈ ${hm(dureeTotale(s0, d0))}${proj.length ? ` · ${proj.length} projet${proj.length > 1 ? "s" : ""} en cours` : ""} ▸</summary>
        <ol class="etapes">${etapesDe(els0).map(({ e }) => `<li>${esc(e.type === "routine" ? e.nom : titreAction(e))}</li>`).join("")}</ol>
        ${proj.length ? `<p class="petit">🎯 ${proj.map(p => `${esc(p.v.couleur || "")} ${esc(p.v.cot)}${p.v.nom ? " « " + esc(p.v.nom) + " »" : ""} (${p.essais.length} essai${p.essais.length > 1 ? "s" : ""})`).join(" · ")}</p>` : ""}</details>
      <div class="liens-recup"><button class="lien" data-m="recup-derniere">Comme la dernière fois</button> · <button class="lien" data-m="recup-passer">Passer les questions</button></div>
      ${x.liste.length > 1 ? `<label class="champ">Salle</label><div class="choix">${x.liste.map(sa => `<button data-m="salle" data-valeur="${sa.id}" class="${M.salle === sa.id ? "choisi" : ""}">${esc(sa.nom)}</button>`).join("")}</div>`
        : `<p class="petit">Salle : <b>${esc((salleDe(M.salle) || {}).nom || "")}</b> · <button class="lien" data-m="gerer-salles">gérer les salles</button></p>`}
      ${note("corps", "Contrôle des doigts, coudes, épaules", "Ferme le poing complètement 3 secondes, puis ouvre la main, doigts tendus, et pousse-les doucement en arrière. 5 = aucune gêne, 1 = douleur nette.")}
      ${note("energie", "Énergie et sommeil", "5 = en pleine forme, 1 = épuisé.")}
      ${note("motivation", "Motivation", "5 = très motivé, 1 = aucune envie.")}
      <label class="champ">Douleur avant la séance</label>
      <div class="choix"><button data-m="dAvant" data-valeur="0" class="${M.dAvant === 0 ? "choisi" : ""}">Aucune</button>
        <button data-m="dAvant" data-valeur="1" class="${M.dAvant > 0 ? "choisi" : ""}">Oui</button></div>
      ${M.dAvant > 0 ? `<label class="champ">Zone</label>${choix("zAvant", zones)}<label class="champ">Niveau</label>${echelle("nAvant", 1)}` : ""}
      ${(() => { const fo = formeDuJour({ corps: M.corps, energie: M.energie, motivation: M.motivation, douleurAvant: M.dAvant > 0 ? M.nAvant : 0 });
        return fo && M.dAvant !== null ? `<div class="forme forme-${fo}">${TEXTE_FORME[fo]}</div>` : ""; })()}
      <div class="actions"><button data-m="fermer">Annuler</button><button data-m="ok" class="principal" ${complet ? "" : "disabled"}>${M.apres ? "Enregistrer" : "▶ Commencer"}</button></div>`;
  }
  if (M.type === "programme") h = `<h2>Nouveau programme</h2>
      <p>Un nouveau programme commence le <b>${jourMois(new Date(PROGRAMME_ID + "T12:00:00"))}</b>. Les séances de l'ancien programme vont être effacées de l'app.</p>
      <p class="petit">Tes réglages, favoris et moyennes de temps sont gardés. Ton historique reste dans l'Excel (onglet Historique) si tu as exporté.</p>
      <p><b>1.</b> Exporte d'abord, et range le fichier dans <b>exports/programme-1</b>.</p>
      <button class="gros contour" data-m="exporter">⬆ Exporter maintenant</button>
      <p><b>2.</b> Puis démarre le nouveau programme.</p>
      <div class="actions"><button data-m="fermer">Plus tard</button><button data-m="nouveau" class="principal">Démarrer</button></div>`;
  if (M.type === "competences") {
    h = `<h2>Bilan du bloc ${M.bloc}</h2><p class="petit">Note chaque compétence de 1 (point très faible) à 10 (point fort), honnêtement : c'est pour toi.</p>
      ${COMPETENCES.map((c, k) => `<label class="champ">${c} <span class="petit">· ${AIDE_COMPETENCES[k]}</span></label>
        <div class="segment petit-segment">${Array.from({ length: 10 }, (_, n) => n + 1).map(v => `<button data-m="comp" data-k="${k}" data-valeur="${v}" class="${M.notes[k] === v ? "choisi" : ""}">${v}</button>`).join("")}</div>`).join("")}
      <div class="actions"><button data-m="fermer">Annuler</button><button data-m="ok" class="principal" ${M.notes.every(n => n) ? "" : "disabled"}>Enregistrer</button></div>`;
  }
  if (M.type === "ajoutRapide") h = htmlAjoutRapide();
  if (M.type === "copier") h = htmlCopier();
  if (M.type === "bilanRapide") h = htmlBilanRapide();
  if (M.type === "etape") {
    const s = courant(), d = lire(s), e = elementsDe(s, d)[M.i], fin = etapeFinie(d, M.i, e);
    h = `<h2>${esc(e.type === "routine" ? e.nom : titreAction(e))}</h2><div class="menu-liste">
      <button class="ligne-menu" data-m="et-aller"><span class="icone">▶</span><span class="titre-menu">Aller à cette étape</span></button>
      <button class="ligne-menu" data-m="et-faite"><span class="icone">✓</span><span class="titre-menu">${fin ? "Marquer non faite" : "Marquer faite"}</span></button>
      ${etapePassee(d, M.i) ? "" : `<button class="ligne-menu" data-m="et-passer"><span class="icone">⏭</span><span class="titre-menu">Passer cette étape</span></button>`}</div>
      <div class="actions"><button data-m="fermer">Fermer</button></div>`;
  }
  if (M.type === "outilsSemaine") h = htmlOutilsSemaine();
  if (M.type === "editeur") h = htmlEditeur();
  if (M.type === "blocSuivant") h = htmlBlocSuivant();
  if (M.type === "assistant") h = htmlAssistant();
  if (M.type === "secteur") {
    const sa = salleDe(M.sid), x = sa.secteurs.find(z => z.id === M.secId), n = sa.voies.filter(v => v.secteur === x.id && v.statut !== "Démontée").length;
    h = `<h2>Secteur</h2><label class="champ">Nom</label><input type="text" id="sec-nom" value="${esc(x.nom)}">
      <label class="champ">Profil par défaut</label><div class="segment">${PROFILS.map(p => `<button data-m="sec-profil" data-valeur="${p}" class="${x.profil === p ? "choisi" : ""}">${p}</button>`).join("")}</div>
      <p class="petit">${n} voie${n > 1 ? "s" : ""} ou bloc${n > 1 ? "s" : ""} en place.</p>
      <div class="menu-liste"><button class="ligne-menu" data-m="sec-renouv"><span class="icone">⟳</span><span><span class="titre-menu">Renouvelé</span><span class="sous-menu">ses voies passent en « démontée », puis ajout des nouvelles</span></span></button>
      <button class="ligne-menu" data-m="sec-ajout"><span class="icone">+</span><span class="titre-menu">Ajouter des voies dans ce secteur</span></button>
      <button class="ligne-menu danger" data-m="sec-suppr"><span class="icone">✕</span><span class="titre-menu">Supprimer le secteur</span></button></div>
      <div class="actions"><button data-m="fermer" class="principal">Fermer</button></div>`;
  }
  if (M.type === "apres") {
    const s = courant(), d = lire(s), els = elementsDe(s, d), x = lireSalles();
    h = `<h2>Saisir après coup</h2><p class="petit">Pour une séance faite sans suivre l'app. Les voies se notent ensuite dans « voies notées ».</p>
      ${ESCALADE.includes(s.activite) && x.liste.length > 1 ? `<label class="champ">Salle</label><div class="choix">${x.liste.map(sa => `<button data-m="salle" data-valeur="${sa.id}" class="${M.salle === sa.id ? "choisi" : ""}">${esc(sa.nom)}</button>`).join("")}</div>` : ""}
      <div class="heures"><label>Début <input type="time" id="m-hdeb" value="${M.hdeb}"></label><label>Fin <input type="time" id="m-hfin" value="${M.hfin}"></label></div>
      ${etapesDe(els).map(({ e, i }) => e.type === "routine"
        ? `<div class="temps-etape"><span>${esc(e.nom)}</span><button data-m="apres-r" data-i="${i}" class="${M.compteurs[i] ? "choisi" : ""}">${M.compteurs[i] ? "✓ Faite" : "Pas faite"}</button></div>`
        : `<div class="temps-etape"><span>${esc(titreAction(e))}</span><div class="compteur"><button data-m="apres-c" data-i="${i}" data-pas="-1">−</button><span>${M.compteurs[i]}/${e.n}</span><button data-m="apres-c" data-i="${i}" data-pas="1">+</button></div></div>`).join("")}
      <div class="actions"><button data-m="fermer">Annuler</button><button data-m="ok" class="principal">Suivant : bilan ›</button></div>`;
  }
  if (M.type === "sauter") h = `<h2>Séance sautée</h2><p class="petit">Pourquoi ? Un appui enregistre. Le rapport t'aidera à voir ce qui revient souvent.</p>
      <div class="menu-liste">${["Fatigue", "Douleur", "Emploi du temps", "Pas de partenaire"].map(r => `<button class="ligne-menu" data-m="raison" data-valeur="${r}"><span class="titre-menu">${r}</span></button>`).join("")}
      <button class="ligne-menu" data-m="raison" data-valeur=""><span class="titre-menu">Sans préciser</span></button></div>
      <div class="actions"><button data-m="fermer">Annuler</button></div>`;
  if (M.type === "deplacer") {
    const s = courant();
    h = `<h2>Déplacer la séance</h2><p class="petit">${esc(s.activite)} · prévue ${esc(s.jour.toLowerCase())} (semaine ${s.semaine}). Choisis le jour où tu la fais :</p>
      <div class="choix">${JOURS.map(j => `<button data-m="jour-dep" data-valeur="${j}" class="${jourDe(s) === j ? "choisi" : ""}">${j}</button>`).join("")}</div>
      <p class="petit">Tes saisies suivent la séance. Pour annuler, remets-la sur son jour prévu.</p>
      <div class="actions"><button data-m="fermer">Fermer</button></div>`;
  }
  if (M.type === "menu") {
    const k = cle(courant()), pile = JSON.parse(localStorage.getItem("annuler-" + k) || '{"etats":[]}').etats;
    const d = lire(courant()), ligne = (m, icone, texte, sous = "", cl = "") =>
      `<button class="ligne-menu ${cl}" data-m="${m}"><span class="icone">${icone}</span><span><span class="titre-menu">${texte}</span>${sous ? `<span class="sous-menu">${sous}</span>` : ""}</span></button>`;
    const s0 = courant(), sautable = !d.debut && !d.fait;
    h = `<h2>Séance</h2><p class="sous-cat">Cette séance</p><div class="menu-liste">
      ${ligne("bilan-rapide", "📝", "Bilan rapide", "remplir ou corriger la séance après coup")}
      ${ligne("editer", "✎", "Modifier la séance", "lignes, exercices, routines, consignes")}
      ${ligne("copier", "⧉", "Copier vers…", "une autre semaine ou un autre jour")}
      ${ligne("deplacer", "↔", "Déplacer à un autre jour", s0.deplace ? `déplacée : ${s0.deplace.toLowerCase()} au lieu de ${s0.jour.toLowerCase()}` : "")}
      ${sautable ? ligne("sauter", "✗", "Séance sautée", "avec la raison") : ""}</div>
      <p class="sous-cat">Corriger</p><div class="menu-liste">
      ${pile.length ? ligne("annuler", "↶", "Annuler le dernier geste", `${pile.length} possible${pile.length > 1 ? "s" : ""}`) : ""}
      ${ligne("reinit", "⟲", "Réinitialiser la séance", "tout repart de zéro (annulable)", "danger")}</div>
      <div class="actions"><button data-m="fermer">Fermer</button></div>`;
  }
  if (M.type === "circuit") {
    const res = estVoie(M.act) ? ["Enchaînée", "Pas finie"] : ["Réussi", "Raté"];
    h = `<h2>Série ${M.serie} sur ${M.n} · ${M.items.length} ${estVoie(M.act) ? "voies" : "blocs"}</h2>
      <label class="champ">Profil</label>${choix("profil", PROFILS)}
      ${M.items.map((it, j) => `<div class="circuit-ligne"><b>${estVoie(M.act) ? "Voie" : "Bloc"} ${j + 1}</b>
        <div class="choix compact">${(M.salle ? gradesSalle(M.salle, M.act) : COTATIONS[M.act]).map(c => `<button data-m="ccot" data-j="${j}" data-valeur="${c}" class="${String(it.cot) === c ? "choisi" : ""}">${c}</button>`).join("")}</div>
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
  if (type === "bilanRapide") {
    if (t.m === "br-prevu") { Object.keys(M.etapes).forEach(i => M.etapes[i] = { etat: "faite", n: (elementsDe(courant(), lire(courant()))[i] || {}).n || 1 }); return afficherModal(); }
    if (t.m === "br-etat") { const x = M.etapes[t.i]; x.etat = t.valeur; if (t.valeur === "partielle") { const e = elementsDe(courant(), lire(courant()))[t.i]; x.n = Math.max(1, Math.min(e.n - 1, x.n >= e.n ? e.n - 1 : x.n)); } return afficherModal(); }
    if (t.m === "br-n") { const e = elementsDe(courant(), lire(courant()))[t.i], x = M.etapes[t.i]; x.n = Math.max(0, Math.min(e.n, x.n + Number(t.pas))); return afficherModal(); }
    if (t.m === "br-g") { const x = M.grille[t.g] = M.grille[t.g] || { ok: 0, ko: 0 }; x[t.k] = Math.max(0, x[t.k] + Number(t.pas)); return afficherModal(); }
    if (t.m === "br-voie") { const r = M.voiesSalle[t.valeur]; M.voiesSalle[t.valeur] = !r ? "ok" : r === "ok" ? "ko" : ""; M.ouvrirVoies = true; return afficherModal(); }
    if (t.m === "br-ok") return enregistrerBilanRapide();
  }
  if (type === "etape") {
    const i = M.i;
    if (t.m === "et-aller") { fermerModal(); return modifier(d => { d.focus = i; if (d.passees) delete d.passees[ck(d, i)]; if (d.finies) delete d.finies[ck(d, i)]; }); }
    if (t.m === "et-faite") { fermerModal(); return basculerEtape(i); }
    if (t.m === "et-passer") { fermerModal(); return modifier(d => { d.passees = d.passees || {}; d.passees[ck(d, i)] = true; if (d.focus === i) delete d.focus; }); }
  }
  if (type === "copier") {
    if (t.m === "cp-sem") { M.semaine = Math.max(1, M.semaine + Number(t.pas)); return afficherModal(); }
    if (t.m === "cp-jour") { M.jour = t.valeur; return afficherModal(); }
    if (t.m === "cp-ok") return copierSeance(t.valeur);
  }
  if (type === "outilsSemaine") {
    if (t.m === "os-dest") { M.dest = Math.max(1, M.dest + Number(t.pas)); return afficherModal(); }
    if (t.m === "os-rep") { M.rep = Math.max(1, Math.min(8, M.rep + Number(t.pas))); return afficherModal(); }
    if (t.m === "os-pause-n") { M.pause = Math.max(1, Math.min(8, M.pause + Number(t.pas))); return afficherModal(); }
    const w = M.semaine;
    if (t.m === "os-copier") { const dest = M.dest; fermerModal(); copierSemaine(w, [dest]); return afficher(false); }
    if (t.m === "os-repeter") { const n = M.rep; fermerModal(); copierSemaine(w, Array.from({ length: n }, (_, k) => w + k + 1)); return afficher(false); }
    if (t.m === "os-pause") { const n = M.pause; fermerModal(); mettreEnPause(w, n); return afficher(false); }
  }
  if (type === "editeur") {
    const L = M.lignes, k = Number(t.k);
    if (t.m === "ed-mode") { if (M.texte) M.lignes = ($("ed-texte").value || "").split("\n").map(l => l.trim()).filter(Boolean); M.texte = t.valeur === "1"; return afficherModal(); }
    if (t.m === "ed-haut" && k > 0) { [L[k - 1], L[k]] = [L[k], L[k - 1]]; return afficherModal(); }
    if (t.m === "ed-bas" && k < L.length - 1) { [L[k + 1], L[k]] = [L[k], L[k + 1]]; return afficherModal(); }
    if (t.m === "ed-suppr") { L.splice(k, 1); return afficherModal(); }
    if (t.m === "ed-n") { const x = DECOMP(L[k]); x.n = Math.max(1, x.n + Number(t.pas)); L[k] = RECOMP(x); return afficherModal(); }
    if (t.m === "ed-consigne") { const v = ($("ed-consigne").value || "").trim(); if (v) L.push("! " + v); return afficherModal(); }
    if (t.m === "ed-ok") return enregistrerEditeur();
    if (t.m === "ed-exos") { fermerModal(); return ouvrirBiblio({ ecran: "liste", filtre: "seance" }); }
  }
  if (type === "blocSuivant" && t.m === "bs-ok") {
    const b = M.brouillon; fermerModal();
    ajouterOps(b.seances.map(x => ({ op: "set", ...x })));
    montrerAnnulation(`Bloc ${b.bloc} créé`, annulerDernieresOps(b.seances.length));
    return ouvrirSemaine(b.debut);
  }
  if (type === "ajoutRapide") {
    if (t.m === "couleurRapide") { M.couleur = M.couleur === t.valeur ? "" : t.valeur; return afficherModal(); }
    if (t.m === "profilRapide") { M.profil = t.valeur; return afficherModal(); }
    if (t.m === "secteur") { M.secteur = t.valeur; M.profil = ""; return afficherModal(); }
    if (t.m === "disc") { M.disc = t.valeur; M.cot = ""; return afficherModal(); }
    if (t.m === "ajouter-suite") { ajouterVoieRapide(); return afficherModal(); }
    if (t.m === "ajouter-fermer") { ajouterVoieRapide(); fermerModal(); return afficher(false); }
    if (t.m === "fermer") { fermerModal(); return afficher(false); }
  }
  if (type === "secteur") {
    const sid = M.sid, secId = M.secId;
    if (t.m === "sec-profil") { majSalle(sid, sa => sa.secteurs.find(z => z.id === secId).profil = t.valeur); return afficherModal(); }
    if (t.m === "sec-ajout") { fermerModal(); return ouvrirAjoutRapide(secId); }
    if (t.m === "sec-renouv") {
      fermerModal();
      annulableSalles("Secteur renouvelé", () => majSalle(sid, sa => { sa.voies.forEach(v => { if (v.secteur === secId && v.statut !== "Démontée") { v.statut = "Démontée"; v.demontage = isoDate(new Date()); } });
        sa.secteurs.find(z => z.id === secId).maj = Date.now(); }));
      return ouvrirAjoutRapide(secId);
    }
    if (t.m === "sec-suppr") {
      fermerModal();
      annulableSalles("Secteur supprimé", () => majSalle(sid, sa => { sa.secteurs = sa.secteurs.filter(z => z.id !== secId); sa.voies.forEach(v => { if (v.secteur === secId) v.secteur = ""; }); }));
      return afficher(false);
    }
    if (t.m === "fermer") { fermerModal(); return afficher(false); }
  }
  if (type === "assistant") {
    if (t.m === "typeSalle") { M.typeSalle = t.valeur; return afficherModal(); }
    if (t.m === "as-secteur") { M.secteurs = M.secteurs.includes(t.valeur) ? M.secteurs.filter(n => n !== t.valeur) : [...M.secteurs, t.valeur]; return afficherModal(); }
    if (t.m === "as-perso") { const n = ($("as-perso").value || "").trim(); if (n && !M.secteurs.includes(n)) M.secteurs.push(n); return afficherModal(); }
    if (t.m === "as-suivant") { if (M.etape === 1) M.nom = ($("as-nom").value || "").trim(); M.etape++; return afficherModal(); }
    if (t.m === "as-retour") { M.etape--; return afficherModal(); }
    if (t.m === "as-modele") { M.modele = t.valeur; return afficherModal(); }
    if (t.m === "as-fin") return finirAssistant();
  }
  if (type === "apres" && t.m === "apres-r") { M.compteurs[t.i] = M.compteurs[t.i] ? 0 : 1; return afficherModal(); }
  if (type === "apres" && t.m === "apres-c") { const e = elementsDe(courant(), lire(courant()))[t.i];
    M.compteurs[t.i] = Math.max(0, Math.min(e.n, M.compteurs[t.i] + Number(t.pas))); return afficherModal(); }
  if (type === "sauter" && t.m === "raison") { fermerModal(); return modifier(d => { d.fait = "Sautée"; if (t.valeur) d.raison = t.valeur; else delete d.raison; }); }
  if (type === "deplacer" && t.m === "jour-dep") {
    const s = courant(), k = cle(s), dep = lireDeplacements();
    if (t.valeur === s.jour) delete dep[k]; else dep[k] = t.valeur;
    localStorage.setItem("deplacements", JSON.stringify(dep)); fermerModal();
    reconstruire(); index = LISTE.findIndex(x => cle(x) === k); return afficher();
  }
  if (type === "recup" && t.m === "gerer-salles") { fermerModal(); return ouvrirSalles(); }
  if (type === "recup" && t.m === "recup-derniere") {
    const der = [...LISTE].reverse().map(x => lire(x).recup).find(r => r && r.corps);
    if (der) Object.assign(M, { corps: der.corps, energie: der.energie, motivation: der.motivation, dAvant: 0 }); else alert("Pas encore de récupération notée.");
    return afficherModal();
  }
  if (type === "recup" && t.m === "recup-passer") {
    const etat = M; fermerModal();
    modifier(d => { d.debut = Date.now(); delete d.fin; delete d.fait; d.mode = etat.modeSuivi; if (etat.salle) d.salle = etat.salle; });
    R.modes = { ...(R.modes || {}), [courant().activite]: etat.modeSuivi }; sauverReglages();
    garderEcran(); return allerAuSuivant();
  }
  if (type === "competences" && t.m === "comp") { M.notes[Number(t.k)] = Number(t.valeur); return afficherModal(); }
  if (type === "programme" && t.m === "exporter") return exporter();
  if (type === "programme" && t.m === "nouveau") {
    if (confirm("Effacer les séances de l'ancien programme de l'app ? As-tu bien exporté ?")) demarrerNouveauProgramme();
    return;
  }
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
    if (type === "competences") {
      const etat = M; fermerModal();
      localStorage.setItem("competences-" + etat.bloc, JSON.stringify({ notes: etat.notes, date: Date.now(), semaine: etat.bloc * 8 }));
      return afficher(false);
    }
    if (type === "apres") {
      const etat = M, s = courant(); fermerModal();
      modifier(d => {
        const els = elementsDe(s, d), jour = new Date(dateSeance(s)), aMs = h => { const [hh, mm] = h.split(":").map(Number); const x = new Date(jour); x.setHours(hh, mm, 0, 0); return x.getTime(); };
        d.debut = aMs(etat.hdeb); d.fin = aMs(etat.hfin); if (d.fin <= d.debut) d.fin += 864e5;
        d.heuresSaisies = true; d.duree = Math.round((d.fin - d.debut) / 60000); delete d.fait;
        if (etat.salle) d.salle = etat.salle;
        d.compteurs = d.compteurs || {}; d.routines = d.routines || {};
        Object.entries(etat.compteurs).forEach(([i, n]) => { i = Number(i);
          if (els[i].type === "routine") { if (n) d.routines[ck(d, i)] = true; else delete d.routines[ck(d, i)]; }
          else d.compteurs[ck(d, i)] = n; });
      });
      return ouvrirBilan("Bilan de la séance");
    }
    if (type === "recup") {
      const etat = M; fermerModal();
      modifier(d => {
        d.recup = { corps: etat.corps, energie: etat.energie, motivation: etat.motivation, douleurAvant: etat.dAvant > 0 ? etat.nAvant : 0, zoneAvant: etat.dAvant > 0 ? etat.zAvant : "" };
        if (etat.modeSuivi) { d.mode = etat.modeSuivi; R.modes = { ...(R.modes || {}), [courant().activite]: etat.modeSuivi }; sauverReglages(); }
        if (etat.salle) { d.salle = etat.salle; const x = lireSalles(); x.derniere[discDe(actReleve(courant(), d))] = etat.salle; x.derniere.tout = etat.salle; ecrireSalles(x); }
        if (!etat.apres) { d.debut = Date.now(); delete d.fin; delete d.fait; }
      });
      if (!etat.apres) { garderEcran(); allerAuSuivant(); }
      return;
    }
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
      appliquerTempsReels(d, etat, courant());
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
  else if (t.m === "voie") { choisirVoie(M, t.valeur, M.act); return afficherModal(); }
  else if (t.m === "secteurNouvelle") { M.secteurNouvelle = t.valeur; const x = (salleDe(M.salle) || { secteurs: [] }).secteurs.find(z => z.id === t.valeur); if (x) M.profil = x.profil; return afficherModal(); }
  else if (t.m === "nouvelle") { M.nouvelle = !M.nouvelle; M.voieId = ""; if (M.nouvelle) { M.couleur = ""; M.nom = ""; M.style = "À vue"; } return afficherModal(); }
  else if (t.m === "couleur") { M.couleur = M.couleur === t.valeur ? "" : t.valeur; if (type === "resultat" && M.edit === undefined) M.style = stylePropose(M.act, M.cot, M.couleur, M.nom); }
  else if (t.m) M[t.m] = ["effort", "douleur", "niv", "corps", "energie", "motivation", "dAvant", "nAvant"].includes(t.m) ? Number(t.valeur) : t.valeur;   // les cotations restent du texte
  // Résultat en deux appuis : une réussite s'enregistre directement ; un échec demande la cause (un appui de plus)
  if (type === "resultat" && t.m === "res" && reussi(M) && M.cot) return enregistrerResultat();
  if (type === "resultat" && t.m === "cause" && M.res !== "Avec sec" && M.cot) return enregistrerResultat();
  afficherModal();
});
$("modal").addEventListener("input", e => {             // champs texte des fenêtres (sans réafficher)
  if (!M) return;
  if (e.target.id === "m-duree") { M.duree = e.target.value; M.dureeTouchee = true; }
  if (e.target.id === "m-notes") M.notes = e.target.value;
  if (e.target.id === "m-note") M.texte = e.target.value;
  if (e.target.id === "m-nom") M.nom = e.target.value;
  if (e.target.id === "m-hdeb") M.hdeb = e.target.value;
  if (e.target.id === "br-hdeb") M.hdeb = e.target.value;
  if (e.target.id === "br-hfin") M.hfin = e.target.value;
  if (e.target.id === "br-notes") M.notes = e.target.value;
  if (e.target.id === "as-nom") M.nom = e.target.value;
  if (e.target.id === "sec-nom" && e.target.value.trim()) { const v = e.target.value.trim(); majSalle(M.sid, sa => sa.secteurs.find(z => z.id === M.secId).nom = v); }
  if (e.target.id === "m-hfin") M.hfin = e.target.value;
  if (e.target.dataset && e.target.dataset.tempsEtape) { M.temps[e.target.dataset.tempsEtape] = e.target.value === "" ? "" : Number(e.target.value); }
  if (e.target.id === "m-detail") M.detail = e.target.value;
  if (e.target.id === "m-duree-hier") M.duree = e.target.value;
  if (e.target.dataset.mesure) {
    const m = lireMesures(M.sem), v = e.target.value;
    m[e.target.dataset.mesure] = e.target.type === "number" && v !== "" ? Number(v) : v; ecrireMesures(M.sem, m);
  }
});
$("ecran").addEventListener("toggle", e => { if (formVoie && e.target.classList && e.target.classList.contains("plus-details")) formVoie.details = e.target.open; }, true);
$("modal").addEventListener("toggle", e => {
  if (!M || !e.target.classList) return;
  if (e.target.classList.contains("temps-reels")) M.ouvrirTemps = e.target.open;
  if (e.target.classList.contains("plus-details")) { if (M.type === "bilanRapide") M.ouvrirVoies = e.target.open; else M.details = e.target.open; }
}, true);
$("modal").addEventListener("change", e => {
  if (M && M.type === "editeur") {
    const el = e.target;
    if (el.id === "ed-exo" && el.value) { M.lignes.push(`3× « ${el.value} »`); return afficherModal(); }
    if (el.id === "ed-routine" && el.value) { M.lignes.push(`> ${el.value}`); return afficherModal(); }
    if (el.dataset.edRepos !== undefined) { const k = Number(el.dataset.edRepos), x = DECOMP(M.lignes[k]); x.repos = el.value ? Number(el.value) : undefined; M.lignes[k] = RECOMP(x); return; }
    if (el.dataset.edTag !== undefined) { const k = Number(el.dataset.edTag), x = DECOMP(M.lignes[k]); x.tag = el.value || undefined; M.lignes[k] = RECOMP(x); return; }
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
  if (a === "deplacer") return ouvrirModal({ type: "deplacer" });
  if (a === "editer") return ouvrirEditeur();
  if (a === "sauter") return ouvrirModal({ type: "sauter" });
  if (a === "bilan-rapide") return ouvrirBilanRapide();
  if (a === "mode") { fermerModal(); return modifier(d => { const m = modeDe(s, d) === "leger" ? "detaille" : "leger"; d.mode = m; R.modes = { ...(R.modes || {}), [s.activite]: m }; sauverReglages(); }); }
  if (a === "copier") return ouvrirModal({ type: "copier", semaine: s.semaine + 1, jour: s.jour });
  if (a === "apres") {
    const d = lire(s), els = elementsDe(s, d);
    return ouvrirModal({ type: "apres", hdeb: d.debut ? heure(d.debut) : "18:00", hfin: d.fin ? heure(d.fin) : "19:30",
      salle: d.salle || salleParDefautPour(actReleve(s, d)),
      compteurs: Object.fromEntries(etapesDe(els).map(x => [x.i, x.e.type === "routine" ? (routineOk(d, x.i) ? 1 : 0) : compte(d, x.i)])) });
  }
  if (a === "douleur") return ouvrirModal({ type: "douleur" });
  if (a === "exos") { fermerModal(); return ouvrirBiblio({ ecran: "liste", filtre: "seance" }); }
  if (a === "ajout") return ouvrirModal({ type: "ajout", exo: "", series: 3, detail: "", repos: 0, dureeAj: 0 });
  if (a === "note-etape") {
    const d = lire(s), i = prochain(s, d), els = elementsDe(s, d);
    const ligne = i >= 0 ? i : els.length - 1;
    return ouvrirModal({ type: "note", ligne, texte: (d.notesLignes || {})[ck(d, ligne)] || "" });
  }
}



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

let avaitT = false, finRepos = 0;
// Le minuteur se place dans la carte Maintenant de sa séance ; sur un autre écran, il devient une pastille au-dessus des onglets
function placerMinuteur() {
  const m = $("minuteur"), slot = document.querySelector(".maintenant .mn-slot");
  const ici = !!(T && vue === "seance" && courant() && T.cle === cle(courant()) && slot);
  if (ici) { if (m.parentElement !== slot) slot.appendChild(m); m.classList.add("integre"); m.classList.remove("mini"); }
  else { if (m.parentElement !== document.body) document.body.insertBefore(m, $("toast")); m.classList.remove("integre"); m.classList.toggle("mini", !!T); }
  const carte = document.querySelector(".maintenant");
  if (carte) {
    carte.classList.toggle("avec-minuteur", ici);
    ["phase-repos", "bientot", "fini"].forEach(c => carte.classList.toggle(c, ici && m.classList.contains(c)));
  }
}
function majMinuteur() {
  const m = $("minuteur");
  if (!T) {
    if (avaitT) { finRepos = Date.now(); avaitT = false; }
    m.style.display = "none"; m.classList.remove("plein", "fini", "bientot"); clearInterval(tic); placerMinuteur(); return;
  }
  avaitT = true;
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
    $("mn-temps").textContent = "Terminé ✓"; $("mn-label").textContent = ""; $("mn-suivant").textContent = T.suivant || ""; placerMinuteur(); return; }
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
  placerMinuteur(); placerToast();
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
$("mn-haut").onclick = () => {
  const m = $("minuteur");
  if (m.classList.contains("mini")) {                     // pastille : retour à la séance du minuteur
    const k = LISTE.findIndex(s => cle(s) === T.cle); if (k >= 0) changer(k); return;
  }
  m.classList.toggle("plein");
};
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

// ---------- Jour de repos : pas de séance aujourd'hui ----------
const seanceAujourdhui = () => LISTE.findIndex(s => isoDate(dateSeance(s)) === isoDate(new Date()));
function afficherRepos() {
  const auj = new Date(), i = indexAujourdhui(), s = LISTE[i];
  $("titre-date").textContent = `${JOURS[(auj.getDay() + 6) % 7].slice(0, 3)}. ${jourMois(auj)} · repos`;
  let h = `<div class="bandeau-seance bandeau-repos"><h1>Repos</h1><div class="phase">Aujourd'hui, aucune séance n'est prévue. La récupération fait partie de l'entraînement.</div></div>`;
  if (s && dateSeance(s) > auj) h += `<div class="carte"><div class="petit">Prochaine séance</div>
    <button class="carte-seance" data-act="${esc(s.activite)}" data-ouvrir-repos="${i}"><div class="cs-texte">
      <div class="cs-jour">${esc(jourDe(s))} ${jourMois(dateSeance(s))}</div><div class="cs-titre">${esc(s.activite)}</div>
      <div class="cs-duree">≈ ${hm(dureeTotale(s, lire(s)))}</div></div><span class="etat-seance">›</span></button></div>`;
  h += `<p class="petit centre">Envie de bouger quand même ? <button class="lien" data-repos-creer="1">Créer une séance</button></p>`;
  $("ecran").innerHTML = h;
}
$("ecran").addEventListener("click", e => {
  if (vue !== "repos") return;
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.ouvrirRepos) return changer(Number(b.dataset.ouvrirRepos));
  if (b.dataset.reposCreer) { semaineVue = semaineActuelle(); return ouvrirCreation(); }
});

// ---------- Onglet Programme : vue Semaine et vue Programme ----------
const basculeVue = actif => `<div class="segment vue-toggle"><button data-vue-prog="semaine" class="${actif === "semaine" ? "choisi" : ""}">Semaine</button>
  <button data-vue-prog="programme" class="${actif === "programme" ? "choisi" : ""}">Programme</button></div>`;
function carteMesures(sem) {
  const m = lireMesures(sem), n = CHAMPS_MESURES.filter(([c]) => !vide(m[c])).length;
  return `<button class="carte-mesures" data-mesures-sem="${sem}"><span>📏 Mesures de la semaine ${sem}</span><span class="petit">${n ? `${n} sur ${CHAMPS_MESURES.length} remplies` : "à remplir"} ›</span></button>`;
}
function afficherProgramme() {
  $("titre-date").textContent = "Programme";
  const sems = [...new Set(LISTE.map(s => s.semaine))].sort((a, b) => a - b), actuelle = semaineActuelle();
  let h = basculeVue("programme"), bloc = 0;
  sems.forEach(w => {
    const b = Math.ceil(w / 8);
    if (b !== bloc) { bloc = b;
      const fin = Math.min(...[b * 8, Math.max(...sems)]);
      h += `<h3 class="sous-cat">Bloc ${b} · semaines ${(b - 1) * 8 + 1} à ${fin}</h3>`; }
    const items = LISTE.filter(s => s.semaine === w), phase = (items.find(s => !s.libre) || items[0] || {}).phase || "";
    const symb = items.map(s => { const d = lire(s);
      const c = d.fait === "Oui" ? "fait" : d.fait === "Sautée" || d.fait === "Non" ? "saute" : d.debut && !d.fin ? "encours" : "";
      return `<span class="mini-etat ${c}" data-act="${esc(s.activite)}" title="${esc(jourDe(s))} · ${esc(s.activite)}">${c === "fait" ? "✓" : c === "saute" ? "✗" : c === "encours" ? "●" : "○"}</span>`; }).join("");
    h += `<button class="ligne-semaine ${w === actuelle ? "actuelle" : ""}" data-semaine-prog="${w}">
      <span class="ls-num">S${w}</span><span class="ls-texte"><span class="ls-dates">${bornesSemaine(w)}</span><span class="ls-phase">${esc(phase.replace(/^B\d+ · /, ""))}</span></span>
      <span class="ls-etats">${symb}</span></button>`;
  });
  h += `<button class="gros contour" data-bloc-suivant="1">Préparer le bloc suivant</button>`;
  $("ecran").innerHTML = h;
  const act = document.querySelector(".ligne-semaine.actuelle"); if (act) act.scrollIntoView({ block: "center" });
}
$("ecran").addEventListener("click", e => {
  if (vue !== "semaine" && vue !== "programme") return;
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.vueProg) { vue = b.dataset.vueProg; return afficher(); }
  if (b.dataset.semaineProg) return ouvrirSemaine(Number(b.dataset.semaineProg));
  if (b.dataset.mesuresSem) return ouvrirModal({ type: "mesures", sem: Number(b.dataset.mesuresSem) });
  if (b.dataset.completer) { changer(Number(b.dataset.completer)); return ouvrirBilanRapide(); }
  if (b.dataset.outilsSemaine) return ouvrirModal({ type: "outilsSemaine", semaine: semaineVue, dest: semaineVue + 1, rep: 1, pause: 1 });
  if (b.dataset.blocSuivant) return ouvrirModal({ type: "blocSuivant", brouillon: brouillonBlocSuivant() });
});

// =====================================================================
// BILAN RAPIDE : remplir la séance après coup, en 2 ou 3 minutes (données approximatives)
// =====================================================================
function ouvrirBilanRapide() {
  const s = courant(), d = lire(s), els = elementsDe(s, d), act = actReleve(s, d);
  const rien = !els.some((e, i) => e.type !== "info" && (etapeReglee(d, i, e) || compte(d, i) > 0));
  const etapes = {};
  etapesDe(els).forEach(({ e, i }) => {
    const c = e.type === "action" ? compte(d, i) : 0;
    etapes[i] = etapePassee(d, i) ? { etat: "passee", n: c } : etapeFinie(d, i, e) ? { etat: "faite", n: e.type === "action" ? Math.max(c, (d.finies || {})[ck(d, i)] ? c : e.n) : 1 }
      : c > 0 ? { etat: "partielle", n: c } : { etat: rien ? "faite" : "passee", n: e.type === "action" ? e.n : 1 };
    if (e.type === "action" && etapes[i].etat === "faite" && !(d.finies || {})[ck(d, i)]) etapes[i].n = e.n;
  });
  const auj = isoDate(dateSeance(s)) === isoDate(new Date()), duree = Math.round(dureeTotale(s, d) / 60);
  // Heures proposées : celles mesurées, sinon une fin au moins égale au début + la durée prévue
  const fin = d.fin || (auj ? Math.max(Date.now(), (d.debut || 0) + duree * 60000) : new Date(dateSeance(s)).setHours(19, 30, 0, 0)), debut = d.debut || fin - duree * 60000;
  const salle = ESCALADE.includes(s.activite) ? d.salle || salleParDefautPour(act) : null;
  ouvrirModal({ type: "bilanRapide", etapes, grille: {}, voiesSalle: {}, hdeb: heure(debut), hfin: heure(fin), salle, act,
    effort: d.effort ?? null, douleur: d.douleur ?? 0, zone: d.zone || "", notes: d.notes || "" });
}
function htmlBilanRapide() {
  const s = courant(), d = lire(s), els = elementsDe(s, d), act = M.act, grades = M.salle ? gradesSalle(M.salle, act) : COTATIONS[act] || [];
  const voie = estVoie(act), sa = M.salle && salleDe(M.salle);
  const serie = (a, b) => Array.from({ length: b - a + 1 }, (_, n) => a + n);
  const echelle = (champ, a) => `<div class="echelle">${serie(a, 10).map(v => `<button data-m="${champ}" data-valeur="${v}" class="${String(M[champ]) === String(v) ? "choisi" : ""}"
    style="background:${v ? couleurEchelle(v) : "var(--carte)"};color:${v ? texteEchelle(v) : "var(--texte)"}">${v}</button>`).join("")}</div>`;
  const dejaNotees = (d.voies || []).length;
  let h = `<h2>Bilan rapide</h2><p class="petit">${esc(s.activite)} · ${esc(jourDe(s))} ${jourMois(dateSeance(s))}. Approximatif, c'est très bien : l'important est d'avoir une trace.</p>
    <button class="gros go" data-m="br-prevu">✓ Faite comme prévu</button>
    <div class="heures"><label>Début <input type="time" id="br-hdeb" value="${M.hdeb}"></label><label>Fin <input type="time" id="br-hfin" value="${M.hfin}"></label></div>
    <h3 class="sous-cat">Étapes</h3>
    ${etapesDe(els).map(({ e, i }) => { const x = M.etapes[i];
      return `<div class="br-etape"><div class="br-titre">${esc(e.type === "routine" ? e.nom : titreAction(e))}</div>
        <div class="br-reglage"><div class="segment petit-segment">${[["faite", "Faite"], ["partielle", "Partielle"], ["passee", "Passée"]].filter(([k]) => e.type === "action" || k !== "partielle")
          .map(([k, t]) => `<button data-m="br-etat" data-i="${i}" data-valeur="${k}" class="${x.etat === k ? "choisi" : ""}">${t}</button>`).join("")}</div>
        ${e.type === "action" && x.etat === "partielle" ? `<div class="compteur"><button data-m="br-n" data-i="${i}" data-pas="-1">−</button><span>${x.n}/${e.n}</span><button data-m="br-n" data-i="${i}" data-pas="1">+</button></div>` : ""}</div></div>`; }).join("")}`;
  if (COTATIONS[act]) {
    h += `<h3 class="sous-cat">${voie ? "Voies" : "Blocs"} ${dejaNotees ? `<span class="petit">(${dejaNotees} déjà noté${dejaNotees > 1 ? "s" : ""} pendant la séance)</span>` : ""}</h3>
      <p class="petit">Par cotation${sa ? " de la salle" : ""} : combien de réussis et de ratés ?</p>
      <div class="grille-cot"><div class="gc-tete"><span></span><span>✓ ${voie ? "enchaînées" : "réussis"}</span><span>✗ ${voie ? "pas finies" : "ratés"}</span></div>
      ${grades.map(g => { const x = M.grille[g] || { ok: 0, ko: 0 };
        return `<div class="gc-ligne ${x.ok || x.ko ? "rempli" : ""}"><b>${esc(g)}</b>
          <span class="compteur"><button data-m="br-g" data-g="${esc(g)}" data-k="ok" data-pas="-1">−</button><span>${x.ok}</span><button data-m="br-g" data-g="${esc(g)}" data-k="ok" data-pas="1">+</button></span>
          <span class="compteur"><button data-m="br-g" data-g="${esc(g)}" data-k="ko" data-pas="-1">−</button><span>${x.ko}</span><button data-m="br-g" data-g="${esc(g)}" data-k="ko" data-pas="1">+</button></span></div>`; }).join("")}</div>`;
    if (sa) {
      const vs = sa.voies.filter(v => v.statut !== "Démontée" && v.discipline === discDe(act)).sort((a, b) => (etoileAujourdhui(b) ? 1 : 0) - (etoileAujourdhui(a) ? 1 : 0));
      if (vs.length) h += `<details class="plus-details" ${M.ouvrirVoies ? "open" : ""}><summary>Voies précises de la salle (projets, nouvelles…) ▸</summary>
        <p class="petit">Touche une voie : une fois = réussie, deux fois = ratée, trois fois = rien.</p>
        <div class="tuiles-voies">${vs.map(v => { const r = M.voiesSalle[v.id];
          return `<button class="tuile-voie ${r === "ok" ? "br-ok" : r === "ko" ? "br-ko" : ""}" data-m="br-voie" data-valeur="${v.id}" style="border-top-color:${COULEUR_HEX(v.couleur) === "transparent" ? "var(--bord)" : COULEUR_HEX(v.couleur)}">
            ${etoileAujourdhui(v) ? `<span class="t-etoile">★</span>` : ""}<span class="t-cot">${esc(v.cot)}</span><span class="t-etat">${r === "ok" ? "✓ réussie" : r === "ko" ? "✗ ratée" : esc(v.nom || v.couleur || "")}</span></button>`; }).join("")}</div></details>`;
    }
  }
  h += `<h3 class="sous-cat">Ressenti</h3><label class="champ">Effort (1 à 10)</label>${echelle("effort", 1)}
    <label class="champ">Douleur après la séance (0 à 10)</label>${echelle("douleur", 0)}
    ${M.douleur > 0 ? `<label class="champ">Zone</label><div class="choix">${ZONES.filter(z => z !== "Aucune").map(z => `<button data-m="zone" data-valeur="${z}" class="${M.zone === z ? "choisi" : ""}">${z}</button>`).join("")}</div>` : ""}
    <label class="champ">Notes (facultatif)</label><textarea id="br-notes">${esc(M.notes)}</textarea>
    ${ESCALADE.includes(s.activite) ? `<p class="rappel-peau">🧴 Ce soir : crème sur les mains.</p>` : ""}
    <div class="actions"><button data-m="fermer">Annuler</button><button data-m="br-ok" class="principal" ${M.effort ? "" : "disabled"}>Enregistrer</button></div>`;
  return h;
}
function enregistrerBilanRapide() {
  const etat = M, s = courant(), act = etat.act; fermerModal();
  if (T && T.cle === cle(s)) { T = null; sauverT(); majMinuteur(); }
  modifier(d => {
    const els = elementsDe(s, d), jour = new Date(dateSeance(s)), aMs = h => { const [hh, mm] = h.split(":").map(Number); const x = new Date(jour); x.setHours(hh, mm, 0, 0); return x.getTime(); };
    d.debut = aMs(etat.hdeb); d.fin = aMs(etat.hfin);
    if (d.fin < d.debut) d.fin += 864e5;                       // fin après minuit
    if (d.fin === d.debut) d.fin = d.debut + dureeTotale(s, d) * 1000;   // heures identiques : durée prévue
    d.duree = Math.round((d.fin - d.debut) / 60000); d.heuresSaisies = true; d.approx = true; delete d.etapeEnCours; delete d.focus;
    d.compteurs = d.compteurs || {}; d.routines = d.routines || {}; d.finies = d.finies || {}; d.passees = d.passees || {};
    Object.entries(etat.etapes).forEach(([i, x]) => { i = Number(i); const e = els[i], k = ck(d, i);
      delete d.finies[k]; delete d.passees[k];
      if (e.type === "routine") { if (x.etat === "faite") d.routines[k] = true; else delete d.routines[k]; if (x.etat === "passee") d.passees[k] = true; }
      else { d.compteurs[k] = x.etat === "faite" ? e.n : x.etat === "partielle" ? x.n : 0; if (x.etat === "partielle") d.finies[k] = true; if (x.etat === "passee") d.passees[k] = true; } });
    d.voies = d.voies || [];
    const voie = estVoie(act), res = ok => ok ? (voie ? "Enchaînée" : "Réussi") : (voie ? "Pas finie" : "Pas réussi");
    Object.entries(etat.grille).forEach(([g, x]) => {
      for (let n = 0; n < x.ok + x.ko; n++) d.voies.push({ ...finaliserTentative({ cot: g, profil: "Vertical", res: res(n < x.ok), salle: etat.salle, style: "" }, act), approx: true });
    });
    const sa = etat.salle && salleDe(etat.salle);
    Object.entries(etat.voiesSalle).forEach(([id, r]) => { const v = sa && sa.voies.find(z => z.id === id); if (!v || !r) return;
      d.voies.push({ ...finaliserTentative({ cot: v.cot, profil: v.profil, couleur: v.couleur, nom: v.nom, voieId: id, res: res(r === "ok"), salle: etat.salle,
        style: essaisVoie(id).length ? "Après travail" : "À vue" }, act), approx: true }); });
    if (etat.salle) d.salle = etat.salle;
    d.fait = "Oui"; d.effort = etat.effort; d.douleur = etat.douleur; d.zone = etat.douleur > 0 ? etat.zone : ""; d.notes = (etat.notes || "").trim();
  });
  libererEcran();
}
// Séances passées sans bilan (14 derniers jours)
function seancesACompleter() {
  const auj = new Date(); auj.setHours(0, 0, 0, 0);
  return LISTE.map((s, k) => ({ s, k })).filter(({ s }) => { const d = lire(s), dt = dateSeance(s);
    return !d.fait && (dt < auj || (d.debut && !d.fin)) && dt.getTime() >= auj.getTime() - 14 * 864e5 && !/facultati/i.test(s.contenu); });
}
function carteACompleter() {
  const l = seancesACompleter(); if (!l.length) return "";
  return `<div class="carte a-completer"><b>📝 ${l.length} séance${l.length > 1 ? "s" : ""} à compléter</b>
    <div class="choix compact">${l.map(({ s, k }) => `<button data-completer="${k}">${esc(jourDe(s).slice(0, 3))}. ${jourMois(dateSeance(s))} · ${esc(s.activite)}</button>`).join("")}</div></div>`;
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
  let h = basculeVue("semaine") + carteACompleter() + carteCompetences(semaineVue) + carteFeux() + carteMesures(semaineVue)
    + `<button class="lien outils-semaine" data-outils-semaine="1">⋯ Outils de la semaine (copier, répéter, pause)</button>` + `<div class="bilan-semaine">${faites.length} séance${faites.length > 1 ? "s" : ""} faite${faites.length > 1 ? "s" : ""} sur ${prevues.length}${minutesFaites ? " · " + hm(minutesFaites) : ""}</div>`;
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
        <div class="cs-jour">${esc(jourDe(s))} ${jourMois(dateSeance(s))}${s.deplace ? ` <span class="petit">(déplacée, prévue ${s.jour.toLowerCase()})</span>` : ""}</div>
        <div class="cs-titre">${esc(titre)}${s.libre ? ` <span class="petit">· créée</span>` : ""}${s.modifie ? ` <span class="petit">· modifiée</span>` : ""}${v && d.fait === "Oui" ? ` <span class="petit">· ${esc(v)}</span>` : ""}</div>
        <div class="cs-duree">${duree}</div></div>${etat}</button>`;
  });
  h += `<button class="gros go" data-cree="ouvrir">+ Créer une séance</button>`;
  $("ecran").innerHTML = h;
}
$("ecran").addEventListener("toggle", e => {
  if (vue === "semaine" && e.target.classList && e.target.classList.contains("feux")) e.target.open ? ouverts.add("feux") : ouverts.delete("feux");
}, true);
$("ecran").addEventListener("click", e => {
  if (vue !== "semaine") return;
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.ouvrir !== undefined) return changer(Number(b.dataset.ouvrir));
  if (b.dataset.cree === "ouvrir") return ouvrirCreation();
  if (b.dataset.bilanBloc) { const bloc = Number(b.dataset.bilanBloc), x = lireBilan(bloc);
    return ouvrirModal({ type: "competences", bloc, semaine: semaineVue, notes: x ? [...x.notes] : Array(8).fill(null) }); }
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
$("ecran").addEventListener("input", e => { if (e.target.id === "form-nom" && formVoie) formVoie.nom = e.target.value; });
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
const DISCIPLINES = ["Voie et bloc", "Voie", "Bloc", "Méthodes", "Muscu", "Course", "Mobilité", "Soins"];
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
const sousCategories = disc => [...new Set(EXERCICES.filter(x => x.discipline === disc).map(x => x.categorie))];
const estDiscipline = f => DISCIPLINES.includes(f);
// Fil d'Ariane : Exercices › Discipline › Sous-catégorie
function filAriane() {
  const morceaux = [`<button class="lien" data-b="tuiles">Exercices</button>`];
  if (B.filtre && B.filtre !== "recherche") {
    const plusieurs = estDiscipline(B.filtre) && sousCategories(B.filtre).length > 1;
    morceaux.push(B.sc || B.ecran === "fiche" ? `<button class="lien" data-b="${plusieurs ? "souscats" : "liste"}">${esc(TITRES_FILTRE[B.filtre] || B.filtre)}</button>` : `<span>${esc(TITRES_FILTRE[B.filtre] || B.filtre)}</span>`);
    if (B.sc) morceaux.push(B.ecran === "fiche" ? `<button class="lien" data-b="liste">${esc(B.sc)}</button>` : `<span>${esc(B.sc)}</span>`);
  }
  return `<nav class="fil-ariane">${morceaux.join(" › ")}</nav>`;
}
function exercicesFiltres() {
  if (B.filtre === "favoris") return EXERCICES.filter(x => estFavori(x.nom));
  if (B.filtre === "seance") { const n = new Set(courant() ? nomsCites(courant().contenu) : []); return EXERCICES.filter(x => n.has(x.nom.toLowerCase())); }
  if (B.filtre === "recherche") { const m = sansAccents(B.q.trim());
    return EXERCICES.filter(x => sansAccents([x.discipline, x.categorie, x.nom, x.but, x.comment, x.erreurs, x.facile, x.cle].join(" ")).includes(m)); }
  return EXERCICES.filter(x => x.discipline === B.filtre && (!B.sc || x.categorie === B.sc));
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
  } else if (B.ecran === "souscats") {
    $("titre-date").textContent = B.filtre;
    const act = ACT_DISCIPLINE[B.filtre] || "";
    $("ecran").innerHTML = filAriane() + recherche + `<div class="tuiles">${sousCategories(B.filtre).map(sc =>
      `<button class="tuile" data-act="${act}" data-sc="${esc(sc)}"><span class="tuile-nom">${esc(sc)}</span><span class="tuile-n">${EXERCICES.filter(x => x.discipline === B.filtre && x.categorie === sc).length}</span></button>`).join("")}</div>
      <button class="gros contour" data-sc="">Tout voir (${EXERCICES.filter(x => x.discipline === B.filtre).length})</button>`;
  } else if (B.ecran === "liste") {
    $("titre-date").textContent = B.sc || TITRES_FILTRE[B.filtre] || B.filtre;
    let h = filAriane() + recherche;
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
    $("ecran").innerHTML = `${filAriane()}<h2 class="titre-fiche">${esc(B.routine)}</h2>
      <ol class="etapes">${etapesRoutine(B.routine).map(r => `<li><b>${esc(r.etape)}</b>${r.duree && r.duree !== "—" ? " (" + esc(r.duree) + ")" : ""} : ${esc(r.quoi)}</li>`).join("")}</ol>`;
  } else {
    const x = EXERCICES[B.fiche], u = usage(x.nom), df = derniereFoisExo(x.nom);
    const plusTard = x.semaine > semaineActuelle();
    $("titre-date").textContent = "Fiche";
    $("ecran").innerHTML = `${filAriane()}
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
  if (t.b === "souscats") { B = { ecran: "souscats", filtre: B.filtre, q: "" }; return afficherBiblio(); }
  if (t.filtre) {
    const sc = estDiscipline(t.filtre) ? sousCategories(t.filtre) : [];
    B = { ecran: sc.length > 1 ? "souscats" : "liste", filtre: t.filtre, q: "" }; window.scrollTo(0, 0); return afficherBiblio();
  }
  if (t.sc !== undefined) { B.ecran = "liste"; B.sc = t.sc || undefined; window.scrollTo(0, 0); return afficherBiblio(); }
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

// ---------- Salles (Plus → 🏢 Salles) ----------
let SA = { id: null, voie: null, onglet: "voies", filtre: "place" };
function ouvrirSalles(id) { vue = id ? "salle" : "salles"; SA = { id: id || null, voie: null, onglet: "voies", filtre: "place" }; afficher(); }
const majSalle = (id, f) => { const x = lireSalles(), sa = x.liste.find(y => y.id === id); f(sa, x); ecrireSalles(x); };
const COULEUR_HEX = n => { const c = COULEURS.find(x => x[0] === n); if (c) return c[1];
  for (const sa of lireSalles().liste) { const x = (sa.couleurs || []).find(y => y.nom === n); if (x) return x.hex; } return "transparent"; };
const etoileAujourdhui = v => v.etoile === isoDate(new Date());
// Annuler une action sur les salles (bandeau « Annuler »)
function annulableSalles(texte, action) {
  const avant = localStorage.getItem("salles"); action();
  montrerAnnulation(texte, () => { localStorage.setItem("salles", avant); cacheFeux = null; afficher(false); });
}
function afficherSalles() {
  $("titre-date").textContent = "Salles";
  const x = lireSalles();
  $("ecran").innerHTML = x.liste.map(sa => { const enPlace = sa.voies.filter(v => v.statut !== "Démontée").length, p = projetsEnCours(sa.id).length;
      return `<button class="ligne-menu grande" data-salle="${sa.id}"><span class="icone">🏢</span><span><span class="titre-menu">${esc(sa.nom)}</span>
        <span class="sous-menu">${esc(sa.type)} · ${sa.secteurs.length} secteur${sa.secteurs.length > 1 ? "s" : ""} · ${enPlace} en place${p ? ` · ${p} projet${p > 1 ? "s" : ""} en cours` : ""}</span></span><span class="chevron">›</span></button>`; }).join("")
    + `<button class="gros contour" data-salle-ajout="1">+ Nouvelle salle</button>`;
}
// Le mur en un coup d'œil : par cotation, ce qui est en place et ce que tu as réussi
function murSalle(sa) {
  return ["Bloc", "Voie"].map(disc => {
    const enPlace = sa.voies.filter(v => v.discipline === disc && v.statut !== "Démontée"); if (!enPlace.length) return "";
    const grades = (sa.echelles[disc] || []).map(x => x.salle).filter(g => enPlace.some(v => v.cot === g));
    return `<div class="mur"><div class="mur-titre">${disc === "Bloc" ? "Blocs" : "Voies"} en place</div>${grades.map(g => {
      const l = enPlace.filter(v => v.cot === g), ok = l.filter(v => essaisVoie(v.id).some(reussi)).length;
      return `<div class="mur-ligne"><span class="mur-cot">${esc(g)}</span><span class="mur-barre"><span style="width:${ok / l.length * 100}%"></span></span><span class="petit">${ok} / ${l.length}</span></div>`;
    }).join("")}</div>`; }).join("");
}
function tuileVoie(v) {
  const n = essaisVoie(v.id), ok = n.some(reussi);
  const etat = ok ? `<span class="t-ok">✓ réussi</span>` : n.length ? `${n.length} essai${n.length > 1 ? "s" : ""}` : "à essayer";
  return `<button class="tuile-voie ${v.statut === "Démontée" ? "demontee" : ""}" data-voie-salle="${v.id}" style="border-top-color:${COULEUR_HEX(v.couleur) === "transparent" ? "var(--bord)" : COULEUR_HEX(v.couleur)}">
    ${etoileAujourdhui(v) ? `<span class="t-etoile">★</span>` : ""}<span class="t-cot">${esc(v.cot)}</span><span class="t-etat">${etat}</span>${v.nom ? `<span class="t-nom">${esc(v.nom)}</span>` : ""}</button>`;
}
function afficherSalle() {
  const sa = salleDe(SA.id); if (!sa) return ouvrirSalles();
  $("titre-date").textContent = sa.nom;
  if (SA.voie) return afficherVoieSalle(sa);
  if (SA.secteur) return afficherSecteur(sa);
  const onglets = `<div class="segment onglets-salle">${[["voies", "Voies"], ["secteurs", "Secteurs"], ["reglages", "Réglages"]].map(([k, t]) =>
    `<button data-onglet-salle="${k}" class="${SA.onglet === k ? "choisi" : ""}">${t}</button>`).join("")}</div>`;
  let h = onglets;
  if (SA.onglet === "voies") {
    const projets = projetsEnCours(sa.id);
    const garder = v => SA.filtre === "toutes" ? true : v.statut === "Démontée" ? false
      : SA.filtre === "essayer" ? !essaisVoie(v.id).length : SA.filtre === "reussies" ? essaisVoie(v.id).some(reussi) : true;
    const groupes = [...sa.secteurs.map(x => ({ id: x.id, nom: x.nom, profil: x.profil })), { id: "", nom: "Sans secteur", profil: "" }]
      .map(g => ({ ...g, voies: sa.voies.filter(v => (v.secteur || "") === g.id && garder(v)).sort((a, b) => String(a.cot).localeCompare(String(b.cot), "fr", { numeric: true })) }))
      .filter(g => g.voies.length);
    h += murSalle(sa)
      + (projets.length ? `<h3 class="sous-cat">Projets en cours</h3>${projets.slice(0, 5).map(p => `<button class="ligne-exo" data-voie-salle="${p.v.id}"><span><span class="pastille-mini" style="background:${COULEUR_HEX(p.v.couleur)}"></span><b>${esc(p.v.cot)}</b> ${esc(p.v.nom || p.v.couleur || "")}
          <span class="petit">${esc(nomSecteur(sa, p.v.secteur))}</span></span><span class="badge">${p.essais.length} essai${p.essais.length > 1 ? "s" : ""}</span></button>`).join("")}` : "")
      + `<div class="choix compact filtres-salle">${[["place", "En place"], ["essayer", "À essayer"], ["reussies", "Réussies"], ["toutes", "Toutes"]].map(([k, t]) =>
          `<button data-filtre-salle="${k}" class="${SA.filtre === k ? "choisi" : ""}">${t}</button>`).join("")}</div>`
      + (groupes.map(g => `<div class="groupe-secteur"><b>${esc(g.nom)}</b>${g.profil ? ` <span class="petit">· ${esc(g.profil.toLowerCase())}</span>` : ""}</div>
          <div class="tuiles-voies">${g.voies.map(tuileVoie).join("")}</div>`).join("")
        || `<p class="petit">Rien à afficher. Les voies s'ajoutent toutes seules quand tu notes une couleur pendant une séance, ou avec le bouton ci-dessous.</p>`)
      + `<button class="gros go" data-ajout-rapide="">+ Ajouter des voies</button>`;
  } else if (SA.onglet === "secteurs") {
    const jours = ts => ts ? Math.floor((Date.now() - ts) / 864e5) : null;
    h += sa.secteurs.map(x => { const n = sa.voies.filter(v => v.secteur === x.id && v.statut !== "Démontée").length, j = jours(x.maj);
        return `<button class="ligne-menu" data-secteur="${x.id}"><span><span class="titre-menu">${esc(x.nom)}</span>
          <span class="sous-menu">${esc(profilsSecteur(x).join(", "))} · ${n} en place${j !== null ? ` · mis à jour il y a ${j} jour${j > 1 ? "s" : ""}` : ""}</span></span><span class="chevron">›</span></button>`; }).join("")
      + `<div class="ajout-secteur"><input type="text" id="secteur-nom" placeholder="Nouveau secteur (ex. Grand dévers)">
        <select id="secteur-profil">${PROFILS.map(p => `<option>${p}</option>`).join("")}</select><button class="principal" data-secteur-ajout="1">Ajouter</button></div>`;
  } else {
    h += `<label class="champ">Nom</label><input type="text" id="salle-nom" value="${esc(sa.nom)}">
      <label class="champ">Type</label><div class="segment">${["Bloc", "Voie", "Bloc et voie"].map(t => `<button data-salle-type="${t}" class="${sa.type === t ? "choisi" : ""}">${t}</button>`).join("")}</div>
      <button class="gros contour" data-assistant="${sa.id}">Assistant : secteurs et échelle</button>
      <h3 class="sous-cat">Couleurs propres à la salle</h3><p class="petit">En plus des ${COULEURS.length} couleurs communes (par exemple « Saumon » ou « Bicolore jaune-noir »).</p>
      ${(sa.couleurs || []).map(c => `<div class="secteur"><span><span class="pastille-mini" style="background:${c.hex}"></span>${esc(c.nom)}</span><button data-coul-suppr="${esc(c.nom)}" aria-label="Supprimer">✕</button></div>`).join("")}
      <div class="ajout-secteur"><input type="text" id="coul-nom" placeholder="Nom de la couleur"><input type="color" id="coul-hex" value="#888888" class="choix-couleur"><button class="principal" data-coul-ajout="1">Ajouter</button></div>
      <h3 class="sous-cat">Échelles de cotation</h3><p class="petit">Les cotations affichées dans la salle, et leur équivalent dans l'app (pour comparer les salles et calculer les feux verts).</p>
      ${["Bloc", "Voie"].map(disc => `<p><b>${disc}</b></p><input type="text" data-echelle-liste="${disc}" value="${esc((sa.echelles[disc] || []).map(x => x.salle).join(", "))}">
        <div class="echelle-table">${(sa.echelles[disc] || []).map((x, k) => `<label>${esc(x.salle)} → <select data-echelle="${disc}" data-k="${k}">${(COTATIONS[disc] || []).map(c => `<option ${c === x.app ? "selected" : ""}>${c}</option>`).join("")}</select></label>`).join("")}</div>`).join("")}
      ${lireSalles().liste.length > 1 ? `<button class="gros contour danger" data-salle-suppr="1">Supprimer cette salle</button>` : ""}`;
  }
  $("ecran").innerHTML = h;
}
function afficherVoieSalle(sa) {
  const v = sa.voies.find(x => x.id === SA.voie); if (!v) { SA.voie = null; return afficherSalle(); }
  const essais = essaisVoie(v.id), disc = v.discipline;
  $("titre-date").textContent = `${disc} ${v.cot}`;
  $("ecran").innerHTML = `<button class="gros ${etoileAujourdhui(v) ? "go" : "contour"}" data-etoile="1">${etoileAujourdhui(v) ? "★ À faire aujourd'hui" : "☆ À faire aujourd'hui"}</button>
    <label class="champ">Type</label><div class="segment">${["Voie", "Bloc"].map(t => `<button data-vs="discipline" data-valeur="${t}" class="${disc === t ? "choisi" : ""}">${t}</button>`).join("")}</div>
    <label class="champ">Secteur</label><div class="choix compact"><button data-vs="secteur" data-valeur="" class="${!v.secteur ? "choisi" : ""}">Aucun</button>${sa.secteurs.map(x => `<button data-vs="secteur" data-valeur="${x.id}" class="${v.secteur === x.id ? "choisi" : ""}">${esc(x.nom)}</button>`).join("")}</div>
    <label class="champ">Cotation (échelle de la salle)</label><div class="choix compact">${(sa.echelles[disc] || []).map(x => `<button data-vs="cot" data-valeur="${esc(x.salle)}" class="${v.cot === x.salle ? "choisi" : ""}">${esc(x.salle)}</button>`).join("")}</div>
    <label class="champ">Couleur</label><div class="pastilles">${couleursDe(sa.id).map(([n, c]) => `<button data-vs="couleur" data-valeur="${n}" class="pastille ${v.couleur === n ? "choisi" : ""}" style="background:${c}" aria-label="${n}"></button>`).join("")}</div>
    <label class="champ">Profil</label><div class="segment">${PROFILS.map(p => `<button data-vs="profil" data-valeur="${p}" class="${v.profil === p ? "choisi" : ""}">${p}</button>`).join("")}</div>
    <label class="champ">Nom ou numéro</label><input type="text" id="vs-nom" value="${esc(v.nom || "")}">
    <label class="champ">Notes (méthode, prises…)</label><textarea id="vs-notes">${esc(v.notes || "")}</textarea>
    <label class="champ">Statut</label><div class="segment">${["En place", "Démontée"].map(t => `<button data-vs="statut" data-valeur="${t}" class="${(v.statut || "En place") === t ? "choisi" : ""}">${t}</button>`).join("")}</div>
    <p class="petit">Ouverte le ${esc(v.ouverture || "?")}${v.demontage ? ` · démontée le ${esc(v.demontage)}` : ""}</p>
    <h3 class="sous-cat">Ton historique</h3>
    ${essais.map(e => `<div class="voie"><span>${esc(e.res)}${e.sec ? ` (${e.sec} sec)` : ""} · ${esc(e.style || "")}</span><span class="petit">${esc((LISTE.find(s => cle(s) === e.seance) ? jourMois(dateSeance(LISTE.find(s => cle(s) === e.seance))) : ""))}</span></div>`).join("") || `<p class="petit">Pas encore essayée.</p>`}
    ${essais.length ? "" : `<button class="gros contour danger" data-vs-suppr="1">Supprimer</button>`}`;
}
// Page d'un secteur : ses voies, ses profils, ses actions
function afficherSecteur(sa) {
  const x = sa.secteurs.find(z => z.id === SA.secteur); if (!x) { SA.secteur = null; return afficherSalle(); }
  $("titre-date").textContent = x.nom;
  const garder = v => SA.filtre === "toutes" ? true : v.statut === "Démontée" ? false
    : SA.filtre === "essayer" ? !essaisVoie(v.id).length : SA.filtre === "reussies" ? essaisVoie(v.id).some(reussi) : true;
  const voies = sa.voies.filter(v => v.secteur === x.id && garder(v)).sort((a, b) => String(a.cot).localeCompare(String(b.cot), "fr", { numeric: true }));
  const j = x.maj ? Math.floor((Date.now() - x.maj) / 864e5) : null;
  $("ecran").innerHTML = `<p class="petit">${esc(sa.nom)}${j !== null ? ` · mis à jour il y a ${j} jour${j > 1 ? "s" : ""}` : ""}</p>
    <div class="choix compact filtres-salle">${[["place", "En place"], ["essayer", "À essayer"], ["reussies", "Réussies"], ["toutes", "Toutes"]].map(([k, t]) =>
      `<button data-filtre-salle="${k}" class="${SA.filtre === k ? "choisi" : ""}">${t}</button>`).join("")}</div>
    <div class="tuiles-voies">${voies.map(tuileVoie).join("") || `<p class="petit">Aucune voie ici.</p>`}</div>
    <button class="gros go" data-ajout-rapide="${x.id}">+ Ajouter des voies</button>
    <button class="gros contour" data-sec-renouv="${x.id}">⟳ Renouvelé : les voies ont changé</button>
    <h3 class="sous-cat">Réglages du secteur</h3>
    <label class="champ">Nom</label><input type="text" id="sec-nom2" value="${esc(x.nom)}">
    <label class="champ">Profils <span class="petit">(un ou plusieurs ; le premier est proposé par défaut)</span></label>
    <div class="choix">${PROFILS.map(p => `<button data-sec-prof="${p}" class="${profilsSecteur(x).includes(p) ? "choisi" : ""}">${p}</button>`).join("")}</div>
    <button class="gros contour danger" data-sec-suppr="${x.id}">Supprimer le secteur</button>`;
}
// Ajout rapide en rafale
function ouvrirAjoutRapide(secteur) {
  const sa = salleDe(SA.id), disc = sa.type === "Voie" ? "Voie" : "Bloc";
  ouvrirModal({ type: "ajoutRapide", sid: sa.id, disc, secteur: secteur ?? (sa.secteurs[0] || {}).id ?? "", couleur: "", cot: "", ajoutees: 0 });
}
function htmlAjoutRapide() {
  const sa = salleDe(M.sid);
  return `<h2>Ajouter des voies · ${esc(sa.nom)}</h2>
    ${sa.type === "Bloc et voie" ? `<div class="segment">${["Bloc", "Voie"].map(t => `<button data-m="disc" data-valeur="${t}" class="${M.disc === t ? "choisi" : ""}">${t}</button>`).join("")}</div>` : ""}
    <label class="champ">Secteur</label><div class="choix compact"><button data-m="secteur" data-valeur="" class="${!M.secteur ? "choisi" : ""}">Aucun</button>${sa.secteurs.map(x => `<button data-m="secteur" data-valeur="${x.id}" class="${M.secteur === x.id ? "choisi" : ""}">${esc(x.nom)}</button>`).join("")}</div>
    <label class="champ">Couleur</label><div class="pastilles">${couleursDe(M.sid).map(([n, c]) => `<button data-m="couleurRapide" data-valeur="${n}" class="pastille ${M.couleur === n ? "choisi" : ""}" style="background:${c}" aria-label="${n}"></button>`).join("")}</div>
    ${profilsSecteur(sa.secteurs.find(z => z.id === M.secteur)).length > 1 ? `<label class="champ">Profil</label><div class="segment">${profilsSecteur(sa.secteurs.find(z => z.id === M.secteur)).map(p =>
      `<button data-m="profilRapide" data-valeur="${p}" class="${(M.profil || profilsSecteur(sa.secteurs.find(z => z.id === M.secteur))[0]) === p ? "choisi" : ""}">${p}</button>`).join("")}</div>` : ""}
    <label class="champ">Cotation</label><div class="choix compact">${(sa.echelles[M.disc] || []).map(x => `<button data-m="cot" data-valeur="${esc(x.salle)}" class="${M.cot === x.salle ? "choisi" : ""}">${esc(x.salle)}</button>`).join("")}</div>
    ${M.ajoutees ? `<p class="ajout-ok">✓ ${M.ajoutees} ajoutée${M.ajoutees > 1 ? "s" : ""}</p>` : ""}
    <div class="actions"><button data-m="ajouter-fermer" ${M.cot ? "" : "disabled"}>Ajouter</button><button data-m="ajouter-suite" class="principal" ${M.cot ? "" : "disabled"}>Ajouter et continuer</button></div>
    <p class="centre"><button class="lien" data-m="fermer">Terminé</button></p>`;
}
function ajouterVoieRapide() {
  majSalle(M.sid, sa => { const sec = sa.secteurs.find(x => x.id === M.secteur);
    sa.voies.push({ id: "v" + Date.now() + Math.floor(Math.random() * 1000), discipline: M.disc, secteur: M.secteur, couleur: M.couleur, cot: M.cot,
                    profil: M.profil && profilsSecteur(sec).includes(M.profil) ? M.profil : profilsSecteur(sec)[0], nom: "", ouverture: isoDate(new Date()), statut: "En place", notes: "" }); });
  M.ajoutees++; M.couleur = ""; M.cot = "";
}
// Création guidée d'une salle (ou compléter une salle existante)
const SECTEURS_SUGGERES = [["Dalle", "Dalle"], ["Vertical", "Vertical"], ["Léger dévers", "Léger dévers"], ["Dévers", "Dévers"], ["Toit", "Toit"], ["Pan", "Dévers"]];
const MODELES_ECHELLE = { "Blocs de 1 à 9": ["1", "2", "3", "4", "5", "6", "7", "8", "9"], "Blocs de 1 à 6": ["1", "2", "3", "4", "5", "6"], "Blocs comme l'app": null };
function ouvrirAssistant(sid) {
  const sa = sid && salleDe(sid);
  ouvrirModal({ type: "assistant", sid: sid || null, etape: sa ? 2 : 1, nom: sa ? sa.nom : "", typeSalle: sa ? sa.type : "Bloc et voie",
                secteurs: sa ? sa.secteurs.map(x => x.nom) : [], modele: null, perso: "" });
}
function htmlAssistant() {
  const pas = `<div class="etapes-creation">${[1, 2, 3].map(n => `<span class="${n <= M.etape ? "fait" : ""}"></span>`).join("")}</div>`;
  if (M.etape === 1) return `<h2>Nouvelle salle</h2>${pas}<label class="champ">Nom</label><input type="text" id="as-nom" value="${esc(M.nom)}" placeholder="ex. Arkose Bruxelles">
    <label class="champ">Type</label><div class="segment">${["Bloc", "Voie", "Bloc et voie"].map(t => `<button data-m="typeSalle" data-valeur="${t}" class="${M.typeSalle === t ? "choisi" : ""}">${t}</button>`).join("")}</div>
    <div class="actions"><button data-m="fermer">Annuler</button><button data-m="as-suivant" class="principal">Suivant ›</button></div>`;
  if (M.etape === 2) return `<h2>Secteurs</h2>${pas}<p class="petit">Touche les secteurs de la salle ; ajoute-en d'autres si besoin. Tu pourras les renommer.</p>
    <div class="choix">${SECTEURS_SUGGERES.map(([n]) => `<button data-m="as-secteur" data-valeur="${n}" class="${M.secteurs.includes(n) ? "choisi" : ""}">${n}</button>`).join("")}
      ${M.secteurs.filter(n => !SECTEURS_SUGGERES.some(s => s[0] === n)).map(n => `<button data-m="as-secteur" data-valeur="${esc(n)}" class="choisi">${esc(n)}</button>`).join("")}</div>
    <div class="ajout-secteur"><input type="text" id="as-perso" placeholder="Autre secteur"><button data-m="as-perso">Ajouter</button></div>
    <div class="actions"><button data-m="${M.sid ? "fermer" : "as-retour"}">${M.sid ? "Annuler" : "‹ Retour"}</button><button data-m="as-suivant" class="principal">Suivant ›</button></div>`;
  return `<h2>Échelle des blocs</h2>${pas}<p class="petit">Comment la salle cote-t-elle ses blocs ? (Les voies gardent la cotation française.) La correspondance se règle ensuite dans Réglages.</p>
    <div class="menu-liste">${Object.keys(MODELES_ECHELLE).map(k => `<button class="ligne-menu ${M.modele === k ? "choisi" : ""}" data-m="as-modele" data-valeur="${k}"><span class="titre-menu">${k}</span></button>`).join("")}</div>
    <div class="actions"><button data-m="as-retour">‹ Retour</button><button data-m="as-fin" class="principal" ${M.modele ? "" : "disabled"}>${M.sid ? "Enregistrer" : "Créer la salle"}</button></div>`;
}
function finirAssistant() {
  const bloc = COTATIONS.Bloc || [], min = Number(bloc[0]), max = Number(bloc[bloc.length - 1]);
  const grades = MODELES_ECHELLE[M.modele] || bloc;
  const echelleBloc = grades.map((g, k) => ({ salle: g, app: MODELES_ECHELLE[M.modele] && grades.length === 6 && M.modele === "Blocs de 1 à 6" ? bloc[k] : String(Math.min(max, Math.max(min, Number(g)))) }));
  const x = lireSalles();
  let sa = M.sid && x.liste.find(y => y.id === M.sid);
  if (!sa) { sa = salleParDefaut(); sa.nom = M.nom.trim() || "Nouvelle salle"; sa.type = M.typeSalle; x.liste.push(sa); }
  M.secteurs.forEach(n => { if (!sa.secteurs.some(s => s.nom === n)) sa.secteurs.push({ id: "t" + Date.now() + Math.floor(Math.random() * 1000), nom: n,
    profil: (SECTEURS_SUGGERES.find(s => s[0] === n) || [n, "Vertical"])[1], maj: Date.now() }); });
  sa.echelles.Bloc = echelleBloc; ecrireSalles(x);
  fermerModal(); ouvrirSalles(sa.id);
}
$("ecran").addEventListener("click", e => {
  if (!["salles", "salle"].includes(vue)) return;
  const b = e.target.closest("button"); if (!b) return;
  const t = b.dataset, y = window.scrollY;
  if (t.salle) return ouvrirSalles(t.salle);
  if (t.salleAjout) return ouvrirAssistant();
  if (t.assistant) return ouvrirAssistant(t.assistant);
  if (t.ongletSalle) { SA.onglet = t.ongletSalle; SA.secteur = null; return afficher(); }
  if (t.filtreSalle) SA.filtre = t.filtreSalle;
  if (t.ajoutRapide !== undefined) return ouvrirAjoutRapide();
  if (t.secteur) { SA.secteur = t.secteur; SA.filtre = "place"; return afficher(); }
  if (t.secProf) majSalle(SA.id, sa => { const z = sa.secteurs.find(y => y.id === SA.secteur), l = profilsSecteur(z);
    z.profils = l.includes(t.secProf) ? (l.length > 1 ? l.filter(p => p !== t.secProf) : l) : [...l, t.secProf]; z.profil = z.profils[0]; });
  if (t.secRenouv) { const sid = SA.id, secId = t.secRenouv;
    annulableSalles("Secteur renouvelé", () => majSalle(sid, sa => { sa.voies.forEach(v => { if (v.secteur === secId && v.statut !== "Démontée") { v.statut = "Démontée"; v.demontage = isoDate(new Date()); } });
      sa.secteurs.find(z => z.id === secId).maj = Date.now(); }));
    return ouvrirAjoutRapide(secId); }
  if (t.secSuppr) { const sid = SA.id, secId = t.secSuppr; SA.secteur = null;
    annulableSalles("Secteur supprimé", () => majSalle(sid, sa => { sa.secteurs = sa.secteurs.filter(z => z.id !== secId); sa.voies.forEach(v => { if (v.secteur === secId) v.secteur = ""; }); })); }
  if (t.coulAjout) { const nom = ($("coul-nom").value || "").trim(); if (!nom) return;
    majSalle(SA.id, sa => { sa.couleurs = [...(sa.couleurs || []).filter(c => c.nom !== nom), { nom, hex: $("coul-hex").value }]; }); }
  if (t.coulSuppr) majSalle(SA.id, sa => sa.couleurs = (sa.couleurs || []).filter(c => c.nom !== t.coulSuppr));
  if (t.salleType) majSalle(SA.id, sa => sa.type = t.salleType);
  if (t.salleSuppr) { const id = SA.id; annulableSalles("Salle supprimée", () => { const x = lireSalles(); x.liste = x.liste.filter(z => z.id !== id); ecrireSalles(x); }); return ouvrirSalles(); }
  if (t.secteurAjout) { const nom = $("secteur-nom").value.trim(); if (!nom) return;
    majSalle(SA.id, sa => sa.secteurs.push({ id: "t" + Date.now(), nom, profil: $("secteur-profil").value, maj: Date.now() })); }
  if (t.voieSalle) { SA.voie = t.voieSalle; afficher(); return; }
  if (t.etoile) majSalle(SA.id, sa => { const v = sa.voies.find(x => x.id === SA.voie); v.etoile = etoileAujourdhui(v) ? "" : isoDate(new Date()); });
  if (t.vs) majSalle(SA.id, sa => { const v = sa.voies.find(x => x.id === SA.voie);
    if (t.vs === "couleur") v.couleur = v.couleur === t.valeur ? "" : t.valeur;
    else if (t.vs === "statut") { v.statut = t.valeur; v.demontage = t.valeur === "Démontée" ? isoDate(new Date()) : ""; }
    else if (t.vs === "discipline") { v.discipline = t.valeur; v.cot = (sa.echelles[t.valeur] || [{ salle: v.cot }])[0].salle; }
    else if (t.vs === "secteur") { v.secteur = t.valeur; const x = sa.secteurs.find(z => z.id === t.valeur); if (x) v.profil = x.profil; }
    else v[t.vs] = t.valeur; });
  if (t.vsSuppr) { const id = SA.voie, sid = SA.id; SA.voie = null; annulableSalles("Voie supprimée", () => majSalle(sid, sa => sa.voies = sa.voies.filter(v => v.id !== id))); }
  afficher(false); window.scrollTo(0, y);
});
$("ecran").addEventListener("change", e => {
  if (vue !== "salle") return;
  const el = e.target;
  if (el.id === "salle-nom" && el.value.trim()) majSalle(SA.id, sa => sa.nom = el.value.trim());
  if (el.id === "sec-nom2" && el.value.trim()) { majSalle(SA.id, sa => sa.secteurs.find(z => z.id === SA.secteur).nom = el.value.trim()); afficher(false); }
  if (el.id === "vs-nom") majSalle(SA.id, sa => sa.voies.find(x => x.id === SA.voie).nom = el.value.trim());
  if (el.id === "vs-notes") majSalle(SA.id, sa => sa.voies.find(x => x.id === SA.voie).notes = el.value.trim());
  if (el.dataset.echelle) majSalle(SA.id, sa => sa.echelles[el.dataset.echelle][Number(el.dataset.k)].app = el.value);
  if (el.dataset.echelleListe) { const disc = el.dataset.echelleListe, app = COTATIONS[disc] || [];
    majSalle(SA.id, sa => { const avant = sa.echelles[disc] || [];
      sa.echelles[disc] = el.value.split(",").map(x => x.trim()).filter(Boolean).map(g => ({ salle: g, app: (avant.find(a => a.salle === g) || {}).app || (app.includes(g) ? g : app[0]) })); });
    afficher(false); }
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
    ${ligne("salles", "🏢", "Salles", `${lireSalles().liste.length} salle${lireSalles().liste.length > 1 ? "s" : ""} · secteurs, voies, projets en cours`)}
    ${ligne("exporter", "⬆", "Exporter", ex.texte, ex.retard ? "en-retard" : "")}
    ${ligne("sauvegarde", "💾", "Sauvegarde", "Restaurer tes saisies")}
    ${ligne("reglages", "⚙", "Réglages", "Programme, minuteur, son, rappels")}
    ${ligne("aide", "❓", "Aide", "Le guide d'utilisation, même hors connexion")}
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
  if (a === "salles") return ouvrirSalles();
  if (a === "exporter") { exporter(); return afficher(false); }
  if (a === "sauvegarde") { vue = "sauvegarde"; return afficher(); }
  if (a === "restaurer") return $("fichier").click();
  if (a === "reglages") { vue = "reglages"; return afficher(); }
  if (a === "aide") { location.href = URL_GUIDE; return; }
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
  const lignes = [["Type","Semaine","Jour","Activité","Date","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13","C14","C15"]];
  LISTE.forEach(s => {
    const d = lire(s), base = [s.semaine, s.jour, s.activite, isoDate(dateSeance(s))], act = actReleve(s, d);
    const notes = [s.libre && s.phase !== "Séance libre" ? s.phase : "",
      nomVersion(s, d) && (d.fait || d.debut) ? "Version : " + nomVersion(s, d) : "", d.notes,
      (d.voies || []).length ? "Relevé : " + d.voies.map(resume).join(", ") : "",
      (d.douleurs || []).length ? "Douleurs : " + d.douleurs.map(x => `${x.zone} ${x.niv} (${x.heure})`).join(", ") : "",
      d.raison ? "Raison : " + d.raison : "", d.approx ? "Suivi léger (approximatif)" : "",
      d.debut && d.fin ? `Temps${d.heuresSaisies ? " (saisi)" : ""} : ${hm((d.fin - d.debut) / 1000)} (prévu ${hm(dureeTotale(s, d))})` + (d.temps || d.tempsManuel ? " — " + etapesDe(elementsDe(s, d))
        .filter(x => tempsReel(d, ck(d, x.i))).map((x, n) => `${n + 1}. ${Math.round(tempsReel(d, ck(d, x.i)) / 60000)}${d.tempsManuel && d.tempsManuel[ck(d, x.i)] != null ? " saisi" : ""}/${Math.round(dureeElement(s, d, x.e) / 60)} min`).join(", ") : "") : ""
    ].filter(Boolean).join(" | ");
    const r = d.recup || {}, pendant = (d.douleurs || []).length ? Math.max(...d.douleurs.map(x => Number(x.niv) || 0)) : "";
    lignes.push([s.libre ? "Séance libre" : "Séance", ...base, d.fait, d.duree, d.effort, d.douleur, d.zone,
                 perfFinale(d, act), secFinal(d), notes, r.corps ?? "", r.energie ?? "", r.motivation ?? "", r.douleurAvant ?? "", r.zoneAvant ?? "", pendant,
                 (salleDe(d.salle) || {}).nom || ""]);
    (d.voies || []).forEach(v => { const a = v.act || s.activite;
      lignes.push(["Voie", s.semaine, s.jour, a, base[3], v.cot, v.profil, v.res,
        v.res === "Enchaînée" ? 0 : v.res === "Avec sec" ? v.sec : "", rang(a, v.cot) + 1, v.style || "", v.couleur || "", v.nom || "", v.cause || "",
        v.cotSalle || "", (salleDe(v.salle) || {}).nom || "", nomSecteur(salleDe(v.salle), (((salleDe(v.salle) || { voies: [] }).voies.find(x => x.id === v.voieId)) || {}).secteur), v.voieId || ""]); });
    (d.douleurs || []).forEach(x => lignes.push(["Douleur", ...base, x.zone, x.niv, x.heure]));
  });
  const derniere = Math.max(...LISTE.map(s => s.semaine));
  for (let sem = 1; sem <= derniere; sem++) {
    const m = lireMesures(sem), a = autoSemaine(sem);
    lignes.push(["Mesure", sem, "", "", "", ...CHAMPS_MESURES.map(([c]) => vide(m[c]) ? (a[c] ?? "") : m[c])]);
  }
  // Modifications du programme faites dans l'app (reportées dans Programme.xlsx par escalade.py)
  lireOps().forEach(o => lignes.push(["Programme", o.semaine ?? "", o.jour || "", o.activite || "", "", o.op, o.contenu || "", o.phase || "", o.id, o.depuis ?? "", o.n ?? ""]));
  // Inventaire des salles (une ligne par voie ou bloc)
  lireSalles().liste.forEach(sa => sa.voies.forEach(v => lignes.push(["Inventaire", "", "", v.discipline, v.ouverture || "", sa.nom, nomSecteur(sa, v.secteur), v.couleur || "",
    v.cot, versApp(sa.id, v.discipline, v.cot), v.profil || "", v.nom || "", v.statut || "En place", v.demontage || "", v.id, v.notes || ""])));
  Object.keys(localStorage).filter(k => k.startsWith("competences-")).sort().forEach(k => {
    const b = JSON.parse(localStorage.getItem(k)), bloc = Number(k.split("-")[1]);
    lignes.push(["Compétences", b.semaine || bloc * 8, "", "", isoDate(new Date(b.date)), ...b.notes, bloc]);
  });
  const csv = "\uFEFF" + lignes.map(l => l.map(champ).join(";")).join("\r\n");
  const sauvegarde = {};
  Object.keys(localStorage).filter(k => /^(seance-|mesures-|libre-|competences-|libres$|reglages$|favoris$|moyennes$|programme-actif$|deplacements$|salles$|modifs-programme$)/.test(k)).forEach(k => sauvegarde[k] = localStorage.getItem(k));
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
    const reste = els.reduce((r, e, i) => k < 0 || e.type === "info" || etapeReglee(d, i, e) ? r : r + dureeElement(s, d, e), 0)
                  - (k >= 0 ? Math.min(tempsEtapeEnCours(d), dureeElement(s, d, els[k])) : 0);
    const fin = new Date(Date.now() + Math.max(0, reste) * 1000);
    t = `⏱ ${Math.floor(ecoule / 3600)}:${pad(Math.floor(ecoule / 60) % 60)} · ≈ ${hm(total)} · fin ${fin.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" })}`;
  } else if (d.fin) t = `Séance faite en ${hm((d.fin - d.debut) / 1000)} · ${t}`;
  el.textContent = t; el.style.display = "none";                   // le temps de la séance est dans la carte Maintenant
  if ($("temps-seance")) $("temps-seance").textContent = d.debut && !d.fin ? t.replace(" · ≈ ", " depuis le début · prévu ≈ ").replace(" · fin ", " · fin vers ") : "";
  const te = $("temps-etape");                                    // temps passé sur l'étape en cours, mis à jour en continu
  if (te && d.debut && !d.fin) { const passe = tempsEtapeEnCours(d), prevu = Number(te.dataset.prevu);
    te.textContent = `${hm(passe)} sur ≈ ${hm(prevu)}`; te.classList.toggle("retard", passe > prevu); }
  document.documentElement.style.setProperty("--haut-entete", document.querySelector("header").offsetHeight + "px");
  $("mn-ecoule").textContent = d.debut && !d.fin ? t.split(" · ")[0] + " écoulé" : "";
}
function afficher(enHaut = true) {
  const mn = $("minuteur"); if (mn.parentElement !== document.body) document.body.insertBefore(mn, $("toast"));   // à l'abri avant de redessiner
  if (vue === "seance" && !courant()) { vue = "semaine"; semaineVue = Math.max(1, semaineDe(new Date())); }
  ({ seance: afficherSeance, repos: afficherRepos, semaine: afficherSemaine, programme: afficherProgramme, creation: afficherCreation, plus: afficherPlus,
     biblio: afficherBiblio, reglages: afficherReglages, sauvegarde: afficherSauvegarde, salles: afficherSalles, salle: afficherSalle })[vue]();
  // Onglet actif, flèches, menu ⋯ et ligne de temps selon l'écran
  const onglet = { seance: "seance", repos: "seance", semaine: "semaine", programme: "semaine", creation: "semaine" }[vue] || "plus";
  document.querySelectorAll("#onglets button").forEach(b => b.classList.toggle("actif", b.dataset.onglet === onglet));
  const fleches = vue === "seance" || vue === "semaine" || vue === "repos";
  $("prec").style.visibility = fleches || SOUS_ECRANS.includes(vue) ? "visible" : "hidden";
  $("suiv").style.visibility = fleches ? "visible" : "hidden";
  $("prec").classList.toggle("retour-entete", SOUS_ECRANS.includes(vue));
  $("btn-menu").style.display = vue === "seance" && courant() ? "" : "none";
  document.body.dataset.activite = vue === "seance" && courant() ? (actReleve(courant(), lire(courant())) === "Bloc" ? "Bloc" : courant().activite) : "";
  infoExport(); majInfosSeance(); placerMinuteur(); if (T) majMinuteur();
  if (enHaut) window.scrollTo(0, 0);
}
// Chrono du passage en cours, chaque seconde (et le temps de la séance toutes les 5 secondes)
let tics = 0;
setInterval(() => {
  if (++tics % 5 === 0 && vue === "seance") majInfosSeance();
  const el = $("chrono-passage"); if (!el || vue !== "seance") return;
  const d = dCourant(); if (!d.debut || d.fin) { el.textContent = ""; return; }
  const dep = Math.max((d.etapeEnCours || {}).depuis || d.debut, d.dernierPassage || 0, finRepos || 0);
  el.textContent = mmss(Math.max(0, Math.floor((Date.now() - dep) / 1000)));
}, 1000);
function changer(i) { vue = "seance"; index = i; ouverts = new Set(); formVoie = null; afficher(); }
const SOUS_ECRANS = ["salles", "salle", "biblio", "reglages", "sauvegarde"];
function retour() {
  if (vue === "salle") { if (SA.voie) { SA.voie = null; return afficher(); } if (SA.secteur) { SA.secteur = null; return afficher(); } return ouvrirSalles(); }
  if (vue === "biblio") {
    if (B.ecran === "fiche") { B.ecran = "liste"; delete B.routine; return afficher(); }
    if (B.ecran === "liste" && estDiscipline(B.filtre) && sousCategories(B.filtre).length > 1) { B = { ecran: "souscats", filtre: B.filtre, q: "" }; return afficher(); }
    if (B.ecran !== "tuiles") { B = { ecran: "tuiles", q: "" }; return afficher(); }
  }
  return ouvrirPlus();
}
const precedent = () => SOUS_ECRANS.includes(vue) ? retour() : vue === "semaine" ? ouvrirSemaine(semaineVue - 1) : vue === "repos" ? LISTE.length && changer(Math.max(0, indexAujourdhui() - 1))
  : vue === "seance" && LISTE.length && changer(Math.max(0, index - 1));
const suivant = () => vue === "semaine" ? ouvrirSemaine(semaineVue + 1) : vue === "repos" ? LISTE.length && changer(indexAujourdhui())
  : vue === "seance" && LISTE.length && changer(Math.min(LISTE.length - 1, index + 1));
$("prec").onclick = precedent;
$("suiv").onclick = suivant;
$("btn-menu").onclick = () => courant() && ouvrirModal({ type: "menu" });
// Onglets du bas
document.querySelectorAll("#onglets button").forEach(b => b.onclick = () => {
  const o = b.dataset.onglet;
  if (o === "seance") { const k = seanceAujourdhui(); if (k >= 0) { index = k; vue = "seance"; } else vue = "repos"; afficher(); }
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

if (LISTE.length && seanceAujourdhui() < 0 && vue === "seance") vue = "repos";   // jour sans séance : écran de repos
afficher();
if (T) { if (T.fini) { T = null; sauverT(); } else boucle(); }   // reprend un minuteur en cours
if (seanceEnCours(dCourant())) garderEcran();
if (!verifierProgramme()) verifierSeanceOuverte();                // nouveau programme, sinon séance d'un jour précédent restée ouverte
