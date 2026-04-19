import { useState, useEffect } from "react";

import Av from './Av.jsx'
import Topbar from './Topbar.jsx'
import SecTitle from './SecTitle.jsx'
import Card from './Card.jsx'
import Btn from './Btn.jsx'

import { api } from './assets/api.js'
import { C } from "./assets/constants.js";

const SPORT_ICONS = {
  ENDURANCE:"🏃", INDOOR_TRAINING:"🏋️", OUTDOOR_TRAINING:"🚴",
  TEAM_COURT:"🏀", MIND_BODY:"🧘", ALTERNATIVE:"🤸",
};

export default function Friends({ currentUser }) {
  const [friends, setFriends]   = useState([]);
  const [feed, setFeed]         = useState([]);
  const [search, setSearch]     = useState("");

  useEffect(() => {
    api.getFriends(currentUser.id).then(setFriends);
    api.getFeed(currentUser.id).then(data =>
      setFeed(data.filter(a => a.user?.id !== currentUser.id))
    );
  }, [currentUser.id]);

  const filtered = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Topbar title="Friends" action={<Btn variant="primary" size="sm">+ Add Friend</Btn>} currentUser={currentUser} />
      <div style={{ padding:"2rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"1.5rem", alignItems:"start" }}>

          <Card>
            <input placeholder="Search friends…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:"100%", padding:"9px 12px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontFamily:"inherit", background:C.bg, marginBottom:"1rem" }} />
            <SecTitle>Your Friends ({filtered.length})</SecTitle>
            {filtered.length === 0 && <div style={{ color:C.muted, fontSize:13 }}>No friends yet.</div>}
            {filtered.map(f => (
              <div key={f.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 8px", borderRadius:10, cursor:"pointer" }}
                onMouseOver={e => e.currentTarget.style.background = C.bg}
                onMouseOut={e  => e.currentTarget.style.background = "transparent"}>
                <Av initials={f.avatar} size={40} bg={C.muted} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14 }}>{f.name}</div>
                  <div style={{ fontSize:12, color:C.muted }}>{f.lastActivity}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontWeight:800, color:C.accent, fontSize:13 }}>{f.points?.toLocaleString()} pts</div>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <SecTitle>Friends' Feed</SecTitle>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {feed.length === 0 && <div style={{ color:C.muted, fontSize:13 }}>No activities in feed yet.</div>}
              {feed.map((a, i, arr) => (
                <div key={a.id} style={{ paddingBottom:"1rem", borderBottom: i<arr.length-1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                    <Av initials={a.user?.username?.substring(0,2).toUpperCase() ?? "?"} size={38} bg={C.muted} />
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{a.user?.username}</div>
                      <div style={{ fontSize:12, color:C.hint }}>{a.startTime?.slice(0,10)}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:14, background:C.bg, borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
                    <span style={{ fontSize:26 }}>{SPORT_ICONS[a.sportType] ?? "🏅"}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15 }}>{a.sportType}</div>
                      <div style={{ fontSize:13, color:C.muted }}>
                        {a.distanceKm ? `${a.distanceKm} km` : "—"} · {a.durationMinutes ? `${a.durationMinutes} min` : "—"} · 🔥 {a.calories ?? 0} kcal
                      </div>
                    </div>
                  </div>
                  {a.notes && <div style={{ fontSize:13, color:C.muted, fontStyle:"italic", marginBottom:10 }}>"{a.notes}"</div>}
                  <div style={{ display:"flex", gap:8 }}>
                    <button style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"5px 16px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>👍 Like</button>
                    <button style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"5px 16px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>💬 Comment</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}