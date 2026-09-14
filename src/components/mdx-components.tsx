import type { MDXComponents } from "mdx/types";
import { KeyIdea } from "./mdx/key-idea";
import { Counterargument } from "./mdx/counterargument";
import { CodeBlock } from "./mdx/code-block";
import { GlossaryTerm } from "./mdx/glossary-term";
import { KubernetesTrustDiagram } from "./mdx/k8s-trust-diagram";

export const mdxComponents: MDXComponents = {
  KeyIdea,
  Counterargument,
  GlossaryTerm,
  KubernetesTrustDiagram,
  pre: CodeBlock,
  h2: (props) => (
    <h2
      {...props}
      className="scroll-mt-28 font-serif text-[1.6rem] font-medium leading-snug text-fg sm:text-[1.75rem]"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="scroll-mt-28 font-serif text-[1.3rem] font-medium leading-snug text-fg"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-2 border-border-strong pl-5 italic text-fg-secondary"
    />
  ),
};
