import Av from './Av.jsx'

import { C } from "./assets/constants.js";

const NAV = [
  { id: "dashboard",  label: "Dashboard",  icon: "▣" },
  { id: "activities", label: "Activities", icon: "◎" },
  { id: "friends",    label: "Friends",    icon: "◈" },
  { id: "challenges", label: "Challenges", icon: "◆" },
  { id: "profile",    label: "Profile",    icon: "◉" },
];

export default function Sidebar({ page, setPage, currentUser, onLogout }) {
  return (
    <aside style={{
      width:230, flexShrink:0, background:C.text,
      display:"flex", flexDirection:"column", padding:"2rem 0",
      position:"sticky", top:0, height:"100vh",
    }}>
      <div style={{ padding:"0 1.5rem 2rem", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800 }}>
          <span style={{ color:C.brand }}>Fit</span><span style={{ color:C.accent }}>Bond</span>
        </div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,.3)", marginTop:2, letterSpacing:"0.12em" }}>SPORT TOGETHER</div>
      </div>

      <nav style={{ flex:1, padding:"1.5rem 1rem" }}>
        {NAV.map(n => {
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              display:"flex", alignItems:"center", gap:12, width:"100%",
              padding:"11px 16px", borderRadius:10, border:"none",
              background: active ? `${C.brand}20` : "transparent",
              color: active ? C.brand : "rgba(255,255,255,.45)",
              fontSize:14, fontWeight: active ? 700 : 400, cursor:"pointer",
              marginBottom:4, fontFamily:"inherit",
              borderLeft: active ? `3px solid ${C.brand}` : "3px solid transparent",
            }}
            onMouseOver={e => { if (!active) { e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.color="#fff"; }}}
            onMouseOut={e  => { e.currentTarget.style.background=active?`${C.brand}20`:"transparent"; e.currentTarget.style.color=active?C.brand:"rgba(255,255,255,.45)"; }}
            >
              <span style={{ fontSize:16 }}>{n.icon}</span>{n.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding:"1.25rem 1.5rem", borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", gap:10 }}>
        <Av initials={currentUser.avatar} size={36} bg={C.brand} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{currentUser.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,.35)" }}>{currentUser.fitnessLevel}</div>
        </div>
        <button onClick={onLogout} title="Sign out"
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, opacity:.5, padding:4 }}
          onMouseOver={e => e.currentTarget.style.opacity="1"}
          onMouseOut={e  => e.currentTarget.style.opacity=".5"}
        >⏏</button>
      </div>
    </aside>
  );
}