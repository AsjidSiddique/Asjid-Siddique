import { site } from "@/data/site";
import { ProfilePhoto } from "./profile-photo";
import { SkillIcon } from "./skill-icon";

// Hero portrait: the photo sits dead-centre inside two slowly counter-rotating
// dotted rings, with four floating tech chips around it. Everything is sized
// in one fixed square so the portrait can never be cropped or pushed below
// the fold, and the whole block is vertically centred against the hero text.
const chips = [
  { name: "PyTorch", pos: "left-[2%] top-[10%]", delay: "0s" },
  { name: "Next.js", pos: "right-[-1%] top-[22%]", delay: "-2s" },
  { name: "FastAPI", pos: "left-[-2%] bottom-[22%]", delay: "-4s" },
  { name: "OpenCV", pos: "right-[3%] bottom-[8%]", delay: "-5.5s" },
];

export function HeroPortrait() {
  return (
    <div className="relative mx-auto h-[320px] w-[320px] lg:h-[420px] lg:w-[420px]">
      {/* ambient glow */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan/30 via-indigo/20 to-violet/30 blur-3xl light:opacity-60" />

      {/* rings */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <circle cx="200" cy="200" r="192" fill="none" stroke="rgb(var(--cyan))" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="1 9" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-rev" aria-hidden="true">
        <circle cx="200" cy="200" r="166" fill="none" stroke="rgb(var(--violet))" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="10 14" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="140" fill="none" stroke="rgb(var(--ink))" strokeOpacity="0.08" strokeWidth="1" />
      </svg>

      {/* portrait — the centring transform lives on its own wrapper: an
          element running animate-fade-up has its `transform` replaced by the
          animation, which would knock a -translate-1/2 centring offset off
          and push the photo to the bottom-right (the earlier bug). */}
      <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2">
        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="relative">
            <div className="rounded-full bg-gradient-to-br from-cyan via-sky to-violet p-[3px] shadow-glow-lg">
              <ProfilePhoto
                src={site.avatarPath}
                className="h-48 w-48 shrink-0 rounded-full border-[5px] border-bg lg:h-60 lg:w-60"
              />
            </div>
            <span className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-bg bg-cyan lg:bottom-3 lg:right-3">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-cyan" />
            </span>
          </div>
        </div>
      </div>

      {/* floating chips */}
      {chips.map((c) => (
        <div
          key={c.name}
          className={`absolute ${c.pos} animate-float`}
          style={{ animationDelay: c.delay }}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-edge bg-wash px-3 py-1.5 font-mono text-[11px] text-ink shadow-glow-sm backdrop-blur">
            <SkillIcon name={c.name} className="h-3.5 w-3.5 text-cyan" />
            {c.name}
          </div>
        </div>
      ))}
    </div>
  );
}
