import { Locale } from "./types";

type Dictionary = {
  seo: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    howItWorks: string;
    useCases: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    eyebrow: string;
    stats: Array<{ value: string; label: string }>;
  };
  voiceDemo: {
    label: string;
    title: string;
    description: string;
    browserLanguage: string;
    activateAudioLabel: string;
    activateAudioHint: string;
    composerPlaceholder: string;
    submitLabel: string;
    microphoneLabel: string;
    handsFreeLabel: string;
    speakingEnabled: string;
    speakingDisabled: string;
    voiceModeLabel: string;
    audioUnlockHint: string;
    audioReadyLabel: string;
    audioPendingLabel: string;
    listeningReadyLabel: string;
    listeningUnavailableLabel: string;
    resumedListeningLabel: string;
    consultButtonLabel: string;
    consultButtonHint: string;
    minimizeLabel: string;
    restoreLabel: string;
    consultationLabel: string;
    micUnsupported: string;
    apiKeyMissing: string;
    errorFallback: string;
    conversationLabel: string;
    aiVoiceDisclosure: string;
    states: Record<"idle" | "listening" | "processing" | "responding", string>;
    samplePrompt: string;
    placeholderTitle: string;
    placeholderBody: string;
    integrationNotes: {
      stt: string;
      llm: string;
      tts: string;
    };
  };
  sections: {
    whatWeDo: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{ title: string; body: string }>;
    };
    howItWorks: {
      kicker: string;
      title: string;
      steps: Array<{ title: string; body: string }>;
    };
    useCases: {
      kicker: string;
      title: string;
      items: string[];
    };
    finalCta: {
      kicker: string;
      title: string;
      description: string;
      formName: string;
      formEmail: string;
      formCompany: string;
      formMessage: string;
      button: string;
      note: string;
    };
  };
  footer: {
    claim: string;
    rights: string;
  };
};

