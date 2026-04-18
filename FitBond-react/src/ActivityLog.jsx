import { useState, useEffect } from "react";

import Topbar from './Topbar.jsx'
import Btn from './Btn.jsx'
import Card from './Card.jsx'
import SecTitle from './SecTitle.jsx'
import Av from './Av.jsx'
import Tag from './Tag.jsx'

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function ActivityLog()
{
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "Running", distance: "", duration: "", notes: "" });
  const est = form.distance && form.duration ? Math.round((form.distance/form.duration)*60*7) : null;
  // PLACEHOLDER: replace calorie formula with real MET values per sport

  return (
    <div>
      <Topbar title="Activity Log"
        action={<Btn onClick={() => setShowForm(!showForm)} variant={showForm ? "ghost" : "accent"} size="sm">{showForm ? "✕ Cancel" : "+ Log Activity"}</Btn>} />
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {showForm && (
          <Card style={{ border: `2px solid ${C.accent}` }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: C.accent, marginBottom: "1.25rem" }}>New Session</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { label: "Sport Type", el: (
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg }}>
                    {SPORT_TYPES.map(s => <option key={s}>{s}</option>)}
                  </select>
                )},
                { label: "Distance (km)", el: (
                  <input type="number" placeholder="e.g. 10.5" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg }} />
                )},
                { label: "Duration (min)", el: (
                  <input type="number" placeholder="e.g. 45" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg }} />
                )},
                { label: "Est. Calories (auto)", el: (
                  <div style={{ padding:"10px 12px", background:C.bg, borderRadius:8, fontSize:14, color:C.muted, border:`1px solid ${C.border}` }}>
                    🔥 {est !== null ? `${est} kcal` : "—"}
                  </div>
                )},
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:6 }}>{f.label}</div>
                  {f.el}
                </div>
              ))}
            </div>
            <div style={{ marginBottom:"1rem" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:6 }}>Notes</div>
              <textarea placeholder="How did it go?" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", minHeight:60, resize:"vertical", background:C.bg }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
              <Btn variant="accent">Save Activity</Btn>
              {/* PLACEHOLDER: POST /api/activities */}
              <span style={{ fontSize:12, color:C.hint }}>📍 Weather auto-fetched via Open-Meteo API — PLACEHOLDER: integrate open-meteo.com</span>
            </div>
          </Card>
        )}

        {/* Activity table */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding:"1.25rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
            <SecTitle>All Activities</SecTitle>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Activity","User","Distance","Duration","Calories","Date","Weather"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.07em", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVITIES.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: i < ACTIVITIES.length-1 ? `1px solid ${C.border}` : "none" }}
                  onMouseOver={e => e.currentTarget.style.background = C.bg}
                  onMouseOut={e  => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:C.brandLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{a.icon}</div>
                      <span style={{ fontWeight:700, fontSize:14 }}>{a.type}</span>
                    </div>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Av initials={a.avatar} size={26} bg={a.user===CURRENT_USER.name ? C.brand : C.muted} />
                      <span style={{ fontSize:13, color:C.muted }}>{a.user}</span>
                    </div>
                  </td>
                  <td style={{ padding:"14px 16px", fontWeight:800, color:C.brand, fontSize:15 }}>{a.distance}</td>
                  <td style={{ padding:"14px 16px", fontSize:13, color:C.muted }}>{a.duration}</td>
                  <td style={{ padding:"14px 16px" }}><Tag color="brand">🔥 {a.calories}</Tag></td>
                  <td style={{ padding:"14px 16px", fontSize:13, color:C.muted }}>{a.date}</td>
                  <td style={{ padding:"14px 16px", fontSize:13, color:C.muted }}>{a.weather}</td>
                </tr>
              ))}
              {/* PLACEHOLDER: GET /api/activities?page=0&size=20 */}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};