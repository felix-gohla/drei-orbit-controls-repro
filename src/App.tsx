import React from 'react';

import { Canvas, useThree } from '@react-three/fiber';
import { Icosahedron, OrbitControls, OrthographicCamera } from '@react-three/drei';

import './App.css';

const Content = () => {
  const positions = React.useMemo(() => {
    const pos: Positions[] = []
    const half = (NUM - 1) / 2

    for (let x = 0; x < NUM; x++) {
      for (let y = 0; y < NUM; y++) {
        pos.push({
          id: `${x}-${y}`,
          position: [(x - half) * 4, (y - half) * 4, 0],
        })
      }
    }

    return pos
  }, [])

  const { invalidate } = useThree();
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={40} />
      <ambientLight intensity={1} />
      <group position={[0, 0, -10]}>
        {positions.map(({ id, position }) => (
          <Icosahedron key={id} position={position} args={[1, 1]}>
            <meshBasicMaterial color="white" wireframe />
          </Icosahedron>
        ))}
      </group>
      <OrbitControls onChange={invalidate} />
    </>
  );
}

const NUM = 3

interface Positions {
  id: string
  position: [number, number, number]
}

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <main style={{height: '100%'}}>
        <Canvas
            dpr={window.devicePixelRatio}
            frameloop='demand'
        >
          <Content />
        </Canvas>
      </main>
    </div>
  );
}

export default App;
