// // // import { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // // const TIME_OPTIONS = [];
// // // for (let h = 0; h < 24; h++) {
// // //   for (let m of [0, 30]) {
// // //     const hh = String(h).padStart(2, "0");
// // //     const mm = String(m).padStart(2, "0");
// // //     TIME_OPTIONS.push(`${hh}:${mm}`);
// // //   }
// // // }

// // // const to12hr = (t) => {
// // //   if (!t) return "";
// // //   const [h, m] = t.split(":").map(Number);
// // //   const ampm = h < 12 ? "AM" : "PM";
// // //   const hr = h % 12 === 0 ? 12 : h % 12;
// // //   return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
// // // };

// // // export default function AvailabilityEditor() {
// // //   const [skills, setSkills] = useState([]);
// // //   const [selectedSkillId, setSelectedSkillId] = useState("");
// // //   const [slots, setSlots] = useState([]);
// // //   const [activeTab, setActiveTab] = useState("weekly");
// // //   const [saving, setSaving] = useState(false);
// // //   const [saved, setSaved] = useState(false);
// // //   const [loading, setLoading] = useState(true);
// // //   const [newSlot, setNewSlot] = useState({
// // //     type: "weekly",
// // //     day: "Mon",
// // //     date: "",
// // //     startTime: "09:00",
// // //     endTime: "11:00",
// // //   });

// // //   useEffect(() => {
// // //     const fetchSkills = async () => {
// // //       try {
// // //         // Adjust to your actual "get my profile" endpoint
// // //         const res = await axios.get("/api/users/me");
// // //         const skillsTeach = res.data.skillsTeach ?? [];
// // //         setSkills(skillsTeach);
// // //         if (skillsTeach.length > 0) {
// // //           const firstId = (skillsTeach[0].skill._id ?? skillsTeach[0].skill).toString();
// // //           setSelectedSkillId(firstId);
// // //           setSlots(skillsTeach[0].availability ?? []);
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchSkills();
// // //   }, []);

// // //   const handleSkillChange = (skillId) => {
// // //     setSelectedSkillId(skillId);
// // //     const found = skills.find(
// // //       (sk) => (sk.skill._id ?? sk.skill).toString() === skillId
// // //     );
// // //     setSlots(found?.availability ?? []);
// // //   };

// // //   const addSlot = () => {
// // //     if (newSlot.type === "weekly" && !newSlot.day) return;
// // //     if (newSlot.type === "specific" && !newSlot.date) return;
// // //     if (newSlot.startTime >= newSlot.endTime) return;
// // //     const isDuplicate = slots.some(
// // //       (s) =>
// // //         s.type === newSlot.type &&
// // //         s.day === newSlot.day &&
// // //         s.date === newSlot.date &&
// // //         s.startTime === newSlot.startTime
// // //     );
// // //     if (isDuplicate) return;
// // //     setSlots((prev) => [...prev, { ...newSlot }]);
// // //   };

// // //   const removeSlot = (index) => setSlots((prev) => prev.filter((_, i) => i !== index));

// // //   const handleSave = async () => {
// // //     if (!selectedSkillId) return;
// // //     setSaving(true);
// // //     try {
// // //       await axios.put("/api/availability", {
// // //         skillId: selectedSkillId,
// // //         availability: slots,
// // //       });
// // //       setSaved(true);
// // //       setTimeout(() => setSaved(false), 2500);
// // //     } catch (err) {
// // //       console.error(err);
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const weeklySlots = slots.filter((s) => s.type === "weekly");
// // //   const specificSlots = slots.filter((s) => s.type === "specific");

// // //   if (loading) return <div style={s.loading}>Loading your skills…</div>;

// // //   return (
// // //     <div style={s.container}>
// // //       <div style={s.header}>
// // //         <h2 style={s.title}>Set My Availability</h2>
// // //         <p style={s.subtitle}>Tell others when you're free to teach each skill</p>
// // //       </div>

// // //       {skills.length === 0 ? (
// // //         <p style={s.empty}>You haven't added any skills to teach yet.</p>
// // //       ) : (
// // //         <>
// // //           {/* Skill selector */}
// // //           <div style={s.skillRow}>
// // //             <label style={s.label}>Skill</label>
// // //             <div style={s.skillBtns}>
// // //               {skills.map((sk) => {
// // //                 const id = (sk.skill._id ?? sk.skill).toString();
// // //                 return (
// // //                   <button
// // //                     key={id}
// // //                     style={{ ...s.skillBtn, ...(selectedSkillId === id ? s.skillBtnActive : {}) }}
// // //                     onClick={() => handleSkillChange(id)}
// // //                   >
// // //                     {sk.skill.name ?? "Skill"}
// // //                   </button>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>

// // //           {/* Tabs */}
// // //           <div style={s.tabs}>
// // //             {["weekly", "specific"].map((tab) => (
// // //               <button
// // //                 key={tab}
// // //                 style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}
// // //                 onClick={() => { setActiveTab(tab); setNewSlot((p) => ({ ...p, type: tab })); }}
// // //               >
// // //                 {tab === "weekly" ? "📅 Weekly" : "📌 Specific Dates"}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Add slot form */}
// // //           <div style={s.formBox}>
// // //             <div style={s.formRow}>
// // //               {activeTab === "weekly" ? (
// // //                 <select value={newSlot.day} onChange={(e) => setNewSlot((p) => ({ ...p, day: e.target.value }))} style={s.select}>
// // //                   {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
// // //                 </select>
// // //               ) : (
// // //                 <input
// // //                   type="date"
// // //                   value={newSlot.date}
// // //                   min={new Date().toISOString().split("T")[0]}
// // //                   onChange={(e) => setNewSlot((p) => ({ ...p, date: e.target.value }))}
// // //                   style={s.input}
// // //                 />
// // //               )}
// // //               <select value={newSlot.startTime} onChange={(e) => setNewSlot((p) => ({ ...p, startTime: e.target.value }))} style={s.select}>
// // //                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{to12hr(t)}</option>)}
// // //               </select>
// // //               <span style={s.toLabel}>to</span>
// // //               <select value={newSlot.endTime} onChange={(e) => setNewSlot((p) => ({ ...p, endTime: e.target.value }))} style={s.select}>
// // //                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{to12hr(t)}</option>)}
// // //               </select>
// // //               <button onClick={addSlot} style={s.addBtn}>+ Add</button>
// // //             </div>
// // //             {newSlot.startTime >= newSlot.endTime && (
// // //               <p style={s.error}>End time must be after start time.</p>
// // //             )}
// // //           </div>

