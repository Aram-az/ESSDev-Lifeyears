// src/pages/DashboardProto.jsx
import { useState, useMemo } from "react";
import PageHeader from "../components/shared/PageHeader";

const TODAY = new Date("2024-11-14");

const APPOINTMENTS = [
  {
    id: 1,
    name: "Annual Physical Exam",
    confirmationStatus: "confirmed",
    status: "upcoming", // for filters: upcoming | overdue | completed
    doctor: "Dr. Sarah Johnson",
    specialty: "Primary Care",
    date: "2024-11-19",
    time: "10:00 AM",
    location: "Main Health Center, Suite 302",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "Dental Cleaning",
    confirmationStatus: "confirmed",
    status: "upcoming",
    doctor: "Dr. Michael Chen",
    specialty: "Dentistry",
    date: "2024-11-24",
    time: "2:30 PM",
    location: "Smile Dental Care",
    phone: "(555) 234-5678",
  },
  {
    id: 3,
    name: "Eye Examination",
    confirmationStatus: "pending",
    status: "upcoming",
    doctor: "Dr. Emily Rodriguez",
    specialty: "Ophthalmology",
    date: "2024-12-04",
    time: "11:00 AM",
    location: "Vision Care Associates",
    phone: "(555) 345-6789",
  },
  {
    id: 4,
    name: "Dermatology Screening",
    confirmationStatus: "confirmed",
    status: "completed",
    doctor: "Dr. James Park",
    specialty: "Dermatology",
    date: "2024-10-14",
    time: "9:30 AM",
    location: "Skin Health Clinic, Floor 2",
    phone: "(555) 456-7890",
  },
];

const FILTERS = ["all", "upcoming", "overdue", "completed"];

function DashboardProto() {
  const [activeFilter, setActiveFilter] = useState("all");

  const stats = useMemo(() => {
    const summary = { upcoming: 0, overdue: 0, completed: 0 };
    APPOINTMENTS.forEach((apt) => {
      if (summary[apt.status] !== undefined) summary[apt.status] += 1;
    });

    const upcoming = APPOINTMENTS.filter((a) => a.status === "upcoming");
    let daysUntilNext = null;

    if (upcoming.length > 0) {
      const next = upcoming.reduce((min, a) => {
        const d = new Date(a.date);
        return d < new Date(min.date) ? a : min;
      }, upcoming[0]);

      const diffMs = new Date(next.date) - TODAY;
      daysUntilNext = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }

    const pendingCount = APPOINTMENTS.filter(
      (a) => a.confirmationStatus === "pending"
    ).length;

    return {
      daysUntilNext,
      totalScheduled: APPOINTMENTS.length,
      pendingConfirmations: pendingCount,
      ...summary,
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") return APPOINTMENTS;
    return APPOINTMENTS.filter((apt) => apt.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl">
          Track your preventative health appointments and screenings.
        </p>
      </header>

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
        <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Upcoming Appointments
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Your scheduled preventative health visits.
              </p>
            </div>

            {/* Filter chips */}
            <div className="mt-3 inline-flex flex-wrap gap-2 sm:mt-0">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={[
                    "px-3 py-1.5 rounded-full text-[11px] sm:text-xs border transition-colors",
                    activeFilter === filter
                      ? "bg-rose-500 text-white border-rose-500"
                      : "bg-white text-rose-700 border-rose-200 hover:bg-rose-50",
                  ].join(" ")}
                >
                  {filter === "all"
                    ? "All"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-4">
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

          <button
            type="button"
            className="mt-5 w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-600"
          >
            Schedule New Appointment
          </button>
        </div>

        {/* Calendar column */}
        <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Appointment Calendar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                November 2024 (static prototype)
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full border border-rose-200 px-3 py-1 text-xs text-rose-700 hover:bg-rose-50"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-full border border-rose-200 px-3 py-1 text-xs text-rose-700 hover:bg-rose-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Very simple static calendar grid */}
          <div className="mt-4 text-xs text-slate-600">
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
        </div>
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
    <div className="flex items-center justify-between rounded-3xl border border-rose-200 bg-rose-50/40 px-4 py-4 sm:px-5 sm:py-5">
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
    </div>
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

  const confirmationStyles =
    confirmationStatus === "confirmed"
      ? "bg-rose-500 text-white"
      : "bg-rose-100 text-rose-700";

  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <article className="rounded-2xl border border-rose-200 bg-white p-4 sm:p-5">
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
          <span
            className={[
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              confirmationStyles,
            ].join(" ")}
          >
            {confirmationStatus}
          </span>
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
        <button
          type="button"
          className="w-full rounded-full border border-rose-300 bg-white px-4 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 sm:w-auto"
        >
          Reschedule
        </button>
        <button
          type="button"
          className="w-full rounded-full border border-rose-300 bg-white px-4 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </article>
  );
}

export default DashboardProto;
