import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check, ChevronRight, Clock3, Coins, Search, Star, Users, X } from "lucide-react";
import { useState } from "react";
import studentsImage from "@/assets/exchange-students.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EXCHANGE — Student Skill Network" },
      { name: "description", content: "Exchange skills, earn campus credits, and build a verified Skill Passport at Universitas Indonesia." },
      { property: "og:title", content: "EXCHANGE — Student Skill Network" },
      { property: "og:description", content: "Exchange skills and build verified student reputation at Universitas Indonesia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExchangeHome,
});

type StudentAvatarProps = { position: "tl" | "tr" | "bl" | "br"; name: string; className?: string };

function StudentAvatar({ position, name, className }: StudentAvatarProps) {
  const positionClass = { tl: "object-left-top", tr: "object-right-top", bl: "object-left-bottom", br: "object-right-bottom" }[position];
  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-lg bg-muted", className)}>
      <img src={studentsImage} alt={`${name}, EXCHANGE student`} width={1024} height={1024} className={cn("absolute inset-0 size-[200%] max-w-none", positionClass)} />
    </div>
  );
}

const learnMatches = [
  { skill: "Financial Modeling Basics", student: "Nadia F.", faculty: "Economics", rating: "4.8", proof: "62 credits earned", credits: 18, avatar: "tr" as const },
  { skill: "Data Storytelling in Figma", student: "Reza A.", faculty: "Communication", rating: "4.9", proof: "88 credits earned", credits: 24, avatar: "br" as const },
  { skill: "Intro to Public Speaking", student: "Sinta M.", faculty: "Law", rating: "4.7", proof: "New peer", credits: 15, avatar: "bl" as const },
];

const teachMatches = [
  { skill: "Portfolio Critique", student: "Bima R.", faculty: "Engineering", rating: "4.9", proof: "Needs your design skill", credits: 22, avatar: "tl" as const },
  { skill: "Presentation Structure", student: "Alya K.", faculty: "Medicine", rating: "4.8", proof: "2 mutual peers", credits: 20, avatar: "tr" as const },
  { skill: "Excel for Research", student: "Rafi D.", faculty: "Psychology", rating: "4.6", proof: "Student ID verified", credits: 28, avatar: "br" as const },
];

