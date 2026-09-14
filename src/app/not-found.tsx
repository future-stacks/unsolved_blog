import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-5 py-20 sm:px-8">
      <p className="font-tabular text-[13px] font-medium uppercase tracking-[0.14em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium leading-snug text-fg sm:text-4xl">
        You&rsquo;ve reached an endpoint that doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-fg-secondary">
        Which, depending on the system, may or may not be a security problem.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        Return to the infrastructure
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