// // //           {/* Slots display */}
// // //           <div style={s.slotList}>
// // //             {activeTab === "weekly" && (
// // //               weeklySlots.length === 0 ? (
// // //                 <p style={s.empty}>No weekly slots added yet.</p>
// // //               ) : (
// // //                 DAYS.map((day) => {
// // //                   const daySlots = weeklySlots.filter((sl) => sl.day === day);
// // //                   if (daySlots.length === 0) return null;
// // //                   return (
// // //                     <div key={day} style={s.dayGroup}>
// // //                       <span style={s.dayTag}>{day}</span>
// // //                       <div style={s.daySlots}>
// // //                         {daySlots.map((sl) => {
// // //                           const globalIdx = slots.indexOf(sl);
// // //                           return (
// // //                             <div key={globalIdx} style={s.slotPill}>
// // //                               {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
// // //                               <button onClick={() => removeSlot(globalIdx)} style={s.removeBtn}>✕</button>
// // //                             </div>
// // //                           );
// // //                         })}
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })
// // //               )
// // //             )}
// // //             {activeTab === "specific" && (
// // //               specificSlots.length === 0 ? (
// // //                 <p style={s.empty}>No specific dates added yet.</p>
// // //               ) : (
// // //                 specificSlots.map((sl) => {
// // //                   const globalIdx = slots.indexOf(sl);
// // //                   return (
// // //                     <div key={globalIdx} style={s.slotCard}>
// // //                       <span style={s.slotDate}>
// // //                         {new Date(sl.date + "T00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
// // //                       </span>
// // //                       <span style={s.slotTime}>{to12hr(sl.startTime)} – {to12hr(sl.endTime)}</span>
// // //                       <button onClick={() => removeSlot(globalIdx)} style={s.removeBtn}>✕</button>
// // //                     </div>
// // //                   );
// // //                 })
// // //               )
// // //             )}
// // //           </div>

// // //           <div style={s.footer}>
// // //             <button
// // //               onClick={handleSave}
// // //               style={{ ...s.saveBtn, background: saved ? "#16a34a" : "#2563eb" }}
// // //               disabled={saving}
// // //             >
// // //               {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Availability"}
// // //             </button>
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // const s = {
// // //   container: { background: "#0f172a", color: "#e2e8f0", borderRadius: 16, padding: "28px 32px", fontFamily: "'DM Sans', sans-serif", maxWidth: 680, margin: "0 auto" },
// // //   loading: { color: "#64748b", padding: 24, textAlign: "center" },
// // //   header: { marginBottom: 24 },
// // //   title: { fontSize: 20, fontWeight: 700, color: "#f8fafc", margin: 0 },
// // //   subtitle: { fontSize: 13, color: "#64748b", marginTop: 4 },
// // //   label: { fontSize: 12, color: "#64748b", marginBottom: 6, display: "block" },
// // //   skillRow: { marginBottom: 20 },
// // //   skillBtns: { display: "flex", gap: 8, flexWrap: "wrap" },
// // //   skillBtn: { padding: "6px 16px", borderRadius: 20, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
// // //   skillBtnActive: { background: "#1e3a5f", color: "#93c5fd", borderColor: "#3b82f6" },
// // //   tabs: { display: "flex", gap: 8, marginBottom: 20 },
// // //   tab: { padding: "7px 18px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
// // //   tabActive: { background: "#1e3a5f", color: "#93c5fd", borderColor: "#3b82f6" },
// // //   formBox: { background: "#1e293b", borderRadius: 12, padding: "16px", marginBottom: 20, border: "1px solid #334155" },
// // //   formRow: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
// // //   select: { padding: "8px 10px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0", fontSize: 13 },
// // //   input: { padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0", fontSize: 13 },
// // //   toLabel: { color: "#475569", fontSize: 13 },
// // //   addBtn: { padding: "8px 18px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" },
// // //   error: { color: "#f87171", fontSize: 12, marginTop: 6 },
// // //   slotList: { minHeight: 60 },
// // //   dayGroup: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 },
// // //   dayTag: { minWidth: 36, fontSize: 12, fontWeight: 700, color: "#93c5fd", paddingTop: 6 },
// // //   daySlots: { display: "flex", gap: 8, flexWrap: "wrap" },
// // //   slotPill: { display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: "#1e293b", border: "1px solid #334155", borderRadius: 20, fontSize: 13, color: "#e2e8f0" },
// // //   slotCard: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, marginBottom: 8 },
// // //   slotDate: { fontWeight: 600, fontSize: 13, color: "#f1f5f9", minWidth: 90 },
// // //   slotTime: { fontSize: 13, color: "#94a3b8" },
// // //   removeBtn: { marginLeft: "auto", background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 13, padding: 2 },
// // //   empty: { color: "#475569", fontSize: 13, padding: "16px 0" },
// // //   footer: { marginTop: 24, display: "flex", justifyContent: "flex-end" },
// // //   saveBtn: { padding: "10px 28px", borderRadius: 10, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background 0.2s" },
// // // };
// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // const TIME_OPTIONS = [];
// // for (let h = 0; h < 24; h++) {
// //   for (let m of [0, 30]) {
// //     const hh = String(h).padStart(2, "0");
// //     const mm = String(m).padStart(2, "0");
// //     TIME_OPTIONS.push(`${hh}:${mm}`);
// //   }
// // }

