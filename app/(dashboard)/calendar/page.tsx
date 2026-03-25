"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { BS_CALENDAR, toDevanagari } from "@/lib/constants";

type EventType = "pesi" | "tarek" | "meeting" | "deadline";
interface CalEvent { type: EventType; label: string; caseNo?: string; time?: string; }

const EVENT_COLORS: Record<EventType, string> = {
  pesi:     "#3B82F6",
  tarek:    "#F59E0B",
  meeting:  "#10B981",
  deadline: "#EF4444",
};

// Calendar events per day (for current month असोज)
const MONTH_EVENTS: Record<number, CalEvent[]> = {
  1:  [{ type: "meeting", label: "Client Intake — Ram KC", time: "13:00" }],
  2:  [{ type: "pesi", label: "ND-2081-003 Pesi", caseNo: "ND-2081-003", time: "10:30" }],
  4:  [{ type: "deadline", label: "Reply submission — ND-2081-004", time: "EOD" }],
  5:  [{ type: "meeting", label: "Supreme Court Prep", time: "10:00" }, { type: "tarek", label: "ND-2081-007 Sifaris", time: "13:00" }],
  7:  [{ type: "pesi", label: "ND-2081-001 Pesi", caseNo: "ND-2081-001", time: "10:00" }, { type: "pesi", label: "ND-2081-002 Pesi", caseNo: "ND-2081-002", time: "11:30" }, { type: "pesi", label: "ND-2081-004 Pesi", caseNo: "ND-2081-004", time: "14:00" }, { type: "pesi", label: "ND-2081-009 Pesi", caseNo: "ND-2081-009", time: "12:00" }, { type: "pesi", label: "ND-2081-011 Pesi", caseNo: "ND-2081-011", time: "09:00" }, { type: "pesi", label: "ND-2081-006 Pesi", caseNo: "ND-2081-006", time: "15:30" }],
  8:  [{ type: "meeting", label: "Sita Devi — Online Consult", time: "14:00" }],
  9:  [{ type: "tarek", label: "ND-2081-001 Survey Tarek", time: "EOD" }],
  10: [{ type: "pesi", label: "ND-2081-003 Saptahik", caseNo: "ND-2081-003", time: "10:30" }, { type: "pesi", label: "ND-2081-007 Saptahik", caseNo: "ND-2081-007", time: "13:00" }, { type: "meeting", label: "Evidence Review — ND-2081-002", time: "16:00" }],
  11: [{ type: "meeting", label: "Client Intake — Ram KC", time: "13:00" }],
  12: [{ type: "meeting", label: "Mediation — Nepal Textile", time: "11:00" }, { type: "pesi", label: "ND-2081-008 Saptahik", caseNo: "ND-2081-008", time: "15:00" }],
  14: [{ type: "pesi", label: "ND-2081-010 Revenue Pesi", caseNo: "ND-2081-010", time: "11:00" }, { type: "pesi", label: "ND-2081-012 Pesi", caseNo: "ND-2081-012", time: "14:30" }],
  15: [{ type: "meeting", label: "Monthly Team Meeting", time: "09:30" }],
  18: [{ type: "pesi", label: "ND-2081-001 Purak", caseNo: "ND-2081-001", time: "10:00" }],
  20: [{ type: "tarek", label: "ND-2081-009 Partition Survey", time: "11:00" }],
  21: [{ type: "pesi", label: "ND-2081-002 Purak", caseNo: "ND-2081-002", time: "09:30" }],
  23: [{ type: "deadline", label: "Supreme Court brief — ND-2081-007", time: "EOD" }],
  25: [{ type: "pesi", label: "ND-2081-005 Faisala Tarek", caseNo: "ND-2081-005", time: "11:00" }],
  27: [{ type: "meeting", label: "Pre-hearing prep — ND-2081-002", time: "14:00" }],
  28: [{ type: "tarek", label: "ND-2081-011 Protection Review", time: "09:00" }],
  30: [{ type: "deadline", label: "Tenant eviction compliance check", time: "EOD" }],
};

