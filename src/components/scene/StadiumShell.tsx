import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { Text, useTexture } from '@react-three/drei';
import { useSimulationStore } from '../../store/simulationStore';
import * as THREE from 'three';

export function StadiumShell() {
  const fieldRef = useRef<Mesh>(null);
  const premiumBlock = useSimulationStore((state) => state.snapshot.premium_block);

  // Load textures (use relative paths for GitHub Pages)
  const stadiumTexture = useTexture(`${import.meta.env.BASE_URL}stadium-texture.png`);
  const skylineTexture = useTexture(`${import.meta.env.BASE_URL}skyline.png`);
  const groundTexture = useTexture(`${import.meta.env.BASE_URL}ground-texture.png`);

  // Configure stadium texture wrapping and repeat
  useMemo(() => {
    if (stadiumTexture) {
      stadiumTexture.wrapS = THREE.RepeatWrapping;
      stadiumTexture.wrapT = THREE.ClampToEdgeWrapping;
      stadiumTexture.repeat.set(16, 1); // Only repeat horizontally, stretch vertically
      stadiumTexture.anisotropy = 16;
    }
  }, [stadiumTexture]);

  // Configure skyline texture
  useMemo(() => {
    if (skylineTexture) {
      skylineTexture.wrapS = THREE.RepeatWrapping;
      skylineTexture.wrapT = THREE.RepeatWrapping;
      skylineTexture.repeat.set(3, 2);
      skylineTexture.anisotropy = 16;
    }
  }, [skylineTexture]);

  // Configure ground texture
  useMemo(() => {
    if (groundTexture) {
      groundTexture.wrapS = THREE.RepeatWrapping;
      groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(4, 4);
      groundTexture.anisotropy = 16;
    }
  }, [groundTexture]);

  return (
    <group>
      {/* Vancouver Skyline Sky */}
      <mesh position={[0, 50, 0]}>
        <sphereGeometry args={[100, 64, 64]} />
        <meshBasicMaterial map={skylineTexture} side={THREE.BackSide} />
      </mesh>

      {/* Ground outside stadium - Urban environment */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial
          color="#4A5568"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Field - soccer pitch */}
      <mesh ref={fieldRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 35]} />
        <meshStandardMaterial color="#2F855A" />
      </mesh>

      {/* Field lines */}
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 10.1, 64]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} />
      </mesh>

      {/* Stadium Bowl - With vibrant texture */}
      <group position={[0, 0, 0]}>
        {/* Lower tier seating - with texture */}
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[20, 18, 6, 64, 1, true, 0, Math.PI * 2]} />
          <meshStandardMaterial
            map={stadiumTexture}
            side={THREE.DoubleSide}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>

        {/* Upper tier seating - with texture */}
        <mesh position={[0, 7, 0]}>
          <cylinderGeometry args={[22, 20, 4, 64, 1, true, 0, Math.PI * 2]} />
          <meshStandardMaterial
            map={stadiumTexture}
            side={THREE.DoubleSide}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>

        {/* Roof structure - Modern white with slight transparency */}
        <mesh position={[0, 11, 0]}>
          <cylinderGeometry args={[24, 22, 1, 64, 1, true, 0, Math.PI * 2]} />
          <meshStandardMaterial
            color="#F7FAFC"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Concourse level - Light concrete color */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[18, 26, 64]} />
        <meshStandardMaterial color="#CBD5E0" />
      </mesh>

      {/* Premium Block */}
      {premiumBlock.enabled && (
        <group>
          {premiumBlock.seats.map((pos, i) => (
            <mesh key={i} position={[pos[0], pos[1] + 4, pos[2]]}>
              <boxGeometry args={[2.5, 1.5, 2]} />
              <meshStandardMaterial
                color="#F59E0B"
                transparent
                opacity={0.8}
                metalness={0.4}
                roughness={0.3}
              />
            </mesh>
          ))}
          <Text
            position={[4, 8, -9]}
            fontSize={0.9}
            color="#FFFFFF"
            anchorX="center"
            outlineWidth={0.12}
            outlineColor="#000000"
          >
            {premiumBlock.label}
          </Text>
        </group>
      )}
    </group>
  );
}
