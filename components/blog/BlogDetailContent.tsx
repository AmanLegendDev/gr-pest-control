interface BlogDetailContentProps {
  content: string;
}

export default function BlogDetailContent({
  content,
}: BlogDetailContentProps) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <article
      className="
        min-w-0
        text-slate-600
      "
    >
      <div
        className="
          space-y-6
          text-[15px]
          leading-7
          sm:text-base
          sm:leading-8
        "
      >
        {paragraphs.map(
          (paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(
                0,
                30,
              )}`}
              className="
                whitespace-pre-line
              "
            >
              {paragraph}
            </p>
          ),
        )}
      </div>
    </article>
  );
}