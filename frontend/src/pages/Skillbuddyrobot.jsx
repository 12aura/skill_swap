import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SkillBuddyRobot = ({ onOpen }) => {
  const [showBubble, setShowBubble] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [dancing, setDancing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(false), 7000);
    return () => clearTimeout(t);
  }, []);

  // Trigger dance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDancing(true);
      setTimeout(() => setDancing(false), 1800);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8,
      pointerEvents: "none",
    }}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {(showBubble || hovered) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            style={{
              pointerEvents: "none",
              background: "#0d9e7a",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "16px 16px 4px 16px",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.5,
              maxWidth: 190,
              textAlign: "center",
              boxShadow: "0 6px 22px rgba(13,158,122,0.35)",
              marginRight: 8,
              fontFamily: "sans-serif",
            }}
          >
            Hii! 👋 I'm Skill Buddy!
            <br />
            <span style={{ fontWeight: 400, fontSize: 11.5, opacity: 0.93 }}>
              Tap me — I'll help you learn faster ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Button */}
      <motion.button
        onClick={onOpen}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={
          dancing
            ? { x: [0, -8, 8, -6, 6, 0], rotate: [0, -8, 8, -5, 5, 0] }
            : { y: [0, -7, 0] }
        }
        transition={
          dancing
            ? { duration: 1.8, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{
          pointerEvents: "all", background: "none", border: "none",
          cursor: "pointer", padding: 0, outline: "none",
          filter: "drop-shadow(0 10px 24px rgba(13,158,122,0.38))",
        }}
        aria-label="Open Skill Buddy"
      >
        <BunnyRobotSVG hovered={hovered} dancing={dancing} />
      </motion.button>
    </div>
  );
};

