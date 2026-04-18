import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function SecTitle({ children }){
  return (
    <div style={{
      fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", color: C.hint, textTransform: "uppercase", marginBottom: "1rem",
    }}>{children}</div>
  )
}