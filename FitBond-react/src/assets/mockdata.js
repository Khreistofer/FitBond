export const CURRENT_USER = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@fitbond.com",   // PLACEHOLDER
  avatar: "AJ",
  height: 178,
  weight: 74,
  age: 27,
  sex: "Male",
  fitnessLevel: "Intermediate",
  goal: "Run 50km this month",
  points: 2340,
  badges: ["First Run", "7-Day Streak", "10K Club"],
};
 
export const FRIENDS = [
  { id: 2, name: "Maria Santos", avatar: "MS", lastActivity: "Cycling • 22km",   time: "2h ago",  points: 1890, trend: "+8%"  },
  { id: 3, name: "Luca Bianchi",  avatar: "LB", lastActivity: "Running • 8.5km",  time: "5h ago",  points: 3120, trend: "+22%" },
  { id: 4, name: "Yuki Tanaka",   avatar: "YT", lastActivity: "Yoga • 45min",     time: "1d ago",  points: 980,  trend: "-3%"  },
  { id: 5, name: "Sam Lee",       avatar: "SL", lastActivity: "Swimming • 1.5km", time: "1d ago",  points: 2670, trend: "+11%" },
  // PLACEHOLDER: GET /api/friends
];
 
export const ACTIVITIES = [
  { id: 1, user: "Alex Johnson", avatar: "AJ", type: "Running",       icon: "🏃", distance: "10.2km", duration: "52min",    calories: 480, date: "Today, 7:30am",   weather: "☀️ 18°C",  notes: "Great morning run along the river!" },
  { id: 2, user: "Luca Bianchi",  avatar: "LB", type: "Cycling",       icon: "🚴", distance: "34km",   duration: "1h 22min", calories: 620, date: "Today, 6:00am",   weather: "⛅ 14°C",  notes: "" },
  { id: 3, user: "Maria Santos",  avatar: "MS", type: "Swimming",      icon: "🏊", distance: "1.8km",  duration: "40min",    calories: 310, date: "Yesterday",       weather: "🏠 Indoor", notes: "PB on the 100m splits!" },
  { id: 4, user: "Sam Lee",       avatar: "SL", type: "Running",       icon: "🏃", distance: "6.5km",  duration: "33min",    calories: 290, date: "Yesterday",       weather: "🌧️ 12°C",  notes: "" },
  { id: 5, user: "Alex Johnson", avatar: "AJ", type: "Weightlifting",  icon: "🏋️", distance: "—",     duration: "1h 05min", calories: 390, date: "2 days ago",      weather: "🏠 Indoor", notes: "New PR on bench press." },
  // PLACEHOLDER: GET /api/activities/feed
];
 
export const CHALLENGES = [
  { id: 1, title: "May Running Challenge",  metric: "Total distance", unit: "km",   ends: "May 31", participants: 8,  joined: true,  progress: 62, target: 100, leaderboard: [
    { name: "Luca Bianchi", avatar: "LB", value: 87.4 },
    { name: "Alex Johnson", avatar: "AJ", value: 62.1 },
    { name: "Sam Lee",      avatar: "SL", value: 55.8 },
    { name: "Maria Santos", avatar: "MS", value: 44.2 },
  ]},
  { id: 2, title: "Push-up King — Week 18", metric: "Total push-ups", unit: "reps", ends: "May 5",  participants: 5,  joined: false, progress: 0,  target: 500, leaderboard: [
    { name: "Maria Santos", avatar: "MS", value: 540 },
    { name: "Yuki Tanaka",  avatar: "YT", value: 420 },
    { name: "Sam Lee",      avatar: "SL", value: 310 },
  ]},
  { id: 3, title: "30-Day Streak",          metric: "Active days",    unit: "days", ends: "Jun 1",  participants: 12, joined: true,  progress: 14, target: 30, leaderboard: [
    { name: "Alex Johnson", avatar: "AJ", value: 14 },
    { name: "Sam Lee",      avatar: "SL", value: 12 },
    { name: "Yuki Tanaka",  avatar: "YT", value: 9  },
  ]},
  // PLACEHOLDER: GET /api/challenges
];
 
export const WEEKLY_STATS = [
  { day: "Mon", km: 0    },
  { day: "Tue", km: 5.2  },
  { day: "Wed", km: 0    },
  { day: "Thu", km: 10.2 },
  { day: "Fri", km: 3.1  },
  { day: "Sat", km: 8.5  },
  { day: "Sun", km: 0    },
  // PLACEHOLDER: GET /api/stats/weekly
];
 
export const SPORT_TYPES = ["Running","Cycling","Swimming","Yoga","Weightlifting","Hiking","Tennis","Basketball","HIIT","Rowing"];
 
// ─── DESIGN TOKENS ────────────────────────────────────────────────
export const C = {
  brand:       "#05b4df",
  brandDark:   "#0492b5",
  brandLight:  "#e8f8fd",
  accent:      "#ff6400",
  accentDark:  "#cc5000",
  accentLight: "#fff2ea",
  bg:          "#f4f6f8",
  surface:     "#ffffff",
  border:      "#e4e9ee",
  text:        "#0d1117",
  muted:       "#64748b",
  hint:        "#94a3b8",
};