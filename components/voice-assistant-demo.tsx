"use client";

import { useEffect, useMemo, useRef } from "react";

import { useVoiceAssistantDemo } from "@/hooks/use-voice-assistant-demo";
import {
  inferLandingSection,
  type LandingSectionId,
} from "@/lib/maryorie/infer-section";
import type { Locale } from "@/lib/i18n/types";

type VoiceAssistantDemoProps = {
  locale: Locale;
  copy: {
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
};

export function VoiceAssistantDemo({ locale, copy }: VoiceAssistantDemoProps) {
  const {
    draft,
    error,
    isSpeechRecognitionAvailable,
    messages,
    progress,
    navigationTarget,
    audioUnlocked,
    justResumedListening,
    showConsultButton,
    manualConsultEnabled,
    guidedTourActive,
    mode,
    nextStep,
    isMinimized,
    sendMessage,
    setDraft,
    state,
    toggleVoice,
    voiceEnabled,
    activateExperience,
    activateManualConsult,
    toggleMinimized,
  } = useVoiceAssistantDemo({
    locale,
    initialMessage: copy.samplePrompt,
  });
  const highlightTimeoutRef = useRef<number | null>(null);

  const stateLabel = useMemo(() => copy.states[state], [copy.states, state]);
  const isPopupVisible =
    (guidedTourActive || manualConsultEnabled) &&
    (state === "listening" || state === "processing" || state === "responding");
  const isFloating = guidedTourActive || manualConsultEnabled;
  const floatingTitle = copy.consultationLabel;
  const stepLabel =
    nextStep === "contact"
        ? locale === "en"
          ? "Contact"
          : "Contacto"
        : copy.consultationLabel;
  const errorLabel =
    error === "OPENAI_API_KEY is not configured on the server." ? copy.apiKeyMissing : error;
  const navigateToSection = (section: LandingSectionId) => {
    const sectionElement = document.getElementById(section);

    if (!sectionElement) {
      return;
    }

    const runNavigation = () => {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      sectionElement.classList.remove("section-spotlight");
      void sectionElement.offsetWidth;
      sectionElement.classList.add("section-spotlight");
    };

    window.history.replaceState(null, "", `#${section}`);
    runNavigation();
    window.setTimeout(runNavigation, 180);

    if (highlightTimeoutRef.current) {
      window.clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = window.setTimeout(() => {
      sectionElement.classList.remove("section-spotlight");
    }, 1600);
  };

  useEffect(() => {
    if (!navigationTarget) {
      return;
    }

    navigateToSection(navigationTarget.section);
  }, [navigationTarget]);

  const shellClassName = isPopupVisible
    ? `voice-popup soft-ring fixed bottom-4 left-4 right-4 z-50 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.94),rgba(18,18,18,0.88))] p-5 shadow-[0_32px_120px_rgba(0,0,0,0.52)] backdrop-blur-2xl sm:left-auto sm:right-6 sm:w-[26rem] sm:p-6 ${isMinimized ? "voice-popup-minimized pointer-events-none opacity-0 translate-y-4" : "voice-popup-open"}`
    : "soft-ring animated-float relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[var(--shadow)] backdrop-blur-xl sm:p-8";

  return (
    <>
      {isFloating && isMinimized ? (
        <button
          type="button"
          onClick={toggleMinimized}
          className="voice-popup-pill fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(12,12,12,0.92)] px-4 py-3 text-sm text-white shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
        >
          <span className="pulse-dot inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span>{copy.restoreLabel}</span>
        </button>
      ) : null}
      <div className={shellClassName}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{copy.label}</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
              {copy.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {isFloating ? (
              <span className="hidden rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--muted)] sm:block">
                {floatingTitle}
              </span>
            ) : null}
            <div className="hidden rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-[var(--muted)] sm:block">
              {copy.browserLanguage}: {locale.toUpperCase()}
            </div>
            {isFloating ? (
              <button
                type="button"
                onClick={toggleMinimized}
                className="rounded-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-white"
              >
                {copy.minimizeLabel}
              </button>
            ) : null}
          </div>
        </div>

        <p className="max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          {copy.description}
        </p>

        {!audioUnlocked ? (
          <div className="glass-panel rounded-[1.6rem] border border-[var(--accent-soft)] px-5 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{copy.activateAudioLabel}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {copy.activateAudioHint}
                </p>
              </div>
              <button
                type="button"
                onClick={activateExperience}
                className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                {copy.activateAudioLabel}
              </button>
            </div>
          </div>
        ) : null}

        <div className={`grid gap-6 ${isPopupVisible ? "" : "lg:grid-cols-[1.2fr_0.8fr]"}`}>
          <div className="rounded-[1.6rem] border border-white/10 bg-black/30 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="pulse-dot inline-flex h-3 w-3 rounded-full bg-[var(--accent)]" />
                  <span className="text-sm font-medium text-white">{stateLabel}</span>
                </div>
                <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Maryorie
                </span>
              </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#d6c6a8,#ffffff)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  {copy.conversationLabel}
                </p>
                <button
                  type="button"
                  onClick={toggleVoice}
                  className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white"
                >
                  {voiceEnabled ? copy.speakingEnabled : copy.speakingDisabled}
                </button>
              </div>
              <p className="mb-3 text-xs text-[var(--muted)]">
                {copy.voiceModeLabel} · {copy.aiVoiceDisclosure}
              </p>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white">
                  {audioUnlocked ? copy.audioReadyLabel : copy.audioPendingLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white">
                  {isSpeechRecognitionAvailable
                    ? copy.listeningReadyLabel
                    : copy.listeningUnavailableLabel}
                </span>
                {isFloating ? (
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white">
                    {floatingTitle}
                  </span>
                ) : null}
                {isFloating ? (
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white">
                    {stepLabel}
                  </span>
                ) : null}
              </div>
              {justResumedListening ? (
                <div className="mb-3 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-2 text-xs font-medium text-white">
                  {copy.resumedListeningLabel}
                </div>
              ) : null}

              <div className="max-h-[22rem] space-y-3 overflow-y-auto rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[92%] rounded-[1.1rem] px-4 py-3 text-sm leading-7 ${
                      message.role === "assistant"
                        ? "border border-white/8 bg-white/8 text-[var(--foreground)]"
                        : "ml-auto bg-[var(--accent-soft)] text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {errorLabel ? (
                  <div className="rounded-[1.1rem] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-7 text-red-100">
                    {errorLabel || copy.errorFallback}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <textarea
                rows={3}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={copy.composerPlaceholder}
                className="rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-4 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    const inferredSection = inferLandingSection(draft);

                    if (inferredSection) {
                      navigateToSection(inferredSection);
                    }

                    void sendMessage();
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  {copy.submitLabel}
                </button>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-white/4 px-4 py-3 text-sm text-[var(--muted)]">
                {copy.handsFreeLabel}
              </div>
              {showConsultButton && !manualConsultEnabled ? (
                <div className="grid gap-3 rounded-[1rem] border border-white/10 bg-white/4 p-4">
                  <p className="text-sm text-[var(--muted)]">{copy.consultButtonHint}</p>
                  <button
                    type="button"
                    onClick={activateManualConsult}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    {copy.consultButtonLabel}
                  </button>
                </div>
              ) : null}
              <p className="text-xs text-[var(--muted)]">{copy.audioUnlockHint}</p>
              {!isSpeechRecognitionAvailable ? (
                <p className="text-sm text-[var(--muted)]">{copy.micUnsupported}</p>
              ) : null}
            </div>
          </div>

          <div className={`grid gap-4 ${isPopupVisible ? "hidden" : ""}`}>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/4 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {copy.placeholderTitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{copy.placeholderBody}</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/4 p-5">
              <ul className="space-y-3 text-sm text-[var(--foreground)]">
                <li>{copy.integrationNotes.stt}</li>
                <li>{copy.integrationNotes.llm}</li>
                <li>{copy.integrationNotes.tts}</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
