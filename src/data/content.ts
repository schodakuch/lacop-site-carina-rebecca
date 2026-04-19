// UI copy only — LACOP profile data lives under src/data/mock.ts and is
// read via the async resolvers in src/lib/lacop.ts.
//
// Booklet vocabulary: "pages" not "routes". The page ledger (numbering,
// labels, hrefs) is composed at render time by `usePages()` in
// src/hooks/usePages.ts — it reads the active customer's categories and
// slots them between cover (01) and about (N+2) / contact (N+3). That
// means any customer's taxonomy flows through the shell without code
// change.

export const translations = {
  nav: {
    cover: { en: "Cover", de: "Cover" },
    about: { en: "About", de: "Über" },
    contact: { en: "Contact", de: "Kontakt" },
    index: { en: "Index", de: "Index" },
    close: { en: "Close", de: "Schließen" },
  },
  cover: {
    subtitle: {
      en: "A working lookbook. Pick any series from the contents.",
      de: "Ein laufendes Lookbook. Wähle eine Serie aus dem Inhalt.",
    },
    hover_hint: {
      en: "Hover a series to preview.",
      de: "Fahre über eine Serie, um sie zu sehen.",
    },
    // {first} is replaced at render with the customer's first category name.
    open: {
      en: "Start with {first}",
      de: "Mit {first} beginnen",
    },
  },
  photos: {
    heading: { en: "Contents", de: "Inhalt" },
    intro: {
      en: "Pick any page to enter; the rail tracks your position.",
      de: "Seite wählen — der Rand zeigt, wo du bist.",
    },
    empty_series: { en: "This page is empty.", de: "Diese Seite ist leer." },
    frame_count: {
      one: { en: "1 photo", de: "1 Foto" },
      other: { en: "{n} photos", de: "{n} Fotos" },
    },
  },
  series: {
    prev: { en: "Previous page", de: "Vorherige Seite" },
    next: { en: "Next page", de: "Nächste Seite" },
  },
  about: {
    heading: { en: "About", de: "Über" },
    body: {
      en: "A short bio, representation and selected work will be set here. For now, this page stands as a placeholder until the subject's own words are in.",
      de: "Eine kurze Bio, Agentur und ausgewählte Arbeiten folgen hier. Bis dahin bleibt diese Seite ein Platzhalter.",
    },
    placeholder_note: {
      en: "Placeholder — replace with the subject's own wording before going live.",
      de: "Platzhaltertext — vor dem Livegang durch eigene Worte ersetzen.",
    },
    stats_empty: { en: "Stats to come.", de: "Maße folgen." },
    agencies_empty: { en: "Representation to come.", de: "Agentur folgt." },
  },
  contact: {
    heading: { en: "Contact", de: "Kontakt" },
    lede: { en: "A direct line, not a gatekeeper.", de: "Direkter Draht, kein Umweg." },
    form_note: {
      en: "The form composes a message in your mail app.",
      de: "Das Formular öffnet deine Mail-App mit vorausgefülltem Text.",
    },
    placeholder_note: {
      en: "Placeholder address — replace before going live.",
      de: "Platzhalter-Adresse — vor Livegang ersetzen.",
    },
    send: { en: "Send message", de: "Nachricht senden" },
    sending: { en: "Opening mail app…", de: "Mail-App öffnet …" },
    subject_fallback: { en: "Enquiry", de: "Anfrage" },
    labels: {
      name: { en: "Name", de: "Name" },
      email: { en: "Email", de: "E-Mail" },
      subject: { en: "Subject", de: "Betreff" },
      message: { en: "Message", de: "Nachricht" },
    },
  },
  footer: {
    rights: { en: "All rights reserved", de: "Alle Rechte vorbehalten" },
    set: { en: "Set on lacop.app", de: "Gesetzt auf lacop.app" },
  },
  notfound: {
    heading: { en: "Page not found", de: "Seite nicht gefunden" },
    body: { en: "No such page in this book.", de: "Diese Seite existiert im Buch nicht." },
    home: { en: "Back to the cover", de: "Zurück zum Cover" },
  },
};
