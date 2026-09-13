import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Empty payload" }, { status: 400 });

    // Connects to your public HF Space
    const client = await Client.connect("ai-sovereign-x/Lumina-1-Executive-Core");
    const result = await client.predict("/process_pass", [text]);
    
    return NextResponse.json({ data: result.data });
  } catch (error: any) {
    console.error("Execution Error:", error);
    return NextResponse.json({ error: "Executive Core unreachable." }, { status: 500 });
  }
}
