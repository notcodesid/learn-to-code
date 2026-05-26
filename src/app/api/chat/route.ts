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

Guidelines:
- Be encouraging but honest about mistakes
- Give hints rather than complete solutions
- Explain Rust concepts clearly with examples
- If the student asks for help, guide them step by step
- Reference specific lines in their code when giving feedback
- Keep responses concise (2-4 paragraphs max)
- Use code snippets sparingly — prefer explanations
- If the code is correct, congratulate them and explain why it works`;

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
