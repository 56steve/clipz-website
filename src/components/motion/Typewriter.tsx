interface TypewriterProps {
  /** One entry per line. Lines wrap by word, characters appear one at a time. */
  lines: string[];
  className?: string;
  /** Delay before the first character, in ms. */
  startMs?: number;
  /** Time between characters, in ms. */
  stepMs?: number;
}

/**
 * Running-text headline. Pure CSS: each character fades in on its own delay and
 * carries a caret that is visible only during its own step, so the caret appears
 * to travel along the text. Screen readers get the full sentence immediately,
 * and reduced-motion visitors see the text with no animation.
 */
export function Typewriter({
  lines,
  className,
  startMs = 300,
  stepMs = 48,
}: TypewriterProps) {
  const wordLines = lines.map((line) => line.split(" "));
  const lineOffsets = wordLines.map((_, i) =>
    wordLines
      .slice(0, i)
      .reduce(
        (total, words) => total + words.reduce((n, word) => n + word.length, 0),
        0,
      ),
  );
  const totalChars = wordLines.flat().reduce((n, word) => n + word.length, 0);

  return (
    <span
      className={className}
      style={
        {
          "--tw-start": `${startMs}ms`,
          "--tw-step": `${stepMs}ms`,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {wordLines.map((words, lineIndex) => {
          let charIndex = lineOffsets[lineIndex];
          return (
            <span key={lines[lineIndex]} className="block">
              {words.map((word, wordIndex) => {
                const wordStart = charIndex;
                charIndex += word.length;
                return (
                  <span key={`${word}-${wordIndex}`}>
                    <span className="inline-block whitespace-nowrap">
                      {word.split("").map((char, i) => {
                        const index = wordStart + i;
                        return (
                          <span
                            key={index}
                            className={
                              index === totalChars - 1
                                ? "tw-char tw-last"
                                : "tw-char"
                            }
                            style={{ "--i": index } as React.CSSProperties}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                    {wordIndex < words.length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
