import { useState } from "react";
import { api } from "./assets/api.js";

// LOGO — swap for: import logo from "./assets/fitbond-icon.png"
import LOGO from "./assets/mbappedictador.jpeg";
// Design tokens — keep in sync with your main app
const C = {
  brand:"#05b4df", brandDark:"#0492b5", brandLight:"#e8f8fd",
  accent:"#ff6400", accentDark:"#cc5000", accentLight:"#fff2ea",
  bg:"#f4f6f8", surface:"#ffffff", border:"#e4e9ee",
  text:"#0d1117", muted:"#64748b", hint:"#94a3b8",
};

const SPORTS     = ["Running","Cycling","Swimming","Yoga","Weightlifting","Hiking","Tennis","Basketball","HIIT","Rowing"];
const FIT_LEVELS = ["Beginner","Intermediate","Advanced","Elite"];

// ─── SHARED MICRO COMPONENTS ──────────────────────────────────────

const Field = ({ label, type="text", placeholder, value, onChange, error }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    <label style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase" }}>
      {label}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ padding:"11px 14px", border:`1.5px solid ${error?"#ef4444":C.border}`, borderRadius:10,
        fontSize:14, fontFamily:"inherit", background:C.surface, color:C.text, outline:"none" }}
      onFocus={e=>e.target.style.borderColor=C.brand}
      onBlur={e =>e.target.style.borderColor=error?"#ef4444":C.border}
    />
    {error && <span style={{ fontSize:12, color:"#ef4444" }}>{error}</span>}
  </div>
);

const SubmitBtn = ({ children, loading }) => (
  <button type="submit" disabled={loading} style={{
    width:"100%", padding:"13px",
    background:loading?C.hint:`linear-gradient(135deg,${C.brand},${C.brandDark})`,
    color:"#fff", border:"none", borderRadius:10,
    fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit",
  }}
  onMouseOver={e=>{if(!loading)e.currentTarget.style.opacity=".88";}}
  onMouseOut={e=>e.currentTarget.style.opacity="1"}
  >{loading?"Please wait...":children}</button>
);

const Divider = () => (
  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
    <div style={{ flex:1, height:1, background:C.border }}/>
    <span style={{ fontSize:12, color:C.hint, fontWeight:600 }}>OR</span>
    <div style={{ flex:1, height:1, background:C.border }}/>
  </div>
);

const OAuthBtn = ({ icon, label, provider }) => (
  <button type="button"
    onClick={() => { window.location.href=`/api/auth/${provider}/redirect`; }}
    style={{
      display:"flex", alignItems:"center", justifyContent:"center", gap:10,
      width:"100%", padding:"11px", borderRadius:10,
      border:`1.5px solid ${C.border}`, background:C.surface,
      fontSize:14, fontWeight:600, fontFamily:"inherit", color:C.text, cursor:"pointer",
    }}
    onMouseOver={e=>e.currentTarget.style.background=C.bg}
    onMouseOut={e =>e.currentTarget.style.background=C.surface}
  ><span style={{ fontSize:16 }}>{icon}</span>{label}</button>
);

const ApiError = ({ msg }) => msg
  ? <div style={{ background:"#fee2e2", color:"#b91c1c", borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:500 }}>
      &#9888; {msg}
    </div>
  : null;

// ─── HERO PANEL ───────────────────────────────────────────────────

