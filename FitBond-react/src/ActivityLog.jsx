import { useState, useEffect } from "react";

import Topbar from './Topbar.jsx'
import Btn from './Btn.jsx'
import Card from './Card.jsx'
import SecTitle from './SecTitle.jsx'
import Av from './Av.jsx'
import Tag from './Tag.jsx'

import { api } from './assets/api.js'
import { SPORT_TYPES, C } from "./assets/constants.js";

const SPORT_ICONS = {
  ENDURANCE:"🏃", INDOOR_TRAINING:"🏋️", OUTDOOR_TRAINING:"🚴",
  TEAM_COURT:"🏀", MIND_BODY:"🧘", ALTERNATIVE:"🤸",
};

export default function ActivityLog({ currentUser }) {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm]     = useState(false);
  const [saving, setSaving]         = useState(false);
  const [form, setForm]             = useState({ sportType:"ENDURANCE", distanceKm:"", durationMinutes:"", notes:"" });

  useEffect(() => {
    api.getUserActivities(currentUser.id).then(setActivities);
  }, [currentUser.id]);

  const handleSave = async () => {
    setSaving(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const saved = await api.logActivity(
          { ...form, distanceKm: parseFloat(form.distanceKm), durationMinutes: parseFloat(form.durationMinutes) },
          currentUser.id,
          pos.coords.latitude,
          pos.coords.longitude
        );
        setActivities(prev => [saved, ...prev]);
        setShowForm(false);
        setForm({ sportType:"ENDURANCE", distanceKm:"", durationMinutes:"", notes:"" });
        setSaving(false);
      },
      async () => {
        // fallback if geolocation denied
        const saved = await api.logActivity(
          { ...form, distanceKm: parseFloat(form.distanceKm), durationMinutes: parseFloat(form.durationMinutes) },
          currentUser.id, 0, 0
        );
        setActivities(prev => [saved, ...prev]);
        setShowForm(false);
        setSaving(false);
      }
    );
  };

  return (
    <div>
      <Topbar title="Activity Log" currentUser={currentUser}
        action={<Btn onClick={() => setShowForm(!showForm)} variant={showForm ? "ghost" : "accent"} size="sm">{showForm ? "✕ Cancel" : "+ Log Activity"}</Btn>} />
      <div style={{ padding:"2rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>

        {showForm && (
          <Card style={{ border:`2px solid ${C.accent}` }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:C.accent, marginBottom:"1.25rem" }}>New Session</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"1rem" }}>
              {[
                { label:"Sport Type", el:(
                  <select value={form.sportType} onChange={e => setForm({...form, sportType:e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg }}>
                    {["ENDURANCE","INDOOR_TRAINING","OUTDOOR_TRAINING","TEAM_COURT","MIND_BODY","ALTERNATIVE"].map(s => <option key={s}>{s}</option>)}
                  </select>
                )},
                { label:"Distance (km)", el:(
                  <input type="number" placeholder="e.g. 10.5" value={form.distanceKm} onChange={e => setForm({...form, distanceKm:e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg }} />
                )},
                { label:"Duration (min)", el:(
                  <input type="number" placeholder="e.g. 45" value={form.durationMinutes} onChange={e => setForm({...form, durationMinutes:e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg }} />
                )},
                { label:"Calories (auto)", el:(
                  <div style={{ padding:"10px 12px", background:C.bg, borderRadius:8, fontSize:14, color:C.muted, border:`1px solid ${C.border}` }}>🔥 Auto-calculated</div>
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
              <textarea placeholder="How did it go?" value={form.notes} onChange={e => setForm({...form, notes:e.target.value})}
                style={{ width:"100%", padding:"10px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", minHeight:60, resize:"vertical", background:C.bg }} />
            </div>
            <Btn variant="accent" onClick={handleSave}>{saving ? "Saving…" : "Save Activity"}</Btn>
          </Card>
        )}

        <Card style={{ padding:0, overflow:"hidden" }}>
          <div style={{ padding:"1.25rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
            <SecTitle>All Activities</SecTitle>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:C.bg }}>
                {["Activity","Distance","Duration","Calories","Date","Weather"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.07em", textTransform:"uppercase", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 && (
                <tr><td colSpan={6} style={{ padding:"2rem", textAlign:"center", color:C.muted }}>No activities yet.</td></tr>
              )}
              {activities.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: i<activities.length-1 ? `1px solid ${C.border}` : "none" }}
                  onMouseOver={e => e.currentTarget.style.background = C.bg}
                  onMouseOut={e  => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:C.brandLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                        {SPORT_ICONS[a.sportType] ?? "🏅"}
                      </div>
                      <span style={{ fontWeight:700, fontSize:14 }}>{a.sportType}</span>
                    </div>
                  </td>
                  <td style={{ padding:"14px 16px", fontWeight:800, color:C.brand, fontSize:15 }}>{a.distanceKm ? `${a.distanceKm} km` : "—"}</td>
                  <td style={{ padding:"14px 16px", fontSize:13, color:C.muted }}>{a.durationMinutes ? `${a.durationMinutes} min` : "—"}</td>
                  <td style={{ padding:"14px 16px" }}><Tag color="brand">🔥 {a.calories ?? 0}</Tag></td>
                  <td style={{ padding:"14px 16px", fontSize:13, color:C.muted }}>{a.startTime?.slice(0,10)}</td>
                  <td style={{ padding:"14px 16px", fontSize:13, color:C.muted }}>{a.weather ? "🌤️" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}