// // const to12hr = (t) => {
// //   if (!t) return "";
// //   const [h, m] = t.split(":").map(Number);
// //   const ampm = h < 12 ? "AM" : "PM";
// //   const hr = h % 12 === 0 ? 12 : h % 12;
// //   return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
// // };

// // export default function AvailabilityEditor() {
// //   const [skills, setSkills] = useState([]);
// //   const [selectedSkillId, setSelectedSkillId] = useState("");
// //   const [slots, setSlots] = useState([]);
// //   const [activeTab, setActiveTab] = useState("weekly");
// //   const [saving, setSaving] = useState(false);
// //   const [saved, setSaved] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [newSlot, setNewSlot] = useState({
// //     type: "weekly",
// //     day: "Mon",
// //     date: "",
// //     startTime: "09:00",
// //     endTime: "11:00",
// //   });

// //   useEffect(() => {
// //     const fetchSkills = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get("/api/user/me", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const skillsTeach = res.data.skillsTeach ?? [];
// //         setSkills(skillsTeach);
// //         if (skillsTeach.length > 0) {
// //           const firstId = (
// //             skillsTeach[0].skill._id ?? skillsTeach[0].skill
// //           ).toString();
// //           setSelectedSkillId(firstId);
// //           setSlots(skillsTeach[0].availability ?? []);
// //         }
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSkills();
// //   }, []);

// //   const handleSkillChange = (skillId) => {
// //     setSelectedSkillId(skillId);
// //     const found = skills.find(
// //       (sk) => (sk.skill._id ?? sk.skill).toString() === skillId
// //     );
// //     setSlots(found?.availability ?? []);
// //   };

// //   const addSlot = () => {
// //     if (newSlot.type === "weekly" && !newSlot.day) return;
// //     if (newSlot.type === "specific" && !newSlot.date) return;
// //     if (newSlot.startTime >= newSlot.endTime) return;
// //     const isDuplicate = slots.some(
// //       (s) =>
// //         s.type === newSlot.type &&
// //         s.day === newSlot.day &&
// //         s.date === newSlot.date &&
// //         s.startTime === newSlot.startTime
// //     );
// //     if (isDuplicate) return;
// //     setSlots((prev) => [...prev, { ...newSlot }]);
// //   };

// //   const removeSlot = (index) =>
// //     setSlots((prev) => prev.filter((_, i) => i !== index));

// //   const handleSave = async () => {
// //     if (!selectedSkillId) return;
// //     setSaving(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       await axios.put(
// //         "/api/availability",
// //         { skillId: selectedSkillId, availability: slots },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setSaved(true);
// //       setTimeout(() => setSaved(false), 2500);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const weeklySlots = slots.filter((s) => s.type === "weekly");
// //   const specificSlots = slots.filter((s) => s.type === "specific");

// //   if (loading)
// //     return <div style={s.loading}>Loading your skills…</div>;

// //   return (
// //     <div style={s.container}>
// //       <div style={s.header}>
// //         <h2 style={s.title}>Set My Availability</h2>
// //         <p style={s.subtitle}>
// //           Tell others when you're free to teach each skill
// //         </p>
// //       </div>

// //       {skills.length === 0 ? (
// //         <p style={s.empty}>You haven't added any skills to teach yet.</p>
// //       ) : (
// //         <>
// //           {/* Skill selector */}
// //           <div style={s.skillRow}>
// //             <label style={s.label}>Skill</label>
// //             <div style={s.skillBtns}>
// //               {skills.map((sk) => {
// //                 const id = (sk.skill._id ?? sk.skill).toString();
// //                 return (
// //                   <button
// //                     key={id}
// //                     style={{
// //                       ...s.skillBtn,
// //                       ...(selectedSkillId === id ? s.skillBtnActive : {}),
// //                     }}
// //                     onClick={() => handleSkillChange(id)}
// //                   >
// //                     {sk.skill.name ?? "Skill"}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Tabs */}
// //           <div style={s.tabs}>
// //             {["weekly", "specific"].map((tab) => (
// //               <button
// //                 key={tab}
// //                 style={{
// //                   ...s.tab,
// //                   ...(activeTab === tab ? s.tabActive : {}),
// //                 }}
// //                 onClick={() => {
// //                   setActiveTab(tab);
// //                   setNewSlot((p) => ({ ...p, type: tab }));
// //                 }}
// //               >
// //                 {tab === "weekly" ? "📅 Weekly" : "📌 Specific Dates"}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Add slot form */}
// //           <div style={s.formBox}>
// //             <div style={s.formRow}>
// //               {activeTab === "weekly" ? (
// //                 <select
// //                   value={newSlot.day}
// //                   onChange={(e) =>
// //                     setNewSlot((p) => ({ ...p, day: e.target.value }))
// //                   }
// //                   style={s.select}
// //                 >
// //                   {DAYS.map((d) => (
// //                     <option key={d} value={d}>
// //                       {d}
// //                     </option>
// //                   ))}
// //                 </select>
// //               ) : (
// //                 <input
// //                   type="date"
// //                   value={newSlot.date}
// //                   min={new Date().toISOString().split("T")[0]}
// //                   onChange={(e) =>
// //                     setNewSlot((p) => ({ ...p, date: e.target.value }))
// //                   }
// //                   style={s.input}
// //                 />
// //               )}
// //               <select
// //                 value={newSlot.startTime}
// //                 onChange={(e) =>
// //                   setNewSlot((p) => ({ ...p, startTime: e.target.value }))
// //                 }
// //                 style={s.select}
// //               >
// //                 {TIME_OPTIONS.map((t) => (
// //                   <option key={t} value={t}>
// //                     {to12hr(t)}
// //                   </option>
// //                 ))}
// //               </select>
// //               <span style={s.toLabel}>to</span>
// //               <select
// //                 value={newSlot.endTime}
// //                 onChange={(e) =>
// //                   setNewSlot((p) => ({ ...p, endTime: e.target.value }))
// //                 }
// //                 style={s.select}
// //               >
// //                 {TIME_OPTIONS.map((t) => (
// //                   <option key={t} value={t}>
// //                     {to12hr(t)}
// //                   </option>
// //                 ))}
// //               </select>
// //               <button onClick={addSlot} style={s.addBtn}>
// //                 + Add
// //               </button>
// //             </div>
// //             {newSlot.startTime >= newSlot.endTime && (
// //               <p style={s.error}>End time must be after start time.</p>
// //             )}
// //           </div>

