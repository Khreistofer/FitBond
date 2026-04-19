import Topbar from './Topbar.jsx'
import Card from './Card.jsx'
import SecTitle from './SecTitle.jsx'
import Btn from './Btn.jsx'

import { C } from "./assets/constants.js";

export default function Profile({ currentUser, profile }) {
  const bmi = profile ? (profile.weight_kg / (profile.height_cm/100)**2).toFixed(1) : "—";

  return (
    <div>
      <Topbar title="My Profile" action={<Btn variant="outline" size="sm">Edit Profile</Btn>} currentUser={currentUser} />
      <div style={{ padding:"2rem", display:"grid", gridTemplateColumns:"280px 1fr", gap:"1.5rem", alignItems:"start" }}>

        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <Card style={{ background:`linear-gradient(150deg,${C.text},#1e293b)`, border:"none", textAlign:"center" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:C.brand, margin:"0 auto 1rem", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:800, color:"#fff" }}>{currentUser.avatar}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:"#fff" }}>{currentUser.name}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.45)", marginTop:4 }}>{currentUser.email}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.45)", marginTop:2 }}>{currentUser.fitnessLevel} · {currentUser.age}y · {currentUser.sex}</div>
            <div style={{ marginTop:"1.25rem" }}>
              <div style={{ display:"inline-block", background:C.accentLight, borderRadius:20, padding:"6px 18px", fontSize:15, fontWeight:800, color:C.accentDark }}>
                ⚡ {currentUser.points?.toLocaleString()} pts
              </div>
            </div>
          </Card>

          <Card>
            <SecTitle>Physical Stats</SecTitle>
            {[
              { label:"Height",        value:`${currentUser.height} cm` },
              { label:"Weight",        value:`${currentUser.weight} kg` },
              { label:"BMI",           value:bmi },
              { label:"Fitness Level", value:currentUser.fitnessLevel },
              { label:"Goal",          value:currentUser.goal },
            ].map(s => (
              <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:13, color:C.muted }}>{s.label}</span>
                <span style={{ fontSize:13, fontWeight:700 }}>{s.value}</span>
              </div>
            ))}
          </Card>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <Card>
            <SecTitle>Achievements</SecTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
              {(currentUser.badges ?? []).map(b => (
                <div key={b} style={{ background:C.accentLight, borderRadius:10, padding:"16px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:26 }}>🏅</span>
                  <div style={{ fontSize:12, fontWeight:700, color:C.accentDark, textAlign:"center" }}>{b}</div>
                </div>
              ))}
              {[...Array(5)].map((_,i) => (
                <div key={i} style={{ background:C.bg, borderRadius:10, padding:"16px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:.4 }}>
                  <span style={{ fontSize:26 }}>🔒</span>
                  <div style={{ fontSize:11, color:C.muted }}>Locked</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}