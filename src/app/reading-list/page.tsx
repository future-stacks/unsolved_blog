import type { Metadata } from "next";
import { getReadingListByCategory } from "@/data/reading-list";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Reading List",
  description: "Books, papers, documentation, and research I keep coming back to.",
};

export default function ReadingListPage() {
  const groups = getReadingListByCategory();

  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Curated"
        title="Reading list"
        description="Books, papers, documentation, and research I keep coming back to — with a note on why each one earned a place here."
      />

      <div className="mt-8 flex flex-col gap-12">
        {groups.map((group) => (
          <div key={group.category}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {group.category}
            </h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {group.items.map((item) => (
                <li key={item.title} className="py-5">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-lg font-medium text-fg underline-link"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-serif text-lg font-medium text-fg">
                      {item.title}
                    </span>
                  )}
                  <p className="mt-0.5 text-[13.5px] text-fg-tertiary">{item.author}</p>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-fg-secondary">
                    <span className="font-medium text-fg">Why I&rsquo;m reading this — </span>
                    {item.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
