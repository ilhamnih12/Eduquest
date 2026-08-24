import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.GEMINI_API_KEY;
  const hasKey = !!key && typeof key === 'string';
  const trimmed = hasKey ? key.trim() : '';
  const isPlaceholder = trimmed === '' || trimmed === 'your-gemini-api-key';

  let geminiResult = 'not_attempted';

  if (!isPlaceholder && trimmed.length > 0) {
    try {
      // Dynamic import to avoid loading SDK if env missing
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(trimmed);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: 'Say hi' }] }] });
      const reply = result.response.text();
      geminiResult = reply?.length > 0 ? 'gemini_responded_ok' : 'gemini_empty';
    } catch (e: any) {
      geminiResult = 'gemini_error: ' + (e?.message || String(e));
    }
  }

  return NextResponse.json({
    envName: 'GEMINI_API_KEY',
    detected: hasKey,
    trimmedLength: trimmed.length,
    startsWithAIza: trimmed.startsWith('AIzaSy'),
    isPlaceholder: isPlaceholder,
    isEmptyAfterTrim: trimmed === '',
    geminiTest: geminiResult,
    note: isPlaceholder ? 'Key belum di-set atau masih placeholder' : (trimmed.length > 0 ? 'Key terdeteksi (tidak ditampilkan)' : 'Key kosong'),
  });
}
