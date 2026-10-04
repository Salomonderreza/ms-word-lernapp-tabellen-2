/* =====================================================================
   PROGRAMM 4 — ENGINE (Baustein F, Block 2: Tabelleneigenschaften)

   Alle Formatierungen dieses Blocks laufen ausschließlich über den
   Tabelleneigenschaften-Dialog (zwei Reiter):
   - Reiter "Tabelle": wirkt auf die ganze Tabelle (Rahmen, Kopfzeile,
     gebänderte Zeilen) — reine CSS-Klassen-Umschalter auf <table>.
   - Reiter "Zelle": wirkt auf die zuletzt angeklickte Zelle (Ausrichtung,
     Hintergrundfarbe) — dieselbe Klick-Auswahl-Technik wie in Block 1
     und bei der Bildauswahl in Baustein E.
   ===================================================================== */

window.TablePropsEngine = (() => {
  "use strict";

  const editor = document.getElementById("editor");
  const el = {
    panelBody: document.getElementById("panelBody"),
    progressFill: document.getElementById("progressFill"),
    progressLabel: document.getElementById("progressLabel"),
    familyLabel: document.getElementById("familyLabel"),
    brandNum: document.getElementById("brandNum"),
    docName: document.getElementById("docName"),
    btnEigenschaften: document.getElementById("btn-eigenschaften"),
    propsBackdrop: document.getElementById("propsBackdrop"),
    tabBtnTabelle: document.getElementById("tabBtnTabelle"),
    tabBtnZelle: document.getElementById("tabBtnZelle"),
    panelTabelle: document.getElementById("panelTabelle"),
    panelZelle: document.getElementById("panelZelle"),
    zelleHint: document.getElementById("zelleHint"),
    chkRahmen: document.getElementById("chkRahmen"),
    chkKopfzeile: document.getElementById("chkKopfzeile"),
    chkGebaendert: document.getElementById("chkGebaendert"),
    propsClose: document.getElementById("propsClose"),
  };

  const state = {
    missions: [], index: 0, phase: "erklaerung", done: false,
    startNumber: 22, totalCount: 36, onComplete: null,
    selectedCell: null,
  };

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // -----------------------------------------------------------
  // Inhalt setzen
  // -----------------------------------------------------------

  function setContent(m) {
    state.selectedCell = null;
    editor.innerHTML = m.initialHTML || "<p>&nbsp;</p>";
  }

  // -----------------------------------------------------------
  // Zellen-Klick-Auswahl (einfach — kein Mehrfachauswahl nötig)
  // -----------------------------------------------------------

  editor.addEventListener("click", (e) => {
    const td = e.target.closest("td");
    editor.querySelectorAll("td.selected").forEach(x => x.classList.remove("selected"));
    if (!td) { state.selectedCell = null; return; }
    state.selectedCell = td;
    td.classList.add("selected");
  });

  // -----------------------------------------------------------
  // Dialog: öffnen/schließen, Reiter wechseln
  // -----------------------------------------------------------

  function currentTable() { return editor.querySelector("table"); }

  function syncTabelleTab() {
    const table = currentTable();
    el.chkRahmen.checked = !!table && !table.classList.contains("no-border");
    el.chkKopfzeile.checked = !!table && table.classList.contains("header-highlight");
    el.chkGebaendert.checked = !!table && table.classList.contains("banded");
  }
  function syncZelleTab() {
    if (state.selectedCell) {
      el.zelleHint.textContent = "Ausgewählte Zelle: „" + (state.selectedCell.textContent.trim() || "(leer)") + "“";
    } else {
      el.zelleHint.textContent = "Klickt zuerst eine Zelle in der Tabelle an.";
    }
  }

  function openDialog() {
    syncTabelleTab();
    syncZelleTab();
    el.propsBackdrop.hidden = false;
  }
  function closeDialog() { el.propsBackdrop.hidden = true; }

  el.btnEigenschaften.addEventListener("click", openDialog);
  el.propsClose.addEventListener("click", closeDialog);
  el.propsBackdrop.addEventListener("click", (e) => { if (e.target === el.propsBackdrop) closeDialog(); });

  [el.tabBtnTabelle, el.tabBtnZelle].forEach(btn => {
    btn.addEventListener("click", () => {
      [el.tabBtnTabelle, el.tabBtnZelle].forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      el.panelTabelle.hidden = tab !== "tabelle";
      el.panelZelle.hidden = tab !== "zelle";
      if (tab === "zelle") syncZelleTab();
    });
  });

  // -----------------------------------------------------------
  // Reiter "Tabelle": Rahmen / Kopfzeile / Bänderung
  // -----------------------------------------------------------

  el.chkRahmen.addEventListener("change", () => {
    const table = currentTable();
    if (!table) return;
    table.classList.toggle("no-border", !el.chkRahmen.checked);
    afterManualEdit();
  });
  el.chkKopfzeile.addEventListener("change", () => {
    const table = currentTable();
    if (!table) return;
    table.classList.toggle("header-highlight", el.chkKopfzeile.checked);
    afterManualEdit();
  });
  el.chkGebaendert.addEventListener("change", () => {
    const table = currentTable();
    if (!table) return;
    table.classList.toggle("banded", el.chkGebaendert.checked);
    afterManualEdit();
  });

  // -----------------------------------------------------------
  // Reiter "Zelle": Ausrichtung / Hintergrundfarbe
  // -----------------------------------------------------------

  function applyAlign(align) {
    if (!state.selectedCell) return;
    state.selectedCell.style.textAlign = align;
    afterManualEdit();
  }
  document.getElementById("align-links").addEventListener("click", () => applyAlign("left"));
  document.getElementById("align-zentriert").addEventListener("click", () => applyAlign("center"));
  document.getElementById("align-rechts").addEventListener("click", () => applyAlign("right"));

  document.querySelectorAll(".swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!state.selectedCell) return;
      state.selectedCell.style.backgroundColor = btn.dataset.color;
      afterManualEdit();
    });
  });

  function afterManualEdit() { runCheck(); }

  // -----------------------------------------------------------
  // Missions-/Phasen-Steuerung
  // -----------------------------------------------------------

  function currentMission() { return state.missions[state.index]; }

  function setPhase(phase) { state.phase = phase; render(); }

  function render() {
    const m = currentMission();
    el.docName.textContent = "Mission " + (state.index + state.startNumber) + " – " + m.title + ".docx";
    if (el.brandNum && m.baustein) el.brandNum.textContent = m.baustein;
    if (m.bausteinLabel) el.familyLabel.textContent = m.bausteinLabel;
    closeDialog();

    if (state.phase === "erklaerung") {
      editor.contentEditable = "false";
      setContent(m);
      el.panelBody.innerHTML = `
        <span class="phase-tag">So wird es gemacht!</span>
        <span class="method-badge">🖱️ Maus</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="explanation-text">${m.erklaerung}</p>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnSkipDemo">Direkt zur Übung →</button>
          <button class="btn btn-primary" id="btnZurDemo">Demo ansehen →</button>
        </div>`;
      document.getElementById("btnZurDemo").addEventListener("click", () => setPhase("demo"));
      document.getElementById("btnSkipDemo").addEventListener("click", () => setPhase("aufgabe"));
      return;
    }

    if (state.phase === "demo") {
      editor.contentEditable = "false";
      setContent(m);
      el.panelBody.innerHTML = `
        <span class="phase-tag demo">Demo</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="explanation-text">${m.erklaerung}</p>
        <div class="demo-visual">
          <div class="demo-compare">
            <div class="demo-compare-box"><span class="demo-compare-label">Vorher</span><p>${m.demo.vorher}</p></div>
            <div class="demo-compare-arrow">↓</div>
            <div class="demo-compare-box demo-compare-after"><span class="demo-compare-label">Nachher</span><p>${m.demo.nachher}</p></div>
          </div>
        </div>
        <div class="panelnav">
          <button class="btn btn-primary" id="btnJetztDu">Jetzt du! →</button>
        </div>`;
      document.getElementById("btnJetztDu").addEventListener("click", () => setPhase("aufgabe"));
      return;
    }

    if (state.phase === "aufgabe") {
      state.done = false;
      setContent(m);
      editor.contentEditable = "true";
      el.panelBody.innerHTML = `
        <span class="phase-tag aufgabe">Deine Aufgabe</span>
        <span class="method-badge">🖱️ Mit der Maus</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="instruction">${m.aufgabe}</p>
        ${m.hint ? `<div class="hintbox">
          <button class="hint-toggle" id="hintToggle">Tipp anzeigen</button>
          <p class="hint-text" id="hintText" hidden>${m.hint}</p>
        </div>` : ""}
        <div class="feedback" id="feedback"></div>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnRetry">Neu starten</button>
          <button class="btn btn-primary" id="btnNext" disabled>Weiter →</button>
        </div>`;
      if (m.hint) {
        document.getElementById("hintToggle").addEventListener("click", () => {
          const t = document.getElementById("hintText");
          const show = t.hidden;
          t.hidden = !show;
          document.getElementById("hintToggle").textContent = show ? "Tipp verbergen" : "Tipp anzeigen";
        });
      }
      document.getElementById("btnRetry").addEventListener("click", () => setPhase("aufgabe"));
      document.getElementById("btnNext").addEventListener("click", nextMission);
      return;
    }
  }

  function updateProgress() {
    el.progressFill.style.width = Math.round(state.index / state.missions.length * 100) + "%";
    el.progressLabel.textContent = "Mission " + (state.index + state.startNumber) + " / " + state.totalCount;
  }

  function cellByLabel(label) {
    const table = currentTable();
    if (!table) return null;
    return [...table.querySelectorAll("td")].find(td => td.textContent.trim() === label) || null;
  }

  function runCheck() {
    const m = currentMission();
    if (state.phase !== "aufgabe" || state.done) return;

    const table = currentTable();
    const ctx = {
      hasBorder: () => !!table && !table.classList.contains("no-border"),
      hasHeaderHighlight: () => !!table && table.classList.contains("header-highlight"),
      hasBanding: () => !!table && table.classList.contains("banded"),
      alignOf: (label) => { const td = cellByLabel(label); return td ? (td.style.textAlign || "") : null; },
      colorOf: (label) => { const td = cellByLabel(label); return td ? (td.style.backgroundColor || "") : null; },
      hexToRgb,
    };

    let ok = false;
    try { ok = !!m.check(ctx); } catch (e) { ok = false; }
    if (ok) {
      state.done = true;
      const fb = document.getElementById("feedback");
      if (fb) { fb.textContent = "✓ Richtig gemacht! Klicke auf „Weiter“."; fb.className = "feedback ok"; }
      const btn = document.getElementById("btnNext");
      if (btn) btn.disabled = false;
      updateProgress();
    }
  }

  function nextMission() {
    if (state.index < state.missions.length - 1) {
      state.index++;
      updateProgress();
      setPhase("erklaerung");
    } else {
      editor.contentEditable = "false";
      const done = state.onComplete || { title: "Geschafft", text: `Du hast alle ${state.totalCount} Missionen gemeistert.` };
      el.panelBody.innerHTML = `
        <span class="phase-tag aufgabe">Geschafft! 🎉</span>
        <h2 id="missionTitle">${done.title}</h2>
        <p class="explanation-text">${done.text}</p>`;
    }
  }

  function start(missions, { familyLabel, startNumber = 22, totalCount, onComplete } = {}) {
    state.missions = missions;
    state.index = 0;
    state.startNumber = startNumber;
    state.totalCount = totalCount || missions.length;
    state.onComplete = onComplete || null;
    if (familyLabel) el.familyLabel.textContent = familyLabel;
    updateProgress();
    setPhase("erklaerung");
  }

  return { start, hexToRgb };
})();
