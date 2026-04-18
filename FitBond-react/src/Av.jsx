import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function Av({ initials, size = 36, bg = "#05b4df" }) { return (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: bg,
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
  }}>{initials}</div>
)};