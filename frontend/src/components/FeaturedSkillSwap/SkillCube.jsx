import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Float, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

function Cube({ onClick }) {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.y += 0.01)); // rotate cube
  return (
    <mesh ref={mesh} onClick={onClick}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#0d6efd"
        metalness={0.7}
        roughness={0.2}
        emissive="#0d6efd"
        emissiveIntensity={0.5}
      />
      <Html center>
        <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>
          Skill Swap
        </div>
      </Html>
    </mesh>
  );
}

function Bubble({ position, color, text, onClick }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position} onClick={onClick}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        <Html center>
          <div
            style={{
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '10px 15px',
              borderRadius: '20px',
              background: 'rgba(0,0,0,0.3)',
              textAlign: 'center',
              boxShadow: `0 0 15px ${color}`,
            }}
            onClick={onClick}
          >
            {text}
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

export default function SkillCube() {
  const [showBubbles, setShowBubbles] = useState(false);
  const navigate = useNavigate();

  const handleCubeClick = () => setShowBubbles(true);

  const handleBubbleClick = (page) => {
    navigate(`/${page}`);
    setShowBubbles(false);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <Cube onClick={handleCubeClick} />
        <OrbitControls enableZoom={false} />
        {showBubbles && (
          <>
            <Bubble
              position={[3, 2, 0]}
              color="blue"
              text="Browse Skill"
              onClick={() => handleBubbleClick('browse')}
            />
            <Bubble
              position={[-3, 2, 0]}
              color="green"
              text="Skill Matches"
              onClick={() => handleBubbleClick('matches')}
            />
            <Bubble
              position={[3, -2, 0]}
              color="orange"
              text="Settings"
              onClick={() => handleBubbleClick('settings')}
            />
            <Bubble
              position={[-3, -2, 0]}
              color="red"
              text="Logout"
              onClick={() => handleBubbleClick('logout')}
            />
            <Bubble
              position={[0, -3, 0]}
              color="purple"
              text="Profile"
              onClick={() => handleBubbleClick('profile')}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}
