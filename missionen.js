/* =====================================================================
   MISSIONSDATEN — Block 2: Tabelleneigenschaften (15 Einheiten)
   5 Familien × 3 Wiederholungen, am Ende per Round-Robin gemischt.
   Globale Nummerierung setzt bei 22 fort (Block 1 war 1–21).
   ===================================================================== */

(() => {
  "use strict";
  const missions = [];
  const hexToRgb = window.TablePropsEngine.hexToRgb;

  function tableHTML(rows, opts) {
    opts = opts || {};
    const cls = "sim-table" + (opts.noBorder ? " no-border" : "");
    const trs = rows.map(cells => `<tr>${cells.map(t => `<td>${t}</td>`).join("")}</tr>`).join("");
    return `<table class="${cls}"><tbody>${trs}</tbody></table>`;
  }

  // ---------------------------------------------------------------
  // G1 — Zellenausrichtung (Reiter "Zelle")
  // ---------------------------------------------------------------
  missions.push({
    id: "g1-1", family: "G1", title: "Eine Zelle rechtsbündig ausrichten",
    erklaerung: "Öffnet die Tabelleneigenschaften (⚙), wechselt zum Reiter „Zelle“ und wählt eine Ausrichtung — sie gilt für die zuvor angeklickte Zelle.",
    aufgabe: "Klickt die Zelle „15.10.“ an, öffnet die Tabelleneigenschaften, Reiter „Zelle“, und richtet sie rechtsbündig aus.",
    hint: "Erst „15.10.“ anklicken, dann ⚙ → Zelle → „Rechts“.",
    initialHTML: tableHTML([["Datum", "15.10."]]),
    demo: { vorher: "Datum | 15.10.", nachher: "Datum |          15.10." },
    check: (ctx) => ctx.alignOf("15.10.") === "right",
  });
  missions.push({
    id: "g1-2", family: "G1", title: "Eine Zelle zentrieren",
    erklaerung: "Genauso funktioniert die zentrierte Ausrichtung.",
    aufgabe: "Klickt die Zelle „Überschrift“ an und zentriert sie über den Dialog.",
    hint: "Erst anklicken, dann ⚙ → Zelle → „Zentriert“.",
    initialHTML: tableHTML([["Titel", "Überschrift"]]),
    demo: { vorher: "Titel | Überschrift", nachher: "Titel |    Überschrift" },
    check: (ctx) => ctx.alignOf("Überschrift") === "center",
  });
  missions.push({
    id: "g1-3", family: "G1", title: "Eine Zelle linksbündig ausrichten",
    erklaerung: "Auch links ausrichten ist eine bewusste Einstellung, keine Voreinstellung.",
    aufgabe: "Klickt die Zelle „Mustermann“ an und richtet sie linksbündig aus.",
    hint: "Erst anklicken, dann ⚙ → Zelle → „Links“.",
    initialHTML: tableHTML([["Name", "Mustermann"]]),
    demo: { vorher: "Name |    Mustermann", nachher: "Name | Mustermann" },
    check: (ctx) => ctx.alignOf("Mustermann") === "left",
  });

  // ---------------------------------------------------------------
  // G2 — Hintergrundfarbe (Schattierung, Reiter "Zelle")
  // ---------------------------------------------------------------
  missions.push({
    id: "g2-1", family: "G2", title: "Eine Zelle rot hinterlegen",
    erklaerung: "Im Reiter „Zelle“ gibt es neben der Ausrichtung auch Farbfelder für die Hintergrundfarbe (Schattierung).",
    aufgabe: "Klickt die Zelle „Wichtig“ an und hinterlegt sie rot.",
    hint: "Erst anklicken, dann ⚙ → Zelle → rotes Farbfeld.",
    initialHTML: tableHTML([["Wichtig", "Hinweis"]]),
    demo: { vorher: "Wichtig | Hinweis", nachher: "[rot]Wichtig | Hinweis" },
    check: (ctx) => ctx.colorOf("Wichtig") === hexToRgb("#F4D9D3"),
  });
  missions.push({
    id: "g2-2", family: "G2", title: "Eine Zelle grün hinterlegen",
    erklaerung: "Grün eignet sich zum Beispiel für erledigte Punkte.",
    aufgabe: "Klickt die Zelle „Erledigt“ an und hinterlegt sie grün.",
    hint: "Erst anklicken, dann ⚙ → Zelle → grünes Farbfeld.",
    initialHTML: tableHTML([["Status", "Erledigt"]]),
    demo: { vorher: "Status | Erledigt", nachher: "Status | [grün]Erledigt" },
    check: (ctx) => ctx.colorOf("Erledigt") === hexToRgb("#DCEEE1"),
  });
  missions.push({
    id: "g2-3", family: "G2", title: "Eine Zelle blau hinterlegen",
    erklaerung: "Blau eignet sich zum Beispiel für Termine.",
    aufgabe: "Klickt die Zelle „Montag“ an und hinterlegt sie blau.",
    hint: "Erst anklicken, dann ⚙ → Zelle → blaues Farbfeld.",
    initialHTML: tableHTML([["Termin", "Montag"]]),
    demo: { vorher: "Termin | Montag", nachher: "Termin | [blau]Montag" },
    check: (ctx) => ctx.colorOf("Montag") === hexToRgb("#D7E6F2"),
  });

  // ---------------------------------------------------------------
  // G3 — Kopfzeile hervorheben (Reiter "Tabelle")
  // ---------------------------------------------------------------
  missions.push({
    id: "g3-1", family: "G3", title: "Die Kopfzeile hervorheben (1)",
    erklaerung: "Im Reiter „Tabelle“ lässt sich die erste Zeile als Kopfzeile hervorheben (fett, grau hinterlegt) — ohne vorher eine Zelle anzuklicken, das gilt für die ganze Tabelle.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Kopfzeile hervorheben“.",
    hint: "⚙ → Tabelle → Häkchen bei „Kopfzeile hervorheben“.",
    initialHTML: tableHTML([["Name", "Klasse"], ["Lea", "4b"]]),
    demo: { vorher: "Name | Klasse (normal)", nachher: "Name | Klasse (fett, grau)" },
    check: (ctx) => ctx.hasHeaderHighlight(),
  });
  missions.push({
    id: "g3-2", family: "G3", title: "Die Kopfzeile hervorheben (2)",
    erklaerung: "Das funktioniert bei jeder Tabelle gleich.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Kopfzeile hervorheben“.",
    hint: "⚙ → Tabelle → Häkchen bei „Kopfzeile hervorheben“.",
    initialHTML: tableHTML([["Fach", "Note"], ["Mathe", "2"]]),
    demo: { vorher: "Fach | Note (normal)", nachher: "Fach | Note (fett, grau)" },
    check: (ctx) => ctx.hasHeaderHighlight(),
  });
  missions.push({
    id: "g3-3", family: "G3", title: "Die Kopfzeile hervorheben (3)",
    erklaerung: "So erkennt man auf einen Blick, welche Zeile die Überschriften enthält.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Kopfzeile hervorheben“.",
    hint: "⚙ → Tabelle → Häkchen bei „Kopfzeile hervorheben“.",
    initialHTML: tableHTML([["Datum", "Ereignis"], ["Montag", "Ausflug"]]),
    demo: { vorher: "Datum | Ereignis (normal)", nachher: "Datum | Ereignis (fett, grau)" },
    check: (ctx) => ctx.hasHeaderHighlight(),
  });

  // ---------------------------------------------------------------
  // G4 — Gebänderte Zeilen (Reiter "Tabelle")
  // ---------------------------------------------------------------
  missions.push({
    id: "g4-1", family: "G4", title: "Gebänderte Zeilen aktivieren (1)",
    erklaerung: "Gebänderte Zeilen färben jede zweite Zeile leicht ein — das macht breite Tabellen leichter lesbar.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Gebänderte Zeilen“.",
    hint: "⚙ → Tabelle → Häkchen bei „Gebänderte Zeilen“.",
    initialHTML: tableHTML([["A", "1"], ["B", "2"], ["C", "3"]]),
    demo: { vorher: "alle Zeilen weiß", nachher: "jede 2. Zeile leicht grau" },
    check: (ctx) => ctx.hasBanding(),
  });
  missions.push({
    id: "g4-2", family: "G4", title: "Gebänderte Zeilen aktivieren (2)",
    erklaerung: "Das funktioniert bei jeder Tabelle gleich, egal wie viele Zeilen sie hat.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Gebänderte Zeilen“.",
    hint: "⚙ → Tabelle → Häkchen bei „Gebänderte Zeilen“.",
    initialHTML: tableHTML([["Mo", "Sport"], ["Di", "Kunst"], ["Mi", "Musik"]]),
    demo: { vorher: "alle Zeilen weiß", nachher: "jede 2. Zeile leicht grau" },
    check: (ctx) => ctx.hasBanding(),
  });
  missions.push({
    id: "g4-3", family: "G4", title: "Gebänderte Zeilen aktivieren (3)",
    erklaerung: "Besonders bei vier oder mehr Zeilen hilft das deutlich beim Lesen.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Gebänderte Zeilen“.",
    hint: "⚙ → Tabelle → Häkchen bei „Gebänderte Zeilen“.",
    initialHTML: tableHTML([["1", "Apfel"], ["2", "Birne"], ["3", "Kirsche"], ["4", "Pflaume"]]),
    demo: { vorher: "alle Zeilen weiß", nachher: "jede 2. Zeile leicht grau" },
    check: (ctx) => ctx.hasBanding(),
  });

  // ---------------------------------------------------------------
  // G5 — Rahmen ein/aus (Reiter "Tabelle")
  // ---------------------------------------------------------------
  missions.push({
    id: "g5-1", family: "G5", title: "Rahmen ausblenden",
    erklaerung: "Im Reiter „Tabelle“ lässt sich der Rahmen komplett aus- und wieder einblenden.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und deaktiviert „Rahmen anzeigen“.",
    hint: "⚙ → Tabelle → Häkchen bei „Rahmen anzeigen“ entfernen.",
    initialHTML: tableHTML([["A", "B"]]),
    demo: { vorher: "Tabelle mit sichtbaren Linien", nachher: "Tabelle ohne Linien" },
    check: (ctx) => !ctx.hasBorder(),
  });
  missions.push({
    id: "g5-2", family: "G5", title: "Rahmen wieder einblenden",
    erklaerung: "Genauso lässt sich ein zuvor ausgeblendeter Rahmen wieder aktivieren.",
    aufgabe: "Diese Tabelle hat aktuell keinen Rahmen. Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und aktiviert „Rahmen anzeigen“.",
    hint: "⚙ → Tabelle → Häkchen bei „Rahmen anzeigen“ setzen.",
    initialHTML: tableHTML([["C", "D"]], { noBorder: true }),
    demo: { vorher: "Tabelle ohne Linien", nachher: "Tabelle mit sichtbaren Linien" },
    check: (ctx) => ctx.hasBorder(),
  });
  missions.push({
    id: "g5-3", family: "G5", title: "Rahmen erneut ausblenden",
    erklaerung: "So wechselt ihr je nach gewünschtem Look zwischen beiden Varianten.",
    aufgabe: "Öffnet die Tabelleneigenschaften, Reiter „Tabelle“, und deaktiviert „Rahmen anzeigen“.",
    hint: "⚙ → Tabelle → Häkchen bei „Rahmen anzeigen“ entfernen.",
    initialHTML: tableHTML([["E", "F"]]),
    demo: { vorher: "Tabelle mit sichtbaren Linien", nachher: "Tabelle ohne Linien" },
    check: (ctx) => !ctx.hasBorder(),
  });

  // ---------------------------------------------------------------
  // Labels je Familie
  // ---------------------------------------------------------------
  const familyLabels = {
    G1: "Zellenausrichtung", G2: "Hintergrundfarbe", G3: "Kopfzeile hervorheben",
    G4: "Gebänderte Zeilen", G5: "Rahmen ein/aus",
  };
  missions.forEach(m => { m.baustein = "F"; m.bausteinLabel = "Tabelleneigenschaften – " + familyLabels[m.family]; });

  // ---------------------------------------------------------------
  // Durchmischen: Round-Robin über alle 5 Familien
  // ---------------------------------------------------------------
  function chunk3(arr) {
    const out = [];
    for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
    return out;
  }
  function roundRobin(groups) {
    const out = [];
    const maxLen = Math.max(...groups.map(g => g.length));
    for (let round = 0; round < maxLen; round++) {
      groups.forEach(g => { if (g[round]) out.push(g[round]); });
    }
    return out;
  }
  const interleaved = roundRobin(chunk3(missions));

  window.TablePropsEngine.start(interleaved, {
    familyLabel: "Tabelleneigenschaften",
    startNumber: 22,
    totalCount: 36,
    onComplete: {
      title: "Baustein F komplett abgeschlossen! 🎉",
      text: "Du hast alle 36 Tabellen-Missionen gemeistert — Grundfunktionen und Tabelleneigenschaften.",
    },
  });
})();
