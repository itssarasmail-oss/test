"use client";
import React from "react";
import Image from "next/image";
import {
  User,
  Hash,
  BookOpen,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  Code2,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

/* ───────── Profile Info Card ───────── */
function InfoRow({ icon: Icon, label, value, copyable }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,245,196,0.08)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-base font-bold text-foreground">{value}</span>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-all duration-200 hover:border-primary/30 hover:bg-primary/10"
          title="نسخ"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}

/* ───────── Stat Card ───────── */
function StatCard({ icon: Icon, label, value, index }) {
  return (
    <div
      className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,245,196,0.12)] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out both",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,245,196,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="relative text-2xl font-extrabold text-foreground">
        {value}
      </span>
      <span className="relative text-sm font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/* ───────── Quick Action Card ───────── */
function ActionCard({ icon: Icon, title, description, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,245,196,0.12)] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out both",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,245,196,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-5 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{description}</p>
        <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
          <span>{"فتح"}</span>
          <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
      </div>
    </button>
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

/* ───────── Main Profile Component ───────── */
export default function StudentProfile() {
  // Demo student data
  const student = {
    name: "أحمد محمد الجيزاوي",
    code: "482916",
    division: "علمي علوم",
    year: "الصف الثالث الثانوي",
    joinDate: "سبتمبر 2025",
  };

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground" dir="rtl">
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-6">
          {/* ═══ Profile Header Card ═══ */}
          <header
            className="relative overflow-hidden rounded-3xl border border-border bg-card"
            style={{ animation: "fadeInUp 0.5s ease-out both" }}
          >
            {/* Background image */}
            <div className="relative h-44 w-full overflow-hidden sm:h-52">
              <Image
                src="/images/profile-bg.jpg"
                alt="Profile background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-card" />
            </div>

            {/* Avatar + Info */}
            <div className="relative px-6 pb-8 sm:px-10">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:gap-6" style={{ marginTop: "-3.5rem" }}>
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-background bg-card shadow-[0_0_30px_rgba(0,245,196,0.15)]">
                    <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  {/* Online dot */}
                  <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-3 border-card bg-primary shadow-[0_0_10px_rgba(0,245,196,0.5)]" />
                </div>

                {/* Name & Badge */}
                <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
                  <h1 className="text-balance text-2xl font-extrabold text-foreground sm:text-3xl">
                    {student.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {student.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      {student.division}
                    </span>
                  </div>
                </div>

                {/* Student code badge */}
                <div className="flex flex-col items-center gap-1 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {"كود الطالب"}
                  </span>
                  <span
                    className="text-2xl font-extrabold tracking-[0.25em] text-primary"
                    dir="ltr"
                  >
                    {student.code}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* ═══ Stats Row ═══ */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              icon={BookOpen}
              label="المواد المسجلة"
              value="6"
              index={0}
            />
            <StatCard
              icon={GraduationCap}
              label="المحاضرات المشاهدة"
              value="42"
              index={1}
            />
            <StatCard
              icon={Calendar}
              label="ايام النشاط"
              value="18"
              index={2}
            />
            <StatCard
              icon={Hash}
              label="اجمالي الفيديوهات"
              value="156"
              index={3}
            />
          </div>

          {/* ═══ Info Section ═══ */}
          <div
            className="flex flex-col gap-4"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.2s both",
            }}
          >
            <h2 className="text-xl font-bold text-foreground">
              {"بيانات الطالب"}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoRow
                icon={User}
                label="الاسم بالكامل"
                value={student.name}
              />
              <InfoRow
                icon={Hash}
                label="كود الطالب"
                value={student.code}
                copyable
              />
              <InfoRow
                icon={BookOpen}
                label="الشعبة"
                value={student.division}
              />
              <InfoRow
                icon={GraduationCap}
                label="السنة الدراسية"
                value={student.year}
              />
              <InfoRow
                icon={Mail}
                label="البريد الالكتروني"
                value={student.email}
                copyable
              />
              <InfoRow
                icon={Phone}
                label="رقم الهاتف"
                value={student.phone}
                copyable
              />
              <InfoRow
                icon={Calendar}
                label="تاريخ الانضمام"
                value={student.joinDate}
              />
            </div>
          </div>

          {/* ═══ Quick Actions ═══ */}
          <div
            className="flex flex-col gap-4"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.3s both",
            }}
          >
            <h2 className="text-xl font-bold text-foreground">
              {"اختصارات سريعة"}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <ActionCard
                icon={BookOpen}
                title="المواد الدراسية"
                description="تصفح جميع المواد والمحاضرات"
                index={0}
                onClick={() => (window.location.href = "/")}
              />
              <ActionCard
                icon={GraduationCap}
                title="نتائج الامتحانات"
                description="عرض نتائج الامتحانات السابقة"
                index={1}
              />
              <ActionCard
                icon={Calendar}
                title="جدول المحاضرات"
                description="مواعيد المحاضرات القادمة"
                index={2}
              />
            </div>
          </div>

          {/* ═══ Developer Badge ═══ */}
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
      </div>
    </div>
  );
}