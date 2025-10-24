import { useMemo } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import type { ServiceNode } from '../../data/types';
import { Text } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

// Concession Stand - looks like a food kiosk
function ConcessionStand({ node }: { node: ServiceNode }) {
  const springs = useSpring({
    queueLength: node.queueLength,
    config: { duration: 250 },
  });

  return (
    <group position={node.position}>
      {/* Base/Floor */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[3.5, 0.2, 2.5]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>

      {/* Main counter structure */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.5, 2.2, 2.5]} />
        <meshStandardMaterial color="#EF4444" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Counter top */}
      <mesh position={[0, 2.3, 0.8]}>
        <boxGeometry args={[3.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#744210" />
      </mesh>

      {/* Roof/Awning */}
      <mesh position={[0, 2.8, 0]} rotation={[Math.PI / 12, 0, 0]}>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial color="#C53030" />
      </mesh>

      {/* Menu board */}
      <mesh position={[0, 2.2, -1.2]}>
        <boxGeometry args={[2.5, 1, 0.1]} />
        <meshStandardMaterial color="#1A202C" emissive="#FBD38D" emissiveIntensity={0.2} />
      </mesh>

      {/* Queue visualization - people waiting */}
      {node.queueLength > 0 && (
        <animated.group position={[0, 0, 3]}>
          {Array.from({ length: Math.min(node.queueLength, 10) }).map((_, i) => (
            <mesh key={i} position={[0, 0.8, i * 0.4]}>
              <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
              <meshStandardMaterial color="#4299E1" />
            </mesh>
          ))}
        </animated.group>
      )}

      {/* Label */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.6}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {node.label}
      </Text>
      {node.queueTimeMin && (
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.4}
          color="#FBD38D"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.08}
          outlineColor="#000000"
        >
          {`${node.queueTimeMin} min wait`}
        </Text>
      )}
    </group>
  );
}

// Team Store - looks like a retail shop
function TeamStore({ node }: { node: ServiceNode }) {
  const springs = useSpring({
    queueLength: node.queueLength,
    config: { duration: 250 },
  });

  return (
    <group position={node.position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.5, 0.2, 3.5]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>

      {/* Main building */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[4.5, 3.4, 3.5]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Glass front windows */}
      <mesh position={[0, 1.8, 1.76]}>
        <boxGeometry args={[3.5, 2.5, 0.05]} />
        <meshStandardMaterial
          color="#A0D8F1"
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Entrance door frame */}
      <mesh position={[0, 1, 1.77]}>
        <boxGeometry args={[1.2, 2, 0.1]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>

      {/* Store sign */}
      <mesh position={[0, 3.3, 1.8]}>
        <boxGeometry args={[3.5, 0.6, 0.1]} />
        <meshStandardMaterial color="#1E40AF" emissive="#60A5FA" emissiveIntensity={0.3} />
      </mesh>

      {/* Queue */}
      {node.queueLength > 0 && (
        <animated.group position={[0, 0, 4]}>
          {Array.from({ length: Math.min(node.queueLength, 8) }).map((_, i) => (
            <mesh key={i} position={[0, 0.8, i * 0.5]}>
              <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>
          ))}
        </animated.group>
      )}

      {/* Label */}
      <Text
        position={[0, 4.2, 0]}
        fontSize={0.6}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {node.label}
      </Text>
    </group>
  );
}

// Pickup Counter - mobile order pickup station
function PickupCounter({ node }: { node: ServiceNode }) {
  const springs = useSpring({
    queueLength: node.queueLength,
    config: { duration: 250 },
  });

  return (
    <group position={node.position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>

      {/* Counter structure - sleek modern design */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 1.8, 2]} />
        <meshStandardMaterial color="#8B5CF6" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Pickup shelves */}
      {[0.6, 1.2, 1.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0.95]}>
          <boxGeometry args={[3.5, 0.05, 0.4]} />
          <meshStandardMaterial color="#6B21A8" />
        </mesh>
      ))}

      {/* Digital display screen */}
      <mesh position={[0, 1.5, -0.95]}>
        <boxGeometry args={[2.5, 1.2, 0.1]} />
        <meshStandardMaterial
          color="#1A202C"
          emissive="#A78BFA"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Mobile icon indicator */}
      <mesh position={[1.5, 2.2, 0]}>
        <boxGeometry args={[0.3, 0.5, 0.1]} />
        <meshStandardMaterial color="#A78BFA" emissive="#A78BFA" emissiveIntensity={0.8} />
      </mesh>

      {/* Queue */}
      {node.queueLength > 0 && (
        <animated.group position={[0, 0, 3]}>
          {Array.from({ length: Math.min(node.queueLength, 6) }).map((_, i) => (
            <mesh key={i} position={[0, 0.8, i * 0.5]}>
              <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
              <meshStandardMaterial color="#A78BFA" />
            </mesh>
          ))}
        </animated.group>
      )}

      {/* Label */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.6}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {node.label}
      </Text>
    </group>
  );
}

