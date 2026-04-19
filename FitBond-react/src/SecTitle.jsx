import { SPORT_TYPES, C } from "./assets/constants.js";

export default function SecTitle({ children }){
  return (
    <div style={{
      fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", color: C.hint, textTransform: "uppercase", marginBottom: "1rem",
    }}>{children}</div>
  )
}