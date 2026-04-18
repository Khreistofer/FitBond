import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

export default function Tag({ children, color = "brand" })
{
  const map = {
    brand:  ["#e8f8fd", "#0492b5"],
    accent: ["#fff2ea", "#cc5000"],
    gray:   ["#f1f5f9", "#64748b"],
    green:  ["#ecfdf5", "#065f46"],
  };
  const [bg, fg] = map[color] || map.brand;
  return (
    <span style={{ background: bg, color: fg, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
      {children}
    </span>
  );
};