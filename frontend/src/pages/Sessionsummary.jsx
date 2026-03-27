import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

// ─── Pill badge ───────────────────────────────────────────
function Pill({ children, color = "teal" }) {
  const map = {
    teal:   "bg-teal-500/15   text-teal-300   border-teal-500/25",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    amber:  "bg-amber-500/15  text-amber-300  border-amber-500/25",
    rose:   "bg-rose-500/15   text-rose-300   border-rose-500/25",
    sky:    "bg-sky-500/15    text-sky-300    border-sky-500/25",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${map[color] || map.teal}`}>
      {children}
    </span>
  );
}

// ─── Section card ─────────────────────────────────────────
function Card({ icon, title, children }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{icon}</span>
        <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────
function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-teal-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 animate-spin" />
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-2xl">✨</span>
        </div>
        <div className="text-center">
          <p className="text-white font-semibold text-lg">Generating your summary</p>
          <p className="text-white/40 text-sm mt-1">Claude is analysing your session transcript…</p>
        </div>
      </div>
      <div className="w-full max-w-2xl space-y-3">
        {[140, 80, 100].map((h, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ height: h }}>
            <div className="w-full h-full bg-white/5 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mood indicator ───────────────────────────────────────
function MoodBadge({ mood }) {
  const config = {
    positive:    { emoji: "😊", color: "teal",   label: "Positive session" },
    neutral:     { emoji: "😐", color: "sky",    label: "Neutral session" },
    challenging: { emoji: "💪", color: "amber",  label: "Challenging session" },
    mixed:       { emoji: "🌤", color: "purple", label: "Mixed session" },
  };
  const c = config[mood?.toLowerCase()] || config.neutral;
  return <Pill color={c.color}>{c.emoji} {c.label}</Pill>;
}

// ─── Main component ───────────────────────────────────────
export default function SessionSummary() {
  const { roomId, sessionId } = useParams();
  const navigate  = useNavigate();
  const location  = useLocation(); // ✅ inside the component — no hook violation

  const [summary,      setSummary]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [noTranscript, setNoTranscript] = useState(false);

  // ── Best available session ID for the Review button ──────────────
  // Priority: location.state (passed by VideoCall.goToSummary)
  //         → sessionId URL param
  //         → roomId URL param (last resort)
  const resolvedSessionId =
    location.state?.sessionId ||
    sessionId                  ||
    roomId;

  useEffect(() => {
    const id = roomId || sessionId;
    if (!id) { setError("Missing room ID."); setLoading(false); return; }

    const token   = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let attempts = 0;
    const MAX    = 3;

    const fetchSummary = async () => {
      attempts++;
      try {
        const res  = await axios.get(`${BASE}/api/video/summary/${id}`, { headers });
        const data = res.data;

        if (data.summary) {
          setSummary(data.summary);
          setLoading(false);
        } else if (data.message) {
          setNoTranscript(true);
          setLoading(false);
        } else if (attempts < MAX) {
          setTimeout(fetchSummary, 8000);
        } else {
          setError("Summary could not be generated. The transcript may still be processing.");
          setLoading(false);
        }
      } catch (err) {
        if (attempts < MAX) {
          setTimeout(fetchSummary, 8000);
        } else {
          setError(err.response?.data?.error || "Failed to load summary.");
          setLoading(false);
        }
      }
    };

    fetchSummary();
  }, [roomId, sessionId]);

  if (loading) return <Skeleton />;

  // ── Review navigation with safe fallback ─────────────────────────
  const handleReviewClick = () => {
    if (resolvedSessionId) {
      navigate(`/review/${resolvedSessionId}`);
    } else {
      navigate("/sessions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/40 via-gray-950 to-gray-950 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">

        {/* ── Header ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-xl">
              ✨
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Session complete</p>
              <h1 className="text-white font-bold text-xl leading-tight">
                {summary?.title || "Session Summary"}
              </h1>
            </div>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-2 items-center mt-1">
            {summary?.mood && <MoodBadge mood={summary.mood} />}
            {summary?.durationEstimate && (
              <Pill color="sky">🕐 {summary.durationEstimate}</Pill>
            )}
            {summary && <Pill color="purple">AI-generated</Pill>}
          </div>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-5 text-red-300 text-sm flex gap-3 items-start">
            <span className="text-lg shrink-0">⚠️</span>
            <div>
              <p className="font-semibold mb-1">Could not generate summary</p>
              <p className="text-red-300/70">{error}</p>
            </div>
          </div>
        )}

        {/* ── No transcript state ── */}
        {noTranscript && !error && (
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-5 text-amber-300 text-sm flex gap-3 items-start">
            <span className="text-lg shrink-0">📝</span>
            <div>
              <p className="font-semibold mb-1">No transcript recorded</p>
              <p className="text-amber-300/70">
                A summary couldn't be generated because transcription wasn't enabled during
                the session. Enable "Record Transcript" in your next call to get AI-powered summaries.
              </p>
            </div>
          </div>
        )}

        {/* ── Summary cards ── */}
        {summary && (
          <div className="flex flex-col gap-4">

            {/* Overview */}
            {summary.overview && (
              <Card icon="📋" title="Overview">
                <p className="text-white/75 text-sm leading-relaxed">{summary.overview}</p>
              </Card>
            )}

            {/* Key Topics */}
            {summary.keyTopics?.length > 0 && (
              <Card icon="🏷️" title="Key Topics">
                <div className="flex flex-wrap gap-2">
                  {summary.keyTopics.map((t, i) => (
                    <Pill key={i} color={["teal", "purple", "sky", "amber"][i % 4]}>{t}</Pill>
                  ))}
                </div>
              </Card>
            )}

            {/* Two-column: Action Items + Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summary.actionItems?.length > 0 && (
                <Card icon="✅" title="Action Items">
                  <ul className="space-y-2">
                    {summary.actionItems.map((a, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/70">
                        <span className="text-teal-400 shrink-0 mt-0.5">→</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {summary.highlights?.length > 0 && (
                <Card icon="⭐" title="Highlights">
                  <ul className="space-y-2">
                    {summary.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/70">
                        <span className="text-amber-400 shrink-0 mt-0.5">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex gap-3 flex-wrap pt-2">

          {/* Leave a Review — only shown when a valid session ID is available */}
          {resolvedSessionId && (
            <button
              onClick={handleReviewClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 hover:text-purple-200 font-semibold text-sm transition hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Leave a Review
            </button>
          )}

          {/* Back to Sessions */}
          <button
            onClick={() => navigate("/sessions")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/25">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
            </svg>
            Back to Sessions
          </button>

          {/* Copy Summary */}
          {summary && (
            <button
              onClick={() => {
                const text = formatSummaryAsText(summary);
                navigator.clipboard.writeText(text).catch(() => {});
                const el = document.querySelector("[data-copy-btn]");
                if (el) {
                  el.textContent = "Copied!";
                  setTimeout(() => (el.textContent = "Copy Summary"), 2000);
                }
              }}
              data-copy-btn
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 text-white/70 hover:text-white font-semibold text-sm transition hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Summary
            </button>
          )}
        </div>

        {/* Footer note */}
        <p className="text-white/20 text-xs text-center pb-4">
          Summary generated by Claude AI · Based on session transcript
        </p>

      </div>
    </div>
  );
}

// ─── Plain-text formatter for clipboard ──────────────────
function formatSummaryAsText(s) {
  const lines = [`📋 ${s.title || "Session Summary"}`, ""];
  if (s.overview)            lines.push(`Overview\n${s.overview}`, "");
  if (s.keyTopics?.length)   lines.push(`Key Topics\n${s.keyTopics.map(t => `• ${t}`).join("\n")}`, "");
  if (s.actionItems?.length) lines.push(`Action Items\n${s.actionItems.map(a => `→ ${a}`).join("\n")}`, "");
  if (s.highlights?.length)  lines.push(`Highlights\n${s.highlights.map(h => `✦ ${h}`).join("\n")}`, "");
  if (s.mood)                lines.push(`Mood: ${s.mood}`);
  if (s.durationEstimate)    lines.push(`Duration: ${s.durationEstimate}`);
  return lines.join("\n");
}