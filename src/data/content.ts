// UI copy only — LACOP profile data lives under src/data/mock.ts and is
// read via the async resolvers in src/lib/lacop.ts.
//
// Booklet vocabulary: "pages" not "routes". Section numbering is part of the
// visual system so it lives here, not spread across components.

export const pages = [
  { n: "01", key: "cover" as const, href: "/" },
  { n: "02", key: "editorial" as const, href: "/photos/editorial" },
  { n: "03", key: "portraiture" as const, href: "/photos/portraiture" },
  { n: "04", key: "lifestyle" as const, href: "/photos/lifestyle" },
  { n: "05", key: "colophon" as const, href: "/about" },
  { n: "06", key: "signature" as const, href: "/contact" },
];

export const translations = {
  nav: {
    cover: { en: "Cover", de: "Cover" },
    editorial: { en: "Editorial", de: "Editorial" },
    portraiture: { en: "Portraiture", de: "Porträt" },
    lifestyle: { en: "Lifestyle", de: "Lifestyle" },
    colophon: { en: "About", de: "Über" },
    signature: { en: "Contact", de: "Kontakt" },
    index: { en: "Index", de: "Index" },
    close: { en: "Close", de: "Schließen" },
  },
  cover: {
    subtitle: {
      en: "Editorial, portraiture, lifestyle.",
      de: "Editorial, Porträt, Lifestyle.",
    },
    hover_hint: {
      en: "Hover a series to preview.",
      de: "Fahre über eine Serie, um sie zu sehen.",
    },
    open: { en: "Start with Editorial", de: "Mit Editorial beginnen" },
  },
  photos: {
    heading: { en: "Contents", de: "Inhalt" },
    intro: {
      en: "Three series. Pick any page to enter; the rail tracks your position.",
      de: "Drei Serien. Seite wählen — der Rand zeigt, wo du bist.",
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
      en: "A short bio, representation and selected work will be set here. For now, this page stands as a placeholder until Carina's own words are in.",
      de: "Eine kurze Bio, Agentur und ausgewählte Arbeiten folgen hier. Bis dahin bleibt diese Seite ein Platzhalter.",
    },
    placeholder_note: {
      en: "Placeholder — replace with Carina's own wording before going live.",
      de: "Platzhaltertext — vor dem Livegang durch Carinas eigene Worte ersetzen.",
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
