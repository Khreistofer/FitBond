import { SPORT_TYPES, C } from "./assets/constants.js";

export default function Card({ children, style = {} }){
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: "1.5rem", ...style,
    }}>{children}</div>
  )
};