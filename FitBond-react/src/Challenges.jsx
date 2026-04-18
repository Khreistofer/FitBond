import { useState, useEffect } from "react";

import Topbar from './Topbar.jsx'
import Av from './Av.jsx'
import Card from './Card.jsx'
import Btn from './Btn.jsx'
import Tag from './Tag.jsx'

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function Challenges() 
{
  const [tab, setTab] = useState("all");
  const filtered = tab === "mine" ? CHALLENGES.filter(c => c.joined) : CHALLENGES;

  return (
    <div>
      <Topbar title="Challenges" action={<Btn variant="accent" size="sm">+ Create Challenge</Btn>} />
      {/* PLACEHOLDER: POST /api/challenges */}
      <div style={{ padding:"2rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
        <div style={{ display:"flex", gap:8 }}>
          {[["all","All Challenges"],["mine","My Challenges"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding:"8px 20px", borderRadius:20, border:"none", cursor:"pointer",
              fontSize:13, fontWeight:700, fontFamily:"inherit",
              background: tab===id ? C.brand : C.bg,
              color: tab===id ? "#fff" : C.muted,
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
          {filtered.map(c => (
            <Card key={c.id} style={{ borderTop: `4px solid ${c.joined ? C.brand : C.border}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, lineHeight:1.3 }}>{c.title}</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>{c.metric} · Ends {c.ends} · 👥 {c.participants}</div>
                </div>
                {c.joined ? <Tag color="brand">Joined</Tag> : <Btn size="sm" variant="outline">Join</Btn>}
                {/* PLACEHOLDER: POST /api/challenges/:id/join */}
              </div>

              {c.joined && (
                <div style={{ marginBottom:"1rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.muted, marginBottom:6 }}>
                    <span>Your progress</span>
                    <span style={{ fontWeight:700 }}>{c.progress} / {c.target} {c.unit}</span>
                  </div>
                  <div style={{ height:6, background:C.bg, borderRadius:6, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${(c.progress/c.target)*100}%`, background:`linear-gradient(90deg,${C.brand},${C.brandDark})`, borderRadius:6 }} />
                  </div>
                </div>
              )}

              <div style={{ background:C.bg, borderRadius:10, padding:"10px 12px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"0.08em", marginBottom:8 }}>🏆 LEADERBOARD</div>
                {c.leaderboard.map((p, i) => (
                  <div key={p.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"5px 0", borderBottom: i<c.leaderboard.length-1 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ width:20, fontSize:14 }}>{["🥇","🥈","🥉","  "][i]}</span>
                    <Av initials={p.avatar} size={24} bg={p.name.includes("Alex") ? C.brand : C.muted} />
                    <div style={{ flex:1, fontSize:13, fontWeight: p.name.includes("Alex") ? 700 : 400 }}>{p.name}</div>
                    <div style={{ fontWeight:800, color:C.brand, fontSize:13 }}>{p.value} {c.unit}</div>
                  </div>
                ))}
                {/* PLACEHOLDER: GET /api/challenges/:id/leaderboard */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};