// //           {/* Slots display */}
// //           <div style={s.slotList}>
// //             {activeTab === "weekly" &&
// //               (weeklySlots.length === 0 ? (
// //                 <p style={s.empty}>No weekly slots added yet.</p>
// //               ) : (
// //                 DAYS.map((day) => {
// //                   const daySlots = weeklySlots.filter(
// //                     (sl) => sl.day === day
// //                   );
// //                   if (daySlots.length === 0) return null;
// //                   return (
// //                     <div key={day} style={s.dayGroup}>
// //                       <span style={s.dayTag}>{day}</span>
// //                       <div style={s.daySlots}>
// //                         {daySlots.map((sl) => {
// //                           const globalIdx = slots.indexOf(sl);
// //                           return (
// //                             <div key={globalIdx} style={s.slotPill}>
// //                               {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
// //                               <button
// //                                 onClick={() => removeSlot(globalIdx)}
// //                                 style={s.removeBtn}
// //                               >
// //                                 ✕
// //                               </button>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   );
// //                 })
// //               ))}

// //             {activeTab === "specific" &&
// //               (specificSlots.length === 0 ? (
// //                 <p style={s.empty}>No specific dates added yet.</p>
// //               ) : (
// //                 specificSlots.map((sl) => {
// //                   const globalIdx = slots.indexOf(sl);
// //                   return (
// //                     <div key={globalIdx} style={s.slotCard}>
// //                       <span style={s.slotDate}>
// //                         {new Date(
// //                           sl.date + "T00:00"
// //                         ).toLocaleDateString("en-IN", {
// //                           weekday: "short",
// //                           day: "numeric",
// //                           month: "short",
// //                         })}
// //                       </span>
// //                       <span style={s.slotTime}>
// //                         {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
// //                       </span>
// //                       <button
// //                         onClick={() => removeSlot(globalIdx)}
// //                         style={s.removeBtn}
// //                       >
// //                         ✕
// //                       </button>
// //                     </div>
// //                   );
// //                 })
// //               ))}
// //           </div>

