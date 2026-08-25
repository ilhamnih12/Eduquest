import { Question } from '@/types/game';

/**
 * Mengubah notasi matematika yang biasanya keluar dari Markdown/LaTeX menjadi
 * teks biasa yang enak dibaca siswa. Soal ditampilkan sebagai teks, jadi tanda
 * seperti `$...$`, `^`, dan `/` justru sering terlihat seperti kode.
 */
const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  '(': '⁽',
  ')': '⁾',
  '.': '·',
  ',': '˒',
  'a': 'ᵃ',
  'b': 'ᵇ',
  'c': 'ᶜ',
  'd': 'ᵈ',
  'e': 'ᵉ',
  'f': 'ᶠ',
  'g': 'ᵍ',
  'h': 'ʰ',
  'i': 'ⁱ',
  'j': 'ʲ',
  'k': 'ᵏ',
  'l': 'ˡ',
  'm': 'ᵐ',
  'n': 'ⁿ',
  'o': 'ᵒ',
  'p': 'ᵖ',
  'r': 'ʳ',
  's': 'ˢ',
  't': 'ᵗ',
  'u': 'ᵘ',
  'v': 'ᵛ',
  'w': 'ʷ',
  'x': 'ˣ',
  'y': 'ʸ',
  'z': 'ᶻ',
  'A': 'ᴬ',
  'B': 'ᴮ',
  'D': 'ᴰ',
  'E': 'ᴱ',
  'G': 'ᴳ',
  'H': 'ᴴ',
  'I': 'ᴵ',
  'J': 'ᴶ',
  'K': 'ᴷ',
  'L': 'ᴸ',
  'M': 'ᴹ',
  'N': 'ᴺ',
  'O': 'ᴼ',
  'P': 'ᴾ',
  'R': 'ᴿ',
  'T': 'ᵀ',
  'U': 'ᵁ',
  'V': 'ⱽ',
  'W': 'ᵂ',
};

function readBracedValue(value: string, start: number): { content: string; end: number } | null {
  if (value[start] !== '{') return null;

  let depth = 0;
  for (let index = start; index < value.length; index += 1) {
    if (value[index] === '{') depth += 1;
    if (value[index] === '}') {
      depth -= 1;
      if (depth === 0) {
        return {
          content: value.slice(start + 1, index),
          end: index + 1,
        };
      }
    }
  }

  return null;
}

/** Mengubah \frac{atas}{bawah} tanpa mengganggu kurung kurawal himpunan. */
function replaceLatexFractions(value: string): string {
  let output = '';
  let index = 0;

  while (index < value.length) {
    const fractionCommand = value.startsWith('\\frac', index)
      ? '\\frac'
      : value.startsWith('\\dfrac', index)
        ? '\\dfrac'
        : value.startsWith('\\tfrac', index)
          ? '\\tfrac'
          : null;

    if (fractionCommand) {
      let cursor = index + fractionCommand.length;
      while (/\s/.test(value[cursor] ?? '')) cursor += 1;

      const numerator = readBracedValue(value, cursor);
      if (numerator) {
        cursor = numerator.end;
        while (/\s/.test(value[cursor] ?? '')) cursor += 1;
        const denominator = readBracedValue(value, cursor);

        if (denominator) {
          output += `${replaceLatexFractions(numerator.content)} ÷ ${replaceLatexFractions(denominator.content)}`;
          index = denominator.end;
          continue;
        }
      }
    }

    output += value[index];
    index += 1;
  }

  return output;
}

function toSuperscript(value: string): string {
  return Array.from(value.replace(/\s+/g, '')).map((character) => SUPERSCRIPT[character] ?? character).join('');
}

function replacePowers(value: string): string {
  let result = value;

  // Pangkat dengan kurung kurawal atau kurung biasa, misalnya x^{n-1}.
  result = result.replace(/\^\s*\{([^{}]*)\}/g, (_, exponent: string) => toSuperscript(exponent));
  result = result.replace(/\^\s*\(([^()]*)\)/g, (_, exponent: string) => toSuperscript(`(${exponent})`));
  // Pangkat satu karakter atau rangkaian angka/huruf, misalnya x^2 atau 10^3.
  result = result.replace(/\^\s*([A-Za-z0-9]+)/g, (_, exponent: string) => toSuperscript(exponent));

  return result;
}

/**
 * Format satu teks soal, opsi, pembahasan, atau petunjuk.
 * Fungsi ini aman dipanggil berkali-kali sehingga soal lama yang tersimpan di
 * browser juga ikut tampil dengan format baru.
 */
