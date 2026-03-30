
// // export default Badges;

// import { useContext, useEffect, useState } from "react";
// import { DarkModeContext } from "../context/DarkModeContext";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// // ── Level config ──────────────────────────────────────────
// const LEVELS = [
//   { min: 0,   max: 49,   level: 1, title: "Beginner", accent: "#5eead4" },
//   { min: 50,  max: 149,  level: 2, title: "Explorer", accent: "#2dd4bf" },
//   { min: 150, max: 299,  level: 3, title: "Learner",  accent: "#14b8a6" },
//   { min: 300, max: 499,  level: 4, title: "Mentor",   accent: "#0d9488" },
//   { min: 500, max: 9999, level: 5, title: "Expert",   accent: "#0f766e" },
// ];

// const ALL_BADGES = [
//   { id: "first_session",    title: "First Steps",      description: "Completed your very first skill exchange session" },
//   { id: "explorer",         title: "Explorer",         description: "Reached 50 XP on SkillSwap",                     xpBonus: 0  },
//   { id: "five_sessions",    title: "Active Learner",   description: "Completed 5 skill exchange sessions",             xpBonus: 50 },
//   { id: "star_teacher",     title: "Star Teacher",     description: "Received a 5-star review from a learner",        xpBonus: 15 },
//   { id: "mentor",           title: "Mentor",           description: "Reached 300 XP — a true skill mentor"                        },
//   { id: "expert",           title: "Expert",           description: "Reached 500 XP — SkillSwap Expert!"                          },
//   { id: "community_helper", title: "Community Helper", description: "Received 10 or more reviews from the community", xpBonus: 30 },
// ];

// const XP_ACTIONS = [
//   { action: "Complete a session",    xp: 20, note: "Both users",    key: "session"  },
//   { action: "Leave a review",        xp: 10, note: "Per review",    key: "review"   },
//   { action: "Receive a 5★ review",  xp: 15, note: "Bonus XP",      key: "fivestar" },
//   { action: "Complete your profile", xp: 15, note: "One-time",      key: "profile"  },
//   { action: "First session ever",    xp: 25, note: "One-time",      key: "first"    },
//   { action: "Add a skill to teach",  xp: 10, note: "Per new skill", key: "skill"    },
// ];

// function getLevelFromXP(xp = 0) {
//   return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
// }
// function getNextLevel(xp = 0) {
//   const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
//   return LEVELS[idx + 1] || null;
// }

// async function shareBadge(badge, setMsg) {
//   const text = `I just earned the "${badge.title}" badge on SkillSwap!\n${badge.description}\n\n#SkillSwap #Badges #Learning`;
//   if (navigator.share) {
//     try { await navigator.share({ title: "SkillSwap Badge", text }); return; } catch (_) {}
//   }
//   try {
//     await navigator.clipboard.writeText(text);
//     setMsg(badge.id);
//     setTimeout(() => setMsg(""), 2000);
//   } catch (_) {}
// }

// /* ── SkillSwap "S" logo SVG — used as badge icon ── */
// function SkillSwapLogo({ size = 32, color = "#2dd4bf", opacity = 1 }) {
//   return (
//     <svg
//   width={size}
//   height={size}
//   viewBox="0 0 100 100"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
//   style={{ opacity }}
// >
//   {/* Sharp S */}
//   <path
//     d="M75 20 L45 20 Q30 20 30 35 Q30 50 60 50 Q85 50 85 65 Q85 80 55 80 L25 80"
//     stroke={color}
//     strokeWidth="7"
//     strokeLinecap="round"
//     fill="none"
//   />

//   {/* Arrow top */}
//   <path
//     d="M60 10 L75 20 L60 30"
//     stroke={color}
//     strokeWidth="7"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />

//   {/* Arrow bottom */}
//   <path
//     d="M40 70 L25 80 L40 90"
//     stroke={color}
//     strokeWidth="7"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
// </svg>
//   );
// }

// /* ── Radial progress ring ── */
// function RingProgress({ pct, accent, trackColor, size = 108, stroke = 8, children }) {
//   const r    = (size - stroke) / 2;
//   const circ = 2 * Math.PI * r;
//   const dash = (pct / 100) * circ;
//   return (
//     <svg width={size} height={size} style={{ display: "block", transform: "rotate(-90deg)" }}>
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
//       <circle
//         cx={size / 2} cy={size / 2} r={r} fill="none"
//         stroke={accent} strokeWidth={stroke}
//         strokeDasharray={`${dash} ${circ}`}
//         strokeLinecap="round"
//         style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }}
//       />
//       <foreignObject x={0} y={0} width={size} height={size}>
//         <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(90deg)" }}>
//           {children}
//         </div>
//       </foreignObject>
//     </svg>
//   );
// }