// //           <div style={s.footer}>
// //             <button
// //               onClick={handleSave}
// //               style={{
// //                 ...s.saveBtn,
// //                 background: saved ? "#16a34a" : "#2563eb",
// //               }}
// //               disabled={saving}
// //             >
// //               {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Availability"}
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // const s = {
// //   container: {
// //     background: "#0f172a",
// //     color: "#e2e8f0",
// //     borderRadius: 16,
// //     padding: "28px 32px",
// //     fontFamily: "'DM Sans', sans-serif",
// //     maxWidth: 680,
// //     margin: "0 auto",
// //   },
// //   loading: { color: "#64748b", padding: 24, textAlign: "center" },
// //   header: { marginBottom: 24 },
// //   title: { fontSize: 20, fontWeight: 700, color: "#f8fafc", margin: 0 },
// //   subtitle: { fontSize: 13, color: "#64748b", marginTop: 4 },
// //   label: { fontSize: 12, color: "#64748b", marginBottom: 6, display: "block" },
// //   skillRow: { marginBottom: 20 },
// //   skillBtns: { display: "flex", gap: 8, flexWrap: "wrap" },
// //   skillBtn: {
// //     padding: "6px 16px",
// //     borderRadius: 20,
// //     border: "1px solid #334155",
// //     background: "transparent",
// //     color: "#94a3b8",
// //     cursor: "pointer",
// //     fontSize: 13,
// //   },
// //   skillBtnActive: {
// //     background: "#1e3a5f",
// //     color: "#93c5fd",
// //     borderColor: "#3b82f6",
// //   },
// //   tabs: { display: "flex", gap: 8, marginBottom: 20 },
// //   tab: {
// //     padding: "7px 18px",
// //     borderRadius: 8,
// //     border: "1px solid #334155",
// //     background: "transparent",
// //     color: "#94a3b8",
// //     cursor: "pointer",
// //     fontSize: 13,
// //   },
// //   tabActive: {
// //     background: "#1e3a5f",
// //     color: "#93c5fd",
// //     borderColor: "#3b82f6",
// //   },
// //   formBox: {
// //     background: "#1e293b",
// //     borderRadius: 12,
// //     padding: "16px",
// //     marginBottom: 20,
// //     border: "1px solid #334155",
// //   },
// //   formRow: {
// //     display: "flex",
// //     gap: 8,
// //     flexWrap: "wrap",
// //     alignItems: "center",
// //   },
// //   select: {
// //     padding: "8px 10px",
// //     borderRadius: 8,
// //     border: "1px solid #334155",
// //     background: "#0f172a",
// //     color: "#e2e8f0",
// //     fontSize: 13,
// //   },
// //   input: {
// //     padding: "8px 12px",
// //     borderRadius: 8,
// //     border: "1px solid #334155",
// //     background: "#0f172a",
// //     color: "#e2e8f0",
// //     fontSize: 13,
// //   },
// //   toLabel: { color: "#475569", fontSize: 13 },
// //   addBtn: {
// //     padding: "8px 18px",
// //     borderRadius: 8,
// //     border: "none",
// //     background: "#2563eb",
// //     color: "#fff",
// //     fontWeight: 600,
// //     fontSize: 13,
// //     cursor: "pointer",
// //   },
// //   error: { color: "#f87171", fontSize: 12, marginTop: 6 },
// //   slotList: { minHeight: 60 },
// //   dayGroup: {
// //     display: "flex",
// //     alignItems: "flex-start",
// //     gap: 12,
// //     marginBottom: 12,
// //   },
// //   dayTag: {
// //     minWidth: 36,
// //     fontSize: 12,
// //     fontWeight: 700,
// //     color: "#93c5fd",
// //     paddingTop: 6,
// //   },
// //   daySlots: { display: "flex", gap: 8, flexWrap: "wrap" },
// //   slotPill: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 8,
// //     padding: "5px 12px",
// //     background: "#1e293b",
// //     border: "1px solid #334155",
// //     borderRadius: 20,
// //     fontSize: 13,
// //     color: "#e2e8f0",
// //   },
// //   slotCard: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 12,
// //     padding: "10px 14px",
// //     background: "#1e293b",
// //     border: "1px solid #334155",
// //     borderRadius: 10,
// //     marginBottom: 8,
// //   },
// //   slotDate: {
// //     fontWeight: 600,
// //     fontSize: 13,
// //     color: "#f1f5f9",
// //     minWidth: 90,
// //   },
// //   slotTime: { fontSize: 13, color: "#94a3b8" },
// //   removeBtn: {
// //     marginLeft: "auto",
// //     background: "transparent",
// //     border: "none",
// //     color: "#ef4444",
// //     cursor: "pointer",
// //     fontSize: 13,
// //     padding: 2,
// //   },
// //   empty: { color: "#475569", fontSize: 13, padding: "16px 0" },
// //   footer: { marginTop: 24, display: "flex", justifyContent: "flex-end" },
// //   saveBtn: {
// //     padding: "10px 28px",
// //     borderRadius: 10,
// //     border: "none",
// //     color: "#fff",
// //     fontWeight: 700,
// //     fontSize: 14,
// //     cursor: "pointer",
// //     transition: "background 0.2s",
// //   },
// // };
// import { useState, useEffect } from "react";
// import axios from "axios";

// const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const TIME_OPTIONS = [];
// for (let h = 0; h < 24; h++) {
//   for (let m of [0, 30]) {
//     const hh = String(h).padStart(2, "0");
//     const mm = String(m).padStart(2, "0");
//     TIME_OPTIONS.push(`${hh}:${mm}`);
//   }
// }

// const to12hr = (t) => {
//   if (!t) return "";
//   const [h, m] = t.split(":").map(Number);
//   const ampm = h < 12 ? "AM" : "PM";
//   const hr = h % 12 === 0 ? 12 : h % 12;
//   return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
// };

