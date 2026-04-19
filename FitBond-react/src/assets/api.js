const BASE = "http://localhost:8080/api";

// Attach the JWT token (stored by Auth.jsx on login) to every request automatically.
const authHeaders = () => {
  const token = localStorage.getItem("fitbond_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Thin fetch wrapper: throws a real Error on non-2xx so components can catch 401/403.
const req = (url, options = {}) =>
  fetch(url, { ...options, headers: { ...authHeaders(), ...(options.headers || {}) } }).then(r => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  });

export const api = {
  // ── Auth ──────────────────────────────────────────────────────────
  login: (email, password) => req(`${BASE}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),

  // ── Registration (two-step) ───────────────────────────────────────
  // Step 1 → POST /api/users
  //   Request:  { firstName, lastName, email, password }
  //   Response: { id, username, email, points, badges, token }
  createUser: (userData) => req(`${BASE}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  }),

  // Step 2 → POST /api/profiles
  //   Request:  { userId, height_cm, weight_kg, age, sex, level, goal, sportPreferences }
  //   Response: { id, userId, height_cm, weight_kg, age, sex, level, goal, sportPreferences }
  createProfile: (profileData) => req(`${BASE}/profiles`, {
    method: "POST",
    body: JSON.stringify(profileData),
  }),

  // ── Users ─────────────────────────────────────────────────────────
  getUser:    (id) => req(`${BASE}/users/${id}`),
  getProfile: (id) => req(`${BASE}/profiles/${id}`),

  // ── Activities ────────────────────────────────────────────────────
  getFeed:           (userId)               => req(`${BASE}/activities/feed?userId=${userId}`),
  getUserActivities: (userId)               => req(`${BASE}/activities/user/${userId}`),
  getWeeklyStats:    (userId)               => req(`${BASE}/activities/stats/weekly?userId=${userId}`),
  logActivity: (data, userId, lat, lon)     => req(
    `${BASE}/activities?userId=${userId}&latitude=${lat}&longitude=${lon}`,
    { method: "POST", body: JSON.stringify(data) }
  ),

  // ── Friends ───────────────────────────────────────────────────────
  getFriends: (userId) => req(`${BASE}/friends?userId=${userId}`),

  // ── Challenges ────────────────────────────────────────────────────
  getChallenges:  (userId)                        => req(`${BASE}/challenges?userId=${userId}`),
  joinChallenge:  (challengeId, userId, target)   => req(`${BASE}/challenges/${challengeId}/join?userId=${userId}&target=${target}`, { method: "POST" }),
  updateProgress: (challengeId, userId, progress) => req(`${BASE}/challenges/${challengeId}/progress?userId=${userId}&progress=${progress}`, { method: "PUT" }),
};