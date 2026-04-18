import Av from './Av.jsx'

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function Topbar({ title, action }) 
{
    return (
    <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.25rem 2rem", background: C.surface, borderBottom: `1px solid ${C.border}`,
        position: "sticky", top: 0, zIndex: 5,
    }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, margin: 0 }}>{title}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {action}
        <div style={{ padding: "6px 16px", background: C.accentLight, borderRadius: 20, fontSize: 13, fontWeight: 700, color: C.accentDark }}>
            ⚡ {CURRENT_USER.points.toLocaleString()} pts
        </div>
        <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>🔔</button>
        {/* PLACEHOLDER: GET /api/notifications */}
        <Av initials={CURRENT_USER.avatar} size={34} bg={C.brand} />
        </div>
    </div>
    );
}