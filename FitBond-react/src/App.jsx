import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import ActivityLog from "./ActivityLog.jsx";
import Friends from "./Friends.jsx";
import Challenges from "./Challenges.jsx";
import Profile from "./Profile.jsx";

import { CURRENT_USER, FRIENDS, ACTIVITIES, CHALLENGES, WEEKLY_STATS, C } from "./assets/mockdata.js";

import { Login, Signup } from "./Auth";

export default function App() {
  const [authView, setAuthView] = useState("login"); // "login" | "signup"
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fitbond_user")); }
    catch { return null; }
  });

  const logout = () => {
    localStorage.removeItem("fitbond_token");
    localStorage.removeItem("fitbond_user");
    setUser(null); setAuthView("login");
  };

  if (!user && authView === "login")
    return <Login  onLoginSuccess={setUser}  onGoToSignup={() => setAuthView("signup")} />;
  if (!user && authView === "signup")
    return <Signup onSignupSuccess={setUser} onGoToLogin={() => setAuthView("login")}  />;

  return <MainApp user={user} onLogout={logout} />;
}

const PAGES = {
  dashboard: Dashboard,
  activities: ActivityLog,
  friends: Friends,
  challenges: Challenges,
  profile: Profile,
};