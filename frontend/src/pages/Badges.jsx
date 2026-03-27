


// src/pages/Badges.jsx  — updated with Share buttons on earned cards

import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// ── Level config ──────────────────────────────────────────
const LEVELS = [
  { min: 0,   max: 49,   level: 1, title: "Beginner",  color: "from-slate-400 to-slate-500"   },
  { min: 50,  max: 149,  level: 2, title: "Explorer",  color: "from-teal-400 to-cyan-500"     },
  { min: 150, max: 299,  level: 3, title: "Learner",   color: "from-blue-400 to-indigo-500"   },
  { min: 300, max: 499,  level: 4, title: "Mentor",    color: "from-purple-400 to-violet-500" },
  { min: 500, max: 9999, level: 5, title: "Expert",    color: "from-yellow-400 to-orange-500" },
];

const ALL_BADGES = [
  { id: "first_session",    title: "First Steps",       description: "Completed your very first skill exchange session", icon: "🎯", xpBonus: 25  },
  { id: "explorer",         title: "Explorer",          description: "Reached 50 XP on SkillSwap",                      icon: "🧭", xpBonus: 0   },
  { id: "five_sessions",    title: "Active Learner",    description: "Completed 5 skill exchange sessions",              icon: "📚", xpBonus: 50  },
  { id: "star_teacher",     title: "Star Teacher",      description: "Received a 5-star review from a learner",         icon: "⭐", xpBonus: 15  },
  { id: "mentor",           title: "Mentor",            description: "Reached 300 XP — a true skill mentor",            icon: "🏅", xpBonus: 0   },
  { id: "expert",           title: "Expert",            description: "Reached 500 XP — SkillSwap Expert!",              icon: "💎", xpBonus: 0   },
  { id: "community_helper", title: "Community Helper",  description: "Received 10 or more reviews from the community",  icon: "🤝", xpBonus: 30  },
];

function getLevelFromXP(xp = 0) {
  return LEVELS.find((l) => xp >= l.min && xp <= l.max) || LEVELS[0];
}
function getNextLevel(xp = 0) {
  const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
  return LEVELS[idx + 1] || null;
}

/* ── Share a badge ─────────────────────────────────────── */
async function shareBadge(badge, userName, setMsg) {
  const text = `🏅 I just earned the "${badge.title}" badge on SkillSwap!\n${badge.description}\n\n#SkillSwap #Badges #Learning`;
  if (navigator.share) {
    try { await navigator.share({ title: "SkillSwap Badge", text }); return; } catch (_) {}
  }
  try {
    await navigator.clipboard.writeText(text);
    setMsg(badge.id);
    setTimeout(() => setMsg(""), 2000);
  } catch (_) {}
}