export const dictionary: Record<Locale, Dictionary> = {
  es: {
    seo: {
      title: "EVO | IA premium, agentes conversacionales y automatización",
      description:
        "EVO crea asistentes con IA, automatización y experiencias conversacionales elegantes para negocios modernos.",
    },
    nav: {
      services: "Servicios",
      howItWorks: "Cómo funciona",
      useCases: "Casos de uso",
      contact: "Contacto",
    },
    hero: {
      badge: "Evolutionary Virtual Operations",
      eyebrow: "Soluciones tecnológicas para negocios en crecimiento",
      title: "EVO diseña soluciones digitales, automatización e integración para empresas que quieren operar mejor.",
      subtitle:
        "Construimos agentes, APIs, automatizaciones, webs, apps y sistemas conectados para ventas, soporte y operación real.",
      primaryCta: "Solicita una propuesta",
      secondaryCta: "Conoce nuestros servicios",
      stats: [
        { value: "APIs", label: "Integraciones y backend" },
        { value: "Web + App", label: "Productos conectados" },
        { value: "Automation", label: "Operación más eficiente" },
      ],
    },
    voiceDemo: {
      label: "Maryorie · Demo consultable",
      title: "Un espacio para probar una solución conversacional en acción.",
      description:
        "Maryorie funciona como un espacio de consulta para resolver dudas reales sobre tu negocio y explorar cómo EVO podría ayudarte.",
      browserLanguage: "Idioma detectado",
      activateAudioLabel: "Activar audio y comenzar",
      activateAudioHint: "La primera interacción es necesaria para que tu navegador permita hablar y escuchar.",
      composerPlaceholder: "Escribe tu mensaje a Maryorie",
      submitLabel: "Enviar",
      microphoneLabel: "Hablar con Maryorie",
      handsFreeLabel: "Haz una pregunta sobre tu negocio, tus procesos, tus ventas, tu atención o tu operación.",
      speakingEnabled: "Voz activada",
      speakingDisabled: "Voz desactivada",
      voiceModeLabel: "Voz IA remota",
      audioUnlockHint: "Toca la pagina una vez para habilitar el audio en tu navegador.",
      audioReadyLabel: "Audio habilitado",
      audioPendingLabel: "Audio pendiente",
      listeningReadyLabel: "Maryorie lista para escuchar",
      listeningUnavailableLabel: "Escucha no disponible en este navegador",
      resumedListeningLabel: "Maryorie volvió a escuchar",
      consultButtonLabel: "Consultar a Maryorie",
      consultButtonHint: "Puedes navegar normal y activar a Maryorie solo cuando la necesites.",
      minimizeLabel: "Minimizar",
      restoreLabel: "Abrir Maryorie",
      consultationLabel: "Consulta activa",
      micUnsupported: "Tu navegador no admite entrada por voz en esta demo.",
      apiKeyMissing: "Falta configurar OPENAI_API_KEY en el servidor.",
      errorFallback: "No pude completar la respuesta en este momento. Intenta nuevamente.",
      conversationLabel: "Conversación",
      aiVoiceDisclosure: "La voz de Maryorie es generada por IA.",
      states: {
        idle: "Inactiva",
        listening: "Escuchando",
        processing: "Procesando",
        responding: "Respondiendo",
      },
      samplePrompt:
        "Hola, soy Maryorie. Puedo ayudarte a pensar soluciones para ventas, atención, automatización, integraciones o producto digital. Cuéntame qué hace tu negocio y qué quieres mejorar.",
      placeholderTitle: "Arquitectura preparada para integración real",
      placeholderBody:
        "El flujo conversa contra OpenAI mediante rutas seguras en Next. La entrada por voz usa Web Speech API y la salida hablada usa TTS remoto con una voz consistente para Maryorie.",
      integrationNotes: {
        stt: "STT del navegador listo para reemplazarse por un proveedor dedicado",
        llm: "LLM conectado por app/api/maryorie/route.ts",
        tts: "TTS conectado por app/api/maryorie/speech/route.ts",
      },
    },
    sections: {
      whatWeDo: {
        kicker: "Qué hacemos",
        title: "Soluciones de IA diseñadas para operar y vender mejor.",
        description:
          "EVO construye capas conversacionales sobrias y efectivas para empresas que quieren crecer sin saturar sus equipos.",
        items: [
          {
            title: "Agentes con IA",
            body: "Asistentes especializados para resolver consultas, calificar oportunidades y acompañar flujos clave.",
          },
          {
            title: "Automatización de atención",
            body: "Atención más rápida y consistente con respuestas guiadas, derivación inteligente y disponibilidad ampliada.",
          },
          {
            title: "Soluciones web personalizadas",
            body: "Interfaces de alto nivel listas para mostrar valor, captar leads y soportar integraciones futuras.",
          },
          {
            title: "Experiencias conversacionales",
            body: "Voz, texto y flujos híbridos pensados para un trato natural, ejecutivo y multilingüe.",
          },
        ],
      },
      howItWorks: {
        kicker: "Cómo funciona",
        title: "Un recorrido claro desde la primera visita hasta la conversión.",
        steps: [
          {
            title: "1. El visitante entra",
            body: "La propuesta de valor aparece de inmediato con una interfaz limpia y confianza visual.",
          },
          {
            title: "2. Habla con Maryorie",
            body: "Puede iniciar una interacción por voz o texto desde un punto visible del hero.",
          },
          {
            title: "3. Maryorie entiende",
            body: "El flujo está preparado para detectar idioma, interpretar intención y dar contexto comercial.",
          },
          {
            title: "4. Maryorie guía",
            body: "La conversación conduce a contacto, demo o siguiente paso según el interés del usuario.",
          },
        ],
      },
      useCases: {
        kicker: "Casos de uso",
        title: "Aplicaciones de alto impacto para negocios modernos.",
        items: [
          "Atención al cliente con IA",
          "Asesoría automatizada de productos o servicios",
          "Ventas asistidas y precalificación de leads",
          "Captación desde sitios web corporativos",
          "Asistentes inteligentes para experiencias digitales premium",
        ],
      },
      finalCta: {
        kicker: "Contacto",
        title: "Haz que tu operación evolucione con una experiencia de IA seria y lista para vender.",
        description:
          "Comparte tu objetivo y diseñaremos una experiencia con Maryorie, agentes inteligentes y automatización adaptada a tu negocio.",
        formName: "Nombre",
        formEmail: "Correo empresarial",
        formCompany: "Empresa",
        formMessage: "Cuéntanos qué quieres automatizar",
        button: "Solicitar una conversación",
        note: "Formulario visual listo para conectar a backend, CRM o servicio de email.",
      },
    },
    footer: {
      claim: "EVO · Evolutionary Virtual Operations",
      rights: "Diseñado para empresas que buscan una presencia de IA elegante y confiable.",
    },
  },
  en: {
    seo: {
      title: "EVO | Premium AI, conversational agents, and automation",
      description:
        "EVO builds elegant AI assistants, automation systems, and conversational experiences for modern businesses.",
    },
    nav: {
      services: "Services",
      howItWorks: "How it works",
      useCases: "Use cases",
      contact: "Contact",
    },
    hero: {
      badge: "Evolutionary Virtual Operations",
      eyebrow: "Technology solutions for growing businesses",
      title: "EVO designs digital solutions, automation, and integration for companies that want to operate better.",
      subtitle:
        "We build agents, APIs, automations, websites, apps, and connected systems for sales, support, and real operations.",
      primaryCta: "Request a proposal",
      secondaryCta: "Explore our services",
      stats: [
        { value: "APIs", label: "Integrations and backend" },
        { value: "Web + App", label: "Connected products" },
        { value: "Automation", label: "More efficient operations" },
      ],
    },
    voiceDemo: {
      label: "Maryorie · Consultable demo",
      title: "A space to try a conversational solution in action.",
      description:
        "Maryorie works as a consultation space to answer real questions about your business and explore how EVO could help.",
      browserLanguage: "Detected language",
      activateAudioLabel: "Enable audio and begin",
      activateAudioHint: "The first interaction is required so your browser allows audio playback and listening.",
      composerPlaceholder: "Write a message to Maryorie",
      submitLabel: "Send",
      microphoneLabel: "Speak with Maryorie",
      handsFreeLabel: "Ask about your business, your processes, sales, support, or operations.",
      speakingEnabled: "Voice enabled",
      speakingDisabled: "Voice disabled",
      voiceModeLabel: "Remote AI voice",
      audioUnlockHint: "Tap the page once to enable audio in your browser.",
      audioReadyLabel: "Audio enabled",
      audioPendingLabel: "Audio pending",
      listeningReadyLabel: "Maryorie ready to listen",
      listeningUnavailableLabel: "Listening is unavailable in this browser",
      resumedListeningLabel: "Maryorie resumed listening",
      consultButtonLabel: "Consult Maryorie",
      consultButtonHint: "You can browse normally and activate Maryorie only when you need her.",
      minimizeLabel: "Minimize",
      restoreLabel: "Open Maryorie",
      consultationLabel: "Active consultation",
      micUnsupported: "Your browser does not support voice input in this demo.",
      apiKeyMissing: "OPENAI_API_KEY is missing on the server.",
      errorFallback: "I could not complete the response right now. Please try again.",
      conversationLabel: "Conversation",
      aiVoiceDisclosure: "Maryorie's voice is AI-generated.",
      states: {
        idle: "Idle",
        listening: "Listening",
        processing: "Processing",
        responding: "Responding",
      },
      samplePrompt:
        "Hi, I’m Maryorie. I can help you think through solutions for sales, support, automation, integrations, or digital product. Tell me what your business does and what you want to improve.",
      placeholderTitle: "Architecture ready for real integrations",
      placeholderBody:
        "The flow now talks to OpenAI through secure Next routes. Voice input uses the browser Web Speech API and spoken output uses remote TTS for a more consistent Maryorie voice.",
      integrationNotes: {
        stt: "Browser STT is ready to be replaced by a dedicated provider",
        llm: "LLM connected through app/api/maryorie/route.ts",
        tts: "TTS connected through app/api/maryorie/speech/route.ts",
      },
    },
    sections: {
      whatWeDo: {
        kicker: "What we do",
        title: "AI solutions designed to operate and sell better.",
        description:
          "EVO builds refined and effective conversational layers for companies that want to scale without overloading their teams.",
        items: [
          {
            title: "AI agents",
            body: "Specialized assistants built to resolve questions, qualify opportunities, and support critical journeys.",
          },
          {
            title: "Support automation",
            body: "Faster and more consistent support with guided responses, smart routing, and extended availability.",
          },
          {
            title: "Custom web solutions",
            body: "High-end interfaces ready to prove value, capture leads, and support future integrations.",
          },
          {
            title: "Conversational experiences",
            body: "Voice, text, and hybrid flows crafted for natural, executive-grade, multilingual interactions.",
          },
        ],
      },
      howItWorks: {
        kicker: "How it works",
        title: "A clear journey from the first visit to conversion.",
        steps: [
          {
            title: "1. The visitor arrives",
            body: "The value proposition is visible immediately through a clean and credible interface.",
          },
          {
            title: "2. They talk to Maryorie",
            body: "A voice or text interaction starts from a visible point in the hero section.",
          },
          {
            title: "3. Maryorie understands",
            body: "The flow is prepared to detect language, interpret intent, and add business context.",
          },
          {
            title: "4. Maryorie guides",
            body: "The conversation routes people toward contact, demo, or the right next step.",
          },
        ],
      },
      useCases: {
        kicker: "Use cases",
        title: "High-impact applications for modern businesses.",
        items: [
          "AI-powered customer support",
          "Automated advisory for services and products",
          "Sales assistance and lead pre-qualification",
          "Lead capture from corporate websites",
          "Intelligent assistants for premium digital experiences",
        ],
      },
      finalCta: {
        kicker: "Contact",
        title: "Make your operations evolve with a serious AI experience built to sell.",
        description:
          "Share your goal and we will design an experience with Maryorie, intelligent agents, and automation tailored to your business.",
        formName: "Name",
        formEmail: "Business email",
        formCompany: "Company",
        formMessage: "Tell us what you want to automate",
        button: "Request a conversation",
        note: "Visual form ready to connect later to a backend, CRM, or email service.",
      },
    },
    footer: {
      claim: "EVO · Evolutionary Virtual Operations",
      rights: "Designed for companies seeking an elegant and reliable AI presence.",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
