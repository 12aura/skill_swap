import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

/* ─── Theme Init (NO BUTTON) ───────────────── */
function useTheme() {
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);
}

/* ─── Pill ───────────────────────── */
function Pill({ children }) {
  return (
    <span className="
      px-3 py-1 text-xs font-medium rounded-full
      bg-base-300/40 text-base-content
      border border-base-300/30
      backdrop-blur-md
    ">
      {children}
    </span>
  );
}

/* ─── Card ───────────────────────── */
function Card({ title, children }) {
  return (
    <div className="
      rounded-2xl p-6 flex flex-col gap-3
      bg-base-100/70 backdrop-blur-xl
      border border-base-300/40
      shadow-lg hover:shadow-2xl
      hover:-translate-y-1
      transition-all duration-300
    ">
      <h3 className="
        text-base-content/60 text-xs font-semibold 
        uppercase tracking-widest
      ">
        {title}
      </h3>
      <div className="text-base-content/80 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/* ─── Loader ─────────────────────── */
function Skeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 font-sans">
      <p className="text-base-content/60 animate-pulse text-lg">
        Generating your summary...
      </p>
    </div>
  );
}

/* ─── Mood ───────────────────────── */
function MoodBadge({ mood }) {
  const config = {
    positive: "Positive",
    neutral: "Neutral",
    challenging: "Challenging",
    mixed: "Mixed",
  };

  return <Pill>{config[mood?.toLowerCase()] || config.neutral}</Pill>;
}

/* ─── Main ───────────────────────── */
export default function SessionSummary() {
  useTheme(); // 👈 applies theme automatically

  const { roomId, sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noTranscript, setNoTranscript] = useState(false);

  const resolvedSessionId =
    location.state?.sessionId || sessionId || roomId;

  useEffect(() => {
    const id = roomId || sessionId;
    if (!id) {
      setError("Missing room ID.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let attempts = 0;
    const MAX = 3;

    const fetchSummary = async () => {
      attempts++;
      try {
        const res = await axios.get(`${BASE}/api/video/summary/${id}`, { headers });
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
          setError("Summary could not be generated.");
          setLoading(false);
        }
      } catch {
        if (attempts < MAX) {
          setTimeout(fetchSummary, 8000);
        } else {
          setError("Failed to load summary.");
          setLoading(false);
        }
      }
    };

    fetchSummary();
  }, [roomId, sessionId]);

  if (loading) return <Skeleton />;

  const handleReviewClick = () => {
    if (resolvedSessionId) {
      navigate(`/review/${resolvedSessionId}`);
    } else {
      navigate("/sessions");
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
  };

  return (
    <div className="
      min-h-screen text-base-content font-sans
      bg-gradient-to-br from-base-200 via-base-300 to-base-200
    ">

      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="
            text-4xl font-extrabold tracking-tight
            bg-gradient-to-r from-primary to-accent
            bg-clip-text text-transparent
          ">
            {summary?.title || "Session Summary"}
          </h1>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {summary?.mood && <MoodBadge mood={summary.mood} />}
          {summary?.durationEstimate && (
            <Pill>{summary.durationEstimate}</Pill>
          )}
          {summary && <Pill>AI Generated</Pill>}
        </div>

        {/* Error */}
        {error && <div className="alert alert-error text-sm">{error}</div>}
        {noTranscript && (
          <div className="alert alert-warning text-sm">
            No transcript recorded for this session.
          </div>
        )}

        {/* Content */}
        {summary && (
          <div className="flex flex-col gap-6">

            {summary.overview && (
              <Card title="Overview">
                <p>{summary.overview}</p>
              </Card>
            )}

            {summary.keyTopics?.length > 0 && (
              <Card title="Key Topics">
                <div className="flex flex-wrap gap-2">
                  {summary.keyTopics.map((t, i) => (
                    <Pill key={i}>{t}</Pill>
                  ))}
                </div>
              </Card>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              {summary.actionItems?.length > 0 && (
                <Card title="Action Items">
                  <ul className="space-y-2">
                    {summary.actionItems.map((a, i) => (
                      <li key={i}>• {a}</li>
                    ))}
                  </ul>
                </Card>
              )}

              {summary.highlights?.length > 0 && (
                <Card title="Highlights">
                  <ul className="space-y-2">
                    {summary.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap pt-4">

          {resolvedSessionId && (
<button
  onClick={handleReviewClick}
  className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-teal-500 to-emerald-500
    hover:from-teal-600 hover:to-emerald-600
    shadow-md hover:shadow-lg
    hover:scale-105 active:scale-95
    transition-all duration-300
  "
>
  Leave Review
</button>
          )}

<button
  onClick={() => navigate("/sessions")}
  className="
    px-5 py-2 rounded-xl font-semibold text-white
    bg-gradient-to-r from-emerald-400 to-teal-500
    hover:from-emerald-500 hover:to-teal-600
    shadow-md hover:shadow-lg
    hover:scale-105 active:scale-95
    transition-all duration-300
  "
>
  Back to Sessions
</button>

          {summary && (
<button
  onClick={handleCopy}
  className="
    p-3 rounded-xl text-white
    bg-gradient-to-r from-emerald-400 to-teal-500
    hover:from-emerald-500 hover:to-teal-600
    shadow-md hover:shadow-lg
    hover:scale-105 active:scale-95
    transition-all duration-300
    flex items-center justify-center
  "
  title="Copy Summary"
>
  ⧉
</button>
          )}
        </div>

        <p className="text-xs text-center text-base-content/50">
          Summary generated by AI
        </p>

      </div>
    </div>
  );
}