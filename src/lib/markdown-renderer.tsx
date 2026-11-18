import React from "react";
import Link from "next/link";

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const splitIdx = part.indexOf("](");
      const label = part.slice(1, splitIdx);
      const href = part.slice(splitIdx + 2, -1).trim();

      if (href.startsWith("/")) {
        return (
          <Link
            key={idx}
            href={href}
            className="text-brand-primary font-bold underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:opacity-75 transition-opacity"
          >
            {label}
          </Link>
        );
      }

      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary font-bold underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:opacity-75 transition-opacity"
        >
          {label}
        </a>
      );
    }

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-brand-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded-md bg-brand-snow border border-brand-platinum text-xs font-mono text-brand-primary">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|?(\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?$/.test(line.trim());
}

export function MarkdownArticleContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      blocks.push(<hr key={`hr-${i}`} className="my-8 border-brand-platinum" />);
      i += 1;
      continue;
    }

    // Markdown Table
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      let j = i + 2;
      while (j < lines.length && lines[j].trim().includes("|")) {
        rows.push(parseTableRow(lines[j]));
        j += 1;
      }

      blocks.push(
        <div key={`tbl-${i}`} className="overflow-x-auto my-8 border border-brand-platinum rounded-xl overflow-hidden bg-white">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-brand-primary text-brand-white">
                {headers.map((header, hIdx) => (
                  <th
                    key={hIdx}
                    className="py-3.5 px-4 font-extrabold uppercase tracking-wider border-r border-white/15 last:border-r-0"
                  >
                    {renderInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-platinum">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 1 ? "bg-brand-snow" : "bg-white"}>
                  {headers.map((_, cIdx) => (
                    <td
                      key={cIdx}
                      className="py-3.5 px-4 text-brand-onyx leading-relaxed border-r border-brand-platinum last:border-r-0"
                    >
                      {renderInlineMarkdown(row[cIdx] || "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      i = j;
      continue;
    }

    // Heading H2 / H3 (jaga hirarki H1 -> H2 -> H3)
    if (line.startsWith("### ") || line.startsWith("#### ")) {
      const headingText = line.replace(/^#{3,4}\s+/, "");
      blocks.push(
        <h3
          key={`h3-${i}`}
          className="text-lg md:text-xl font-extrabold tracking-tight text-brand-primary uppercase mt-8 mb-3"
        >
          {renderInlineMarkdown(headingText)}
        </h3>
      );
      i += 1;
      continue;
    }

    if (line.startsWith("## ") || line.startsWith("# ")) {
      const headingText = line.replace(/^#{1,2}\s+/, "");
      blocks.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl md:text-3xl font-extrabold tracking-tighter text-brand-primary uppercase mt-12 mb-4 pb-2 border-b border-brand-platinum"
        >
          {renderInlineMarkdown(headingText)}
        </h2>
      );
      i += 1;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      let j = i;
      while (j < lines.length && lines[j].trim().startsWith("> ")) {
        quoteLines.push(lines[j].trim().slice(2));
        j += 1;
      }
      blocks.push(
        <blockquote
          key={`bq-${i}`}
          className="my-6 border-l-4 border-[#D4AF37] bg-brand-snow rounded-r-xl px-6 py-4 text-sm md:text-base text-brand-primary leading-relaxed"
        >
          {renderInlineMarkdown(quoteLines.join(" "))}
        </blockquote>
      );
      i = j;
      continue;
    }

    // Bullet List
    if (/^[-*]\s+/.test(line)) {
      const listItems: string[] = [];
      let j = i;
      while (j < lines.length && /^[-*]\s+/.test(lines[j].trim())) {
        listItems.push(lines[j].trim().replace(/^[-*]\s+/, ""));
        j += 1;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2.5">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-brand-onyx leading-relaxed">
              <span className="text-[#D4AF37] font-bold mt-0.5 shrink-0">✦</span>
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      i = j;
      continue;
    }

    // Numbered List
    if (/^\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      let j = i;
      while (j < lines.length && /^\d+\.\s+/.test(lines[j].trim())) {
        listItems.push(lines[j].trim().replace(/^\d+\.\s+/, ""));
        j += 1;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-5 space-y-2.5 list-decimal list-inside text-sm md:text-base text-brand-onyx leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      i = j;
      continue;
    }

    // Paragraph (kumpulkan baris berurutan yang bukan blok khusus)
    const paraLines: string[] = [line];
    let j = i + 1;
    while (j < lines.length) {
      const nextTrim = lines[j].trim();
      if (
        !nextTrim ||
        nextTrim.startsWith("#") ||
        nextTrim.startsWith("> ") ||
        /^[-*]\s+/.test(nextTrim) ||
        /^\d+\.\s+/.test(nextTrim) ||
        /^(-{3,}|\*{3,})$/.test(nextTrim) ||
        (nextTrim.includes("|") && j + 1 < lines.length && isTableSeparator(lines[j + 1]))
      ) {
        break;
      }
      paraLines.push(nextTrim);
      j += 1;
    }

    blocks.push(
      <p key={`p-${i}`} className="my-4 text-sm md:text-base text-brand-onyx leading-relaxed">
        {renderInlineMarkdown(paraLines.join(" "))}
      </p>
    );
    i = j;
  }

  return <div className="space-y-1">{blocks}</div>;
}
