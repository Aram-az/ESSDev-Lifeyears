// src/pages/DashboardProto.jsx
import { useState, useMemo, useEffect } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageTitle from "../components/ui/PageTitle";
import SectionTitle from "../components/ui/SectionTitle";
import { getMockRecommendations, getMockUser } from "../api";

const TODAY = new Date("2024-11-14");
const FILTERS = ["all", "upcoming", "overdue", "completed"];

function DashboardProto() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        setError(null);

        const [userRes, recs] = await Promise.all([
          getMockUser(),
          getMockRecommendations(),
        ]);

        setUser(userRes?.data ?? userRes);

        const list = Array.isArray(recs)
          ? recs
          : recs.recommendations || recs.data || [];

        if (!Array.isArray(list)) {
          throw new Error("Unexpected mock API response shape");
        }

        const mapped = list.map((rec, idx) => ({
          id: rec.id ?? idx,
          name: rec.title ?? "Health appointment",
          confirmationStatus: rec.confirmationStatus ?? "confirmed",
          status: rec.status ?? "upcoming", // upcoming | overdue | completed
          doctor: rec.doctor ?? "Provider",
          specialty: rec.specialty ?? "General",
          date: rec.date ?? rec.nextDate ?? "2024-11-19",
          time: rec.time ?? "10:00 AM",
          location: rec.location ?? "Clinic",
          phone: rec.phone ?? "(555) 000-0000",
        }));

        setAppointments(mapped);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setError("Failed to load your appointments.");
        setStatus("error");
      }
    }

    load();
  }, []);

  const stats = useMemo(() => {
    const summary = { upcoming: 0, overdue: 0, completed: 0 };
    appointments.forEach((apt) => {
      if (summary[apt.status] !== undefined) summary[apt.status] += 1;
    });

    const upcoming = appointments.filter((a) => a.status === "upcoming");
    let daysUntilNext = null;

    if (upcoming.length > 0) {
      const next = upcoming.reduce((min, a) => {
        const d = new Date(a.date);
        return d < new Date(min.date) ? a : min;
      }, upcoming[0]);

      const diffMs = new Date(next.date) - TODAY;
      daysUntilNext = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }

    const pendingCount = appointments.filter(
      (a) => a.confirmationStatus === "pending"
    ).length;

    return {
      daysUntilNext,
      totalScheduled: appointments.length,
      pendingConfirmations: pendingCount,
      ...summary,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") return appointments;
    return appointments.filter((apt) => apt.status === activeFilter);
  }, [activeFilter, appointments]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            {user?.name ? `Hi, ${user.name}` : "Dashboard"}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl">
            Track your preventative health appointments and screenings.
          </p>
        </header>
        <div className="flex items-center justify-center py-16">
          <div className="text-sm text-slate-500">
            Loading your appointments…
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            {user?.name ? `Hi, ${user.name}` : "Dashboard"}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl">
            Track your preventative health appointments and screenings.
          </p>
        </header>
        <div className="max-w-xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? "Something went wrong loading your dashboard."}
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center rounded-full border border-rose-300 bg-white px-4 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50"
        >
          Retry
        </button>
      </div>
    );
  }

  // Normal render (success / empty handled inside)
  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageTitle
        description="Track your preventative health appointments and screenings."
      >
        {user?.name ? `Hi, ${user.name}` : "Dashboard"}
      </PageTitle>

      {/* Top stats row */}
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Next Appointment"
          value={stats.daysUntilNext != null ? stats.daysUntilNext : "—"}
          unit="days"
          icon="calendar"
        />
        <StatCard
          label="Total Scheduled"
          value={stats.totalScheduled}
          unit="appointments"
          icon="check"
        />
        <StatCard
          label="Pending Confirmations"
          value={stats.pendingConfirmations}
          unit="pending"
          icon="alert"
        />
      </section>

      {/* Main content: Upcoming list + Calendar */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr),minmax(0,1.3fr)]">
        {/* Upcoming appointments column */}
        <Card className="bg-rose-50/40 border-rose-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
            <SectionTitle
              description="Your scheduled preventative health visits."
              className="mb-0"
            >
              Upcoming Appointments
            </SectionTitle>

            {/* Filter chips */}
            <div className="mt-3 inline-flex flex-wrap gap-2 sm:mt-0">
              {FILTERS.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={
                    activeFilter === filter
                      ? "bg-rose-500 border-rose-500 hover:bg-rose-600"
                      : "text-rose-700 border-rose-200 hover:bg-rose-50 hover:text-rose-800"
                  }
                >
                  {filter === "all"
                    ? "All"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50 px-4 py-8 text-center text-sm text-rose-500">
                No appointments for this filter.
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))
            )}
          </div>

          <Button
            variant="primary"
            className="mt-5 w-full bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
          >
            Schedule New Appointment
          </Button>
        </Card>

        {/* Calendar column */}
        <Card className="bg-rose-50/40 border-rose-200 flex flex-col h-fit">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle
              description="November 2024 (static prototype)"
              className="mb-0"
            >
              Appointment Calendar
            </SectionTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1 text-rose-700 border-rose-200 hover:bg-rose-50"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1 text-rose-700 border-rose-200 hover:bg-rose-50"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Very simple static calendar grid */}
          <div className="text-xs text-slate-600">
            <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* first week: blanks until Fri 1st */}
              <span />
              <span />
              <span />
              <span />
              <span />
              <DayCell day={1} />
              <DayCell day={2} />
              {/* second week */}
              <DayCell day={3} />
              <DayCell day={4} />
              <DayCell day={5} />
              <DayCell day={6} />
              <DayCell day={7} />
              <DayCell day={8} />
              <DayCell day={9} />
              {/* third week */}
              <DayCell day={10} />
              <DayCell day={11} />
              <DayCell day={12} />
              <DayCell day={13} />
              <DayCell day={14} />
              <DayCell day={15} />
              <DayCell day={16} />
              {/* fourth week */}
              <DayCell day={17} />
              <DayCell day={18} />
              <HighlightDay day={19} /> {/* next appointment */}
              <DayCell day={20} />
              <DayCell day={21} />
              <DayCell day={22} />
              <HighlightDay day={24} /> {/* another appointment */}
              {/* rest can be simple cells */}
              <DayCell day={23} />
              <DayCell day={25} />
              <DayCell day={26} />
              <DayCell day={27} />
              <DayCell day={28} />
              <DayCell day={29} />
              <DayCell day={30} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
            <span>Appointment scheduled</span>
          </div>
        </Card>
      </section>
    </div>
  );
}

