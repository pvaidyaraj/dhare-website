import { redirect } from "next/navigation";
import Image from "next/image";
import { getLaunchActive, reactivateLaunch } from "@/app/actions/launch";
import LaunchButton from "@/app/launch/LaunchButton";

type Props = { searchParams: Promise<{ admin?: string }> };

export default async function LaunchPage({ searchParams }: Props) {
  const { admin } = await searchParams;

  const adminKey = process.env.LAUNCH_ADMIN_KEY;
  if (adminKey && admin === adminKey) {
    await reactivateLaunch();
  }

  const isActive = await getLaunchActive();
  if (!isActive) redirect("/");

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #15803d 0%, #14532d 35%, #052e16 65%, #020f06 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] rounded-full border border-green-600/10" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-green-500/10" />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 px-8 pt-12 pb-8 relative z-10">
        <div className="animate-fade-up relative">
          <div
            className="absolute inset-0 rounded-full blur-xl scale-110"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)" }}
          />
          <div
            className="relative w-20 h-20 rounded-full overflow-hidden"
            style={{
              boxShadow: "0 0 0 3px rgba(74,222,128,0.25), 0 4px 20px rgba(0,0,0,0.4)",
              background: "white",
            }}
          >
            <Image src="/images/logos/dhare-logo-3.png" alt="Dhare Foundation" fill className="object-contain p-1.5" priority />
          </div>
        </div>

        <div className="animate-fade-up-delay text-center">
          <p className="text-white font-black tracking-[0.32em]" style={{ fontSize: "clamp(1.6rem, 5.5vw, 2.8rem)", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
            DHARE
          </p>
          <p className="text-green-300 font-bold tracking-[0.45em]" style={{ fontSize: "clamp(0.65rem, 2.5vw, 1rem)" }}>
            FOUNDATION
          </p>
        </div>

        <div className="animate-fade-up-delay-2 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 w-full max-w-[220px]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-green-500/40" />
            <div className="w-1 h-1 rounded-full bg-green-400" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-green-500/40" />
          </div>
          <p className="text-green-200/70 text-center font-medium tracking-wide" style={{ fontSize: "clamp(0.75rem, 2.8vw, 1rem)" }}>
            Plant · Protect · Recharge · Restore
          </p>
        </div>
      </div>

      <div className="flex-1 flex">
        <LaunchButton />
      </div>
    </div>
  );
}