function ExchangeHome() {
  const [mode, setMode] = useState<"Learning" | "Teaching">("Learning");
  const [requested, setRequested] = useState<string[]>([]);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const matches = mode === "Learning" ? learnMatches : teachMatches;

  const toggleRequest = (skill: string) => setRequested((current) => current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-primary font-display text-lg font-semibold text-primary-foreground shadow-sm">E</div>
            <div className="leading-none">
              <div className="font-display text-[17px] font-semibold">EXCHANGE</div>
              <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">UI Campus</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Workspace">
            {["Home", "Discover", "Offers", "Passport"].map((item) => (
              <Button key={item} variant="ghost" size="sm" onClick={() => setActiveNav(item)} className={activeNav === item ? "bg-accent text-foreground" : ""}>{item}</Button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground lg:flex"><Search className="size-3.5" /> Search skills or peers</div>
            <div className="relative">
              <Button variant="secondary" size="icon" aria-label="View notifications" onClick={() => setNoticeOpen((value) => !value)}><Bell className="size-4" /><span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-clay" /></Button>
              {noticeOpen && <div className="absolute right-0 top-11 w-72 rounded-lg border border-border bg-card p-3 shadow-xl"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Notifications</p><Button variant="ghost" size="icon" className="size-7" onClick={() => setNoticeOpen(false)} aria-label="Close notifications"><X className="size-3.5" /></Button></div><p className="mt-2 text-xs leading-5 text-muted-foreground">Your UI Sketching exchange is confirmed for Saturday at 10:00.</p></div>}
            </div>
            <StudentAvatar position="bl" name="Dita Prameswari" className="size-9" />
            <div className="hidden leading-tight sm:block"><div className="text-xs font-semibold">Dita Prameswari</div><div className="text-[11px] text-muted-foreground">Faculty of Economics</div></div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:py-9">
        <section className="mb-7 flex flex-wrap items-end justify-between gap-5 animate-exchange-rise">
          <div><p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Monday, 14 September · Depok</p><h1 className="max-w-2xl font-display text-2xl font-semibold leading-tight sm:text-[30px]">Good morning, Dita. You have <span className="text-primary">3 open requests</span> waiting.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Your UI Sketching session with three students is confirmed for Saturday. Keep value moving across campus.</p></div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm"><div className="grid size-11 place-items-center rounded-lg bg-butter/70"><Coins className="size-5" /></div><div><div className="font-display text-2xl font-semibold leading-none">248</div><div className="mt-1 text-[11px] text-muted-foreground">credits available</div></div></div>
        </section>

        {activeNav !== "Home" && <div className="mb-5 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm"><span><strong>{activeNav}</strong> is ready for the next pilot phase. Your home workspace remains visible below.</span><Button variant="ghost" size="icon" className="size-7" onClick={() => setActiveNav("Home")} aria-label="Dismiss"><X className="size-4" /></Button></div>}

        <div className="grid grid-cols-12 gap-5">
          <section className="col-span-12 lg:col-span-5">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3"><div><h2 className="font-display font-semibold">Your Skill Passport</h2><p className="mt-1 text-xs text-muted-foreground">Verified reputation across 3 faculties</p></div><span className="rounded-full bg-mint/60 px-2.5 py-1 text-[11px] font-semibold text-primary-strong">Level 4</span></div>
              <div className="mt-5"><div className="mb-2 flex justify-between text-xs"><span className="font-medium text-muted-foreground">Level 4 → Level 5</span><span className="font-semibold">172 / 220</span></div><Progress width="78%" color="bg-primary" /></div>
              <ul className="mt-6 space-y-4">
                <SkillProgress label="UI Sketching" status="3 of 4 verified" width="75%" color="bg-primary" delay="100ms" />
                <SkillProgress label="Financial Modeling" status="2 of 4 verified" width="50%" color="bg-butter" delay="200ms" />
                <SkillProgress label="Public Speaking" status="1 of 3 verified" width="33%" color="bg-clay" delay="300ms" />
              </ul>
              <div className="mt-6 border-t border-border pt-4"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Verified milestones</p><div className="flex flex-wrap gap-2"><Badge color="bg-mint/60" label="First Exchange" /><Badge color="bg-butter/60" label="Consistent Teacher" /><Badge color="bg-rose/50" label="Trusted Peer 4.9" /></div></div>
              <div className="mt-5 rounded-lg bg-background p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold">Passport strength</p><p className="mt-1 text-[11px] text-muted-foreground">Two more verified sessions unlock Level 5</p></div><div className="font-display text-xl font-semibold text-primary">78%</div></div></div>
            </div>
          </section>

          <section className="col-span-12 md:col-span-7 lg:col-span-4">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-display font-semibold">Today's matches</h2><span className="text-[11px] text-muted-foreground">9 open across UI</span></div>
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-muted p-1"><Button variant={mode === "Learning" ? "dark" : "ghost"} size="sm" onClick={() => setMode("Learning")}>Learning</Button><Button variant={mode === "Teaching" ? "dark" : "ghost"} size="sm" onClick={() => setMode("Teaching")}>Teaching</Button></div>
            <div className="space-y-3">{matches.map((match) => <MatchCard key={match.skill} {...match} teaching={mode === "Teaching"} requested={requested.includes(match.skill)} onRequest={() => toggleRequest(match.skill)} />)}</div>
          </section>

          <aside className="col-span-12 md:col-span-5 lg:col-span-3">
            <h2 className="mb-3 font-display font-semibold">Your offers</h2>
            <Offer featured skill="UI Sketching in 30 min" detail="3 students · Saturday 10:00" credits="+45 credits" slots="2 slots left" />
            <Offer skill="Excel for Economics" detail="1 student · Friday 15:00" credits="+30 credits" slots="3 slots left" />
            <div className="mt-4 rounded-lg border border-border bg-card p-4"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Trust signals</p><ul className="space-y-3"><Trust icon={<Check className="size-3.5" />} color="bg-mint/60" text="Student ID verified" /><Trust icon={<Star className="size-3.5" />} color="bg-butter/60" text="4.9 from 31 peer sessions" /><Trust icon={<Users className="size-3.5" />} color="bg-rose/50" text="12 mutual connections" /></ul><div className="mt-4 border-t border-border pt-4"><div className="flex items-center gap-3"><div className="flex -space-x-2"><StudentAvatar position="tr" name="Nadia" className="size-7 ring-2 ring-card" /><StudentAvatar position="br" name="Reza" className="size-7 ring-2 ring-card" /><StudentAvatar position="tl" name="Bima" className="size-7 ring-2 ring-card" /></div><p className="text-[11px] leading-4 text-muted-foreground">Nadia, Reza and 10 more exchanged with you</p></div></div></div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Progress({ width, color, delay }: { width: string; color: string; delay?: string }) { return <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full animate-passport-fill", color)} style={{ width, animationDelay: delay }} /></div>; }
function SkillProgress({ label, status, width, color, delay }: { label: string; status: string; width: string; color: string; delay: string }) { return <li><div className="mb-2 flex justify-between gap-2 text-xs"><span className="font-medium">{label}</span><span className="text-muted-foreground">{status}</span></div><Progress width={width} color={color} delay={delay} /></li>; }
function Badge({ color, label }: { color: string; label: string }) { return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium", color)}><Check className="size-3" />{label}</span>; }

type Match = { skill: string; student: string; faculty: string; rating: string; proof: string; credits: number; avatar: StudentAvatarProps["position"] };

function MatchCard({ skill, student, faculty, rating, proof, credits, avatar, teaching, requested, onRequest }: Match & { teaching: boolean; requested: boolean; onRequest: () => void }) {
  return <article className="rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"><div className="flex gap-3"><StudentAvatar position={avatar} name={student} className="size-11" /><div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><h3 className="truncate text-sm font-semibold">{skill}</h3><span className="grid size-4 shrink-0 place-items-center rounded-full bg-mint text-[9px] text-primary-strong"><Check className="size-2.5" /></span></div><p className="mt-0.5 truncate text-xs text-muted-foreground">{student} · {faculty}</p><div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground"><span className="inline-flex items-center gap-1"><Star className="size-3 fill-butter text-butter" />{rating}</span><span>·</span><span>{proof}</span></div></div></div><div className="mt-3 flex items-center justify-between"><span className="rounded-lg bg-mint/50 px-2.5 py-1 text-xs font-semibold text-primary-strong">{teaching ? "+" : ""}{credits} credits</span><Button size="sm" variant={requested ? "secondary" : "primary"} onClick={onRequest}>{requested ? <><Check className="size-3.5" /> Requested</> : <>{teaching ? "Offer help" : "Request seat"}<ChevronRight className="size-3.5" /></>}</Button></div></article>;
}

function Offer({ featured, skill, detail, credits, slots }: { featured?: boolean; skill: string; detail: string; credits: string; slots: string }) { return <div className={cn("mb-3 rounded-lg border p-4 shadow-sm", featured ? "border-primary-strong bg-primary-strong text-primary-foreground" : "border-border bg-card")}><div className="flex items-center justify-between text-xs"><span className={featured ? "text-mint" : "text-muted-foreground"}>Teaching</span><Check className={cn("size-4", featured ? "text-mint" : "text-primary")} /></div><h3 className="mt-2 text-sm font-semibold">{skill}</h3><p className={cn("mt-1 text-xs", featured ? "text-primary-foreground/70" : "text-muted-foreground")}>{detail}</p><div className="mt-4 flex items-center justify-between text-xs"><span className={cn("font-semibold", featured ? "text-butter" : "text-primary")}>{credits}</span><span className={featured ? "text-primary-foreground/70" : "text-muted-foreground"}>{slots}</span></div></div>; }
function Trust({ icon, color, text }: { icon: React.ReactNode; color: string; text: string }) { return <li className="flex items-center gap-2.5 text-xs"><span className={cn("grid size-6 shrink-0 place-items-center rounded-md", color)}>{icon}</span><span>{text}</span></li>; }