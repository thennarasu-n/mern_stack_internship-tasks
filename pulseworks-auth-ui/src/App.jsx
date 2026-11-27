import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Eye,
  EyeOff,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  MoveRight,
  PanelsTopLeft,
  Sparkles,
  UsersRound,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Button } from "./components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card.jsx";
import { Input } from "./components/ui/input.jsx";
import { Label } from "./components/ui/label.jsx";
import { cn } from "./lib/utils.js";

function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[17px] font-extrabold tracking-[-0.06em]",
        light ? "text-white" : "text-ink",
      )}
      aria-label="PulseWorks AI home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Zap size={19} fill="currentColor" strokeWidth={2.2} />
      </span>
      <span>pulseworks<span className={light ? "text-brand-300" : "text-brand-600"}>.</span></span>
      <span className={cn(
        "ml-0.5 rounded-md px-1.5 py-1 font-sans text-[9px] font-bold tracking-[0.12em]",
        light ? "bg-white/10 text-brand-100" : "bg-brand-50 text-brand-700",
      )}>AI</span>
    </Link>
  );
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfcfa] text-slate-800">
      <header className="relative z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
          <Logo />
          <div className="hidden items-center gap-9 md:flex">
            <a className="text-sm font-medium text-slate-600 transition hover:text-brand-700" href="#features">Features</a>
            <a className="text-sm font-medium text-slate-600 transition hover:text-brand-700" href="#how-it-works">How it works</a>
            <a className="text-sm font-medium text-slate-600 transition hover:text-brand-700" href="#teams">For teams</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm"><Link to="/login">Log in</Link></Button>
            <Button asChild size="sm"><Link to="/register">Get started <ArrowRight size={15} /></Link></Button>
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-5 py-5 shadow-soft md:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              <a onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50" href="#features">Features</a>
              <a onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50" href="#how-it-works">How it works</a>
              <a onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50" href="#teams">For teams</a>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                <Button asChild variant="outline"><Link onClick={closeMenu} to="/login">Log in</Link></Button>
                <Button asChild><Link onClick={closeMenu} to="/register">Get started</Link></Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative bg-hero-glow">
          <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(to_right,#dce8e2_1px,transparent_1px),linear-gradient(to_bottom,#dce8e2_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-24">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-sm">
                <Sparkles size={14} className="text-brand-600" />
                <span>Your team’s new favorite workspace</span>
                <ChevronRight size={13} className="text-brand-400" />
              </div>
              <h1 className="max-w-[660px] font-display text-[clamp(2.8rem,6.1vw,5.25rem)] font-bold leading-[1.03] tracking-[-0.065em] text-ink">
                Good work happens in <span className="relative whitespace-nowrap text-brand-700">good flow.<span className="absolute -bottom-1 left-0 -z-10 h-3 w-full rounded-full bg-brand-200/70" /></span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Bring projects, people, and priorities into one calm, clear space. PulseWorks helps your team spend less time chasing updates and more time doing meaningful work.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group">
                  <Link to="/register">Start your free workspace <ArrowRight className="transition group-hover:translate-x-1" size={17} /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#features"><span className="grid size-5 place-items-center rounded-full border border-slate-200 text-[10px]">▶</span> Explore the platform</a>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-brand-600" /> Free to get started</span>
                <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-brand-600" /> No credit card required</span>
              </div>
              <div className="mt-10 flex items-center gap-3 border-t border-slate-200/80 pt-6">
                <div className="flex -space-x-2">
                  {["JD", "MK", "AR", "SL"].map((initials, index) => (
                    <span key={initials} className={cn(
                      "grid size-8 place-items-center rounded-full border-2 border-[#fbfcfa] text-[9px] font-bold",
                      ["bg-[#e2f1e9] text-[#34785f]", "bg-[#f5e7d8] text-[#9b6946]", "bg-[#e8e8f4] text-[#625f9c]", "bg-[#f4e3e5] text-[#a45163]"][index],
                    )}>{initials}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-500"><strong className="text-slate-800">Teams move better together.</strong><br />A more thoughtful way to work.</p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[610px] lg:ml-auto">
              <div className="absolute -left-7 top-16 size-28 rounded-full bg-brand-200/50 blur-3xl" />
              <div className="absolute -right-7 bottom-5 size-36 rounded-full bg-amber-100/70 blur-3xl" />
              <div className="relative rounded-[26px] border border-white/80 bg-white/70 p-2.5 shadow-[0_35px_90px_-40px_rgba(27,74,60,0.35)] backdrop-blur">
                <div className="overflow-hidden rounded-[19px] border border-slate-200/80 bg-[#f8faf9]">
                  <div className="flex h-12 items-center justify-between border-b border-slate-200/70 bg-white px-4 sm:px-5">
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-lg bg-brand-700 text-white"><Zap size={13} fill="currentColor" /></span>
                      <span className="text-[11px] font-bold text-ink">Studio North</span>
                      <ChevronRight size={12} className="text-slate-400" />
                      <span className="text-[10px] text-slate-500">Product launch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden items-center gap-1 rounded-full bg-brand-50 px-2 py-1 text-[9px] font-semibold text-brand-700 sm:flex"><span className="size-1.5 rounded-full bg-brand-500" /> On track</span>
                      <span className="grid size-6 place-items-center rounded-full bg-[#f1e4d8] text-[8px] font-bold text-[#8b674b]">JD</span>
                    </div>
                  </div>
                  <div className="grid min-h-[370px] grid-cols-[48px_1fr] sm:grid-cols-[62px_1fr]">
                    <aside className="flex flex-col items-center gap-4 border-r border-slate-200/70 bg-white py-4">
                      <span className="grid size-7 place-items-center rounded-lg bg-brand-50 text-brand-700"><LayoutDashboard size={14} /></span>
                      <span className="text-slate-300"><PanelsTopLeft size={15} /></span>
                      <span className="text-slate-300"><UsersRound size={15} /></span>
                      <span className="text-slate-300"><Workflow size={15} /></span>
                      <span className="mt-auto grid size-6 place-items-center rounded-full bg-slate-100 text-[8px] font-bold text-slate-500">?</span>
                    </aside>
                    <div className="min-w-0 p-4 sm:p-5">
                      <div className="mb-4 flex items-end justify-between">
                        <div>
                          <p className="text-[9px] font-medium text-slate-400">MONDAY, MAY 12</p>
                          <h3 className="mt-1 font-display text-base font-bold tracking-tight text-ink sm:text-lg">Good morning, Jamie <span>✦</span></h3>
                          <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">Here’s what’s moving with your team.</p>
                        </div>
                        <button className="hidden rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[9px] font-semibold text-slate-600 sm:block" type="button">+ New task</button>
                      </div>
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        {[["12", "In progress", "text-brand-700"], ["04", "Needs review", "text-amber-700"], ["08", "Completed", "text-slate-700"]].map(([value, label, color]) => (
                          <div key={label} className="rounded-xl border border-slate-200/80 bg-white p-2.5 sm:p-3">
                            <span className={cn("font-display text-lg font-bold", color)}>{value}</span>
                            <p className="mt-0.5 truncate text-[8px] text-slate-500 sm:text-[9px]">{label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
                        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5">
                          <span className="text-[10px] font-bold text-slate-700">Team priorities</span>
                          <button type="button" className="text-[9px] font-semibold text-brand-700">View board <ArrowUpRight className="ml-0.5 inline" size={10} /></button>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {[
                            ["Finalize launch messaging", "Brand refresh", "JD", "bg-brand-100 text-brand-800"],
                            ["Review mobile experience", "Website", "MK", "bg-amber-100 text-amber-800"],
                            ["Prepare customer stories", "Content", "AR", "bg-violet-100 text-violet-800"],
                          ].map(([task, project, owner, color], index) => (
                            <div key={task} className="flex items-center gap-2.5 px-3 py-2.5">
                              <span className={cn("grid size-4 shrink-0 place-items-center rounded border", index === 0 ? "border-brand-500 bg-brand-500 text-white" : "border-slate-200 text-transparent")}><Check size={10} /></span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[9px] font-semibold text-slate-700 sm:text-[10px]">{task}</p>
                                <p className="mt-0.5 text-[8px] text-slate-400">{project}</p>
                              </div>
                              <span className="hidden rounded-md bg-slate-50 px-1.5 py-1 text-[8px] text-slate-500 sm:inline">Today</span>
                              <span className={cn("grid size-5 shrink-0 place-items-center rounded-full text-[7px] font-bold", color)}>{owner}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-6 hidden items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-soft sm:flex">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-700"><CircleCheck size={18} /></span>
                <span><strong className="block text-xs text-slate-800">Small wins add up</strong><span className="mt-0.5 block text-[10px] text-slate-500">Your team finished 8 tasks today</span></span>
              </div>
              <div className="absolute -right-4 top-20 hidden -rotate-2 items-center gap-2 rounded-xl border border-white bg-white px-3 py-2.5 shadow-soft sm:flex">
                <span className="grid size-7 place-items-center rounded-lg bg-amber-50 text-amber-600"><Sparkles size={14} /></span>
                <span className="text-[10px] font-semibold text-slate-700">Focus time protected</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">A clearer way forward</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.045em] text-ink sm:text-4xl">Less busywork. More <span className="text-brand-700">better work.</span></h2>
              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">The essentials your team needs to stay aligned, make progress, and feel good about how it gets done.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: PanelsTopLeft, number: "01", title: "Everything in one place", copy: "Keep projects, conversations, and the next right step together. No more digging through tabs to find the context.", tint: "bg-brand-50 text-brand-700" },
                { icon: UsersRound, number: "02", title: "A team that stays in sync", copy: "Make ownership clear and updates easy to find, so collaboration feels natural instead of another meeting.", tint: "bg-[#f0effb] text-[#7065ad]" },
                { icon: Workflow, number: "03", title: "Momentum you can see", copy: "Turn big goals into doable steps and celebrate the progress your team is making every day.", tint: "bg-[#fff4e8] text-[#bd7b39]" },
              ].map(({ icon: Icon, number, title, copy, tint }) => (
                <article key={number} className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className={cn("grid size-11 place-items-center rounded-xl", tint)}><Icon size={20} /></span>
                    <span className="font-display text-xs font-bold tracking-widest text-slate-300">{number}</span>
                  </div>
                  <h3 className="mt-7 font-display text-lg font-bold tracking-tight text-ink">{title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-500">{copy}</p>
                  <a className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700" href="#how-it-works">See how it works <MoveRight size={14} className="transition group-hover:translate-x-1" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-[#f4f8f5] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">A little more breathing room</span>
              <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-[-0.04em] text-ink sm:text-3xl">Work should move forward, not follow you home.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Create a shared rhythm around your goals, protect the space to focus, and make progress visible to everyone.</p>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft"><Check size={21} /></span>
              <div><p className="font-display text-lg font-bold text-ink">One team. One clear plan.</p><p className="mt-1 text-xs text-slate-500">Built for work that matters.</p></div>
            </div>
          </div>
        </section>

        <section id="teams" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-ink px-6 py-10 sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-32 size-96 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -right-2 -top-14 size-64 rounded-full border border-white/[0.08]" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-brand-200"><Sparkles size={13} /> YOUR NEXT CHAPTER STARTS HERE</span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.045em] text-white sm:text-4xl">Make room for your team’s best work.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">Bring everyone onto the same page. Your first workspace is just a few clicks away.</p>
              </div>
              <Button asChild size="lg" className="shrink-0 bg-brand-400 text-ink hover:bg-brand-300">
                <Link to="/register">Create your free account <ArrowRight size={16} /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-7 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
          <Logo />
          <p className="text-xs text-slate-500">A calmer workspace for teams that care about their work.</p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <Link className="hover:text-brand-700" to="/login">Log in</Link>
            <Link className="hover:text-brand-700" to="/register">Create account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AuthBackdrop() {
  return (
    <div className="relative hidden min-h-[650px] overflow-hidden rounded-[28px] bg-ink p-9 text-white md:flex md:flex-col lg:p-11">
      <div className="pointer-events-none absolute -right-24 -top-28 size-96 rounded-full border border-white/[0.08]" />
      <div className="pointer-events-none absolute -right-8 -top-12 size-64 rounded-full border border-white/[0.08]" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 size-80 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="relative"><Logo light /></div>
      <div className="relative my-auto max-w-md py-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-brand-200"><Sparkles size={13} /> MAKE SPACE FOR MOMENTUM</span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-[-0.055em] lg:text-[46px]">The best work starts with a little more <span className="text-brand-300">clarity.</span></h1>
        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">A thoughtful space for your team to focus, find their flow, and move forward together.</p>
        <div className="mt-9 grid gap-3">
          {["A clear view of what matters", "Your team, connected in one place", "Progress worth celebrating"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-xs text-slate-200">
              <span className="grid size-5 place-items-center rounded-full bg-brand-400/15 text-brand-300"><Check size={12} /></span>{item}
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="flex -space-x-2">
          {["JD", "MK", "AR"].map((initials, index) => (
            <span key={initials} className={cn("grid size-8 place-items-center rounded-full border-2 border-ink text-[9px] font-bold", ["bg-brand-200 text-brand-900", "bg-amber-100 text-amber-900", "bg-violet-200 text-violet-900"][index])}>{initials}</span>
          ))}
        </div>
        <p className="text-xs text-slate-300">Good things happen when everyone’s in sync.</p>
      </div>
    </div>
  );
}

function AuthShell({ children, page }) {
  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto mb-7 flex max-w-6xl items-center justify-between md:hidden">
        <Logo />
        <Link className="text-xs font-semibold text-slate-600 hover:text-brand-700" to={page === "login" ? "/register" : "/login"}>
          {page === "login" ? "Create account" : "Log in"}
        </Link>
      </div>
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 md:grid-cols-[1.03fr_0.97fr] lg:gap-14">
        <AuthBackdrop />
        <div className="mx-auto w-full max-w-[440px]">
          <div className="mb-5 hidden items-center justify-between md:flex">
            <Link className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-brand-700" to="/">
              <ArrowDownRight className="rotate-45" size={14} /> Back to home
            </Link>
            <span className="text-xs text-slate-400">{page === "login" ? "New to PulseWorks?" : "Already have an account?"}{" "}
              <Link className="font-bold text-brand-700 hover:text-brand-800" to={page === "login" ? "/register" : "/login"}>{page === "login" ? "Sign up" : "Log in"}</Link>
            </span>
          </div>
          {children}
          <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
            By continuing, you agree to our <a className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-2" href="#terms">Terms</a> and <a className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-2" href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  icon: Icon,
  trailing,
  inputAction,
  className,
  error,
  ...inputProps
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {trailing}
      </div>
      <div className="relative">
        {Icon && <Icon aria-hidden="true" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />}
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(Icon && "pl-10", inputAction && "pr-11", className)}
          {...inputProps}
        />
        {inputAction}
      </div>
      {error && <p className="text-xs text-rose-600" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

function PasswordField({ id, label, autoComplete, trailing, value, onChange, error }) {
  const [visible, setVisible] = useState(false);

  return (
    <Field
      id={id}
      label={label}
      type={visible ? "text" : "password"}
      placeholder="At least 8 characters"
      autoComplete={autoComplete}
      icon={LockKeyhole}
      minLength={8}
      required
      trailing={trailing}
      value={value}
      onChange={onChange}
      error={error}
      inputAction={
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
}

function AuthCardHeading({ title, description, mode }) {
  return (
    <CardHeader className="px-6 pb-5 pt-7 sm:px-8 sm:pt-8">
      <div className="mb-5 hidden md:block"><Logo /></div>
      <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-brand-700 md:hidden">
        <Sparkles size={12} /> {mode === "login" ? "Welcome back" : "Get started"}
      </span>
      <CardTitle className="text-[26px]">{title}</CardTitle>
      <CardDescription className="mt-1">{description}</CardDescription>
    </CardHeader>
  );
}

function LoginPage() {
  const [notice, setNotice] = useState("");

  return (
    <AuthShell page="login">
      <Card className="overflow-hidden">
        <AuthCardHeading title="Welcome back" description="Log in to pick up right where you left off." mode="login" />
        <CardContent className="px-6 sm:px-8">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setNotice("Your workspace sign-in will be ready when authentication is connected.");
            }}
          >
            <Field id="email" label="Work email" type="email" placeholder="you@company.com" autoComplete="email" icon={Mail} required />
            <PasswordField
              id="password"
              label="Password"
              autoComplete="current-password"
              trailing={
                <a
                  href="#forgot-password"
                  className="text-xs font-semibold text-brand-700 transition hover:text-brand-800"
                  onClick={(event) => {
                    event.preventDefault();
                    setNotice("Password reset will be available when authentication is connected.");
                  }}
                >
                  Forgot password?
                </a>
              }
            />
            <Button className="w-full" size="lg" type="submit">Log in <ArrowRight size={16} /></Button>
            {notice && <p role="status" className="rounded-xl border border-brand-100 bg-brand-50 px-3.5 py-3 text-xs leading-5 text-brand-800">{notice}</p>}
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] font-medium uppercase tracking-wider text-slate-400">or continue with</span></div>
          </div>
          <Button className="w-full" variant="outline" type="button"><span className="grid size-5 place-items-center rounded-full border border-slate-200 text-[10px] font-bold text-slate-700">G</span> Continue with Google</Button>
        </CardContent>
        <CardFooter className="flex-col gap-4 px-6 pb-7 sm:px-8">
          <p className="text-center text-sm text-slate-500 md:hidden">New to PulseWorks? <Link className="font-bold text-brand-700" to="/register">Create an account</Link></p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400"><LockKeyhole size={12} /> Your team’s data is always private and secure.</div>
        </CardFooter>
      </Card>
    </AuthShell>
  );
}

function RegistrationPage() {
  const [notice, setNotice] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <AuthShell page="register">
      <Card className="overflow-hidden">
        <AuthCardHeading title="Create your account" description="A better workday is closer than you think." mode="register" />
        <CardContent className="px-6 sm:px-8">
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (password !== confirmPassword) {
                setNotice("Make sure both password fields match.");
                return;
              }
              setNotice("Your account will be created when authentication is connected.");
            }}
          >
            <Field id="fullName" label="Full name" placeholder="Jamie Davis" autoComplete="name" icon={UsersRound} required />
            <Field id="email" label="Work email" type="email" placeholder="you@company.com" autoComplete="email" icon={Mail} required />
            <PasswordField
              id="password"
              label="Password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordField
              id="confirmPassword"
              label="Confirm password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={passwordMismatch ? "Passwords don't match yet." : undefined}
            />
            <Button className="w-full" size="lg" type="submit">Create account <ArrowRight size={16} /></Button>
            {notice && <p role="status" className="rounded-xl border border-brand-100 bg-brand-50 px-3.5 py-3 text-xs leading-5 text-brand-800">{notice}</p>}
          </form>
          <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3">
            <CircleCheck size={15} className="mt-0.5 shrink-0 text-brand-600" />
            <p className="text-[11px] leading-5 text-slate-500">By creating an account, you’ll get a shared home for projects, tasks, and team updates.</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 px-6 pb-7 sm:px-8">
          <p className="text-center text-sm text-slate-500 md:hidden">Already have an account? <Link className="font-bold text-brand-700" to="/login">Log in</Link></p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400"><LockKeyhole size={12} /> Your team’s data is always private and secure.</div>
        </CardFooter>
      </Card>
    </AuthShell>
  );
}

function RouteAnnouncer() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      document.title = "Log in · PulseWorks AI";
    } else if (location.pathname === "/register") {
      document.title = "Create account · PulseWorks AI";
    } else {
      document.title = "PulseWorks AI — Work in your flow";
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <RouteAnnouncer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
