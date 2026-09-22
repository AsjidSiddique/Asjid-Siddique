import type { Metadata } from "next";
import { site } from "@/data/site";
import ResumeLoader from "@/components/resume-loader";

export const metadata: Metadata = {
  title: `Resume | ${site.name}`,
  description: `View ${site.name}'s resume — ${site.headline}, ${site.university}.`,
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return <ResumeLoader />;
}
