import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './scene';
import OrbitControls from './controls';

function Dial() {
  const [sphereOpacity, setSphereOpacity] = useState(1);
  const [batteryHealth, setBatteryHealth] = useState(100);
  const coneRadius = 1.63 + (2.7 - 1.63) * (batteryHealth / 100);
  const whitetexture = process.env.PUBLIC_URL + '/whitetexture.jpg';

  return(<div style={{
    backgroundImage: `url(${whitetexture})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh'
  }}>
    <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 5], fov: 50 }}>
      <Scene opacity={sphereOpacity} coneRadius={coneRadius} />
      <OrbitControls />
    </Canvas>

    <label style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)' }}>
      Pil Sağlığı(SoH):
      <input
        type="number"
        min="0"
        max="100"
        value={sphereOpacity * 100}
        onChange={(e) => {
          const value = e.target.value / 100;
          setSphereOpacity(value);
        }}
      />
    </label>

    <label style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
      Şarj Durumu(SoC):
      <input
        type="number"
        min="0"
        max="100"
        value={batteryHealth}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setBatteryHealth(value);
        }}
      />
    </label>
  </div>);
}

export default Dial;
