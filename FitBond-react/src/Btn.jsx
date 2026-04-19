import { SPORT_TYPES, C } from "./assets/constants.js";

export default function Btn ({ children, onClick, variant = "primary", size = "md" }) 
{
  const pad = size === "sm" ? "6px 14px" : "10px 22px";
  const fs  = size === "sm" ? 13 : 14;
  const map = {
    primary: { background: C.brand,   color: "#fff",      border: "none" },
    accent:  { background: C.accent,  color: "#fff",      border: "none" },
    outline: { background: "transparent", color: C.brand, border: `1.5px solid ${C.brand}` },
    ghost:   { background: "transparent", color: C.muted, border: `1px solid ${C.border}` },
  };
  return (
    <button onClick={onClick} style={{
      ...map[variant], borderRadius: 8, padding: pad, fontSize: fs,
      fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
    }}
    onMouseOver={e => e.currentTarget.style.opacity = ".82"}
    onMouseOut={e  => e.currentTarget.style.opacity = "1"}
    >{children}</button>
  );
};