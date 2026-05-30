import { NextRequest } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  challenge: {
    title: string;
    description: string;
    instructions: string;
    hint: string;
  };
  code: string;
}

export async function POST(request: NextRequest) {
  const { messages, challenge, code }: ChatRequest = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({
      reply: fallbackMentorReply(messages, challenge, code),
    });
  }

  const systemPrompt = `You are a friendly and encouraging Rust programming mentor. You are helping a student with the following challenge:

Title: ${challenge.title}
Description: ${challenge.description}
Instructions: ${challenge.instructions}

The student's current code is:
\`\`\`rust
${code}
\`\`\`

STRICT RULES - YOU MUST FOLLOW THESE:
- NEVER give the student a complete working solution or the full code that solves the challenge.
- NEVER write out the entire main() function or the exact code they need to submit.
- If the student asks for the full code, the answer, or "just show me", politely refuse and give a tiny, partial hint instead (1-2 lines max).
- Give very small hints, point out what concept to use, or ask them a guiding question.
- You may show tiny syntax examples for unrelated concepts, but never the actual solution code for this challenge.
- If their code is close, tell them what's missing without writing the missing lines for them.
- Keep responses short. Be encouraging but do not do their work.

If the student is asking for the direct solution, respond with something like: "I can't give you the full code, but here's a small hint..." and then give one very limited clue.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return Response.json({
        reply: fallbackMentorReply(messages, challenge, code),
      });
    }

    const data = await response.json();
    return Response.json({
      reply: data.choices?.[0]?.message?.content || "I couldn't generate a response.",
    });
  } catch {
    return Response.json({
      reply: fallbackMentorReply(messages, challenge, code),
    });
  }
}

function fallbackMentorReply(
  messages: ChatMessage[],
  challenge: { title: string; hint: string; instructions: string },
  code: string
): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

  // Detect requests for full solutions / answers
  const wantsFullSolution = 
    lastMessage.includes("full code") ||
    lastMessage.includes("complete code") ||
    lastMessage.includes("give me the code") ||
    lastMessage.includes("show me the code") ||
    lastMessage.includes("what's the answer") ||
    lastMessage.includes("the solution") ||
    lastMessage.includes("just write") ||
    lastMessage.includes("just show me");

  if (wantsFullSolution) {
    return `I can't give you the full solution for "${challenge.title}". That would defeat the purpose of the exercise.\n\nTry this instead: ${challenge.hint}\n\nWrite a small piece and run it — the compiler errors will guide you.`;
  }

  if (lastMessage.includes("hint")) {
    return `Here's a hint for "${challenge.title}":\n\n${challenge.hint}`;
  }

  if (lastMessage.includes("explain") || lastMessage.includes("concept")) {
    return `This challenge is about: ${challenge.instructions}\n\nThe key concept here is understanding how Rust handles this pattern. Try reading the hint if you need more specific guidance!`;
  }

  if (lastMessage.includes("wrong") || lastMessage.includes("error") || lastMessage.includes("help")) {
    if (code.trim() === "" || code.includes("// ")) {
      return "It looks like you haven't filled in all the code yet. Look at the comments in the starter code — each one tells you what to write. Start with the first comment and work your way down.";
    }
    return `Let me help! Here's the hint for this challenge:\n\n${challenge.hint}\n\nTry running your code to see the specific error message — that will help narrow down the issue.`;
  }

  return `I'm here to help with "${challenge.title}"! You can ask me:\n• "Give me a hint"\n• "Explain the concept"\n• "What's wrong with my code?"\n\n(Note: For full AI mentorship, add your OpenAI API key to the .env.local file)`;
}
