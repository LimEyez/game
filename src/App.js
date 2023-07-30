import './App.css';
import Game from './Components/Game';
import { OrbitControls, Stats } from '@react-three/drei';
import DirectionalLight from "./Components/Objects/DirectionalLight"
import { Suspense } from 'react'
import './Styles/PhysicWorld.css'
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Game2 from './Game2/Game2';



function App() {

  const game1 = () => {
    return (
      <Suspense fallback={null}>
        <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}
        >
          {/* LIGHTS */}
          <DirectionalLight />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 15, 10]} />

          {/* PHYSICS */}
          <Physics w gravity={[0, -9.8, 0]} >
            <Game />
          </Physics>

          {/* <OrbitControls /> */}

        </Canvas>
        <Stats />

      </Suspense>
    )
  };

  const game2 = () => {
    return (
      <Suspense>
        <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
          {/* CAMERA */}
          {/* <OrbitControls /> */}
          {/* LIGHT */}
          <DirectionalLight />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />
          {/* GAME */}
          <Physics gravity={[0, 0, 0]}>
            <Game2 />
          </Physics>
        </Canvas>
        <Stats />
      </Suspense>
    )
  }

  return (
    <div className='PhysicWorld'>
      {game2()}
    </div>

  );
}

export default App;
