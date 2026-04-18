import { useState, useEffect } from "react";

import Topbar from './Topbar.jsx'
import SecTitle from './SecTitle.jsx'
import Card from './Card.jsx'

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, C } from "./assets/mockdata.js";

export default function Dashboard()
{
  const WEEKLY_STATS = [
    { day: "Mon", km: 0    },
    { day: "Tue", km: 5.2  },
    { day: "Wed", km: 0    },
    { day: "Thu", km: 10.2 },
    { day: "Fri", km: 3.1  },
    { day: "Sat", km: 8.5  },
    { day: "Sun", km: 0    },
    // PLACEHOLDER: GET /api/stats/weekly
  ];

  const maxKm = Math.max(...WEEKLY_STATS.map(d => d.km), 1);
  return (
    <div>
      <Topbar title={`Good morning, ${CURRENT_USER.name.split(" ")[0]} 👋`} />
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* KPI row — PLACEHOLDER: GET /api/stats/summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
          {[
            { label: "This Week",   value: "27.0 km", sub: "↑ +12% vs last week", accent: true },
            { label: "Calories",    value: "1,840",   sub: "Burned this week" },
            { label: "Active Days", value: "4 / 7",   sub: "This week" },
            { label: "Streak",      value: "🔥 14",   sub: "Days in a row" },
          ].map(s => (
            <div key={s.label} style={{
              background: s.accent ? `linear-gradient(135deg,${C.brand},${C.brandDark})` : C.surface,
              border: s.accent ? "none" : `1px solid ${C.border}`,
              borderRadius: 14, padding: "1.5rem", color: s.accent ? "#fff" : C.text,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: s.accent ? "rgba(255,255,255,.75)" : C.muted, marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 12, marginTop: 4, opacity: .7 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Mid row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
          <Card>
            <SecTitle>Weekly Distance (km)</SecTitle>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
              {WEEKLY_STATS.map(d => (
                <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{d.km > 0 ? d.km : ""}</div>
                  <div style={{
                    width: "100%", borderRadius: 8,
                    height: d.km > 0 ? `${(d.km / maxKm) * 110}px` : "4px",
                    background: d.km > 0 ? `linear-gradient(180deg,${C.brand},${C.brandDark})` : C.bg,
                  }} />
                  <div style={{ fontSize: 12, color: C.hint }}>{d.day}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <SecTitle>Monthly Goal</SecTitle>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke={C.bg} strokeWidth="11" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={C.brand} strokeWidth="11"
                strokeDasharray={`${2*Math.PI*50*0.62} ${2*Math.PI*50}`}
                strokeLinecap="round" transform="rotate(-90 60 60)" />
              <text x="60" y="55" textAnchor="middle" fontSize="20" fontWeight="800" fill={C.text} fontFamily="Syne,sans-serif">62%</text>
              <text x="60" y="72" textAnchor="middle" fontSize="11" fill={C.muted}>31 / 50 km</text>
            </svg>
            {/* PLACEHOLDER: GET /api/goals/current */}
            <div style={{ fontSize: 13, color: C.muted, marginTop: 8, textAlign: "center" }}>{CURRENT_USER.goal}</div>
          </Card>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <Card>
            <SecTitle>My Recent Activities</SecTitle>
            {ACTIVITIES.filter(a => a.user === CURRENT_USER.name).slice(0, 3).map((a, i, arr) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.brandLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{a.type}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{a.date} · {a.weather}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, color: C.brand, fontSize: 15 }}>{a.distance}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{a.duration}</div>
                </div>
              </div>
            ))}
            {/* PLACEHOLDER: GET /api/activities?userId=me&limit=3 */}
          </Card>

          <Card>
            <SecTitle>Badges</SecTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
              {CURRENT_USER.badges.map(b => (
                <div key={b} style={{ background: C.accentLight, borderRadius: 10, padding: "12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🏅</span>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.accentDark }}>{b}</div>
                </div>
              ))}
              <div style={{ background: C.bg, borderRadius: 10, padding: "12px", display: "flex", alignItems: "center", gap: 8, opacity: .5 }}>
                <span style={{ fontSize: 20 }}>🔒</span>
                <div style={{ fontSize: 12, color: C.muted }}>+5 locked</div>
              </div>
              {/* PLACEHOLDER: GET /api/users/me/badges */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};