import Link from "next/link";
import { Hero } from "@/components/Hero";
import { WhyRare } from "@/components/WhyRare";
import { WorkWheel } from "@/components/WorkWheel";

/**
 * Home — Hero + short works preview + למה איתי only.
 * Full sections live on /work · /about · /contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkWheel />
      <div className="relative z-10 mx-auto flex max-w-7xl justify-center px-5 pb-10 md:px-8 md:pb-14">
        <Link
          href="/work"
          className="cursor-magnet text-sm font-medium tracking-[0.08em] text-gold transition hover:text-gold-bright"
        >
          לכל תיק העבודות ←
        </Link>
      </div>
      <WhyRare />
    </>
  );
}