// Month stats
const MONTHS_DATA: Record<number, { pesi: number; tarek: number; meetings: number; deadlines: number }> = {
  0: { pesi: 4, tarek: 2, meetings: 3, deadlines: 1 },
  1: { pesi: 6, tarek: 3, meetings: 4, deadlines: 2 },
  2: { pesi: 8, tarek: 4, meetings: 5, deadlines: 3 },
  3: { pesi: 7, tarek: 3, meetings: 4, deadlines: 2 },
  4: { pesi: 5, tarek: 2, meetings: 3, deadlines: 1 },
  5: { pesi: 14, tarek: 5, meetings: 8, deadlines: 3 },
  6: { pesi: 10, tarek: 4, meetings: 6, deadlines: 2 },
  7: { pesi: 9, tarek: 3, meetings: 5, deadlines: 2 },
  8: { pesi: 7, tarek: 3, meetings: 4, deadlines: 1 },
  9: { pesi: 6, tarek: 2, meetings: 3, deadlines: 2 },
  10: { pesi: 5, tarek: 2, meetings: 3, deadlines: 1 },
  11: { pesi: 4, tarek: 2, meetings: 2, deadlines: 1 },
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(5); // असोज = index 5
  const [selectedDay, setSelectedDay] = useState<number | null>(7);
  const monthName = BS_CALENDAR.months[currentMonth];
  const stats = MONTHS_DATA[currentMonth] || { pesi: 0, tarek: 0, meetings: 0, deadlines: 0 };

  // use real events for असोज, placeholder for others
  const events = currentMonth === 5 ? MONTH_EVENTS : {};
  const selectedEvents = selectedDay ? (events[selectedDay] || []) : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">BS Calendar</h2>
          <p className="text-sm text-slate-500">Bikram Sambat — Event & Pesi Schedule</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
          <Icon name="plus" size={16} /> Add Event
        </button>
      </div>

      {/* Legend + Stats */}
      <div className="flex gap-3 flex-wrap items-center">
        {(["pesi", "tarek", "meeting", "deadline"] as EventType[]).map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: EVENT_COLORS[type] }} />
            <span className="text-xs text-slate-500 capitalize">{type}</span>
          </div>
        ))}
        <div className="ml-auto flex gap-3">
          {[
            { label: "Pesi", val: stats.pesi, color: "#3B82F6" },
            { label: "Tarek", val: stats.tarek, color: "#F59E0B" },
            { label: "Meetings", val: stats.meetings, color: "#10B981" },
            { label: "Deadlines", val: stats.deadlines, color: "#EF4444" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold" style={{ color: s.color }}>{s.val}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100" style={{ background: "#1A2B4A" }}>
            <button onClick={() => { setCurrentMonth((m) => Math.max(0, m - 1)); setSelectedDay(null); }} className="text-white hover:bg-white hover:bg-opacity-10 rounded-lg p-2 transition-colors">
              <Icon name="chevronRight" size={18} className="rotate-180" />
            </button>
            <div className="text-center">
              <p className="text-white font-bold text-xl">{monthName}</p>
              <p className="text-sm" style={{ color: "#C9A84C" }}>२०८१ — Bikram Sambat</p>
            </div>
            <button onClick={() => { setCurrentMonth((m) => Math.min(11, m + 1)); setSelectedDay(null); }} className="text-white hover:bg-white hover:bg-opacity-10 rounded-lg p-2 transition-colors">
              <Icon name="chevronRight" size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-100">
            {BS_CALENDAR.days.map((d) => (
              <div key={d} className="py-2 text-center text-xs font-semibold text-slate-500 bg-slate-50">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {/* offset — असोज starts on Tuesday (index 2) */}
            {[...Array(2)].map((_, i) => (
              <div key={`e${i}`} className="min-h-[72px] border-b border-r border-slate-50 bg-slate-50 bg-opacity-40" />
            ))}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const dayEvents = events[day] || [];
              const isToday = day === 7 && currentMonth === 5;
              const isSelected = day === selectedDay;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  className={`min-h-[72px] border-b border-r border-slate-50 p-1 cursor-pointer transition-colors ${isToday ? "bg-blue-50" : isSelected ? "bg-amber-50" : "hover:bg-slate-50"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 mx-auto ${isToday ? "text-white" : isSelected ? "text-white" : "text-slate-700"}`}
                    style={isToday ? { background: "#1A2B4A" } : isSelected ? { background: "#C9A84C" } : {}}>
                    {toDevanagari(day)}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map((e, ei) => (
                      <div key={ei} className="text-white px-1 py-0.5 rounded truncate font-medium" style={{ background: EVENT_COLORS[e.type], fontSize: "9px" }}>
                        {e.label}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-slate-400 text-center" style={{ fontSize: "9px" }}>+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Detail Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100" style={{ background: "#F8F5EE" }}>
            <p className="font-bold text-slate-800">
              {selectedDay ? `${monthName} ${toDevanagari(selectedDay)}, २०८१` : "Select a day"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedEvents.length > 0 ? `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""}` : "No events"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {selectedEvents.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {selectedEvents.map((ev, idx) => (
                  <div key={idx} className="p-4 flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: EVENT_COLORS[ev.type] }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{ev.label}</p>
                      {ev.caseNo && <p className="text-xs text-blue-600 font-mono mt-0.5">{ev.caseNo}</p>}
                      {ev.time && <p className="text-xs text-slate-400 mt-0.5">🕐 {ev.time}</p>}
                      <span className="text-xs capitalize px-2 py-0.5 rounded-full mt-1 inline-block font-medium" style={{ background: EVENT_COLORS[ev.type] + "22", color: EVENT_COLORS[ev.type] }}>
                        {ev.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-slate-300">
                <Icon name="calendar" size={28} className="mb-2" />
                <p className="text-sm">{selectedDay ? "No events this day" : "Click a day to view events"}</p>
              </div>
            )}
          </div>

          {selectedDay && (
            <div className="p-4 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
                <Icon name="plus" size={16} /> Add Event on {toDevanagari(selectedDay)} {monthName}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
