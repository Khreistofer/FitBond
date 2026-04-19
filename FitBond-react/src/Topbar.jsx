import Av from './Av.jsx'

import { C } from "./assets/constants.js";

export default function Topbar({ title, action, currentUser }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"1.25rem 2rem", background:C.surface, borderBottom:`1px solid ${C.border}`,
      position:"sticky", top:0, zIndex:5,
    }}>
      <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, margin:0 }}>{title}</h1>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        {action}
        <div style={{ padding:"6px 16px", background:C.accentLight, borderRadius:20, fontSize:13, fontWeight:700, color:C.accentDark }}>
          ⚡ {currentUser?.points?.toLocaleString() ?? 0} pts
        </div>
        <button style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>🔔</button>
        <Av initials={currentUser?.avatar ?? "?"} size={34} bg={C.brand} />
      </div>
    </div>
  );
}