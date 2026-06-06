import { redirect } from "next/navigation";
import Image from "next/image";
import { getLaunchActive, reactivateLaunch } from "@/app/actions/launch";
import LaunchButton from "./LaunchButton";

type Props = { searchParams: Promise<{ admin?: string }> };

export default async function LaunchPage({ searchParams }: Props) {
  const { admin } = await searchParams;

  // Admin reset: visiting /launch?admin=<LAUNCH_ADMIN_KEY> reactivates the launch page
  const adminKey = process.env.LAUNCH_ADMIN_KEY;
  if (adminKey && admin === adminKey) {
    await reactivateLaunch();
  }

  const isActive = await getLaunchActive();
  if (!isActive) redirect("/");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-950 flex flex-col">
      {/* Logo + Name + Tagline */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-12">
        <Image
          src="/logos/dhare-logo-3.png"
          alt="Dhare Foundation"
          width={130}
          height={130}
          className="object-contain drop-shadow-2xl"
          priority
        />
        <div className="text-center">
          <p className="text-white font-black tracking-[0.3em]" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}>
            DHARE
          </p>
          <p className="text-green-300 font-semibold tracking-[0.35em]" style={{ fontSize: "clamp(0.85rem, 3vw, 1.25rem)" }}>
            FOUNDATION
          </p>
        </div>
        <p className="text-green-200 text-center font-medium italic mt-6 leading-relaxed" style={{ fontSize: "clamp(1rem, 3.5vw, 1.35rem)" }}>
          Plant. Protect. Recharge. Restore.
        </p>
      </div>

      {/* Full-width Launch Button */}
      <LaunchButton />
    </div>
  );
}