// /* ══════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════ */
// const Badges = () => {
//   const { darkMode } = useContext(DarkModeContext);
//   const { user }     = useContext(AuthContext);
//   const [profile, setProfile]   = useState(null);
//   const [loading, setLoading]   = useState(true);
//   const [copiedId, setCopiedId] = useState("");
//   const [tab, setTab]           = useState("all");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data.user);
//       } catch {
//         setProfile(user);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const xp             = profile?.xp || 0;
//   const earnedBadgeIds = (profile?.badges || []).map((b) => b.id);
//   const currentLevel   = getLevelFromXP(xp);
//   const nextLevel      = getNextLevel(xp);
//   const xpToNext       = nextLevel ? nextLevel.min - xp : 0;
//   const progressPct    = nextLevel
//     ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
//     : 100;
//   const earnedCount = earnedBadgeIds.length;

//   const visibleBadges = ALL_BADGES.filter((b) => {
//     if (tab === "earned") return earnedBadgeIds.includes(b.id);
//     if (tab === "locked") return !earnedBadgeIds.includes(b.id);
//     return true;
//   });

//   const dm = darkMode;

//   // ── Semantic color tokens ──
//   const bg         = dm ? "#0f172a" : "#f8fafc";
//   const navBg      = dm ? "#0a1628" : "#ffffff";
//   const surface    = dm ? "#1e293b" : "#ffffff";
//   const surfaceAlt = dm ? "#111827" : "#f1f5f9";
//   const border     = dm ? "#334155" : "#e2e8f0";
//   const muted      = dm ? "#475569" : "#94a3b8";
//   const text       = dm ? "#f1f5f9" : "#0f172a";
//   const subtext    = dm ? "#94a3b8" : "#64748b";
//   const ringTrack  = dm ? "#1e293b" : "#e2e8f0";
//   const lockedDesc = dm ? "#374151" : "#94a3b8";
//   const accent     = currentLevel.accent;
//   const shadow     = dm ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.06)";

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <style>{`@keyframes _spin{to{transform:rotate(360deg)}}`}</style>
//         <div style={{
//           width: 36, height: 36, borderRadius: "50%",
//           border: `3px solid ${accent}`, borderTopColor: "transparent",
//           animation: "_spin 0.7s linear infinite",
//         }} />
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: bg, color: text }}>
//       <style>{`
//         * { box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: ${bg}; }
//         ::-webkit-scrollbar-thumb { background: ${border}; border-radius: 4px; }
//         .badge-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
//         .badge-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px ${shadow}; }
//         .xp-row:hover { background: ${surfaceAlt}; border-radius: 6px; }
//         .tab-btn { transition: all 0.15s; }
//         .share-btn { transition: opacity 0.15s, transform 0.1s; cursor: pointer; }
//         .share-btn:hover { opacity: 0.8; }
//         .share-btn:active { transform: scale(0.97); }
//         .level-pip { transition: background 0.2s, border 0.2s; }
//       `}</style>

//       {/* ── NAV ── */}
//       <div style={{ borderBottom: `1px solid ${border}`, background: navBg, padding: "0 32px" }}>
//         <div style={{ maxWidth: 1100, margin: "0 auto", height: 56, display: "flex", alignItems: "center", gap: 24 }}>
//           {/* Logo mark */}
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <SkillSwapLogo size={22} color={accent} />
//             <span style={{ fontWeight: 700, fontSize: 16, color: accent, letterSpacing: "-0.3px" }}>SkillSwap</span>
//           </div>
//           <span style={{ color: border, fontSize: 18, lineHeight: 1 }}>›</span>
//           <span style={{ fontSize: 15, color: subtext }}>Achievements</span>
//           <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
//             <span style={{ fontSize: 14, color: muted }}>{profile?.name || "You"}</span>
//             <div style={{
//               width: 30, height: 30, borderRadius: "50%",
//               background: `${accent}22`, border: `1.5px solid ${accent}50`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 13, color: accent, fontWeight: 700,
//             }}>
//               {(profile?.name || "U")[0].toUpperCase()}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 32px 72px" }}>

//         {/* ── PAGE TITLE ── */}
//         <div style={{ marginBottom: 32 }}>
//           <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", margin: 0, color: text }}>
//             Badges & XP
//           </h1>
//           <p style={{ color: subtext, fontSize: 15, margin: "6px 0 0" }}>
//             Your XP progress and earned badges.
//           </p>
//         </div>

//         {/* ── TWO-COLUMN LAYOUT ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>

//           {/* ── LEFT SIDEBAR ── */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

//             {/* XP OVERVIEW CARD */}
//             <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24 }}>
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//                 <RingProgress pct={progressPct} accent={accent} trackColor={ringTrack}>
//                   <div style={{ textAlign: "center" }}>
//                     <div style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1 }}>
//                       {currentLevel.level}
//                     </div>
//                     <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: 1.5, marginTop: 3, textTransform: "uppercase" }}>Level</div>
//                   </div>
//                 </RingProgress>
//                 <div style={{ textAlign: "center" }}>
//                   <div style={{ fontSize: 20, fontWeight: 700, color: text }}>{currentLevel.title}</div>
//                   <div style={{ fontSize: 14, color: subtext, marginTop: 4 }}>
//                     {nextLevel ? `${xpToNext} XP to ${nextLevel.title}` : "Max level reached"}
//                   </div>
//                 </div>
//               </div>

