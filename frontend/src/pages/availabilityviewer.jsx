import { useState, useEffect } from "react";
import axios from "axios";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const to12hr = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h < 12 ? "AM" : "PM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
};

// Convert "HH:MM" to number of minutes for grid rendering
const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// Grid: 6 AM to 10 PM
const GRID_START = 6 * 60;  // 360 mins
const GRID_END   = 22 * 60; // 1320 mins
const GRID_RANGE = GRID_END - GRID_START;
const GRID_HEIGHT = 300; // px

export default function AvailabilityViewer({ userId, userName }) {
  const [skillsTeach, setSkillsTeach] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("weekly");
  const [requestModal, setRequestModal] = useState(null);
  const [requestForm, setRequestForm] = useState({ note: "" });
  const [requestSent, setRequestSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`/api/availability/${userId}`);
        const data = res.data ?? [];
        setSkillsTeach(data);
        if (data.length > 0) {
          setSelectedSkillId((data[0].skill._id ?? data[0].skill).toString());
        }
      } catch {
        setSkillsTeach([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [userId]);

  const selectedSkill = skillsTeach.find(
    (sk) => (sk.skill._id ?? sk.skill).toString() === selectedSkillId
  );
  const slots = selectedSkill?.availability ?? [];
  const weeklySlots = slots.filter((s) => s.type === "weekly" || !s.type); // backwards compat
  const specificSlots = slots
    .filter((s) => s.type === "specific")
    .filter((s) => new Date(s.date + "T00:00") >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const sendRequest = async () => {
    setSending(true);
    try {
      await axios.post("/api/session-requests", {
        toUserId: userId,
        skillId: selectedSkillId,
        slot: requestModal,
        note: requestForm.note,
      });
      setRequestSent(true);
      setTimeout(() => {
        setRequestSent(false);
        setRequestModal(null);
        setRequestForm({ note: "" });
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div style={s.loading}>Loading availability…</div>;
  if (skillsTeach.length === 0) return <div style={s.empty}>No availability set yet.</div>;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h3 style={s.title}>📅 {userName}'s Availability</h3>
        <p style={s.subtitle}>Click a slot to request a session</p>
      </div>

      {/* Skill selector */}
      <div style={s.skillBtns}>
        {skillsTeach.map((sk) => {
          const id = (sk.skill._id ?? sk.skill).toString();
          return (
            <button
              key={id}
              style={{ ...s.skillBtn, ...(selectedSkillId === id ? s.skillBtnActive : {}) }}
              onClick={() => setSelectedSkillId(id)}
            >
              {sk.skill.name ?? "Skill"}
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        <button style={{ ...s.tab, ...(activeTab === "weekly" ? s.tabActive : {}) }} onClick={() => setActiveTab("weekly")}>
          Weekly
        </button>
        <button style={{ ...s.tab, ...(activeTab === "specific" ? s.tabActive : {}) }} onClick={() => setActiveTab("specific")}>
          Specific Dates
          {specificSlots.length > 0 && <span style={s.badge}>{specificSlots.length}</span>}
        </button>
      </div>

      {/* ── Weekly calendar grid ── */}
      {activeTab === "weekly" && (
        weeklySlots.length === 0 ? (
          <p style={s.empty}>No weekly availability set for this skill.</p>
        ) : (
          <div style={s.calendarWrap}>
            {/* Time axis */}
            <div style={s.timeAxis}>
              {[6, 8, 10, 12, 14, 16, 18, 20, 22].map((h) => {
                const top = ((h * 60 - GRID_START) / GRID_RANGE) * GRID_HEIGHT;
                const label = h === 12 ? "12 PM" : h < 12 ? `${h} AM` : `${h - 12} PM`;
                return (
                  <div key={h} style={{ ...s.timeLabel, top }}>
                    {label}
                  </div>
                );
              })}
            </div>
            {/* Day columns */}
            <div style={s.calendarGrid}>
              {DAYS.map((day) => {
                const daySlots = weeklySlots.filter((sl) => sl.day === day);
                return (
                  <div key={day} style={s.dayCol}>
                    <div style={s.dayHeader}>{day}</div>
                    <div style={{ ...s.dayBody, height: GRID_HEIGHT }}>
                      {/* Hour lines */}
                      {[6, 8, 10, 12, 14, 16, 18, 20, 22].map((h) => (
                        <div
                          key={h}
                          style={{
                            ...s.gridLine,
                            top: ((h * 60 - GRID_START) / GRID_RANGE) * GRID_HEIGHT,
                          }}
                        />
                      ))}
                      {/* Availability blocks */}
                      {daySlots.map((sl, i) => {
                        const startMin = Math.max(timeToMinutes(sl.startTime), GRID_START);
                        const endMin   = Math.min(timeToMinutes(sl.endTime),   GRID_END);
                        const top    = ((startMin - GRID_START) / GRID_RANGE) * GRID_HEIGHT;
                        const height = ((endMin - startMin) / GRID_RANGE) * GRID_HEIGHT;
                        if (height <= 0) return null;
                        return (
                          <div
                            key={i}
                            style={{ ...s.slotBlock, top, height }}
                            title={`${to12hr(sl.startTime)} – ${to12hr(sl.endTime)}`}
                            onClick={() => setRequestModal({ type: "weekly", day, ...sl })}
                          >
                            <span style={s.slotBlockText}>
                              {to12hr(sl.startTime)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ── Specific dates list ── */}
      {activeTab === "specific" && (
        specificSlots.length === 0 ? (
          <p style={s.empty}>No upcoming specific dates.</p>
        ) : (
          <div style={s.slotList}>
            {specificSlots.map((sl, i) => (
              <div key={i} style={s.slotCard}>
                <div style={s.slotLeft}>
                  <span style={s.slotDate}>
                    {new Date(sl.date + "T00:00").toLocaleDateString("en-IN", {
                      weekday: "short", day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                  <span style={s.slotTime}>
                    {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
                  </span>
                </div>
                <button style={s.requestBtn} onClick={() => setRequestModal({ type: "specific", ...sl })}>
                  Request Session
                </button>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Request modal ── */}
      {requestModal && (
        <div style={s.overlay} onClick={() => setRequestModal(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            {requestSent ? (
              <div style={s.successBox}>
                <div style={s.successIcon}>✓</div>
                <p style={s.successText}>Request sent to {userName}!</p>
              </div>
            ) : (
              <>
                <h4 style={s.modalTitle}>Request a Session</h4>
                <div style={s.modalSlotInfo}>
                  {requestModal.type === "weekly"
                    ? `📅 Every ${requestModal.day} · ${to12hr(requestModal.startTime)} – ${to12hr(requestModal.endTime)}`
                    : `📌 ${new Date(requestModal.date + "T00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} · ${to12hr(requestModal.startTime)} – ${to12hr(requestModal.endTime)}`}
                </div>
                <div style={s.modalSkill}>
                  Skill: <strong>{selectedSkill?.skill?.name ?? "—"}</strong>
                </div>
                <label style={s.mlabel}>Note (optional)</label>
                <textarea
                  style={s.textarea}
                  placeholder="What would you like to cover in this session?"
                  value={requestForm.note}
                  onChange={(e) => setRequestForm({ note: e.target.value })}
                />
                <div style={s.modalActions}>
                  <button style={s.cancelBtn} onClick={() => setRequestModal(null)}>Cancel</button>
                  <button style={s.confirmBtn} onClick={sendRequest} disabled={sending}>
                    {sending ? "Sending…" : "Send Request"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  container: { background: "#0f172a", color: "#e2e8f0", borderRadius: 16, padding: "24px 28px", fontFamily: "'DM Sans', sans-serif", maxWidth: 820 },
  loading: { color: "#64748b", padding: 24, textAlign: "center" },
  header: { marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 700, color: "#f8fafc", margin: 0 },
  subtitle: { fontSize: 12, color: "#64748b", marginTop: 4 },
  skillBtns: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 },
  skillBtn: { padding: "6px 16px", borderRadius: 20, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
  skillBtnActive: { background: "#1e3a5f", color: "#93c5fd", borderColor: "#3b82f6" },
  tabs: { display: "flex", gap: 8, marginBottom: 20 },
  tab: { padding: "7px 18px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 },
  tabActive: { background: "#1e3a5f", color: "#93c5fd", borderColor: "#3b82f6" },
  badge: { background: "#2563eb", color: "#fff", borderRadius: 20, padding: "1px 7px", fontSize: 11, fontWeight: 700 },
  empty: { color: "#475569", fontSize: 13, padding: "20px 0" },
  // Calendar
  calendarWrap: { display: "flex", gap: 0 },
  timeAxis: { position: "relative", width: 44, flexShrink: 0, marginTop: 32 },
  timeLabel: { position: "absolute", right: 6, fontSize: 10, color: "#475569", transform: "translateY(-50%)", whiteSpace: "nowrap" },
  calendarGrid: { display: "flex", flex: 1, gap: 2, overflowX: "auto" },
  dayCol: { display: "flex", flexDirection: "column", flex: 1, minWidth: 52 },
  dayHeader: { height: 32, fontSize: 12, fontWeight: 600, color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" },
  dayBody: { position: "relative", background: "#1e293b", borderRadius: 6, border: "1px solid #1e293b" },
  gridLine: { position: "absolute", left: 0, right: 0, height: 1, background: "#334155", opacity: 0.5 },
  slotBlock: {
    position: "absolute", left: 2, right: 2,
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    borderRadius: 5, cursor: "pointer", overflow: "hidden",
    display: "flex", alignItems: "flex-start", padding: "3px 4px",
    transition: "filter 0.15s",
    minHeight: 12,
  },
  slotBlockText: { fontSize: 9, color: "#fff", fontWeight: 600, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden" },
  // Specific slots
  slotList: { display: "flex", flexDirection: "column", gap: 10 },
  slotCard: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#1e293b", borderRadius: 10, border: "1px solid #334155" },
  slotLeft: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" },
  slotDate: { fontWeight: 600, fontSize: 13, color: "#f1f5f9" },
  slotTime: { fontSize: 13, color: "#94a3b8" },
  requestBtn: { padding: "7px 16px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" },
  // Modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#1e293b", borderRadius: 16, padding: "28px 32px", width: "90%", maxWidth: 420, border: "1px solid #334155" },
  modalTitle: { fontSize: 17, fontWeight: 700, color: "#f8fafc", margin: "0 0 12px" },
  modalSlotInfo: { fontSize: 13, color: "#93c5fd", background: "#0f172a", borderRadius: 8, padding: "8px 12px", marginBottom: 10 },
  modalSkill: { fontSize: 13, color: "#94a3b8", marginBottom: 14 },
  mlabel: { fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 },
  textarea: { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0", fontSize: 13, height: 80, resize: "vertical", boxSizing: "border-box", marginBottom: 16 },
  modalActions: { display: "flex", gap: 10, justifyContent: "flex-end" },
  cancelBtn: { padding: "8px 18px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
  confirmBtn: { padding: "8px 20px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  successBox: { textAlign: "center", padding: "20px 0" },
  successIcon: { fontSize: 40, color: "#4ade80" },
  successText: { fontSize: 15, color: "#f1f5f9", marginTop: 8 },
};
