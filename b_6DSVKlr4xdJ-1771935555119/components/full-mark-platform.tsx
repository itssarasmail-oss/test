"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Loader2,
  User,
  PlayCircle,
  Play,
  ChevronLeft,
  Home,
  Code2,
  ArrowRight,
} from "lucide-react";

/* ───────── Types ───────── */
interface Video {
  video_name?: string;
  url: string;
}
interface Lecture {
  lecture_name: string;
  videos: Video[];
}
interface Chapter {
  chapter_name: string;
  lectures: Lecture[];
}
interface Teacher {
  teacher_name: string;
  chapters: Chapter[];
}
interface Subject {
  subject_name: string;
  teachers: Teacher[];
}
interface Year {
  year_name: string;
  subjects: Subject[];
}

type Step = "subjects" | "teachers" | "chapters" | "lectures" | "videos";

/* ───────── Subject images ───────── */
const subjectImages: Record<string, string> = {
  "فيزياء": "/images/physics.jpg",
  English: "/images/english.jpg",
  "لغة عربية": "/images/arabic.jpg",
  "Le français": "/images/french.jpg",
  "أحياء": "/images/biology.jpg",
  "كيمياء": "/images/chemistry.jpg",
};

const subjectOrder = [
  "فيزياء",
  "English",
  "لغة عربية",
  "Le français",
  "أحياء",
  "كيمياء",
];

/* ───────── Reusable Card ───────── */
function PlatformCard({
  imageSrc,
  title,
  subtitle,
  actionLabel,
  index,
  onClick,
}: {
  imageSrc: string;
  title: string;
  subtitle?: string;
  actionLabel: string;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,245,196,0.12)] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out both",
      }}
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,245,196,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Image */}
      <div className="relative mx-3 mt-3 overflow-hidden rounded-xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-background">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-1.5 px-4 pb-5 pt-4">
        <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
      </div>
    </button>
  );
}

/* ───────── Link Card (for videos) ───────── */
function VideoCard({
  imageSrc,
  title,
  url,
  index,
}: {
  imageSrc: string;
  title: string;
  url: string;
  index: number;
}) {
  return (
    <div
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,245,196,0.12)]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out both",
      }}
    >
      {/* Image / thumbnail */}
      <div className="relative mx-3 mt-3 overflow-hidden rounded-xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-background">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/30 group-hover:shadow-[0_0_30px_rgba(0,245,196,0.3)]">
              <Play className="mr-[-2px] h-6 w-6 text-primary" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-4 pb-5 pt-4">
        <h3 className="text-center text-lg font-bold text-foreground">
          {title}
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,245,196,0.3)] hover:scale-[1.01] active:scale-[0.99]"
        >
          <PlayCircle size={20} />
          {"تشغيل الآن"}
        </a>
      </div>
    </div>
  );
}

/* ───────── Animated Background ───────── */
function AnimatedBg() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute -top-32 right-1/4 h-96 w-96 rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #00f5c4, transparent 70%)",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, #00f5c4, transparent 70%)",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

/* ───────── Section Header ───────── */
function SectionHeader({
  title,
  subtitle,
  step,
  selection,
  onNavigate,
}: {
  title: string;
  subtitle: string;
  step: Step;
  selection: SelectionState;
  onNavigate: (s: Step) => void;
}) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #00f5c4, transparent 70%)",
        }}
      />
      <div className="relative">
        <Breadcrumbs step={step} selection={selection} onNavigate={onNavigate} />
        <h1 className="mt-5 text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </header>
  );
}

/* ───────── Main Component ───────── */
interface SelectionState {
  year: Year | null;
  subject: Subject | null;
  teacher: Teacher | null;
  chapter: Chapter | null;
  lecture: Lecture | null;
}