const Badges = () => {
  const { darkMode }  = useContext(DarkModeContext);
  const { user }      = useContext(AuthContext);
  const [profile, setProfile]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [copiedId, setCopiedId] = useState(""); // badge id that was just copied

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        setProfile(user);
      } finally {
        setLoading(false);
      }
    };
    fetch();
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
  const dm = darkMode;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dm ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${dm ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>

      {/* ── HERO ── */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-10 py-16">
        <div className="max-w-5xl mx-auto text-white">
          <h1 className="text-4xl font-bold">My Badges & XP</h1>
          <p className="mt-2 text-teal-50 max-w-xl">
            Track your achievements and milestones as you master new skills and help the community grow.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── XP CARD ── */}
        <div className={`rounded-3xl p-8 shadow-md ${dm ? "bg-slate-800" : "bg-white"}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${currentLevel.color} flex flex-col items-center justify-center shadow-lg shrink-0`}>
              <span className="text-white text-3xl font-bold">{currentLevel.level}</span>
              <span className="text-white/80 text-xs font-medium">LVL</span>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-1">
                <h2 className={`text-2xl font-bold ${dm ? "text-white" : "text-slate-900"}`}>{currentLevel.title}</h2>
                <div className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full">
                  <span className="text-yellow-400">⚡</span>
                  <span className="text-yellow-400 font-bold">{xp} XP</span>
                </div>
              </div>
              {nextLevel ? (
                <>
                  <p className={`text-sm mb-3 ${dm ? "text-slate-400" : "text-slate-500"}`}>
                    {xpToNext} XP to reach <strong>{nextLevel.title}</strong>
                  </p>
                  <div className={`h-3 rounded-full overflow-hidden ${dm ? "bg-slate-700" : "bg-slate-100"}`}>
                    <div className={`h-3 rounded-full bg-gradient-to-r ${currentLevel.color} transition-all duration-700`} style={{ width: `${progressPct}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-400">{currentLevel.min} XP</span>
                    <span className="text-xs text-slate-400">{nextLevel.min} XP</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-yellow-400 font-semibold mt-2">🏆 Max level reached — You're an Expert!</p>
              )}
              <div className="flex gap-2 mt-4 flex-wrap">
                {LEVELS.map((l) => (
                  <div key={l.level} className={`px-3 py-1 rounded-full text-xs font-medium border transition ${xp >= l.min ? `bg-gradient-to-r ${l.color} text-white border-transparent` : dm ? "border-slate-600 text-slate-500" : "border-slate-200 text-slate-400"}`}>
                    Lv.{l.level} {l.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── HOW TO EARN XP ── */}
        <div className={`rounded-3xl p-6 ${dm ? "bg-slate-800" : "bg-white"} shadow-md`}>
          <h3 className={`font-semibold text-lg mb-4 ${dm ? "text-white" : "text-slate-900"}`}>⚡ How to Earn XP</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { action: "Complete a session",     xp: "+20 XP", note: "Both users",    icon: "🎓" },
              { action: "Leave a review",          xp: "+10 XP", note: "Per review",   icon: "⭐" },
              { action: "Receive a 5★ review",    xp: "+15 XP", note: "Bonus",         icon: "🌟" },
              { action: "Complete your profile",  xp: "+15 XP", note: "One time",      icon: "👤" },
              { action: "First session ever",     xp: "+25 XP", note: "One time",      icon: "🎯" },
              { action: "Add a skill to teach",   xp: "+10 XP", note: "Per new skill", icon: "✨" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${dm ? "bg-slate-700" : "bg-slate-50"}`}>
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${dm ? "text-white" : "text-slate-800"}`}>{item.action}</p>
                  <p className="text-xs text-slate-400">{item.note}</p>
                </div>
                <span className="text-yellow-400 font-bold text-sm">{item.xp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BADGES GRID ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${dm ? "text-white" : "text-slate-900"}`}>Badges</h2>
            <span className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>
              {earnedCount} / {ALL_BADGES.length} earned
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_BADGES.map((badge) => {
              const earned     = earnedBadgeIds.includes(badge.id);
              const earnedData = profile?.badges?.find((b) => b.id === badge.id);

              return earned ? (
                /* ✅ EARNED CARD */
                <div key={badge.id} className={`rounded-3xl p-6 shadow-md border border-teal-500/20 ${dm ? "bg-slate-800" : "bg-white"}`}>
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center text-4xl shadow-inner">
                      {badge.icon}
                    </div>
                  </div>
                  <span className="block mx-auto mb-3 w-fit px-3 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                    EARNED ✓
                  </span>
                  <h3 className={`text-lg font-bold text-center ${dm ? "text-white" : "text-slate-900"}`}>{badge.title}</h3>
                  <p className={`text-xs text-center mt-1 ${dm ? "text-slate-400" : "text-slate-500"}`}>{badge.description}</p>
                  {badge.xpBonus > 0 && (
                    <p className="text-center text-yellow-400 text-xs font-semibold mt-2">+{badge.xpBonus} XP bonus</p>
                  )}
                  {earnedData?.earnedAt && (
                    <p className="text-center text-slate-400 text-xs mt-1">
                      {new Date(earnedData.earnedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}

                  {/* ── SHARE BUTTON ── */}
                  <button
                    onClick={() => shareBadge(badge, profile?.name, setCopiedId)}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white transition active:scale-95"
                    style={{ background: "linear-gradient(90deg, #14b8a6, #0ea5e9)" }}
                  >
                    🚀 {copiedId === badge.id ? "Copied! 📋" : "Share"}
                  </button>
                </div>
              ) : (
                /* 🔒 LOCKED CARD */
                <div key={badge.id} className={`rounded-3xl p-6 border-2 border-dashed ${dm ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl opacity-30">
                      {badge.icon}
                    </div>
                  </div>
                  <span className="block mx-auto mb-3 w-fit px-3 py-0.5 rounded-full text-xs bg-slate-100 text-slate-500">
                    LOCKED 🔒
                  </span>
                  <h3 className={`text-base font-semibold text-center ${dm ? "text-slate-400" : "text-slate-600"}`}>{badge.title}</h3>
                  <p className={`text-xs text-center mt-1 ${dm ? "text-slate-500" : "text-slate-400"}`}>{badge.description}</p>
                  {badge.xpBonus > 0 && (
                    <p className="text-center text-slate-400 text-xs mt-2">+{badge.xpBonus} XP on unlock</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FOOTER STATS ── */}
        <div className={`rounded-3xl p-6 ${dm ? "bg-slate-800" : "bg-white"} shadow-md`}>
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Badges Earned</p>
              <p className={`text-3xl font-bold ${dm ? "text-white" : "text-slate-900"}`}>
                {earnedCount} <span className="text-slate-400 text-lg">/ {ALL_BADGES.length}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Total XP</p>
              <p className="text-3xl font-bold text-yellow-400">{xp} ⚡</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Current Level</p>
              <p className={`text-3xl font-bold ${dm ? "text-white" : "text-slate-900"}`}>
                Lv.{currentLevel.level} <span className="text-teal-500 text-lg">{currentLevel.title}</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Badges;