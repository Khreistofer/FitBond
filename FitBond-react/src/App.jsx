import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import ActivityLog from "./ActivityLog.jsx";
import Friends from "./Friends.jsx";
import Challenges from "./Challenges.jsx";
import Profile from "./Profile.jsx";

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

const PAGES = {
  dashboard: Dashboard,
  activities: ActivityLog,
  friends: Friends,
  challenges: Challenges,
  profile: Profile,
};

export default function App() {
  const [page, setPage] = useState(() => localStorage.getItem("page") || "dashboard");
  const Page = PAGES[page] || Dashboard;

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f4f6f8",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      color: "#0d1117",
    }}>
      <Sidebar page={page} setPage={setPage} />

      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflowY: "auto",
        maxHeight: "100vh"
      }}>
        <Page />
      </main>
    </div>
  );
}