import { NextResponse } from 'next/server';
import { DEFAULT_GEMINI_MODEL, generateGeminiText } from '@/lib/ai/gemini';

export async function GET() {
  const key = process.env.GEMINI_API_KEY;
  const hasKey = !!key && typeof key === 'string';
  const trimmed = hasKey ? key.trim() : '';
  const isPlaceholder = trimmed === '' || trimmed === 'your-gemini-api-key';

  let geminiResult = 'not_attempted';

  if (!isPlaceholder && trimmed.length > 0) {
    try {
      const reply = await generateGeminiText(trimmed, 'Say hi in one short sentence.', {
        temperature: 0.2,
        maxOutputTokens: 40,
      });
      geminiResult = reply.length > 0 ? 'gemini_responded_ok' : 'gemini_empty';
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      geminiResult = 'gemini_error: ' + message;
    }
  }

  const keyFormat = trimmed.startsWith('AQ.')
    ? 'auth_key_AQ'
    : trimmed.startsWith('AIza')
      ? 'legacy_standard_AIza'
      : trimmed
        ? 'unknown_prefix'
        : 'missing';

  return NextResponse.json({
    envName: 'GEMINI_API_KEY',
    detected: hasKey,
    trimmedLength: trimmed.length,
    keyFormat,
    startsWithAIza: trimmed.startsWith('AIzaSy'),
    startsWithAQ: trimmed.startsWith('AQ.'),
    preferredModel: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
    isPlaceholder: isPlaceholder,
    isEmptyAfterTrim: trimmed === '',
    geminiTest: geminiResult,
    note: isPlaceholder
      ? 'Key belum di-set atau masih placeholder'
      : trimmed.length > 0
        ? 'Key terdeteksi (tidak ditampilkan)'
        : 'Key kosong',
  });
}
