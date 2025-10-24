import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StadiumShell } from './components/scene/StadiumShell';
import { ServiceNodes } from './components/scene/ServiceNodes';
import { CrowdVisualization } from './components/scene/CrowdVisualization';
import { KPICards } from './components/ui/KPICards';
import { Timeline } from './components/ui/Timeline';
import { Legend } from './components/ui/Legend';
import { OSBPanel } from './components/ui/OSBPanel';
import { Controls } from './components/ui/Controls';
import { ImplementationGuide } from './components/ui/ImplementationGuide';
import { KPIScorecard } from './components/ui/KPIScorecard';

function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [35, 25, 35], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 30, 10]} intensity={1.2} castShadow />
        <directionalLight position={[-10, 20, -10]} intensity={0.4} />

        {/* Hemisphere light for better stadium lighting */}
        <hemisphereLight args={['#ffffff', '#444444', 0.6]} />

        <StadiumShell />
        <ServiceNodes />
        <CrowdVisualization />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          minDistance={20}
          maxDistance={60}
          target={[0, 3, 0]}
        />
      </Canvas>

      {/* UI Overlay */}
      <KPICards />
      <Timeline />
      <Controls />
      <Legend />
      <OSBPanel />
      <ImplementationGuide />
      <KPIScorecard />
    </div>
  );
}

export default App;
