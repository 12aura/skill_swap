import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ReviewModal from "../components/ReviewModal";

const BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

function useTheme() {
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);
}

function Pill({ children }) {
  return (
    <span className="px-3 py-1 text-xs font-medium rounded-full bg-base-300/40 text-base-content border border-base-300/30 backdrop-blur-md">
      {children}
    </span>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-3 bg-base-100/70 backdrop-blur-xl border border-base-300/40 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-base-content/60 text-xs font-semibold uppercase tracking-widest">{title}</h3>
      <div className="text-base-content/80 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 font-sans">
      <p className="text-base-content/60 animate-pulse text-lg">Generating your summary...</p>
    </div>
  );
}

function MoodBadge({ mood }) {
  const config = { positive: "Positive", neutral: "Neutral", challenging: "Challenging", mixed: "Mixed" };
  return <Pill>{config[mood?.toLowerCase()] || config.neutral}</Pill>;
}

// ─── Recording Card ───────────────────────────────────────
function RecordingCard({ sessionId }) {
  const [recording, setRecording]               = useState(null);
  const [recordingLoading, setRecordingLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setRecordingLoading(false); return; }

    const fetchRecording = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("[RecordingCard] No auth token found in localStorage.");
          setRecordingLoading(false);
          return;
        }

        console.log("[RecordingCard] Fetching recording for sessionId:", sessionId);

        const res = await axios.get(
          `${BASE}/api/sessions/${sessionId}/recording`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecording(res.data);
      } catch (e) {
        const status = e.response?.status;
        const msg    = e.response?.data?.message || e.message;

        if (status === 403) {
          console.warn("[RecordingCard] 403 Forbidden — token may be invalid/expired, or you don't own this session.", msg);
        } else if (status === 404) {
          console.warn("[RecordingCard] 404 — No recording found for this session.");
        } else {
          console.warn("[RecordingCard] Error fetching recording:", status, msg);
        }
      } finally {
        setRecordingLoading(false);
      }
    };

    fetchRecording();
  }, [sessionId]);

  if (!sessionId) return null;

  return (
    <Card title="Session Recording">
      {recordingLoading ? (
        <div className="flex items-center gap-2 text-base-content/50">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Checking for recording...</span>
        </div>

      ) : recording?.recordingUrl ? (
        <div className="flex flex-col gap-3">
          {/* Video player */}
          <video
            src={recording.recordingUrl}
            controls
            className="w-full rounded-xl border border-base-300/30"
          />

          {/* Metadata row */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-3 text-xs text-base-content/50">
              {recording.duration && (
                <span>Duration: {Math.round(recording.duration / 60)} min</span>
              )}
              {recording.createdAt && (
                <span>Recorded: {new Date(recording.createdAt).toLocaleDateString()}</span>
              )}
            </div>

            {/* Download button — fixed: was missing opening <a tag */}
            <a
              href={recording.recordingUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                         bg-teal-500/15 text-teal-600 border border-teal-500/25
                         hover:bg-teal-500/25 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        </div>

      ) : (
        <div className="flex items-start gap-3 text-sm text-base-content/60">
          <span className="text-lg shrink-0">🎬</span>
          <div>
            <p className="font-medium text-base-content/70">Recording is processing</p>
            <p className="text-xs mt-0.5">
              This usually takes 1–3 minutes after the session ends.
              Refresh the page to check again.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── Main component ───────────────────────────────────────
export default function SessionSummary() {
  useTheme();

  const { roomId, sessionId } = useParams();
  const navigate  = useNavigate();
  const location  = useLocation();

  const [summary,      setSummary]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [noTranscript, setNoTranscript] = useState(false);
  const [reviewing,    setReviewing]    = useState(null);
  const [hasReviewed,  setHasReviewed]  = useState(false);

  const resolvedSessionId =
    location.state?.sessionId || sessionId || roomId;

  // ─── Fetch AI summary ─────────────────────────────────────
  useEffect(() => {
    const id = roomId || sessionId;
    if (!id) { setError("Missing room ID."); setLoading(false); return; }

    const token   = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let attempts  = 0;
    const MAX     = 3;

    const fetchSummary = async () => {
      attempts++;
      try {
        const res  = await axios.get(`${BASE}/api/video/summary/${id}`, { headers });
        const data = res.data;
        if (data.summary)      { setSummary(data.summary); setLoading(false); }
        else if (data.message) { setNoTranscript(true);    setLoading(false); }
        else if (attempts < MAX) setTimeout(fetchSummary, 8000);
        else { setError("Summary could not be generated."); setLoading(false); }
      } catch {
        if (attempts < MAX) setTimeout(fetchSummary, 8000);
        else { setError("Failed to load summary."); setLoading(false); }
      }
    };

    fetchSummary();
  }, [roomId, sessionId]);

  // ─── Check if already reviewed ────────────────────────────
  useEffect(() => {
    if (!resolvedSessionId) return;
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE}/api/reviews/session/${resolvedSessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => { if (res.data.hasReviewed) setHasReviewed(true); })
      .catch(() => {});
  }, [resolvedSessionId]);

  const handleReviewClick = () => {
    setReviewing({
      _id:           resolvedSessionId,
      role:          location.state?.role         || "learner",
      partnerName:   location.state?.partnerName  || "Your partner",
      partnerAvatar: location.state?.partnerAvatar || null,
      skillName:     location.state?.skillName    || summary?.title || "Skill Exchange",
    });
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
  };

  if (loading) return <Skeleton />;

  return (
    <div className="min-h-screen text-base-content font-sans bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {summary?.title || "Session Summary"}
          </h1>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {summary?.mood             && <MoodBadge mood={summary.mood} />}
          {summary?.durationEstimate && <Pill>{summary.durationEstimate}</Pill>}
          {summary                   && <Pill>AI Generated</Pill>}
        </div>

        {/* Alerts */}
        {error        && <div className="alert alert-error text-sm">{error}</div>}
        {noTranscript && <div className="alert alert-warning text-sm">No transcript recorded for this session.</div>}

        {/* Recording card */}
        <RecordingCard sessionId={resolvedSessionId} />

        {/* AI Summary cards */}
        {summary && (
          <div className="flex flex-col gap-6">
            {summary.overview && (
              <Card title="Overview"><p>{summary.overview}</p></Card>
            )}

            {summary.keyTopics?.length > 0 && (
              <Card title="Key Topics">
                <div className="flex flex-wrap gap-2">
                  {summary.keyTopics.map((t, i) => <Pill key={i}>{t}</Pill>)}
                </div>
              </Card>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              {summary.actionItems?.length > 0 && (
                <Card title="Action Items">
                  <ul className="space-y-2">
                    {summary.actionItems.map((a, i) => <li key={i}>• {a}</li>)}
                  </ul>
                </Card>
              )}
              {summary.highlights?.length > 0 && (
                <Card title="Highlights">
                  <ul className="space-y-2">
                    {summary.highlights.map((h, i) => <li key={i}>• {h}</li>)}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap pt-4">
          {resolvedSessionId && (
            hasReviewed ? (
              <div className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-teal-500">
                ✓ Review submitted
              </div>
            ) : (
              <button
                onClick={handleReviewClick}
                className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Leave Review
              </button>
            )
          )}

          <button
            onClick={() => navigate("/sessions")}
            className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Back to Sessions
          </button>

          {summary && (
            <button
              onClick={handleCopy}
              className="p-3 rounded-xl text-white bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
              title="Copy Summary"
            >
              ⧉
            </button>
          )}
        </div>

        <p className="text-xs text-center text-base-content/50">Summary generated by AI</p>
      </div>

      {reviewing && (
        <ReviewModal
          session={reviewing}
          onClose={() => setReviewing(null)}
          onSubmitted={() => { setHasReviewed(true); setReviewing(null); }}
        />
      )}
    </div>
  );
}