export default function FullMarkPlatform() {
  const [rawData, setRawData] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>("subjects");
  const [selection, setSelection] = useState<SelectionState>({
    year: null,
    subject: null,
    teacher: null,
    chapter: null,
    lecture: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://uploadi.vercel.app/data.json");
        const data: Year[] = await res.json();
        setRawData(data);
        if (data.length > 0)
          setSelection((prev) => ({ ...prev, year: data[0] }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentYear = selection.year;

  const subjects = currentYear
    ? [...currentYear.subjects].sort((a, b) => {
        const idxA = subjectOrder.indexOf(a.subject_name);
        const idxB = subjectOrder.indexOf(b.subject_name);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
      })
    : [];

  const handleRefresh = () => {
    setLoading(true);
    fetch("https://uploadi.vercel.app/data.json")
      .then((r) => r.json())
      .then((data: Year[]) => {
        setRawData(data);
        if (data.length > 0) setSelection((p) => ({ ...p, year: data[0] }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  /* Loading */
  if (loading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background">
        <div className="relative">
          <div
            className="absolute inset-0 animate-ping rounded-full opacity-20"
            style={{ backgroundColor: "#00f5c4" }}
          />
          <Loader2 className="relative h-14 w-14 animate-spin text-primary" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-bold text-foreground">Full Mark</p>
          <p className="animate-pulse text-sm text-muted-foreground">
            {"جاري تحميل المنصة..."}
          </p>
        </div>
      </div>
    );

  return (
    <div
      className="relative min-h-screen bg-background font-sans text-foreground"
      dir="rtl"
    >
      <AnimatedBg />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 15px) scale(0.95);
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        {/* ═══════════ SUBJECTS ═══════════ */}
        {step === "subjects" && currentYear && (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <header className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full opacity-[0.07]"
                style={{
                  background:
                    "radial-gradient(circle, #00f5c4, transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,245,196,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  {"تحديث"}
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <h1 className="text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
                      {"المواد الدراسية"}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {"تصفح محتوى سنة (" +
                        (currentYear.year_name || "2026") +
                        ")"}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_20px_rgba(0,245,196,0.15)]">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                </div>
              </div>
            </header>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((sub, idx) => (
                <PlatformCard
                  key={idx}
                  imageSrc={subjectImages[sub.subject_name] || "/images/physics.jpg"}
                  title={sub.subject_name}
                  subtitle={sub.teachers.length + " مدرس"}
                  actionLabel="دخول المادة"
                  index={idx}
                  onClick={() => {
                    setSelection((p) => ({
                      ...p,
                      subject: sub,
                      teacher: null,
                      chapter: null,
                      lecture: null,
                    }));
                    setStep("teachers");
                  }}
                />
              ))}
            </div>

            {/* Developer badge */}
            <div className="flex justify-start">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    PRO DEVELOPER
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    ELGIZAWY
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ TEACHERS ═══════════ */}
        {step === "teachers" && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: "fadeInUp 0.5s ease-out" }}
          >
            <SectionHeader
              title="اختر المدرس"
              subtitle={"مادة " + (selection.subject?.subject_name || "")}
              step={step}
              selection={selection}
              onNavigate={setStep}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {selection.subject?.teachers.map((t, idx) => (
                <PlatformCard
                  key={idx}
                  imageSrc="/images/teacher.jpg"
                  title={t.teacher_name}
                  subtitle={t.chapters.length + " فصل"}
                  actionLabel="عرض الفصول"
                  index={idx}
                  onClick={() => {
                    setSelection((p) => ({
                      ...p,
                      teacher: t,
                      chapter: null,
                      lecture: null,
                    }));
                    setStep("chapters");
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ CHAPTERS ═══════════ */}
        {step === "chapters" && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: "fadeInUp 0.5s ease-out" }}
          >
            <SectionHeader
              title="الفصول"
              subtitle={
                (selection.teacher?.teacher_name || "") +
                " - " +
                (selection.subject?.subject_name || "")
              }
              step={step}
              selection={selection}
              onNavigate={setStep}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {selection.teacher?.chapters.map((chapter, idx) => (
                <PlatformCard
                  key={idx}
                  imageSrc="/images/chapter.jpg"
                  title={chapter.chapter_name}
                  subtitle={chapter.lectures.length + " محاضرة"}
                  actionLabel="عرض المحاضرات"
                  index={idx}
                  onClick={() => {
                    setSelection((p) => ({ ...p, chapter, lecture: null }));
                    setStep("lectures");
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ LECTURES ═══════════ */}
        {step === "lectures" && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: "fadeInUp 0.5s ease-out" }}
          >
            <SectionHeader
              title="المحاضرات"
              subtitle={selection.chapter?.chapter_name || ""}
              step={step}
              selection={selection}
              onNavigate={setStep}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {selection.chapter?.lectures.map((lec, idx) => (
                <PlatformCard
                  key={idx}
                  imageSrc="/images/lecture.jpg"
                  title={lec.lecture_name}
                  subtitle={lec.videos.length + " فيديو"}
                  actionLabel="عرض الفيديوهات"
                  index={idx}
                  onClick={() => {
                    setSelection((p) => ({ ...p, lecture: lec }));
                    setStep("videos");
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ VIDEOS ═══════════ */}
        {step === "videos" && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: "fadeInUp 0.5s ease-out" }}
          >
            <SectionHeader
              title="الفيديوهات"
              subtitle={selection.lecture?.lecture_name || ""}
              step={step}
              selection={selection}
              onNavigate={setStep}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {selection.lecture?.videos.map((vid, idx) => (
                <VideoCard
                  key={idx}
                  imageSrc="/images/video.jpg"
                  title={vid.video_name || `فيديو رقم ${idx + 1}`}
                  url={vid.url}
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── Breadcrumbs ───────── */
function Breadcrumbs({
  step,
  selection,
  onNavigate,
}: {
  step: Step;
  selection: SelectionState;
  onNavigate: (step: Step) => void;
}) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <button
        onClick={() => onNavigate("subjects")}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <Home size={15} />
        {"الرئيسية"}
      </button>

      {selection.subject &&
        ["teachers", "chapters", "lectures", "videos"].includes(step) && (
          <>
            <ChevronLeft size={14} className="opacity-30" />
            <button
              onClick={() => onNavigate("teachers")}
              className="rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
            >
              {selection.subject.subject_name}
            </button>
          </>
        )}

      {selection.teacher &&
        ["chapters", "lectures", "videos"].includes(step) && (
          <>
            <ChevronLeft size={14} className="opacity-30" />
            <button
              onClick={() => onNavigate("chapters")}
              className="rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
            >
              {selection.teacher.teacher_name}
            </button>
          </>
        )}

      {selection.chapter && ["lectures", "videos"].includes(step) && (
        <>
          <ChevronLeft size={14} className="opacity-30" />
          <button
            onClick={() => onNavigate("lectures")}
            className="rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            {selection.chapter.chapter_name}
          </button>
        </>
      )}
    </nav>
  );
}
