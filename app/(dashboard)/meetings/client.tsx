"use client";

import { Icon } from "@/components/ui/icon";
import type { Meeting, Profile } from "@/lib/types";

export function MeetingsClient({ meetings, profiles }: { meetings: Meeting[]; profiles: Profile[] }) {
  function getAttendeeNames(ids: string[]) {
    return ids.map((id) => profiles.find((p) => p.id === id)?.name || id);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Meetings & Events</h2>
          <p className="text-sm text-slate-500">{meetings.length} meetings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
          <Icon name="plus" size={16} /> New Meeting
        </button>
      </div>

      <div className="space-y-4">
        {meetings.length > 0 ? meetings.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.is_online ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {m.is_online ? "🖥 Online" : "📍 In Person"}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800">{m.title}</h3>
                <div className="flex gap-4 mt-2 text-sm text-slate-500 flex-wrap">
                  <span>📅 {m.date_bs}</span>
                  <span>🕐 {m.time}</span>
                  {m.is_online && m.link ? (
                    <a href={m.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Icon name="link" size={14} /> Join Meeting
                    </a>
                  ) : m.location ? (
                    <span className="flex items-center gap-1">
                      <Icon name="location" size={14} /> {m.location}
                    </span>
                  ) : null}
                </div>
                <div className="flex gap-2 mt-3 flex-wrap items-center">
                  <p className="text-xs text-slate-400">Attendees:</p>
                  {getAttendeeNames(m.attendee_ids).map((name) => (
                    <span key={name} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{name}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">Edit</button>
                <button className="px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#C9A84C" }}>Send Reminder</button>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
            <Icon name="meeting" size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No meetings scheduled yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