// export default function AvailabilityEditor() {
//   const [skills, setSkills] = useState([]);
//   const [selectedSkillId, setSelectedSkillId] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [activeTab, setActiveTab] = useState("weekly");
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [newSlot, setNewSlot] = useState({
//     type: "weekly",
//     day: "Mon",
//     date: "",
//     startTime: "09:00",
//     endTime: "11:00",
//   });

//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const skillsTeach = res.data.skillsTeach ?? [];
//         setSkills(skillsTeach);
//         if (skillsTeach.length > 0) {
//           const firstId = (skillsTeach[0].skill._id ?? skillsTeach[0].skill).toString();
//           setSelectedSkillId(firstId);
//           setSlots(skillsTeach[0].availability ?? []);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSkills();
//   }, []);

//   const handleSkillChange = (skillId) => {
//     setSelectedSkillId(skillId);
//     const found = skills.find((sk) => (sk.skill._id ?? sk.skill).toString() === skillId);
//     setSlots(found?.availability ?? []);
//   };

//   const addSlot = () => {
//     if (newSlot.type === "weekly" && !newSlot.day) return;
//     if (newSlot.type === "specific" && !newSlot.date) return;
//     if (newSlot.startTime >= newSlot.endTime) return;
//     const isDuplicate = slots.some(
//       (s) =>
//         s.type === newSlot.type &&
//         s.day === newSlot.day &&
//         s.date === newSlot.date &&
//         s.startTime === newSlot.startTime
//     );
//     if (isDuplicate) return;
//     setSlots((prev) => [...prev, { ...newSlot }]);
//   };

//   const removeSlot = (index) => setSlots((prev) => prev.filter((_, i) => i !== index));

//   const handleSave = async () => {
//     if (!selectedSkillId) return;
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "/api/availability",
//         { skillId: selectedSkillId, availability: slots },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSaved(true);
//       setTimeout(() => setSaved(false), 2500);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const weeklySlots = slots.filter((s) => s.type === "weekly");
//   const specificSlots = slots.filter((s) => s.type === "specific");

//   if (loading) return <div style={s.loading}>Loading your skills…</div>;

//   return (
//     <div style={s.container}>
//       <div style={s.header}>
//         <h2 style={s.title}>Set My Availability</h2>
//         <p style={s.subtitle}>Tell others when you're free to teach each skill</p>
//       </div>

//       {skills.length === 0 ? (
//         <p style={s.empty}>You haven't added any skills to teach yet.</p>
//       ) : (
//         <>
//           <div style={s.skillRow}>
//             <label style={s.label}>Skill</label>
//             <div style={s.skillBtns}>
//               {skills.map((sk) => {
//                 const id = (sk?.skill?._id ?? sk?.skill)?.toString();
//                 //const id = (sk.skill._id ?? sk.skill).toString();
//                 return (
//                   <button
//                     key={id}
//                     style={{ ...s.skillBtn, ...(selectedSkillId === id ? s.skillBtnActive : {}) }}
//                     onClick={() => handleSkillChange(id)}
//                   >
//                     {sk.skill.name ?? "Skill"}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div style={s.tabs}>
//             {["weekly", "specific"].map((tab) => (
//               <button
//                 key={tab}
//                 style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}
//                 onClick={() => { setActiveTab(tab); setNewSlot((p) => ({ ...p, type: tab })); }}
//               >
//                 {tab === "weekly" ? "📅 Weekly" : "📌 Specific Dates"}
//               </button>
//             ))}
//           </div>

//           <div style={s.formBox}>
//             <div style={s.formRow}>
//               {activeTab === "weekly" ? (
//                 <select value={newSlot.day} onChange={(e) => setNewSlot((p) => ({ ...p, day: e.target.value }))} style={s.select}>
//                   {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
//                 </select>
//               ) : (
//                 <input
//                   type="date"
//                   value={newSlot.date}
//                   min={new Date().toISOString().split("T")[0]}
//                   onChange={(e) => setNewSlot((p) => ({ ...p, date: e.target.value }))}
//                   style={s.input}
//                 />
//               )}
//               <select value={newSlot.startTime} onChange={(e) => setNewSlot((p) => ({ ...p, startTime: e.target.value }))} style={s.select}>
//                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{to12hr(t)}</option>)}
//               </select>
//               <span style={s.toLabel}>to</span>
//               <select value={newSlot.endTime} onChange={(e) => setNewSlot((p) => ({ ...p, endTime: e.target.value }))} style={s.select}>
//                 {TIME_OPTIONS.map((t) => <option key={t} value={t}>{to12hr(t)}</option>)}
//               </select>
//               <button onClick={addSlot} style={s.addBtn}>+ Add</button>
//             </div>
//             {newSlot.startTime >= newSlot.endTime && (
//               <p style={s.error}>End time must be after start time.</p>
//             )}
//           </div>

//           <div style={s.slotList}>
//             {activeTab === "weekly" &&
//               (weeklySlots.length === 0 ? (
//                 <p style={s.empty}>No weekly slots added yet.</p>
//               ) : (
//                 DAYS.map((day) => {
//                   const daySlots = weeklySlots.filter((sl) => sl.day === day);
//                   if (daySlots.length === 0) return null;
//                   return (
//                     <div key={day} style={s.dayGroup}>
//                       <span style={s.dayTag}>{day}</span>
//                       <div style={s.daySlots}>
//                         {daySlots.map((sl) => {
//                           const globalIdx = slots.indexOf(sl);
//                           return (
//                             <div key={globalIdx} style={s.slotPill}>
//                               {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
//                               <button onClick={() => removeSlot(globalIdx)} style={s.removeBtn}>✕</button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })
//               ))}

//             {activeTab === "specific" &&
//               (specificSlots.length === 0 ? (
//                 <p style={s.empty}>No specific dates added yet.</p>
//               ) : (
//                 specificSlots.map((sl) => {
//                   const globalIdx = slots.indexOf(sl);
//                   return (
//                     <div key={globalIdx} style={s.slotCard}>
//                       <span style={s.slotDate}>
//                         {new Date(sl.date + "T00:00").toLocaleDateString("en-IN", {
//                           weekday: "short", day: "numeric", month: "short",
//                         })}
//                       </span>
//                       <span style={s.slotTime}>{to12hr(sl.startTime)} – {to12hr(sl.endTime)}</span>
//                       <button onClick={() => removeSlot(globalIdx)} style={s.removeBtn}>✕</button>
//                     </div>
//                   );
//                 })
//               ))}
//           </div>

//           <div style={s.footer}>
//             <button
//               onClick={handleSave}
//               style={{ ...s.saveBtn, background: saved ? "#16a34a" : "#2563eb" }}
//               disabled={saving}
//             >
//               {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Availability"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// const s = {
//   container: { background: "#0f172a", color: "#e2e8f0", borderRadius: 16, padding: "28px 32px", fontFamily: "'DM Sans', sans-serif", maxWidth: 680, margin: "0 auto" },
//   loading: { color: "#64748b", padding: 24, textAlign: "center" },
//   header: { marginBottom: 24 },
//   title: { fontSize: 20, fontWeight: 700, color: "#f8fafc", margin: 0 },
//   subtitle: { fontSize: 13, color: "#64748b", marginTop: 4 },
//   label: { fontSize: 12, color: "#64748b", marginBottom: 6, display: "block" },
//   skillRow: { marginBottom: 20 },
//   skillBtns: { display: "flex", gap: 8, flexWrap: "wrap" },
//   skillBtn: { padding: "6px 16px", borderRadius: 20, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
//   skillBtnActive: { background: "#1e3a5f", color: "#93c5fd", borderColor: "#3b82f6" },
//   tabs: { display: "flex", gap: 8, marginBottom: 20 },
//   tab: { padding: "7px 18px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
//   tabActive: { background: "#1e3a5f", color: "#93c5fd", borderColor: "#3b82f6" },
//   formBox: { background: "#1e293b", borderRadius: 12, padding: "16px", marginBottom: 20, border: "1px solid #334155" },
//   formRow: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
//   select: { padding: "8px 10px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0", fontSize: 13 },
//   input: { padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0", fontSize: 13 },
//   toLabel: { color: "#475569", fontSize: 13 },
//   addBtn: { padding: "8px 18px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" },
//   error: { color: "#f87171", fontSize: 12, marginTop: 6 },
//   slotList: { minHeight: 60 },
//   dayGroup: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 },
//   dayTag: { minWidth: 36, fontSize: 12, fontWeight: 700, color: "#93c5fd", paddingTop: 6 },
//   daySlots: { display: "flex", gap: 8, flexWrap: "wrap" },
//   slotPill: { display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: "#1e293b", border: "1px solid #334155", borderRadius: 20, fontSize: 13, color: "#e2e8f0" },
//   slotCard: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, marginBottom: 8 },
//   slotDate: { fontWeight: 600, fontSize: 13, color: "#f1f5f9", minWidth: 90 },
//   slotTime: { fontSize: 13, color: "#94a3b8" },
//   removeBtn: { marginLeft: "auto", background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 13, padding: 2 },
//   empty: { color: "#475569", fontSize: 13, padding: "16px 0" },
//   footer: { marginTop: 24, display: "flex", justifyContent: "flex-end" },
//   saveBtn: { padding: "10px 28px", borderRadius: 10, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background 0.2s" },
// };
import { useState, useEffect } from "react";
import axios from "axios";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  for (let m of [0, 30]) {
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    TIME_OPTIONS.push(`${hh}:${mm}`);
  }
}

const to12hr = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h < 12 ? "AM" : "PM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
};

