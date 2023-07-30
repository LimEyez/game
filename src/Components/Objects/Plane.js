import { useEffect, useRef } from 'react'
import { useContactMaterial, usePlane } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const Plane = (props) => {
  const [ref] = usePlane(() => (
    { ...props }),
    useRef()
  );

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={props.args} />
      <meshStandardMaterial  color={'green'} />
    </mesh>
  )
}

export default Plane
