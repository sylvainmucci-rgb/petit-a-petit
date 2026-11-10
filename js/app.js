/* Petit à Petit — logique de l'application (données locales uniquement) */
(function () {
  "use strict";

  const KEY = "petitapetit.v1";
  const GOALS = [
    { id: "eau", title: "Boire de l'eau", sub: "Plusieurs verres dans la journée, à votre soif." },
    { id: "marche", title: "Marcher un peu", sub: "Même 5 à 10 minutes, chez vous ou dehors." },
    { id: "exercice", title: "Un mouvement doux", sub: "Une mobilité, une séance, ou simplement s'étirer." },
    { id: "repas", title: "Un vrai repas posé", sub: "S'asseoir, manger, sans se juger." }
  ];

  let state = load();
  let onbStep = 0;
  let currentTab = "accueil";
  let exoFilter = "tous";
  let mangerPanel = "guides";
  let deferredInstall = null;
  let toastTimer = null;
  let tick = null;
  let breathTimer = null;
  let breath = { running: false, phase: "idle", cycle: 0, total: 18 };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function defaultState() {
    return {
      profile: null,
      weights: [],
      daily: {},
      moodJournal: [],
      foodMood: {},
      exerciseLog: [],
      badges: [],
      celebrated: [],
      hideBmi: false,
      onboardingComplete: false,
      breathDone: false
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {
      return defaultState();
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      toast("Impossible d'enregistrer (stockage plein ou privé).");
    }
  }

  function todayISO() {
    const d = new Date();
    return isoFromDate(d);
  }

  function isoFromDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function prevDay(iso) {
    const d = parseISO(iso);
    d.setDate(d.getDate() - 1);
    return isoFromDate(d);
  }

  function parseISO(iso) {
    const p = (iso || "").split("-").map(Number);
    return new Date(p[0], (p[1] || 1) - 1, p[2] || 1);
  }

  function formatDateFR(iso, opts) {
    try {
      return parseISO(iso).toLocaleDateString("fr-FR", opts || { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return iso;
    }
  }

  function formatKg(n) {
    if (n == null || isNaN(n)) return "—";
    return Number(n).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  }

  function parseNumber(str) {
    if (typeof str === "number") return str;
    const n = parseFloat(String(str).trim().replace(",", "."));
    return n;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 6) return "Bonsoir";
    if (h < 12) return "Bonjour";
    if (h < 18) return "Bon après-midi";
    return "Bonsoir";
  }

  function messageDuJour() {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = todayISO();
    const d = parseISO(diff);
    const one = 24 * 60 * 60 * 1000;
    const day = Math.floor((d - start) / one);
    const list = PAP.MESSAGES;
    return list[((day % list.length) + list.length) % list.length];
  }

  function isActiveDay(iso) {
    const d = state.daily[iso];
    if (d && (d.eau || d.marche || d.exercice || d.repas)) return true;
    if ((state.weights || []).some(function (w) { return w.date === iso; })) return true;
    if ((state.exerciseLog || []).some(function (e) { return e.date === iso; })) return true;
    if ((state.moodJournal || []).some(function (m) { return m.date === iso; })) return true;
    if (state.foodMood && state.foodMood[iso]) return true;
    return false;
  }

  function computeStreak() {
    var d = todayISO();
    if (!isActiveDay(d)) d = prevDay(d);
    var n = 0;
    while (isActiveDay(d) && n < 5000) {
      n++;
      d = prevDay(d);
    }
    return n;
  }

  function countActiveDays() {
    var set = {};
    Object.keys(state.daily || {}).forEach(function (k) {
      if (isActiveDay(k)) set[k] = true;
    });
    (state.weights || []).forEach(function (w) { set[w.date] = true; });
    (state.exerciseLog || []).forEach(function (e) { set[e.date] = true; });
    (state.moodJournal || []).forEach(function (m) { set[m.date] = true; });
    Object.keys(state.foodMood || {}).forEach(function (k) { set[k] = true; });
    return Object.keys(set).length;
  }

  function lastWeight() {
    var list = (state.weights || []).slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
    return list.length ? list[list.length - 1] : null;
  }

  function startWeight() {
    if (state.profile && state.profile.poidsInitial) return Number(state.profile.poidsInitial);
    var first = (state.weights || []).slice().sort(function (a, b) { return a.date.localeCompare(b.date); })[0];
    return first ? Number(first.poids) : null;
  }

  function lostKg() {
    var s = startWeight();
    var last = lastWeight();
    if (s == null || !last) return 0;
    return Math.round((s - Number(last.poids)) * 10) / 10;
  }

  function unlockBadge(id, silent) {
    if (state.badges.indexOf(id) !== -1) return false;
    state.badges.push(id);
    save();
    if (!silent) {
      var b = PAP.BADGES.find(function (x) { return x.id === id; });
      toast((b ? b.ico + " " + b.nom : "Nouveau trophée") + " — bravo, c'est mérité.");
    }
    return true;
  }

  function checkBadges() {
    if (state.onboardingComplete) unlockBadge("bienvenue", true);
    var daysWithGoal = 0, daysWater = 0;
    Object.keys(state.daily || {}).forEach(function (k) {
      var d = state.daily[k];
      if (!d) return;
      if (d.eau || d.marche || d.exercice || d.repas) daysWithGoal++;
      if (d.eau) daysWater++;
    });
    if (daysWithGoal >= 1) unlockBadge("premier-objectif", true);
    var streak = computeStreak();
    if (streak >= 3) unlockBadge("elan-3", true);
    if (streak >= 7) unlockBadge("elan-7", true);
    if (streak >= 14) unlockBadge("elan-14", true);
    if (streak >= 30) unlockBadge("elan-30", true);
    if ((state.weights || []).length >= 1) unlockBadge("premier-poids", true);
    var lost = lostKg();
    if (lost >= 1) unlockBadge("kilo-1", true);
    if (lost >= 3) unlockBadge("kilo-3", true);
    if (lost >= 5) unlockBadge("kilo-5", true);
    var s = startWeight();
    if (s && lost >= s * 0.05) unlockBadge("palier-5", true);
    if (s && lost >= s * 0.10) unlockBadge("palier-10", true);
    var seances = (state.exerciseLog || []).length;
    if (seances >= 1) unlockBadge("premiere-seance", true);
    if (seances >= 5) unlockBadge("seances-5", true);
    if (seances >= 10) unlockBadge("seances-10", true);
    if (daysWater >= 7) unlockBadge("eau-7", true);
    if ((state.moodJournal || []).length >= 3) unlockBadge("journal-3", true);
    if (state.breathDone) unlockBadge("souffle", true);
    if (Object.keys(state.foodMood || {}).length >= 1) unlockBadge("cuisine", true);
    if (countActiveDays() >= 10) unlockBadge("constance", true);
  }

  function celebrateNewMilestones(prevLost) {
    var lost = lostKg();
    var s = startWeight();
    var messages = [];
    if (lost >= 1) {
      var prevFloor = Math.max(0, Math.floor(prevLost + 0.0001));
      var nowFloor = Math.floor(lost + 0.0001);
      for (var k = prevFloor + 1; k <= nowFloor; k++) {
        var key = "kg-" + k;
        if (state.celebrated.indexOf(key) === -1) {
          state.celebrated.push(key);
          messages.push({
            title: k === 1 ? "Un kilo en chemin" : k + " kilos en chemin",
            text: "Vous avez parcouru " + k + " kg depuis le départ. Ce n'est pas un chiffre pour vous juger : c'est la trace d'une constance. Bravo."
          });
        }
      }
    }
    if (s && lost >= s * 0.05 && state.celebrated.indexOf("palier-5") === -1) {
      state.celebrated.push("palier-5");
      messages.push({
        title: "Palier des 5 %",
        text: "Vous avez atteint environ 5 % de votre poids de départ. C'est un premier cap souvent associé à de vrais bénéfices pour la santé. Quelle belle constance."
      });
    }
    if (s && lost >= s * 0.10 && state.celebrated.indexOf("palier-10") === -1) {
      state.celebrated.push("palier-10");
      messages.push({
        title: "Palier des 10 %",
        text: "Environ 10 % depuis le départ. C'est un cap important, et surtout le fruit de beaucoup de petits pas. Prenez un instant pour le reconnaître."
      });
    }
    save();
    checkBadges();
    if (messages.length) showCelebrate(messages[messages.length - 1]);
  }

  /* ---------- UI helpers ---------- */
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 3200);
  }

  function openSheet(html) {
    var sheet = $("#sheet");
    sheet.innerHTML = '<div class="sheet-handle"></div>' + html;
    $("#overlay").classList.add("is-on");
    var close = sheet.querySelector("[data-action='close-sheet']");
    if (close) close.focus();
    else {
      var h = $("#sheet-title");
      if (h) h.setAttribute("tabindex", "-1"), h.focus();
    }
  }

  function closeSheet() {
    stopClock();
    stopBreath();
    $("#overlay").classList.remove("is-on");
    $("#sheet").innerHTML = "";
  }

  function showCelebrate(msg) {
    openSheet(
      '<div class="celebrate">' +
        '<p class="big" aria-hidden="true">🎉</p>' +
        '<h2 id="sheet-title">' + escapeHtml(msg.title) + '</h2>' +
        '<p class="lead">' + escapeHtml(msg.text) + '</p>' +
        '<button class="btn btn-primary btn-block mt-2" type="button" data-action="close-sheet">Merci, je continue</button>' +
      '</div>'
    );
  }

  /* ---------- Onboarding ---------- */
  function showOnboarding() {
    $("#app").classList.remove("is-on");
    $("#onboarding").classList.add("is-on");
    renderOnb();
  }

  function showApp(tab) {
    $("#onboarding").classList.remove("is-on");
    $("#app").classList.add("is-on");
    checkBadges();
    goTab(tab || currentTab || "accueil", true);
  }

  function renderOnb() {
    $$(".onb-step").forEach(function (el) {
      el.classList.toggle("is-on", Number(el.getAttribute("data-step")) === onbStep);
    });
    var dots = $("#onb-dots");
    dots.innerHTML = "";
    for (var i = 0; i < 6; i++) {
      var s = document.createElement("span");
      if (i === onbStep) s.className = "is-on";
      dots.appendChild(s);
    }
    if (onbStep === 4) renderGoalSuggestions();
    if (onbStep === 5) renderRecap();
  }

  function renderGoalSuggestions() {
    var poids = parseNumber($("#onb-poids").value);
    var box = $("#goal-suggestions");
    if (!poids || isNaN(poids)) {
      box.innerHTML = "";
      return;
    }
    var g5 = Math.round(poids * 0.95 * 10) / 10;
    var g10 = Math.round(poids * 0.90 * 10) / 10;
    box.innerHTML =
      '<button type="button" class="choice" data-set-goal="' + g5 + '"><strong>Premier cap à −5&nbsp;%</strong> Environ ' + formatKg(g5) + ' kg, soit ' + formatKg(poids - g5) + ' kg de moins. Un objectif souvent recommandé pour commencer.</button>' +
      '<button type="button" class="choice" data-set-goal="' + g10 + '"><strong>Cap à −10&nbsp;%</strong> Environ ' + formatKg(g10) + ' kg, soit ' + formatKg(poids - g10) + ' kg de moins. Ambitieux et encore réaliste pour beaucoup de personnes, avec de la patience.</button>';
  }

  function renderRecap() {
    var prenom = ($("#onb-prenom").value || "").trim();
    var taille = parseNumber($("#onb-taille").value);
    var poids = parseNumber($("#onb-poids").value);
    var obj = parseNumber($("#onb-objectif").value);
    $("#onb-recap").innerHTML =
      "<p><strong>" + escapeHtml(prenom) + "</strong></p>" +
      "<p>Taille : " + taille + " cm<br>Poids de départ : " + formatKg(poids) + " kg<br>Objectif : " + formatKg(obj) + " kg</p>" +
      "<p class='tiny'>Ce n'est pas un contrat. C'est un cap, ajustable.</p>";
  }

  function validateOnb() {
    $$(".error").forEach(function (e) { e.hidden = true; });
    if (onbStep === 0) {
      if (!$("#disclaimer-ok").checked) {
        $("#disc-error").hidden = false;
        return false;
      }
      return true;
    }
    if (onbStep === 1) {
      if (!($("#onb-prenom").value || "").trim()) {
        $("#prenom-error").hidden = false;
        return false;
      }
      return true;
    }
    if (onbStep === 2) {
      var t = parseNumber($("#onb-taille").value);
      if (isNaN(t) || t < 120 || t > 230) {
        $("#taille-error").hidden = false;
        return false;
      }
      return true;
    }
    if (onbStep === 3) {
      var p = parseNumber($("#onb-poids").value);
      if (isNaN(p) || p < 30 || p > 300) {
        $("#poids-error").hidden = false;
        return false;
      }
      return true;
    }
    if (onbStep === 4) {
      var obj = parseNumber($("#onb-objectif").value);
      var cur = parseNumber($("#onb-poids").value);
      if (isNaN(obj) || obj < 30 || obj > 300) {
        $("#objectif-error").hidden = false;
        return false;
      }
      if (obj >= cur) {
        $("#objectif-error").hidden = false;
        $("#objectif-error").textContent = "Pour un objectif de perte de poids, choisissez un chiffre un peu sous votre poids actuel. (Un objectif de maintien pourra se discuter plus tard avec un médecin.)";
        return false;
      }
      return true;
    }
    return true;
  }

  function finishOnboarding() {
    var prenom = ($("#onb-prenom").value || "").trim();
    var taille = parseNumber($("#onb-taille").value);
    var poids = parseNumber($("#onb-poids").value);
    var obj = parseNumber($("#onb-objectif").value);
    var today = todayISO();
    state.profile = {
      prenom: prenom,
      tailleCm: taille,
      poidsInitial: poids,
      poidsObjectif: obj,
      dateDebut: today
    };
    if (!(state.weights || []).some(function (w) { return w.date === today; })) {
      state.weights.push({ date: today, poids: poids });
    }
    state.onboardingComplete = true;
    save();
    checkBadges();
    showApp("accueil");
    toast("Bienvenue " + prenom + ". On y va, tout doucement.");
  }

  /* ---------- Tabs ---------- */
  function goTab(id, replace) {
    currentTab = id;
    $$(".view").forEach(function (v) { v.classList.toggle("is-on", v.getAttribute("data-view") === id); });
    $$(".tabbar button").forEach(function (b) {
      if (b.getAttribute("data-tab") === id) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    var hash = "#" + id;
    if (location.hash !== hash) {
      if (replace && history.replaceState) history.replaceState(null, "", hash);
      else location.hash = id;
    }
    renderTab(id);
    window.scrollTo(0, 0);
  }

  function renderTab(id) {
    if (id === "accueil") renderAccueil();
    else if (id === "poids") renderPoids();
    else if (id === "bouger") renderBouger();
    else if (id === "manger") renderManger();
    else if (id === "motivation") renderMotivation();
  }

  /* ---------- Accueil ---------- */
  function renderAccueil() {
    var p = state.profile || { prenom: "vous" };
    var today = todayISO();
    var daily = state.daily[today] || {};
    var streak = computeStreak();
    var last = lastWeight();
    var start = startWeight();
    var goal = p.poidsObjectif;
    var streakTxt, streakSub;
    if (streak <= 0) {
      streakTxt = "0";
      streakSub = "Cochez un petit geste aujourd'hui pour allumer l'élan.";
    } else if (streak === 1) {
      streakTxt = "1";
      streakSub = "Jour d'élan. Une belle amorce.";
    } else {
      streakTxt = String(streak);
      streakSub = "jours d'élan d'affilée. Une pause n'effacerait pas le chemin.";
    }
    var progressHtml = "";
    if (last && start && goal && start > goal) {
      var pct = Math.max(0, Math.min(100, ((start - last.poids) / (start - goal)) * 100));
      progressHtml =
        '<div class="card mt-1">' +
          '<h3>Vers votre cap</h3>' +
          '<p class="small muted">Dernier poids noté : <strong>' + formatKg(last.poids) + ' kg</strong> · Objectif : ' + formatKg(goal) + ' kg</p>' +
          '<div class="progress-wrap"><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(pct) + '"><span style="width:' + pct + '%"></span></div></div>' +
          '<p class="tiny mt-1">' + Math.round(pct) + ' % du chemin vers l\'objectif — le poids bouge, c\'est normal.</p>' +
        '</div>';
    }
    var install = "";
    if (deferredInstall || shouldShowIosTip()) {
      install = '<div class="card install-banner mt-1"><h3>Installer l\'appli</h3><p class="small">' +
        (deferredInstall
          ? "Ajoutez Petit à Petit à votre écran d'accueil, pour l'ouvrir comme une appli, même hors ligne."
          : "Sur iPhone : bouton Partager, puis « Sur l'écran d'accueil ».") +
        '</p>' +
        (deferredInstall ? '<button class="btn btn-primary btn-block mt-1" type="button" data-action="install">Installer</button>' : "") +
        "</div>";
    }
    var goalsHtml = GOALS.map(function (g) {
      var on = daily[g.id] ? " is-on" : "";
      return '<button type="button" class="goal' + on + '" data-action="toggle-goal" data-goal="' + g.id + '">' +
        '<span class="goal-check" aria-hidden="true">✓</span>' +
        '<span><span class="goal-title">' + g.title + '</span><span class="goal-sub">' + g.sub + '</span></span>' +
        '<span class="sr-only">' + (daily[g.id] ? "fait" : "à faire") + '</span>' +
      "</button>";
    }).join("");

    $("#view-accueil").innerHTML =
      '<p class="tiny muted" style="margin:0">' + greeting() + '</p>' +
      '<h1 class="hello">Content de vous voir, <span>' + escapeHtml(p.prenom) + '</span>.</h1>' +
      '<div class="card msg-jour mt-1">' +
        '<div class="kicker">Message du jour</div>' +
        '<p>' + escapeHtml(messageDuJour()) + '</p>' +
      "</div>" +
      '<div class="card streak mt-1">' +
        '<div class="streak-num" aria-hidden="true">' + streakTxt + '</div>' +
        '<div><div class="streak-label">Votre élan</div><div class="small muted">' + streakSub + "</div></div>" +
      "</div>" +
      '<h2 class="mt-2">Les petits gestes du jour</h2>' +
      '<p class="small muted">Cochez ce qui est fait, sans chercher le sans-faute.</p>' +
      '<div class="goals">' + goalsHtml + "</div>" +
      progressHtml +
      '<div class="stack mt-2">' +
        '<button class="btn btn-soft btn-block" type="button" data-tab-jump="poids">Noter mon poids</button>' +
        '<button class="btn btn-soft btn-block" type="button" data-tab-jump="bouger">Bouger un peu</button>' +
      "</div>" +
      install +
      '<p class="tiny mt-2">Cette appli ne remplace pas un avis médical.</p>';
  }

  function toggleGoal(id) {
    var today = todayISO();
    if (!state.daily[today]) state.daily[today] = {};
    state.daily[today][id] = !state.daily[today][id];
    save();
    checkBadges();
    renderAccueil();
  }

  function shouldShowIosTip() {
    var ua = navigator.userAgent || "";
    var ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
    return ios && !standalone;
  }

  /* ---------- Poids ---------- */
  function renderPoids() {
    var p = state.profile || {};
    var last = lastWeight();
    var start = startWeight();
    var goal = p.poidsObjectif;
    var list = (state.weights || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    var kpis =
      '<div class="kpi mt-1">' +
        '<div><strong>' + (start != null ? formatKg(start) : "—") + '</strong><span>Départ</span></div>' +
        '<div><strong>' + (last ? formatKg(last.poids) : "—") + '</strong><span>Dernier</span></div>' +
        '<div><strong>' + (goal != null ? formatKg(goal) : "—") + '</strong><span>Objectif</span></div>' +
      "</div>";
    var lost = lostKg();
    var lostTxt = "";
    if (last && start != null) {
      if (lost > 0.05) lostTxt = '<p class="mt-1">Depuis le départ : <strong>' + formatKg(lost) + " kg</strong> en moins. Chaque palier compte, même minuscule.</p>";
      else if (lost < -0.05) lostTxt = "<p class='mt-1'>Le poids a un peu augmenté depuis le départ. C'est fréquent (eau, hormones, repas, sel). Une période ne définit pas votre chemin.</p>";
      else lostTxt = "<p class='mt-1'>Le poids est proche du départ. Les courbes en dents de scie sont normales. La constance, elle, se construit ailleurs aussi.</p>";
    }
    var pctBar = "";
    if (last && start && goal && start > goal) {
      var pct = Math.max(0, Math.min(100, ((start - last.poids) / (start - goal)) * 100));
      pctBar = '<div class="progress-wrap"><div class="progress" role="progressbar" aria-valuenow="' + Math.round(pct) + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct + '%"></span></div></div><p class="tiny">' + Math.round(pct) + " % vers l'objectif</p>";
    }
    var bmiHtml = "";
    if (!state.hideBmi && last && p.tailleCm) {
      var imc = last.poids / Math.pow(p.tailleCm / 100, 2);
      bmiHtml =
        '<div class="card mt-1">' +
          "<h3>IMC, en toute prudence</h3>" +
          "<p>Votre IMC calculé aujourd'hui : <strong>" + imc.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + "</strong>.</p>" +
          "<p class='small muted'>L'IMC est un calcul très imparfait. Il ne dit rien de votre valeur, de votre santé globale, ni de vos efforts. Les professionnels l'utilisent comme un repère parmi d'autres, à discuter avec un médecin — pas comme une étiquette.</p>" +
          '<button class="btn btn-ghost btn-sm mt-1" type="button" data-action="hide-bmi">Masquer l\'IMC</button>' +
        "</div>";
    } else if (state.hideBmi) {
      bmiHtml = '<p class="tiny mt-1"><button class="btn btn-ghost btn-sm" type="button" data-action="show-bmi">Réafficher l\'IMC</button></p>';
    }
    var hist = list.length
      ? '<ul class="history">' + list.slice(0, 12).map(function (w) {
          return "<li><span>" + formatDateFR(w.date) + (w.tourTaille ? '<br><span class="tiny">Tour de taille : ' + formatKg(w.tourTaille) + " cm</span>" : "") +
            "</span><span><strong>" + formatKg(w.poids) + ' kg</strong> <button class="btn btn-ghost btn-sm" type="button" data-action="del-weight" data-date="' + w.date + '" aria-label="Supprimer la mesure du ' + formatDateFR(w.date) + '">Suppr.</button></span></li>';
        }).join("") + "</ul>"
      : "<p class='muted'>Aucune mesure pour l'instant.</p>";

    $("#view-poids").innerHTML =
      "<h1>Mon poids</h1>" +
      "<p class='lead'>Notez quand vous voulez. Une à deux fois par semaine suffit souvent, le matin, dans des conditions voisines.</p>" +
      '<div class="card mt-1">' +
        "<h3>Progression</h3>" + kpis + lostTxt + pctBar +
        '<div class="chart-box mt-1" id="chart-box"></div>' +
      "</div>" +
      '<div class="card mt-1">' +
        "<h3>Nouvelle mesure</h3>" +
        '<form id="form-poids" class="stack">' +
          '<div class="field"><label for="poids-date">Date</label><input id="poids-date" type="date" required value="' + todayISO() + '"></div>' +
          '<div class="field"><label for="poids-val">Poids (kg)</label><input id="poids-val" type="text" inputmode="decimal" required placeholder="ex. 109,4"></div>' +
          '<div class="field"><label for="poids-tt">Tour de taille (cm), optionnel</label><input id="poids-tt" type="text" inputmode="decimal" placeholder="si vous souhaitez le suivre"></div>' +
          '<button class="btn btn-primary btn-block" type="submit">Enregistrer</button>' +
        "</form>" +
      "</div>" +
      bmiHtml +
      '<div class="card mt-1"><h3>Historique</h3>' + hist + "</div>";

    drawChart($("#chart-box"), (state.weights || []).slice(), goal);
  }

  function drawChart(el, entries, goal) {
    if (!el) return;
    var sorted = entries.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
    if (!sorted.length) {
      el.innerHTML = "<p class='tiny'>La courbe apparaîtra avec vos mesures.</p>";
      return;
    }
    if (sorted.length === 1) {
      el.innerHTML = "<p class='tiny'>Première mesure notée (" + formatKg(sorted[0].poids) + " kg). Ajoutez-en d'autres pour voir la courbe.</p>";
      return;
    }
    var w = 320, h = 200, padL = 42, padR = 10, padT = 16, padB = 30;
    var vals = sorted.map(function (e) { return Number(e.poids); });
    if (goal) vals.push(Number(goal));
    var min = Math.min.apply(null, vals);
    var max = Math.max.apply(null, vals);
    var margin = Math.max(0.8, (max - min) * 0.18) || 2;
    min -= margin; max += margin;
    var span = max - min || 1;
    function x(i) { return padL + (i / (sorted.length - 1)) * (w - padL - padR); }
    function y(v) { return padT + (1 - (v - min) / span) * (h - padT - padB); }
    var pts = sorted.map(function (e, i) { return x(i).toFixed(1) + "," + y(e.poids).toFixed(1); }).join(" ");
    var grid = "";
    for (var g = 0; g < 4; g++) {
      var val = min + (span * g) / 3;
      var gy = y(min + (span * g) / 3);
      /* labels from top to bottom: max ... min */
    }
    var ticks = [];
    for (var i = 0; i < 4; i++) ticks.push(max - (span * i) / 3);
    ticks.forEach(function (val) {
      var gy = y(val);
      grid += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="#E7E0D8" stroke-width="1"/>';
      grid += '<text x="' + (padL - 6) + '" y="' + (gy + 4) + '" font-size="10" text-anchor="end" fill="#57534E">' + formatKg(Math.round(val * 10) / 10) + "</text>";
    });
    var goalLine = "";
    if (goal && Number(goal) >= min && Number(goal) <= max) {
      var gy = y(Number(goal));
      goalLine = '<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="#C2410C" stroke-dasharray="5 5" stroke-width="1.5"/>' +
        '<text x="' + (w - padR) + '" y="' + (gy - 4) + '" font-size="10" text-anchor="end" fill="#C2410C">objectif</text>';
    }
    var first = sorted[0], last = sorted[sorted.length - 1];
    var mid = sorted[Math.floor(sorted.length / 2)];
    var labels = '<text x="' + x(0) + '" y="' + (h - 8) + '" font-size="10" text-anchor="start" fill="#57534E">' + escapeHtml(formatDateFR(first.date, { day: "numeric", month: "short" })) + "</text>";
    if (sorted.length > 2) labels += '<text x="' + x(Math.floor(sorted.length / 2)) + '" y="' + (h - 8) + '" font-size="10" text-anchor="middle" fill="#57534E">' + escapeHtml(formatDateFR(mid.date, { day: "numeric", month: "short" })) + "</text>";
    labels += '<text x="' + x(sorted.length - 1) + '" y="' + (h - 8) + '" font-size="10" text-anchor="end" fill="#57534E">' + escapeHtml(formatDateFR(last.date, { day: "numeric", month: "short" })) + "</text>";
    var dots = sorted.map(function (e, i) {
      return '<circle cx="' + x(i) + '" cy="' + y(e.poids) + '" r="4" fill="#0B5F4B"><title>' + formatDateFR(e.date) + " : " + formatKg(e.poids) + " kg</title></circle>";
    }).join("");
    el.innerHTML =
      '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="Courbe de poids">' +
        "<title>Courbe de poids</title>" +
        grid + goalLine +
        '<polyline fill="none" stroke="#0B5F4B" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="' + pts + '"/>' +
        dots + labels +
      "</svg>";
  }

  function saveWeight(date, poids, tourTaille) {
    var prevLost = lostKg();
    state.weights = (state.weights || []).filter(function (w) { return w.date !== date; });
    var entry = { date: date, poids: poids };
    if (tourTaille) entry.tourTaille = tourTaille;
    state.weights.push(entry);
    state.weights.sort(function (a, b) { return a.date.localeCompare(b.date); });
    save();
    celebrateNewMilestones(prevLost);
    checkBadges();
    renderPoids();
    toast("Mesure du " + formatDateFR(date) + " enregistrée.");
  }

  /* ---------- Bouger ---------- */
  function renderBouger() {
    var chips = PAP.CATEGORIES_EXO.map(function (c) {
      return '<button type="button" class="chip' + (exoFilter === c.id ? " is-on" : "") + '" data-action="exo-filter" data-cat="' + c.id + '">' + escapeHtml(c.label) + "</button>";
    }).join("");
    var list = PAP.EXERCICES.filter(function (e) { return exoFilter === "tous" || e.cat === exoFilter; });
    var cards = list.map(function (e) {
      return '<button type="button" class="ex-card" data-action="open-exo" data-id="' + e.id + '">' +
        '<span class="tag ' + (e.niveau === "moyen" ? "tag-moyen" : "tag-doux") + '">' + escapeHtml(e.niveau) + "</span>" +
        '<span class="meta">' + e.duree + " min</span>" +
        "<h3 class='mt-1'>" + escapeHtml(e.nom) + "</h3>" +
        "<p class='small muted mt-0'>" + escapeHtml(e.pour) + "</p>" +
      "</button>";
    }).join("");
    var progs = PAP.PROGRAMMES.map(function (p) {
      return '<button type="button" class="prog-card" data-action="open-prog" data-id="' + p.id + '">' +
        '<span class="meta">' + escapeHtml(p.duree) + "</span> " +
        '<span class="meta">' + escapeHtml(p.rythme) + "</span>" +
        "<h3 class='mt-1'>" + escapeHtml(p.nom) + "</h3>" +
        "<p class='small muted'>" + escapeHtml(p.sousTitre) + "</p>" +
        "<p class='small'>" + escapeHtml(p.description) + "</p>" +
      "</button>";
    }).join("");
    $("#view-bouger").innerHTML =
      "<h1>Bouger</h1>" +
      "<p class='lead'>Des mouvements doux, pensés pour débuter ou reprendre, y compris si le quotidien est déjà fatigant. La douleur n'est jamais un objectif.</p>" +
      '<div class="card card-soft mb-2"><p class="small mt-0 mb-0"><strong>Sécurité.</strong> En cas de douleur dans la poitrine, de malaise, de vertige important ou de douleur vive, arrêtez-vous et consultez. Parlez à un médecin avant de commencer, surtout en cas de maladie cardiaque, articulaire, respiratoire, ou après une opération.</p></div>' +
      "<h2>Programmes prêts à l'emploi</h2>" +
      progs +
      "<h2 class='mt-2'>Les exercices</h2>" +
      '<div class="chips" role="tablist" aria-label="Catégories">' + chips + "</div>" +
      cards;
  }

  function exoById(id) {
    return PAP.EXERCICES.find(function (e) { return e.id === id; });
  }

  function openExo(id, opts) {
    var e = exoById(id);
    if (!e) return;
    opts = opts || {};
    var steps = "<ol class='steps'>" + e.etapes.map(function (s) { return "<li>" + escapeHtml(s) + "</li>"; }).join("") + "</ol>";
    var nav = "";
    if (opts.session) {
      nav = '<div class="stack mt-1"><button class="btn btn-primary btn-block" type="button" data-action="session-done" data-id="' + e.id + '">C\'est terminé, passer à la suite</button>' +
        (opts.hasPrev ? '<button class="btn btn-ghost btn-block" type="button" data-action="session-prev">Exercice précédent</button>' : "") +
        "</div>";
    } else {
      nav = '<button class="btn btn-primary btn-block mt-1" type="button" data-action="log-exo" data-id="' + e.id + '">J\'ai terminé cet exercice</button>';
    }
    openSheet(
      '<div class="sheet-head"><h2 id="sheet-title">' + escapeHtml(e.nom) + '</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="Fermer">✕</button></div>' +
      (opts.label ? "<p class='tiny'>" + escapeHtml(opts.label) + "</p>" : "") +
      '<span class="tag ' + (e.niveau === "moyen" ? "tag-moyen" : "tag-doux") + '">' + escapeHtml(e.niveau) + "</span> " +
      '<span class="meta">' + e.duree + " min</span>" +
      "<p class='mt-1'>" + escapeHtml(e.pour) + "</p>" +
      "<p class='small muted'>Matériel : " + escapeHtml(e.materiel) + "</p>" +
      "<h3>Les étapes</h3>" + steps +
      '<div class="safe mt-1"><strong>En sécurité.</strong> ' + escapeHtml(e.securite) + "</div>" +
      '<div class="card mt-1"><h3>Minuteur</h3>' +
        '<div class="timer"><div class="timer-time" id="timer-time">' + fmtTime(e.duree * 60) + "</div>" +
        '<div class="timer-actions">' +
          '<button class="btn btn-primary" type="button" data-action="timer-start" data-sec="' + (e.duree * 60) + '">Démarrer</button>' +
          '<button class="btn btn-ghost" type="button" data-action="timer-pause">Pause</button>' +
          '<button class="btn btn-ghost" type="button" data-action="timer-reset" data-sec="' + (e.duree * 60) + '">Reset</button>' +
        "</div></div></div>" +
      nav
    );
    resetClock(e.duree * 60);
  }

  function openProg(id) {
    var p = PAP.PROGRAMMES.find(function (x) { return x.id === id; });
    if (!p) return;
    var body = p.semaines.map(function (w, wi) {
      var se = w.seances.map(function (s, si) {
        return '<button type="button" class="list-btn" data-action="start-session" data-prog="' + p.id + '" data-w="' + wi + '" data-s="' + si + '">' +
          "<strong>" + escapeHtml(s.nom) + "</strong><br><span class='tiny'>Environ " + s.duree + " min · " + s.exercices.length + " exercices</span></button>";
      }).join("");
      return "<h3 class='mt-1'>" + escapeHtml(w.titre) + "</h3>" + se;
    }).join("");
    openSheet(
      '<div class="sheet-head"><h2 id="sheet-title">' + escapeHtml(p.nom) + '</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="Fermer">✕</button></div>' +
      "<p class='muted'>" + escapeHtml(p.sousTitre) + " · " + escapeHtml(p.rythme) + "</p>" +
      "<p>" + escapeHtml(p.description) + "</p>" +
      body
    );
  }

  var session = null;

  function startSession(progId, wi, si) {
    var p = PAP.PROGRAMMES.find(function (x) { return x.id === progId; });
    if (!p) return;
    var se = p.semaines[wi].seances[si];
    session = { progId: progId, wi: wi, si: si, index: 0, exercices: se.exercices.slice(), nom: se.nom };
    openSessionExo();
  }

  function openSessionExo() {
    if (!session) return;
    var id = session.exercices[session.index];
    var n = session.index + 1;
    var total = session.exercices.length;
    openExo(id, {
      session: true,
      hasPrev: session.index > 0,
      label: session.nom + " · exercice " + n + " sur " + total
    });
  }

  function sessionNext() {
    if (!session) return;
    if (session.index < session.exercices.length - 1) {
      session.index++;
      openSessionExo();
    } else {
      logSessionDone();
    }
  }

  function sessionPrev() {
    if (!session || session.index <= 0) return;
    session.index--;
    openSessionExo();
  }

  function logExo(id) {
    state.exerciseLog.push({ date: todayISO(), exerciseId: id, at: Date.now() });
    if (!state.daily[todayISO()]) state.daily[todayISO()] = {};
    state.daily[todayISO()].exercice = true;
    save();
    checkBadges();
    closeSheet();
    toast("Séance notée. Merci d'avoir pris ce temps pour vous.");
    if (currentTab === "accueil") renderAccueil();
  }

  function logSessionDone() {
    var p = PAP.PROGRAMMES.find(function (x) { return x.id === session.progId; });
    state.exerciseLog.push({
      date: todayISO(),
      programId: session.progId,
      session: session.nom,
      at: Date.now()
    });
    if (!state.daily[todayISO()]) state.daily[todayISO()] = {};
    state.daily[todayISO()].exercice = true;
    save();
    checkBadges();
    session = null;
    openSheet(
      '<div class="celebrate"><p class="big">🌿</p><h2 id="sheet-title">Séance terminée</h2>' +
      "<p>Vous avez mené " + escapeHtml(p ? p.nom : "votre séance") + " jusqu'au bout, à votre rythme. C'est une vraie victoire du jour.</p>" +
      '<button class="btn btn-primary btn-block mt-1" type="button" data-action="close-sheet">Retour</button></div>'
    );
    if (currentTab === "accueil") renderAccueil();
    if (currentTab === "motivation") renderMotivation();
  }

  /* Timer */
  var clock = { remain: 0, running: false };

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function renderClock() {
    var el = $("#timer-time");
    if (el) el.textContent = fmtTime(clock.remain);
  }

  function resetClock(sec) {
    stopClock();
    clock.remain = sec;
    clock.running = false;
    renderClock();
  }

  function startClock(sec) {
    if (clock.remain <= 0 || !clock.remain) clock.remain = sec;
    clock.running = true;
    renderClock();
    clearInterval(tick);
    tick = setInterval(function () {
      if (!clock.running) return;
      clock.remain -= 1;
      renderClock();
      if (clock.remain <= 0) {
        clock.remain = 0;
        stopClock();
        beep();
        toast("Minuteur terminé. Prenez le temps de souffler.");
      }
    }, 1000);
  }

  function stopClock() {
    clock.running = false;
    clearInterval(tick);
    tick = null;
  }

  function beep() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 660;
      g.gain.value = 0.07;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      o.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  /* ---------- Manger ---------- */
  function renderManger() {
    var tabs =
      '<div class="chips mb-1">' +
        '<button type="button" class="chip' + (mangerPanel === "guides" ? " is-on" : "") + '" data-action="manger-panel" data-panel="guides">Repères</button>' +
        '<button type="button" class="chip' + (mangerPanel === "recettes" ? " is-on" : "") + '" data-action="manger-panel" data-panel="recettes">Idées de repas</button>' +
        '<button type="button" class="chip' + (mangerPanel === "humeur" ? " is-on" : "") + '" data-action="manger-panel" data-panel="humeur">Bilan du jour</button>' +
      "</div>";
    var body = "";
    if (mangerPanel === "guides") {
      body = PAP.GUIDES_ASSIETTE.map(function (g, i) {
        return '<button type="button" class="accordion" data-action="toggle-acc" data-i="' + i + '"><h3>' + escapeHtml(g.titre) + "</h3><div class='acc-body'><p>" + escapeHtml(g.texte) + "</p></div></button>";
      }).join("");
    } else if (mangerPanel === "recettes") {
      body = "<p class='small muted'>Des idées simples, peu chères, sans compteur de calories et sans interdits.</p>" +
        PAP.RECETTES.map(function (r) {
          return '<button type="button" class="rec-card" data-action="open-recette" data-id="' + r.id + '">' +
            '<span class="meta">' + escapeHtml(r.temps) + "</span> " +
            '<span class="meta">' + escapeHtml(r.prix) + "</span> " +
            '<span class="meta">' + escapeHtml(r.pour) + "</span>" +
            "<h3 class='mt-1'>" + escapeHtml(r.nom) + "</h3>" +
            "<p class='small muted'>" + escapeHtml(r.intro) + "</p></button>";
        }).join("");
    } else {
      var today = todayISO();
      var cur = state.foodMood[today];
      body = '<div class="card"><h3>Comment s\'est passé le rapport à l\'alimentation aujourd\'hui&nbsp;?</h3>' +
        "<p class='small muted'>Optionnel, et sans note. Il n'y a pas de mauvaise réponse.</p>" +
        '<div class="moods">' + PAP.FOOD_MOODS.map(function (m) {
          return '<button type="button" class="mood' + (cur === m.id ? " is-on" : "") + '" data-action="food-mood" data-id="' + m.id + '">' + escapeHtml(m.label) + "</button>";
        }).join("") + "</div></div>" +
        (cur ? "<p class='tiny mt-1'>Merci d'avoir pris ce moment d'attention. Cela compte autant qu'un « bon » jour.</p>" : "");
    }
    $("#view-manger").innerHTML =
      "<h1>Manger</h1>" +
      "<p class='lead'>Manger suffisamment, avec plaisir, le plus souvent possible à l'écoute de la faim. Pas de régime extrême ici.</p>" +
      tabs + body;
  }

  function openRecette(id) {
    var r = PAP.RECETTES.find(function (x) { return x.id === id; });
    if (!r) return;
    openSheet(
      '<div class="sheet-head"><h2 id="sheet-title">' + escapeHtml(r.nom) + '</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="Fermer">✕</button></div>' +
      '<span class="meta">' + escapeHtml(r.temps) + "</span> <span class='meta'>" + escapeHtml(r.prix) + "</span> <span class='meta'>" + escapeHtml(r.pour) + "</span>" +
      "<p>" + escapeHtml(r.intro) + "</p>" +
      "<h3>Ingrédients</h3><ul class='steps'>" + r.ingredients.map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("") + "</ul>" +
      "<h3>Préparation</h3><ol class='steps'>" + r.etapes.map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("") + "</ol>"
    );
  }

  /* ---------- Motivation ---------- */
  function renderMotivation() {
    var badges = PAP.BADGES.map(function (b) {
      var on = state.badges.indexOf(b.id) !== -1;
      return '<div class="badge' + (on ? "" : " is-off") + '" title="' + escapeHtml(b.hint) + '">' +
        '<div class="ico">' + b.ico + "</div>" +
        '<div class="name">' + escapeHtml(b.nom) + "</div>" +
        '<div class="hint">' + (on ? "Obtenu" : escapeHtml(b.hint)) + "</div></div>";
    }).join("");
    var today = todayISO();
    var todayMood = (state.moodJournal || []).filter(function (m) { return m.date === today; }).pop();
    var journal = (state.moodJournal || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date) || (b.at || 0) - (a.at || 0); }).slice(0, 8);
    var jhtml = journal.length
      ? '<ul class="history">' + journal.map(function (m) {
          var h = PAP.HUMEURS.find(function (x) { return x.id === m.mood; });
          return "<li><span>" + formatDateFR(m.date) + (m.note ? "<br><span class='tiny'>" + escapeHtml(m.note) + "</span>" : "") + "</span><strong>" + (h ? h.emoji + " " + h.label : "") + "</strong></li>";
        }).join("") + "</ul>"
      : "<p class='tiny'>Aucune note pour l'instant. Un mot, même court, suffit.</p>";
    var conseils = PAP.CONSEILS_JOUR_DIFFICILE.map(function (c, i) {
      return '<button type="button" class="accordion" data-action="toggle-acc" data-i="c' + i + '"><h3>' + escapeHtml(c.titre) + "</h3><div class='acc-body'><p>" + escapeHtml(c.texte) + "</p></div></button>";
    }).join("");
    var res = PAP.RESSOURCES.map(function (r) {
      return "<p><a href='" + r.url + "' target='_blank' rel='noopener noreferrer'>" + escapeHtml(r.nom) + "</a><br><span class='tiny'>" + escapeHtml(r.pourquoi) + "</span></p>";
    }).join("");

    $("#view-motivation").innerHTML =
      "<h1>Motivation</h1>" +
      "<p class='lead'>Des encouragements, pas des reproches. Les trophées sont là pour sourire à vos efforts, pas pour vous classer.</p>" +
      "<h2>Trophées</h2>" +
      '<div class="badges">' + badges + "</div>" +
      '<p class="tiny">' + state.badges.length + " sur " + PAP.BADGES.length + " obtenus.</p>" +
      '<div class="card mt-2"><h2>Journal d\'humeur</h2>' +
        "<p class='small muted'>Comment ça va, aujourd'hui ?</p>" +
        '<div class="moods">' + PAP.HUMEURS.map(function (h) {
          return '<button type="button" class="mood' + (todayMood && todayMood.mood === h.id ? " is-on" : "") + '" data-action="pick-mood" data-id="' + h.id + '">' + h.emoji + " " + escapeHtml(h.label) + "</button>";
        }).join("") + "</div>" +
        '<form id="form-mood" class="stack mt-1">' +
          '<div class="field"><label for="mood-note">Un mot, si vous voulez (optionnel)</label>' +
          '<textarea id="mood-note" maxlength="280" placeholder="Ce que vous voulez retenir de cette journée…">' + (todayMood && todayMood.note ? escapeHtml(todayMood.note) : "") + "</textarea></div>" +
          '<button class="btn btn-primary btn-block" type="submit">Enregistrer</button>' +
        "</form>" +
        "<h3 class='mt-2'>Les derniers jours</h3>" + jhtml +
      "</div>" +
      '<div class="card mt-1"><h2>Respirer : cohérence cardiaque</h2>' +
        "<p class='small'>5 secondes pour inspirer, 5 secondes pour expirer, pendant 3 minutes. Un rythme souvent recommandé en France pour apaiser le système nerveux. Asseyez-vous confortablement.</p>" +
        '<button class="btn btn-primary btn-block" type="button" data-action="open-breath">Commencer l\'exercice</button>' +
      "</div>" +
      "<h2 class='mt-2'>Les jours difficiles</h2>" +
      "<p class='small muted'>Une rechute est normale. Voici quelques rappels à garder sous la main.</p>" +
      conseils +
      '<div class="disclaimer mt-2">' +
        "<strong>Avertissement.</strong> Petit à Petit est un outil de motivation et d'éducation à la santé générale. Ce n'est pas un dispositif médical, ni un avis, un diagnostic ou un traitement. Parlez à un médecin (idéalement votre médecin traitant) avant de modifier votre alimentation ou votre activité, surtout en cas de maladie, de grossesse, de prise de médicaments, ou de troubles alimentaires. En cas d'urgence, appelez le 15." +
      "</div>" +
      '<div class="card mt-1 resources"><h3>Ressources utiles (France)</h3>' + res + "</div>" +
      '<div class="card mt-1"><h3>Vos données</h3>' +
        "<p class='small'>Tout est stocké uniquement dans ce navigateur. Aucun compte, aucun envoi.</p>" +
        '<div class="stack">' +
          '<button class="btn btn-ghost btn-block" type="button" data-action="export">Exporter mes données</button>' +
          '<button class="btn btn-ghost btn-block" type="button" data-action="import">Importer des données</button>' +
          '<button class="btn btn-danger-ghost btn-block" type="button" data-action="reset">Effacer toutes les données</button>' +
        "</div>" +
        '<input id="import-file" type="file" accept="application/json" hidden>' +
      "</div>";
  }

  function saveMood(id, note) {
    var today = todayISO();
    state.moodJournal = (state.moodJournal || []).filter(function (m) { return m.date !== today; });
    state.moodJournal.push({ date: today, mood: id, note: (note || "").trim(), at: Date.now() });
    save();
    checkBadges();
    renderMotivation();
    toast("Humeur du jour enregistrée. Merci d'avoir pris ce temps.");
  }

  function openBreath() {
    breath = { running: false, phase: "idle", cycle: 0, total: 18 };
    openSheet(
      '<div class="sheet-head"><h2 id="sheet-title">Cohérence cardiaque</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="Fermer">✕</button></div>' +
      "<p>Inspirez par le nez pendant 5 secondes, expirez tout doucement pendant 5 secondes. Le cercle vous guide. 3 minutes, soit 18 souffles.</p>" +
      '<div class="breath">' +
        '<div class="breath-circle" id="breath-circle">Prêt</div>' +
        '<div class="breath-label" id="breath-label">Appuyez pour commencer</div>' +
        '<p class="tiny" id="breath-count"></p>' +
        '<button class="btn btn-primary" type="button" data-action="breath-toggle" id="breath-btn">Démarrer</button>' +
      "</div>"
    );
  }

  function stopBreath() {
    breath.running = false;
    clearTimeout(breathTimer);
    breathTimer = null;
  }

  function startBreath() {
    breath.running = true;
    breath.cycle = 0;
    breath.phase = "in";
    updateBreathUI();
    loopBreath();
  }

  function loopBreath() {
    if (!breath.running) return;
    updateBreathUI();
    breathTimer = setTimeout(function () {
      if (!breath.running) return;
      if (breath.phase === "in") {
        breath.phase = "out";
      } else {
        breath.cycle++;
        if (breath.cycle >= breath.total) {
          finishBreath();
          return;
        }
        breath.phase = "in";
      }
      loopBreath();
    }, 5000);
  }

  function updateBreathUI() {
    var c = $("#breath-circle");
    var l = $("#breath-label");
    var n = $("#breath-count");
    var b = $("#breath-btn");
    if (!c) return;
    c.classList.remove("is-in", "is-out");
    if (breath.phase === "in") {
      c.classList.add("is-in");
      c.textContent = "Inspirez";
      if (l) l.textContent = "Inspirez… 5 secondes";
    } else if (breath.phase === "out") {
      c.classList.add("is-out");
      c.textContent = "Expirez";
      if (l) l.textContent = "Expirez… 5 secondes";
    }
    if (n) n.textContent = "Souffle " + Math.min(breath.cycle + 1, breath.total) + " sur " + breath.total;
    if (b) b.textContent = "Arrêter";
  }

  function finishBreath() {
    stopBreath();
    state.breathDone = true;
    save();
    checkBadges();
    var c = $("#breath-circle");
    var l = $("#breath-label");
    var b = $("#breath-btn");
    if (c) { c.classList.remove("is-in"); c.classList.add("is-out"); c.textContent = "Bravo"; }
    if (l) l.textContent = "Trois minutes, c'est déjà un vrai cadeau pour vous.";
    if (b) b.textContent = "Refermer";
    b && b.setAttribute("data-action", "close-sheet");
    toast("Exercice de souffle terminé.");
  }

  /* ---------- Profil / data ---------- */
  function openProfil() {
    var p = state.profile || {};
    openSheet(
      '<div class="sheet-head"><h2 id="sheet-title">Mon profil</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="Fermer">✕</button></div>' +
      '<form id="form-profil" class="stack">' +
        '<div class="field"><label for="prof-prenom">Prénom</label><input id="prof-prenom" required maxlength="40" value="' + escapeHtml(p.prenom || "") + '"></div>' +
        '<div class="field"><label for="prof-taille">Taille (cm)</label><input id="prof-taille" type="number" min="120" max="230" required value="' + (p.tailleCm || "") + '"></div>' +
        '<div class="field"><label for="prof-obj">Objectif (kg)</label><input id="prof-obj" type="text" inputmode="decimal" required value="' + (p.poidsObjectif != null ? String(p.poidsObjectif).replace(".", ",") : "") + '"></div>' +
        '<p class="tiny">Poids de départ : ' + formatKg(p.poidsInitial) + " kg (fixé au premier jour, pour que la courbe reste cohérente).</p>" +
        '<button class="btn btn-primary btn-block" type="submit">Enregistrer</button>' +
      "</form>"
    );
  }

  function exportData() {
    var blob = new Blob([JSON.stringify({ app: "petit-a-petit", version: 1, exportedAt: new Date().toISOString(), state: state }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "petit-a-petit-donnees.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast("Fichier d'export téléchargé.");
  }

  function importData(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var incoming = data.state || data;
        if (!incoming || typeof incoming !== "object") throw new Error("format");
        if (!confirm("Importer ces données remplacera celles actuellement sur cet appareil. Continuer ?")) return;
        state = Object.assign(defaultState(), incoming);
        save();
        if (state.onboardingComplete && state.profile) showApp(currentTab);
        else showOnboarding();
        toast("Données importées.");
      } catch (e) {
        toast("Fichier illisible. Choisissez un export Petit à Petit.");
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    if (!confirm("Effacer toutes les données de Petit à Petit sur cet appareil ? Cette action est définitive.")) return;
    if (!confirm("Confirmez-vous l'effacement complet ?")) return;
    state = defaultState();
    localStorage.removeItem(KEY);
    closeSheet();
    onbStep = 0;
    showOnboarding();
    toast("Données effacées. Vous pouvez recommencer, sans pression.");
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-onb]");
    if (t) {
      var dir = t.getAttribute("data-onb");
      if (dir === "next") {
        if (!validateOnb()) return;
        onbStep++;
        renderOnb();
      } else if (dir === "prev") {
        onbStep = Math.max(0, onbStep - 1);
        renderOnb();
      } else if (dir === "finish") {
        if (!validateOnb()) return;
        finishOnboarding();
      }
      return;
    }
    t = ev.target.closest("[data-set-goal]");
    if (t) {
      $("#onb-objectif").value = String(t.getAttribute("data-set-goal")).replace(".", ",");
      $$(".choice").forEach(function (c) { c.classList.toggle("is-on", c === t); });
      return;
    }
    t = ev.target.closest("[data-tab]");
    if (t && t.closest(".tabbar")) {
      goTab(t.getAttribute("data-tab"));
      return;
    }
    t = ev.target.closest("[data-tab-jump]");
    if (t) {
      goTab(t.getAttribute("data-tab-jump"));
      return;
    }
    t = ev.target.closest("[data-action]");
    if (!t) {
      if (ev.target === $("#overlay")) closeSheet();
      return;
    }
    var act = t.getAttribute("data-action");
    if (act === "toggle-goal") toggleGoal(t.getAttribute("data-goal"));
    else if (act === "open-profil") openProfil();
    else if (act === "close-sheet") closeSheet();
    else if (act === "hide-bmi") { state.hideBmi = true; save(); renderPoids(); }
    else if (act === "show-bmi") { state.hideBmi = false; save(); renderPoids(); }
    else if (act === "del-weight") {
      var date = t.getAttribute("data-date");
      if (confirm("Supprimer la mesure du " + formatDateFR(date) + " ?")) {
        state.weights = state.weights.filter(function (w) { return w.date !== date; });
        save();
        renderPoids();
        toast("Mesure supprimée.");
      }
    }
    else if (act === "exo-filter") { exoFilter = t.getAttribute("data-cat"); renderBouger(); }
    else if (act === "open-exo") openExo(t.getAttribute("data-id"));
    else if (act === "open-prog") openProg(t.getAttribute("data-id"));
    else if (act === "start-session") startSession(t.getAttribute("data-prog"), Number(t.getAttribute("data-w")), Number(t.getAttribute("data-s")));
    else if (act === "session-done") sessionNext();
    else if (act === "session-prev") sessionPrev();
    else if (act === "log-exo") logExo(t.getAttribute("data-id"));
    else if (act === "timer-start") startClock(Number(t.getAttribute("data-sec")));
    else if (act === "timer-pause") stopClock();
    else if (act === "timer-reset") resetClock(Number(t.getAttribute("data-sec")));
    else if (act === "manger-panel") { mangerPanel = t.getAttribute("data-panel"); renderManger(); }
    else if (act === "toggle-acc") t.classList.toggle("is-on");
    else if (act === "open-recette") openRecette(t.getAttribute("data-id"));
    else if (act === "food-mood") {
      state.foodMood[todayISO()] = t.getAttribute("data-id");
      if (!state.daily[todayISO()]) state.daily[todayISO()] = {};
      save();
      checkBadges();
      renderManger();
      toast("Bilan alimentaire noté, sans jugement.");
    }
    else if (act === "pick-mood") {
      var noteEl = $("#mood-note");
      saveMood(t.getAttribute("data-id"), noteEl ? noteEl.value : "");
    }
    else if (act === "open-breath") openBreath();
    else if (act === "breath-toggle") {
      if (breath.running) { stopBreath(); closeSheet(); }
      else startBreath();
    }
    else if (act === "export") exportData();
    else if (act === "import") $("#import-file").click();
    else if (act === "reset") resetAll();
    else if (act === "install") {
      if (deferredInstall) {
        deferredInstall.prompt();
        deferredInstall.userChoice.finally(function () { deferredInstall = null; renderAccueil(); });
      }
    }
  });

  document.addEventListener("submit", function (ev) {
    if (ev.target && ev.target.id === "form-poids") {
      ev.preventDefault();
      var date = $("#poids-date").value;
      var poids = parseNumber($("#poids-val").value);
      var ttRaw = ($("#poids-tt").value || "").trim();
      var tt = ttRaw ? parseNumber(ttRaw) : null;
      if (!date || isNaN(poids) || poids < 30 || poids > 300) {
        toast("Indiquez une date et un poids entre 30 et 300 kg.");
        return;
      }
      if (tt != null && (isNaN(tt) || tt < 40 || tt > 250)) {
        toast("Le tour de taille semble inhabituel. Vérifiez en centimètres, ou laissez vide.");
        return;
      }
      saveWeight(date, Math.round(poids * 10) / 10, tt);
    }
    if (ev.target && ev.target.id === "form-mood") {
      ev.preventDefault();
      var selected = ev.target.querySelector(".mood.is-on");
      var id = selected ? selected.getAttribute("data-id") : null;
      if (!id) { toast("Choisissez d'abord une humeur, même approximative."); return; }
      saveMood(id, $("#mood-note").value);
    }
    if (ev.target && ev.target.id === "form-profil") {
      ev.preventDefault();
      var prenom = ($("#prof-prenom").value || "").trim();
      var taille = parseNumber($("#prof-taille").value);
      var obj = parseNumber($("#prof-obj").value);
      if (!prenom || isNaN(taille) || taille < 120 || taille > 230 || isNaN(obj) || obj < 30 || obj > 300) {
        toast("Vérifiez le prénom, la taille et l'objectif.");
        return;
      }
      state.profile.prenom = prenom;
      state.profile.tailleCm = taille;
      state.profile.poidsObjectif = obj;
      save();
      closeSheet();
      renderTab(currentTab);
      toast("Profil mis à jour.");
    }
  });

  document.addEventListener("change", function (ev) {
    if (ev.target && ev.target.id === "import-file" && ev.target.files && ev.target.files[0]) {
      importData(ev.target.files[0]);
      ev.target.value = "";
    }
    if (ev.target && ev.target.id === "onb-poids" && onbStep === 4) renderGoalSuggestions();
  });

  document.addEventListener("input", function (ev) {
    if (ev.target && ev.target.id === "onb-poids") renderGoalSuggestions();
  });

  window.addEventListener("hashchange", function () {
    var id = (location.hash || "#accueil").replace("#", "");
    if (["accueil", "poids", "bouger", "manger", "motivation"].indexOf(id) !== -1) {
      if (id !== currentTab) goTab(id, true);
    }
  });

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredInstall = e;
    if (state.onboardingComplete && currentTab === "accueil") renderAccueil();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && $("#overlay").classList.contains("is-on")) closeSheet();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(function () {});
  }

  /* boot */
  var bootHash = (location.hash || "").replace("#", "");
  if (state.onboardingComplete && state.profile) {
    if (["accueil", "poids", "bouger", "manger", "motivation"].indexOf(bootHash) !== -1) currentTab = bootHash;
    showApp(currentTab);
  } else {
    showOnboarding();
  }
})();
