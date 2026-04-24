export type LandingSectionId = "top" | "services" | "how-it-works" | "use-cases" | "contact";

const SECTION_KEYWORDS: Array<{ id: LandingSectionId; keywords: string[] }> = [
  {
    id: "contact",
    keywords: [
      "contacto",
      "contact",
      "demo",
      "agenda",
      "agendar",
      "reunion",
      "reunión",
      "cotizacion",
      "cotización",
      "escribenos",
      "escríbenos",
      "correo",
      "whatsapp",
      "formulario",
      "llamado",
      "call",
    ],
  },
  {
    id: "use-cases",
    keywords: [
      "casos de uso",
      "use cases",
      "ventas",
      "leads",
      "captacion",
      "captación",
      "atencion al cliente",
      "atención al cliente",
      "asesoria",
      "asesoría",
      "clinica",
      "clínica",
      "pacientes",
      "sitios web",
      "websites",
    ],
  },
  {
    id: "how-it-works",
    keywords: [
      "como funciona",
      "cómo funciona",
      "how it works",
      "flujo",
      "proceso",
      "pasos",
      "visitor",
      "visitante",
      "entiende",
      "guia",
      "guía",
      "idioma",
      "language",
    ],
  },
  {
    id: "services",
    keywords: [
      "que hacemos",
      "qué hacemos",
      "what do you do",
      "what you do",
      "servicios",
      "services",
      "agentes",
      "agents",
      "automatizacion",
      "automatización",
      "asistente",
      "assistant",
      "ia",
      "ai",
      "soluciones",
      "solutions",
      "maryorie",
      "negocio",
      "business",
    ],
  },
  {
    id: "top",
    keywords: [
      "pagina",
      "página",
      "page",
      "hero",
      "inicio",
      "home",
      "landing",
      "muestrame la pagina",
      "muéstrame la página",
      "show me the page",
    ],
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function inferLandingSection(text: string): LandingSectionId | null {
  const normalizedText = normalizeText(text);

  for (const section of SECTION_KEYWORDS) {
    if (section.keywords.some((keyword) => normalizedText.includes(normalizeText(keyword)))) {
      return section.id;
    }
  }

  return null;
}