// Small helpers for the calendar
function DayCell({ day }) {
  return (
    <div className="flex h-8 items-center justify-center rounded-lg text-slate-700">
      {day}
    </div>
  );
}

function HighlightDay({ day }) {
  return (
    <div className="flex h-8 items-center justify-center rounded-lg border border-rose-300 bg-rose-100 text-rose-700 font-medium">
      {day}
    </div>
  );
}

function StatCard({ label, value, unit, icon }) {
  const iconChar = icon === "calendar" ? "📅" : icon === "check" ? "✅" : "⚠️";

  return (
    <Card className="flex items-center justify-between bg-rose-50/40 border-rose-200 px-4 py-4 sm:px-5 sm:py-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-rose-500">
          {label}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-slate-900">{value}</span>
          <span className="text-xs text-slate-500">{unit}</span>
        </div>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-lg">
        {iconChar}
      </div>
    </Card>
  );
}

function AppointmentCard({ appointment }) {
  const {
    name,
    confirmationStatus,
    status,
    doctor,
    specialty,
    date,
    time,
    location,
    phone,
  } = appointment;

  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Card className="border-rose-200 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            {name}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {doctor} • {specialty}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge
            variant={
              confirmationStatus === "confirmed" ? "confirmed" : "pending"
            }
            className={
              confirmationStatus === "confirmed"
                ? "bg-rose-500 text-white"
                : "bg-rose-100 text-rose-700"
            }
          >
            {confirmationStatus}
          </Badge>
          <span className="text-[11px] text-slate-400">{statusLabel}</span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-rose-500">📅</span>
          <span>{date}</span>
          <span className="mx-1 text-slate-400">•</span>
          <span className="text-rose-500">⏰</span>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-rose-500">📍</span>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-rose-500">📞</span>
          <span>{phone}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs border-rose-300 text-rose-700 hover:bg-rose-50"
        >
          Reschedule
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs border-rose-300 text-rose-700 hover:bg-rose-50"
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
}

export default DashboardProto;