//               {/* XP bar */}
//               <div style={{ marginTop: 22 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//                   <span style={{ fontSize: 13, color: muted }}>XP Progress</span>
//                   <span style={{ fontSize: 13, color: accent, fontWeight: 600 }}>{xp} XP</span>
//                 </div>
//                 <div style={{ height: 3, background: border, borderRadius: 4, overflow: "hidden" }}>
//                   <div style={{
//                     height: "100%", borderRadius: 4, background: accent,
//                     width: `${progressPct}%`, transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
//                   }} />
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
//                   <span style={{ fontSize: 12, color: muted }}>{currentLevel.min}</span>
//                   <span style={{ fontSize: 12, color: muted }}>{nextLevel?.min ?? "MAX"}</span>
//                 </div>
//               </div>

//               {/* Level pips */}
//               <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 5 }}>
//                 {LEVELS.map((l) => {
//                   const active = xp >= l.min;
//                   return (
//                     <div key={l.level} className="level-pip" style={{
//                       display: "flex", alignItems: "center", gap: 10,
//                       padding: "7px 10px", borderRadius: 8,
//                       background: active ? `${l.accent}10` : "transparent",
//                       border: `1px solid ${active ? l.accent + "35" : border}`,
//                     }}>
//                       <div style={{
//                         width: 22, height: 22, borderRadius: 6, fontSize: 13, fontWeight: 700,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         background: active ? l.accent : border,
//                         color: active ? (dm ? "#0f172a" : "#fff") : muted,
//                       }}>{l.level}</div>
//                       <span style={{ fontSize: 14, color: active ? text : muted, fontWeight: active ? 600 : 400 }}>
//                         {l.title}
//                       </span>
//                       {l.level === currentLevel.level && (
//                         <span style={{ marginLeft: "auto", fontSize: 11, color: l.accent, fontWeight: 700, letterSpacing: 0.3 }}>
//                           NOW
//                         </span>
//                       )}
//                       {l.level < currentLevel.level && (
//                         <span style={{ marginLeft: "auto", fontSize: 12, color: muted }}>✓</span>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* STATS CARD */}
//             <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
//               <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: 1.2, marginBottom: 14, textTransform: "uppercase" }}>
//                 Stats
//               </div>
//               {[
//                 { label: "Total XP",      value: `${xp}`,                                                   color: accent    },
//                 { label: "Badges Earned", value: `${earnedCount} / ${ALL_BADGES.length}`,                   color: "#2dd4bf" },
//                 { label: "Completion",    value: `${Math.round((earnedCount / ALL_BADGES.length) * 100)}%`, color: "#5eead4" },
//               ].map((s, i, arr) => (
//                 <div key={s.label} style={{
//                   display: "flex", justifyContent: "space-between", alignItems: "center",
//                   padding: "11px 0",
//                   borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none",
//                 }}>
//                   <span style={{ fontSize: 14, color: subtext }}>{s.label}</span>
//                   <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
//                 </div>
//               ))}
//             </div>