export function formatMathText(input: string): string {
  if (!input) return input;

  let value = input;

  // Delimiter LaTeX/Markdown tidak perlu ditampilkan di UI.
  value = value.replace(/\$\$?/g, '');
  value = replaceLatexFractions(value);

  // Perintah LaTeX yang umum dari jawaban AI.
  value = value
    .replace(/\\left\b|\\right\b/g, '')
    .replace(/\\(?:text|mathrm|mathbf|mathit|operatorname)\{([^{}]*)\}/g, '$1')
    .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
    .replace(/\\lfloor/g, '⌊')
    .replace(/\\rfloor/g, '⌋')
    .replace(/\\lceil/g, '⌈')
    .replace(/\\rceil/g, '⌉')
    .replace(/\\infty/g, '∞')
    .replace(/\\pi/g, 'π')
    .replace(/\\(?:times|cdot)/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\pm/g, '±')
    .replace(/\\(?:leq|le)/g, '≤')
    .replace(/\\(?:geq|ge)/g, '≥')
    .replace(/\\neq/g, '≠')
    .replace(/\\rightarrow|\\to/g, '→')
    .replace(/\\%/g, '%')
    .replace(/\\,/g, ' ')
    .replace(/\\!/g, '')
    .replace(/\\([{}])/g, '$1')
    .replace(/\\\\/g, '\n');

  value = replacePowers(value);

  // Panah ASCII dan pembagian dibuat familiar untuk siswa.
  value = value.replace(/\s*(?:=>|->)\s*/g, ' → ');
  value = value.replace(/(\d+(?:[.,]\d+)?|[A-Za-z](?:[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+)?)\s*\/\s*(\d+(?:[.,]\d+)?|[A-Za-z](?:[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+)?)/g, '$1 ÷ $2');
  value = value.replace(/(\d+(?:[.,]\d+)?|[A-Za-z])\s*\/\s*(\([^\n()]*\))/g, '$1 ÷ $2');

  // Simbol perbandingan yang kadang dikirim sebagai ASCII.
  value = value.replace(/<=/g, '≤').replace(/>=/g, '≥');

  // Rapikan spasi buatan oleh penggantian simbol, tanpa menghapus baris baru.
  return value
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+([,.;!?])/g, '$1')
    .trim();
}

/**
 * Preserve authored paragraphs and make common AI section labels readable even
 * when a model returns them on one long line.
 */
export function formatStructuredText(input: string): string {
  if (!input) return input;

  const sectionLabels =
    'Konteks|Data|Wacan(?: cekak)?|Pethikan|Kode semu|Langkah(?:-langkah)?|Pertanyaan|Pitakon|Pembahasan|Contoh';
  const labelPattern = new RegExp(`(^|[\\s]+)(${sectionLabels}):[ \\t]*`, 'gi');

  return formatMathText(input)
    .replace(/\r\n?/g, '\n')
    .replace(labelPattern, (_match, prefix: string, label: string) =>
      `${prefix ? '\n\n' : ''}${label}:\n`
    )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Format seluruh bagian teks dari sebuah pertanyaan. */
export function formatQuestion(question: Question): Question {
  return {
    ...question,
    topic: formatMathText(question.topic),
    question: formatStructuredText(question.question),
    options: question.options.map((option) => formatStructuredText(option)),
    explanation: formatStructuredText(question.explanation),
    hint: question.hint ? formatStructuredText(question.hint) : question.hint,
  };
}

function randomize<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

/**
 * Acak urutan opsi sekaligus memindahkan kunci jawabannya.
 * `avoidCorrectIndex` dipakai agar kunci soal baru tidak berada di posisi yang
 * sama dengan soal sebelumnya.
 */
export function shuffleQuestionOptions(question: Question, avoidCorrectIndex: number | null = null): Question {
  const optionIndexes = randomize(question.options.map((_, index) => index));
  let correctPosition = optionIndexes.indexOf(question.correctAnswer);

  if (
    avoidCorrectIndex !== null &&
    optionIndexes.length > 1 &&
    correctPosition === avoidCorrectIndex
  ) {
    const alternatePosition = optionIndexes.findIndex((_, index) => index !== avoidCorrectIndex);
    if (alternatePosition >= 0) {
      [optionIndexes[correctPosition], optionIndexes[alternatePosition]] = [
        optionIndexes[alternatePosition],
        optionIndexes[correctPosition],
      ];
      correctPosition = alternatePosition;
    }
  }

  return {
    ...question,
    options: optionIndexes.map((index) => question.options[index]),
    correctAnswer: correctPosition,
  };
}
