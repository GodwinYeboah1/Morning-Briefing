import type { Metadata } from "next";
import { UnlockForm } from "@/app/login/unlock-form";

export const metadata: Metadata = {
  title: "Locked · JARVIS Morning Briefing",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-10">
      <UnlockForm />
    </main>
  );
}
