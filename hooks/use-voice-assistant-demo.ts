"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { inferLandingSection, type LandingSectionId } from "@/lib/maryorie/infer-section";
import type { Locale } from "@/lib/i18n/types";

type DemoState = "idle" | "listening" | "processing" | "responding";
type MaryorieMode = "consultation";
type MaryorieNextStep = "await_question" | "contact" | "idle";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type NavigationTarget = {
  section: LandingSectionId;
  requestId: number;
} | null;

type UseVoiceAssistantDemoOptions = {
  locale: Locale;
  initialMessage: string;
};

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function cleanAssistantText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeForSpeech(text: string) {
  return text.replace(/\bMaryorie\b/gi, "Maryoorii");
}

export function useVoiceAssistantDemo({
  locale,
  initialMessage,
}: UseVoiceAssistantDemoOptions) {
  const [state, setState] = useState<DemoState>("idle");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "intro", role: "assistant", content: initialMessage },
  ]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navigationTarget, setNavigationTarget] = useState<NavigationTarget>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isSpeechRecognitionAvailable, setIsSpeechRecognitionAvailable] = useState(true);
  const [justResumedListening, setJustResumedListening] = useState(false);
  const [previousResponseId, setPreviousResponseId] = useState<string | null>(null);
  const [showConsultButton] = useState(false);
  const [manualConsultEnabled, setManualConsultEnabled] = useState(false);
  const [mode, setMode] = useState<MaryorieMode>("consultation");
  const [nextStep, setNextStep] = useState<MaryorieNextStep>("await_question");
  const [isMinimized, setIsMinimized] = useState(false);

  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);
  const isRecognitionActiveRef = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioUrlRef = useRef<string | null>(null);
  const activeSpeechRequestIdRef = useRef(0);
  const audioUnlockedRef = useRef(false);
  const shouldAutoListenRef = useRef(true);
  const isAssistantSpeakingRef = useRef(false);
  const hasPlayedIntroRef = useRef(false);

  useEffect(() => {
    setMessages([{ id: "intro", role: "assistant", content: initialMessage }]);
    setPreviousResponseId(null);
    setError(null);
    setNavigationTarget(null);
    setManualConsultEnabled(false);
    setMode("consultation");
    setNextStep("await_question");
    setIsMinimized(false);
    hasPlayedIntroRef.current = false;
  }, [initialMessage, locale]);

  const stopCurrentAudio = useCallback(() => {
    activeSpeechRequestIdRef.current += 1;
    currentAudioRef.current?.pause();
    currentAudioRef.current = null;
    isAssistantSpeakingRef.current = false;

    if (currentAudioUrlRef.current) {
      URL.revokeObjectURL(currentAudioUrlRef.current);
      currentAudioUrlRef.current = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const resumeListening = useCallback(() => {
    if (
      !shouldAutoListenRef.current ||
      !audioUnlockedRef.current ||
      !recognitionRef.current ||
      isRecognitionActiveRef.current ||
      isAssistantSpeakingRef.current
    ) {
      return;
    }

    window.setTimeout(() => {
      if (
        !shouldAutoListenRef.current ||
        !audioUnlockedRef.current ||
        !recognitionRef.current ||
        isRecognitionActiveRef.current ||
        isAssistantSpeakingRef.current
      ) {
        return;
      }

      try {
        isRecognitionActiveRef.current = true;
        setState("listening");
        setJustResumedListening(true);
        recognitionRef.current.start();
      } catch {
        isRecognitionActiveRef.current = false;
        setState("idle");
      }
    }, 180);
  }, []);

  useEffect(() => {
    if (!justResumedListening) {
      return;
    }

    const timer = window.setTimeout(() => {
      setJustResumedListening(false);
    }, 1600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [justResumedListening]);

  const speakWithTts = useCallback(async (text: string) => {
    if (!voiceEnabled || !audioUnlockedRef.current) {
      return;
    }

    stopCurrentAudio();
    const speechRequestId = activeSpeechRequestIdRef.current;
    isAssistantSpeakingRef.current = true;

    if (recognitionRef.current && isRecognitionActiveRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      isRecognitionActiveRef.current = false;
    }

    try {
      const response = await fetch("/api/maryorie/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: text,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Remote speech failed.");
      }

      const audioBlob = await response.blob();
      if (activeSpeechRequestIdRef.current !== speechRequestId) {
        return;
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      currentAudioUrlRef.current = audioUrl;

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          if (activeSpeechRequestIdRef.current !== speechRequestId) {
            resolve();
            return;
          }

          if (currentAudioUrlRef.current) {
            URL.revokeObjectURL(currentAudioUrlRef.current);
            currentAudioUrlRef.current = null;
          }

          currentAudioRef.current = null;
          isAssistantSpeakingRef.current = false;
          resumeListening();
          resolve();
        };

        audio.onerror = () => {
          if (activeSpeechRequestIdRef.current !== speechRequestId) {
            resolve();
            return;
          }

          if (currentAudioUrlRef.current) {
            URL.revokeObjectURL(currentAudioUrlRef.current);
            currentAudioUrlRef.current = null;
          }

          currentAudioRef.current = null;
          isAssistantSpeakingRef.current = false;
          resumeListening();
          reject(new Error("Audio playback failed."));
        };

        void audio.play().catch(reject);
      });
    } catch {
      if ("speechSynthesis" in window && audioUnlockedRef.current) {
        await new Promise<void>((resolve) => {
          if (activeSpeechRequestIdRef.current !== speechRequestId) {
            resolve();
            return;
          }

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = locale === "en" ? "en-US" : "es-ES";
          utterance.onend = () => {
            if (activeSpeechRequestIdRef.current !== speechRequestId) {
              resolve();
              return;
            }
            isAssistantSpeakingRef.current = false;
            resumeListening();
            resolve();
          };
          utterance.onerror = () => {
            if (activeSpeechRequestIdRef.current !== speechRequestId) {
              resolve();
              return;
            }
            isAssistantSpeakingRef.current = false;
            resumeListening();
            resolve();
          };

          window.speechSynthesis.speak(utterance);
        });
      }
    }
  }, [locale, resumeListening, stopCurrentAudio, voiceEnabled]);

  const sendPrompt = useCallback(async (requestMessage: string, displayMessage?: string) => {
    if (!requestMessage) {
      return;
    }

    setError(null);
    setState("processing");

    if (displayMessage) {
      setMessages((current) => [
        ...current,
        { id: `user-${Date.now()}`, role: "user", content: displayMessage },
      ]);
    }

    try {
      const response = await fetch("/api/maryorie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: requestMessage,
          locale,
          previousResponseId,
        }),
      });

      const payload = (await response.json()) as {
        id?: string | null;
        reply?: string;
        section?: LandingSectionId | null;
        mode?: MaryorieMode;
        nextStep?: MaryorieNextStep;
        error?: string;
      };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error ?? "Maryorie request failed.");
      }

      const cleanedReply = cleanAssistantText(payload.reply);

      if (payload.section) {
        setNavigationTarget({ section: payload.section, requestId: Date.now() });
      }

      setMode(payload.mode ?? "consultation");
      setNextStep(payload.nextStep ?? "await_question");
      setPreviousResponseId(payload.id ?? null);
      setState("responding");
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: "assistant", content: cleanedReply },
      ]);

      await speakWithTts(normalizeForSpeech(cleanedReply));

      if (!voiceEnabled || !isAssistantSpeakingRef.current) {
        resumeListening();
      }
    } catch {
      setError("Maryorie no pudo responder en este momento.");
      setState("idle");
    }
  }, [locale, previousResponseId, resumeListening, speakWithTts, voiceEnabled]);

  const unlockAudioAndStart = useCallback(() => {
    if (audioUnlockedRef.current) {
      if (!isAssistantSpeakingRef.current) {
        resumeListening();
      }
      return;
    }

    audioUnlockedRef.current = true;
    setAudioUnlocked(true);
    setManualConsultEnabled(true);

    if (!hasPlayedIntroRef.current && voiceEnabled) {
      hasPlayedIntroRef.current = true;
      setNavigationTarget({ section: "top", requestId: Date.now() });
      setState("responding");
      void speakWithTts(initialMessage);
      return;
    }

    resumeListening();
  }, [initialMessage, resumeListening, speakWithTts, voiceEnabled]);

  useEffect(() => {
    const unlockAudio = () => {
      unlockAudioAndStart();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      stopCurrentAudio();
    };
  }, [stopCurrentAudio, unlockAudioAndStart]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;

    if (!SpeechRecognition) {
      setIsSpeechRecognitionAvailable(false);
      return;
    }

    setIsSpeechRecognitionAvailable(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = locale === "en" ? "en-US" : "es-ES";

    recognition.onresult = (event) => {
      if (isAssistantSpeakingRef.current) {
        return;
      }

      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) {
        return;
      }

      stopCurrentAudio();

      const inferredSection = inferLandingSection(transcript);
      if (inferredSection) {
        setNavigationTarget({ section: inferredSection, requestId: Date.now() });
      }

      void sendPrompt(transcript, transcript);
    };

    recognition.onerror = () => {
      isRecognitionActiveRef.current = false;
      setState("idle");
    };

    recognition.onend = () => {
      isRecognitionActiveRef.current = false;
      if (isAssistantSpeakingRef.current) {
        setState("responding");
        return;
      }
      resumeListening();
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [locale, resumeListening, sendPrompt, stopCurrentAudio]);

  const sendMessage = async (rawMessage?: string) => {
    const message = (rawMessage ?? draft).trim();
    if (!message) {
      return;
    }

    setDraft("");
    setManualConsultEnabled(true);
    setMode("consultation");
    setNextStep("await_question");

    const inferredSection = inferLandingSection(message);
    if (inferredSection) {
      setNavigationTarget({ section: inferredSection, requestId: Date.now() });
    }

    await sendPrompt(message, message);
  };

  const progress = useMemo(() => {
    switch (state) {
      case "listening":
        return 40;
      case "processing":
        return 70;
      case "responding":
        return 100;
      default:
        return 12;
    }
  }, [state]);

  return {
    state,
    draft,
    error,
    messages,
    progress,
    voiceEnabled,
    audioUnlocked,
    navigationTarget,
    isSpeechRecognitionAvailable,
    justResumedListening,
    showConsultButton,
    manualConsultEnabled,
    guidedTourActive: false,
    mode,
    nextStep,
    isMinimized,
    setDraft,
    sendMessage,
    activateExperience: unlockAudioAndStart,
    activateManualConsult: () => {
      setManualConsultEnabled(true);
      setMode("consultation");
      setNextStep("await_question");
      setIsMinimized(false);
      shouldAutoListenRef.current = true;
      resumeListening();
    },
    toggleMinimized: () => setIsMinimized((current) => !current),
    startListening: resumeListening,
    toggleVoice: () => setVoiceEnabled((current) => !current),
  };
}