// Food Hall - larger dining area
function FoodHall({ node }: { node: ServiceNode }) {
  const springs = useSpring({
    queueLength: node.queueLength,
    config: { duration: 250 },
  });

  return (
    <group position={node.position}>
      {/* Base platform */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[6, 0.2, 5]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>

      {/* Main hall structure */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[6, 3.8, 5]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Glass walls/windows */}
      <mesh position={[3, 2, 0]}>
        <boxGeometry args={[0.05, 3, 4]} />
        <meshStandardMaterial
          color="#FCD34D"
          transparent
          opacity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Roof overhang */}
      <mesh position={[0, 3.9, 0]}>
        <boxGeometry args={[7, 0.2, 5.5]} />
        <meshStandardMaterial color="#D97706" />
      </mesh>

      {/* Food vendor stalls inside */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -2]}>
          <boxGeometry args={[1.5, 2, 0.8]} />
          <meshStandardMaterial color="#FBBF24" />
        </mesh>
      ))}

      {/* Dining tables */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 1.5]}>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
          <meshStandardMaterial color="#92400E" />
        </mesh>
      ))}

      {/* Signage */}
      <mesh position={[0, 4.2, 2.5]}>
        <boxGeometry args={[4, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#92400E"
          emissive="#FBBF24"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Queue */}
      {node.queueLength > 0 && (
        <animated.group position={[0, 0, 4]}>
          {Array.from({ length: Math.min(node.queueLength, 10) }).map((_, i) => (
            <mesh key={i} position={[0, 0.8, i * 0.5]}>
              <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
              <meshStandardMaterial color="#FBBF24" />
            </mesh>
          ))}
        </animated.group>
      )}

      {/* Label */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.7}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {node.label}
      </Text>
    </group>
  );
}

// Entry Gates - looks like stadium turnstiles/gates
function EntryGate({ node }: { node: ServiceNode }) {
  return (
    <group position={node.position}>
      {/* Base platform */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[8, 0.2, 3]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>

      {/* Gate structure pillars */}
      {[-3, -1, 1, 3].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Pillar */}
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[0.4, 4, 0.4]} />
            <meshStandardMaterial color="#10B981" metalness={0.5} roughness={0.5} />
          </mesh>
          {/* Turnstile arms */}
          <mesh position={[0, 1.2, 0]} rotation={[0, i * Math.PI / 4, 0]}>
            <boxGeometry args={[1.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#065F46" />
          </mesh>
        </group>
      ))}

      {/* Overhead arch */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[8.5, 0.5, 0.8]} />
        <meshStandardMaterial color="#047857" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Electronic display board */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[5, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#1A202C"
          emissive="#48BB78"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.7}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {node.label}
      </Text>
    </group>
  );
}

function NodeMarker({ node }: { node: ServiceNode }) {
  // Render different models based on node type
  switch (node.type) {
    case 'concession':
      return <ConcessionStand node={node} />;
    case 'pickup':
      return <PickupCounter node={node} />;
    case 'foodhall':
      return <FoodHall node={node} />;
    case 'store':
      return <TeamStore node={node} />;
    case 'gate':
      return <EntryGate node={node} />;
    default:
      return null;
  }
}

export function ServiceNodes() {
  const snapshot = useSimulationStore((state) => state.snapshot);

  return (
    <group>
      {snapshot.nodes.map((node) => (
        <NodeMarker key={node.id} node={node} />
      ))}
    </group>
  );
}