/* ─── BUNNY ROBOT SVG ─── */
const BunnyRobotSVG = ({ hovered, dancing }) => (
  <svg
    width="96"
    height="130"
    viewBox="0 0 200 270"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", overflow: "visible" }}
  >
    <defs>
      {/* Teal glow for eyes */}
      <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="1" />
        <stop offset="100%" stopColor="#0d9e7a" stopOpacity="0.6" />
      </radialGradient>
    </defs>

    {/* ── LEFT BUNNY EAR ── */}
    <motion.g
      animate={dancing ? { rotate: [-5, 10, -5] } : { rotate: [0, 4, 0] }}
      transition={{ duration: dancing ? 1.8 : 4, repeat: dancing ? 0 : Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "72px 36px" }}
    >
      <ellipse cx="72" cy="22" rx="11" ry="38" fill="#e8f5f2" />
      <ellipse cx="72" cy="22" rx="6" ry="30" fill="#b2e8de" opacity="0.6" />
    </motion.g>

    {/* ── RIGHT BUNNY EAR ── */}
    <motion.g
      animate={dancing ? { rotate: [5, -10, 5] } : { rotate: [0, -4, 0] }}
      transition={{ duration: dancing ? 1.8 : 4, repeat: dancing ? 0 : Infinity, ease: "easeInOut", delay: 0.3 }}
      style={{ transformOrigin: "128px 36px" }}
    >
      <ellipse cx="128" cy="22" rx="11" ry="38" fill="#e8f5f2" />
      <ellipse cx="128" cy="22" rx="6" ry="30" fill="#b2e8de" opacity="0.6" />
    </motion.g>

    {/* ── HEAD ── */}
    <ellipse cx="100" cy="90" rx="52" ry="50" fill="#e8f5f2" />
    {/* head seam line */}
    <ellipse cx="100" cy="90" rx="48" ry="46" fill="none" stroke="#c8e8e0" strokeWidth="1.5" />
    {/* ear attachment circles */}
    <circle cx="56" cy="60" r="10" fill="#d0ede7" />
    <circle cx="144" cy="60" r="10" fill="#d0ede7" />

    {/* ── TEAL GRID LEFT EYE ── */}
    <rect x="62" y="72" width="28" height="24" rx="5" fill="#1a2e3b" />
    <rect x="63" y="73" width="26" height="22" rx="4" fill="#0a1f2e" />
    {/* grid dots */}
    {[0,1,2,3].map(col =>
      [0,1,2].map(row => (
        <rect
          key={`le-${col}-${row}`}
          x={65 + col * 6} y={75 + row * 7}
          width="4" height="5" rx="1"
          fill="#2dd4bf" opacity={0.7 + (col + row) * 0.04}
        >
          <animate attributeName="opacity"
            values={`${0.5 + col * 0.1};1;${0.5 + col * 0.1}`}
            dur={`${1.2 + row * 0.3}s`} begin={`${col * 0.15}s`}
            repeatCount="indefinite" />
        </rect>
      ))
    )}

    {/* ── TEAL GRID RIGHT EYE ── */}
    <rect x="110" y="72" width="28" height="24" rx="5" fill="#1a2e3b" />
    <rect x="111" y="73" width="26" height="22" rx="4" fill="#0a1f2e" />
    {[0,1,2,3].map(col =>
      [0,1,2].map(row => (
        <rect
          key={`re-${col}-${row}`}
          x={113 + col * 6} y={75 + row * 7}
          width="4" height="5" rx="1"
          fill="#2dd4bf" opacity={0.7 + (col + row) * 0.04}
        >
          <animate attributeName="opacity"
            values={`${0.5 + col * 0.1};1;${0.5 + col * 0.1}`}
            dur={`${1.2 + row * 0.3}s`} begin={`${col * 0.15 + 0.2}s`}
            repeatCount="indefinite" />
        </rect>
      ))
    )}

    {/* ── SMILE ── */}
    <path
      d={hovered ? "M82 106 Q100 120 118 106" : "M84 106 Q100 116 116 106"}
      stroke="#0d9e7a" strokeWidth="2.5" fill="none" strokeLinecap="round"
    />
    {/* small dot cheeks */}
    <circle cx="78" cy="102" r="5" fill="#b2e8de" opacity="0.6" />
    <circle cx="122" cy="102" r="5" fill="#b2e8de" opacity="0.6" />

    {/* ── NECK ── */}
    <rect x="88" y="136" width="24" height="10" rx="5" fill="#d0ede7" />
    {/* neck joint rings */}
    <rect x="90" y="138" width="20" height="3" rx="1.5" fill="#0d9e7a" opacity="0.35" />

    {/* ── BODY ── */}
    <rect x="48" y="146" width="104" height="82" rx="28" fill="#e8f5f2" />
    <rect x="52" y="150" width="96" height="74" rx="24" fill="#f0f9f7" />

    {/* chest orb / button */}
    <circle cx="100" cy="175" r="14" fill="#d0ede7" />
    <circle cx="100" cy="175" r="10" fill="#1a2e3b" />
    <circle cx="100" cy="175" r="7" fill="#0d9e7a">
      <animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="103" cy="172" r="2.5" fill="#2dd4bf" opacity="0.8" />

    {/* body panel lines */}
    <line x1="70" y1="198" x2="130" y2="198" stroke="#c8e8e0" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="78" y1="208" x2="122" y2="208" stroke="#c8e8e0" strokeWidth="1" strokeLinecap="round" />

    {/* ── LEFT ARM (waving) ── */}
    <g style={{ animation: "waveL 1.2s ease-in-out infinite", transformOrigin: "52px 156px" }}>
      <style>{`
        @keyframes waveL {
          0%,100% { transform: rotate(0deg); }
          30%      { transform: rotate(-38deg); }
          60%      { transform: rotate(10deg); }
        }
        @keyframes danceL {
          0%,100% { transform: rotate(0deg); }
          25%     { transform: rotate(-50deg); }
          75%     { transform: rotate(20deg); }
        }
      `}</style>
      {/* shoulder */}
      <circle cx="52" cy="156" r="12" fill="#d0ede7" />
      <circle cx="52" cy="156" r="8" fill="#e8f5f2" />
      {/* upper arm */}
      <rect x="32" y="156" width="20" height="44" rx="10" fill="#e8f5f2" />
      <rect x="35" y="159" width="14" height="38" rx="7" fill="#f0f9f7" />
      {/* elbow */}
      <circle cx="42" cy="200" r="8" fill="#d0ede7" />
      {/* hand / paw */}
      <circle cx="42" cy="215" r="10" fill="#e8f5f2" />
      <circle cx="42" cy="215" r="7" fill="#d0ede7" />
      {/* finger nubs */}
      <circle cx="35" cy="210" r="4" fill="#e8f5f2" />
      <circle cx="42" cy="208" r="4" fill="#e8f5f2" />
      <circle cx="49" cy="210" r="4" fill="#e8f5f2" />
    </g>

    {/* ── RIGHT ARM (subtle sway) ── */}
    <g style={{ animation: "swayR 2.4s ease-in-out infinite", transformOrigin: "148px 156px" }}>
      <style>{`
        @keyframes swayR {
          0%,100% { transform: rotate(0deg); }
          50%     { transform: rotate(12deg); }
        }
      `}</style>
      <circle cx="148" cy="156" r="12" fill="#d0ede7" />
      <circle cx="148" cy="156" r="8" fill="#e8f5f2" />
      <rect x="148" y="156" width="20" height="44" rx="10" fill="#e8f5f2" />
      <rect x="151" y="159" width="14" height="38" rx="7" fill="#f0f9f7" />
      <circle cx="158" cy="200" r="8" fill="#d0ede7" />
      <circle cx="158" cy="215" r="10" fill="#e8f5f2" />
      <circle cx="158" cy="215" r="7" fill="#d0ede7" />
      <circle cx="151" cy="210" r="4" fill="#e8f5f2" />
      <circle cx="158" cy="208" r="4" fill="#e8f5f2" />
      <circle cx="165" cy="210" r="4" fill="#e8f5f2" />
    </g>

    {/* ── LEGS ── */}
    {/* left leg */}
    <rect x="64" y="224" width="28" height="32" rx="12" fill="#e8f5f2" />
    <rect x="67" y="227" width="22" height="26" rx="9" fill="#f0f9f7" />
    {/* right leg */}
    <rect x="108" y="224" width="28" height="32" rx="12" fill="#e8f5f2" />
    <rect x="111" y="227" width="22" height="26" rx="9" fill="#f0f9f7" />

    {/* ── FEET ── */}
    <ellipse cx="78" cy="254" rx="18" ry="10" fill="#d0ede7" />
    <ellipse cx="78" cy="254" rx="14" ry="7" fill="#e8f5f2" />
    <ellipse cx="122" cy="254" rx="18" ry="10" fill="#d0ede7" />
    <ellipse cx="122" cy="254" rx="14" ry="7" fill="#e8f5f2" />

    {/* teal toe accent */}
    <ellipse cx="86" cy="254" rx="6" ry="4" fill="#0d9e7a" opacity="0.5" />
    <ellipse cx="130" cy="254" rx="6" ry="4" fill="#0d9e7a" opacity="0.5" />

    {/* ── SPARKLES / floating dots ── */}
    <circle cx="22" cy="80" r="3" fill="#0d9e7a" opacity="0.5">
      <animate attributeName="cy" values="80;68;80" dur="2.4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="178" cy="96" r="2.5" fill="#2dd4bf" opacity="0.6">
      <animate attributeName="cy" values="96;84;96" dur="2s" begin="0.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="34" cy="170" r="2" fill="#0d9e7a" opacity="0.4">
      <animate attributeName="cy" values="170;160;170" dur="2.8s" begin="1.2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.8s" begin="1.2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default SkillBuddyRobot;