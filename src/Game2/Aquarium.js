import { useRef } from 'react';
import { usePlane } from '@react-three/cannon';

export default function Aquarium(props) {

  const Plane = (props) => {
    const [ref] = usePlane(() => (
      { ...props }),
      useRef()
    );

    return (
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={props.args} />
        <meshStandardMaterial color={'green'} />
      </mesh>
    )
  }

  return (
    <>
      <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} args={[50, 50]} {...props} />
      <Plane rotation={[0, -Math.PI / 2, 0]} position={[25, 25, 0]} args={[50, 50]}{...props} />
      <Plane rotation={[0, Math.PI / 2, 0]} position={[-25, 25, 0]} args={[50, 50]} {...props} />
      <Plane rotation={[0, 0, 0]} position={[0, 25, -25]} args={[50, 50]} />
      <Plane rotation={[0, -Math.PI, 0]} position={[0, 25, 25]} args={[50, 50]} {...props} />

    </>
  );
}

