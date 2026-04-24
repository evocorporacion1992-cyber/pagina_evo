import { NextResponse } from "next/server";

import { buildMaryorieSystemPrompt } from "@/lib/maryorie/system-prompt";
import type { Locale } from "@/lib/i18n/types";

type MaryorieRequest = {
  message?: string;
  locale?: Locale;
  previousResponseId?: string | null;
};

type LandingSectionId = "top" | "services" | "how-it-works" | "use-cases" | "contact";
type MaryorieMode = "consultation";
type MaryorieNextStep = "await_question" | "contact" | "idle";

type ResponsesApiOutput = {
  id?: string;
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

function extractOutputText(payload: ResponsesApiOutput) {
  if (typeof payload.output_text === "string" && payload.output_text.trim().length > 0) {
    return payload.output_text.trim();
  }

  const text = payload.output
    ?.flatMap((item) => item.content ?? [])
    .filter((content) => content.type === "output_text" && typeof content.text === "string")
    .map((content) => content.text?.trim() ?? "")
    .filter(Boolean)
    .join("\n\n");

  return text && text.length > 0 ? text : null;
}

function parseStructuredReply(rawReply: string) {
  try {
    const parsed = JSON.parse(rawReply) as {
      text?: string;
      section?: LandingSectionId | null;
      mode?: MaryorieMode;
      nextStep?: MaryorieNextStep;
    };

    const validSections = new Set<LandingSectionId | null>([
      "top",
      "services",
      "how-it-works",
      "use-cases",
      "contact",
      null,
    ]);
    const validModes = new Set<MaryorieMode>(["consultation"]);
    const validNextSteps = new Set<MaryorieNextStep>(["await_question", "contact", "idle"]);

    if (
      typeof parsed.text !== "string" ||
      !validSections.has((parsed.section ?? null) as LandingSectionId | null) ||
      !validModes.has((parsed.mode ?? "consultation") as MaryorieMode) ||
      !validNextSteps.has((parsed.nextStep ?? "idle") as MaryorieNextStep)
    ) {
      return null;
    }

    return {
      text: parsed.text.trim(),
      section: (parsed.section ?? null) as LandingSectionId | null,
      mode: (parsed.mode ?? "consultation") as MaryorieMode,
      nextStep: (parsed.nextStep ?? "idle") as MaryorieNextStep,
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-5.4-mini";

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as MaryorieRequest;
  const message = body.message?.trim();
  const locale = body.locale === "en" ? "en" : "es";

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions: buildMaryorieSystemPrompt(locale),
      input: message,
      previous_response_id: body.previousResponseId ?? undefined,
      reasoning: {
        effort: "none",
      },
      text: {
        verbosity: "low",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "OpenAI request failed.",
        details: errorText,
      },
      { status: response.status },
    );
  }

  const payload = (await response.json()) as ResponsesApiOutput;
  const reply = extractOutputText(payload);

  if (!reply) {
    return NextResponse.json(
      { error: "OpenAI returned no assistant text." },
      { status: 502 },
    );
  }

  const structuredReply = parseStructuredReply(reply);

  if (!structuredReply) {
    return NextResponse.json(
      { error: "OpenAI returned invalid structured output.", rawReply: reply },
      { status: 502 },
    );
  }

  return NextResponse.json({
    id: payload.id ?? null,
    reply: structuredReply.text,
    section: structuredReply.section,
    mode: structuredReply.mode,
    nextStep: structuredReply.nextStep,
  });
}