const HeroPanel = () => (
  <div style={{
    flex:"0 0 44%", background:C.text,
    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    padding:"3rem 2.5rem", position:"relative", overflow:"hidden",
  }}>
    <div style={{ position:"absolute", top:-90,  right:-90,  width:300, height:300, borderRadius:"50%", background:`${C.brand}18` }}/>
    <div style={{ position:"absolute", bottom:-70, left:-70, width:240, height:240, borderRadius:"50%", background:`${C.accent}14` }}/>
    <div style={{ position:"absolute", top:"42%", left:-50, width:130, height:130, borderRadius:"50%", background:`${C.brand}10` }}/>

    <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"1.75rem", width:"100%" }}>
      <div style={{
        width:150, height:150, borderRadius:32,
        background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:18,
      }}>
        <img src={LOGO} alt="FitBond logo" style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
      </div>

      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:46, fontWeight:800, letterSpacing:"-1.5px", lineHeight:1 }}>
          <span style={{ color:C.brand }}>Fit</span><span style={{ color:C.accent }}>Bond</span>
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,.32)", letterSpacing:"0.18em", marginTop:8, textTransform:"uppercase" }}>
          Sport Together
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%" }}>
        {[
          { icon:"🏃", text:"Track every workout automatically" },
          { icon:"👥", text:"Compete with friends in challenges" },
          { icon:"🏆", text:"Earn badges & climb leaderboards"  },
        ].map(f => (
          <div key={f.text} style={{
            display:"flex", alignItems:"center", gap:14,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:12, padding:"12px 16px",
          }}>
            <span style={{ fontSize:20 }}>{f.icon}</span>
            <span style={{ fontSize:14, color:"rgba(255,255,255,.58)", fontWeight:500 }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── LOGIN ────────────────────────────────────────────────────────

export const Login = ({ onLoginSuccess, onGoToSignup }) => {
  const [form,     setForm]     = useState({ email:"", password:"" });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const set = field => e => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = "Email is required";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  // ✅ FIXED: uses validate(), api.login(), and onLoginSuccess()
  const submit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError("");

    try {
      // POST /api/auth/login → { token, id, username, email, points, badges }
      const data = await api.login(form.email, form.password);

      localStorage.setItem("fitbond_token", data.token);
      localStorage.setItem("fitbond_user", JSON.stringify({
        id:       data.id,
        username: data.username,
        email:    data.email,
        points:   data.points,
        badges:   data.badges,
      }));

      onLoginSuccess({
        id:       data.id,
        username: data.username,
        email:    data.email,
        points:   data.points,
        badges:   data.badges,
      });
    } catch (err) {
      setApiError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <HeroPanel/>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:C.bg, padding:"2rem", overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:420 }}>

          <div style={{ marginBottom:"2.5rem" }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:C.text, margin:0 }}>
              Welcome back
            </h1>
            <p style={{ fontSize:14, color:C.muted, marginTop:8 }}>Sign in to your FitBond account</p>
          </div>

          {/* ✅ FIXED: onSubmit={submit} — was onSubmit={handleSubmit} (undefined) */}
          <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <Field label="Email"    type="email"    placeholder="you@example.com" value={form.email}    onChange={set("email")}    error={errors.email}/>
            <Field label="Password" type="password" placeholder="Your password"   value={form.password} onChange={set("password")} error={errors.password}/>
            <ApiError msg={apiError}/>
            <SubmitBtn loading={loading}>Sign In</SubmitBtn>
          </form>

          <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem", marginTop:"1.5rem" }}>
            <Divider/>
            <OAuthBtn icon="G" label="Continue with Google" provider="google"/>
            <OAuthBtn icon="S" label="Continue with Strava" provider="strava"/>
          </div>

          <p style={{ textAlign:"center", fontSize:14, color:C.muted, marginTop:"2rem" }}>
            Don't have an account?{" "}
            <button type="button" onClick={onGoToSignup}
              style={{ background:"none", border:"none", color:C.brand, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── SIGN UP ──────────────────────────────────────────────────────

export const Signup = ({ onSignupSuccess, onGoToLogin }) => {
  const [step,     setStep]     = useState(1);
  const [form,     setForm]     = useState({
    firstName:"", lastName:"", email:"", password:"", confirmPassword:"",
    height:"", weight:"", age:"", sex:"Male",
    fitnessLevel:"Beginner", goal:"", sports:[],
  });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const set         = field => e  => setForm({ ...form, [field]: e.target.value });
  const setSex      = val   => () => setForm({ ...form, sex: val });
  const setLevel    = val   => () => setForm({ ...form, fitnessLevel: val });
  const toggleSport = s => {
    const sports = form.sports.includes(s)
      ? form.sports.filter(x=>x!==s)
      : [...form.sports, s];
    setForm({ ...form, sports });
  };

  const v1 = () => {
    const e = {};
    if (!form.firstName)  e.firstName = "Required";
    if (!form.lastName)   e.lastName  = "Required";
    if (!form.email)      e.email     = "Required";
    if (!form.password || form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword)     e.confirmPassword = "Passwords don't match";
    return e;
  };

  // ✅ FIXED: uses Number() for safe numeric comparison
  const v2 = () => {
    const e = {};
    const age    = Number(form.age);
    const height = Number(form.height);
    const weight = Number(form.weight);
    if (!age    || age    < 10  || age    > 100) e.age    = "Valid age: 10–100";
    if (!height || height < 100 || height > 250) e.height = "Height in cm: 100–250";
    if (!weight || weight < 30  || weight > 300) e.weight = "Weight in kg: 30–300";
    if (!form.goal) e.goal = "Please set at least one goal";
    return e;
  };

  const next = e => {
    e.preventDefault();
    const errs = v1();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStep(2);
  };

  // ✅ FIXED: split try/catch so a profile error doesn't reset to step 1
  //           and doesn't block login if account was already created
  const submit = async e => {
    e.preventDefault();
    const errs = v2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError("");

    try {
      // Step 1 — POST /api/users → { token, id, username, email, points, badges }
      const userRes = await api.createUser({
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        password:  form.password,
      });

      localStorage.setItem("fitbond_token", userRes.token);
      localStorage.setItem("fitbond_user", JSON.stringify({
        id:       userRes.id,
        username: userRes.username,
        email:    userRes.email,
        points:   userRes.points,
        badges:   userRes.badges,
      }));

      // Step 2 — POST /api/profiles (separate try so a failure here doesn't block login)
      try {
        await api.createProfile({
          userId:           userRes.id,
          height_cm:        Number(form.height),
          weight_kg:        Number(form.weight),
          age:              Number(form.age),
          sex:              form.sex.toUpperCase(),
          level:            form.fitnessLevel.toUpperCase(),
          goal:             form.goal,
          sportPreferences: form.sports.map(s => s.toUpperCase()),
        });
      } catch (profileErr) {
        // Account was created — don't block the user, just log the failure
        console.error("Profile creation failed:", profileErr);
      }

      onSignupSuccess({
        id:       userRes.id,
        username: userRes.username,
        email:    userRes.email,
        points:   userRes.points,
        badges:   userRes.badges,
      });
    } catch (err) {
      // createUser failed — stay on step 1 and show the error
      setApiError(err.message);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const pill = (active, onClick, label, useAccent=false) => (
    <button type="button" onClick={onClick} style={{
      padding:"7px 16px", borderRadius:20,
      border:`1.5px solid ${active?(useAccent?C.accent:C.brand):C.border}`,
      background:active?(useAccent?C.accentLight:C.brand):C.surface,
      color:active?(useAccent?C.accentDark:"#fff"):C.muted,
      fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit",
    }}>{label}</button>
  );

  const seg = (active, onClick, label) => (
    <button type="button" onClick={onClick} style={{
      flex:1, padding:"10px", borderRadius:10,
      border:`1.5px solid ${active?C.brand:C.border}`,
      background:active?C.brandLight:C.surface,
      color:active?C.brandDark:C.muted,
      fontWeight:active?700:400, fontSize:14, cursor:"pointer", fontFamily:"inherit",
    }}>{label}</button>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <HeroPanel/>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:C.bg, padding:"2rem", overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:480, paddingTop:"1rem", paddingBottom:"2rem" }}>

          <div style={{ marginBottom:"1.75rem" }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:C.text, margin:0 }}>
              {step===1 ? "Create your account" : "Set up your profile"}
            </h1>
            <p style={{ fontSize:14, color:C.muted, marginTop:8 }}>
              {step===1 ? "Join thousands of athletes on FitBond" : "Help us personalise your experience"}
            </p>
            <div style={{ display:"flex", gap:8, marginTop:"1.25rem" }}>
              {[1,2].map(s=>(
                <div key={s} style={{ flex:1, height:4, borderRadius:4, background:s<=step?C.brand:C.border, transition:"background .3s" }}/>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.hint, marginTop:5 }}>Step {step} of 2</div>
          </div>

          {/* ── STEP 1: Account ── */}
          {step===1 && (
            <form onSubmit={next} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                <Field label="First Name" placeholder="Alex"    value={form.firstName} onChange={set("firstName")} error={errors.firstName}/>
                <Field label="Last Name"  placeholder="Johnson" value={form.lastName}  onChange={set("lastName")}  error={errors.lastName}/>
              </div>
              <Field label="Email"            type="email"    placeholder="you@example.com"  value={form.email}           onChange={set("email")}           error={errors.email}/>
              <Field label="Password"         type="password" placeholder="Min 8 characters" value={form.password}        onChange={set("password")}        error={errors.password}/>
              <Field label="Confirm Password" type="password" placeholder="Repeat password"  value={form.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword}/>
              <ApiError msg={apiError}/>
              <SubmitBtn loading={false}>Continue</SubmitBtn>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                <Divider/>
                <OAuthBtn icon="G" label="Sign up with Google" provider="google"/>
                <OAuthBtn icon="S" label="Sign up with Strava" provider="strava"/>
              </div>
              <p style={{ textAlign:"center", fontSize:14, color:C.muted }}>
                Already have an account?{" "}
                <button type="button" onClick={onGoToLogin}
                  style={{ background:"none", border:"none", color:C.brand, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* ── STEP 2: Profile ── */}
          {step===2 && (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
              {/* ✅ Age is clearly visible as a separate row to avoid it being cut off */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                <Field label="Height (cm)" type="number" placeholder="178" value={form.height} onChange={set("height")} error={errors.height}/>
                <Field label="Weight (kg)" type="number" placeholder="74"  value={form.weight} onChange={set("weight")} error={errors.weight}/>
              </div>
              <Field label="Age" type="number" placeholder="27" value={form.age} onChange={set("age")} error={errors.age}/>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Sex</div>
                <div style={{ display:"flex", gap:10 }}>
                  {["Male","Female","Other"].map(s=>seg(form.sex===s, setSex(s), s))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Fitness Level</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {FIT_LEVELS.map(l=>pill(form.fitnessLevel===l, setLevel(l), l))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>
                  Sport Preferences
                  <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0, marginLeft:6, color:C.hint }}>(pick any)</span>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {SPORTS.map(s=>pill(form.sports.includes(s), ()=>toggleSport(s), s, true))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Your First Goal</div>
                <input type="text" placeholder='e.g. "Run 50km this month"' value={form.goal} onChange={set("goal")}
                  style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errors.goal?"#ef4444":C.border}`,
                    borderRadius:10, fontSize:14, fontFamily:"inherit", background:C.surface, color:C.text, outline:"none",
                    boxSizing:"border-box" }}
                  onFocus={e=>e.target.style.borderColor=C.brand}
                  onBlur={e =>e.target.style.borderColor=errors.goal?"#ef4444":C.border}
                />
                {errors.goal && <span style={{ fontSize:12, color:"#ef4444", marginTop:4, display:"block" }}>{errors.goal}</span>}
              </div>

              <ApiError msg={apiError}/>

              <div style={{ display:"flex", gap:10 }}>
                <button type="button" onClick={()=>{ setStep(1); setApiError(""); }} style={{
                  padding:"13px 22px", borderRadius:10, border:`1.5px solid ${C.border}`,
                  background:"transparent", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit", color:C.muted,
                }}>Back</button>
                <div style={{ flex:1 }}>
                  <SubmitBtn loading={loading}>Create Account</SubmitBtn>
                </div>
              </div>

              <p style={{ textAlign:"center", fontSize:12, color:C.hint }}>
                By signing up you agree to FitBond's Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};