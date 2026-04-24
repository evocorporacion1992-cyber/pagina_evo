import type { Metadata } from "next";
import { headers } from "next/headers";

import { SectionHeading } from "@/components/ui/section-heading";
import { VoiceAssistantDemo } from "@/components/voice-assistant-demo";
import { detectLocale } from "@/lib/i18n/detect-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

async function getLocale(): Promise<Locale> {
  const headerStore = await headers();
  return detectLocale(headerStore.get("accept-language"));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getDictionary(locale);

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    openGraph: {
      title: copy.seo.title,
      description: copy.seo.description,
    },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const copy = getDictionary(locale);
  const isSpanish = locale === "es";

  const solutionPillars = isSpanish
    ? [
        {
          title: "Agentes y automatización",
          body: "Diseñamos asistentes y flujos que responden, filtran, guían y ejecutan tareas reales.",
        },
        {
          title: "Integración y creación de APIs",
          body: "Conectamos herramientas existentes y construimos capas backend listas para escalar.",
        },
        {
          title: "Web, móvil y producto digital",
          body: "Creamos webs, apps y sistemas donde la tecnología está alineada con operación y conversión.",
        },
      ]
    : [
        {
          title: "Agents and automation",
          body: "We design assistants and flows that answer, qualify, guide, and execute real tasks.",
        },
        {
          title: "API integration and creation",
          body: "We connect existing tools and build backend layers ready to scale.",
        },
        {
          title: "Web, mobile, and digital product",
          body: "We build websites, apps, and systems where technology supports operations and conversion.",
        },
      ];

  const capabilityCards = isSpanish
    ? [
        {
          title: "Agentes de IA",
          body: "Asistentes para ventas, soporte, captación y operaciones internas.",
        },
        {
          title: "Integración de APIs",
          body: "Conectamos CRMs, ERPs, WhatsApp, calendarios, pagos y servicios existentes.",
        },
        {
          title: "Creación de APIs",
          body: "Diseñamos capas backend listas para automatización, portales y experiencias conversacionales.",
        },
        {
          title: "Web, móvil y landing con IA",
          body: "Creamos productos digitales donde la IA no es decorativa: guía, responde y convierte.",
        },
      ]
    : [
        {
          title: "AI agents",
          body: "Assistants for sales, support, lead capture, and internal operations.",
        },
        {
          title: "API integration",
          body: "We connect CRMs, ERPs, WhatsApp, calendars, payments, and existing services.",
        },
        {
          title: "API creation",
          body: "We design backend layers ready for automation, portals, and conversational experiences.",
        },
        {
          title: "Web, mobile, and AI-powered landing pages",
          body: "We build digital products where AI is not decorative: it guides, answers, and converts.",
        },
      ];

  const solutionPackages = isSpanish
    ? [
        {
          name: "Solución puntual",
          body: "Para negocios que necesitan resolver un cuello de botella concreto: atención, leads, integraciones o automatización operativa.",
          fit: "Ideal para validar rápido",
        },
        {
          name: "Sistema conectado",
          body: "Para empresas que necesitan unir frontend, backend, APIs, automatizaciones y agentes dentro de un flujo coherente.",
          fit: "Ideal para crecer con orden",
        },
        {
          name: "Producto a medida",
          body: "Para equipos que buscan una web, app o plataforma propia con inteligencia, integraciones y experiencia lista para vender.",
          fit: "Ideal para construir ventaja real",
        },
      ]
    : [
        {
          name: "Focused solution",
          body: "For businesses that need to solve a specific bottleneck: support, lead handling, integrations, or operational automation.",
          fit: "Best for fast validation",
        },
        {
          name: "Connected system",
          body: "For companies that need to unify frontend, backend, APIs, automations, and agents into one coherent flow.",
          fit: "Best for structured growth",
        },
        {
          name: "Custom product",
          body: "For teams looking for a website, app, or platform with intelligence, integrations, and an experience built to sell.",
          fit: "Best for building real advantage",
        },
      ];

  const processComparison = isSpanish
    ? [
        {
          current: "Consultas que llegan por varios canales y se responden tarde.",
          evo: "Un solo flujo conectado que responde, filtra y dirige al siguiente paso.",
        },
        {
          current: "Herramientas separadas, procesos manuales y poca trazabilidad.",
          evo: "Integraciones y APIs que conectan operación, ventas y atención.",
        },
        {
          current: "Web o landing que informa, pero no opera.",
          evo: "Producto digital que informa, captura, automatiza y convierte.",
        },
      ]
    : [
        {
          current: "Inquiries arrive through multiple channels and get answered late.",
          evo: "One connected flow that responds, qualifies, and routes the next step.",
        },
        {
          current: "Disconnected tools, manual processes, and low visibility.",
          evo: "Integrations and APIs that connect operations, sales, and support.",
        },
        {
          current: "A website or landing page that informs, but does not operate.",
          evo: "A digital product that informs, captures, automates, and converts.",
        },
      ];

  const roiPoints = isSpanish
    ? [
        "120 leads mensuales hoy atendidos manualmente",
        "Respuesta promedio actual: 18 minutos",
        "Con EVO: respuesta inmediata, precalificación y agenda automática",
        "Si conviertes 8 clientes extra al mes con ticket de $350, sumas $2,800 mensuales",
      ]
    : [
        "120 monthly leads currently handled manually",
        "Current average response time: 18 minutes",
        "With EVO: immediate response, lead qualification, and automatic booking",
        "If you convert 8 extra clients per month at a $350 ticket, that is $2,800 monthly",
      ];

  return (
    <main className="grid-glow relative isolate overflow-hidden">
      <div className="hero-orb left-[-8rem] top-[4rem] h-[20rem] w-[20rem] bg-[radial-gradient(circle,rgba(217,204,180,0.22),transparent_70%)]" />
      <div className="hero-orb right-[-5rem] top-[18rem] h-[22rem] w-[22rem] bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-18 pt-6 sm:px-8 lg:px-10">
        <header className="glass-panel sticky top-4 z-30 mt-1 flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 font-[family-name:var(--font-display)] text-base text-white">
              EVO
            </span>
            <div className="hidden sm:block">
              <p className="font-[family-name:var(--font-display)] text-base text-white">EVO</p>
              <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[var(--muted)]">
                {copy.hero.badge}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-[var(--muted)] md:flex">
            <a href="#services">{copy.nav.services}</a>
            <a href="#how-it-works">{copy.nav.howItWorks}</a>
            <a href="#use-cases">{copy.nav.useCases}</a>
            <a href="#contact">{copy.nav.contact}</a>
          </nav>
        </header>

        <div
          id="top"
          className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-16"
        >
          <div className="max-w-3xl">
            <div className="premium-chip inline-flex rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {copy.hero.eyebrow}
            </div>

            <h1 className="mt-8 max-w-4xl font-[family-name:var(--font-display)] text-[3.4rem] leading-[0.92] text-white sm:text-[4.6rem] lg:text-[6.1rem]">
              {copy.hero.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              {copy.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-semibold text-black transition hover:opacity-90"
              >
                {copy.hero.primaryCta}
              </a>
              <a
                href="#services"
                className="premium-chip inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {copy.hero.stats.map((stat) => (
                <div key={stat.label} className="story-card rounded-[1.6rem] p-5">
                  <p className="font-[family-name:var(--font-display)] text-xl text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-6">
              <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                <div className="space-y-5">
                  <div className="premium-chip inline-flex rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.26em] text-[var(--accent)]">
                    {isSpanish ? "Soluciones EVO" : "EVO solutions"}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                      {isSpanish ? "Enfoque" : "Focus"}
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-white">
                      {isSpanish
                        ? "Vendemos soluciones listas para operar, integrar y convertir."
                        : "We sell solutions built to operate, integrate, and convert."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {solutionPillars.map((path) => (
                    <div key={path.title} className="story-card rounded-[1.4rem] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                        EVO
                      </p>
                      <p className="mt-3 font-[family-name:var(--font-display)] text-xl text-white">
                        {path.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                        {path.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeading
            kicker={isSpanish ? "Tipos de solución" : "Solution types"}
            title={
              isSpanish
                ? "No vendemos una sola pieza. Diseñamos la solución que tu operación realmente necesita."
                : "We do not sell one fixed piece. We design the solution your operation actually needs."
            }
            description={
              isSpanish
                ? "Algunas empresas necesitan automatizar una parte del proceso. Otras necesitan integrar todo el sistema."
                : "Some companies need one part of the process automated. Others need the whole system connected."
            }
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {solutionPackages.map((item) => (
              <article key={item.name} className="story-card rounded-[1.8rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">EVO</p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-white">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                  {item.fit}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-6 sm:px-8 lg:px-10">
        <div className="glass-panel rounded-[2.2rem] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                Evolutionary Virtual Operations
              </p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight text-white sm:text-4xl">
                {isSpanish
                  ? "EVO diseña soluciones donde agentes, APIs y producto digital trabajan juntos."
                  : "EVO designs solutions where agents, APIs, and digital product work together."}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="story-card rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">01</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {isSpanish
                    ? "El visitante entiende en segundos qué hace EVO."
                    : "The visitor understands what EVO does in seconds."}
                </p>
              </div>
              <div className="story-card rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">02</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {isSpanish
                    ? "Cada solución se diseña para integrarse con la operación real del negocio."
                    : "Each solution is designed to integrate with the business's real operations."}
                </p>
              </div>
              <div className="story-card rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">03</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {isSpanish
                    ? "La demo con Maryorie queda como espacio de prueba, no como el producto principal."
                    : "The Maryorie demo stays as a test space, not as the main product."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 sm:px-8 lg:px-10"
      >
        <SectionHeading
          kicker={copy.sections.whatWeDo.kicker}
          title={
            isSpanish
              ? "Lo que construimos para negocios que quieren operar mejor con IA."
              : "What we build for businesses that want to operate better with AI."
          }
          description={
            isSpanish
              ? "Desde agentes y automatización hasta APIs, webs, apps y landings con inteligencia artificial integrada de verdad."
              : "From agents and automation to APIs, websites, apps, and landing pages with real integrated intelligence."
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {capabilityCards.map((item) => (
              <article key={item.title} className="story-card rounded-[1.9rem] p-7">
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">EVO</p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="glass-panel rounded-[1.9rem] p-7">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
              {isSpanish ? "Qué cambia en la práctica" : "What changes in practice"}
            </p>
            <div className="section-divider my-6" />
            <div className="space-y-5">
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {isSpanish ? "Menos fricción" : "Less friction"}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {isSpanish
                    ? "Tus visitantes entienden qué resuelves y pueden actuar en segundos."
                    : "Visitors understand what you solve and can act in seconds."}
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {isSpanish ? "Más integración" : "More integration"}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {isSpanish
                    ? "La IA conversa, consulta datos, dispara acciones y se conecta con tu stack real."
                    : "AI can talk, query data, trigger actions, and connect to your real stack."}
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {isSpanish ? "Más conversión" : "More conversion"}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {isSpanish
                    ? "La experiencia puede cerrar el paso natural hacia lead, demo, venta o soporte."
                    : "The experience can drive a natural next step toward lead, demo, sale, or support."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="glass-panel rounded-[2.2rem] p-8 sm:p-10 lg:p-14">
          <SectionHeading
            kicker={copy.sections.howItWorks.kicker}
            title={
              isSpanish
                ? "Cómo pasamos de una idea de IA a una experiencia útil para negocio."
                : "How we move from an AI idea to a useful business experience."
            }
          />

          <div className="mt-12 grid gap-5 xl:grid-cols-4">
            {copy.sections.howItWorks.steps.map((step) => (
              <div key={step.title} className="story-card rounded-[1.7rem] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="glass-panel rounded-[2.2rem] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading
              kicker={isSpanish ? "Impacto" : "Impact"}
              title={
                isSpanish
                  ? "Un ejemplo práctico de cuánto podrías ganar integrando IA con EVO."
                  : "A practical example of how much you could gain by integrating AI with EVO."
              }
              description={
                isSpanish
                  ? "No es una promesa universal. Es una forma simple de visualizar el costo de seguir operando igual."
                  : "Not a universal promise. A simple way to visualize the cost of staying manual."
              }
            />

            <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
              <div className="story-card rounded-[1.8rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  {isSpanish ? "Escenario" : "Scenario"}
                </p>
                <div className="mt-5 space-y-4">
                  {roiPoints.map((point) => (
                    <p key={point} className="text-sm leading-7 text-[var(--foreground)]">
                      {point}
                    </p>
                  ))}
                </div>
              </div>

              <div className="story-card rounded-[1.8rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  {isSpanish ? "Lectura ejecutiva" : "Executive view"}
                </p>
                <p className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-none text-white">
                  +$2,800
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {isSpanish
                    ? "Solo por responder antes, filtrar mejor y no perder oportunidades que hoy se enfrían."
                    : "Just by responding faster, qualifying better, and not losing opportunities that cool off today."}
                </p>
                <div className="section-divider my-6" />
                <p className="text-sm leading-7 text-[var(--foreground)]">
                  {isSpanish
                    ? "EVO puede construir esa capa de captación y operación sobre tu web, tu landing, tu app o tus APIs."
                    : "EVO can build that capture and operations layer on top of your website, landing page, app, or APIs."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="glass-panel rounded-[2.2rem] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeading
              kicker={isSpanish ? "Proceso actual vs EVO" : "Current process vs EVO"}
              title={
                isSpanish
                  ? "La diferencia no es solo tecnológica. Es operativa."
                  : "The difference is not only technical. It is operational."
              }
              description={
                isSpanish
                  ? "Esto es lo que cambia cuando pasas de procesos sueltos a una solución conectada."
                  : "This is what changes when you move from disconnected processes to a connected solution."
              }
            />

            <div className="grid gap-4">
              {processComparison.map((item) => (
                <div
                  key={item.current}
                  className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-white/3 p-5 md:grid-cols-2"
                >
                  <div className="rounded-[1.3rem] border border-white/8 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      {isSpanish ? "Proceso actual" : "Current process"}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{item.current}</p>
                  </div>
                  <div className="rounded-[1.3rem] border border-[var(--accent-soft)] bg-[var(--accent-soft)] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/80">EVO</p>
                    <p className="mt-3 text-sm leading-7 text-white">{item.evo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="maryorie"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            kicker={isSpanish ? "Demo y consulta" : "Demo and consultation"}
            title={
              isSpanish
                ? "Prueba a Maryorie como demostración de cómo una solución conversacional puede integrarse en tu negocio."
                : "Try Maryorie as a demonstration of how a conversational solution can be integrated into your business."
            }
            description={
              isSpanish
                ? "Este espacio existe para explorar una demo guiada, resolver dudas y visualizar cómo EVO podría adaptar algo similar a tu operación."
                : "This space exists to explore a guided demo, answer questions, and visualize how EVO could adapt something similar to your operation."
            }
          />

          <VoiceAssistantDemo locale={locale} copy={copy.voiceDemo} />
        </div>
      </section>

      <section
        id="use-cases"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeading
            kicker={copy.sections.useCases.kicker}
            title={copy.sections.useCases.title}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {copy.sections.useCases.items.map((item, index) => (
              <div key={item} className="story-card rounded-[1.7rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  Caso {index + 1}
                </p>
                <p className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="glass-panel rounded-[2.3rem] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="max-w-2xl">
              <SectionHeading
                kicker={copy.sections.finalCta.kicker}
                title={
                  isSpanish
                    ? "Si tu operación ya te está pidiendo una solución mejor, este es el momento de diseñarla."
                    : "If your operation is already demanding a better solution, this is the moment to design it."
                }
                description={
                  isSpanish
                    ? "Cuéntanos qué necesitas resolver y EVO te propondrá una solución concreta para integrar, automatizar o vender mejor."
                    : "Tell us what you need to solve and EVO will propose a concrete solution to integrate, automate, or sell better."
                }
              />

              <div className="story-card mt-8 rounded-[1.7rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  {isSpanish ? "Próximo paso" : "Next step"}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {isSpanish
                    ? "No necesitas otra idea suelta. Necesitas una solución que funcione dentro de tu negocio y genere resultado."
                    : "You do not need another isolated idea. You need a solution that works inside your business and drives results."}
                </p>
              </div>
            </div>

            <form className="story-card grid gap-4 rounded-[1.9rem] p-6">
              <input
                type="text"
                placeholder={copy.sections.finalCta.formName}
                className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
              <input
                type="email"
                placeholder={copy.sections.finalCta.formEmail}
                className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
              <input
                type="text"
                placeholder={copy.sections.finalCta.formCompany}
                className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
              <textarea
                rows={5}
                placeholder={copy.sections.finalCta.formMessage}
                className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-semibold text-black transition hover:opacity-90"
              >
                {copy.sections.finalCta.button}
              </button>
              <p className="text-sm leading-7 text-[var(--muted)]">{copy.sections.finalCta.note}</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 pb-12 pt-4 text-sm text-[var(--muted)] sm:px-8 lg:px-10">
        <div className="section-divider mb-6" />
        <p className="font-[family-name:var(--font-display)] text-white">{copy.footer.claim}</p>
        <p>{copy.footer.rights}</p>
      </footer>
    </main>
  );
}
