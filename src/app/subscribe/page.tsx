import type { Metadata } from "next";
import { Newsletter } from "@/components/newsletter";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Occasional essays on infrastructure, security, and engineering.",
};

export default function SubscribePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <Newsletter />
    </div>
  );
}
