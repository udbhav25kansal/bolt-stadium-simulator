import { useMemo, useRef } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import * as THREE from 'three';

const INSTANCE_THRESHOLD = 1000;

function ConcourseInstances({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 20 + Math.random() * 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      temp.push([x, 0.3, z]);
    }
    return temp;
  }, [count]);

  useMemo(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial color="#6B7280" />
    </instancedMesh>
  );
}

function BowlHeatmap({ count }: { count: number }) {
  const intensity = Math.min(count / 20000, 1);

  return (
    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[16, 64]} />
      <meshStandardMaterial
        color={`hsl(${120 - intensity * 120}, 70%, 50%)`}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export function CrowdVisualization() {
  const peopleZones = useSimulationStore((state) => state.snapshot.people_zones);

  const concourseZone = peopleZones.find((z) => z.id === 'concourse');
  const bowlZone = peopleZones.find((z) => z.id === 'bowl');

  return (
    <group>
      {concourseZone && concourseZone.count < INSTANCE_THRESHOLD && (
        <ConcourseInstances count={concourseZone.count} />
      )}
      {bowlZone && <BowlHeatmap count={bowlZone.count} />}
    </group>
  );
}
