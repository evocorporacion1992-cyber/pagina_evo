import { NextResponse } from "next/server";

type SpeechRequest = {
  input?: string;
  locale?: "es" | "en";
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts";
  const voice = process.env.OPENAI_TTS_VOICE ?? "coral";

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as SpeechRequest;
  const input = body.input?.trim();
  const locale = body.locale === "en" ? "en" : "es";

  if (!input) {
    return NextResponse.json({ error: "Input is required." }, { status: 400 });
  }

  const instructions =
    locale === "en"
      ? "Speak with a premium, warm, executive, feminine tone. Sound calm, trustworthy, and modern. If the name Maryorie appears, pronounce it as Maryoorii."
      : "Habla con un tono femenino, premium, calido, ejecutivo y moderno. Debes sonar confiable, claro y profesional. Si aparece el nombre Maryorie, pronuncialo como Maryorii.";

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      voice,
      input,
      instructions,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "OpenAI speech request failed.",
        details: errorText,
      },
      { status: response.status },
    );
  }

  const audioBuffer = await response.arrayBuffer();

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
