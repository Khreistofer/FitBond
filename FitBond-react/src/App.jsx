import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import ActivityLog from "./ActivityLog.jsx";
import Friends from "./Friends.jsx";
import Challenges from "./Challenges.jsx";
import Profile from "./Profile.jsx";
import { api } from './assets/api.js';
import { C } from "./assets/constants.js";
import { Login, Signup } from "./Auth";

// ── helpers ──────────────────────────────────────────────────────────
const storedUser = () => {
  try { return JSON.parse(localStorage.getItem("fitbond_user")); } catch { return null; }
};

export default function App() {
  const [page,        setPage]        = useState(() => localStorage.getItem("page") || "dashboard");
  const [authScreen,  setAuthScreen]  = useState("login"); // "login" | "signup"
  const [authUser,    setAuthUser]    = useState(storedUser);   // ✅ FIXED: was useState(storedUser) — missing ()
  const [currentUser, setCurrentUser] = useState(null);
  const [profile,     setProfile]     = useState(null);

  // Persist active page
  useEffect(() => { localStorage.setItem("page", page); }, [page]);

  // When we have an authenticated user, fetch their full data
  useEffect(() => {
    if (!authUser?.id) return;
    api.getUser(authUser.id).then(setCurrentUser).catch(err => {
      // Only force logout if it's definitely an auth error, not a network blip
      const status = parseInt(err.message);
      if (status === 401 || status === 403) handleLogout();
    });
    api.getProfile(authUser.id)
      .then(setProfile)
      .catch(() => setProfile({})); // ← don't leave profile null forever
  }, [authUser?.id]);

  const handleLoginSuccess = (user) => {
    setAuthUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("fitbond_token");
    localStorage.removeItem("fitbond_user");
    setAuthUser(null);
    setCurrentUser(null);
    setProfile(null);
    setPage("dashboard");
  };

  // ── Not logged in → show auth screens ────────────────────────────
  if (!authUser) {
    return authScreen === "login"
      ? <Login  onLoginSuccess={handleLoginSuccess} onGoToSignup={() => setAuthScreen("signup")} />
      : <Signup onSignupSuccess={handleLoginSuccess} onGoToLogin={() => setAuthScreen("login")} />;
  }

  // ── Logged in but still loading full profile ──────────────────────
  if (!currentUser || !profile) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", color: C.muted, fontFamily:"sans-serif" }}>
        Loading…
      </div>
    );
  }

  // Merge user + profile into one object the components expect
  const user = {
    ...currentUser,
    name:         currentUser.username,
    avatar:       currentUser.username.split(" ").map(p => p[0]).join("").substring(0,2).toUpperCase(),
    height:       profile.height_cm,
    weight:       profile.weight_kg,
    age:          profile.age,
    sex:          profile.sex,
    fitnessLevel: profile.level,
    goal:         profile.goal,
  };

  const PAGES = {
    dashboard:  () => <Dashboard   currentUser={user} />,
    activities: () => <ActivityLog  currentUser={user} />,
    friends:    () => <Friends      currentUser={user} />,
    challenges: () => <Challenges   currentUser={user} />,
    profile:    () => <Profile      currentUser={user} profile={profile} onLogout={handleLogout} />,
  };

  const Page = PAGES[page] || PAGES.dashboard;

  return (
    <div style={{
      display: "flex", minHeight: "100vh", background: C.bg,
      fontFamily: "'DM Sans','Segoe UI',sans-serif", color: C.text,
    }}>
      <Sidebar page={page} setPage={setPage} currentUser={user} onLogout={handleLogout} />
      <main style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowY:"auto", maxHeight:"100vh" }}>
        <Page />
      </main>
    </div>
  );
}