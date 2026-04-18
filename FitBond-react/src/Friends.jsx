import { useState, useEffect } from "react";

import Av from './Av.jsx'
import Topbar from './Topbar.jsx'
import SecTitle from './SecTitle.jsx'
import Card from './Card.jsx'
import Btn from './Btn.jsx'

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function Friends()
{
  const [search, setSearch] = useState("");
  const filtered = FRIENDS.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Topbar title="Friends" action={<Btn variant="primary" size="sm">+ Add Friend</Btn>} />
      {/* PLACEHOLDER: POST /api/friend-requests */}
      <div style={{ padding:"2rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"1.5rem", alignItems:"start" }}>

          {/* Friend list */}
          <Card>
            <input placeholder="Search friends…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:"100%", padding:"9px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg, marginBottom:"1rem" }} />
            {/* PLACEHOLDER: GET /api/users/search?q= */}
            <SecTitle>Your Friends ({filtered.length})</SecTitle>
            {filtered.map(f => (
              <div key={f.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 8px", borderRadius:10, cursor:"pointer" }}
                onMouseOver={e => e.currentTarget.style.background = C.bg}
                onMouseOut={e  => e.currentTarget.style.background = "transparent"}>
                <Av initials={f.avatar} size={40} bg={C.muted} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14 }}>{f.name}</div>
                  <div style={{ fontSize:12, color:C.muted }}>{f.lastActivity} · {f.time}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontWeight:800, color:C.accent, fontSize:13 }}>{f.points.toLocaleString()} pts</div>
                  <div style={{ fontSize:11, color: f.trend.startsWith("+") ? "#10b981" : "#ef4444" }}>{f.trend}</div>
                </div>
              </div>
            ))}
            {/* PLACEHOLDER: GET /api/friends */}
          </Card>

          {/* Feed */}
          <Card>
            <SecTitle>Friends' Feed</SecTitle>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {ACTIVITIES.filter(a => a.user !== CURRENT_USER.name).map((a, i, arr) => (
                <div key={a.id} style={{ paddingBottom:"1rem", borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                    <Av initials={a.avatar} size={38} bg={C.muted} />
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{a.user}</div>
                      <div style={{ fontSize:12, color:C.hint }}>{a.date}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:14, background:C.bg, borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
                    <span style={{ fontSize:26 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15 }}>{a.type}</div>
                      <div style={{ fontSize:13, color:C.muted }}>{a.distance} · {a.duration} · 🔥 {a.calories} kcal</div>
                    </div>
                    <div style={{ marginLeft:"auto", fontSize:12, color:C.muted }}>{a.weather}</div>
                  </div>
                  {a.notes && <div style={{ fontSize:13, color:C.muted, fontStyle:"italic", marginBottom:10 }}>"{a.notes}"</div>}
                  <div style={{ display:"flex", gap:8 }}>
                    <button style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"5px 16px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>👍 Like</button>
                    <button style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"5px 16px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>💬 Comment</button>
                    {/* PLACEHOLDER: POST /api/activities/:id/react | /comments */}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};