//             {/* EARN XP CARD */}
//             <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
//               <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: 1.2, marginBottom: 14, textTransform: "uppercase" }}>
//                 Earn XP
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                 {XP_ACTIONS.map((item) => (
//                   <div key={item.key} className="xp-row" style={{
//                     display: "flex", alignItems: "center",
//                     padding: "9px 8px", cursor: "default",
//                   }}>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontSize: 14, color: text, fontWeight: 500 }}>{item.action}</div>
//                       <div style={{ fontSize: 12, color: muted, marginTop: 1 }}>{item.note}</div>
//                     </div>
//                     <span style={{
//                       fontSize: 13, fontWeight: 700, color: accent,
//                       background: `${accent}15`, padding: "3px 9px", borderRadius: 5,
//                     }}>+{item.xp}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>

//           {/* ── RIGHT: BADGES ── */}
//           <div>

//             {/* Tab bar */}
//             <div style={{
//               display: "flex", gap: 3, marginBottom: 20,
//               background: surface, borderRadius: 9, padding: 3,
//               border: `1px solid ${border}`, width: "fit-content",
//             }}>
//               {[
//                 { key: "all",    label: `All (${ALL_BADGES.length})`               },
//                 { key: "earned", label: `Earned (${earnedCount})`                   },
//                 { key: "locked", label: `Locked (${ALL_BADGES.length - earnedCount})` },
//               ].map((t) => (
//                 <button
//                   key={t.key}
//                   className="tab-btn"
//                   onClick={() => setTab(t.key)}
//                   style={{
//                     padding: "6px 16px", borderRadius: 7, border: "none", cursor: "pointer",
//                     fontSize: 14, fontWeight: 600, fontFamily: "inherit",
//                     background: tab === t.key ? accent : "transparent",
//                     color: tab === t.key ? (dm ? "#0f172a" : "#fff") : subtext,
//                   }}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>

//             {/* Badge grid */}
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
//               {visibleBadges.map((badge) => {
//                 const earned     = earnedBadgeIds.includes(badge.id);
//                 const earnedData = profile?.badges?.find((b) => b.id === badge.id);
//                 return earned
//                   ? (
//                     <EarnedBadge
//                       key={badge.id}
//                       badge={badge}
//                       earnedData={earnedData}
//                       copiedId={copiedId}
//                       setCopiedId={setCopiedId}
//                       accent={accent}
//                       surface={surface}
//                       border={border}
//                       text={text}
//                       subtext={subtext}
//                       muted={muted}
//                       dm={dm}
//                     />
//                   ) : (
//                     <LockedBadge
//                       key={badge.id}
//                       badge={badge}
//                       surfaceAlt={surfaceAlt}
//                       border={border}
//                       muted={muted}
//                       lockedDesc={lockedDesc}
//                     />
//                   );
//               })}
//             </div>

//             {visibleBadges.length === 0 && (
//               <div style={{ textAlign: "center", padding: "60px 0", color: muted, fontSize: 15 }}>
//                 No badges in this category yet.
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ── Earned Badge Card ── */
// function EarnedBadge({ badge, earnedData, copiedId, setCopiedId, accent, surface, border, text, subtext, muted, dm }) {
//   return (
//     <div className="badge-card" style={{
//       background: surface,
//       border: `1px solid ${border}`,
//       borderRadius: 12,
//       padding: "22px 18px",
//       display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
//       position: "relative",
//     }}>
//       {/* Top accent line */}
//       <div style={{
//         position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
//         background: accent, borderRadius: "0 0 4px 4px",
//       }} />

//       {/* EARNED chip */}
//       <div style={{
//         position: "absolute", top: 12, right: 12,
//         background: `${accent}18`, border: `1px solid ${accent}35`,
//         borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700,
//         color: accent, letterSpacing: 0.8, textTransform: "uppercase",
//       }}>Earned</div>

//       {/* Logo icon */}
//       <div style={{
//         width: 56, height: 56, borderRadius: 12,
//         background: `${accent}12`, border: `1.5px solid ${accent}30`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         <SkillSwapLogo size={30} color={accent} />
//       </div>

//       <div style={{ textAlign: "center" }}>
//         <div style={{ fontSize: 15, fontWeight: 700, color: text }}>{badge.title}</div>
//         <div style={{ fontSize: 13, color: subtext, marginTop: 5, lineHeight: 1.6 }}>{badge.description}</div>
//       </div>

//       {badge.xpBonus > 0 && (
//         <div style={{
//           fontSize: 13, fontWeight: 600, color: accent,
//           background: `${accent}10`, padding: "3px 10px", borderRadius: 20,
//           border: `1px solid ${accent}25`,
//         }}>+{badge.xpBonus} XP</div>
//       )}

//       {earnedData?.earnedAt && (
//         <div style={{ fontSize: 12, color: muted }}>
//           {new Date(earnedData.earnedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//         </div>
//       )}

//       <button
//         className="share-btn"
//         onClick={() => shareBadge(badge, setCopiedId)}
//         style={{
//           marginTop: 2, width: "100%", padding: "8px 0", borderRadius: 8,
//           border: `1px solid ${border}`,
//           background: "transparent",
//           color: subtext, fontSize: 13, fontWeight: 600,
//           fontFamily: "inherit",
//         }}
//       >
//         {copiedId === badge.id ? "Copied" : "Share"}
//       </button>
//     </div>
//   );
// }

// /* ── Locked Badge Card ── */
// function LockedBadge({ badge, surfaceAlt, border, muted, lockedDesc }) {
//   return (
//     <div className="badge-card" style={{
//       background: surfaceAlt,
//       border: `1px dashed ${border}`,
//       borderRadius: 12,
//       padding: "22px 18px",
//       display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
//     }}>
//       {/* Logo icon — greyed out */}
//       <div style={{
//         width: 56, height: 56, borderRadius: 12,
//         background: border + "40",
//         border: `1.5px solid ${border}`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         <SkillSwapLogo size={30} color={muted} opacity={0.4} />
//       </div>

//       <div style={{
//         background: "transparent", border: `1px solid ${border}`,
//         borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 600,
//         color: muted, letterSpacing: 0.8, textTransform: "uppercase",
//       }}>Locked</div>

//       <div style={{ textAlign: "center" }}>
//         <div style={{ fontSize: 15, fontWeight: 600, color: muted }}>{badge.title}</div>
//         <div style={{ fontSize: 13, color: lockedDesc, marginTop: 5, lineHeight: 1.6 }}>{badge.description}</div>
//       </div>

//       {badge.xpBonus > 0 && (
//         <div style={{ fontSize: 13, color: muted }}>+{badge.xpBonus} XP on unlock</div>
//       )}
//     </div>
//   );
// }

// export default Badges;

import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// ── Level config ──────────────────────────────────────────
const LEVELS = [
  { min: 0,   max: 49,   level: 1, title: "Beginner", accent: "#7fd4c8" },
  { min: 50,  max: 149,  level: 2, title: "Explorer", accent: "#57c4af" },
  { min: 150, max: 299,  level: 3, title: "Learner",  accent: "#30b89f" },
  { min: 300, max: 499,  level: 4, title: "Mentor",   accent: "#229485" },
  { min: 500, max: 9999, level: 5, title: "Expert",   accent: "#156b5f" },
];

const ALL_BADGES = [
  { id: "first_session",    title: "First Steps",      description: "Completed your very first skill exchange session" },
  { id: "explorer",         title: "Explorer",         description: "Reached 50 XP on SkillSwap",                     xpBonus: 0  },
  { id: "five_sessions",    title: "Active Learner",   description: "Completed 5 skill exchange sessions",             xpBonus: 50 },
  { id: "star_teacher",     title: "Star Teacher",     description: "Received a 5-star review from a learner",        xpBonus: 15 },
  { id: "mentor",           title: "Mentor",           description: "Reached 300 XP — a true skill mentor"                        },
  { id: "expert",           title: "Expert",           description: "Reached 500 XP — SkillSwap Expert!"                          },
  { id: "community_helper", title: "Community Helper", description: "Received 10 or more reviews from the community", xpBonus: 30 },
];

const XP_ACTIONS = [
  { action: "Complete a session",    xp: 20, note: "Both users",    key: "session"  },
  { action: "Leave a review",        xp: 10, note: "Per review",    key: "review"   },
  { action: "Receive a 5★ review",  xp: 15, note: "Bonus XP",      key: "fivestar" },
  { action: "Complete your profile", xp: 15, note: "One-time",      key: "profile"  },
  { action: "First session ever",    xp: 25, note: "One-time",      key: "first"    },
  { action: "Add a skill to teach",  xp: 10, note: "Per new skill", key: "skill"    },
];

function getLevelFromXP(xp = 0) {
  return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
}
function getNextLevel(xp = 0) {
  const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
  return LEVELS[idx + 1] || null;
}

async function shareBadge(badge, setMsg) {
  const text = `I just earned the "${badge.title}" badge on SkillSwap!\n${badge.description}\n\n#SkillSwap #Badges #Learning`;
  if (navigator.share) {
    try { await navigator.share({ title: "SkillSwap Badge", text }); return; } catch (_) {}
  }
  try {
    await navigator.clipboard.writeText(text);
    setMsg(badge.id);
    setTimeout(() => setMsg(""), 2000);
  } catch (_) {}
}

/* ── SkillSwap "S" logo SVG — used as fallback ── */
function SkillSwapLogo({ size = 32, color = "#30b89f", opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <path d="M75 20 L45 20 Q30 20 30 35 Q30 50 60 50 Q85 50 85 65 Q85 80 55 80 L25 80" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M60 10 L75 20 L60 30" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 70 L25 80 L40 90" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Badge Icons — unique SVG per badge id ── */
function BadgeIcon({ badgeId, size = 30, color = "#30b89f", opacity = 1 }) {
  const s = size;
  const style = { opacity };

  switch (badgeId) {

    case "first_session":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <ellipse cx="35" cy="68" rx="14" ry="20" fill={color} opacity="0.85" />
          <ellipse cx="28" cy="50" rx="6" ry="8" fill={color} />
          <ellipse cx="38" cy="47" rx="6" ry="8" fill={color} />
          <ellipse cx="47" cy="50" rx="5" ry="7" fill={color} />
          <ellipse cx="68" cy="42" rx="12" ry="17" fill={color} opacity="0.55" />
          <ellipse cx="62" cy="27" rx="5" ry="7" fill={color} opacity="0.55" />
          <ellipse cx="71" cy="25" rx="5" ry="7" fill={color} opacity="0.55" />
          <ellipse cx="79" cy="28" rx="4" ry="6" fill={color} opacity="0.55" />
        </svg>
      );

    case "explorer":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="6" />
          <circle cx="50" cy="50" r="4" fill={color} />
          <polygon points="50,50 44,28 56,28" fill={color} />
          <polygon points="50,50 56,72 44,72" fill={color} opacity="0.4" />
          <line x1="50" y1="13" x2="50" y2="20" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="80" x2="50" y2="87" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="13" y1="50" x2="20" y2="50" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="80" y1="50" x2="87" y2="50" stroke={color} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "five_sessions":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <path d="M50 75 L12 68 L12 28 Q12 22 20 24 L50 32 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 75 L88 68 L88 28 Q88 22 80 24 L50 32 Z" fill={color} opacity="0.5" stroke={color} strokeWidth="4" strokeLinejoin="round" />
          <line x1="50" y1="32" x2="50" y2="75" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="44" x2="44" y2="47" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="22" y1="54" x2="44" y2="57" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="22" y1="64" x2="44" y2="66" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="78" y1="44" x2="56" y2="47" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="78" y1="54" x2="56" y2="57" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="78" y1="64" x2="56" y2="66" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case "star_teacher":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <polygon points="50,10 61,37 90,37 68,55 76,82 50,65 24,82 32,55 10,37 39,37" fill={color} opacity="0.85" />
          <rect x="62" y="62" width="9" height="28" rx="2" transform="rotate(-35 62 62)" fill={color} />
          <polygon points="62,62 71,62 66.5,54" transform="rotate(-35 62 62)" fill={color} opacity="0.6" />
          <rect x="62" y="86" width="9" height="4" rx="1" transform="rotate(-35 62 62)" fill={color} opacity="0.4" />
        </svg>
      );

    case "mentor":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <path d="M10 65 Q20 55 35 52 L50 50" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M90 65 Q80 55 65 52 L50 50" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
          <ellipse cx="50" cy="50" rx="14" ry="10" fill={color} />
          <path d="M36 46 Q30 36 36 32 Q40 30 43 40" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M40 44 Q36 33 43 30 Q47 29 47 40" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M64 46 Q70 36 64 32 Q60 30 57 40" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M60 44 Q64 33 57 30 Q53 29 53 40" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "expert":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <path d="M28 18 L72 18 L65 58 Q63 68 50 68 Q37 68 35 58 Z" fill={color} opacity="0.85" />
          <path d="M28 18 Q12 18 12 36 Q12 52 30 52" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M72 18 Q88 18 88 36 Q88 52 70 52" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <rect x="44" y="68" width="12" height="14" rx="2" fill={color} opacity="0.7" />
          <rect x="32" y="80" width="36" height="7" rx="3" fill={color} />
          <polygon points="50,28 53,36 62,36 55,41 58,50 50,45 42,50 45,41 38,36 47,36" fill="white" opacity="0.5" />
        </svg>
      );

    case "community_helper":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
          <circle cx="28" cy="32" r="10" fill={color} opacity="0.6" />
          <path d="M12 72 Q14 52 28 50 Q42 52 44 72" fill={color} opacity="0.6" />
          <circle cx="72" cy="32" r="10" fill={color} opacity="0.6" />
          <path d="M56 72 Q58 52 72 50 Q86 52 88 72" fill={color} opacity="0.6" />
          <circle cx="50" cy="28" r="12" fill={color} />
          <path d="M30 76 Q33 54 50 52 Q67 54 70 76" fill={color} />
          <path d="M46,60 Q44,57 41,57 Q38,57 38,61 Q38,65 46,70 Q54,65 54,61 Q54,57 51,57 Q48,57 46,60 Z" fill="white" opacity="0.7" />
        </svg>
      );

    default:
      return <SkillSwapLogo size={size} color={color} opacity={opacity} />;
  }
}

/* ── Radial progress ring ── */
function RingProgress({ pct, accent, trackColor, size = 108, stroke = 8, children }) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ display: "block", transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={accent} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }}
      />
      <foreignObject x={0} y={0} width={size} height={size}>
        <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(90deg)" }}>
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const Badges = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user }     = useContext(AuthContext);
  const [profile, setProfile]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [copiedId, setCopiedId] = useState("");
  const [tab, setTab]           = useState("all");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch {
        setProfile(user);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const xp             = profile?.xp || 0;
  const earnedBadgeIds = (profile?.badges || []).map((b) => b.id);
  const currentLevel   = getLevelFromXP(xp);
  const nextLevel      = getNextLevel(xp);
  const xpToNext       = nextLevel ? nextLevel.min - xp : 0;
  const progressPct    = nextLevel
    ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
    : 100;
  const earnedCount = earnedBadgeIds.length;

  const visibleBadges = ALL_BADGES.filter((b) => {
    if (tab === "earned") return earnedBadgeIds.includes(b.id);
    if (tab === "locked") return !earnedBadgeIds.includes(b.id);
    return true;
  });

  const dm = darkMode;

  const bg         = dm ? "#0f172a" : "#f8fafc";
  const navBg      = dm ? "#0a1628" : "#ffffff";
  const surface    = dm ? "#1e293b" : "#ffffff";
  const surfaceAlt = dm ? "#111827" : "#f1f5f9";
  const border     = dm ? "#334155" : "#e2e8f0";
  const muted      = dm ? "#475569" : "#94a3b8";
  const text       = dm ? "#f1f5f9" : "#0f172a";
  const subtext    = dm ? "#94a3b8" : "#64748b";
  const ringTrack  = dm ? "#1e293b" : "#e2e8f0";
  const lockedDesc = dm ? "#374151" : "#94a3b8";
  const accent     = currentLevel.accent;
  const shadow     = dm ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.06)";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes _spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: `3px solid ${accent}`, borderTopColor: "transparent",
          animation: "_spin 0.7s linear infinite",
        }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${bg}; }
        ::-webkit-scrollbar-thumb { background: ${border}; border-radius: 4px; }
        .badge-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .badge-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px ${shadow}; }
        .xp-row:hover { background: ${surfaceAlt}; border-radius: 6px; }
        .tab-btn { transition: all 0.15s; }
        .share-btn { transition: opacity 0.15s, transform 0.1s; cursor: pointer; }
        .share-btn:hover { opacity: 0.8; }
        .share-btn:active { transform: scale(0.97); }
        .level-pip { transition: background 0.2s, border 0.2s; }
      `}</style>

      {/* ── NAV ── */}
      <div style={{ borderBottom: `1px solid ${border}`, background: navBg, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 56, display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SkillSwapLogo size={22} color={accent} />
            <span style={{ fontWeight: 700, fontSize: 16, color: accent, letterSpacing: "-0.3px" }}>SkillSwap</span>
          </div>
          <span style={{ color: border, fontSize: 18, lineHeight: 1 }}>›</span>
          <span style={{ fontSize: 15, color: subtext }}>Achievements</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, color: muted }}>{profile?.name || "You"}</span>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: `${accent}22`, border: `1.5px solid ${accent}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: accent, fontWeight: 700,
            }}>
              {(profile?.name || "U")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 32px 72px" }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", margin: 0, color: text }}>
            Badges & XP
          </h1>
          <p style={{ color: subtext, fontSize: 15, margin: "6px 0 0" }}>
            Your XP progress and earned badges.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>

          {/* ── LEFT SIDEBAR ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* XP OVERVIEW CARD */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <RingProgress pct={progressPct} accent={accent} trackColor={ringTrack}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1 }}>
                      {currentLevel.level}
                    </div>
                    <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: 1.5, marginTop: 3, textTransform: "uppercase" }}>Level</div>
                  </div>
                </RingProgress>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: text }}>{currentLevel.title}</div>
                  <div style={{ fontSize: 14, color: subtext, marginTop: 4 }}>
                    {nextLevel ? `${xpToNext} XP to ${nextLevel.title}` : "Max level reached"}
                  </div>
                </div>
              </div>

              {/* XP bar */}
              <div style={{ marginTop: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: 13, color: muted }}>XP Progress</span>
                  <span style={{ fontSize: 13, color: accent, fontWeight: 600 }}>{xp} XP</span>
                </div>
                <div style={{ height: 3, background: border, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 4, background: accent,
                    width: `${progressPct}%`, transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                  <span style={{ fontSize: 12, color: muted }}>{currentLevel.min}</span>
                  <span style={{ fontSize: 12, color: muted }}>{nextLevel?.min ?? "MAX"}</span>
                </div>
              </div>

              {/* Level pips */}
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 5 }}>
                {LEVELS.map((l) => {
                  const active = xp >= l.min;
                  return (
                    <div key={l.level} className="level-pip" style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "7px 10px", borderRadius: 8,
                      background: active ? `${l.accent}18` : "transparent",
                      border: `1px solid ${active ? l.accent + "45" : border}`,
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, fontSize: 13, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: active ? l.accent : border,
                        color: active ? "#ffffff" : muted,
                      }}>{l.level}</div>
                      <span style={{ fontSize: 14, color: active ? text : muted, fontWeight: active ? 600 : 400 }}>
                        {l.title}
                      </span>
                      {l.level === currentLevel.level && (
                        <span style={{ marginLeft: "auto", fontSize: 11, color: l.accent, fontWeight: 700, letterSpacing: 0.3 }}>
                          NOW
                        </span>
                      )}
                      {l.level < currentLevel.level && (
                        <span style={{ marginLeft: "auto", fontSize: 12, color: muted }}>✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STATS CARD */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: 1.2, marginBottom: 14, textTransform: "uppercase" }}>
                Stats
              </div>
              {[
                { label: "Total XP",      value: `${xp}`,                                                   color: "#30b89f" },
                { label: "Badges Earned", value: `${earnedCount} / ${ALL_BADGES.length}`,                   color: "#229485" },
                { label: "Completion",    value: `${Math.round((earnedCount / ALL_BADGES.length) * 100)}%`, color: "#57c4af" },
              ].map((s, i, arr) => (
                <div key={s.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "11px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none",
                }}>
                  <span style={{ fontSize: 14, color: subtext }}>{s.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* EARN XP CARD */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: 1.2, marginBottom: 14, textTransform: "uppercase" }}>
                Earn XP
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {XP_ACTIONS.map((item) => (
                  <div key={item.key} className="xp-row" style={{
                    display: "flex", alignItems: "center",
                    padding: "9px 8px", cursor: "default",
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: text, fontWeight: 500 }}>{item.action}</div>
                      <div style={{ fontSize: 12, color: muted, marginTop: 1 }}>{item.note}</div>
                    </div>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: accent,
                      background: `${accent}15`, padding: "3px 9px", borderRadius: 5,
                    }}>+{item.xp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: BADGES ── */}
          <div>

            {/* Tab bar */}
            <div style={{
              display: "flex", gap: 3, marginBottom: 20,
              background: surface, borderRadius: 9, padding: 3,
              border: `1px solid ${border}`, width: "fit-content",
            }}>
              {[
                { key: "all",    label: `All (${ALL_BADGES.length})`                  },
                { key: "earned", label: `Earned (${earnedCount})`                      },
                { key: "locked", label: `Locked (${ALL_BADGES.length - earnedCount})` },
              ].map((t) => (
                <button
                  key={t.key}
                  className="tab-btn"
                  onClick={() => setTab(t.key)}
                  style={{
                    padding: "6px 16px", borderRadius: 7, border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600, fontFamily: "inherit",
                    background: tab === t.key ? accent : "transparent",
                    color: tab === t.key ? "#ffffff" : subtext,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Badge grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {visibleBadges.map((badge) => {
                const earned     = earnedBadgeIds.includes(badge.id);
                const earnedData = profile?.badges?.find((b) => b.id === badge.id);
                return earned
                  ? (
                    <EarnedBadge
                      key={badge.id}
                      badge={badge}
                      earnedData={earnedData}
                      copiedId={copiedId}
                      setCopiedId={setCopiedId}
                      accent={accent}
                      surface={surface}
                      border={border}
                      text={text}
                      subtext={subtext}
                      muted={muted}
                      dm={dm}
                    />
                  ) : (
                    <LockedBadge
                      key={badge.id}
                      badge={badge}
                      surfaceAlt={surfaceAlt}
                      border={border}
                      muted={muted}
                      lockedDesc={lockedDesc}
                    />
                  );
              })}
            </div>

            {visibleBadges.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: muted, fontSize: 15 }}>
                No badges in this category yet.
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Earned Badge Card ── */
function EarnedBadge({ badge, earnedData, copiedId, setCopiedId, accent, surface, border, text, subtext, muted, dm }) {
  return (
    <div className="badge-card" style={{
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 12,
      padding: "22px 18px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
        background: accent, borderRadius: "0 0 4px 4px",
      }} />

      <div style={{
        position: "absolute", top: 12, right: 12,
        background: `${accent}18`, border: `1px solid ${accent}45`,
        borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700,
        color: accent, letterSpacing: 0.8, textTransform: "uppercase",
      }}>Earned</div>

      <div style={{
        width: 56, height: 56, borderRadius: 12,
        background: `${accent}12`, border: `1.5px solid ${accent}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <BadgeIcon badgeId={badge.id} size={30} color={accent} />
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: text }}>{badge.title}</div>
        <div style={{ fontSize: 13, color: subtext, marginTop: 5, lineHeight: 1.6 }}>{badge.description}</div>
      </div>

      {badge.xpBonus > 0 && (
        <div style={{
          fontSize: 13, fontWeight: 600, color: accent,
          background: `${accent}10`, padding: "3px 10px", borderRadius: 20,
          border: `1px solid ${accent}30`,
        }}>+{badge.xpBonus} XP</div>
      )}

      {earnedData?.earnedAt && (
        <div style={{ fontSize: 12, color: muted }}>
          {new Date(earnedData.earnedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </div>
      )}

      <button
        className="share-btn"
        onClick={() => shareBadge(badge, setCopiedId)}
        style={{
          marginTop: 2, width: "100%", padding: "8px 0", borderRadius: 8,
          border: `1px solid ${border}`,
          background: "transparent",
          color: subtext, fontSize: 13, fontWeight: 600,
          fontFamily: "inherit",
        }}
      >
        {copiedId === badge.id ? "Copied" : "Share"}
      </button>
    </div>
  );
}

/* ── Locked Badge Card ── */
function LockedBadge({ badge, surfaceAlt, border, muted, lockedDesc }) {
  return (
    <div className="badge-card" style={{
      background: surfaceAlt,
      border: `1px dashed ${border}`,
      borderRadius: 12,
      padding: "22px 18px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 12,
        background: border + "40",
        border: `1.5px solid ${border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <BadgeIcon badgeId={badge.id} size={30} color={muted} opacity={0.4} />
      </div>

      <div style={{
        background: "transparent", border: `1px solid ${border}`,
        borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 600,
        color: muted, letterSpacing: 0.8, textTransform: "uppercase",
      }}>Locked</div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: muted }}>{badge.title}</div>
        <div style={{ fontSize: 13, color: lockedDesc, marginTop: 5, lineHeight: 1.6 }}>{badge.description}</div>
      </div>

      {badge.xpBonus > 0 && (
        <div style={{ fontSize: 13, color: muted }}>+{badge.xpBonus} XP on unlock</div>
      )}
    </div>
  );
}

export default Badges;