export default function AvailabilityEditor() {
  const [skills, setSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [slots, setSlots] = useState([]);
  const [activeTab, setActiveTab] = useState("weekly");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [newSlot, setNewSlot] = useState({
    type: "weekly",
    day: "Mon",
    date: "",
    startTime: "09:00",
    endTime: "11:00",
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const raw = res.data.skillsTeach ?? [];
        // Only keep entries where skill is a fully populated object with _id
        const skillsTeach = raw.filter(
          (sk) => sk?.skill && typeof sk.skill === "object" && sk.skill._id
        );
        setSkills(skillsTeach);
        if (skillsTeach.length > 0) {
          const firstId = skillsTeach[0].skill._id.toString();
          setSelectedSkillId(firstId);
          setSlots(skillsTeach[0].availability ?? []);
        }
      } catch (err) {
        console.error("AvailabilityEditor fetch error:", err);
        setFetchError("Failed to load skills. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleSkillChange = (skillId) => {
    setSelectedSkillId(skillId);
    const found = skills.find((sk) => sk.skill._id.toString() === skillId);
    setSlots(found?.availability ?? []);
  };

  const addSlot = () => {
    if (newSlot.type === "weekly" && !newSlot.day) return;
    if (newSlot.type === "specific" && !newSlot.date) return;
    if (newSlot.startTime >= newSlot.endTime) return;
    const isDuplicate = slots.some(
      (s) =>
        s.type === newSlot.type &&
        s.day === newSlot.day &&
        s.date === newSlot.date &&
        s.startTime === newSlot.startTime
    );
    if (isDuplicate) return;
    setSlots((prev) => [...prev, { ...newSlot }]);
  };

  const removeSlot = (index) =>
    setSlots((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (!selectedSkillId) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/availability",
        { skillId: selectedSkillId, availability: slots },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("AvailabilityEditor save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const weeklySlots = slots.filter((s) => s.type === "weekly");
  const specificSlots = slots.filter((s) => s.type === "specific");

  if (loading)
    return <div style={s.loading}>Loading your skills…</div>;

  if (fetchError)
    return <div style={s.errorState}>{fetchError}</div>;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}>Set My Availability</h2>
        <p style={s.subtitle}>
          Tell others when you're free to teach each skill
        </p>
      </div>

      {skills.length === 0 ? (
        <p style={s.empty}>You haven't added any skills to teach yet.</p>
      ) : (
        <>
          {/* Skill selector */}
          <div style={s.skillRow}>
            <label style={s.label}>Skill</label>
            <div style={s.skillBtns}>
              {skills.map((sk) => {
                const id = sk.skill._id.toString();
                return (
                  <button
                    key={id}
                    style={{
                      ...s.skillBtn,
                      ...(selectedSkillId === id ? s.skillBtnActive : {}),
                    }}
                    onClick={() => handleSkillChange(id)}
                  >
                    {sk.skill.name || "Skill"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div style={s.tabs}>
            {["weekly", "specific"].map((tab) => (
              <button
                key={tab}
                style={{
                  ...s.tab,
                  ...(activeTab === tab ? s.tabActive : {}),
                }}
                onClick={() => {
                  setActiveTab(tab);
                  setNewSlot((p) => ({ ...p, type: tab }));
                }}
              >
                {tab === "weekly" ? "📅 Weekly" : "📌 Specific Dates"}
              </button>
            ))}
          </div>

          {/* Add slot form */}
          <div style={s.formBox}>
            <div style={s.formRow}>
              {activeTab === "weekly" ? (
                <select
                  value={newSlot.day}
                  onChange={(e) =>
                    setNewSlot((p) => ({ ...p, day: e.target.value }))
                  }
                  style={s.select}
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="date"
                  value={newSlot.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setNewSlot((p) => ({ ...p, date: e.target.value }))
                  }
                  style={s.input}
                />
              )}
              <select
                value={newSlot.startTime}
                onChange={(e) =>
                  setNewSlot((p) => ({ ...p, startTime: e.target.value }))
                }
                style={s.select}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {to12hr(t)}
                  </option>
                ))}
              </select>
              <span style={s.toLabel}>to</span>
              <select
                value={newSlot.endTime}
                onChange={(e) =>
                  setNewSlot((p) => ({ ...p, endTime: e.target.value }))
                }
                style={s.select}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {to12hr(t)}
                  </option>
                ))}
              </select>
              <button onClick={addSlot} style={s.addBtn}>
                + Add
              </button>
            </div>
            {newSlot.startTime >= newSlot.endTime && (
              <p style={s.error}>End time must be after start time.</p>
            )}
          </div>

          {/* Slots display */}
          <div style={s.slotList}>
            {activeTab === "weekly" &&
              (weeklySlots.length === 0 ? (
                <p style={s.empty}>No weekly slots added yet.</p>
              ) : (
                DAYS.map((day) => {
                  const daySlots = weeklySlots.filter(
                    (sl) => sl.day === day
                  );
                  if (daySlots.length === 0) return null;
                  return (
                    <div key={day} style={s.dayGroup}>
                      <span style={s.dayTag}>{day}</span>
                      <div style={s.daySlots}>
                        {daySlots.map((sl) => {
                          const globalIdx = slots.indexOf(sl);
                          return (
                            <div key={globalIdx} style={s.slotPill}>
                              {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
                              <button
                                onClick={() => removeSlot(globalIdx)}
                                style={s.removeBtn}
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ))}

            {activeTab === "specific" &&
              (specificSlots.length === 0 ? (
                <p style={s.empty}>No specific dates added yet.</p>
              ) : (
                specificSlots.map((sl) => {
                  const globalIdx = slots.indexOf(sl);
                  return (
                    <div key={globalIdx} style={s.slotCard}>
                      <span style={s.slotDate}>
                        {new Date(
                          sl.date + "T00:00"
                        ).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span style={s.slotTime}>
                        {to12hr(sl.startTime)} – {to12hr(sl.endTime)}
                      </span>
                      <button
                        onClick={() => removeSlot(globalIdx)}
                        style={s.removeBtn}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })
              ))}
          </div>

          <div style={s.footer}>
            <button
              onClick={handleSave}
              style={{
                ...s.saveBtn,
                background: saved ? "#16a34a" : "#2563eb",
              }}
              disabled={saving}
            >
              {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Availability"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const s = {
  container: {
    borderRadius: 16,
    padding: "28px 32px",
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: 680,
    margin: "0 auto",
  },
  loading: { color: "#64748b", padding: 24, textAlign: "center" },
  errorState: {
    color: "#f87171",
    padding: 24,
    textAlign: "center",
    background: "#450a0a",
    borderRadius: 12,
  },
  header: { marginBottom: 24 },
  title: { fontSize: 20, fontWeight: 700, margin: 0 },
  subtitle: { fontSize: 13, color: "#64748b", marginTop: 4 },
  label: { fontSize: 12, color: "#64748b", marginBottom: 6, display: "block" },
  skillRow: { marginBottom: 20 },
  skillBtns: { display: "flex", gap: 8, flexWrap: "wrap" },
  skillBtn: {
    padding: "6px 16px",
    borderRadius: 20,
    border: "1px solid #334155",
    background: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 13,
  },
  skillBtnActive: {
    background: "#ccfbf1",
    color: "#0f766e",
    borderColor: "#0d9488",
  },
  tabs: { display: "flex", gap: 8, marginBottom: 20 },
  tab: {
    padding: "7px 18px",
    borderRadius: 8,
    border: "1px solid #334155",
    background: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 13,
  },
  tabActive: {
    background: "#ccfbf1",
    color: "#0f766e",
    borderColor: "#0d9488",
  },
  formBox: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: "16px",
    marginBottom: 20,
    border: "1px solid #e2e8f0",
  },
  formRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  select: {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#1e293b",
    fontSize: 13,
  },
  input: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#1e293b",
    fontSize: 13,
  },
  toLabel: { color: "#94a3b8", fontSize: 13 },
  addBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    background: "#0d9488",
    color: "#fff",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  },
  error: { color: "#ef4444", fontSize: 12, marginTop: 6 },
  slotList: { minHeight: 60 },
  dayGroup: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  dayTag: {
    minWidth: 36,
    fontSize: 12,
    fontWeight: 700,
    color: "#0d9488",
    paddingTop: 6,
  },
  daySlots: { display: "flex", gap: 8, flexWrap: "wrap" },
  slotPill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "5px 12px",
    background: "#f0fdfa",
    border: "1px solid #99f6e4",
    borderRadius: 20,
    fontSize: 13,
    color: "#134e4a",
  },
  slotCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    background: "#f0fdfa",
    border: "1px solid #99f6e4",
    borderRadius: 10,
    marginBottom: 8,
  },
  slotDate: {
    fontWeight: 600,
    fontSize: 13,
    color: "#134e4a",
    minWidth: 90,
  },
  slotTime: { fontSize: 13, color: "#0f766e" },
  removeBtn: {
    marginLeft: "auto",
    background: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: 13,
    padding: 2,
  },
  empty: { color: "#94a3b8", fontSize: 13, padding: "16px 0" },
  footer: { marginTop: 24, display: "flex", justifyContent: "flex-end" },
  saveBtn: {
    padding: "10px 28px",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};