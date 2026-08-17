interface BlogDetailContentProps {
  content: string;
}

export default function BlogDetailContent({
  content,
}: BlogDetailContentProps) {
  if (!content?.trim()) {
    return null;
  }

  return (
    <article className="min-w-0">
      <div
        className="
          prose
          prose-slate
          max-w-none

          text-[15px]
          leading-7
          sm:text-base
          sm:leading-8

          prose-headings:font-extrabold
          prose-headings:tracking-tight
          prose-headings:text-[#062B63]

          prose-h1:text-3xl
          prose-h1:leading-tight
          sm:prose-h1:text-4xl

          prose-h2:mt-12
          prose-h2:mb-5
          prose-h2:text-2xl
          prose-h2:leading-tight
          sm:prose-h2:text-3xl

          prose-h3:mt-9
          prose-h3:mb-4
          prose-h3:text-xl
          prose-h3:leading-tight
          sm:prose-h3:text-2xl

          prose-p:my-5

          prose-strong:font-bold
          prose-strong:text-[#0F172A]

          prose-ul:my-6
          prose-ol:my-6
          prose-li:my-2

          prose-a:font-semibold
          prose-a:text-[#0878E8]
          prose-a:no-underline
          hover:prose-a:underline

          prose-blockquote:rounded-xl
          prose-blockquote:border-l-[#0878E8]
          prose-blockquote:bg-blue-50
          prose-blockquote:px-5
          prose-blockquote:py-2

          prose-img:my-8
          prose-img:w-full
          prose-img:rounded-2xl

          prose-hr:my-10
          prose-hr:border-slate-200

          prose-pre:rounded-2xl
        "
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}